import React from 'react';
import { PageLayout, Heading, Card, Callout, PromptCard, Button } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { Target, FileText, CheckCircle, AlertTriangle, Zap, Eye, Play } from 'lucide-react';

export default function Page() {
  const { push } = useRouter();

  return (
    <PageLayout 
      title="Prompting Guide" 
      description="The field manual for talking to AI. Follow these steps when your results aren't quite right."
    >
      
      {/* SECTION 1: BEFORE */}
      <section className="mb-12 animate-fade-in">
        <Heading level={2} className="mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-slate-400" />
          Before you prompt
        </Heading>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <ul className="space-y-4 text-lg text-slate-700">
            <li className="flex gap-3">
              <span className="font-bold text-slate-400">1.</span>
              Clarify what you want and who the audience is.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-400">2.</span>
              Gather only the context the model truly needs.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-400">3.</span>
              Decide which tool and mode fits best.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 2: DURING */}
      <section className="mb-12 animate-fade-in">
        <Heading level={2} className="mb-6 flex items-center gap-2">
          <Play className="w-6 h-6 text-blue-600" />
          While you are prompting
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h3 className="font-bold text-slate-900 mb-2">Set a role</h3>
            <p className="text-sm text-slate-600 mb-3">Tell the model who it is acting as.</p>
            <div className="text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100 text-slate-500">
              "Act as a Senior Project Manager..."
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-purple-500">
            <h3 className="font-bold text-slate-900 mb-2">State the audience</h3>
            <p className="text-sm text-slate-600 mb-3">Explain who will read or hear the output.</p>
            <div className="text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100 text-slate-500">
              "...writing for a busy executive..."
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-emerald-500">
            <h3 className="font-bold text-slate-900 mb-2">Show one example</h3>
            <p className="text-sm text-slate-600 mb-3">Paste a good example and ask the model to match it.</p>
            <div className="text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100 text-slate-500">
              "Here is a past email I liked. Match this tone."
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-amber-500">
            <h3 className="font-bold text-slate-900 mb-2">Ask for a format</h3>
            <p className="text-sm text-slate-600 mb-3">Describe the structure, such as bullets, table, or slide titles.</p>
            <div className="text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100 text-slate-500">
              "...output as a markdown table with 3 columns."
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 3: AFTER */}
      <section className="mb-12 animate-fade-in">
        <Heading level={2} className="mb-6 flex items-center gap-2">
          <Eye className="w-6 h-6 text-slate-400" />
          When you review the answer
        </Heading>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <ul className="space-y-4 text-lg text-slate-700">
            <li className="flex gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
              Scan for claims that do not match what you know.
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
              Double check important numbers and dates.
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
              Ask the model to show its reasoning or point to sources.
            </li>
          </ul>
        </div>

        <div className="max-w-xl">
           <p className="text-sm font-bold text-slate-500 uppercase mb-2">Debug Prompt</p>
           <PromptCard 
             label="Copy this if the answer feels wrong"
             prompt="Review your last answer. List any claims that are not supported by the context provided. Then rewrite the answer to be strictly factual."
           />
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="mt-12 border-t border-slate-200 pt-6">
         <h3 className="font-bold text-slate-900 mb-2">What next?</h3>
         <div className="flex flex-wrap gap-3">
           <Button variant="outline" onClick={() => push('/reference')}>
             Back to Reference & Cheat Sheets
           </Button>
         </div>
      </section>

    </PageLayout>
  );
}