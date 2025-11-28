import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Button, Badge, Callout } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { Globe, Layers, PenTool, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2, Target, BookOpen, BrainCircuit, Hammer, Zap } from 'lucide-react';

// Import Deep Dive Modules
import ResearchPage from '../tool-research/page';
import DocumentsPage from '../tool-documents/page';
import BuilderPage from '../tool-builder/page';

type ActiveView = 'overview' | 'research' | 'documents' | 'builder';

export default function Page() {
  const { push } = useRouter();
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [currentStep, setCurrentStep] = useState(0);

  // Interactive Quiz State
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [selectedJobOptions, setSelectedJobOptions] = useState<Record<string, string>>({});

  // Steps array for navigation - REORDERED: Intro -> Categories -> Decision -> Deep Dives
  const stepIds = ['intro', 'categories', 'decision', 'deep-dives'];
  const totalSteps = stepIds.length;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    scrollToTop();
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    scrollToTop();
  };

  // If in a deep dive, render that component with a back button
  if (activeView === 'research') {
    return (
      <div className="animate-fade-in">
        <div className="bg-slate-50 border-b border-slate-200 p-4 sticky top-0 z-10">
           <div className="max-w-6xl mx-auto">
             <Button variant="ghost" onClick={() => setActiveView('overview')} className="text-slate-600 hover:text-blue-600 pl-0">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools Overview
             </Button>
           </div>
        </div>
        <ResearchPage />
      </div>
    );
  }

  if (activeView === 'documents') {
    return (
      <div className="animate-fade-in">
        <div className="bg-slate-50 border-b border-slate-200 p-4 sticky top-0 z-10">
           <div className="max-w-6xl mx-auto">
             <Button variant="ghost" onClick={() => setActiveView('overview')} className="text-slate-600 hover:text-purple-600 pl-0">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools Overview
             </Button>
           </div>
        </div>
        <DocumentsPage />
      </div>
    );
  }

  if (activeView === 'builder') {
    return (
      <div className="animate-fade-in">
         <div className="bg-slate-50 border-b border-slate-200 p-4 sticky top-0 z-10">
           <div className="max-w-6xl mx-auto">
             <Button variant="ghost" onClick={() => setActiveView('overview')} className="text-slate-600 hover:text-emerald-600 pl-0">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools Overview
             </Button>
           </div>
        </div>
        <BuilderPage />
      </div>
    );
  }

  // Quiz Data
  const jobs = [
    {
      id: 'job1',
      title: 'Job 1: I need words (emails, drafts, ideas)',
      description: 'e.g., "Write a polite decline," "Give me 5 taglines"',
      correctTool: 'chat',
      options: [
        { id: 'chat', label: 'Chat Assistant' },
        { id: 'research', label: 'Research Tool' },
        { id: 'docs', label: 'Your Docs' },
        { id: 'builder', label: 'Builder' },
      ],
      successMessage: 'Correct. For pure drafting and reasoning, standard chat is best.',
      successPrompt: '"Act as a polite Account Manager. Draft an email to [Client]..."',
      errorMessage: 'Not quite. Chat is fastest for open-ended writing.',
    },
    {
      id: 'job2',
      title: 'Job 2: I need facts (news, stats, market intel)',
      description: 'e.g., "What did Competitor X launch?" "Latest FDA regulations"',
      correctTool: 'research',
      options: [
        { id: 'chat', label: 'Chat Assistant' },
        { id: 'research', label: 'Research Tool' },
        { id: 'docs', label: 'Your Docs' },
        { id: 'builder', label: 'Builder' },
      ],
      successMessage: 'Correct. Research tools browse the live web and cite sources.',
      successPrompt: '"What are the latest regulatory changes for [Industry]...? Cite sources."',
      errorMessage: 'Careful. Standard chat has knowledge cutoffs. Use Research tools for fresh facts.',
    },
    {
      id: 'job3',
      title: 'Job 3: I need to understand my own files',
      description: 'e.g., "Summarize these 50 pages," "Compare these two contracts"',
      correctTool: 'docs',
      options: [
        { id: 'chat', label: 'Chat Assistant' },
        { id: 'research', label: 'Research Tool' },
        { id: 'docs', label: 'Your Docs' },
        { id: 'builder', label: 'Builder' },
      ],
      successMessage: 'Spot on. NotebookLM creates a private knowledge base for your files.',
      successPrompt: '"Based on these 5 PDFs, what are the top 3 risks? Cite page numbers."',
      errorMessage: 'Standard chat has context limits. Use "Your Docs" tools for large files.',
    },
    {
      id: 'job4',
      title: 'Job 4: I need a reusable mini-app',
      description: 'e.g., "I re-type this same complex prompt every week"',
      correctTool: 'builder',
      options: [
        { id: 'chat', label: 'Chat Assistant' },
        { id: 'research', label: 'Research Tool' },
        { id: 'docs', label: 'Your Docs' },
        { id: 'builder', label: 'Builder' },
      ],
      successMessage: 'Yes. If you do it 3+ times, freeze the prompt into a tool.',
      successPrompt: 'System Instruction: "You are an expert editor. Always rewrite input to be..."',
      errorMessage: 'Chat is fine for one-offs, but Builder ensures consistency.',
    },
  ];

  const handleQuizSelection = (jobId: string, optionId: string) => {
    setSelectedJobOptions(prev => ({ ...prev, [jobId]: optionId }));
  };

  // Step Contents
  const sectionContent = [
    // Step 1: INTRO
    {
      id: 'intro',
      node: (
        <section id="intro" className="mb-16 animate-fade-in">
          <h2>Stop using a hammer for everything</h2>
          <p className="text-lg text-slate-700 mb-8">
            You have a toolkit of specialized AI engines, and using the right one saves you hours of frustration. 
            Don't just open a generic chat window for every task.
          </p>

          <Card className="bg-slate-50 border-slate-200 p-8">
             <h3 className="font-bold text-slate-900 mb-4">Know your toolkit</h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <MessageSquare className="w-5 h-5 text-yellow-600 mt-1" />
                 <div>
                   <strong className="text-slate-900">Chat Assistants (Gemini, ChatGPT):</strong>
                   <p className="text-slate-600 text-sm">Best for drafting, brainstorming, and editing.</p>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <Globe className="w-5 h-5 text-blue-600 mt-1" />
                 <div>
                   <strong className="text-slate-900">Research Tools (Perplexity):</strong>
                   <p className="text-slate-600 text-sm">Best for facts, citations, and market intel.</p>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <Layers className="w-5 h-5 text-purple-600 mt-1" />
                 <div>
                   <strong className="text-slate-900">Your Docs (NotebookLM):</strong>
                   <p className="text-slate-600 text-sm">Best for summarizing and querying your own files.</p>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <PenTool className="w-5 h-5 text-emerald-600 mt-1" />
                 <div>
                   <strong className="text-slate-900">Builders (AI Studio):</strong>
                   <p className="text-slate-600 text-sm">Best for creating reusable workflows.</p>
                 </div>
               </li>
             </ul>
          </Card>
        </section>
      )
    },
    // Step 2: CATEGORIES (Moved up)
    {
      id: 'categories',
      node: (
        <section id="categories" className="mb-16 animate-fade-in">
          <h2>Your 4 Core Toolboxes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            
            <Card className="p-6 border-t-4 border-t-yellow-500">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
                <h3 className="font-bold text-lg text-slate-900">Chat Assistants</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Drafting, rephrasing, brainstorming.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Turn this blank page into a first draft."
              </p>
              <p className="text-sm text-slate-500 italic">
                 <strong>Watch out for:</strong> Hallucinations on facts.
              </p>
            </Card>

            <Card className="p-6 border-t-4 border-t-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg text-slate-900">Research Tools</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Facts, citations, news.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Write a report with 5 citations."
              </p>
              <p className="text-sm text-slate-500 italic">
                 <strong>Watch out for:</strong> Using it for simple creative writing.
              </p>
            </Card>

            <Card className="p-6 border-t-4 border-t-purple-500">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-lg text-slate-900">"Your Docs" Tools</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Summarizing your own files.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Turn these 50 PDFs into a briefing doc."
              </p>
              <p className="text-sm text-slate-500 italic">
                 <strong>Watch out for:</strong> Privacy (use internal tools).
              </p>
            </Card>

            <Card className="p-6 border-t-4 border-t-emerald-500">
              <div className="flex items-center gap-2 mb-3">
                <PenTool className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold text-lg text-slate-900">Builder Tools</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Reusable workflows.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Freeze this prompt into a button."
              </p>
              <p className="text-sm text-slate-500 italic">
                 <strong>Watch out for:</strong> Over-engineering simple tasks.
              </p>
            </Card>
          </div>
        </section>
      )
    },
    // Step 3: DECISION QUIZ (Moved down)
    {
      id: 'decision',
      node: (
        <section id="decision" className="mb-16 animate-fade-in">
          <h2>Routing Game: Pick the Right Tool</h2>
          <p className="mb-6">
             The most common mistake is using a chatbot when you needed a research engine. Let's practice.
          </p>

          <div className="space-y-4 not-prose">
            {jobs.map((job) => {
              const isExpanded = activeJobId === job.id;
              const selectedOption = selectedJobOptions[job.id];
              const isCorrect = selectedOption === job.correctTool;
              const isIncorrect = selectedOption && !isCorrect;

              return (
                <Card key={job.id} className={`transition-all ${isExpanded ? 'ring-2 ring-blue-100 shadow-md' : 'hover:bg-slate-50'}`}>
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setActiveJobId(isExpanded ? null : job.id)}
                  >
                    <div>
                      <h3 className={`font-bold ${isExpanded ? 'text-blue-700' : 'text-slate-900'}`}>{job.title}</h3>
                      <p className="text-sm text-slate-500">{job.description}</p>
                    </div>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-6 pt-2 border-t border-slate-100 animate-fade-in">
                      <p className="text-sm font-semibold text-slate-700 mb-3">Which tool category wins?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {job.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleQuizSelection(job.id, option.id)}
                            className={`
                              text-left px-4 py-3 rounded-lg text-sm font-medium border transition-all
                              ${selectedOption === option.id 
                                ? (option.id === job.correctTool ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800')
                                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'}
                            `}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>

                      {selectedOption && isCorrect && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                          <div className="flex gap-2 items-start mb-2">
                             <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                             <p className="text-sm text-green-900 font-bold">{job.successMessage}</p>
                          </div>
                          <div className="ml-7 mt-2">
                             <p className="text-xs font-bold text-slate-500 uppercase mb-1">Example Prompt:</p>
                             <div className="bg-white p-2 rounded border border-green-100 font-mono text-xs text-slate-600">
                               {job.successPrompt}
                             </div>
                          </div>
                        </div>
                      )}

                      {selectedOption && isIncorrect && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in flex gap-2 items-start">
                           <Target className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                           <p className="text-sm text-red-900">{job.errorMessage} Try again!</p>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )
    },
    // Step 4: DEEP DIVES
    {
      id: 'deep-dives',
      node: (
        <div className="animate-fade-in">
          <section id="deep-dives" className="mb-16">
            <h2>Ready to master a specific tool?</h2>
            <p className="mb-6">Click below to start an interactive deep dive.</p>
            
            <div className="space-y-4 not-prose">
              <Card 
                className="p-4 hover:border-blue-300 cursor-pointer group flex items-center justify-between"
                onClick={() => setActiveView('research')}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Research & Web Deep Dive</h3>
                    <p className="text-sm text-slate-500">How to get cited, factual answers from the web.</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
              </Card>

              <Card 
                className="p-4 hover:border-purple-300 cursor-pointer group flex items-center justify-between"
                onClick={() => setActiveView('documents')}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">"Your Docs" Deep Dive</h3>
                    <p className="text-sm text-slate-500">How to chat with internal files securely.</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500" />
              </Card>

              <Card 
                className="p-4 hover:border-emerald-300 cursor-pointer group flex items-center justify-between bg-slate-50"
                onClick={() => setActiveView('builder')}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">Builder's Lab</h3>
                      <Badge variant="neutral">Advanced</Badge>
                    </div>
                    <p className="text-sm text-slate-500">Create your own reusable AI assistants.</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
              </Card>
            </div>
          </section>

          {/* Resource Hook */}
          <section className="mb-12">
             <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <BookOpen className="w-5 h-5 text-slate-500" />
               <div className="flex-1 text-sm text-slate-600">
                 Want real-world walkthroughs of NotebookLM, Perplexity, Gemini, and AI Studio?
               </div>
               <Button variant="ghost" size="sm" onClick={() => push('/reference/resources')}>
                 Open Resource Library
               </Button>
            </div>
          </section>
        </div>
      )
    }
  ];

  // Updated Section Metadata with new order
  const sections = [
    { id: 'intro', title: 'The Toolkit' },
    { id: 'categories', title: 'Tool Categories' },
    { id: 'decision', title: 'Quick Decision Guide' },
    { id: 'deep-dives', title: 'Deep Dives' },
  ];

  return (
    <ModuleLayout
      title="AI Tools & Research"
      description="A quick tour of the AI toolbox. Don't use a hammer for everything."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNextStep}
      onPrev={handlePrevStep}
    >
      {/* ACTIVE STEP CONTENT */}
      <div className="min-h-[400px]">
        {sectionContent[currentStep].node}
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 not-prose">
        <Button 
          variant="outline" 
          onClick={handlePrevStep} 
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button onClick={handleNextStep} className="gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={() => push('/modules')} variant="outline" className="gap-2">
            Finish module <CheckCircle2 className="w-4 h-4" />
          </Button>
        )}
      </div>

    </ModuleLayout>
  );
}