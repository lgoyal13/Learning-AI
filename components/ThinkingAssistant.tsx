import React, { useState } from 'react';
import { Modal, Button, Card } from './ui';
import { TaskPlanStep } from '../types';
import { HelpCircle, Send, Lightbulb, X, Loader2 } from 'lucide-react';

interface ThinkingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  step: TaskPlanStep | null;
  onBrainstorm?: (step: TaskPlanStep, thoughts: string) => Promise<string>;
}

/**
 * Modal/slide-out component that helps users think through a step.
 * Provides context-specific questions and AI brainstorming.
 */
export const ThinkingAssistant: React.FC<ThinkingAssistantProps> = ({
  isOpen,
  onClose,
  step,
  onBrainstorm
}) => {
  const [thoughts, setThoughts] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!step) return null;

  // Generate contextual questions based on step type
  const getGuidingQuestions = (): string[] => {
    if (step.who === 'you') {
      return [
        `If ${step.title.toLowerCase().includes('narrative') || step.title.toLowerCase().includes('story')
          ? 'your audience could only remember ONE thing from this, what should it be?'
          : 'you could only accomplish ONE thing in this step, what would it be?'}`,
        'What context or background do you have that AI wouldn\'t know?',
        'Is there anything you\'re nervous about or uncertain of?'
      ];
    }

    if (step.who === 'you-ai') {
      return [
        'What specific details or context would make the AI output more useful?',
        'What does "good" look like for this step\'s output?',
        'Are there any constraints or requirements you haven\'t mentioned yet?'
      ];
    }

    return [
      'What would make you confident this step was done well?',
      'Is there anything specific you want the output to include?'
    ];
  };

  const handleBrainstorm = async () => {
    if (!thoughts.trim() || !onBrainstorm) return;

    setIsLoading(true);
    try {
      const result = await onBrainstorm(step, thoughts);
      setResponse(result);
    } catch (error) {
      console.error('Error brainstorming:', error);
      setResponse('Sorry, I had trouble processing that. Please try again.');
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setThoughts('');
    setResponse(null);
    onClose();
  };

  const guidingQuestions = getGuidingQuestions();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Let's think through Step ${step.number}`}
      actions={
        <Button variant="ghost" onClick={handleClose}>
          {response ? 'Done' : 'I\'ve got it now'}
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Step context */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-sm text-slate-600">
            <span className="font-medium">Step {step.number}:</span> {step.title}
          </p>
        </div>

        {/* Guiding questions */}
        {!response && (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">
              A few questions to help you think through this:
            </p>
            <ul className="space-y-2">
              {guidingQuestions.map((question, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Response from brainstorm */}
        {response && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="prose prose-sm prose-slate max-w-none">
              <p className="text-slate-700 whitespace-pre-wrap">{response}</p>
            </div>
          </Card>
        )}

        {/* Input area */}
        {onBrainstorm && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              {response ? 'Add more thoughts or ask a follow-up:' : 'Share your thoughts:'}
            </label>
            <div className="flex gap-2">
              <textarea
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                placeholder="Type your thoughts, questions, or context here..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleBrainstorm}
                disabled={!thoughts.trim() || isLoading}
                isLoading={isLoading}
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Help me brainstorm
              </Button>
            </div>
          </div>
        )}

        {/* If no brainstorm function, just show close button */}
        {!onBrainstorm && (
          <p className="text-sm text-slate-500 text-center">
            Take your time thinking through these questions. When you're ready, click "I've got it now" to continue.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ThinkingAssistant;
