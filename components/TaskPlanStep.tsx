import React, { useState } from 'react';
import { Card } from './ui';
import { TaskPlanStep, StepWho } from '../types';
import {
  User,
  Bot,
  Users as UsersIcon,
  Clock,
  Wrench,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

interface TaskPlanStepCardProps {
  step: TaskPlanStep;
  defaultExpanded?: boolean;
  onHelpMeThink?: (step: TaskPlanStep) => void;
}

/**
 * Format minutes into readable time
 */
function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${mins} min`;
}

/**
 * Individual step card in a task plan.
 * Shows step info with expandable sections for prompt, rationale, and thinking help.
 */
export const TaskPlanStepCard: React.FC<TaskPlanStepCardProps> = ({
  step,
  defaultExpanded = false,
  onHelpMeThink
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [whyExpanded, setWhyExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const whoConfig: Record<StepWho, { label: string; icon: React.ReactNode; color: string }> = {
    'you': {
      label: 'You',
      icon: <User className="w-3.5 h-3.5" />,
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    'you-ai': {
      label: 'You + AI',
      icon: <UsersIcon className="w-3.5 h-3.5" />,
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    'ai': {
      label: 'AI',
      icon: <Bot className="w-3.5 h-3.5" />,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  };

  const config = whoConfig[step.who];

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step.prompt) {
      navigator.clipboard.writeText(step.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTogglePrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromptExpanded(!promptExpanded);
  };

  const handleToggleWhy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWhyExpanded(!whyExpanded);
  };

  const handleHelpMeThink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onHelpMeThink) {
      onHelpMeThink(step);
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Step header - always visible */}
      <div
        className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          {/* Step number */}
          <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600">
            {step.number}
          </div>

          {/* Step content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="font-semibold text-slate-900">{step.title}</h4>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
                {config.icon}
                {config.label}
              </span>
            </div>

            {/* Metadata row */}
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(step.timeMinutes)}
              </span>
              {step.tool && (
                <span className="flex items-center gap-1">
                  <Wrench className="w-3 h-3" />
                  {step.tool}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Expand indicator */}
          <div className="flex-shrink-0 text-slate-400">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-100 p-4 space-y-3 bg-slate-50">
          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            {step.prompt && (
              <button
                onClick={handleTogglePrompt}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  promptExpanded
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Copy className="w-3.5 h-3.5" />
                {step.who === 'you' ? 'Get prompt anyway' : 'Get prompt'}
              </button>
            )}
            <button
              onClick={handleToggleWhy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                whyExpanded
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Why this step
            </button>
            <button
              onClick={handleHelpMeThink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Help me think
            </button>
          </div>

          {/* Why this step */}
          {whyExpanded && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg animate-fade-in">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900">{step.whyThisStep}</p>
              </div>
            </div>
          )}

          {/* Prompt display */}
          {promptExpanded && step.prompt && (
            <div className="rounded-lg border border-slate-200 bg-white overflow-hidden animate-fade-in">
              {/* Caveat for human steps */}
              {step.who === 'you' && step.promptCaveat && (
                <div className="px-4 py-3 bg-amber-50 border-b border-amber-200">
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">A note first:</span> {step.promptCaveat}
                  </p>
                </div>
              )}

              {/* Prompt header */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Prompt</span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Prompt content */}
              <div className="p-4 font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {step.prompt}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default TaskPlanStepCard;
