import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Clock,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar, Callout } from './ui';
import { getWorkflowWithPrompts, toolConfig, getPromptForStep } from '../lib/workflowLoader';
import type { Workflow, PromptTemplate } from '../data/schemas/types';
import { useRouter } from '../lib/routerContext';

interface WorkflowGuideProps {
  workflowId: string;
}

export const WorkflowGuide: React.FC<WorkflowGuideProps> = ({ workflowId }) => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLearningMode, setIsLearningMode] = useState(() => {
    const saved = localStorage.getItem('learningMode');
    return saved !== null ? saved === 'true' : true;
  });
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Load workflow data
  const data = getWorkflowWithPrompts(workflowId);

  // Save learning mode preference
  useEffect(() => {
    localStorage.setItem('learningMode', String(isLearningMode));
  }, [isLearningMode]);

  // Reset expanded sections when learning mode changes
  useEffect(() => {
    if (isLearningMode) {
      setExpandedSections({ pctr: true, mistakes: true, tips: true });
    } else {
      setExpandedSections({});
    }
  }, [isLearningMode]);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Callout variant="danger" title="Workflow Not Found">
          Could not load workflow with ID: {workflowId}
        </Callout>
        <Button className="mt-4" onClick={() => push('/workflows')}>
          Back to Workflows
        </Button>
      </div>
    );
  }

  const { workflow, prompts } = data;
  const steps = workflow.aiProcess || [];
  const totalSteps = steps.length;
  const step = steps.find(s => s.stepNumber === currentStep);
  const promptTemplate = step?.promptId ? prompts[step.promptId] : null;

  const handleCopy = () => {
    const textToCopy = promptTemplate?.promptTemplate || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const tool = step?.tool ? toolConfig[step.tool] : null;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => push('/workflows')}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workflows
        </button>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{workflow.name}</h1>
            <p className="mt-1 text-slate-600">{workflow.description}</p>
          </div>

          {/* Learning Mode Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsLearningMode(!isLearningMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isLearningMode
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isLearningMode ? (
                <>
                  <BookOpen className="w-4 h-4" />
                  Learning Mode
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Fast Mode
                </>
              )}
            </button>
          </div>
        </div>

        {/* Time Savings Banner */}
        <div className="mt-4 flex flex-wrap gap-3">
          <Badge variant="success">
            <Clock className="w-3 h-3 mr-1" />
            {workflow.timeSavedPercentage}% time saved
          </Badge>
          <Badge variant="neutral">
            {workflow.aiTimeMinutes} min with AI vs {workflow.currentTimeMinutes} min manual
          </Badge>
          <Badge variant="blue">{workflow.complexity}</Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-slate-500">
            {step?.description}
          </span>
        </div>
        <ProgressBar current={currentStep} total={totalSteps} />

        {/* Step Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {steps.map((s) => (
            <button
              key={s.stepNumber}
              onClick={() => setCurrentStep(s.stepNumber)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                s.stepNumber === currentStep
                  ? 'bg-blue-600'
                  : s.stepNumber < currentStep
                  ? 'bg-blue-300'
                  : 'bg-slate-200'
              }`}
              aria-label={`Go to step ${s.stepNumber}`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step && (
        <Card className="mb-6">
          <div className="p-6">
            {/* Step Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    {currentStep}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">{step.description}</h2>
                </div>
                {step.toolRationale && isLearningMode && (
                  <p className="text-slate-600 text-sm ml-11">{step.toolRationale}</p>
                )}
              </div>

              {tool && (
                <Badge variant="neutral" className={`${tool.bgColor} ${tool.color} border-0`}>
                  {tool.name}
                </Badge>
              )}
            </div>

            {/* Time Estimate */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 ml-11">
              <Clock className="w-4 h-4" />
              ~{step.timeMinutes} minutes
              {step.expectedOutput && (
                <span className="text-slate-400">|</span>
              )}
              {step.expectedOutput && (
                <span>Expected: {step.expectedOutput}</span>
              )}
            </div>

            {/* Prompt Card */}
            {promptTemplate ? (
              <div className="relative rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Prompt Template
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                  {promptTemplate.promptTemplate}
                </div>
              </div>
            ) : (
              <Callout variant="info" title="Manual Step">
                This step involves human judgment or manual work. AI can assist but cannot fully automate this step.
              </Callout>
            )}

            {/* Tips for this step */}
            {step.tips && step.tips.length > 0 && (
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 text-amber-800 font-medium text-sm mb-2">
                  <Lightbulb className="w-4 h-4" />
                  Quick Tips
                </div>
                <ul className="text-sm text-amber-900 space-y-1 ml-6">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="list-disc">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Educational Sections (collapsible) */}
      {promptTemplate && (
        <div className="space-y-3 mb-6">
          {/* PCTR Breakdown */}
          {promptTemplate.pctr && (
            <CollapsibleSection
              title="Why This Prompt Works"
              subtitle="PCTR Breakdown"
              icon={<BookOpen className="w-4 h-4" />}
              isExpanded={expandedSections.pctr || false}
              onToggle={() => toggleSection('pctr')}
              variant="blue"
            >
              <div className="grid gap-3">
                <PCTRItem label="Persona" value={promptTemplate.pctr.persona} color="blue" />
                <PCTRItem label="Context" value={promptTemplate.pctr.context} color="emerald" />
                <PCTRItem label="Task" value={promptTemplate.pctr.task} color="purple" />
                <PCTRItem
                  label="Requirements"
                  value={promptTemplate.pctr.requirements?.join(', ') || 'None specified'}
                  color="amber"
                />
              </div>
            </CollapsibleSection>
          )}

          {/* Common Mistakes */}
          {promptTemplate.commonMistakes && promptTemplate.commonMistakes.length > 0 && (
            <CollapsibleSection
              title="Common Mistakes"
              subtitle="Avoid these pitfalls"
              icon={<AlertTriangle className="w-4 h-4" />}
              isExpanded={expandedSections.mistakes || false}
              onToggle={() => toggleSection('mistakes')}
              variant="red"
            >
              <ul className="space-y-2">
                {promptTemplate.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                    <span className="text-red-400 mt-0.5">•</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          {/* Variations */}
          {promptTemplate.variations && promptTemplate.variations.length > 0 && (
            <CollapsibleSection
              title="Prompt Variations"
              subtitle="Alternative approaches"
              icon={<Lightbulb className="w-4 h-4" />}
              isExpanded={expandedSections.variations || false}
              onToggle={() => toggleSection('variations')}
              variant="amber"
            >
              <div className="space-y-3">
                {promptTemplate.variations.map((variation, i) => (
                  <div key={i} className="p-3 bg-amber-50 rounded-lg">
                    <div className="font-medium text-amber-900 text-sm">{variation.name}</div>
                    <div className="text-xs text-amber-700 mb-2">{variation.useCase}</div>
                    <code className="block text-xs text-amber-800 bg-amber-100 p-2 rounded whitespace-pre-wrap">
                      {variation.prompt}
                    </code>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}
        </div>
      )}

      {/* Workflow-Level Education (show on first step) */}
      {currentStep === 1 && isLearningMode && (
        <div className="space-y-3 mb-6">
          {workflow.whyItMatters && (
            <Callout variant="info" title="Why This Workflow Matters">
              {workflow.whyItMatters}
            </Callout>
          )}
        </div>
      )}

      {/* Workflow-Level Mistakes (show on last step) */}
      {currentStep === totalSteps && workflow.commonMistakes && workflow.commonMistakes.length > 0 && (
        <Callout variant="warning" title="Watch Out For" className="mb-6">
          <ul className="mt-2 space-y-1">
            {workflow.commonMistakes.map((mistake, i) => (
              <li key={i} className="text-sm">• {mistake}</li>
            ))}
          </ul>
        </Callout>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <span className="text-sm text-slate-500">
          {currentStep} / {totalSteps}
        </span>

        {currentStep < totalSteps ? (
          <Button
            variant="primary"
            onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => push('/workflows')}
          >
            Complete
            <Check className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

// Collapsible section component
const CollapsibleSection: React.FC<{
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  variant: 'blue' | 'red' | 'amber';
  children: React.ReactNode;
}> = ({ title, subtitle, icon, isExpanded, onToggle, variant, children }) => {
  const colors = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', headerBg: 'hover:bg-blue-100' },
    red: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', headerBg: 'hover:bg-red-100' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', headerBg: 'hover:bg-amber-100' },
  };
  const c = colors[variant];

  return (
    <div className={`rounded-lg border ${c.border} overflow-hidden`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 ${c.bg} ${c.headerBg} transition-colors`}
      >
        <div className="flex items-center gap-2">
          <span className={c.text}>{icon}</span>
          <span className={`font-medium ${c.text}`}>{title}</span>
          {subtitle && <span className="text-xs text-slate-500">— {subtitle}</span>}
        </div>
        <ChevronRight className={`w-4 h-4 ${c.text} transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>
      {isExpanded && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// PCTR Item component
const PCTRItem: React.FC<{
  label: string;
  value: string;
  color: 'blue' | 'emerald' | 'purple' | 'amber';
}> = ({ label, value, color }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    purple: 'bg-purple-100 text-purple-800',
    amber: 'bg-amber-100 text-amber-800',
  };

  return (
    <div className="flex items-start gap-3">
      <span className={`px-2 py-0.5 rounded text-xs font-bold ${colors[color]}`}>
        {label.charAt(0)}
      </span>
      <div>
        <div className="text-xs font-medium text-slate-500 uppercase">{label}</div>
        <div className="text-sm text-slate-700">{value}</div>
      </div>
    </div>
  );
};

export default WorkflowGuide;
