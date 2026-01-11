import React, { useState } from 'react';
import { ArrowRight, Sparkles, Route, BookOpen, Wand2, Zap, FileText } from 'lucide-react';
import { Button } from './ui';

// Types
type Step = 'welcome' | 'q1' | 'q2' | 'q3' | 'results';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface OnboardingProps {
  onComplete: (path?: string) => void;
}

interface Recommendation {
  path: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Question options
const q1Options = [
  { value: 0, label: "Never / Just getting started" },
  { value: 1, label: "A few times a month" },
  { value: 2, label: "Weekly" },
  { value: 3, label: "Daily" },
];

const q2Options = [
  { value: 0, label: "I just type what I need" },
  { value: 1, label: "I try to be specific about what I want" },
  { value: 2, label: "I include context, role, and format instructions" },
  { value: 3, label: "I use system prompts or custom instructions" },
];

const q3Options = [
  { id: 'writing', label: "Writing emails, docs, or reports" },
  { id: 'data', label: "Analyzing data or spreadsheets" },
  { id: 'research', label: "Research and competitive intel" },
  { id: 'planning', label: "Planning campaigns or projects" },
  { id: 'summarizing', label: "Summarizing long documents" },
];

// Recommendations by level
const recommendationsByLevel: Record<SkillLevel, Recommendation[]> = {
  beginner: [
    {
      path: '/quick-start',
      title: 'Quick Start Tutorial',
      description: 'Learn the fundamentals of effective AI prompting in 5 minutes',
      icon: <Zap className="w-5 h-5" />
    },
    {
      path: '/generator',
      title: 'Prompt Generator',
      description: 'Get AI-optimized prompts for your real tasks',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      path: '/modules',
      title: 'Learning Modules',
      description: 'Build your skills with guided lessons',
      icon: <BookOpen className="w-5 h-5" />
    },
  ],
  intermediate: [
    {
      path: '/workflows',
      title: 'Workflow Advisor',
      description: 'Find proven workflows tailored to your tasks',
      icon: <Route className="w-5 h-5" />
    },
    {
      path: '/prompt-refiner',
      title: 'Prompt Refiner',
      description: 'Level up the prompts you already use',
      icon: <Wand2 className="w-5 h-5" />
    },
    {
      path: '/reference',
      title: 'Reference Guide',
      description: 'Advanced techniques and best practices',
      icon: <FileText className="w-5 h-5" />
    },
  ],
  advanced: [
    {
      path: '/workflows',
      title: 'Workflow Advisor',
      description: 'Get customized workflows for complex tasks',
      icon: <Route className="w-5 h-5" />
    },
    {
      path: '/prompt-refiner',
      title: 'Prompt Refiner',
      description: 'Optimize your prompts with PCTR analysis',
      icon: <Wand2 className="w-5 h-5" />
    },
    {
      path: '/reference',
      title: 'Reference Guide',
      description: 'Deep dives and expert patterns',
      icon: <FileText className="w-5 h-5" />
    },
  ],
};

// Skill level labels
const skillLevelLabels: Record<SkillLevel, string> = {
  beginner: 'Getting Started',
  intermediate: 'Building Skills',
  advanced: 'Power User',
};

// Calculate skill level from scores
function calculateSkillLevel(q1: number | null, q2: number | null): SkillLevel {
  const total = (q1 ?? 0) + (q2 ?? 0);
  if (total <= 1) return 'beginner';
  if (total <= 3) return 'intermediate';
  return 'advanced';
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('welcome');
  const [q1Answer, setQ1Answer] = useState<number | null>(null);
  const [q2Answer, setQ2Answer] = useState<number | null>(null);
  const [q3Answers, setQ3Answers] = useState<string[]>([]);

  const handleSkip = () => {
    onComplete();
  };

  const handleQ3Toggle = (id: string) => {
    setQ3Answers(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const skillLevel = calculateSkillLevel(q1Answer, q2Answer);
  const recommendations = recommendationsByLevel[skillLevel];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in overflow-hidden">

        {/* Welcome Step */}
        {step === 'welcome' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome to AI Academy!
            </h2>
            <p className="text-slate-600 mb-8">
              Let's personalize your experience.<br />
              This takes about 30 seconds.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setStep('q1')}
                className="w-full h-12 text-base font-semibold"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <button
                onClick={handleSkip}
                className="text-slate-500 hover:text-slate-700 text-sm font-medium"
              >
                Skip for now →
              </button>
            </div>
          </div>
        )}

        {/* Question 1 */}
        {step === 'q1' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Question 1 of 3
              </span>
              <button
                onClick={handleSkip}
                className="text-slate-500 hover:text-slate-700 text-sm font-medium"
              >
                Skip →
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              How often do you use AI tools like ChatGPT, Gemini, or Claude?
            </h2>

            <div className="space-y-3 mb-8">
              {q1Options.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    q1Answer === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="q1"
                    value={option.value}
                    checked={q1Answer === option.value}
                    onChange={() => setQ1Answer(option.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    q1Answer === option.value
                      ? 'border-blue-500'
                      : 'border-slate-300'
                  }`}>
                    {q1Answer === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>

            <Button
              onClick={() => setStep('q2')}
              disabled={q1Answer === null}
              className="w-full h-12 text-base font-semibold"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Question 2 */}
        {step === 'q2' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Question 2 of 3
              </span>
              <button
                onClick={handleSkip}
                className="text-slate-500 hover:text-slate-700 text-sm font-medium"
              >
                Skip →
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              When you ask AI for help, what do you usually include in your prompt?
            </h2>

            <div className="space-y-3 mb-8">
              {q2Options.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    q2Answer === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="q2"
                    value={option.value}
                    checked={q2Answer === option.value}
                    onChange={() => setQ2Answer(option.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                    q2Answer === option.value
                      ? 'border-blue-500'
                      : 'border-slate-300'
                  }`}>
                    {q2Answer === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>

            <Button
              onClick={() => setStep('q3')}
              disabled={q2Answer === null}
              className="w-full h-12 text-base font-semibold"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Question 3 (Optional) */}
        {step === 'q3' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Question 3 of 3 <span className="text-slate-300">(Optional)</span>
              </span>
              <button
                onClick={() => setStep('results')}
                className="text-slate-500 hover:text-slate-700 text-sm font-medium"
              >
                Skip →
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              What kind of work would you like AI to help with?
            </h2>
            <p className="text-slate-500 text-sm mb-6">Select all that apply.</p>

            <div className="space-y-3 mb-8">
              {q3Options.map(option => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    q3Answers.includes(option.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={q3Answers.includes(option.id)}
                    onChange={() => handleQ3Toggle(option.id)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                    q3Answers.includes(option.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300'
                  }`}>
                    {q3Answers.includes(option.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>

            <Button
              onClick={() => setStep('results')}
              className="w-full h-12 text-base font-semibold"
            >
              See My Recommendations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Results */}
        {step === 'results' && (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                skillLevel === 'beginner'
                  ? 'bg-blue-100 text-blue-700'
                  : skillLevel === 'intermediate'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-emerald-100 text-emerald-700'
              }`}>
                {skillLevelLabels[skillLevel]}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Your Personalized Path
              </h2>
              <p className="text-slate-500 text-sm">
                Based on your answers, here's where we recommend starting:
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {recommendations.map((rec, index) => (
                <button
                  key={rec.path}
                  onClick={() => onComplete(rec.path)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    index === 0
                      ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {rec.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{rec.title}</span>
                      {index === 0 && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{rec.description}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-3 ${
                    index === 0 ? 'text-blue-600' : 'text-slate-400'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => onComplete()}
              className="w-full text-center text-slate-500 hover:text-slate-700 text-sm font-medium py-2"
            >
              Go to Dashboard instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
