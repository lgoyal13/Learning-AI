import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button, PromptCard, Badge } from '../../../components/ui';
import { 
  FileText, Layers, CheckCircle2, Database, ArrowLeft, ArrowRight, 
  Lightbulb, Search, MessageSquare, Upload, BookOpen, Clock, Play, 
  Target, ShieldAlert, Mic, Headphones, File, Zap, Globe
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page({ onBack }: { onBack?: () => void }) {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // State for Interactive Flow
  const [activePseudoStep, setActivePseudoStep] = useState<'upload' | 'ask' | 'view'>('upload');

  const sections = [
    { id: 'intro', title: 'Meet NotebookLM' },
    { id: 'decision', title: 'When to Use It' },
    { id: 'setup', title: 'How to Set Up' },
    { id: 'playbook', title: 'Role-Based Playbook' },
    { id: 'interactive', title: 'Try the Workflow' },
    { id: 'features', title: 'Citations & Audio' },
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

  const handleJumpTo = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // INTRO
        return (
          <section id="intro" className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Meet NotebookLM</h2>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl">
              Most AI tools guess the answer based on the internet. <strong>NotebookLM</strong> is different. 
              It reads <em>only</em> the documents you give it—PDFs, Google Docs, Slides, or pasted text—and answers questions using nothing else.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-blue-50 border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Grounded in Your Data</h3>
                </div>
                <p className="text-slate-700">
                  It creates a private "brain" for your project. It won't bring in outside hallucinations or generic internet advice unless you ask it to.
                </p>
              </Card>

              <Card className="p-6 bg-emerald-50 border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Massive Context</h3>
                </div>
                <p className="text-slate-700">
                  You can upload up to 50 documents (thousands of pages) into one notebook. It connects the dots across all of them instantly.
                </p>
              </Card>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">After this module you will be able to:</h3>
               <ul className="space-y-3 text-sm text-slate-700">
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Identify when to use NotebookLM instead of Chat or Search.
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Set up a "Notebook" for a specific project or vendor review.
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Turn a pile of dry PDFs into a functional study guide or FAQ.
                 </li>
               </ul>
            </div>
          </section>
        );

      case 1: // WHEN TO USE
        return (
          <section id="decision" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose the Right Tool</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Don't use a screwdriver to pound a nail. NotebookLM is specialized. 
              Here is when to reach for it vs. other AI tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* CHAT */}
              <Card className="p-5 border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold">
                    <MessageSquare className="w-5 h-5" /> Standard Chat
                 </div>
                 <p className="text-xs font-bold text-slate-400 uppercase mb-3">Gemini / ChatGPT</p>
                 <ul className="text-sm text-slate-600 space-y-2">
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Drafting emails</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Brainstorming</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Quick explanations</li>
                 </ul>
              </Card>

              {/* RESEARCH */}
              <Card className="p-5 border-t-4 border-t-purple-500 hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-2 mb-3 text-purple-700 font-bold">
                    <Globe className="w-5 h-5" /> Research
                 </div>
                 <p className="text-xs font-bold text-slate-400 uppercase mb-3">Perplexity</p>
                 <ul className="text-sm text-slate-600 space-y-2">
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Market trends</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Competitor news</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Live citations</li>
                 </ul>
              </Card>

              {/* NOTEBOOKLM */}
              <Card className="p-5 border-t-4 border-t-emerald-500 hover:shadow-md transition-shadow bg-emerald-50/30">
                 <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold">
                    <Layers className="w-5 h-5" /> Your Docs
                 </div>
                 <p className="text-xs font-bold text-slate-400 uppercase mb-3">NotebookLM</p>
                 <ul className="text-sm text-slate-600 space-y-2">
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Summarizing 10+ PDFs</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Comparing vendors</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Studying policy</li>
                 </ul>
              </Card>
            </div>

            <Callout variant="info" title="The Golden Rule">
               Use NotebookLM when the answer <strong>must</strong> come from your files, not the AI's general training.
            </Callout>
          </section>
        );

      case 2: // HOW TO SETUP
        return (
          <section id="setup" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">How to think in "Notebooks"</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Unlike a chat where you start fresh every time, NotebookLM is organized by project. 
              Think of a "Notebook" as a binder on your desk.
            </p>

            <div className="space-y-4 not-prose mb-8">
              <Card className="p-4 flex items-center gap-4 border-l-4 border-l-blue-500">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-slate-900">Create a Notebook</h3>
                  <p className="text-sm text-slate-600">Give it a specific name, e.g., "Q3 Vendor Review" or "Project Alpha Research."</p>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-4 border-l-4 border-l-purple-500">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-slate-900">Add Sources</h3>
                  <p className="text-sm text-slate-600">Upload up to 50 sources. PDFs, Google Docs, Slides, or even pasted text.</p>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-4 border-l-4 border-l-emerald-500">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-slate-900">Select & Query</h3>
                  <p className="text-sm text-slate-600">Check the boxes for the sources you want to include, then ask your question.</p>
                </div>
              </Card>
            </div>
            
            <div className="bg-slate-100 p-4 rounded-lg flex items-center gap-3 text-sm text-slate-700 border border-slate-200">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
              <p>
                <strong>Pro Tip:</strong> You can upload multiple types of files in one notebook. Mix your meeting notes (Doc) with the client's proposal (PDF).
              </p>
            </div>
          </section>
        );

      case 3: // PLAYBOOK
        return (
          <section id="playbook" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Role-Based Playbook</h2>
            <p className="text-lg text-slate-700 mb-8">
              See how different roles use NotebookLM to save hours of reading time.
            </p>

            <div className="grid grid-cols-1 gap-8">
              
              {/* SCENARIO 1: PM/Ops */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">The "Vendor Shootout"</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm">
                  You have 3 lengthy proposal PDFs from different vendors. You need to compare them side-by-side.
                </p>
                <PromptCard 
                  label="Prompt Template"
                  prompt={`Context: I have selected the 3 vendor proposal PDFs.
Task: Create a comparison table for these vendors.
Requirements:
- Columns: Vendor Name, Total Year 1 Cost, Implementation Timeline, Support Hours.
- Flag any "hidden costs" found in the fine print.`}
                />
              </div>

              {/* SCENARIO 2: Marketing/Sales */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">The "Voice of Customer"</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm">
                  You have 20 interview transcripts from customer calls. You need to find common themes.
                </p>
                <PromptCard 
                  label="Prompt Template"
                  prompt={`Context: I have selected all 20 customer interview transcripts.
Task: Summarize the top 3 recurring pain points mentioned by customers.
Requirements:
- For each pain point, provide 3 direct quotes from different customers.
- Identify which feature request comes up most often.`}
                />
              </div>

              {/* SCENARIO 3: HR/Legal */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">The "Policy Decoder"</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm">
                  You have a complex new compliance handbook (100+ pages). You need to explain it to the team.
                </p>
                <PromptCard 
                  label="Prompt Template"
                  prompt={`Context: I have selected the new 2024 Compliance Handbook.
Task: Create a "Top 10 Changes" FAQ for employees.
Requirements:
- Focus on what is *different* from standard practice.
- Write in plain, friendly language (no legalese).
- Include page references for each answer.`}
                />
              </div>

            </div>
          </section>
        );

      case 4: // INTERACTIVE FLOW
        return (
          <section id="interactive" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Try the workflow</h2>
            <p className="text-lg text-slate-700 mb-8">
              Walk through a simulated NotebookLM session to feel how it works.
            </p>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50">
                <button 
                  onClick={() => setActivePseudoStep('upload')}
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activePseudoStep === 'upload' ? 'bg-white text-blue-600 border-t-2 border-t-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Upload className="w-4 h-4" /> 1. Add Sources
                </button>
                <button 
                  onClick={() => setActivePseudoStep('ask')}
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activePseudoStep === 'ask' ? 'bg-white text-purple-600 border-t-2 border-t-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <MessageSquare className="w-4 h-4" /> 2. Ask
                </button>
                <button 
                  onClick={() => setActivePseudoStep('view')}
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activePseudoStep === 'view' ? 'bg-white text-emerald-600 border-t-2 border-t-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <BookOpen className="w-4 h-4" /> 3. Output
                </button>
              </div>

              {/* Content Area */}
              <div className="p-8 min-h-[300px] flex flex-col justify-center">
                {activePseudoStep === 'upload' && (
                  <div className="animate-fade-in text-center">
                    <h3 className="font-bold text-slate-900 mb-4">The "Binder" Concept</h3>
                    <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                      You create a new notebook called "Vendor Review" and drop in your files.
                    </p>
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-slate-700">Acme_Proposal.pdf</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-slate-700">BetaCorp_Pricing.pdf</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <Layers className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-slate-700">Internal_Requirements.pptx</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                    </div>
                    <Button className="mt-6" onClick={() => setActivePseudoStep('ask')}>
                      Next: Query Docs
                    </Button>
                  </div>
                )}

                {activePseudoStep === 'ask' && (
                  <div className="animate-fade-in">
                    <h3 className="font-bold text-slate-900 mb-4 text-center">Query across all files</h3>
                    <p className="text-slate-600 mb-6 text-center text-sm">
                      You can ask questions that require reading <em>all</em> the documents at once.
                    </p>
                    <div className="max-w-lg mx-auto">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                        <p className="text-sm font-mono text-slate-700">
                          "Compare the implementation timelines for Acme vs BetaCorp. Which one aligns better with our Q3 requirements deck?"
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button onClick={() => setActivePseudoStep('view')} variant="secondary">
                           <Play className="w-4 h-4 mr-2 fill-current" /> Run Analysis
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activePseudoStep === 'view' && (
                  <div className="animate-fade-in">
                    <h3 className="font-bold text-slate-900 mb-4 text-center">The Answer with Citations</h3>
                    <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 p-6 rounded-lg shadow-sm">
                       <h4 className="font-bold text-slate-800 text-sm uppercase mb-3 border-b border-slate-200 pb-2">Analysis Result</h4>
                       <ul className="space-y-3 text-sm text-slate-700">
                         <li className="flex gap-2">
                           <span className="text-green-600 font-bold">•</span>
                           <span><strong>Winner:</strong> Acme Corp fits the Q3 timeline.</span>
                         </li>
                         <li className="flex gap-2">
                           <span className="text-slate-400 font-bold">•</span>
                           <span>Acme proposes a <strong>4-week setup</strong> finishing by Aug 15 (Source 1, p.4).</span>
                         </li>
                         <li className="flex gap-2">
                           <span className="text-slate-400 font-bold">•</span>
                           <span>BetaCorp requires a <strong>12-week setup</strong> which misses the Sept 1 deadline defined in your requirements (Source 2, p.12; Source 3, p.2).</span>
                         </li>
                       </ul>
                    </div>
                    <div className="flex justify-center mt-6">
                      <Button variant="ghost" onClick={() => setActivePseudoStep('upload')}>Start Over</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 5: // FEATURES & SAFETY
        return (
          <section id="features" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Citations & Audio</h2>
            <p className="text-lg text-slate-700 mb-8">
              Two "superpowers" that make NotebookLM unique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-t-4 border-t-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Inline Citations</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Every answer includes clickable numbers [1] [2]. 
                  Clicking them opens the exact PDF page and highlights the text the AI used.
                </p>
                <div className="bg-slate-100 px-3 py-2 rounded text-xs font-medium text-slate-600 inline-block">
                  No more guessing "Did the AI make this up?"
                </div>
              </Card>

              <Card className="p-6 border-t-4 border-t-pink-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-100 rounded-full text-pink-600">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Audio Overviews</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Turn your documents into an engaging "podcast." Two AI hosts discuss your material, summarize key points, and use analogies.
                </p>
                <div className="bg-slate-100 px-3 py-2 rounded text-xs font-medium text-slate-600 inline-block">
                  Perfect for listening to reports while commuting.
                </div>
              </Card>
            </div>

            <Callout variant="warning" title="Safety Check">
               <div className="flex items-start gap-3">
                 <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                 <div>
                   <strong className="block text-slate-900 mb-1">Check your Data Classification</strong>
                   <p className="text-sm text-slate-700">
                     Even though NotebookLM is private to your account, always check if your internal tool is approved for "Confidential" or "Restricted" data before uploading sensitive HR or financial documents.
                   </p>
                 </div>
               </div>
            </Callout>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="Your Documents (NotebookLM)"
      description="Turn piles of PDFs, decks, and notes into a private research space. Learn how to query your own files without relying on the public internet."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      onJumpTo={handleJumpTo}
      onBack={onBack}
      backLabel="Back to Workflow Playbook"
    >
      {/* Content Area */}
      <div className="min-h-[400px]">
        {renderStepContent()}
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