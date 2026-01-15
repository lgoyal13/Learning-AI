import React from 'react';
import { Card, Button, Badge } from './ui';
import { BarChart3, FileText, Users, Clock, AlertCircle, Check, Edit2 } from 'lucide-react';
import { TaskUnderstanding } from '../types';

interface UnderstandingCardProps {
  understanding: TaskUnderstanding;
  onConfirm: () => void;
  onClarify: () => void;
  isLoading?: boolean;
}

/**
 * Displays AI's interpretation of the user's task.
 * Shows: deliverables, inputs, audience, timeline, constraints
 */
export const UnderstandingCard: React.FC<UnderstandingCardProps> = ({
  understanding,
  onConfirm,
  onClarify,
  isLoading = false
}) => {
  const { deliverables, inputs, audience, timeline, constraints } = understanding;

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Here's what I'm hearing</h3>
        <p className="text-sm text-slate-500 mt-1">Let me make sure I understand your task</p>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* What you're creating */}
        <UnderstandingRow
          icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
          label="What you're creating"
          color="purple"
        >
          {deliverables.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {deliverables.map((item, index) => (
                <Badge key={index} variant="neutral" className="bg-purple-50 text-purple-800 border-purple-200">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-slate-400 italic">Not specified</span>
          )}
        </UnderstandingRow>

        {/* What you have */}
        <UnderstandingRow
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          label="What you have to work with"
          color="blue"
        >
          {inputs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {inputs.map((item, index) => (
                <Badge key={index} variant="neutral" className="bg-blue-50 text-blue-800 border-blue-200">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-slate-400 italic">Not specified</span>
          )}
        </UnderstandingRow>

        {/* Audience */}
        <UnderstandingRow
          icon={<Users className="w-5 h-5 text-emerald-600" />}
          label="Who it's for"
          color="emerald"
        >
          {audience ? (
            <Badge variant="neutral" className="bg-emerald-50 text-emerald-800 border-emerald-200">
              {audience}
            </Badge>
          ) : (
            <span className="text-slate-400 italic">Not specified</span>
          )}
        </UnderstandingRow>

        {/* Timeline */}
        <UnderstandingRow
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          label="Timeline"
          color="amber"
        >
          {timeline ? (
            <Badge variant="neutral" className="bg-amber-50 text-amber-800 border-amber-200">
              {timeline}
            </Badge>
          ) : (
            <span className="text-slate-400 italic">Not specified</span>
          )}
        </UnderstandingRow>

        {/* Constraints (only show if present) */}
        {constraints.length > 0 && (
          <UnderstandingRow
            icon={<AlertCircle className="w-5 h-5 text-slate-500" />}
            label="Constraints"
            color="slate"
          >
            <div className="flex flex-wrap gap-2">
              {constraints.map((item, index) => (
                <Badge key={index} variant="neutral">
                  {item}
                </Badge>
              ))}
            </div>
          </UnderstandingRow>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          isLoading={isLoading}
          className="flex-1 sm:flex-none"
        >
          <Check className="w-4 h-4 mr-2" />
          Got it right
        </Button>
        <Button
          variant="outline"
          onClick={onClarify}
          disabled={isLoading}
          className="flex-1 sm:flex-none"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Let me clarify...
        </Button>
      </div>
    </Card>
  );
};

/**
 * Individual row in the understanding card
 */
const UnderstandingRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: 'purple' | 'blue' | 'emerald' | 'amber' | 'slate';
  children: React.ReactNode;
}> = ({ icon, label, children }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          {label}
        </div>
        <div className="text-sm text-slate-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UnderstandingCard;
