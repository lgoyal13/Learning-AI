
import React, { useState } from 'react';
import { PageLayout, Heading, Card, Callout, PromptCard, Button } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { PenTool, Target, FileText, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Page() {
  const { push } = useRouter();
  const [openSections, setOpenSections] = useState<{ tips: boolean; troubleshooting: boolean }>({
    tips: false,
    troubleshooting: false,
  });

  const toggleSection = (id: 'tips' | 'troubleshooting') => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageLayout 
      title="Prompting Guide" 
      description="The field manual for talking to AI. Use this checklist when your results aren't quite right."
    >
      
      {/* SECTION 1: THE CORE FRAMEWORK */}
      <section>
        <Heading level={2} className="mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          The Core Framework (P.C.T.R.)
        </Heading>
        <p className="text-slate-600 mb-6 text-lg">
          Every great prompt contains four specific ingredients. If you are getting bad results, you are likely missing one of these.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-t-4 border-t-blue-500 bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 rounded text-blue-700 font-bold text-xs uppercase tracking-wider">
                1. Persona
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Set the Role</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
              Who is the AI? What perspective should it take?
            </p>
            <div className="bg-slate-50 p-4 rounded-lg text-sm font-mono text-slate-700 border border-slate-100 mt-auto">
              "Act as a Senior Project Manager..."
            </div>
          </Card>

          <Card className="border-t-4 border-t-purple-500 bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
             <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-100 rounded text-purple-700 font-bold text-xs uppercase tracking-wider">
                2. Context
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Give Background</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
              What does the AI need to know to do the job?
            </p>
            <div className="bg-slate-50 p-4 rounded-lg text-sm font-mono text-slate-700 border border-slate-100 mt-auto">
              "I am writing an update for the VP..."
            </div>
          </Card>

          <Card className="border-t-4 border-t-emerald-500 bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
             <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-100 rounded text-emerald-700 font-bold text-xs uppercase tracking-wider">
                3. Task
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Define the Action</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
              What specific job are we doing? Use active verbs.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg text-sm font-mono text-slate-700 border border-slate-100 mt-auto">
              "...draft a formal status update..."
            </div>
          </Card>

          <Card className="border-t-4 border-t-amber-500 bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
             <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-amber-100 rounded text-amber-700 font-bold text-xs uppercase tracking-wider">
                4. Requirements
              </div>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Specify Output</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
              Format? Tone? Length? Constraints?
            </p>
            <div className="bg-slate-50 p-4 rounded-lg text-sm font-mono text-slate-700 border border-slate-100 mt-auto">
              "...keep it under 200 words, no jargon."
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 2: POWER TIPS */}
      <section className="mt-12">
        <button 
          onClick={() => toggleSection('tips')}
          className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-left group"
        >
          <div className="flex items-center gap-4">
             <div className="p-2 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-200 transition-colors">
                <PenTool className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-900">Power Tips</h2>
                <p className="text-sm text-slate-500">Open when your prompts feel flat</p>
             </div>
          </div>
          {openSections.tips ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {openSections.tips && (
          <div className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Key Strategies</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Assign a Persona:</strong>
                      <p className="text-sm text-slate-600">"Act as a lawyer" gives very different results than "Act as a marketing intern".</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Use Constraints:</strong>
                      <p className="text-sm text-slate-600">Tell it what NOT to do. "Do not use passive voice." "Do not mention the budget."</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Few-Shot Prompting:</strong>
                      <p className="text-sm text-slate-600">Give the AI examples of input and output to establish a pattern.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <h3 className="font-bold text-slate-900 mb-4">The "Golden Prompt" Template</h3>
                 <PromptCard 
                    label="Copy this Structure"
                    prompt="Act as a [PERSONA]. \nI need you to [TASK]. \nHere is the background info: [CONTEXT]. \nPlease format your response as follows: [REQUIREMENTS]."
                 />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3: TROUBLESHOOTING */}
      <section className="mt-12">
        <button 
          onClick={() => toggleSection('troubleshooting')}
          className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-left group"
        >
          <div className="flex items-center gap-4">
             <div className="p-2 bg-amber-100 rounded-lg text-amber-600 group-hover:bg-amber-200 transition-colors">
                <AlertTriangle className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-900">Troubleshooting Checklist</h2>
                <p className="text-sm text-slate-500">Open when the answer looks wrong</p>
             </div>
          </div>
          {openSections.troubleshooting ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {openSections.troubleshooting && (
          <div className="mt-6 animate-fade-in">
            <Card className="p-0 overflow-hidden">
              <div className="bg-amber-50 p-4 border-b border-amber-100">
                <h3 className="font-bold text-amber-900">If the answer is bad...</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="font-bold text-slate-900 mb-2">1. Did you assume knowledge?</h4>
                    <p className="text-sm text-slate-600 mb-4">
                       The AI doesn't know our internal acronyms unless you define them. Paste the definition in the prompt.
                    </p>

                    <h4 className="font-bold text-slate-900 mb-2">2. Is the task too big?</h4>
                    <p className="text-sm text-slate-600">
                       "Summarize this 100-page file" is hard. Try "Extract the dates from pages 1-10" first. Break it down.
                    </p>
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 mb-2">3. Ask it to "Think Step-by-Step"</h4>
                    <p className="text-sm text-slate-600 mb-4">
                       Adding this magic phrase forces the AI to show its work, which reduces logic errors significantly.
                    </p>

                    <h4 className="font-bold text-slate-900 mb-2">4. Iterate</h4>
                    <p className="text-sm text-slate-600">
                       Treat it like a chat, not a command line. "That was good, but make it shorter."
                    </p>
                 </div>
              </div>
            </Card>
          </div>
        )}
      </section>

      {/* SECTION 4: NAVIGATION */}
      <section className="mt-12 border-t border-slate-200 pt-6">
         <h3 className="font-bold text-slate-900 mb-2">What next?</h3>
         <p className="text-slate-600 mb-4">
           You now have a simple checklist for better prompts. Choose where you want to go next.
         </p>
         <div className="flex flex-wrap gap-3">
           <Button variant="outline" onClick={() => push('/reference')}>
             Back to Reference & Cheat Sheets
           </Button>
           <Button variant="ghost" onClick={() => push('/reference')}>
             Open Prompt Template Library
           </Button>
         </div>
      </section>

    </PageLayout>
  );
}
