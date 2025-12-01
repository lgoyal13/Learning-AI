import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button, Badge } from '../../../components/ui';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Target, Repeat, GitBranch, 
  Lightbulb, Zap, User, FileText, Layers, MessageSquare, Wrench, 
  ListChecks, BookOpen, AlertTriangle, RefreshCw, Edit3, Check, X,
  Play, Send, MessageCircle, Bot, Copy, ChevronDown, ChevronUp, XCircle
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // State for Iteration Simulation
  const [demoStep, setDemoStep] = useState(0);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  const sections = [
    { id: 'pattern-recap', title: 'The PCTR Pattern' },
    { id: 'delegating', title: 'Talk Like You Are Delegating' },
    { id: 'iteration-loop', title: 'Make Iteration Your Default' },
    { id: 'repair', title: 'Fixing Errors' },
    { id: 'strategies', title: 'Core Techniques' },
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

  // Data for Iteration Simulation
  const simulationSteps = [
    { type: 'user', content: "Write an email inviting my team to a meeting next Friday." },
    { type: 'ai', content: "Subject: Meeting Invitation\n\nDear Team,\n\nI hope this email finds you well. I am writing to invite you to a mandatory meeting scheduled for next Friday. We will discuss important matters regarding the project. Your attendance is required.\n\nSincerely,\n[Name]" },
    { type: 'user', content: "Make it shorter and friendlier. Add agenda: project update, budget, next steps." },
    { type: 'ai', content: "Subject: Team Sync Next Friday! 📅\n\nHi everyone,\n\nLet's meet next Friday to catch up! We'll cover:\n• Project Update\n• Budget\n• Next Steps\n\nSee you there!" },
    { type: 'user', content: "Change Friday to this Friday at 2pm." },
    { type: 'ai', content: "Subject: Team Sync This Friday @ 2pm! 📅\n\nHi everyone,\n\nLet's meet this Friday at 2pm to catch up! We'll cover:\n• Project Update\n• Budget\n• Next Steps\n\nSee you there!" }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // The PCTR Pattern in Action
        return (
          <section id="pattern-recap" className="mb-12 animate-fade-in">
            <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
               <h3 className="font-bold text-blue-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                 After this module you will be able to:
               </h3>
               <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                   <div className="mt-0.5 bg-white rounded-full p-0.5 shadow-sm text-blue-600"><CheckCircle2 className="w-4 h-4" /></div>
                   <span className="text-blue-900 text-sm font-medium">Use Persona, Context, Task, and Requirements to frame almost any prompt.</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-0.5 bg-white rounded-full p-0.5 shadow-sm text-blue-600"><CheckCircle2 className="w-4 h-4" /></div>
                   <span className="text-blue-900 text-sm font-medium">Iterate on drafts with clear feedback instead of starting from scratch.</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-0.5 bg-white rounded-full p-0.5 shadow-sm text-blue-600"><CheckCircle2 className="w-4 h-4" /></div>
                   <span className="text-blue-900 text-sm font-medium">Choose between zero shot, few shot, and step by step prompting for different tasks.</span>
                 </li>
               </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">The PCTR Pattern</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              A good prompt answers the model's questions before it has to ask. Use this structure to make your request clear from the start.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
               <Card className="p-5 border-l-4 border-l-blue-500 bg-white shadow-sm">
                 <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                   <User className="w-5 h-5 text-blue-500" /> Persona
                 </div>
                 <p className="text-sm text-slate-600">Tell the model who it is, for example a risk analyst, product marketer, or data coach.</p>
               </Card>

               <Card className="p-5 border-l-4 border-l-purple-500 bg-white shadow-sm">
                 <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                   <Layers className="w-5 h-5 text-purple-500" /> Context
                 </div>
                 <p className="text-sm text-slate-600">Share only the background needed, like audience, channel, and what has already happened.</p>
               </Card>

               <Card className="p-5 border-l-4 border-l-emerald-500 bg-white shadow-sm">
                 <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                   <Target className="w-5 h-5 text-emerald-500" /> Task
                 </div>
                 <p className="text-sm text-slate-600">State what you want done, such as draft, rewrite, summarize, or generate ideas.</p>
               </Card>

               <Card className="p-5 border-l-4 border-l-amber-500 bg-white shadow-sm">
                 <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                   <ListChecks className="w-5 h-5 text-amber-500" /> Requirements
                 </div>
                 <p className="text-sm text-slate-600">Add constraints like tone, length, format, or things to avoid.</p>
               </Card>
            </div>

            <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                 <FileText className="w-4 h-4" /> Example: Rewriting an Email
               </h3>
               <PromptCard 
                 label="PCTR Prompt"
                 prompt={`Persona: Internal Comms Manager.

Context: We are updating the "Work from Home" policy. The old policy was confusing. The new one is stricter but fairer. The audience is all employees.

Task: Rewrite the attached draft email to be clearer and more empathetic.

Requirements: Use a "Facts first" structure. Keep the tone calm but firm. Avoid corporate jargon.`}
               />
            </div>
          </section>
        );

      case 1: // Talk Like You Are Delegating
        return (
          <section id="delegating" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Talk like you are delegating</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Treat the model like a smart intern who doesn't know your context. If you give a vague command, you get a generic result.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-red-50 border-red-100 h-full flex flex-col">
                <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Weak ask
                </h3>
                <div className="bg-white p-4 rounded-lg border border-red-100 font-mono text-sm text-slate-600 flex-1">
                  "Write an email about the project delay."
                </div>
                <p className="text-xs text-red-600 mt-3 font-medium">Result: Generic, confusing, potentially wrong tone.</p>
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-100 h-full flex flex-col">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Delegated task
                </h3>
                <div className="bg-white p-4 rounded-lg border border-blue-100 font-mono text-sm text-slate-800 flex-1">
                  "Draft an email to the client explaining the 1-week delay. Mention the server outage as the cause. Offer a discount on next month's invoice as an apology."
                </div>
                <p className="text-xs text-blue-600 mt-3 font-medium">Result: Specific, on-brand, actionable.</p>
              </Card>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">What makes the second one better?</h3>
              <ul className="space-y-4 text-slate-700">
                <li className="flex gap-3">
                   <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                   <span>It states the <strong>goal</strong> and the <strong>audience</strong> clearly.</span>
                </li>
                <li className="flex gap-3">
                   <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                   <span>It describes the <strong>starting point</strong> and where the draft is going.</span>
                </li>
                <li className="flex gap-3">
                   <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                   <span>It asks for a <strong>specific format</strong> (offer discount, mention outage) that is easy to check.</span>
                </li>
              </ul>
            </div>
          </section>
        );

      case 2: // Make Iteration Your Default
        const visibleSimulationItems = simulationSteps.slice(0, demoStep + 1);
        
        return (
          <section id="iteration-loop" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Make iteration your default</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Your first prompt is only the starting move. You do not have to accept the first answer. Talk to AI like a coworker and ask it to fix, improve, or change things.
            </p>

            <div className="mb-12">
               <ul className="space-y-4 text-slate-700 mb-8">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span>The first answer is rarely perfect. Treat it as a rough draft.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span>The model remembers what you said before. You do not need to repeat context.</span>
                  </li>
                </ul>

                {/* Interactive Simulator */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-2xl mx-auto my-8">
                  <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                       <span className="font-bold text-slate-700 text-sm">AI Chat Simulator</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setDemoStep(0)} disabled={demoStep === 0}>
                       <RefreshCw className="w-3 h-3 mr-1" /> Reset
                    </Button>
                  </div>
                  
                  <div className="p-6 space-y-6 min-h-[300px] max-h-[500px] overflow-y-auto">
                     {visibleSimulationItems.map((item, i) => (
                       <div key={i} className={`flex gap-3 ${item.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                          {item.type === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                              <Bot className="w-4 h-4 text-blue-600" />
                            </div>
                          )}
                          
                          <div className={`p-4 rounded-xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                            item.type === 'user' 
                              ? 'bg-blue-600 text-white rounded-tr-sm' 
                              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                          }`}>
                             <p className="whitespace-pre-wrap">{item.content}</p>
                          </div>

                          {item.type === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-slate-300">
                              <User className="w-4 h-4 text-slate-600" />
                            </div>
                          )}
                       </div>
                     ))}
                     
                     {/* Controls */}
                     <div className="pt-4 flex justify-center w-full">
                        {demoStep === 0 && (
                          <Button onClick={() => setDemoStep(1)}>
                             See First Draft <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                        
                        {demoStep === 1 && (
                           <div className="flex flex-col items-center gap-2 w-full">
                             <p className="text-xs text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">Analysis: The answer is generic and too long.</p>
                             <Button onClick={() => setDemoStep(2)} variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 w-full md:w-auto">
                               <MessageCircle className="w-4 h-4 mr-2" /> Ask to make it shorter & friendlier
                             </Button>
                           </div>
                         )}

                        {demoStep === 2 && (
                             <Button onClick={() => setDemoStep(3)}>
                               Update Draft <ArrowRight className="w-4 h-4 ml-2" />
                             </Button>
                        )}
                        
                        {demoStep === 3 && (
                           <div className="flex flex-col items-center gap-2 w-full">
                             <p className="text-xs text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">Analysis: Much better, but one detail is wrong (time).</p>
                             <Button onClick={() => setDemoStep(4)} variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 w-full md:w-auto">
                               <MessageCircle className="w-4 h-4 mr-2" /> Fix the time
                             </Button>
                           </div>
                        )}

                        {demoStep === 4 && (
                             <Button onClick={() => setDemoStep(5)}>
                               Finalize <ArrowRight className="w-4 h-4 ml-2" />
                             </Button>
                        )}

                        {demoStep === 5 && (
                           <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full border border-green-100 animate-fade-in">
                             <CheckCircle2 className="w-4 h-4" /> Perfect. Ready to send.
                           </div>
                         )}
                     </div>
                  </div>
                </div>

                {/* Collapsible Phrase Bank */}
                <div className="mt-12 max-w-2xl mx-auto">
                  <button 
                    onClick={() => setIsExamplesOpen(!isExamplesOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-all shadow-sm group"
                  >
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                         <Lightbulb className="w-5 h-5" />
                       </div>
                       <div className="text-left">
                         <h3 className="font-bold text-slate-900">A few examples to structure your iteration process</h3>
                         <p className="text-xs text-slate-500">Click to expand helpful feedback phrases</p>
                       </div>
                     </div>
                     {isExamplesOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>

                  {isExamplesOpen && (
                    <div className="mt-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
                       <div className="divide-y divide-slate-100">
                         {[
                           "Make it shorter, maximum 3 sentences.",
                           "Change the tone to be more [Casual/Professional].",
                           "Format this as a table with columns for X and Y.",
                           "You missed [Fact], please update.",
                           "Explain your reasoning step-by-step."
                         ].map((phrase, i) => (
                           <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                              <code className="text-sm text-slate-700 font-mono">{phrase}</code>
                              <button 
                                onClick={() => {navigator.clipboard.writeText(phrase)}}
                                className="p-2 text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all"
                                title="Copy to clipboard"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}
                </div>
            </div>

            {/* Mistakes & Quick Win */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Callout variant="warning" title="Mistakes to avoid">
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-700">
                  <li>Starting a new chat every time you want a change (the AI loses context).</li>
                  <li>Giving vague feedback like "That is bad" without saying why.</li>
                </ul>
              </Callout>

              <Callout variant="success" title="Quick win">
                <p className="mt-2 text-sm text-slate-700">
                  Next time you use an AI tool, always ask at least one follow-up question. Even a simple "Make it shorter" usually improves the result.
                </p>
              </Callout>
            </div>
          </section>
        );

      case 3: // Fixing Errors and Weird Answers
        return (
          <section id="repair" className="mb-12 animate-fade-in">
            <div className="mb-8">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Fixing errors and weird answers</h2>
               <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                 Sometimes the model hallucinates or adopts a robotic tone. Don't give up. Correct it firmly using established patterns.
                 <br/><br/>
                 When the model gets it wrong, your instinct might be to just say "No" or "Try again." 
                 But the model doesn't know <em>why</em> it was wrong.
               </p>
            </div>

            {/* Comparison Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
               <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  {/* The Wrong Way */}
                  <div className="p-8 bg-slate-50/50">
                     <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold uppercase tracking-wider text-xs">
                        <XCircle className="w-4 h-4" /> The Frustrated User
                     </div>
                     
                     <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
                           <div className="absolute -left-2 top-4 w-1 h-8 bg-red-400 rounded-r"></div>
                           <p className="font-mono text-sm text-slate-600">"That is not what I meant. Try again."</p>
                        </div>
                        <div className="flex justify-center text-slate-400">
                           <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                        </div>
                        <div className="p-4 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm italic">
                           The model just guesses again. It might change the tone when you wanted it to change the length.
                        </div>
                     </div>
                  </div>

                  {/* The Right Way */}
                  <div className="p-8 bg-blue-50/30">
                     <div className="flex items-center gap-2 mb-6 text-blue-600 font-bold uppercase tracking-wider text-xs">
                        <CheckCircle2 className="w-4 h-4" /> The Power User
                     </div>

                     <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm relative">
                           <div className="absolute -left-2 top-4 w-1 h-8 bg-blue-500 rounded-r"></div>
                           <p className="font-mono text-sm text-slate-800">
                             "You missed the part about <span className="bg-blue-100 text-blue-800 px-1 rounded">high value members</span>.
                             <br/><br/>
                             Use this definition: <span className="bg-blue-100 text-blue-800 px-1 rounded">High value = 5+ years tenure</span>.
                             <br/><br/>
                             Rewrite the summary using that definition."
                           </p>
                        </div>
                        <div className="flex justify-center text-blue-400">
                           <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                        </div>
                         <div className="p-4 rounded-xl bg-white border border-green-200 text-green-700 text-sm font-medium shadow-sm">
                           <div className="flex items-center gap-2 mb-1">
                             <CheckCircle2 className="w-4 h-4" /> Fixed immediately.
                           </div>
                           The model knows exactly what context it missed and what instruction to follow.
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Repair Kit */}
            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-slate-500" /> The Repair Kit
               </h3>
               <p className="text-slate-600 mb-6">
                 Copy these stems to fix common issues without retyping your whole prompt.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Missing Info */}
                  <Card className="p-5 hover:border-blue-400 transition-colors group cursor-pointer" onClick={() => navigator.clipboard.writeText("You missed the constraint about [X]. Please fix it.")}>
                     <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">Missing Info</span>
                        <Copy className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                     </div>
                     <p className="font-mono text-sm text-slate-700">"You missed the constraint about [X]. Please fix it."</p>
                  </Card>

                  {/* Hallucination */}
                  <Card className="p-5 hover:border-red-400 transition-colors group cursor-pointer" onClick={() => navigator.clipboard.writeText("You mentioned [X], but that is not in the source text. Only use the provided text.")}>
                     <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-red-600 uppercase bg-red-50 px-2 py-1 rounded">Hallucination</span>
                         <Copy className="w-4 h-4 text-slate-300 group-hover:text-red-500" />
                     </div>
                     <p className="font-mono text-sm text-slate-700">"You mentioned [X], but that is not in the source text. Only use the provided text."</p>
                  </Card>

                   {/* Tone Check */}
                  <Card className="p-5 hover:border-purple-400 transition-colors group cursor-pointer" onClick={() => navigator.clipboard.writeText("This sounds too robotic. Rewrite it to be [Tone], like you are talking to [Audience].")}>
                     <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-purple-600 uppercase bg-purple-50 px-2 py-1 rounded">Tone Check</span>
                         <Copy className="w-4 h-4 text-slate-300 group-hover:text-purple-500" />
                     </div>
                     <p className="font-mono text-sm text-slate-700">"This sounds too robotic. Rewrite it to be [Tone], like you are talking to [Audience]."</p>
                  </Card>
               </div>
            </div>
          </section>
        );

      case 4: // Zero, Few, and Step-by-Step
        return (
          <section id="strategies" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Zero shot, few shot, and step by step</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              You don't need a new trick for every task. Most of the time you are choosing between these three modes.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* Zero Shot */}
              <Card className="p-6 border-t-4 border-t-blue-500 bg-white">
                 <div className="flex items-start justify-between mb-4">
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                       <Zap className="w-5 h-5 text-blue-500" /> Zero Shot
                     </h3>
                     <p className="text-sm text-slate-600 mt-1">Use when the task is simple and stakes are low.</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                   <p className="text-xs font-bold text-slate-500 uppercase mb-2">Example: Internal Update</p>
                   <p className="font-mono text-sm text-slate-800 whitespace-pre-wrap">
{`You are an internal communications partner.
Task: Turn the bullet list below into a short, clear paragraph for a weekly team update.
Requirements: Keep it under 120 words and do not change the meaning.`}
                   </p>
                 </div>
              </Card>

              {/* Few Shot */}
              <Card className="p-6 border-t-4 border-t-purple-500 bg-white">
                 <div className="flex items-start justify-between mb-4">
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                       <Layers className="w-5 h-5 text-purple-500" /> Few Shot
                     </h3>
                     <p className="text-sm text-slate-600 mt-1">Use when you want the model to follow a specific style or structure.</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                   <p className="text-xs font-bold text-slate-500 uppercase mb-2">Example: Matching Tone</p>
                   <p className="font-mono text-sm text-slate-800 whitespace-pre-wrap">
{`You are helping write member apology emails.
Context: Below are two examples of apology emails that match our tone. After those, you will see a new situation.
Task: Write a new apology email that matches the style of the examples.
Requirements: Keep it under 180 words, stay calm and direct, and avoid legal promises we cannot make.`}
                   </p>
                 </div>
              </Card>

              {/* Step by Step */}
              <Card className="p-6 border-t-4 border-t-emerald-500 bg-white">
                 <div className="flex items-start justify-between mb-4">
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                       <GitBranch className="w-5 h-5 text-emerald-500" /> Step by Step
                     </h3>
                     <p className="text-sm text-slate-600 mt-1">Use when the problem needs reasoning or you want to see how the model thinks.</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                   <p className="text-xs font-bold text-slate-500 uppercase mb-2">Example: Metric Analysis</p>
                   <p className="font-mono text-sm text-slate-800 whitespace-pre-wrap">
{`You are a data analyst helping a business partner understand a metric spike.
Task: Think step by step to generate possible reasons for the spike, suggest checks we can run in our data, and outline how to explain this to leadership.
Requirements: First list hypotheses, then list concrete checks for each one, then draft three bullet points we can share with a vice president.`}
                   </p>
                 </div>
              </Card>
            </div>

            <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <BookOpen className="w-5 h-5 text-slate-500" />
               <div className="flex-1 text-sm text-slate-600">
                 Need templates for these? Check the Reference Guide.
               </div>
               <Button variant="ghost" size="sm" onClick={() => push('/reference/prompting-guide')}>
                 Open Prompting Guide
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
      title="Prompting Foundations"
      description="This module turns good prompts into a repeatable system you can reuse across emails, docs, and analysis. You will practice the PCTR pattern and three core techniques so your prompts work the first time more often."
      duration="20 mins"
      audience="All Employees"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      onJumpTo={handleJumpTo}
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