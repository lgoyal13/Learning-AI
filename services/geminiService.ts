import { GoogleGenAI, Type, Schema } from "@google/genai";
import {
  PromptGeneratorInput,
  PromptGeneratorOutput,
  PromptEvaluationOutput,
  SimpleGeneratorInput,
  SimpleGeneratorOutput,
  GamePlanGeneratorInput,
  GeneratedGamePlan,
  GeneratedStep,
  RefinementMessage
} from "../types";

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

// ============================================================================
// SIMPLE PROMPT GENERATOR
// ============================================================================

/**
 * Generates a prompt from simple inputs (task, audience, goal, tool).
 * Single API call - no real-time analysis.
 */
export const generateSimplePrompt = async (input: SimpleGeneratorInput): Promise<SimpleGeneratorOutput> => {
  const model = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      prompt: {
        type: Type.STRING,
        description: "The complete, expert-level prompt ready to copy-paste"
      },
      pctrBreakdown: {
        type: Type.OBJECT,
        properties: {
          persona: { type: Type.STRING, description: "Brief explanation of the persona/expertise in the prompt" },
          context: { type: Type.STRING, description: "Brief explanation of the context in the prompt" },
          task: { type: Type.STRING, description: "Brief explanation of the task in the prompt" },
          requirements: { type: Type.STRING, description: "Brief explanation of the format/constraints" }
        },
        required: ["persona", "context", "task", "requirements"]
      },
      toolSuggestion: {
        type: Type.OBJECT,
        properties: {
          recommended: { type: Type.STRING, enum: ["chatgpt", "claude", "gemini"] },
          reason: { type: Type.STRING, description: "Why this tool is recommended for this task" }
        },
        required: ["recommended", "reason"],
        description: "Only include if the user selected 'unsure' for their tool"
      }
    },
    required: ["prompt", "pctrBreakdown"]
  };

  const systemInstruction = `You are an expert Prompt Engineer. Create an optimized prompt from the user's inputs.

### Guidelines
1. **Structure using PCTR**: Persona (who the AI should be), Context (background/audience), Task (specific deliverable), Requirements (format/constraints)
2. **Be specific**: Replace vague requests with clear deliverables
3. **Include format constraints**: Prevent rambling with clear structure expectations
4. **Sound professional**: The prompt should read like an expert wrote it

### Tool Suggestion (only if user is unsure)
If the user selected "unsure" for their tool, recommend the best one:
- **ChatGPT**: Best for structured output, data analysis, code, step-by-step reasoning
- **Claude**: Best for nuanced writing, executive tone, long-form content, careful analysis
- **Gemini**: Best for research tasks, large context, multimodal tasks, current information

### PCTR Breakdown
For each element, write ONE sentence explaining what it contributes to the prompt's effectiveness.`;

  try {
    const contents = `Generate an expert prompt from these inputs:
Task: ${input.task}
Audience: ${input.audience}
Goal: ${input.goal}
Tool: ${input.tool}${input.tool === 'unsure' ? ' (please recommend the best tool)' : ''}`;

    const result = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.3,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    const output: SimpleGeneratorOutput = {
      prompt: data.prompt || "Error generating prompt. Please try again.",
      pctrBreakdown: {
        persona: data.pctrBreakdown?.persona || "Sets the AI's expertise level",
        context: data.pctrBreakdown?.context || "Provides necessary background",
        task: data.pctrBreakdown?.task || "Defines the specific deliverable",
        requirements: data.pctrBreakdown?.requirements || "Specifies format and constraints"
      }
    };

    // Only include tool suggestion if user was unsure and we got a recommendation
    if (input.tool === 'unsure' && data.toolSuggestion) {
      output.toolSuggestion = {
        recommended: data.toolSuggestion.recommended,
        reason: data.toolSuggestion.reason
      };
    }

    return output;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate prompt. Please try again.");
  }
};

// ============================================================================
// GAME PLAN GENERATOR
// ============================================================================

/**
 * Reference document content for game plan generation.
 * In a production app, these would be loaded from files.
 */
const SYSTEM_INSTRUCTION = `You are an AI game plan coach helping non-technical business professionals complete tasks using AI tools effectively.

PRINCIPLES:
- Teach, don't just answer. Every output should help users get better at AI.
- Be honest about uncertainty. Use [INSERT: description] markers for information gaps.
- Keep it scannable. Busy professionals skim first.
- Use the PCTR framework for all prompts you generate.
- Mark human steps clearly. Not everything should be AI-assisted.
- Plans should be starting points, not finished products.

CONSTRAINTS:
- Game plans must have 3-7 steps (aim for 4-5)
- Only recommend these tools: ChatGPT, Claude, Gemini, Perplexity, NotebookLM
- Each step needs: stepNumber, stepName, actor, timeMinutes, whatToDo
- AI-Assisted steps also need: tool, toolRationale, prompt (PCTR-structured)
- Mark unknown information with [INSERT: description of what's needed]
- Include "whyThisMatters" (1 sentence) for each step
- Include "watchOut" (1 sentence) for each step
- Always state confidence level (High/Medium/Low) and reasoning`;

const WORKFLOW_PATTERNS = `## Universal Workflow Patterns

### Pattern A: Research > Synthesize > Present
Best for: Competitive analysis, market research, due diligence
Signal words: "research", "competitive", "analysis", "landscape"
Steps: Define focus -> Gather info (AI) -> Synthesize (AI+human) -> Create deliverable -> Present

### Pattern B: Analyze Data > Find Patterns > Recommend
Best for: Variance analysis, performance reviews, root cause analysis
Signal words: "variance", "performance", "root cause", "metrics"
Steps: Gather data -> Explore (AI) -> Find patterns (AI+human) -> Generate hypotheses -> Recommend

### Pattern C: Draft > Feedback > Refine
Best for: Reports, emails, presentations, proposals
Signal words: "write", "draft", "email", "report", "presentation"
Steps: Define purpose -> Create draft (AI) -> Review -> Revise (AI) -> Final polish

### Pattern D: Plan > Structure > Execute
Best for: Project plans, OKRs, campaign plans
Signal words: "plan", "OKR", "campaign", "project", "strategy"
Steps: Define goals -> Generate structure (AI) -> Review -> Fill details -> Finalize

### Pattern E: Collect > Organize > Maintain
Best for: Documentation, knowledge bases, SOPs
Signal words: "document", "SOP", "knowledge base", "process"
Steps: Define scope -> Create template (AI) -> Populate content -> Review -> Establish cadence`;

const DOMAIN_CONTEXTS = `## Domain Contexts

### Finance & FP&A
Priorities: Accuracy, auditability, timeliness, stakeholder management
Stakeholders: CFO, board, auditors, department heads
Tone: Precise, professional, metrics-driven, conservative
Cautions: Sensitive data, outputs may be audited, precision over creativity

### Marketing
Priorities: Speed, creativity, audience resonance, measurable impact
Stakeholders: CMO, brand teams, agencies, sales
Tone: Persuasive, audience-aware, brand-consistent, action-oriented
Cautions: Brand voice matters, creative judgment is human, verify claims

### Business Operations / Strategy
Priorities: Cross-functional alignment, executive communication, actionable insights
Stakeholders: Executives, department heads, cross-functional teams
Tone: Executive-friendly, strategic framing, options-oriented
Cautions: Political sensitivity, context is everything, strategic judgment is human

### General Business (Default)
Use when domain unclear or mixed signals
Tone: Professional, clear, flexible
Cautions: Ask for clarification when uncertain`;

const PCTR_GUIDE = `## PCTR Framework

### P - Persona
Who should the AI be? Match expertise to the task.
Good: "You are a senior financial analyst with expertise in variance analysis."
Bad: "You are an AI assistant."

### C - Context
What background does the AI need? Include user's role, audience, constraints.
Good: "I'm preparing a monthly report for my CFO. We were 15% over budget."
Bad: "I have some data."

### T - Task
What specifically should the AI do? Use action verbs, include scope.
Good: "Identify the top 3 root causes and suggest follow-up questions."
Bad: "Help me with this."

### R - Requirements
What are the constraints? Format, length, tone.
Good: "Format as bullets. 2 sentences max per item. Professional tone."

### Marking Gaps
Use [INSERT: description] for unknown information.
Good: [INSERT: your 3-5 key competitors]
Bad: [INSERT: data]`;

/**
 * Generates a custom game plan from user context.
 */
export const generateGamePlan = async (input: GamePlanGeneratorInput): Promise<GeneratedGamePlan> => {
  const model = "gemini-2.5-flash";

  // Define step schema
  const stepSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      stepNumber: { type: Type.NUMBER },
      stepName: { type: Type.STRING },
      actor: { type: Type.STRING, enum: ["Human", "AI-Assisted", "Mixed"] },
      timeMinutes: { type: Type.NUMBER },
      tool: { type: Type.STRING, description: "ChatGPT, Claude, Gemini, Perplexity, NotebookLM, or null" },
      toolRationale: { type: Type.STRING, description: "One sentence on why this tool, or null" },
      whatToDo: { type: Type.STRING, description: "2-3 sentences of instructions" },
      prompt: { type: Type.STRING, description: "Full PCTR-structured prompt if AI-Assisted, or null" },
      whyThisMatters: { type: Type.STRING, description: "One sentence" },
      watchOut: { type: Type.STRING, description: "One sentence, common mistake" }
    },
    required: ["stepNumber", "stepName", "actor", "timeMinutes", "whatToDo", "whyThisMatters", "watchOut"]
  };

  // Define full game plan schema
  const gamePlanSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      planName: { type: Type.STRING, description: "Concise name based on the task" },
      inferredDomain: {
        type: Type.STRING,
        enum: ["Finance & FP&A", "Marketing", "Business Ops / Strategy", "General Business"]
      },
      domainReasoning: { type: Type.STRING, description: "One sentence explaining domain choice" },
      confidence: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
      confidenceReasoning: { type: Type.STRING, description: "One sentence explaining confidence" },
      userContextSummary: { type: Type.STRING, description: "2-3 sentences summarizing understanding" },
      totalTimeMinutes: { type: Type.NUMBER },
      insertMarkers: { type: Type.ARRAY, items: { type: Type.STRING } },
      steps: { type: Type.ARRAY, items: stepSchema }
    },
    required: [
      "planName", "inferredDomain", "domainReasoning", "confidence",
      "confidenceReasoning", "userContextSummary", "totalTimeMinutes",
      "insertMarkers", "steps"
    ]
  };

  const fullPrompt = `${SYSTEM_INSTRUCTION}

## Reference Material

${WORKFLOW_PATTERNS}

${DOMAIN_CONTEXTS}

${PCTR_GUIDE}

## User Context

**Original task:** ${input.task}
**Audience:** ${input.audience}
**Goal:** ${input.goal}
**Tool preference:** ${input.tool === 'unsure' ? 'No preference' : input.tool}

**Generated prompt from Stage 1:**
${input.generatedPrompt}

**Success looks like:** ${input.successCriteria || 'Not specified'}
**Starting point:** ${input.startingPoint || 'Not specified'}
**Constraints/other:** ${input.constraints || 'None specified'}

## Instructions

Based on the above context, create a step-by-step game plan for this user.

1. First, infer the most relevant domain from the user's task.
2. Assess your confidence level (High/Medium/Low).
3. Match to the most appropriate workflow pattern.
4. Generate 4-5 steps (range: 3-7).
5. For AI-Assisted steps, include a full PCTR-structured prompt.
6. Mark any information gaps with [INSERT: description].
7. Collect all INSERT markers in the insertMarkers array.`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: gamePlanSchema,
        temperature: 0.4, // Slightly creative for useful variations
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    // Validate and sanitize the response
    const gamePlan: GeneratedGamePlan = {
      planName: data.planName || "Your Game Plan",
      generatedAt: new Date().toISOString(),
      inferredDomain: data.inferredDomain || "General Business",
      domainReasoning: data.domainReasoning || "Based on your task description.",
      confidence: data.confidence || "Medium",
      confidenceReasoning: data.confidenceReasoning || "Generated based on available context.",
      userContextSummary: data.userContextSummary || `You're working on: ${input.task}`,
      totalTimeMinutes: data.totalTimeMinutes || 60,
      insertMarkers: Array.isArray(data.insertMarkers) ? data.insertMarkers : [],
      steps: Array.isArray(data.steps) ? data.steps.map((step: GeneratedStep, index: number) => ({
        stepNumber: step.stepNumber || index + 1,
        stepName: step.stepName || `Step ${index + 1}`,
        actor: step.actor || "Human",
        timeMinutes: step.timeMinutes || 15,
        tool: step.tool || null,
        toolRationale: step.toolRationale || null,
        whatToDo: step.whatToDo || "Complete this step.",
        prompt: step.prompt || null,
        whyThisMatters: step.whyThisMatters || "This step moves you forward.",
        watchOut: step.watchOut || "Take your time with this step."
      })) : []
    };

    // Validate step count
    if (gamePlan.steps.length < 3 || gamePlan.steps.length > 7) {
      console.warn(`Game plan has ${gamePlan.steps.length} steps, adjusting...`);
    }

    return gamePlan;

  } catch (error) {
    console.error("Gemini Game Plan Generation Error:", error);

    // Return a fallback plan
    return {
      planName: "Your Game Plan",
      generatedAt: new Date().toISOString(),
      inferredDomain: "General Business",
      domainReasoning: "We had trouble inferring your domain.",
      confidence: "Low",
      confidenceReasoning: "Generation encountered an issue. This is a fallback plan.",
      userContextSummary: `You're working on: ${input.task}`,
      totalTimeMinutes: 60,
      insertMarkers: ["[INSERT: your specific details]"],
      steps: [
        {
          stepNumber: 1,
          stepName: "Define Your Focus",
          actor: "Human",
          timeMinutes: 15,
          tool: null,
          toolRationale: null,
          whatToDo: "Clarify what you're trying to accomplish and who the audience is.",
          prompt: null,
          whyThisMatters: "Clear goals lead to better outcomes.",
          watchOut: "Don't skip this step - it shapes everything else."
        },
        {
          stepNumber: 2,
          stepName: "Research and Gather",
          actor: "AI-Assisted",
          timeMinutes: 20,
          tool: "Perplexity",
          toolRationale: "Good for research with citations.",
          whatToDo: "Use AI to help gather and organize the information you need.",
          prompt: "[P] You are a research assistant.\n\n[C] I'm working on [INSERT: your specific details].\n\n[T] Help me find relevant information.\n\n[R] Cite sources. Be concise.",
          whyThisMatters: "Good inputs lead to good outputs.",
          watchOut: "Verify AI-generated facts before using them."
        },
        {
          stepNumber: 3,
          stepName: "Draft and Refine",
          actor: "AI-Assisted",
          timeMinutes: 15,
          tool: "Claude",
          toolRationale: "Good for thoughtful drafting.",
          whatToDo: "Create a first draft with AI assistance, then review and refine.",
          prompt: "[P] You are a professional writer.\n\n[C] I need to create [INSERT: your deliverable].\n\n[T] Draft this for me.\n\n[R] Professional tone. Clear structure.",
          whyThisMatters: "AI can accelerate drafting; you add judgment.",
          watchOut: "Don't accept the first draft as final."
        },
        {
          stepNumber: 4,
          stepName: "Review and Finalize",
          actor: "Human",
          timeMinutes: 10,
          tool: null,
          toolRationale: null,
          whatToDo: "Review the output, make final adjustments, and prepare to share.",
          prompt: null,
          whyThisMatters: "Human judgment ensures quality.",
          watchOut: "Fresh eyes catch what tired ones miss."
        }
      ]
    };
  }
};

/**
 * Refines a game plan based on user feedback in chat.
 */
export const refineGamePlan = async (
  currentPlan: GeneratedGamePlan,
  messages: RefinementMessage[],
  userMessage: string
): Promise<{ response: string; updatedPlan?: GeneratedGamePlan }> => {
  const model = "gemini-2.5-flash";

  const systemInstruction = `You are an AI game plan coach helping refine a game plan. The user may want to:
- Fill in [INSERT] markers with their specific information
- Add, remove, or modify steps
- Ask questions about the plan
- Adjust prompts or tool recommendations

When the user provides information to fill in markers, incorporate it into the plan.
When they ask questions, provide helpful answers.
When they request changes, describe what you would change.

Current plan:
${JSON.stringify(currentPlan, null, 2)}

Previous conversation:
${messages.map(m => `${m.role}: ${m.content}`).join('\n')}`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.4,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    return {
      response: text
    };

  } catch (error) {
    console.error("Gemini Refinement Error:", error);
    return {
      response: "I had trouble processing that. Could you try rephrasing?"
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