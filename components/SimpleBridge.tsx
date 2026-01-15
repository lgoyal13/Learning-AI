import React, { useState } from 'react';
import { Card, Button } from './ui';
import { CheckCircle, ArrowRight, Copy, Check } from 'lucide-react';

interface SimpleBridgeProps {
  prompt: string;
  onGetPlanAnyway: () => void;
  onStartOver: () => void;
}

/**
 * Reverse bridge: when Task Planner detects a simple task.
 * Shows the prompt directly with option to get full plan anyway.
 */
export const SimpleBridge: React.FC<SimpleBridgeProps> = ({
  prompt,
  onGetPlanAnyway,
  onStartOver
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header card */}
      <Card className="p-6 bg-emerald-50 border-emerald-200">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-emerald-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-emerald-900 mb-2">
              Actually, this is pretty straightforward
            </h3>
            <p className="text-sm text-emerald-800 leading-relaxed">
              You don't need a full plan for this - it's really just one prompt away.
              Here's what you need:
            </p>
          </div>
        </div>
      </Card>

      {/* Prompt display */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Your Prompt</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-4 font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
          {prompt}
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-4 bg-slate-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Want a full step-by-step plan anyway?
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onGetPlanAnyway}
            >
              Yes, plan it out
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onStartOver}
            >
              Plan something else
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SimpleBridge;
