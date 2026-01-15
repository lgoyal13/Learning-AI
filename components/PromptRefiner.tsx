import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb, User, FileText, Target, ListChecks } from 'lucide-react';
import { evaluatePrompt } from '../services/geminiService';
import { PromptEvaluationOutput, PCTRDimension } from '../types';
import { Button, Card, Badge, PromptCard, Callout } from './ui';

interface PCTRCardProps {
  label: string;
  icon: React.ReactNode;
  dimension: PCTRDimension;
}

const PCTRCard: React.FC<PCTRCardProps> = ({ label, icon, dimension }) => {
  const ratingStyles = {
    Strong: { badge: 'success' as const, bg: 'bg-emerald-50', border: 'border-emerald-200' },
    Okay: { badge: 'warning' as const, bg: 'bg-amber-50', border: 'border-amber-200' },
    Missing: { badge: 'danger' as const, bg: 'bg-red-50', border: 'border-red-200' },
  };

  const style = ratingStyles[dimension.rating];

  return (
    <div className={`p-4 rounded-lg border ${style.bg} ${style.border}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-600">{icon}</span>
          <span className="font-semibold text-slate-800">{label}</span>
        </div>
        <Badge variant={style.badge}>{dimension.rating}</Badge>
      </div>
      <p className="text-sm text-slate-600">{dimension.comment}</p>
    </div>
  );
};

export const PromptRefiner: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [scenario, setScenario] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PromptEvaluationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async () => {
    if (!userPrompt.trim()) {
      setError('Please enter a prompt to evaluate.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const evaluation = await evaluatePrompt(userPrompt, scenario || undefined);
      setResult(evaluation);
    } catch (err) {
      setError('Failed to evaluate prompt. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserPrompt('');
    setScenario('');
    setResult(null);
    setError(null);
  };

  const examplePrompts = [
    "Write me a summary of the document",
    "Help me analyze our Q4 sales data and find trends",
    "Act as a senior marketing strategist. Review our campaign brief for the holiday season targeting millennials. Create 3 headline options that emphasize urgency and value. Format as a numbered list with rationale for each."
  ];

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Evaluate Your Prompt
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your Prompt
            </label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Paste your prompt here..."
              className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-900 placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Context / Scenario <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="e.g., Writing a client email, Analyzing sales data..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400"
            />
          </div>

          {error && (
            <Callout variant="danger">
              {error}
            </Callout>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleEvaluate}
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {isLoading ? 'Analyzing...' : 'Evaluate Prompt'}
            </Button>
            {(userPrompt || result) && (
              <Button variant="outline" onClick={handleReset}>
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Example prompts */}
        {!result && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 mb-3">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setUserPrompt(example)}
                  className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors truncate max-w-xs"
                >
                  {example.length > 50 ? example.substring(0, 50) + '...' : example}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary */}
          <Callout variant="info" title="Analysis Summary">
            {result.summary}
          </Callout>

          {/* PCTR Breakdown */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">PCTR Framework Analysis</h3>
            <p className="text-sm text-slate-600 mb-4">
              Every effective prompt needs four elements: <strong>P</strong>ersona, <strong>C</strong>ontext, <strong>T</strong>ask, and <strong>R</strong>equirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PCTRCard
                label="Persona"
                icon={<User className="w-4 h-4" />}
                dimension={result.pctr.persona}
              />
              <PCTRCard
                label="Context"
                icon={<FileText className="w-4 h-4" />}
                dimension={result.pctr.context}
              />
              <PCTRCard
                label="Task"
                icon={<Target className="w-4 h-4" />}
                dimension={result.pctr.task}
              />
              <PCTRCard
                label="Requirements"
                icon={<ListChecks className="w-4 h-4" />}
                dimension={result.pctr.requirements}
              />
            </div>
          </Card>

          {/* Before / After Comparison */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Before & After</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="neutral">Original</Badge>
                  <span className="text-sm text-slate-500">Your prompt</span>
                </div>
                <PromptCard prompt={userPrompt} label="YOUR PROMPT" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="success">Improved</Badge>
                  <span className="text-sm text-slate-500">Suggested rewrite</span>
                </div>
                <PromptCard prompt={result.improvedPrompt} label="IMPROVED PROMPT" />
              </div>
            </div>
          </Card>

          {/* Tip */}
          <Callout variant="success" title="Pro Tip">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{result.tip}</span>
            </div>
          </Callout>
        </div>
      )}
    </div>
  );
};

export default PromptRefiner;
