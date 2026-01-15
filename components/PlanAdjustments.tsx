import React, { useState } from 'react';
import { Card, Button } from './ui';
import { ChevronDown, ChevronUp, Send, Minus, Plus, Clock, FileText, Sliders } from 'lucide-react';

interface PlanAdjustmentsProps {
  onAdjust: (adjustment: string) => void;
  isLoading?: boolean;
}

const ADJUSTMENT_OPTIONS = [
  {
    label: 'Simplify - fewer steps',
    value: 'simplify',
    icon: <Minus className="w-4 h-4" />,
    description: 'Consolidate steps to make the plan more streamlined'
  },
  {
    label: 'More detail',
    value: 'more-detail',
    icon: <Plus className="w-4 h-4" />,
    description: 'Add more guidance and specifics to each step'
  },
  {
    label: 'Tighter timeline',
    value: 'tighter-timeline',
    icon: <Clock className="w-4 h-4" />,
    description: 'Reduce time estimates and prioritize speed'
  },
  {
    label: 'Add a step',
    value: 'add-step',
    icon: <Plus className="w-4 h-4" />,
    description: 'Include an additional step for something specific'
  },
  {
    label: 'Remove a step',
    value: 'remove-step',
    icon: <Minus className="w-4 h-4" />,
    description: 'Take out a step that doesn\'t apply to your situation'
  }
];

/**
 * Component for adjusting a generated plan.
 * Offers chip-based quick adjustments plus custom input.
 */
export const PlanAdjustments: React.FC<PlanAdjustmentsProps> = ({
  onAdjust,
  isLoading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleChipClick = (value: string) => {
    if (isLoading) return;
    onAdjust(value);
  };

  const handleCustomSubmit = () => {
    if (!customInput.trim() || isLoading) return;
    onAdjust(customInput.trim());
    setCustomInput('');
    setShowCustom(false);
  };

  return (
    <Card className="overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
        disabled={isLoading}
      >
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-500" />
          <span className="font-medium text-slate-700">Want to adjust this plan?</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
          {/* Quick adjustment chips */}
          <div className="flex flex-wrap gap-2">
            {ADJUSTMENT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChipClick(option.value)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={option.description}
              >
                {option.icon}
                {option.label}
              </button>
            ))}

            {/* Custom option */}
            <button
              onClick={() => setShowCustom(!showCustom)}
              disabled={isLoading}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-dashed transition-colors disabled:opacity-50 ${
                showCustom
                  ? 'border-blue-400 text-blue-600 bg-blue-50'
                  : 'border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              Something else...
            </button>
          </div>

          {/* Custom input */}
          {showCustom && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-sm text-slate-600">
                What would you like to change?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g., 'Add a review step before the final draft' or 'Focus more on the analysis'"
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCustomSubmit();
                    }
                  }}
                />
                <Button
                  onClick={handleCustomSubmit}
                  disabled={!customInput.trim() || isLoading}
                  isLoading={isLoading}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <p className="text-sm text-slate-500 text-center">
              Updating your plan...
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default PlanAdjustments;
