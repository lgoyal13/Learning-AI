import React from 'react';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface ComplexityBridgeProps {
  /**
   * The message explaining why this looks like a bigger task.
   * Should reference what the user said that triggered this.
   */
  message: string;
  /**
   * Called when user wants to go to Task Planner
   */
  onBuildPlan: () => void;
  /**
   * Called when user wants to just get the prompt anyway
   */
  onJustPrompt: () => void;
}

/**
 * Bridge component shown when a task is detected as multi-step.
 * Offers the user a choice between planning or getting a single prompt.
 */
export const ComplexityBridge: React.FC<ComplexityBridgeProps> = ({
  message,
  onBuildPlan,
  onJustPrompt
}) => {
  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-100">
          <div className="p-2 bg-blue-100 rounded-full">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-800">This looks like a bigger task</h3>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          <p className="text-slate-600 leading-relaxed">
            {message}
          </p>

          <p className="text-slate-600 leading-relaxed">
            A single prompt might not give you the best results. Want me to help you plan the full approach?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 pb-5">
          <button
            onClick={onBuildPlan}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Build me a plan
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onJustPrompt}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 rounded-lg font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Just give me the prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplexityBridge;
