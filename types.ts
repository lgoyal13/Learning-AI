import React from 'react';

export type View = 'home' | 'quick-start' | 'modules' | 'reference';

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string; // Lucide icon name
  locked?: boolean;
}

export interface QuickStartStep {
  id: number;
  title: string;
  content: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SafetyStatus {
  SAFE = 'safe',
  WARNING = 'warning',
  DANGER = 'danger'
}

// --- Generator Types ---

export type TaskType = 'draft' | 'rewrite' | 'summarize' | 'analyze' | 'compare' | 'brainstorm' | 'transform-data';
export type Stakes = 'low' | 'medium' | 'high';
export type ModelEnv = 'chat' | 'workspace' | 'research' | 'notebook';
export type ExampleType = 'past-outputs' | 'raw-inputs' | 'docs' | 'none';

export interface PromptGeneratorInput {
  role: string;
  audience: string;
  taskType: TaskType;
  rawTaskDescription: string;
  stakes: Stakes;
  isRecurring: boolean;
  outputFormat: string;
  structureLevel: 'light' | 'medium' | 'high';
  tone: string;
  constraints: string;
  dataSensitivity: 'normal' | 'sensitive';
  willProvideExamples: boolean;
  exampleType: ExampleType;
  modelEnvironment: ModelEnv;
  recipeId?: string;
}

export interface PromptGeneratorOutput {
  id: string;
  createdAt: number;
  taskSnapshot: string;
  complexityLevel: 'Basic' | 'Intermediate' | 'Advanced';
  systemPromptTemplate: string | null;
  taskPromptTemplate: string;
  followUpPrompts: string[];
  exampleGuidance: string;
  modelRecommendation: string;
  modeRecommendation: 'Fast' | 'Pro' | 'Research' | 'Your-docs';
  reasoning: string;
}

// --- Prompt Coach Types ---

export interface PCTRDimension {
  rating: 'Strong' | 'Okay' | 'Missing';
  comment: string;
}

export interface PromptEvaluationOutput {
  summary: string;
  pctr: {
    persona: PCTRDimension;
    context: PCTRDimension;
    task: PCTRDimension;
    requirements: PCTRDimension;
  };
  improvedPrompt: string;
  tip: string;
}

// --- Simple Generator Types ---

export type AITool = 'chatgpt' | 'claude' | 'gemini' | 'unsure';

export interface SimpleGeneratorInput {
  task: string;
  audience: string;
  goal: string;
  tool: AITool;
}

export interface SimpleGeneratorOutput {
  prompt: string;
  pctrBreakdown: {
    persona: string;
    context: string;
    task: string;
    requirements: string;
  };
  toolSuggestion?: {
    recommended: 'chatgpt' | 'claude' | 'gemini';
    reason: string;
  };
}

// --- Coach Question Types ---

export interface QuestionOption {
  label: string;
  value: string;
}

export interface CoachQuestionConfig {
  question: string;
  options: QuestionOption[];
  allowSkip?: boolean;
  allowCustom?: boolean;
}

// --- Smart Input Extraction Types ---

export interface ExtractedContext {
  audience: string | null;      // Extracted audience (e.g., "VP" → "Senior leadership team")
  audienceMatch: string | null; // Which preset option it matches (e.g., "Leadership")
  goal: string | null;          // Extracted goal (e.g., "summarize" → "Inform and share information clearly")
  goalMatch: string | null;     // Which preset option it matches (e.g., "Inform")
  tool: AITool | null;          // If a specific tool was mentioned
  confidence: {
    audience: number;           // 0-100 confidence score
    goal: number;
    tool: number;
  };
}

// --- Game Plan Generator Types ---

export type GamePlanStage =
  | 'prompt-input'      // Stage 1a: User describes task
  | 'prompt-questions'  // Stage 1b: Clarifying questions
  | 'prompt-output'     // Stage 2: Show generated prompt + invitation
  | 'plan-questions'    // Stage 3: Clarifying questions for game plan
  | 'plan-generating'   // Stage 4: Loading state during generation
  | 'plan-view'         // Stage 5: Show full game plan
  | 'refinement';       // Stage 6: Chat interface for refinement

export type StepActor = 'Human' | 'AI-Assisted' | 'Mixed';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type InferredDomain = 'Finance & FP&A' | 'Marketing' | 'Business Ops / Strategy' | 'General Business';

export interface GeneratedStep {
  stepNumber: number;
  stepName: string;
  actor: StepActor;
  timeMinutes: number;
  tool: string | null;
  toolRationale: string | null;
  whatToDo: string;
  prompt: string | null;
  whyThisMatters: string;
  watchOut: string;
}

export interface GeneratedGamePlan {
  planName: string;
  generatedAt: string;
  inferredDomain: InferredDomain;
  domainReasoning: string;
  confidence: ConfidenceLevel;
  confidenceReasoning: string;
  userContextSummary: string;
  totalTimeMinutes: number;
  insertMarkers: string[];
  steps: GeneratedStep[];
}

export interface PlanQuestionsInput {
  successCriteria: string;
  startingPoint: string;
  constraints: string;
}

export interface GamePlanGeneratorInput {
  // From Stage 1
  task: string;
  audience: string;
  goal: string;
  tool: AITool;
  generatedPrompt: string;
  // From Stage 3
  successCriteria: string;
  startingPoint: string;
  constraints: string;
}

export interface RefinementMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneratorFlowState {
  stage: GamePlanStage;
  // Stage 1 data
  task: string;
  audience: string;
  goal: string;
  tool: AITool;
  generatedPrompt: SimpleGeneratorOutput | null;
  // Stage 3 data
  planQuestions: PlanQuestionsInput;
  // Stage 4-5 data
  gamePlan: GeneratedGamePlan | null;
  // Stage 6 data
  refinementMessages: RefinementMessage[];
  // UI state
  isLoading: boolean;
  error: string | null;
  copied: boolean;
}

// --- Task Planner Types ---

export type TaskPlannerPhase = 'input' | 'understanding' | 'questions' | 'generating' | 'output';
export type StepWho = 'you' | 'you-ai' | 'ai';

export interface TaskUnderstanding {
  deliverables: string[];      // What they're creating
  inputs: string[];            // What they have to work with
  audience: string | null;     // Who it's for
  timeline: string | null;     // When they need it
  constraints: string[];       // Any limitations mentioned
}

export interface ClarifyingQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  allowCustom: boolean;
}

export interface TaskPlanStep {
  number: number;
  title: string;
  who: StepWho;
  timeMinutes: number;
  tool: string | null;
  description: string;
  whyThisStep: string;
  prompt: string | null;
  promptCaveat: string | null;  // Warning for human steps
}

export interface TaskPlan {
  title: string;
  summary: string;
  totalTimeMinutes: number;
  stepCount: number;
  steps: TaskPlanStep[];
}

export interface TaskPlannerState {
  userInput: string;
  understanding: TaskUnderstanding | null;
  clarifyingQuestions: ClarifyingQuestion[];
  answers: Record<string, string>;
  complexity: 'simple' | 'multi-step' | null;
  plan: TaskPlan | null;
  singlePrompt: string | null;  // For simple tasks
  currentPhase: TaskPlannerPhase;
  isLoading: boolean;
  error: string | null;
}