import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PromptGeneratorInput, PromptGeneratorOutput, PromptEvaluationOutput } from "../types";

// Initialize the client with the API key from the environment.
// Note: In a production client-side app, this key should be proxied through a backend.
// For this environment, we assume process.env.API_KEY is available and safe to use.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a structured prompt template based on user inputs.
 */
export const generatePromptTemplate = async (input: PromptGeneratorInput): Promise<PromptGeneratorOutput> => {
  const model = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      taskSnapshot: { 
        type: Type.STRING, 
        description: "A short, punchy 1-sentence summary of what this prompt does (e.g. 'Drafts a risk-averse client email')."
      },
      complexityLevel: { 
        type: Type.STRING, 
        enum: ["Basic", "Intermediate", "Advanced"],
        description: "The complexity rating of the generated template." 
      },
      systemPromptTemplate: { 
        type: Type.STRING, 
        description: "The System Instruction text. Return an empty string if the task is Basic/Low stakes and doesn't need one."
      },
      taskPromptTemplate: { 
        type: Type.STRING, 
        description: "The main user prompt using {{placeholders}} for variable content. Must follow PCTR (Persona, Context, Task, Requirements)." 
      },
      followUpPrompts: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "3 smart follow-up questions the user should ask the AI to refine the result."
      },
      exampleGuidance: { 
        type: Type.STRING,
        description: "1-2 sentences on how the user should provide examples (Few-Shot) for this specific task." 
      },
      modelRecommendation: { 
        type: Type.STRING,
        description: "Which model is best? e.g. 'Gemini 1.5 Pro' or 'ChatGPT-4'."
      },
      modeRecommendation: { 
        type: Type.STRING, 
        enum: ["Fast", "Pro", "Research", "Your-docs"],
        description: "The best mode to use."
      },
      reasoning: { 
        type: Type.STRING,
        description: "Explain why you chose this structure, system prompt, and complexity level."
      },
    },
    required: [
      "taskSnapshot", 
      "complexityLevel", 
      "taskPromptTemplate", 
      "followUpPrompts", 
      "exampleGuidance", 
      "modelRecommendation", 
      "modeRecommendation", 
      "reasoning"
    ],
  };

  const systemInstruction = `You are an expert Prompt Engineer for an Enterprise AI Academy. 
Your goal is to turn a user's rough task description into a high-quality, reusable Prompt Template.

### Guidelines
1. **PCTR Framework**: Ensure the \`taskPromptTemplate\` clearly separates Persona, Context, Task, and Requirements.
2. **Placeholders**: Use {{double curly braces}} for parts the user needs to fill in (e.g., {{Client Name}}, {{Draft Text}}).
3. **Complexity Logic**:
   - **Basic**: Low stakes, simple task type (draft, brainstorm), light structure. (No System Prompt needed).
   - **Intermediate**: Medium stakes, or needs specific output format.
   - **Advanced**: High stakes, Recurring task, or High structure level. (Needs robust System Prompt).
4. **Safety**: If 'dataSensitivity' is 'sensitive', add placeholders like {{Anonymized Data}} and warnings in the template.
5. **Tone**: Match the tone requested by the user in the template instructions.

### Input Data
The user will provide their task details in JSON format.
`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `Generate a prompt template for this task: ${JSON.stringify(input)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.2, // Low temperature for consistent structure
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    // Runtime validation / sanitization
    return {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      taskSnapshot: data.taskSnapshot || "Custom Prompt Template",
      complexityLevel: data.complexityLevel || "Intermediate",
      // Convert empty string to null for system prompt to match UI expectation
      systemPromptTemplate: data.systemPromptTemplate && data.systemPromptTemplate.trim() !== "" ? data.systemPromptTemplate : null,
      taskPromptTemplate: data.taskPromptTemplate || "Error: Could not generate template.",
      followUpPrompts: Array.isArray(data.followUpPrompts) ? data.followUpPrompts : [],
      exampleGuidance: data.exampleGuidance || "Provide relevant examples.",
      modelRecommendation: data.modelRecommendation || "Gemini 1.5 Pro",
      modeRecommendation: data.modeRecommendation || "Pro",
      reasoning: data.reasoning || "Generated based on task parameters."
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

// ============================================================================
// WORKFLOW RECOMMENDATION
// ============================================================================

/**
 * Types for workflow recommendation response
 */
export interface WorkflowModification {
  type: 'add' | 'modify' | 'skip' | 'tip';
  stepNumber?: number;
  description: string;
  sourceWorkflowId?: string;
}

export interface WorkflowAlternative {
  workflowId: string;
  reason: string;
}

export interface WorkflowRecommendation {
  baseWorkflowId: string;
  confidenceScore: number;
  modifications: WorkflowModification[];
  reasoning: string;
  alternatives: WorkflowAlternative[];
}

/**
 * Recommends the best workflow for a user's task with customization suggestions.
 * Uses guided remixing: starts from validated workflows and suggests modifications.
 */
export const recommendWorkflow = async (
  userQuery: string,
  workflowSummaries: Array<{
    id: string;
    name: string;
    roleName: string;
    description: string;
    stepCount: number;
    stepOverview: string[];
    timeSavedPercentage: number;
    tags: string[];
  }>
): Promise<WorkflowRecommendation> => {
  const model = "gemini-2.5-flash";

  // Schema for structured response
  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      baseWorkflowId: {
        type: Type.STRING,
        description: "The ID of the best matching workflow from the available options."
      },
      confidenceScore: {
        type: Type.NUMBER,
        description: "How confident the match is (0-100). 80+ is strong match, 50-79 is moderate, below 50 is weak."
      },
      modifications: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: {
              type: Type.STRING,
              enum: ["add", "modify", "skip", "tip"],
              description: "Type of modification: add (incorporate from another workflow), modify (adjust existing step), skip (step not needed), tip (general advice)"
            },
            stepNumber: {
              type: Type.NUMBER,
              description: "Which step number this applies to (optional, for modify/skip)"
            },
            description: {
              type: Type.STRING,
              description: "Clear, actionable description of the modification"
            },
            sourceWorkflowId: {
              type: Type.STRING,
              description: "If type is 'add', which workflow the suggestion comes from"
            }
          },
          required: ["type", "description"]
        },
        description: "2-4 specific customizations based on the user's context"
      },
      reasoning: {
        type: Type.STRING,
        description: "2-3 sentences explaining why this workflow fits and how the modifications help"
      },
      alternatives: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            workflowId: { type: Type.STRING },
            reason: { type: Type.STRING, description: "Brief reason why this was also considered" }
          },
          required: ["workflowId", "reason"]
        },
        description: "1-2 alternative workflows that were also considered"
      }
    },
    required: ["baseWorkflowId", "confidenceScore", "modifications", "reasoning", "alternatives"]
  };

  const systemInstruction = `You are an expert AI Workflow Advisor for an Enterprise AI Academy.

Your job is to match a user's task description to the best available workflow and suggest specific customizations.

### How to Think About This
1. **Find the best base workflow**: Which workflow most closely matches the user's core task?
2. **Identify customization opportunities**: Based on specific details in the user's description, suggest 2-4 modifications:
   - ADD: Borrow a step or approach from another workflow (specify which)
   - MODIFY: Adjust an existing step to better fit their context
   - SKIP: A step that isn't needed for their specific case
   - TIP: Practical advice for their situation
3. **Explain your reasoning**: Help the user understand why this workflow fits

### Quality Guidelines
- Modifications should be specific and actionable, not generic
- Reference actual workflow names when suggesting to "add" from another workflow
- If the user mentions audience (VP, board, team), adjust accordingly
- If they mention time constraints, prioritize steps
- Confidence score: 80+ for strong matches, 50-79 for moderate, below 50 for weak matches

### Available Workflows
${JSON.stringify(workflowSummaries, null, 2)}
`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `Find the best workflow for this task: "${userQuery}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.3, // Slightly higher for more creative modifications
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    // Validate the response has required fields
    if (!data.baseWorkflowId || !workflowSummaries.some(w => w.id === data.baseWorkflowId)) {
      throw new Error("Invalid workflow ID returned");
    }

    return {
      baseWorkflowId: data.baseWorkflowId,
      confidenceScore: Math.min(100, Math.max(0, data.confidenceScore || 70)),
      modifications: Array.isArray(data.modifications) ? data.modifications.slice(0, 4) : [],
      reasoning: data.reasoning || "This workflow matches your task description.",
      alternatives: Array.isArray(data.alternatives) ? data.alternatives.slice(0, 2) : []
    };

  } catch (error) {
    console.error("Gemini Workflow Recommendation Error:", error);

    // Fallback: return a reasonable default based on keyword matching
    const query = userQuery.toLowerCase();
    let fallbackId = 'monthly-retention-analysis'; // Default

    // Simple keyword fallback
    if (query.includes('budget') || query.includes('annual')) {
      fallbackId = 'annual-budget-process';
    } else if (query.includes('board') || query.includes('presentation')) {
      fallbackId = 'board-financial-reporting';
    } else if (query.includes('forecast') || query.includes('rolling')) {
      fallbackId = 'rolling-forecast-build';
    } else if (query.includes('campaign') || query.includes('marketing launch')) {
      fallbackId = 'campaign-planning-launch';
    } else if (query.includes('variance') || query.includes('fpa') || query.includes('fp&a')) {
      fallbackId = 'monthly-variance-analysis';
    } else if (query.includes('okr') || query.includes('objective')) {
      fallbackId = 'okr-framework-development';
    } else if (query.includes('competitive') || query.includes('competitor')) {
      fallbackId = 'competitive-intelligence-report';
    } else if (query.includes('email') || query.includes('sequence')) {
      fallbackId = 'email-sequence-creation';
    } else if (query.includes('content') || query.includes('copy')) {
      fallbackId = 'content-strategy-copywriting';
    } else if (query.includes('dashboard')) {
      fallbackId = 'executive-dashboard-build';
    } else if (query.includes('roi') || query.includes('investment')) {
      fallbackId = 'investment-roi-analysis';
    }

    return {
      baseWorkflowId: fallbackId,
      confidenceScore: 50,
      modifications: [
        {
          type: 'tip',
          description: 'We had trouble analyzing your request. This is our best guess - feel free to browse other workflows if this doesn\'t fit.'
        }
      ],
      reasoning: "We couldn't fully analyze your request, but this workflow seems relevant based on keywords in your description.",
      alternatives: []
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