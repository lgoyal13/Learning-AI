import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import type { CoachQuestionConfig } from '../types';

interface CoachQuestionProps {
  question: CoachQuestionConfig;
  onAnswer: (value: string) => void;
  onSkip: () => void;
  currentValue?: string;
}

export const CoachQuestion: React.FC<CoachQuestionProps> = ({
  question,
  onAnswer,
  onSkip,
  currentValue
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const handleOptionClick = (value: string) => {
    onAnswer(value);
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onAnswer(customValue.trim());
      setCustomValue('');
      setIsCustomMode(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCustomSubmit();
    }
    if (e.key === 'Escape') {
      setIsCustomMode(false);
      setCustomValue('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-fade-in">
      {/* Question header */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-800 font-medium">{question.question}</p>
        {question.allowSkip && (
          <button
            onClick={onSkip}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors ml-2 flex-shrink-0"
          >
            Skip
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Options */}
      {!isCustomMode ? (
        <div className="flex flex-wrap gap-2">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${currentValue === option.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm'
                }
              `}
            >
              {option.label}
            </button>
          ))}

          {question.allowCustom && (
            <button
              onClick={() => setIsCustomMode(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium border border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              Type your own...
            </button>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            autoFocus
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleCustomSubmit}
            disabled={!customValue.trim()}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            Done
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsCustomMode(false);
              setCustomValue('');
            }}
            className="px-3 py-2 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CoachQuestion;
