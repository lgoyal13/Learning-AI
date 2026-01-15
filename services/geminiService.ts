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
  RefinementMessage,
  TaskUnderstanding,
  ClarifyingQuestion,
  TaskPlan,
  TaskPlanStep,
  StepWho
} from "../types";

// Initialize the client with the API key from the environment.
// Users must create a .env file with their own VITE_GEMINI_API_KEY.
// Get a free API key at: https://aistudio.google.com/apikey
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

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

### Output Format
Generate prompts with this EXACT markdown structure:
\`\`\`
**ROLE**
[Specific expert persona - be specific, not generic like "helpful assistant"]

**CONTEXT**
- [Situation - what's happening]
- [What you have - inputs, materials]
- [Constraints - requirements, limitations]
- [Audience - who this is for]

**TASK**
[Clear, specific instruction - what exactly to do. Use bullet points for multiple items]

**FORMAT**
[How output should be structured - bullets, sections, length]

**INPUT**
[INSERT: Clear description of what to paste here]
\`\`\`

### Guidelines
1. Use markdown formatting (bold headers, bullets, whitespace)
2. Be specific - "Extract top 5 trends" not "summarize"
3. Be bounded - Clear scope, not open-ended
4. Actionable output - Specify format user can actually use
5. [INSERT: description] markers - Make gaps explicit with clear descriptions
6. Sound professional - The prompt should read like an expert wrote it

### Tool Suggestion (only if user is unsure)
If the user selected "unsure" for their tool, recommend the best one:
- **ChatGPT**: Best for structured output, data analysis, code, step-by-step reasoning
- **Claude**: Best for nuanced writing, executive tone, long-form content, careful analysis
- **Gemini**: Best for research tasks, large context, multimodal tasks, current information

### PCTR Breakdown
For each element (persona=ROLE, context=CONTEXT, task=TASK, requirements=FORMAT), write ONE sentence explaining what it contributes to the prompt's effectiveness.`;

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

// ============================================================================
// SMART INPUT EXTRACTION
// ============================================================================

/**
 * Extracted context from user's task input
 */
export interface ExtractedContext {
  audience: string | null;
  audienceMatch: string | null;
  goal: string | null;
  goalMatch: string | null;
  tool: 'chatgpt' | 'claude' | 'gemini' | null;
  confidence: {
    audience: number;
    goal: number;
    tool: number;
  };
}

/**
 * Extracts context from user's initial task input.
 * Identifies audience, goal, and tool mentions to pre-fill questions.
 */
export const extractContextFromInput = async (
  input: string
): Promise<ExtractedContext> => {
  const model = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      audience: {
        type: Type.STRING,
        description: "The audience mentioned in the input, or null if not mentioned"
      },
      audienceMatch: {
        type: Type.STRING,
        enum: ["Board/Execs", "Leadership", "Team", "Clients"],
        description: "Which preset option best matches the audience"
      },
      goal: {
        type: Type.STRING,
        description: "The goal/purpose mentioned in the input, or null if not clear"
      },
      goalMatch: {
        type: Type.STRING,
        enum: ["Inform", "Persuade", "Analyze", "Get approval"],
        description: "Which preset option best matches the goal"
      },
      tool: {
        type: Type.STRING,
        enum: ["chatgpt", "claude", "gemini"],
        description: "If a specific AI tool was mentioned"
      },
      confidenceAudience: {
        type: Type.NUMBER,
        description: "Confidence in audience extraction (0-100)"
      },
      confidenceGoal: {
        type: Type.NUMBER,
        description: "Confidence in goal extraction (0-100)"
      },
      confidenceTool: {
        type: Type.NUMBER,
        description: "Confidence in tool extraction (0-100)"
      }
    },
    required: ["confidenceAudience", "confidenceGoal", "confidenceTool"]
  };

  const systemInstruction = `You extract context from a user's task description to pre-fill form questions.

### Audience Detection
Look for mentions of WHO this is for:
- "for my VP", "for the VP" → Leadership (75%+ confidence)
- "for the board", "board presentation" → Board/Execs (80%+ confidence)
- "for my team", "team meeting" → Team (75%+ confidence)
- "for clients", "customer-facing" → Clients (75%+ confidence)
- Titles like "VP", "director", "manager" → Leadership
- "executives", "C-suite" → Board/Execs

### Goal Detection
Look for the PURPOSE of the task:
- "summarize", "report on", "share", "present" → Inform
- "convince", "propose", "recommend", "advocate" → Persuade
- "analyze", "compare", "evaluate", "assess" → Analyze
- "get approval", "budget request", "sign-off" → Get approval

### Tool Detection
Look for specific tool mentions:
- "ChatGPT", "GPT" → chatgpt
- "Claude" → claude
- "Gemini" → gemini

### Confidence Guidelines
- 80-100: Explicit mention (e.g., "for my VP" → 85%)
- 50-79: Implied but not explicit
- 0-49: Guessing or very weak signal

Be conservative. Only return high confidence when there's clear evidence.`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `Extract context from this task description:\n\n"${input}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.1,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    return {
      audience: data.audience || null,
      audienceMatch: data.audienceMatch || null,
      goal: data.goal || null,
      goalMatch: data.goalMatch || null,
      tool: data.tool || null,
      confidence: {
        audience: Math.min(100, Math.max(0, data.confidenceAudience || 0)),
        goal: Math.min(100, Math.max(0, data.confidenceGoal || 0)),
        tool: Math.min(100, Math.max(0, data.confidenceTool || 0)),
      }
    };

  } catch (error) {
    console.error("Gemini Context Extraction Error:", error);

    // Fallback: Simple keyword-based extraction
    const inputLower = input.toLowerCase();
    let audience: string | null = null;
    let audienceMatch: string | null = null;
    let audienceConfidence = 0;

    if (inputLower.includes('board') || inputLower.includes('executive')) {
      audience = 'Board/executives';
      audienceMatch = 'Board/Execs';
      audienceConfidence = 70;
    } else if (inputLower.includes('vp') || inputLower.includes('leadership') || inputLower.includes('director')) {
      audience = 'Leadership';
      audienceMatch = 'Leadership';
      audienceConfidence = 75;
    } else if (inputLower.includes('team') || inputLower.includes('colleague')) {
      audience = 'Team';
      audienceMatch = 'Team';
      audienceConfidence = 70;
    } else if (inputLower.includes('client') || inputLower.includes('customer')) {
      audience = 'Clients';
      audienceMatch = 'Clients';
      audienceConfidence = 70;
    }

    let goal: string | null = null;
    let goalMatch: string | null = null;
    let goalConfidence = 0;

    if (inputLower.includes('analyze') || inputLower.includes('analysis')) {
      goal = 'Analyze';
      goalMatch = 'Analyze';
      goalConfidence = 70;
    } else if (inputLower.includes('persuade') || inputLower.includes('recommend')) {
      goal = 'Persuade';
      goalMatch = 'Persuade';
      goalConfidence = 65;
    } else if (inputLower.includes('approval') || inputLower.includes('sign-off')) {
      goal = 'Get approval';
      goalMatch = 'Get approval';
      goalConfidence = 70;
    }

    return {
      audience,
      audienceMatch,
      goal,
      goalMatch,
      tool: null,
      confidence: {
        audience: audienceConfidence,
        goal: goalConfidence,
        tool: 0,
      }
    };
  }
};

// ============================================================================
// COMPLEXITY DETECTION
// ============================================================================

/**
 * Complexity assessment result
 */
export interface ComplexityAssessment {
  complexity: 'simple' | 'multi-step';
  confidence: number;
  signals: string[];
  bridgeMessage: string | null;
}

/**
 * Assesses whether a task is simple (single prompt) or multi-step (needs planning).
 * Used to determine whether to show the bridge to Task Planner.
 */
export const assessComplexity = async (
  task: string,
  context?: { audience?: string; goal?: string }
): Promise<ComplexityAssessment> => {
  const model = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      complexity: {
        type: Type.STRING,
        enum: ["simple", "multi-step"],
        description: "Whether this task can be done with a single prompt or needs multiple steps"
      },
      confidence: {
        type: Type.NUMBER,
        description: "How confident in this assessment (0-100)"
      },
      signals: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "What signals led to this assessment (1-3 items)"
      },
      bridgeMessage: {
        type: Type.STRING,
        description: "If multi-step, a brief message explaining why planning would help. Null if simple."
      }
    },
    required: ["complexity", "confidence", "signals"]
  };

  const systemInstruction = `You assess whether a task is simple (single prompt) or multi-step (needs planning).

### SIMPLE tasks (single prompt):
- Single deliverable (one email, one summary, one draft)
- Clear, bounded scope
- No source documents to process
- User seems confident about what they need

Examples: "Write an email about X", "Summarize this article", "Draft feedback for Y"

### MULTI-STEP tasks (needs planning):
- Multiple deliverables ("report AND presentation", "doc AND slides")
- Source document processing ("from these 12 docs", "synthesize", "consolidate")
- Sequential dependency ("first X, then Y", "after I do X")
- Vague/unclear path (user seems unsure)
- Research + synthesis required

Examples: "Create annual report from monthly data", "Research competitors and build recommendations", "Prepare board presentation from Q4 data"

### Response Guidelines:
- Err on the side of "simple" for borderline cases
- Only mark as "multi-step" when there are clear signals
- Bridge message should be conversational, mentioning what they said that triggered this
- Keep signals brief (3-5 words each)`;

  try {
    const inputContent = context
      ? `Task: ${task}\nAudience: ${context.audience || 'Not specified'}\nGoal: ${context.goal || 'Not specified'}`
      : `Task: ${task}`;

    const result = await ai.models.generateContent({
      model,
      contents: `Assess this task's complexity:\n\n${inputContent}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.1, // Very low for consistent assessment
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    return {
      complexity: data.complexity || 'simple',
      confidence: Math.min(100, Math.max(0, data.confidence || 70)),
      signals: Array.isArray(data.signals) ? data.signals.slice(0, 3) : [],
      bridgeMessage: data.complexity === 'multi-step' ? data.bridgeMessage : null
    };

  } catch (error) {
    console.error("Gemini Complexity Assessment Error:", error);

    // Fallback: simple keyword-based detection
    const taskLower = task.toLowerCase();
    const multiStepSignals: string[] = [];

    if (taskLower.includes(' and ') && (taskLower.includes('report') || taskLower.includes('presentation') || taskLower.includes('doc'))) {
      multiStepSignals.push('Multiple deliverables');
    }
    if (taskLower.match(/\d+\s*(doc|report|file|sheet)/)) {
      multiStepSignals.push('Source documents to process');
    }
    if (taskLower.includes('first') && taskLower.includes('then')) {
      multiStepSignals.push('Sequential steps mentioned');
    }
    if (taskLower.includes('research') && (taskLower.includes('recommend') || taskLower.includes('analysis'))) {
      multiStepSignals.push('Research + synthesis');
    }

    const isMultiStep = multiStepSignals.length >= 1;

    return {
      complexity: isMultiStep ? 'multi-step' : 'simple',
      confidence: 50,
      signals: multiStepSignals.length > 0 ? multiStepSignals : ['Single deliverable'],
      bridgeMessage: isMultiStep
        ? "This looks like it might need multiple steps. Want help planning the approach?"
        : null
    };
  }
};

// ============================================================================
// TASK PLANNER SERVICES
// ============================================================================

/**
 * Analyzes user input and extracts structured understanding of their task.
 * This powers the "Here's what I'm hearing" card in Task Planner.
 */
export const analyzeTaskForPlanning = async (input: string): Promise<TaskUnderstanding> => {
  const model = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      deliverables: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "What the user is trying to create (e.g., 'Annual report', 'Executive presentation')"
      },
      inputs: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "What they have to work with (e.g., '12 monthly reviews', 'Q4 data')"
      },
      audience: {
        type: Type.STRING,
        description: "Who this is for (e.g., 'VP', 'Board', 'Team'). Return null if not mentioned."
      },
      timeline: {
        type: Type.STRING,
        description: "When they need it (e.g., 'by Friday', 'end of week'). Return null if not mentioned."
      },
      constraints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Any limitations or requirements mentioned (e.g., 'must be concise', 'formal tone')"
      }
    },
    required: ["deliverables", "inputs", "constraints"]
  };

  const systemInstruction = `You extract structured understanding from a user's task description.

### What to Extract

1. **Deliverables**: What are they creating? Look for:
   - Document types: report, presentation, email, proposal
   - Specific outputs: "annual summary", "board deck", "competitor analysis"
   - Multiple items: "report AND presentation" → two deliverables

2. **Inputs**: What do they have to work with? Look for:
   - Source materials: "from 12 monthly reports", "using Q4 data"
   - Reference documents: "based on the strategy doc"
   - Data sources: "our CRM data", "survey results"

3. **Audience**: Who is this for? Look for:
   - Titles: VP, director, board, executives, team
   - Descriptions: "my boss", "leadership", "clients"

4. **Timeline**: When do they need it? Look for:
   - Specific dates: "by Friday", "before Monday"
   - Relative: "this week", "ASAP", "next meeting"

5. **Constraints**: Any requirements or limitations? Look for:
   - Format: "one page", "10 slides max"
   - Tone: "formal", "casual", "executive-ready"
   - Other: "no jargon", "include data visualizations"

### Guidelines
- Be specific, not generic
- If something isn't mentioned, use empty array or null
- Don't infer too much - only extract what's clearly stated or strongly implied`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `Extract task understanding from this description:\n\n"${input}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.1,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    return {
      deliverables: Array.isArray(data.deliverables) ? data.deliverables : [],
      inputs: Array.isArray(data.inputs) ? data.inputs : [],
      audience: data.audience || null,
      timeline: data.timeline || null,
      constraints: Array.isArray(data.constraints) ? data.constraints : []
    };

  } catch (error) {
    console.error("Gemini Task Analysis Error:", error);

    // Fallback: basic extraction
    const inputLower = input.toLowerCase();
    const deliverables: string[] = [];
    const inputs: string[] = [];

    // Extract deliverables from keywords
    if (inputLower.includes('report')) deliverables.push('Report');
    if (inputLower.includes('presentation')) deliverables.push('Presentation');
    if (inputLower.includes('email')) deliverables.push('Email');
    if (inputLower.includes('analysis')) deliverables.push('Analysis');
    if (deliverables.length === 0) deliverables.push('Document');

    // Extract inputs from patterns
    const monthMatch = input.match(/(\d+)\s*month/i);
    if (monthMatch) inputs.push(`${monthMatch[1]} monthly documents`);
    if (inputLower.includes('data')) inputs.push('Data');

    // Extract audience
    let audience: string | null = null;
    if (inputLower.includes('vp') || inputLower.includes('leadership')) audience = 'VP/Leadership';
    else if (inputLower.includes('board')) audience = 'Board';
    else if (inputLower.includes('team')) audience = 'Team';

    return {
      deliverables,
      inputs,
      audience,
      timeline: null,
      constraints: []
    };
  }
};

/**
 * Generates 0-2 clarifying questions based on gaps in understanding.
 * CRITICAL: Maximum 2 questions - never exceed this.
 */
export const generateClarifyingQuestions = async (
  understanding: TaskUnderstanding
): Promise<ClarifyingQuestion[]> => {
  const model = "gemini-2.5-flash";

  const questionSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      question: { type: Type.STRING },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING },
            value: { type: Type.STRING }
          },
          required: ["label", "value"]
        }
      },
      allowCustom: { type: Type.BOOLEAN }
    },
    required: ["id", "question", "options", "allowCustom"]
  };

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: questionSchema,
        description: "0-2 clarifying questions. Return empty array if understanding is complete."
      }
    },
    required: ["questions"]
  };

  const systemInstruction = `You generate clarifying questions to improve a task plan.

### CRITICAL RULES
- Return 0-2 questions MAXIMUM. Never return more than 2.
- If the understanding is already complete enough to generate a good plan, return NO questions (empty array).
- Only ask what truly matters for creating a better plan.

### When to Ask Questions

Ask about **main message/narrative** if:
- Multiple deliverables mentioned
- High-stakes audience (board, executives)
- User creating summary/synthesis

Ask about **polish level** if:
- Audience not clear on formality needs
- Could be internal draft vs. final deliverable

Ask about **timeline/priority** if:
- Multiple deliverables with unclear priorities
- Scope seems large

### Question Format
- Questions should feel like a smart colleague asking for clarification
- Provide 3-4 chip options + allow custom input
- Options should be practical, not generic

### What NOT to Ask
- Don't ask about things already mentioned
- Don't ask vague questions like "Anything else?"
- Don't ask about tool preferences (we'll recommend)

### Current Understanding
${JSON.stringify(understanding, null, 2)}`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `Generate clarifying questions (0-2 max) based on this task understanding:\n\n${JSON.stringify(understanding)}`,
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

    // Enforce maximum of 2 questions
    const questions = Array.isArray(data.questions) ? data.questions.slice(0, 2) : [];

    return questions.map((q: ClarifyingQuestion, index: number) => ({
      id: q.id || `q${index + 1}`,
      question: q.question || "What else should we know?",
      options: Array.isArray(q.options) ? q.options.slice(0, 4) : [],
      allowCustom: q.allowCustom !== false
    }));

  } catch (error) {
    console.error("Gemini Question Generation Error:", error);

    // Fallback: return contextual questions based on gaps
    const questions: ClarifyingQuestion[] = [];

    // If multiple deliverables, ask about main message
    if (understanding.deliverables.length > 1) {
      questions.push({
        id: "main-message",
        question: "What's the main message you want to convey?",
        options: [
          { label: "Growth and wins", value: "growth" },
          { label: "Challenges ahead", value: "challenges" },
          { label: "Year in review", value: "review" },
          { label: "Recommendations", value: "recommendations" }
        ],
        allowCustom: true
      });
    }

    // If no audience clarity, ask about polish level
    if (!understanding.audience) {
      questions.push({
        id: "polish-level",
        question: "How polished does this need to be?",
        options: [
          { label: "Internal/casual", value: "casual" },
          { label: "Executive-ready", value: "executive" },
          { label: "Board-level", value: "board" }
        ],
        allowCustom: true
      });
    }

    return questions.slice(0, 2);
  }
};

/**
 * Generates a step-by-step task plan.
 * CRITICAL: 3-5 steps typical, 7 maximum. Never exceed 7.
 */
export const generateTaskPlan = async (
  understanding: TaskUnderstanding,
  answers: Record<string, string>
): Promise<TaskPlan> => {
  const model = "gemini-2.5-flash";

  const stepSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      number: { type: Type.NUMBER },
      title: { type: Type.STRING, description: "Clear action-oriented title" },
      who: {
        type: Type.STRING,
        enum: ["you", "you-ai", "ai"],
        description: "Who does this step: you (human), you-ai (human with AI help), ai (AI handles it)"
      },
      timeMinutes: { type: Type.NUMBER, description: "Realistic time estimate in minutes" },
      tool: {
        type: Type.STRING,
        description: "Recommended AI tool: ChatGPT, Claude, Gemini, or null for human-only steps"
      },
      description: { type: Type.STRING, description: "2-4 sentences explaining what to do" },
      whyThisStep: { type: Type.STRING, description: "1-2 sentences on why this matters" },
      prompt: {
        type: Type.STRING,
        description: "Full PCTR-formatted prompt for AI steps. Include [INSERT: description] for gaps."
      },
      promptCaveat: {
        type: Type.STRING,
        description: "For 'you' steps, a note about why this is best done by human but offer AI help anyway"
      }
    },
    required: ["number", "title", "who", "timeMinutes", "description", "whyThisStep"]
  };

  const planSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "Concise plan title based on the task" },
      summary: { type: Type.STRING, description: "1-2 sentence summary of the approach" },
      totalTimeMinutes: { type: Type.NUMBER },
      stepCount: { type: Type.NUMBER },
      steps: {
        type: Type.ARRAY,
        items: stepSchema,
        description: "3-5 steps (7 maximum)"
      }
    },
    required: ["title", "summary", "totalTimeMinutes", "stepCount", "steps"]
  };

  const systemInstruction = `You are a task planning consultant helping business professionals accomplish their work.

### CRITICAL CONSTRAINTS
- Plans must have 3-5 steps. Maximum 7 steps. Never exceed 7.
- Ask yourself: "What's the SMALLEST plan that gets them to DONE?"
- Only add steps that are truly necessary.

### Step Assignment Logic

**"you" (Human recommended):**
- Narrative/story decisions
- Political/contextual judgment
- Final review and approval
- Decisions requiring institutional knowledge
For these steps, STILL include a prompt with promptCaveat explaining why human is better but AI can help.

**"you-ai" (Human + AI together):**
- Data extraction from documents
- Synthesis and summarization
- First drafts of content
- Research and information gathering

**"ai" (AI can handle alone):**
- Simple transformations
- Reformatting
- Proofreading
- Template application

### Prompt Format (PCTR)
Every AI step needs a well-structured prompt:
\`\`\`
**ROLE**
[Specific expert persona]

**CONTEXT**
- [Situation]
- [What you have]
- [Constraints]
- [Audience]

**TASK**
[Clear, specific instruction]

**FORMAT**
[Output structure]

**INPUT**
[INSERT: description of what to paste]
\`\`\`

### Tool Recommendations
- **Claude**: Long-form writing, nuanced analysis, executive tone
- **ChatGPT**: Structured output, data analysis, step-by-step
- **Gemini**: Research, large context, multimodal

### INSERT Markers
Use [INSERT: description] for any information gaps. Be specific:
- Good: [INSERT: paste your 12 monthly review documents here]
- Bad: [INSERT: data]

### User Context
Deliverables: ${JSON.stringify(understanding.deliverables)}
Inputs: ${JSON.stringify(understanding.inputs)}
Audience: ${understanding.audience || 'Not specified'}
Timeline: ${understanding.timeline || 'Not specified'}
Constraints: ${JSON.stringify(understanding.constraints)}
Additional answers: ${JSON.stringify(answers)}`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `Generate a task plan (3-7 steps) for this task:\n\n${systemInstruction}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
        temperature: 0.3,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");

    const data = JSON.parse(text);

    // Enforce maximum of 7 steps
    const steps: TaskPlanStep[] = (Array.isArray(data.steps) ? data.steps : [])
      .slice(0, 7)
      .map((step: TaskPlanStep, index: number) => ({
        number: index + 1,
        title: step.title || `Step ${index + 1}`,
        who: (step.who as StepWho) || 'you-ai',
        timeMinutes: step.timeMinutes || 15,
        tool: step.tool || null,
        description: step.description || "Complete this step.",
        whyThisStep: step.whyThisStep || "This step moves you forward.",
        prompt: step.prompt || null,
        promptCaveat: step.who === 'you' ? (step.promptCaveat || "This step benefits from your judgment, but AI can help if you want a starting point.") : null
      }));

    const totalTime = steps.reduce((sum, step) => sum + step.timeMinutes, 0);

    return {
      title: data.title || "Your Task Plan",
      summary: data.summary || `A ${steps.length}-step plan to complete your task.`,
      totalTimeMinutes: totalTime,
      stepCount: steps.length,
      steps
    };

  } catch (error) {
    console.error("Gemini Plan Generation Error:", error);

    // Fallback plan based on deliverables
    const fallbackSteps: TaskPlanStep[] = [
      {
        number: 1,
        title: "Define Your Focus",
        who: "you",
        timeMinutes: 15,
        tool: null,
        description: "Before diving in, clarify what success looks like. What's the key message? Who's the primary audience?",
        whyThisStep: "Clear goals prevent wasted effort and rework.",
        prompt: "**ROLE**\nStrategic communications advisor\n\n**CONTEXT**\n- I'm working on: [INSERT: your deliverable]\n- Audience: [INSERT: who this is for]\n\n**TASK**\nHelp me identify 2-3 possible angles for this work and suggest which would be most impactful.\n\n**FORMAT**\nBrief options with pros/cons\n\n**INPUT**\n[INSERT: any context you have]",
        promptCaveat: "You know the context and politics best, but AI can help brainstorm angles."
      },
      {
        number: 2,
        title: "Gather and Organize Information",
        who: "you-ai",
        timeMinutes: 30,
        tool: "Claude",
        description: "Extract key information from your source materials. AI is great at pulling out patterns and organizing data.",
        whyThisStep: "Good inputs lead to good outputs. This step builds your foundation.",
        prompt: "**ROLE**\nSenior analyst with expertise in data synthesis\n\n**CONTEXT**\n- I have [INSERT: your source materials]\n- I need to extract key information for [INSERT: your deliverable]\n\n**TASK**\nReview the following and extract:\n- Key data points\n- Notable trends or patterns\n- Important quotes or findings\n\n**FORMAT**\nOrganized bullets grouped by theme\n\n**INPUT**\n[INSERT: paste your source documents here]",
        promptCaveat: null
      },
      {
        number: 3,
        title: "Create Your Draft",
        who: "you-ai",
        timeMinutes: 30,
        tool: "Claude",
        description: "Using your organized information, create a first draft. Don't aim for perfection - aim for a solid starting point.",
        whyThisStep: "AI accelerates drafting; you add judgment and polish.",
        prompt: "**ROLE**\nSenior professional writer\n\n**CONTEXT**\n- Creating: [INSERT: your deliverable type]\n- Audience: [INSERT: who this is for]\n- Key information: [INSERT: summary from Step 2]\n\n**TASK**\nDraft [INSERT: deliverable] with clear structure and professional tone.\n\n**FORMAT**\n[INSERT: format requirements]\n\n**INPUT**\n[INSERT: your organized information from Step 2]",
        promptCaveat: null
      },
      {
        number: 4,
        title: "Review and Finalize",
        who: "you",
        timeMinutes: 20,
        tool: null,
        description: "Review the draft with fresh eyes. Check for accuracy, tone, and completeness. Make final adjustments.",
        whyThisStep: "Human judgment ensures quality and catches what AI misses.",
        prompt: "**ROLE**\nEditor and quality reviewer\n\n**CONTEXT**\n- I have a draft of [INSERT: your deliverable]\n- Audience: [INSERT: who this is for]\n\n**TASK**\nReview this draft and:\n1. Flag any factual issues or unclear points\n2. Suggest tone improvements\n3. Identify missing elements\n\n**FORMAT**\nBulleted feedback organized by priority\n\n**INPUT**\n[INSERT: paste your draft here]",
        promptCaveat: "Your judgment matters most here, but AI can provide a second opinion."
      }
    ];

    return {
      title: "Your Task Plan",
      summary: "A straightforward plan to complete your task efficiently.",
      totalTimeMinutes: 95,
      stepCount: 4,
      steps: fallbackSteps
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