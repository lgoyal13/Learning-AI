import React, { useState } from 'react';
import { Clock, Check, Copy, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';
import { GeneratedGamePlan } from '../types';
import { GamePlanStep } from './GamePlanStep';
import { Button, Badge } from './ui';

interface GamePlanViewProps {
  plan: GeneratedGamePlan;
  onRefine: () => void;
  onStartOver: () => void;
}

/**
 * Displays the full generated game plan with all steps and actions.
 * This is Stage 5 of the user flow.
 */
export const GamePlanView: React.FC<GamePlanViewProps> = ({
  plan,
  onRefine,
  onStartOver
}) => {
  const [copiedFull, setCopiedFull] = useState(false);

  // Confidence badge styling
  const confidenceStyles: Record<string, { variant: 'success' | 'warning' | 'neutral'; label: string }> = {
    'High': { variant: 'success', label: 'HIGH' },
    'Medium': { variant: 'warning', label: 'MEDIUM' },
    'Low': { variant: 'neutral', label: 'LOW' }
  };

  const confidenceStyle = confidenceStyles[plan.confidence] || confidenceStyles['Medium'];

  // Format time
  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Generate full plan text for copying
  const generateFullPlanText = (): string => {
    const lines: string[] = [];

    lines.push(`GAME PLAN: ${plan.planName}`);
    lines.push(`Generated: ${new Date(plan.generatedAt).toLocaleDateString()}`);
    lines.push('');
    lines.push('SUMMARY:');
    lines.push(plan.userContextSummary);
    lines.push('');
    lines.push(`Total time: ~${formatTime(plan.totalTimeMinutes)}`);
    lines.push('');
    lines.push('---');

    plan.steps.forEach(step => {
      lines.push('');
      lines.push(`STEP ${step.stepNumber}: ${step.stepName}`);
      lines.push(`Who: ${step.actor}${step.tool ? ` (${step.tool})` : ''}`);
      lines.push(`Time: ~${step.timeMinutes} min`);
      lines.push('');
      lines.push('What to do:');
      lines.push(step.whatToDo);

      if (step.prompt) {
        lines.push('');
        lines.push('Prompt:');
        lines.push(step.prompt);
      }

      lines.push('');
      lines.push(`Why this matters: ${step.whyThisMatters}`);
      lines.push(`Watch out: ${step.watchOut}`);
      lines.push('');
      lines.push('---');
    });

    if (plan.insertMarkers.length > 0) {
      lines.push('');
      lines.push('GAPS TO FILL:');
      plan.insertMarkers.forEach(marker => {
        lines.push(`- ${marker}`);
      });
    }

    return lines.join('\n');
  };

  const handleCopyFull = async () => {
    await navigator.clipboard.writeText(generateFullPlanText());
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        {/* Plan Name */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {plan.planName}
        </h2>

        {/* Confidence Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-slate-500">Match Confidence:</span>
          <Badge variant={confidenceStyle.variant}>
            {confidenceStyle.label}
          </Badge>
        </div>

        {/* Confidence Reasoning */}
        <p className="text-sm text-slate-600 mb-4">
          {plan.confidenceReasoning}
        </p>

        {/* User Context Summary */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mb-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Based on what you shared:
          </h4>
          <p className="text-slate-700 leading-relaxed">
            {plan.userContextSummary}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Total time: ~{formatTime(plan.totalTimeMinutes)}
          </span>
          <span>
            Steps: {plan.steps.length}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">
            Domain: {plan.inferredDomain}
          </span>
        </div>
      </div>

      {/* Steps Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Your Steps</h3>
        {plan.steps.map((step, index) => (
          <GamePlanStep
            key={step.stepNumber}
            step={step}
            isExpanded={index === 0} // First step expanded by default
          />
        ))}
      </div>

      {/* Gaps to Fill Section (if any) */}
      {plan.insertMarkers.length > 0 && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">
                Gaps to Fill
              </h4>
              <p className="text-sm text-amber-700 mb-3">
                This plan has some spots marked with [INSERT] that need your specific information:
              </p>
              <ul className="space-y-1">
                {plan.insertMarkers.map((marker, index) => (
                  <li key={index} className="text-sm text-amber-800 flex items-start gap-2">
                    <span className="text-amber-500">-</span>
                    <span className="bg-amber-100 px-2 py-0.5 rounded font-mono text-xs">
                      {marker}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="text-center text-sm text-slate-500 py-2">
        This is a starting-point game plan. You may need to adjust based on your specific situation.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          onClick={handleCopyFull}
          className="flex-1"
        >
          {copiedFull ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Full Plan
            </>
          )}
        </Button>

        <Button
          onClick={onRefine}
          className="flex-1"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Refine This
        </Button>

        <Button
          variant="ghost"
          onClick={onStartOver}
          className="sm:flex-none"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default GamePlanView;
