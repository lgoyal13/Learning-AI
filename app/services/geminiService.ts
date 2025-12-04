import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PromptGeneratorInput, PromptGeneratorOutput, PromptEvaluationOutput } from "../types";

// Initialize the client with the API key from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a structured prompt template based on user inputs using the PCTR framework.
 */
export const generatePromptTemplate = async (input: PromptGeneratorInput): Promise<PromptGeneratorOutput> => {
  const model = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      summary: { 
        type: Type.STRING, 
        description: "A 1-sentence snapshot of what this prompt does." 
      },
      toolType: { 
        type: Type.STRING, 
        description: "The AI tool this is optimized for (e.g. Chat, NotebookLM, Research, Workspace)." 
      },
      techniquesUsed: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of prompting techniques applied (e.g. Zero-shot, Chain-of-Thought, Meta-Prompting)."
      },
      prompt: {
        type: Type.OBJECT,
        description: "The PCTR structured prompt components.",
        properties: {
          persona: { type: Type.STRING },
          context: { type: Type.STRING },
          task: { type: Type.STRING },
          requirements: { type: Type.STRING },
        },
        required: ["persona", "context", "task", "requirements"]
      },
      extraInstructions: { 
        type: Type.STRING, 
        description: "Any system prompt instructions, self-critique steps, or meta-instructions." 
      },
      followUpPrompts: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 questions the user should ask the AI next."
      }
    },
    required: ["summary", "toolType", "techniquesUsed", "prompt", "followUpPrompts"]
  };

  const systemInstruction = `You are an expert Prompt Architect for an Enterprise AI Academy.
Your goal is to turn a user's task description into a high-quality, reusable PCTR Prompt Template optimized for a specific tool.

### Input Parameters
- **Task**: The user's goal.
- **Tool**: The AI tool they will use (Chat, NotebookLM, Research, or Workspace).
- **Structure**: Light, Medium, or High.
- **Reasoning**: Fast (standard) or Deep (Chain of Thought).
- **Safety**: Whether PII or secrets are involved.
- **Self-Critique**: Whether to include a refinement step.

### PCTR Framework
Structure the output prompt into these four sections:
1. **Persona**: Who is the AI acting as?
2. **Context**: Background info, source material reference, or audience.
3. **Task**: The core instruction (Draft, Summarize, Analyze).
4. **Requirements**: Constraints, tone, format, and "Do Not" rules.

### Tool-Specific Behaviors

**1. Chat (Gemini / ChatGPT)**
- Persona: Helpful assistant or specific role.
- Context: Summarize user task + examples.
- Task: Core ask.
- Requirements: Tone, format, length.
- *If Reasoning=Deep*: Add "Think step-by-step".
- *If Self-Critique=True*: Add "Review your answer for errors before finishing".

**2. NotebookLM (Your Docs)**
- Persona: Analyst working ONLY from provided sources.
- Context: "Rely only on the notebook sources, not the open web."
- Task: Summaries, comparisons, Q&A.
- Requirements: Cite specific documents/sections. Warn against hallucinations.

**3. Research (Perplexity / Deep Research)**
- Persona: Research assistant using live web search.
- Context: Decision support or market scan.
- Requirements: Always include links/dates. Prefer recent sources.
- *If Reasoning=Deep*: Ask for step-by-step reasoning on credibility.

**4. Workspace (Image / Video / Apps)**
- Persona: Creative Director or specialized Builder.
- Context: Campaign, audience, or app goal.
- Task: Describe the visual or media asset.
- Requirements: Style, mood, aspect ratio, no text/logos (if image).

### Output Schema
Return valid JSON only. Do not include markdown formatting or commentary outside the JSON.
`;

  const userContent = `
Task Description: ${input.rawTaskDescription}

Options:
- Tool: ${input.modelEnvironment}
- Structure Level: ${input.structureLevel}
- Reasoning Mode: ${input.stakes === 'high' ? 'Deep' : 'Fast'}
- Has PII: ${input.dataSensitivity === 'sensitive'}
- Include Self-Critique: ${input.constraints.includes('self-critique')}
`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: userContent,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.2,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    // Map new PCTR structure to the legacy string format for UI compatibility
    const formattedTaskPrompt = `**Persona:** ${data.prompt.persona}\n\n**Context:** ${data.prompt.context}\n\n**Task:** ${data.prompt.task}\n\n**Requirements:** ${data.prompt.requirements}`;

    return {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      taskSnapshot: data.summary || "Custom Prompt Template",
      complexityLevel: input.structureLevel === 'high' ? 'Advanced' : input.structureLevel === 'medium' ? 'Intermediate' : 'Basic',
      systemPromptTemplate: data.extraInstructions || null,
      taskPromptTemplate: formattedTaskPrompt,
      followUpPrompts: Array.isArray(data.followUpPrompts) ? data.followUpPrompts : [],
      exampleGuidance: "Provide relevant examples if available.",
      modelRecommendation: data.toolType || "Gemini",
      modeRecommendation: input.stakes === 'high' ? 'Pro' : 'Fast',
      reasoning: `Techniques used: ${data.techniquesUsed ? data.techniquesUsed.join(', ') : 'Standard prompting'}.`,
      // Include structured data for future UI updates
      pctr: data.prompt,
      techniquesUsed: data.techniquesUsed
    };

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate prompt template. Please try again.");
  }
};

/**
 * Evaluates a user prompt against the PCTR framework.
 */
export const evaluatePrompt = async (userPrompt: string, scenario?: string): Promise<PromptEvaluationOutput> => {
  const model = "gemini-2.5-flash";

  // Define schema for PCTR dimension
  const pctrDimensionSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      rating: { type: Type.STRING, enum: ["Strong", "Okay", "Missing"] },
      comment: { type: Type.STRING }
    },
    required: ["rating", "comment"]
  };

  // Define full evaluation schema
  const evaluationSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      summary: { 
        type: Type.STRING, 
        description: "1-2 sentence overall summary of the feedback." 
      },
      pctr: {
        type: Type.OBJECT,
        properties: {
          persona: pctrDimensionSchema,
          context: pctrDimensionSchema,
          task: pctrDimensionSchema,
          requirements: pctrDimensionSchema
        },
        required: ["persona", "context", "task", "requirements"]
      },
      improvedPrompt: { 
        type: Type.STRING, 
        description: "A rewritten version of the prompt that fixes the weaknesses found." 
      },
      tip: { 
        type: Type.STRING, 
        description: "One single actionable tip to improve next time." 
      }
    },
    required: ["summary", "pctr", "improvedPrompt", "tip"]
  };

  const systemInstruction = `You are an expert AI Prompt Coach. Your goal is to evaluate a user's prompt based on the PCTR framework.

### PCTR Framework
1. **Persona**: Who is the AI acting as? (e.g., "Act as a Senior Editor")
2. **Context**: What is the background info? (e.g., audience, situation)
3. **Task**: What specific action is required? (e.g., "Summarize", "Draft")
4. **Requirements**: What are the constraints? (e.g., format, tone, length)

### Rubric
- **Strong**: Explicitly defined and clear.
- **Okay**: Implied or vague.
- **Missing**: Not present at all.

### Goal
Provide constructive feedback and a rewrite that improves the prompt while keeping the original intent. The "improvedPrompt" must be a full prompt string ready to copy-paste.
`;

  try {
    const inputContent = scenario 
      ? `Scenario: ${scenario}\n\nUser Prompt: ${userPrompt}`
      : `User Prompt: ${userPrompt}`;

    const result = await ai.models.generateContent({
      model,
      contents: `Evaluate this prompt: ${inputContent}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: evaluationSchema,
        systemInstruction: systemInstruction,
        temperature: 0.2,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    return JSON.parse(text) as PromptEvaluationOutput;

  } catch (error) {
    console.error("Gemini Evaluation Error:", error);
    // Return a safe fallback to avoid UI crashes
    return {
      summary: "We couldn't analyze your prompt at this moment. Please try again.",
      pctr: {
        persona: { rating: "Missing", comment: "Unable to evaluate." },
        context: { rating: "Missing", comment: "Unable to evaluate." },
        task: { rating: "Missing", comment: "Unable to evaluate." },
        requirements: { rating: "Missing", comment: "Unable to evaluate." },
      },
      improvedPrompt: userPrompt,
      tip: "Try refreshing the page."
    };
  }
};

// Legacy stubs to prevent breaking other imports if any exist
export const generateAIResponse = async (prompt: string): Promise<string> => {
  return "Legacy service disabled. Use specific generator functions.";
};

export const checkPII = (text: string): boolean => {
  return false;
};