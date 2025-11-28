
import React from 'react';
import { PageLayout, Heading, Card, Callout, PromptCard } from '../../../components/ui';
import { PenTool, Target, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Page() {
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
          <Card className="border-t-4 border-t-blue-500 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded text-blue-700 font-bold text-xs uppercase tracking-wider">
                1. Persona
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Set the Role</h3>
            <p className="text-slate-600 text-sm mb-4">
              Who is the AI? What perspective should it take?
            </p>
            <div className="bg-slate-50 p-3 rounded text-sm font-mono text-slate-700">
              "Act as a Senior Project Manager..."
            </div>
          </Card>

          <Card className="border-t-4 border-t-purple-500 bg-white">
             <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-100 rounded text-purple-700 font-bold text-xs uppercase tracking-wider">
                2. Context
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Give Background</h3>
            <p className="text-slate-600 text-sm mb-4">
              What does the AI need to know to do the job?
            </p>
            <div className="bg-slate-50 p-3 rounded text-sm font-mono text-slate-700">
              "I am writing an update for the VP..."
            </div>
          </Card>

          <Card className="border-t-4 border-t-emerald-500 bg-white">
             <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-emerald-100 rounded text-emerald-700 font-bold text-xs uppercase tracking-wider">
                3. Task
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Define the Action</h3>
            <p className="text-slate-600 text-sm mb-4">
              What specific job are we doing? Use active verbs.
            </p>
            <div className="bg-slate-50 p-3 rounded text-sm font-mono text-slate-700">
              "...draft a formal status update..."
            </div>
          </Card>

          <Card className="border-t-4 border-t-amber-500 bg-white">
             <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-amber-100 rounded text-amber-700 font-bold text-xs uppercase tracking-wider">
                4. Requirements
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Specify Output</h3>
            <p className="text-slate-600 text-sm mb-4">
              Format? Tone? Length? Constraints?
            </p>
            <div className="bg-slate-50 p-3 rounded text-sm font-mono text-slate-700">
              "...keep it under 200 words, no jargon."
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 2: POWER TIPS */}
      <section className="mt-12">
        <Heading level={2} className="mb-6 flex items-center gap-2">
          <PenTool className="w-6 h-6 text-purple-600" />
          Power Tips
        </Heading>
        
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
      </section>

      {/* SECTION 3: TROUBLESHOOTING */}
      <section className="mt-12">
         <Heading level={2} className="mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          Troubleshooting Checklist
        </Heading>
        
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
      </section>

    </PageLayout>
  );
}
