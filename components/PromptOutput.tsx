import React, { useState } from 'react';
import { Copy, Check, User, FileText, Target, ListChecks, Sparkles, RotateCcw, ChevronDown, ChevronRight, Lightbulb } from 'lucide-react';
import type { SimpleGeneratorOutput } from '../types';

interface PromptOutputProps {
  originalInput: string;
  output: SimpleGeneratorOutput;
  onReset: () => void;
  onRefine: () => void;
}

/**
 * Section colors for visual distinction
 */
const SECTION_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  ROLE: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  CONTEXT: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  TASK: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  FORMAT: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  INPUT: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700' },
};

/**
 * Renders markdown-formatted prompt text with proper styling.
 * Handles: **bold** headers, bullet points, and [INSERT:...] markers.
 */
const renderFormattedPrompt = (text: string): React.ReactNode => {
  // Split by lines to process each line
  const lines = text.split('\n');
  let currentSection: string | null = null;
  const sections: { header: string; content: string[] }[] = [];
  let currentContent: string[] = [];

  // Group lines into sections
  lines.forEach((line) => {
    if (line.match(/^\*\*[A-Z]+\*\*$/)) {
      // Save previous section
      if (currentSection) {
        sections.push({ header: currentSection, content: currentContent });
      }
      currentSection = line.replace(/\*\*/g, '');
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  });

  // Don't forget the last section
  if (currentSection) {
    sections.push({ header: currentSection, content: currentContent });
  }

  // Render sections with visual styling
  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => {
        const style = SECTION_STYLES[section.header] || SECTION_STYLES.INPUT;

        return (
          <div
            key={sectionIndex}
            className={`rounded-lg border ${style.border} ${style.bg} overflow-hidden`}
          >
            {/* Section header */}
            <div className={`px-3 py-2 border-b ${style.border}`}>
              <span className={`font-bold text-xs uppercase tracking-wider ${style.text}`}>
                {section.header}
              </span>
            </div>

            {/* Section content */}
            <div className="px-3 py-2 bg-white/50">
              {section.content.map((line, lineIndex) => {
                // Handle bullet points
                if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
                  const bulletContent = line.trim().replace(/^[-•]\s*/, '');
                  return (
                    <div key={lineIndex} className="flex gap-2 py-0.5">
                      <span className="text-slate-400 select-none">•</span>
                      <span className="text-slate-700">{renderInsertMarkers(bulletContent)}</span>
                    </div>
                  );
                }

                // Handle empty lines
                if (line.trim() === '') {
                  return <div key={lineIndex} className="h-1" />;
                }

                // Regular line
                return (
                  <div key={lineIndex} className="py-0.5 text-slate-700">
                    {renderInsertMarkers(line)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Highlights [INSERT: ...] markers with a distinctive style.
 */
const renderInsertMarkers = (text: string): React.ReactNode => {
  // Match [INSERT: any text here]
  const insertRegex = /\[INSERT:\s*([^\]]+)\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = insertRegex.exec(text)) !== null) {
    // Add text before the marker
    if (match.index > lastIndex) {
      parts.push(<span key={keyIndex++}>{text.slice(lastIndex, match.index)}</span>);
    }

    // Add the highlighted INSERT marker
    parts.push(
      <span
        key={keyIndex++}
        className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded border border-amber-200 text-sm font-medium"
      >
        <span className="text-amber-500">📝</span>
        {match[1]}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={keyIndex++}>{text.slice(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : text;
};

export const PromptOutput: React.FC<PromptOutputProps> = ({
  originalInput,
  output,
  onReset,
  onRefine
}) => {
  const [copied, setCopied] = useState(false);
  const [whyExpanded, setWhyExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pctrItems = [
    {
      key: 'persona',
      label: 'Role',
      icon: User,
      value: output.pctrBreakdown.persona,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      key: 'context',
      label: 'Context',
      icon: FileText,
      value: output.pctrBreakdown.context,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      key: 'task',
      label: 'Task',
      icon: Target,
      value: output.pctrBreakdown.task,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      key: 'requirements',
      label: 'Format',
      icon: ListChecks,
      value: output.pctrBreakdown.requirements,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Success header */}
      <div className="flex items-center gap-3 text-emerald-700">
        <div className="p-2 bg-emerald-100 rounded-full">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold">Your Prompt is Ready</h2>
      </div>

      {/* Generated prompt */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-700">YOUR PROMPT</span>
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${copied
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }
            `}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="p-5 text-sm text-slate-700 leading-relaxed">
          {renderFormattedPrompt(output.prompt)}
        </div>
      </div>

      {/* Why this works - Collapsible */}
      <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
        <button
          onClick={() => setWhyExpanded(!whyExpanded)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-700">Why this prompt works</span>
          </div>
          {whyExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {whyExpanded && (
          <div className="px-5 pb-5 pt-0">
            <div className="grid sm:grid-cols-2 gap-3">
              {pctrItems.map((item) => (
                <div
                  key={item.key}
                  className={`flex items-start gap-3 p-3 rounded-lg ${item.bg}`}
                >
                  <item.icon className={`w-4 h-4 mt-0.5 ${item.color}`} />
                  <div>
                    <p className={`text-xs font-semibold ${item.color} mb-0.5`}>
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-600">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
        <button
          onClick={onRefine}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
        >
          Refine This Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptOutput;
