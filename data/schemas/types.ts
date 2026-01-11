/**
 * AI Coach Data Schemas
 * ======================
 * These TypeScript interfaces define the shape of all data in the AI Coach platform.
 * Think of these as "character sheet templates" - they specify what fields exist
 * and what types of values are allowed.
 *
 * Last Updated: January 2026
 * Source: PROJECT_PLAN.md + Perplexity Research
 */

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

/** The AI tools we recommend for different tasks */
export type AITool =
  | 'chatgpt'      // GPT-4 - Fast writing, drafts, scenarios
  | 'claude'       // Claude 3 - Complex analysis, frameworks, reasoning
  | 'gemini'       // Gemini Pro - Data analysis, financial modeling
  | 'perplexity'   // Real-time research with citations
  | 'notebooklm'; // Document synthesis, knowledge extraction

/** Categories of workflows */
export type WorkflowCategory =
  | 'analysis'       // Data analysis, variance analysis, modeling
  | 'reporting'      // Creating reports, dashboards, presentations
  | 'planning'       // OKRs, budgets, strategic planning
  | 'research'       // Competitive intel, market research
  | 'communication'; // Emails, stakeholder updates, presentations

/** How often a workflow is typically done */
export type Frequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'ad-hoc';

/** Skill level required */
export type Complexity = 'beginner' | 'intermediate' | 'advanced';

// =============================================================================
// ROLE PROFILE
// =============================================================================

/**
 * Defines a business role that the AI Coach supports.
 * Example: Strategic Business Analyst, FP&A Analyst, Marketing Manager
 */
export interface RoleProfile {
  /** Unique identifier (e.g., "business-analyst") */
  id: string;

  /** Display name (e.g., "Strategic Business Analyst") */
  name: string;

  /** Brief description of the role */
  description: string;

  /** Key responsibilities (3-6 items) */
  coreResponsibilities: string[];

  /** Tools commonly used in this role */
  typicalTools: string[];

  /** How success is measured in this role */
  successMetrics: string[];

  /** How time is typically spent */
  timeAllocation: TimeAllocation[];

  /** Common frustrations and challenges */
  painPoints: string[];

  /** IDs of workflows relevant to this role */
  workflowIds: string[];

  /** Research sources for this role profile */
  sources: string[];
}

export interface TimeAllocation {
  /** Activity category (e.g., "Data Collection & Validation") */
  category: string;

  /** Percentage of time spent (0-100) */
  percentage: number;

  /** Whether this is a pain point that AI can help with */
  isPainPoint?: boolean;
}

// =============================================================================
// WORKFLOW
// =============================================================================

/**
 * A complete workflow showing current (manual) process vs AI-enhanced process.
 * This is the core data structure - each workflow teaches users how to do
 * a specific task more efficiently with AI.
 */
export interface Workflow {
  /** Unique identifier (e.g., "monthly-retention-analysis") */
  id: string;

  /** ID of the role this workflow belongs to */
  roleId: string;

  /** Display name (e.g., "Monthly Retention Analysis") */
  name: string;

  /** Category for grouping */
  category: WorkflowCategory;

  /** What this workflow accomplishes */
  description: string;

  /** When this workflow is typically performed */
  frequency: Frequency;

  /** Skill level required */
  complexity: Complexity;

  // -------------------------------------------------------------------------
  // Time & Value Metrics (from research)
  // -------------------------------------------------------------------------

  /** Total time in current manual process (minutes) */
  currentTimeMinutes: number;

  /** Total time with AI enhancement (minutes) */
  aiTimeMinutes: number;

  /** Calculated time saved (minutes) */
  timeSavedMinutes: number;

  /** Calculated percentage reduction */
  timeSavedPercentage: number;

  // -------------------------------------------------------------------------
  // Process Steps
  // -------------------------------------------------------------------------

  /** The current manual process (before AI) */
  currentProcess: ProcessStep[];

  /** The AI-enhanced process */
  aiProcess: AIProcessStep[];

  // -------------------------------------------------------------------------
  // Learning Content
  // -------------------------------------------------------------------------

  /** Why this workflow matters (business context) */
  whyItMatters: string;

  /** Common mistakes to avoid */
  commonMistakes: string[];

  /** Tips for getting the best results */
  tips: string[];

  /** IDs of prompt templates used in this workflow */
  promptIds: string[];

  // -------------------------------------------------------------------------
  // Metadata
  // -------------------------------------------------------------------------

  /** Tags for search/filtering */
  tags: string[];

  /** Research sources that validate this workflow */
  sources: string[];
}

/** A step in the current (manual) process */
export interface ProcessStep {
  /** Step number (1, 2, 3...) */
  stepNumber: number;

  /** What happens in this step */
  description: string;

  /** Time this step takes (minutes) */
  timeMinutes: number;

  /** Pain points in this step (why it's frustrating) */
  painPoints?: string[];
}

/** A step in the AI-enhanced process */
export interface AIProcessStep {
  /** Step number (1, 2, 3...) */
  stepNumber: number;

  /** What to do in this step */
  description: string;

  /** Which AI tool to use */
  tool: AITool;

  /** Time this step takes (minutes) */
  timeMinutes: number;

  /** ID of the prompt template to use (if applicable) */
  promptId?: string;

  /** Why we use this specific tool */
  toolRationale?: string;

  /** What to expect from the AI output */
  expectedOutput?: string;

  /** Tips specific to this step */
  tips?: string[];
}

// =============================================================================
// PROMPT TEMPLATE
// =============================================================================

/**
 * A reusable prompt template with PCTR framework breakdown.
 * Users can copy-paste these directly into AI tools.
 */
export interface PromptTemplate {
  /** Unique identifier (e.g., "retention-data-consolidation") */
  id: string;

  /** Which workflow this prompt belongs to */
  workflowId: string;

  /** Display name (e.g., "Data Consolidation Prompt") */
  name: string;

  /** Which step of the workflow this is for */
  stepNumber: number;

  /** Best AI tool to use with this prompt */
  recommendedTool: AITool;

  /** Alternative tools that also work */
  alternativeTools?: AITool[];

  // -------------------------------------------------------------------------
  // The Prompt Itself
  // -------------------------------------------------------------------------

  /** System prompt (if the tool supports it) */
  systemPrompt?: string;

  /** The main prompt template with [PLACEHOLDERS] */
  promptTemplate: string;

  // -------------------------------------------------------------------------
  // PCTR Framework Breakdown (for learning)
  // -------------------------------------------------------------------------

  /** PCTR breakdown to teach users WHY the prompt works */
  pctr: {
    /** Who should the AI act as? */
    persona: string;

    /** What background info does the AI need? */
    context: string;

    /** What specifically should the AI do? */
    task: string;

    /** Format, constraints, quality criteria */
    requirements: string[];
  };

  // -------------------------------------------------------------------------
  // Usage Guidance
  // -------------------------------------------------------------------------

  /** When to use this prompt */
  whenToUse: string;

  /** Things that often go wrong */
  commonMistakes?: string[];

  /** Example inputs to replace placeholders */
  exampleInputs?: Record<string, string>;

  /** What good output looks like (snippet) */
  exampleOutput?: string;

  // -------------------------------------------------------------------------
  // Variations
  // -------------------------------------------------------------------------

  /** Alternative versions for different contexts */
  variations?: PromptVariation[];

  // -------------------------------------------------------------------------
  // Quality & Metadata
  // -------------------------------------------------------------------------

  /** Quality score based on PCTR (1-10) */
  qualityScore: number;

  /** Sources that informed this prompt design */
  sources?: string[];
}

export interface PromptVariation {
  /** Name of the variation (e.g., "Executive Summary Version") */
  name: string;

  /** When to use this variation */
  useCase: string;

  /** The modified prompt */
  prompt: string;
}

// =============================================================================
// TASK CATEGORY (for the Intelligent Task Advisor)
// =============================================================================

/**
 * High-level task categories that help the advisor match user needs to workflows.
 * Used in the conversational intake flow.
 */
export interface TaskCategory {
  /** Unique identifier */
  id: string;

  /** Display name (e.g., "Data Analysis & Reporting") */
  name: string;

  /** Description of what tasks fall in this category */
  description: string;

  /** Roles that commonly do these tasks */
  roleIds: string[];

  /** Best tools for these tasks */
  recommendedTools: AITool[];

  /** Common patterns in how AI can help */
  aiPatterns: string[];

  /** IDs of workflows in this category */
  workflowIds: string[];
}

// =============================================================================
// HELPER TYPES
// =============================================================================

/** Index file structure for loading all data */
export interface DataIndex {
  roles: Record<string, RoleProfile>;
  workflows: Record<string, Workflow>;
  prompts: Record<string, PromptTemplate>;
  categories: Record<string, TaskCategory>;
}

/** For displaying workflow cards in the UI */
export interface WorkflowSummary {
  id: string;
  name: string;
  category: WorkflowCategory;
  frequency: Frequency;
  timeSavedMinutes: number;
  timeSavedPercentage: number;
  complexity: Complexity;
}
