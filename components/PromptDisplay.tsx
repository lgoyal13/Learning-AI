import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PromptDisplayProps {
  prompt: string;
  showLabels?: boolean;
  compact?: boolean;
}

/**
 * Displays a prompt with PCTR labels and [INSERT] marker highlighting.
 * Used in both prompt output and game plan steps.
 */
export const PromptDisplay: React.FC<PromptDisplayProps> = ({
  prompt,
  showLabels = true,
  compact = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Process the prompt text to highlight [INSERT] markers
   */
  const processText = (text: string): React.ReactNode[] => {
    // Match [INSERT: ...] patterns
    const insertPattern = /(\[INSERT:[^\]]+\])/g;
    const parts = text.split(insertPattern);

    return parts.map((part, index) => {
      if (part.match(insertPattern)) {
        return (
          <span
            key={index}
            className="inline-block bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded mx-0.5 font-medium border border-amber-200"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  /**
   * Format prompt with PCTR labels highlighted
   */
  const formatPrompt = (text: string): React.ReactNode => {
    if (!showLabels) {
      return text.split('\n').map((line, i) => (
        <div key={i} className={line.trim() === '' ? 'h-3' : 'mb-1'}>
          {processText(line)}
        </div>
      ));
    }

    // Split by PCTR labels and process
    const lines = text.split('\n');

    return lines.map((line, i) => {
      const trimmedLine = line.trim();

      // Empty line
      if (trimmedLine === '') {
        return <div key={i} className="h-3" />;
      }

      // PCTR label detection
      const pctrMatch = trimmedLine.match(/^\[([PCTR])\]\s*(.*)/);
      if (pctrMatch) {
        const label = pctrMatch[1];
        const content = pctrMatch[2];
        const labelColors: Record<string, string> = {
          'P': 'text-violet-600 bg-violet-50 border-violet-200',
          'C': 'text-blue-600 bg-blue-50 border-blue-200',
          'T': 'text-emerald-600 bg-emerald-50 border-emerald-200',
          'R': 'text-orange-600 bg-orange-50 border-orange-200'
        };

        return (
          <div key={i} className="mb-2">
            <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-bold mr-2 border ${labelColors[label]}`}>
              {label}
            </span>
            <span className="text-slate-700">{processText(content)}</span>
          </div>
        );
      }

      // Regular line
      return (
        <div key={i} className="mb-1">
          {processText(line)}
        </div>
      );
    });
  };

  return (
    <div className={`relative group rounded-lg border border-slate-200 bg-white overflow-hidden ${compact ? '' : 'shadow-sm'}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Prompt
        </span>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span className="text-xs font-medium">Copied!</span>
            </>
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      </div>
      <div className={`font-mono text-sm text-slate-600 leading-relaxed ${compact ? 'p-3' : 'p-5'}`}>
        {formatPrompt(prompt)}
      </div>
    </div>
  );
};

export default PromptDisplay;
