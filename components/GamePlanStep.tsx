import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, User, Sparkles, Lightbulb, AlertTriangle } from 'lucide-react';
import { GeneratedStep } from '../types';
import { PromptDisplay } from './PromptDisplay';
import { Badge } from './ui';

interface GamePlanStepProps {
  step: GeneratedStep;
  isExpanded?: boolean;
}

/**
 * Displays a single step in a game plan with collapsible details.
 */
export const GamePlanStep: React.FC<GamePlanStepProps> = ({
  step,
  isExpanded: initialExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [showLearning, setShowLearning] = useState(false);

  // Actor badge styling
  const actorStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    'Human': {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      icon: <User className="w-3 h-3" />
    },
    'AI-Assisted': {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: <Sparkles className="w-3 h-3" />
    },
    'Mixed': {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      icon: <><User className="w-3 h-3" /><Sparkles className="w-3 h-3" /></>
    }
  };

  const actorStyle = actorStyles[step.actor] || actorStyles['Human'];

  // Tool badge colors
  const toolColors: Record<string, string> = {
    'ChatGPT': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Claude': 'bg-orange-100 text-orange-800 border-orange-200',
    'Gemini': 'bg-blue-100 text-blue-800 border-blue-200',
    'Perplexity': 'bg-teal-100 text-teal-800 border-teal-200',
    'NotebookLM': 'bg-violet-100 text-violet-800 border-violet-200'
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Step Header - Always Visible */}
      <div
        className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* Step Number */}
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {step.stepNumber}
            </div>

            <div>
              {/* Step Name */}
              <h3 className="font-semibold text-slate-900 text-lg">
                {step.stepName}
              </h3>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Actor Badge */}
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${actorStyle.bg} ${actorStyle.text}`}>
                  {actorStyle.icon}
                  {step.actor}
                </span>

                {/* Time Badge */}
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  <Clock className="w-3 h-3" />
                  ~{step.timeMinutes} min
                </span>

                {/* Tool Badge (if AI-Assisted) */}
                {step.tool && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${toolColors[step.tool] || 'bg-slate-100 text-slate-600'}`}>
                    {step.tool}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Expand/Collapse Icon */}
          <button className="text-slate-400 hover:text-slate-600 p-1">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-4">
          {/* What to Do */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
              What to Do
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {step.whatToDo}
            </p>
          </div>

          {/* Tool Rationale (if applicable) */}
          {step.toolRationale && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Why {step.tool}:</span> {step.toolRationale}
              </p>
            </div>
          )}

          {/* Prompt (if AI-Assisted) */}
          {step.prompt && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                Prompt
              </h4>
              <PromptDisplay prompt={step.prompt} showLabels={true} compact={true} />
            </div>
          )}

          {/* Learning Content - Collapsible */}
          <div className="border-t border-slate-100 pt-3">
            <button
              onClick={() => setShowLearning(!showLearning)}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              {showLearning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span className="font-medium">Why this matters & Watch out</span>
            </button>

            {showLearning && (
              <div className="mt-3 space-y-3">
                {/* Why This Matters */}
                <div className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-emerald-800">Why this matters</span>
                    <p className="text-sm text-emerald-700 mt-1">{step.whyThisMatters}</p>
                  </div>
                </div>

                {/* Watch Out */}
                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-amber-800">Watch out</span>
                    <p className="text-sm text-amber-700 mt-1">{step.watchOut}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePlanStep;
