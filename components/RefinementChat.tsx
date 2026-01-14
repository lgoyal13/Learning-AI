import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Download, Check } from 'lucide-react';
import { GeneratedGamePlan, RefinementMessage } from '../types';
import { Button } from './ui';
import { refineGamePlan } from '../services/geminiService';

interface RefinementChatProps {
  plan: GeneratedGamePlan;
  messages: RefinementMessage[];
  onMessagesUpdate: (messages: RefinementMessage[]) => void;
  onBack: () => void;
}

/**
 * Chat interface for refining a game plan (Stage 6).
 */
export const RefinementChat: React.FC<RefinementChatProps> = ({
  plan,
  messages,
  onMessagesUpdate,
  onBack
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const updatedMessages: RefinementMessage[] = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    onMessagesUpdate(updatedMessages);

    try {
      const response = await refineGamePlan(plan, messages, userMessage);

      // Add assistant response
      onMessagesUpdate([
        ...updatedMessages,
        { role: 'assistant', content: response.response }
      ]);
    } catch (error) {
      console.error('Refinement error:', error);
      onMessagesUpdate([
        ...updatedMessages,
        { role: 'assistant', content: "I had trouble processing that. Could you try rephrasing?" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDownload = () => {
    const content = generateMarkdown();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Game_Plan_${plan.planName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateMarkdown = (): string => {
    const lines: string[] = [];

    lines.push(`# ${plan.planName}`);
    lines.push('');
    lines.push(`*Generated: ${new Date(plan.generatedAt).toLocaleDateString()}*`);
    lines.push('');
    lines.push('## Summary');
    lines.push('');
    lines.push(plan.userContextSummary);
    lines.push('');
    lines.push(`**Total time:** ~${plan.totalTimeMinutes} minutes`);
    lines.push('');
    lines.push('---');
    lines.push('');

    plan.steps.forEach(step => {
      lines.push(`## Step ${step.stepNumber}: ${step.stepName}`);
      lines.push('');
      lines.push(`**Who:** ${step.actor}${step.tool ? ` (${step.tool})` : ''}`);
      lines.push(`**Time:** ~${step.timeMinutes} min`);
      lines.push('');
      lines.push('### What to do');
      lines.push('');
      lines.push(step.whatToDo);
      lines.push('');

      if (step.prompt) {
        lines.push('### Prompt');
        lines.push('');
        lines.push('```');
        lines.push(step.prompt);
        lines.push('```');
        lines.push('');
      }

      lines.push(`> **Why this matters:** ${step.whyThisMatters}`);
      lines.push('');
      lines.push(`> **Watch out:** ${step.watchOut}`);
      lines.push('');
      lines.push('---');
      lines.push('');
    });

    if (plan.insertMarkers.length > 0) {
      lines.push('## Gaps to Fill');
      lines.push('');
      plan.insertMarkers.forEach(marker => {
        lines.push(`- \`${marker}\``);
      });
      lines.push('');
    }

    return lines.join('\n');
  };

  // Initial greeting if no messages
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-slate-900">Refine Your Plan</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPlan(!showPlan)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showPlan ? 'Hide Plan' : 'Show Plan'}
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* Plan Preview (Collapsible) */}
      {showPlan && (
        <div className="p-4 bg-slate-50 border-b border-slate-200 max-h-48 overflow-y-auto">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Current Plan: {plan.planName}
          </h4>
          <div className="space-y-2">
            {plan.steps.map(step => (
              <div key={step.stepNumber} className="text-sm text-slate-600">
                <span className="font-medium">{step.stepNumber}.</span> {step.stepName}
                <span className="text-slate-400"> ({step.actor})</span>
              </div>
            ))}
          </div>
          {plan.insertMarkers.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-200">
              <span className="text-xs text-amber-600 font-medium">
                {plan.insertMarkers.length} gap(s) to fill
              </span>
            </div>
          )}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Opening message if no messages yet */}
        {!hasMessages && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-blue-800 mb-3">
              What would you like to refine? You can:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>- Fill in any of the [INSERT] markers</li>
              <li>- Ask me to adjust or add steps</li>
              <li>- Ask questions about any part of the plan</li>
            </ul>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RefinementChat;
