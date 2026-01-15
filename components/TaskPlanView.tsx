import React, { useState } from 'react';
import { Card, Button, Badge } from './ui';
import { TaskPlanStepCard } from './TaskPlanStep';
import { TaskPlan, TaskPlanStep } from '../types';
import { RefreshCw, Copy, Check, Download, Share2 } from 'lucide-react';

interface TaskPlanViewProps {
  plan: TaskPlan;
  onStartOver: () => void;
  onHelpMeThink?: (step: TaskPlanStep) => void;
  onAdjustPlan?: () => void;
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
 * Convert plan to plain text for copying
 */
function planToText(plan: TaskPlan): string {
  const lines = [
    `# ${plan.title}`,
    '',
    plan.summary,
    '',
    `Total time: ~${formatTime(plan.totalTimeMinutes)} | ${plan.stepCount} steps`,
    '',
    '---',
    ''
  ];

  plan.steps.forEach(step => {
    const whoLabel = step.who === 'you' ? 'You' : step.who === 'you-ai' ? 'You + AI' : 'AI';
    lines.push(`## Step ${step.number}: ${step.title}`);
    lines.push(`Who: ${whoLabel} | Time: ~${formatTime(step.timeMinutes)}${step.tool ? ` | Tool: ${step.tool}` : ''}`);
    lines.push('');
    lines.push(step.description);
    lines.push('');
    if (step.prompt) {
      lines.push('### Prompt');
      lines.push('```');
      lines.push(step.prompt);
      lines.push('```');
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  });

  return lines.join('\n');
}

/**
 * Full plan display with header, steps, and actions.
 */
export const TaskPlanView: React.FC<TaskPlanViewProps> = ({
  plan,
  onStartOver,
  onHelpMeThink,
  onAdjustPlan
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPlan = () => {
    navigator.clipboard.writeText(planToText(plan));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = planToText(plan);
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = planToText(plan);
    if (navigator.share) {
      try {
        await navigator.share({
          title: plan.title,
          text: text
        });
      } catch (e) {
        // User cancelled or share failed, copy instead
        handleCopyPlan();
      }
    } else {
      handleCopyPlan();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-slate-900">{plan.title}</h2>
          <p className="text-slate-600 mt-1">{plan.summary}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onStartOver} className="flex-shrink-0">
          <RefreshCw className="w-4 h-4 mr-2" />
          Start over
        </Button>
      </div>

      {/* Plan metadata */}
      <div className="flex items-center gap-4 text-sm flex-wrap">
        <Badge variant="blue">
          {plan.stepCount} {plan.stepCount === 1 ? 'step' : 'steps'}
        </Badge>
        <span className="text-slate-500">
          ~{formatTime(plan.totalTimeMinutes)} total
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {plan.steps.map((step, index) => (
          <TaskPlanStepCard
            key={step.number}
            step={step}
            defaultExpanded={index === 0} // First step expanded by default
            onHelpMeThink={onHelpMeThink}
          />
        ))}
      </div>

      {/* Actions footer */}
      <Card className="p-4 bg-slate-50">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyPlan}
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy as text'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          {onAdjustPlan && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdjustPlan}
              className="ml-auto"
            >
              Adjust plan
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TaskPlanView;
