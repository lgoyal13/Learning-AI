import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button } from '../../../components/ui';
import { FileText, Layers, CheckCircle2, Database, ArrowLeft, ArrowRight, Lightbulb, Search, AlertTriangle, MessageSquare, Upload, BookOpen, ShieldAlert, Clock } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'why-doc-tools', title: 'Why "Your Docs" Tools Exist' },
    { id: 'notebooklm-basics', title: 'NotebookLM in Plain Language' },
    { id: 'notebooklm-scenario', title: 'Scenario: Competitive Pricing Pack' },
    { id: 'first-tasks', title: 'Great First Tasks to Try' },
    { id: 'habits-and-safety', title: 'Habits That Keep You Effective' },
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
            <h2>The "Messy Desk" Problem</h2>
            <p className="text-lg text-slate-700">
              The internet is great, but your actual work lives in a specific pile of PDFs, slide decks, and meeting notes. 
              Search tools can't see your internal files, and generic chat doesn't know about your Q3 strategy.
            </p>
            <p className="text-slate-600">
              Tools like <strong>NotebookLM</strong>, <strong>Notion AI</strong>, and <strong>Gemini in Workspace</strong> are designed for exactly this: 
              reading your specific pile of documents and helping you make sense of it.
            </p>

            <div className="my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">What you can do here</h3>
              <p className="text-slate-600 mb-4">
                Instead of reading 200 pages yourself, you upload the files and start asking questions.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <h4 className="font-bold text-slate-900 mb-3">Imagine asking:</h4>
                 <ul className="space-y-3 text-sm text-slate-700">
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                     <span>"Based on these 5 PDFs, what are the top 3 risks mentioned?"</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                     <span>"Turn this 40-page policy document into a 1-page FAQ for new hires."</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                     <span>"Compare the pricing models in these three competitor decks."</span>
                   </li>
                 </ul>
              </div>
            </div>
          </section>
        );
      case 1:
        return (
          <section id="notebooklm-basics" className="mb-12 animate-fade-in">
            <h2>Your Private Reading Room</h2>
            <p className="mb-6">
              When you use a tool like NotebookLM, you create a "Notebook." Think of it as a clean desk where you drop only the files relevant to one project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
              <Card className="p-6 border-t-4 border-t-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900">1. Ingest</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Upload PDFs, Google Docs, Slides, or paste text. This creates the "brain" for this specific project.
                </p>
              </Card>

              <Card className="p-6 border-t-4 border-t-purple-500">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-slate-900">2. Ground</h3>
                </div>
                <p className="text-sm text-slate-600">
                  The AI answers <strong>only</strong> using the files you uploaded. It cites its sources (e.g., "Source 1, Page 4").
                </p>
              </Card>

              <Card className="p-6 border-t-4 border-t-emerald-500">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900">3. Chat</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Ask questions across all documents at once. <br/>
                  <em>"What do these docs say about timelines?"</em>
                </p>
              </Card>

              <Card className="p-6 border-t-4 border-t-amber-500">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900">4. Create</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Generate study guides, timelines, briefing docs, or even an audio podcast overview.
                </p>
              </Card>
            </div>
          </section>
        );
      case 2:
        return (
          <section id="notebooklm-scenario" className="mb-12 animate-fade-in">
            <h2>Walkthrough: The Competitor Pricing Analysis</h2>
            <p className="mb-6">
              You have three PDF brochures from competitors. You need to know how your pricing compares, but you don't have 2 hours to read them all.
            </p>

            <Card className="p-6 bg-white border-slate-200">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Create the Notebook</h4>
                    <p className="text-sm text-slate-600">Upload the 3 competitor PDFs. Name the notebook "Q3 Pricing Intel."</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900">The "Comparison" Prompt</h4>
                    <div className="mt-2 bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm text-slate-700">
                      "Compare the pricing strategies of Company A, B, and C in a bulleted list. Then create a table comparing their Enterprise Tiers specifically."
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Refine & Verify</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Click the citation numbers to check the prices. If you need more detail:
                    </p>
                    <div className="bg-slate-50 p-2 rounded border border-slate-200 font-mono text-xs text-slate-600">
                      "Does any document mention volume discounts? If so, list the terms."
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Output</h4>
                    <p className="text-sm text-slate-600 mb-2">Copy the table directly into your slide deck or email.</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        );
      case 3:
        return (
          <section id="first-tasks" className="mb-12 animate-fade-in">
            <h2>Five things to try this week</h2>
            <p className="mb-8 text-lg text-slate-700">
              Pick one of these and try it on real work files. It takes 5 minutes.
            </p>

            <div className="space-y-4 mb-8">
              <Card className="p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-3">
                   <FileText className="w-5 h-5 text-purple-500 mt-1" />
                   <div>
                     <strong className="block text-slate-900">Training Handbook</strong>
                     <p className="text-sm text-slate-600">
                       "Create a 1-page cheat sheet for new hires based on this 50-page manual."
                     </p>
                   </div>
                </div>
              </Card>

              <Card className="p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-3">
                   <Search className="w-5 h-5 text-blue-500 mt-1" />
                   <div>
                     <strong className="block text-slate-900">Research & Whitepapers</strong>
                     <p className="text-sm text-slate-600">
                       "Summarize the key trends from these 4 industry reports. List any contradictions between them."
                     </p>
                   </div>
                </div>
              </Card>

              <Card className="p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-3">
                   <Database className="w-5 h-5 text-emerald-500 mt-1" />
                   <div>
                     <strong className="block text-slate-900">Quarterly Reports (QBRs)</strong>
                     <p className="text-sm text-slate-600">
                       "Pull out the top 5 risks mentioned across all these department updates."
                     </p>
                   </div>
                </div>
              </Card>

              <Card className="p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-3">
                   <ShieldAlert className="w-5 h-5 text-amber-500 mt-1" />
                   <div>
                     <strong className="block text-slate-900">Compliance Policy</strong>
                     <p className="text-sm text-slate-600">
                       "Explain the travel expense policy in plain language. Can I expense a client lunch over $50?"
                     </p>
                   </div>
                </div>
              </Card>

              <Card className="p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-3">
                   <Clock className="w-5 h-5 text-indigo-500 mt-1" />
                   <div>
                     <strong className="block text-slate-900">Project Transcripts</strong>
                     <p className="text-sm text-slate-600">
                       "Based on these meeting notes, create a timeline of decisions and a list of open action items."
                     </p>
                   </div>
                </div>
              </Card>
            </div>

            <Callout variant="info" title="Pro Tip">
              If the answer feels generic, make sure you explicitly reference the files: "Based <strong>only</strong> on these documents..."
            </Callout>
          </section>
        );
      case 4:
        return (
          <section id="habits-and-safety" className="mb-12 animate-fade-in">
            <h2>Good habits make this a superpower</h2>
            <p className="mb-8">
              Document tools are powerful, but they are only as good as the files you feed them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Best Practices</h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <strong>Keep notebooks focused</strong>
                      <p className="text-slate-500">One project, one notebook. Don't dump everything into one giant bucket.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <strong>Name things clearly</strong>
                      <p className="text-slate-500">"Q3 Pricing Intel" is easier to find later than "Untitled Notebook 4".</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <strong>Ask for citations</strong>
                      <p className="text-slate-500">Always ask the model to point to the page number so you can verify.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <strong>Use it to teach back</strong>
                      <p className="text-slate-500">Generate a quiz for yourself to make sure you actually understood the reading.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <AlertTriangle className="w-5 h-5 text-amber-500" /> Troubleshooting
                 </h3>
                 <ul className="space-y-3 text-sm text-slate-700">
                   <li className="flex gap-2 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>If an answer looks wrong, click the citation. Read the source text.</span>
                   </li>
                   <li className="flex gap-2 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>If the model says "I don't know," it might be because the answer isn't in your files. That's a good thing—it means it's not hallucinating.</span>
                   </li>
                 </ul>
              </div>
            </div>

            {/* Resource Hook */}
            <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <BookOpen className="w-5 h-5 text-slate-500" />
               <div className="flex-1 text-sm text-slate-600">
                 Want real-world walkthroughs of NotebookLM?
               </div>
               <Button variant="ghost" size="sm" onClick={() => push('/reference/resources')}>
                 Open Resource Library
               </Button>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="Your Documents: AI as a Research Assistant"
      description="Turn piles of PDFs, decks, and notes into instant understanding. Learn how to query your own files securely."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules/tool-builder"
    >
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${Math.round(((currentStep + 1) / totalSteps) * 100)}%` }}
          ></div>
        </div>
      </div>

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