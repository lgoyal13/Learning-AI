import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button } from '../../../components/ui';
import { 
  Zap, BrainCircuit, Globe, Paperclip, Mic, Image, Search,
  ArrowRight, ArrowLeft, CheckCircle2, Check, Layers, PenTool
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'speeds', title: 'Your AI Has More Than One Speed' },
    { id: 'deep-research', title: 'Deep Research vs Normal Chat' },
    { id: 'tooling', title: 'The Toolbar Is Part of Prompting' },
    { id: 'tool-track', title: 'See Specialist Tools in Action' },
  ];

  const totalSteps = sections.length;

  const handleNext = () => {
    setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionContent = [
    // SECTION 1: SPEEDS
    (
      <section key="speeds" id="speeds" className="mb-12 animate-fade-in">
        <h2>Your AI has more than one speed</h2>
        <p className="text-lg text-slate-700 mb-8">
          Not all prompts are created equal. Modern models usually have two gears: a <strong>Fast Mode</strong> for quick tasks, and a <strong>Reasoning Mode</strong> for complex thinking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
          <Card className="p-6 border-t-4 border-t-blue-500 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Fast Mode</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>When to use:</strong> Quick summaries, rewriting emails, brainstorming lists, or simple coding tasks.
            </p>
            <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 italic border border-slate-100">
              "Expect an answer in seconds. It relies on patterns and speed."
            </div>
          </Card>

          <Card className="p-6 border-t-4 border-t-purple-600 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Reasoning Mode</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>When to use:</strong> Financial analysis, strategic recommendations, complex logic puzzles, or high-stakes reports.
            </p>
            <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 italic border border-slate-100">
              "Expect it to 'think' for 10-30 seconds. It checks its own logic."
            </div>
          </Card>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
           <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Example: "Should we expand EV charging?"</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <p className="text-xs font-bold text-blue-600 mb-1">Fast Mode Answer:</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  "Yes, expanding EV charging is a good idea because the market is growing. You should look into government grants and partnerships..."
                  <br/><span className="text-slate-400 italic">(Generic, predictable)</span>
                </p>
             </div>
             <div>
                <p className="text-xs font-bold text-purple-600 mb-1">Reasoning Mode Answer:</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  "Let's analyze the ROI. First, we need to consider installation costs vs. utilization rates. If utilization is under 15%, the break-even point pushes to 2030..."
                  <br/><span className="text-slate-400 italic">(Nuanced, mathematically grounded)</span>
                </p>
             </div>
           </div>
        </div>
      </section>
    ),

    // SECTION 2: DEEP RESEARCH
    (
      <section key="deep-research" id="deep-research" className="mb-12 animate-fade-in">
        <h2>Deep Research vs normal chat</h2>
        <p className="text-lg text-slate-700 mb-6">
          Standard chat models (even in "Pro" mode) mostly rely on training data. They might do a quick Google search, but they aren't reading 50 websites for you.
        </p>
        <p className="text-slate-600 mb-8">
          <strong>Deep Research</strong> tools (like Perplexity or Gemini Deep Research) actually run a structured, multi-step web search. They cite their sources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5"/> Use Deep Research for:
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Market & competitor scans</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Recent regulatory or policy changes</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Checking facts for a presentation</li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> Finding specific statistics with links</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <h3 className="text-slate-600 font-bold mb-4 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center text-[10px]">✕</div>
              Skip it for:
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-slate-400">•</span> Rewording emails or polite drafts</li>
              <li className="flex gap-2"><span className="text-slate-400">•</span> Brainstorming creative names</li>
              <li className="flex gap-2"><span className="text-slate-400">•</span> Summarizing a doc you already have</li>
              <li className="flex gap-2"><span className="text-slate-400">•</span> Simple coding questions</li>
            </ul>
          </div>
        </div>

        <Callout variant="info" title="Pro Tip: Fast vs Deep Research">
          <p className="mb-2">
             Even research tools have a toggle. 
          </p>
          <p className="font-bold text-blue-900">
             Fast is fine for a quick gut check. For anything you will put in a deck or send to a leader, use the deeper mode with citations.
          </p>
        </Callout>
      </section>
    ),

    // SECTION 3: TOOLBAR
    (
      <section key="tooling" id="tooling" className="mb-12 animate-fade-in">
        <h2>The toolbar is part of prompting</h2>
        <p className="text-lg text-slate-700 mb-8">
          The text box is not your only tool. The buttons around it—Search, Attach, Voice—give the model the context it needs to succeed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          
          <Card className="p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Search className="w-4 h-4 text-blue-500" /> Web Search Toggle
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Force the model to look up fresh info vs using its training data.
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "Turn ON to find today's stock price."
            </div>
          </Card>

          <Card className="p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Paperclip className="w-4 h-4 text-blue-500" /> Attachments
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Upload PDFs, Spreadsheets, or Decks. Ground the AI in <em>your</em> data.
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "I attached the Q3 deck. Summarize the 5 key risks."
            </div>
          </Card>

          <Card className="p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Image className="w-4 h-4 text-blue-500" /> Vision / Screenshot
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Paste a screenshot of a dashboard or error and ask for an explanation.
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "Look at this chart. What is the trend in Q4?"
            </div>
          </Card>

          <Card className="p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Mic className="w-4 h-4 text-blue-500" /> Voice / Screen
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Talk it out. Great for messy, complex problems or roleplay.
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "I'm going to rant about a problem. Help me structure it."
            </div>
          </Card>

        </div>
      </section>
    ),

    // SECTION 4: TOOLS TRACK
    (
      <section key="tool-track" id="tool-track" className="mb-12 animate-fade-in">
        <h2>Ready to see specialist tools in action?</h2>
        <p className="text-lg text-slate-700 mb-8">
          Chatbots are the front door. Specialist tools are the wings of the house.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          
          <Card className="p-6 flex flex-col h-full bg-slate-50 border-t-4 border-t-blue-500">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-slate-900">Research & Web</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
              <li>• Using Perplexity for intel</li>
              <li>• Getting cited answers</li>
              <li>• Avoiding hallucinations</li>
            </ul>
            <Button onClick={() => push('/modules/tool-research')} variant="primary" className="w-full">
              Start Module <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          <Card className="p-6 flex flex-col h-full bg-slate-50 border-t-4 border-t-purple-500">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-slate-900">Your Docs</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
              <li>• NotebookLM deep dive</li>
              <li>• Summarizing 50+ PDFs</li>
              <li>• Creating briefing docs</li>
            </ul>
            <Button onClick={() => push('/modules/tool-documents')} variant="primary" className="w-full">
              Start Module <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          <Card className="p-6 flex flex-col h-full bg-slate-50 border-t-4 border-t-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <PenTool className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-900">Builders</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
              <li>• Google AI Studio</li>
              <li>• Saving prompts as tools</li>
              <li>• Advanced prototyping</li>
            </ul>
            <Button onClick={() => push('/modules/tool-builder')} variant="primary" className="w-full">
              Start Module <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

        </div>
      </section>
    )
  ];

  return (
    <ModuleLayout
      title="Modern Chatbots & Modes"
      description="Your AI is more than one chat window. Learn when to use fast modes, when to slow down for deep reasoning, and how to use web search and attachments wisely."
      duration="20 mins"
      audience="Intermediate Users"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
    >
      {/* Current Section Content */}
      <div className="min-h-[400px]">
        {sectionContent[currentStep]}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 pt-8 border-t border-slate-200">
        <Button 
          variant="secondary" 
          onClick={handlePrev} 
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button onClick={handleNext}>
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={() => push('/modules')} variant="outline">
            Finish module <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </ModuleLayout>
  );
}