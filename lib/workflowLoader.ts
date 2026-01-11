// Workflow and prompt data loader
// Loads workflow JSON files and their linked prompt templates

import type { Workflow, PromptTemplate } from '../data/schemas/types';

// Import all workflows
import monthlyRetentionAnalysis from '../data/workflows/monthly-retention-analysis.json';
import okrFrameworkDevelopment from '../data/workflows/okr-framework-development.json';
import competitiveIntelligenceReport from '../data/workflows/competitive-intelligence-report.json';
import monthlyBusinessReview from '../data/workflows/monthly-business-review.json';
import executiveDashboardBuild from '../data/workflows/executive-dashboard-build.json';
import monthlyVarianceAnalysis from '../data/workflows/monthly-variance-analysis.json';
import rollingForecastBuild from '../data/workflows/rolling-forecast-build.json';
import annualBudgetProcess from '../data/workflows/annual-budget-process.json';
import boardFinancialReporting from '../data/workflows/board-financial-reporting.json';
import investmentRoiAnalysis from '../data/workflows/investment-roi-analysis.json';
import campaignPlanningLaunch from '../data/workflows/campaign-planning-launch.json';
import weeklyMarketingReporting from '../data/workflows/weekly-marketing-reporting.json';
import contentStrategyCopywriting from '../data/workflows/content-strategy-copywriting.json';
import emailSequenceCreation from '../data/workflows/email-sequence-creation.json';
import marketingCompetitiveAnalysis from '../data/workflows/marketing-competitive-analysis.json';

// Import all prompts
import retentionDataConsolidation from '../data/prompts/retention-data-consolidation.json';
import retentionVarianceAnalysis from '../data/prompts/retention-variance-analysis.json';
import retentionRootCauseAnalysis from '../data/prompts/retention-root-cause-analysis.json';
import retentionReportDraft from '../data/prompts/retention-report-draft.json';
import okrFrameworkGeneration from '../data/prompts/okr-framework-generation.json';
import competitiveResearchQuery from '../data/prompts/competitive-research-query.json';
import fpaVarianceCommentary from '../data/prompts/fpa-variance-commentary.json';
import campaignMessagingDevelopment from '../data/prompts/campaign-messaging-development.json';
import mbrInsightGeneration from '../data/prompts/mbr-insight-generation.json';

// Workflow registry
const workflows: Record<string, Workflow> = {
  'monthly-retention-analysis': monthlyRetentionAnalysis as unknown as Workflow,
  'okr-framework-development': okrFrameworkDevelopment as unknown as Workflow,
  'competitive-intelligence-report': competitiveIntelligenceReport as unknown as Workflow,
  'monthly-business-review': monthlyBusinessReview as unknown as Workflow,
  'executive-dashboard-build': executiveDashboardBuild as unknown as Workflow,
  'monthly-variance-analysis': monthlyVarianceAnalysis as unknown as Workflow,
  'rolling-forecast-build': rollingForecastBuild as unknown as Workflow,
  'annual-budget-process': annualBudgetProcess as unknown as Workflow,
  'board-financial-reporting': boardFinancialReporting as unknown as Workflow,
  'investment-roi-analysis': investmentRoiAnalysis as unknown as Workflow,
  'campaign-planning-launch': campaignPlanningLaunch as unknown as Workflow,
  'weekly-marketing-reporting': weeklyMarketingReporting as unknown as Workflow,
  'content-strategy-copywriting': contentStrategyCopywriting as unknown as Workflow,
  'email-sequence-creation': emailSequenceCreation as unknown as Workflow,
  'marketing-competitive-analysis': marketingCompetitiveAnalysis as unknown as Workflow,
};

// Prompt registry
const prompts: Record<string, PromptTemplate> = {
  'retention-data-consolidation': retentionDataConsolidation as unknown as PromptTemplate,
  'retention-variance-analysis': retentionVarianceAnalysis as unknown as PromptTemplate,
  'retention-root-cause-analysis': retentionRootCauseAnalysis as unknown as PromptTemplate,
  'retention-report-draft': retentionReportDraft as unknown as PromptTemplate,
  'okr-framework-generation': okrFrameworkGeneration as unknown as PromptTemplate,
  'competitive-research-query': competitiveResearchQuery as unknown as PromptTemplate,
  'fpa-variance-commentary': fpaVarianceCommentary as unknown as PromptTemplate,
  'campaign-messaging-development': campaignMessagingDevelopment as unknown as PromptTemplate,
  'mbr-insight-generation': mbrInsightGeneration as unknown as PromptTemplate,
};

// Get a single workflow by ID
export function getWorkflow(id: string): Workflow | null {
  return workflows[id] || null;
}

// Get a single prompt by ID
export function getPrompt(id: string): PromptTemplate | null {
  return prompts[id] || null;
}

// Get all workflows
export function getAllWorkflows(): Workflow[] {
  return Object.values(workflows);
}

// Get workflows by role
export function getWorkflowsByRole(roleId: string): Workflow[] {
  return Object.values(workflows).filter(w => w.roleId === roleId);
}

// Get workflow with all its linked prompts
export function getWorkflowWithPrompts(workflowId: string): {
  workflow: Workflow;
  prompts: Record<string, PromptTemplate>;
} | null {
  const workflow = getWorkflow(workflowId);
  if (!workflow) return null;

  const linkedPrompts: Record<string, PromptTemplate> = {};

  if (workflow.promptIds) {
    for (const promptId of workflow.promptIds) {
      const prompt = getPrompt(promptId);
      if (prompt) {
        linkedPrompts[promptId] = prompt;
      }
    }
  }

  return { workflow, prompts: linkedPrompts };
}

// Get prompt for a specific step
export function getPromptForStep(workflow: Workflow, stepNumber: number): PromptTemplate | null {
  const step = workflow.aiProcess?.find(s => s.stepNumber === stepNumber);
  if (!step?.promptId) return null;
  return getPrompt(step.promptId);
}

// Tool display names and colors
export const toolConfig: Record<string, { name: string; color: string; bgColor: string }> = {
  gemini: { name: 'Gemini', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  chatgpt: { name: 'ChatGPT', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  claude: { name: 'Claude', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  perplexity: { name: 'Perplexity', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  notebooklm: { name: 'NotebookLM', color: 'text-amber-700', bgColor: 'bg-amber-100' },
};

// Role display names
export const roleNames: Record<string, string> = {
  'business-analyst': 'Business Analyst',
  'finance-analyst': 'FP&A / Finance',
  'marketing-manager': 'Marketing',
};

// Workflow summary type for Gemini context
export interface WorkflowSummary {
  id: string;
  name: string;
  roleId: string;
  roleName: string;
  description: string;
  category: string;
  stepCount: number;
  stepOverview: string[];
  timeSavedPercentage: number;
  aiTimeMinutes: number;
  tags: string[];
}

// Get concise summaries of all workflows for Gemini context
export function getWorkflowSummaries(roleFilter?: string): WorkflowSummary[] {
  const workflowList = roleFilter
    ? getWorkflowsByRole(roleFilter)
    : getAllWorkflows();

  return workflowList.map(w => ({
    id: w.id,
    name: w.name,
    roleId: w.roleId,
    roleName: roleNames[w.roleId] || w.roleId,
    description: w.description,
    category: w.category,
    stepCount: w.aiProcess?.length || 0,
    stepOverview: w.aiProcess?.map(s => s.description) || [],
    timeSavedPercentage: w.timeSavedPercentage,
    aiTimeMinutes: w.aiTimeMinutes,
    tags: w.tags || [],
  }));
}
