import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Button, Badge, Callout } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { Globe, Layers, PenTool, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2, Search, FileText, Zap, BrainCircuit, Hammer, Target, BookOpen } from 'lucide-react';

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

  // Steps array for navigation
  const stepIds = ['intro', 'decision', 'categories', 'deep-dives'];
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

  // Quiz Data - Updated mental models and examples
  const jobs = [
    {
      id: 'job1',
      title: 'Job 1: I need words (emails, drafts, ideas)',
      description: 'e.g., "Write a polite decline," "Give me 5 taglines," "Fix this grammar"',
      correctTool: 'chat',
      options: [
        { id: 'chat', label: 'Chat Assistants (Gemini / ChatGPT / Claude)' },
        { id: 'research', label: 'Research Tools (Perplexity / Deep Research)' },
        { id: 'docs', label: 'Your Docs (NotebookLM / Notion AI)' },
        { id: 'builder', label: 'Builders (AI Studio)' },
      ],
      successMessage: 'Exactly. For pure drafting and reasoning, standard chat is your best friend.',
      successPrompt: '"Act as a polite Account Manager. Draft an email to [Client] explaining the delay due to [Reason]."',
      errorMessage: 'Not quite. While other tools can generate text, a standard Chat Assistant is fastest and most flexible for open-ended writing.',
    },
    {
      id: 'job2',
      title: 'Job 2: I need facts (news, stats, market intel)',
      description: 'e.g., "What did Competitor X launch?" "Latest FDA regulations"',
      correctTool: 'research',
      options: [
        { id: 'chat', label: 'Chat Assistants (Gemini / ChatGPT / Claude)' },
        { id: 'research', label: 'Research Tools (Perplexity / Deep Research)' },
        { id: 'docs', label: 'Your Docs (NotebookLM / Notion AI)' },
        { id: 'builder', label: 'Builders (AI Studio)' },
      ],
      successMessage: 'Correct. Research tools browse the live web and cite their sources.',
      successPrompt: '"What are the latest regulatory changes for [Industry] in [Region] from the last 6 months? Cite sources."',
      errorMessage: 'Be careful! Standard chat models have a knowledge cutoff date. Research tools are safer for up-to-the-minute facts.',
      mentalModel: 'Tip: Use "Deep Research" or "Reasoning" modes for high-stakes reports. It takes longer but checks its work.',
    },
    {
      id: 'job3',
      title: 'Job 3: I need to understand my own files',
      description: 'e.g., "Summarize these 50 pages," "Compare these two vendor contracts"',
      correctTool: 'docs',
      options: [
        { id: 'chat', label: 'Chat Assistants (Gemini / ChatGPT / Claude)' },
        { id: 'research', label: 'Research Tools (Perplexity / Deep Research)' },
        { id: 'docs', label: 'Your Docs (NotebookLM / Notion AI)' },
        { id: 'builder', label: 'Builders (AI Studio)' },
      ],
      successMessage: 'Spot on. Tools like NotebookLM create a private knowledge base just for your uploaded files.',
      successPrompt: '"Based on these 5 PDFs, what are the top 3 risks mentioned? Cite the page numbers."',
      errorMessage: 'Standard chat windows have context limits. "Your Docs" tools are built to handle large libraries of information.',
    },
    {
      id: 'job4',
      title: 'Job 4: I need a reusable mini-app',
      description: 'e.g., "I re-type this same complex prompt every week"',
      correctTool: 'builder',
      options: [
        { id: 'chat', label: 'Chat Assistants (Gemini / ChatGPT / Claude)' },
        { id: 'research', label: 'Research Tools (Perplexity / Deep Research)' },
        { id: 'docs', label: 'Your Docs (NotebookLM / Notion AI)' },
        { id: 'builder', label: 'Builders (AI Studio)' },
      ],
      successMessage: 'Yes. If you do it more than 3 times, build a tool. Freeze the prompt into a reliable button.',
      successPrompt: 'System Instruction: "You are an expert editor. Always rewrite input to be concise and professional."',
      errorMessage: 'Chat is great for one-offs, but for repeatable tasks, a Builder tool ensures consistency.',
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
          <p>
            Most people just open a generic chat window and hope for magic. But using a text generator to do deep web research is like trying to build a house with only a hammer.
          </p>
          <p>
            You actually have a <strong>toolkit</strong>. The trick is knowing which tool to grab.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
            <li><strong>Organizing your own material</strong> (docs, PDFs, decks)</li>
            <li><strong>Helping with drafting</strong> (emails, briefs, slides)</li>
            <li><strong>Doing grounded web research</strong> (facts with citations)</li>
            <li><strong>Building reusable workflows</strong> (mini-apps, assistants)</li>
          </ul>
          <p className="mb-8">
             This module is your map. The deep dives show you how to actually drive each tool.
          </p>

          {/* LOGO PALETTE CARD */}
          <Card className="bg-slate-50 border-slate-200 p-6 mb-8">
             <h3 className="text-lg font-bold text-slate-900 mb-4">Your Tool Palette</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                   <div className="text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Chat & Drafting</div>
                   <div className="flex flex-wrap gap-2">
                      <Badge variant="neutral">Gemini</Badge>
                      <Badge variant="neutral">ChatGPT</Badge>
                      <Badge variant="neutral">Claude</Badge>
                   </div>
                </div>
                <div>
                   <div className="text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Research & Web</div>
                   <div className="flex flex-wrap gap-2">
                      <Badge variant="neutral">Perplexity</Badge>
                      <Badge variant="neutral">Deep Research</Badge>
                   </div>
                </div>
                <div>
                   <div className="text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Your Docs</div>
                   <div className="flex flex-wrap gap-2">
                      <Badge variant="neutral">NotebookLM</Badge>
                      <Badge variant="neutral">Notion AI</Badge>
                   </div>
                </div>
                <div>
                   <div className="text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Builders</div>
                   <div className="flex flex-wrap gap-2">
                      <Badge variant="neutral">AI Studio</Badge>
                      <Badge variant="neutral">Gems / GPTs</Badge>
                   </div>
                </div>
             </div>
          </Card>

          {/* JUMP PANEL */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="text-lg font-bold text-slate-900 m-0">Already know the basics? Jump straight to a deep dive.</h3>
             </div>
             <p className="text-sm text-slate-600 mb-6 max-w-3xl">
                If you have a specific task right now, skip the tour and go to the lab.
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
                <Card 
                   className="p-4 hover:border-blue-400 cursor-pointer group flex flex-col h-full bg-slate-50"
                   onClick={() => setActiveView('research')}
                >
                   <div className="flex items-center gap-2 font-bold text-blue-700 mb-2">
                      <Globe className="w-4 h-4" /> Research & Web
                   </div>
                   <p className="text-xs text-slate-500 mb-2 font-semibold">For: Strategy, product, competitive intel.</p>
                   <p className="text-xs text-slate-600 leading-relaxed flex-1 mb-3">
                      Get cited, factual answers from the live web.
                   </p>
                   <div className="flex gap-1 flex-wrap mb-3">
                     <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">Perplexity</span>
                     <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">Deep Research</span>
                   </div>
                   <div className="mt-auto flex items-center text-xs font-bold text-blue-600 group-hover:underline">
                      Start Deep Dive <ArrowRight className="w-3 h-3 ml-1" />
                   </div>
                </Card>

                <Card 
                   className="p-4 hover:border-purple-400 cursor-pointer group flex flex-col h-full bg-slate-50"
                   onClick={() => setActiveView('documents')}
                >
                   <div className="flex items-center gap-2 font-bold text-purple-700 mb-2">
                      <Layers className="w-4 h-4" /> Your Docs
                   </div>
                   <p className="text-xs text-slate-500 mb-2 font-semibold">For: Drowning in PDFs, decks, notes.</p>
                   <p className="text-xs text-slate-600 leading-relaxed flex-1 mb-3">
                      Turn files into a private research room.
                   </p>
                   <div className="flex gap-1 flex-wrap mb-3">
                     <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">NotebookLM</span>
                     <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">Notion AI</span>
                   </div>
                   <div className="mt-auto flex items-center text-xs font-bold text-purple-600 group-hover:underline">
                      Start Deep Dive <ArrowRight className="w-3 h-3 ml-1" />
                   </div>
                </Card>

                <Card 
                   className="p-4 hover:border-emerald-400 cursor-pointer group flex flex-col h-full bg-slate-50"
                   onClick={() => setActiveView('builder')}
                >
                   <div className="flex items-center gap-2 font-bold text-emerald-700 mb-2">
                      <PenTool className="w-4 h-4" /> Builder's Lab
                      <Badge variant="neutral" className="ml-auto text-[10px] py-0 px-1.5 h-5">Adv</Badge>
                   </div>
                   <p className="text-xs text-slate-500 mb-2 font-semibold">For: Power users & automation.</p>
                   <p className="text-xs text-slate-600 leading-relaxed flex-1 mb-3">
                      Turn prompts into reusable workflows.
                   </p>
                   <div className="flex gap-1 flex-wrap mb-3">
                     <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded">AI Studio</span>
                     <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded">Gems</span>
                   </div>
                   <div className="mt-auto flex items-center text-xs font-bold text-emerald-600 group-hover:underline">
                      Start Deep Dive <ArrowRight className="w-3 h-3 ml-1" />
                   </div>
                </Card>
             </div>
          </div>
        </section>
      )
    },
    // Step 2: INTERACTIVE QUIZ
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
                          {job.mentalModel && (
                            <p className="text-xs text-slate-600 mb-3 ml-7">
                              <strong>Note:</strong> {job.mentalModel}
                            </p>
                          )}
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
    // Step 3: CATEGORIES
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
              <div className="flex gap-2 mb-4">
                 <Badge variant="neutral" className="text-[10px]">Gemini</Badge>
                 <Badge variant="neutral" className="text-[10px]">ChatGPT</Badge>
                 <Badge variant="neutral" className="text-[10px]">Claude</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Drafting, rephrasing, brainstorming, and explaining concepts.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Turn this blank page into a first draft."
              </p>
              <p className="text-sm text-slate-500 mb-4 italic">
                 <strong>Watch out for:</strong> Hallucinations (making up facts). Always check their work.
              </p>
              <Button variant="ghost" size="sm" className="w-full text-slate-500 text-xs" onClick={() => push('/reference/resources')}>
                 <BookOpen className="w-3 h-3 mr-2"/> View Resource Library
              </Button>
            </Card>

            <Card className="p-6 border-t-4 border-t-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg text-slate-900">Research Tools</h3>
              </div>
              <div className="flex gap-2 mb-4">
                 <Badge variant="neutral" className="text-[10px]">Perplexity</Badge>
                 <Badge variant="neutral" className="text-[10px]">Deep Research</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Finding facts, citations, market intelligence, and news.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Write a report on [Topic] with 5 citations."
              </p>
              <p className="text-sm text-slate-500 mb-4 italic">
                 <strong>Watch out for:</strong> Overkill on simple questions. Use chat for simple stuff.
              </p>
              <Button variant="ghost" size="sm" className="w-full text-slate-500 text-xs" onClick={() => push('/reference/resources')}>
                 <BookOpen className="w-3 h-3 mr-2"/> View Resource Library
              </Button>
            </Card>

            <Card className="p-6 border-t-4 border-t-purple-500">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-lg text-slate-900">"Your Docs" Tools</h3>
              </div>
              <div className="flex gap-2 mb-4">
                 <Badge variant="neutral" className="text-[10px]">NotebookLM</Badge>
                 <Badge variant="neutral" className="text-[10px]">Notion AI</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Summarizing, comparing, and querying your own files.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Turn these 50 PDFs into a briefing doc."
              </p>
              <p className="text-sm text-slate-500 mb-4 italic">
                 <strong>Watch out for:</strong> Privacy settings. Ensure the tool is approved for internal data.
              </p>
              <Button variant="ghost" size="sm" className="w-full text-slate-500 text-xs" onClick={() => push('/reference/resources')}>
                 <BookOpen className="w-3 h-3 mr-2"/> View Resource Library
              </Button>
            </Card>

            <Card className="p-6 border-t-4 border-t-emerald-500">
              <div className="flex items-center gap-2 mb-3">
                <PenTool className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold text-lg text-slate-900">Builder Tools</h3>
              </div>
              <div className="flex gap-2 mb-4">
                 <Badge variant="neutral" className="text-[10px]">AI Studio</Badge>
                 <Badge variant="neutral" className="text-[10px]">Gems / GPTs</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Best for:</strong> Prototyping reusable workflows and mini-apps.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                 <strong>Signature move:</strong> "Freeze this great prompt into a button for the team."
              </p>
              <p className="text-sm text-slate-500 mb-4 italic">
                 <strong>Watch out for:</strong> Complexity. Don't build a tool if a simple chat will do.
              </p>
              <Button variant="ghost" size="sm" className="w-full text-slate-500 text-xs" onClick={() => push('/reference/resources')}>
                 <BookOpen className="w-3 h-3 mr-2"/> View Resource Library
              </Button>
            </Card>
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

          {/* Advanced Callout */}
          <section className="mb-12">
             <Callout variant="info" title="What about Agents & Automation?">
                <p className="mt-1">
                   Building multi-step autonomous agents (e.g., "Read email → extract data → update spreadsheet") is a next-level skill. 
                   We cover this in the separate <strong>Advanced Workflows</strong> module. Master these core tools first!
                </p>
             </Callout>
          </section>
        </div>
      )
    }
  ];

  const sections = [
    { id: 'intro', title: 'The Right Tool for the Job' },
    { id: 'decision', title: 'Quick Decision Guide' },
    { id: 'categories', title: 'Tool Categories' },
    { id: 'deep-dives', title: 'Deep Dives' },
  ];

  return (
    <ModuleLayout
      title="AI Tools & Research"
      description="A quick tour of the AI toolbox: chat assistants, research engines, your-docs tools, and builders."
      duration="10 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules/tool-research"
    >
      {/* Progress Bar */}
      <div className="mb-8 not-prose">
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