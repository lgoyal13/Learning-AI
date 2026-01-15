import React from 'react';
import { Button, Card } from '../components/ui';
import { useRouter } from '../lib/routerContext';
import { Wand2, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

export default function Page() {
  const { push } = useRouter();

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">

        {/* Hero: Welcome Greeting */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            How can AI help you today?
          </h1>
          <p className="text-lg text-slate-600">
            Whatever tool you use — ChatGPT, Gemini, Claude — we'll help you get better results.
          </p>
        </div>

        {/* Primary CTA: Task Planner */}
        <div
          className="w-full max-w-3xl mb-6 p-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white cursor-pointer group hover:shadow-xl transition-all"
          onClick={() => push('/task-planner')}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Plan a task with AI guidance</h2>
              <p className="text-blue-100 leading-relaxed">
                Tell me what you're trying to accomplish. I'll create a step-by-step plan showing where AI can help, what's best handled by you, and common pitfalls to avoid.
              </p>
            </div>
            <Button
              className="bg-white text-blue-700 hover:bg-blue-50 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                push('/task-planner');
              }}
            >
              Start planning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Secondary Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">

          {/* Card 1: Fix a Prompt (Refiner) */}
          <Card
            className="p-6 border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => push('/prompt-refiner')}
          >
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-4 group-hover:scale-110 transition-transform">
              <Wand2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Fix a prompt</h2>
            <p className="text-slate-600 text-sm mb-5 leading-relaxed">
              AI not giving you what you want? Paste your prompt and we'll show you how to improve it.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                push('/prompt-refiner');
              }}
            >
              Fix my prompt
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* Card 2: Build a Prompt (Generator) */}
          <Card
            className="p-6 border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => push('/generator')}
          >
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Build a prompt</h2>
            <p className="text-slate-600 text-sm mb-5 leading-relaxed">
              Starting fresh? Describe your task and we'll create an expert prompt for any AI tool.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                push('/generator');
              }}
            >
              Build my prompt
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

        </div>

        {/* Learn More Link */}
        <p className="text-slate-500 text-sm">
          Want to understand how prompting works?{' '}
          <button
            onClick={() => push('/modules')}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Explore Learning Modules →
          </button>
        </p>

      </div>
    </div>
  );
}
