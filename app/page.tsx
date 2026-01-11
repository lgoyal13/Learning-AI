import React from 'react';
import { Button, Card } from '../components/ui';
import { useRouter } from '../lib/routerContext';
import { Wand2, Sparkles, ArrowRight } from 'lucide-react';

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

        {/* Two Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">

          {/* Card 1: Fix a Prompt (Refiner) - Recommended */}
          <Card
            className="p-8 border-2 border-blue-200 bg-blue-50/30 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => push('/prompt-refiner')}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
              <Wand2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Fix a prompt</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              AI not giving you what you want? Paste your prompt and we'll show you exactly how to improve it.
            </p>
            <Button
              className="w-full group-hover:bg-blue-700"
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
            className="p-8 border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => push('/generator')}
          >
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Build a prompt</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Starting fresh? Describe your task and we'll create an expert prompt for any AI tool.
            </p>
            <Button
              variant="secondary"
              className="w-full group-hover:bg-slate-200"
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
