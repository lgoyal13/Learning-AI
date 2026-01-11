import React, { useState } from 'react';
import {
  Route,
  Clock,
  TrendingUp,
  ArrowRight,
  Briefcase,
  Calculator,
  Megaphone,
  Plus,
  Pencil,
  SkipForward,
  Lightbulb,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { PageLayout, Card, Button, Badge } from '../../components/ui';
import { getWorkflowSummaries, getWorkflow, roleNames } from '../../lib/workflowLoader';
import { recommendWorkflow, WorkflowRecommendation, WorkflowModification } from '../../services/geminiService';
import { useRouter } from '../../lib/routerContext';

const roleConfig: Record<string, { name: string; icon: React.ReactNode }> = {
  'business-analyst': {
    name: 'Business Analyst',
    icon: <Briefcase className="w-4 h-4" />
  },
  'finance-analyst': {
    name: 'FP&A / Finance',
    icon: <Calculator className="w-4 h-4" />
  },
  'marketing-manager': {
    name: 'Marketing',
    icon: <Megaphone className="w-4 h-4" />
  }
};

const WorkflowsPage: React.FC = () => {
  const { push } = useRouter();
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<WorkflowRecommendation | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);

  const handleFindWorkflow = async () => {
    if (!taskDescription.trim()) {
      setError('Please describe what you\'re working on.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const summaries = getWorkflowSummaries(selectedRole || undefined);
      const result = await recommendWorkflow(taskDescription, summaries);
      setRecommendation(result);
    } catch (err) {
      console.error('Recommendation error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartWorkflow = (workflowId: string) => {
    push(`/workflows/${workflowId}`);
  };

  const handleReset = () => {
    setTaskDescription('');
    setRecommendation(null);
    setError(null);
    setShowReasoning(false);
  };

  const baseWorkflow = recommendation ? getWorkflow(recommendation.baseWorkflowId) : null;

  return (
    <PageLayout
      title="Workflow Advisor"
      description="Describe your task and we'll recommend a customized workflow."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input */}
        <div className="lg:col-span-5 space-y-6">
          {/* Task Input Card */}
          <Card className="p-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              What are you working on?
            </label>
            <textarea
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white placeholder:text-slate-400 min-h-[140px] resize-y leading-relaxed"
              placeholder="e.g., I need to prepare a retention analysis report for my VP by Friday. We've seen a spike in churn this month and need to understand why..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              disabled={isLoading}
            />

            {/* Role Filter */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                Your role (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedRole(null)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedRole === null
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Any Role
                </button>
                {Object.entries(roleConfig).map(([id, role]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedRole(id)}
                    disabled={isLoading}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedRole === id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {role.icon}
                    {role.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleFindWorkflow}
              disabled={isLoading || !taskDescription.trim()}
              className="w-full mt-6 h-12 text-base font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Finding your workflow...
                </>
              ) : (
                <>
                  <Route className="w-5 h-5 mr-2" />
                  Find My Workflow
                </>
              )}
            </Button>

            {recommendation && (
              <button
                onClick={handleReset}
                className="w-full mt-3 text-sm text-slate-500 hover:text-slate-700"
              >
                Start over
              </button>
            )}
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          {!recommendation && !isLoading && (
            // Empty State
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center bg-slate-50/50 min-h-[400px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Route className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to find your workflow</h3>
              <p className="text-slate-400 max-w-sm mx-auto text-sm">
                Describe what you're working on and we'll recommend a proven workflow customized for your task.
              </p>
            </div>
          )}

          {isLoading && (
            // Loading State
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center bg-slate-50/50 min-h-[400px]">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <h3 className="text-lg font-bold text-slate-600">Analyzing your task...</h3>
              <p className="text-slate-400 text-sm mt-1">Finding the best workflow and customizations</p>
            </div>
          )}

          {recommendation && baseWorkflow && (
            // Recommendation Result
            <div className="space-y-4 animate-fade-in">
              {/* Confidence Indicator */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Match confidence:</span>
                <Badge variant={recommendation.confidenceScore >= 80 ? 'success' : recommendation.confidenceScore >= 50 ? 'warning' : 'neutral'}>
                  {recommendation.confidenceScore}%
                </Badge>
              </div>

              {/* Main Recommendation Card */}
              <Card className="overflow-hidden">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Recommended Workflow
                      </p>
                      <h2 className="text-xl font-bold text-slate-900">{baseWorkflow.name}</h2>
                      <p className="text-sm text-slate-500 mt-1">
                        {roleNames[baseWorkflow.roleId] || baseWorkflow.roleId} • {baseWorkflow.aiProcess?.length || 0} steps
                      </p>
                    </div>
                  </div>

                  {/* Time Savings - Key Value */}
                  <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg mb-6">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="text-emerald-700 font-bold">{baseWorkflow.timeSavedPercentage}% faster</span>
                      <span className="text-emerald-600 text-sm ml-2">
                        ({baseWorkflow.aiTimeMinutes} min vs {baseWorkflow.currentTimeMinutes} min manual)
                      </span>
                    </div>
                  </div>

                  {/* Modifications */}
                  {recommendation.modifications.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Customized for your task
                      </p>
                      <div className="space-y-2">
                        {recommendation.modifications.map((mod, i) => (
                          <ModificationItem key={i} modification={mod} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reasoning (Collapsible) */}
                  <button
                    onClick={() => setShowReasoning(!showReasoning)}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${showReasoning ? 'rotate-180' : ''}`} />
                    {showReasoning ? 'Hide' : 'Show'} why this fits
                  </button>

                  {showReasoning && (
                    <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600 mb-4">
                      {recommendation.reasoning}
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    onClick={() => handleStartWorkflow(recommendation.baseWorkflowId)}
                    className="w-full h-12 text-base font-bold"
                  >
                    Start Workflow
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </Card>

              {/* Alternatives */}
              {recommendation.alternatives.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Also considered
                  </p>
                  <div className="space-y-2">
                    {recommendation.alternatives.map((alt, i) => {
                      const altWorkflow = getWorkflow(alt.workflowId);
                      if (!altWorkflow) return null;
                      return (
                        <button
                          key={i}
                          onClick={() => handleStartWorkflow(alt.workflowId)}
                          className="w-full p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors text-left group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-slate-900">{altWorkflow.name}</span>
                              <p className="text-xs text-slate-500 mt-0.5">{alt.reason}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

// Modification item component
const ModificationItem: React.FC<{ modification: WorkflowModification }> = ({ modification }) => {
  const iconMap = {
    add: <Plus className="w-4 h-4" />,
    modify: <Pencil className="w-4 h-4" />,
    skip: <SkipForward className="w-4 h-4" />,
    tip: <Lightbulb className="w-4 h-4" />
  };

  const styleMap = {
    add: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    modify: 'bg-blue-50 border-blue-200 text-blue-700',
    skip: 'bg-slate-50 border-slate-200 text-slate-500',
    tip: 'bg-amber-50 border-amber-200 text-amber-700'
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${styleMap[modification.type]}`}>
      <div className="mt-0.5">{iconMap[modification.type]}</div>
      <div className="flex-1">
        <span className="text-sm">{modification.description}</span>
        {modification.stepNumber && (
          <span className="text-xs ml-2 opacity-70">(Step {modification.stepNumber})</span>
        )}
      </div>
    </div>
  );
};

export default WorkflowsPage;
