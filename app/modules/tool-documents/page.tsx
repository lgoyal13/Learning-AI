import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button, PromptCard } from '../../../components/ui';
import { FileText, Layers, CheckCircle2, Database, ArrowLeft, ArrowRight, Lightbulb, Search, MessageSquare, Upload, BookOpen, Clock, Play, Target, ShieldAlert } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // State for Step 4 Interactive Flow
  const [activePseudoStep, setActivePseudoStep] = useState<'upload' | 'ask' | 'view'>('upload');

  const sections = [
    { id: 'why-doc-tools', title: 'What "Your Docs" Tools Are For' },
    { id: 'notebooklm-basics', title: 'From Pile of Docs to Research Space' },
    { id: 'scenario', title: 'Scenario: Comparing Two Vendors' },
    { id: 'interactive-flow', title: 'Try the Flow in Your Head' },
    { id: 'habits-safety', title: 'Habits That Keep You Effective' },
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <section id="why-doc-tools" className="mb-12 animate-fade-in">
            <h2>What "Your Docs" tools are for</h2>
            <p className="text-lg text-slate-700">
              The internet is great, but your actual work lives in a specific pile of PDFs, slide decks, and meeting notes. 
              Search tools can't see your internal files, and generic chat doesn't know about your Q3 strategy.
            </p>
            <p className="text-slate-600">
              Tools like <strong>NotebookLM</strong>, <strong>Notion AI</strong>, and <strong>Gemini in Workspace</strong> are designed for exactly this: 
              reading your specific pile of documents and helping you make sense of it.
            </p>

            <div className="my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Best Use Cases for Daily Work</h3>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <ul className="space-y-4 text-sm text-slate-700">
                   <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                     <div>
                        <strong>Onboarding to a new project</strong>
                        <p className="text-slate-600">"Read the last 4 decks and give me the real story on the timeline delays."</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                     <div>
                        <strong>Turning research packs into notes</strong>
                        <p className="text-slate-600">"Summarize these 10 industry reports into a one-page briefing doc."</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                     <div>
                        <strong>Comparing similar documents</strong>
                        <p className="text-slate-600">"Compare the indemnity clauses in these three vendor proposals."</p>
                     </div>
                   </li>
                 </ul>
              </div>
              
              <Callout variant="info" className="mt-6" title="Grounded Answers">
                These tools use <strong>only</strong> what you upload or connect. They are ideal when you need facts backed by specific pages in your files.
              </Callout>
            </div>
          </section>
        );
      case 1:
        return (
          <section id="notebooklm-basics" className="mb-12 animate-fade-in">
            <h2>From pile of docs to research space</h2>
            <p className="mb-8">
              When you use a tool like NotebookLM, you create a dedicated workspace for one project. Think of it as a clean desk where you drop only the relevant files.
            </p>

            <div className="space-y-4 not-prose">
              <Card className="p-4 flex items-center gap-4 border-l-4 border-l-blue-500">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-slate-900">Create a notebook</h3>
                  <p className="text-sm text-slate-600">Start fresh for each project (e.g., "Q3 Vendor Review").</p>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-4 border-l-4 border-l-purple-500">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-slate-900">Add sources</h3>
                  <p className="text-sm text-slate-600">Upload PDFs, Google Docs, Slides, or pasted text. This becomes the AI's "brain."</p>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-4 border-l-4 border-l-emerald-500">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-slate-900">Ask structured questions</h3>
                  <p className="text-sm text-slate-600">Query across all documents at once ("What do these docs say about pricing?").</p>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-4 border-l-4 border-l-amber-500">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-slate-900">Save useful outputs</h3>
                  <p className="text-sm text-slate-600">Pin key citations, generate a study guide, or export a summary table.</p>
                </div>
              </Card>
            </div>
            
            <p className="mt-8 text-sm text-slate-600 italic">
              Example: Perfect for onboarding to a new partner program or reviewing a batch of policy PDFs.
            </p>
          </section>
        );
      case 2:
        return (
          <section id="scenario" className="mb-12 animate-fade-in">
            <h2>Scenario: Comparing two vendors</h2>
            <p className="mb-6">
              You have pricing PDFs from "Vendor A" and "Vendor B." You need to know how they compare on cost, support, and terms, but you don't have time to read 40 pages of fluff.
            </p>

            <Card className="p-6 bg-slate-50 border-slate-200 mb-8">
               <div className="flex gap-8 items-start">
                 <div className="flex-1">
                   <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                     <Upload className="w-4 h-4 text-slate-500" /> Input
                   </h3>
                   <div className="flex gap-2 text-sm text-slate-600">
                      <span className="bg-white px-2 py-1 border rounded flex items-center gap-1"><FileText className="w-3 h-3"/> Vendor_A_Pricing.pdf</span>
                      <span className="bg-white px-2 py-1 border rounded flex items-center gap-1"><FileText className="w-3 h-3"/> Vendor_B_Proposal.pdf</span>
                   </div>
                 </div>
                 
                 <div className="flex-1">
                   <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                     <Target className="w-4 h-4 text-slate-500" /> Task
                   </h3>
                   <p className="text-sm text-slate-600">Extract key terms across 3 criteria: price, support, and contract length.</p>
                 </div>
               </div>
            </Card>

            <PromptCard 
              label="Comparison Prompt"
              prompt={`You have access to the pricing PDFs for Vendor A and Vendor B that I added to this notebook.

Create a comparison across these criteria:
- Total cost for a 3-year contract
- Implementation timeline
- Ongoing support model

Present the answer as a table with one row per vendor, and add a short "One-line summary" column.`}
            />
            
            <div className="mt-6 flex items-start gap-3 bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
               <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
               <div>
                 <strong>How to iterate:</strong>
                 <p className="mt-1">
                   "Add a column for 'Risks' based on the fine print." <br/>
                   "Which vendor offers 24/7 support included in the base price?"
                 </p>
               </div>
            </div>
          </section>
        );
      case 3:
        return (
          <section id="interactive-flow" className="mb-12 animate-fade-in">
            <h2>Try the flow in your head</h2>
            <p className="mb-6">
              Click through the steps below to see how a "Your Docs" workflow feels in practice.
            </p>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50">
                <button 
                  onClick={() => setActivePseudoStep('upload')}
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activePseudoStep === 'upload' ? 'bg-white text-blue-600 border-t-2 border-t-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Upload className="w-4 h-4" /> 1. Upload
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
                  <BookOpen className="w-4 h-4" /> 3. View Output
                </button>
              </div>

              {/* Content Area */}
              <div className="p-8 min-h-[300px] flex flex-col justify-center">
                {activePseudoStep === 'upload' && (
                  <div className="animate-fade-in text-center">
                    <h3 className="font-bold text-slate-900 mb-4">Add your sources</h3>
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-slate-700">Vendor_A_Proposal.pdf</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-slate-700">Vendor_B_Proposal.pdf</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <Layers className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-slate-700">Q3_Requirements_Deck.pptx</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                    </div>
                    <Button className="mt-6" onClick={() => setActivePseudoStep('ask')}>
                      Next: Ask Questions
                    </Button>
                  </div>
                )}

                {activePseudoStep === 'ask' && (
                  <div className="animate-fade-in">
                    <h3 className="font-bold text-slate-900 mb-4 text-center">Query your notebook</h3>
                    <div className="max-w-lg mx-auto">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                        <p className="text-sm font-mono text-slate-700">
                          "Summarize the top 5 risks across these files and link them to impacted teams. Flag any cost overruns."
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button onClick={() => setActivePseudoStep('view')} variant="secondary">
                           <Play className="w-4 h-4 mr-2 fill-current" /> Run Prompt
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activePseudoStep === 'view' && (
                  <div className="animate-fade-in">
                    <h3 className="font-bold text-slate-900 mb-4 text-center">The AI Study Guide</h3>
                    <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 p-6 rounded-lg shadow-sm">
                       <h4 className="font-bold text-slate-800 text-sm uppercase mb-3 border-b border-slate-200 pb-2">Key Risks Identified</h4>
                       <ul className="space-y-3 text-sm text-slate-700">
                         <li className="flex gap-2">
                           <span className="text-red-500 font-bold">•</span>
                           <span><strong>Implementation Delay:</strong> Vendor B timeline exceeds Q3 deadline (Source 2, p.4).</span>
                         </li>
                         <li className="flex gap-2">
                           <span className="text-red-500 font-bold">•</span>
                           <span><strong>Hidden Costs:</strong> Vendor A charges extra for 24/7 support (Source 1, p.12).</span>
                         </li>
                         <li className="flex gap-2">
                           <span className="text-red-500 font-bold">•</span>
                           <span><strong>Compliance:</strong> Both vendors require a security audit exception (Source 3).</span>
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
      case 4:
        return (
          <section id="habits-safety" className="mb-12 animate-fade-in">
            <h2>Habits that keep you effective</h2>
            <p className="mb-6">
              Document tools are powerful, but they require discipline to keep organized.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-t-4 border-t-green-500">
                <h3 className="font-bold text-slate-900 mb-3">Organization Habits</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <strong>One project, one notebook:</strong> Don't dump unrelated files into a giant bucket.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <strong>Clear naming:</strong> "Q3 Pricing Intel" is easier to find than "Untitled Notebook 4."
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-t-4 border-t-amber-500">
                <h3 className="font-bold text-slate-900 mb-3">Safety Habits</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5" />
                    <strong>Check Citations:</strong> Always verify the page number before putting a fact in a deck.
                  </li>
                  <li className="flex gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5" />
                    <strong>Respect Policy:</strong> Ensure the tool is approved for the classification level of your docs (Internal vs Confidential).
                  </li>
                </ul>
              </Card>
            </div>

            <Callout variant="info" title="Want more recipes?" className="flex items-center justify-between">
               <span>See advanced templates for NotebookLM in the library.</span>
               <Button size="sm" variant="ghost" onClick={() => push('/reference/resources')}>
                  Open Library <ArrowRight className="w-4 h-4 ml-1" />
               </Button>
            </Callout>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="Your Documents: NotebookLM and Friends"
      description="Turn piles of PDFs, decks, and notes into a private research space. Learn how NotebookLM and similar tools help you read, compare, and summarize your own material."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
    >
      {/* Current Section Content */}
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