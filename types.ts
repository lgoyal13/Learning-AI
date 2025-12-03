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
