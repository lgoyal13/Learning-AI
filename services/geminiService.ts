import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PromptGeneratorInput, PromptGeneratorOutput } from "../types";

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

// Legacy stubs to prevent breaking other imports if any exist
export const generateAIResponse = async (prompt: string): Promise<string> => {
  return "Legacy service disabled. Use specific generator functions.";
};

export const checkPII = (text: string): boolean => {
  return false;
};
