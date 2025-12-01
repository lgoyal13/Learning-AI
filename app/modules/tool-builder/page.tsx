import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button, Badge } from '../../../components/ui';
import { 
  FileText, Mail, Table, Presentation, Image, CheckCircle2, 
  ArrowRight, ArrowLeft, Zap, PenTool, LayoutGrid, 
  Sparkles, MousePointerClick, MessageSquare, Briefcase
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page({ onBack }: { onBack?: () => void }) {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const sections = [
    { id: 'intro', title: 'Meet Your In-App Partner' },
    { id: 'writing', title: 'The Writer (Docs & Gmail)' },
    { id: 'analysis', title: 'The Analyst (Sheets)' },
    { id: 'visuals', title: 'The Designer (Slides)' },
    { id: 'practice', title: 'Real Workflows' },
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
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Meet Your In-App Partner</h2>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl">
              You are used to going to a chatbot to ask questions. But <strong>Gemini for Workspace</strong> lives <em>inside</em> the apps you use every day—Gmail, Docs, Sheets, and Slides.
              <br /><br />
              It can read the draft you are working on, see the email thread you are replying to, and generate content without you ever leaving the tab.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-blue-50 border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">No Context Switching</h3>
                </div>
                <p className="text-slate-700">
                  Don't copy-paste text back and forth. Highlight a paragraph in Docs and ask Gemini to "make this more concise" right there.
                </p>
              </Card>

              <Card className="p-6 bg-purple-50 border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">The "Help Me Write" Button</h3>
                </div>
                <p className="text-slate-700">
                  Look for the <strong>Star/Pencil icon</strong> in your toolbar. That is your gateway to drafting, summarizing, and organizing.
                </p>
              </Card>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">After this module you will be able to:</h3>
               <ul className="space-y-3 text-sm text-slate-700">
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Draft and refine emails and documents instantly.
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Generate tables and project trackers in Sheets.
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Create custom visuals for your Slides presentations.
                 </li>
               </ul>
            </div>
          </section>
        );

      case 1: // WRITING (Docs & Gmail)
        return (
          <section id="writing" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Writer (Docs & Gmail)</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Writer's block is optional. Use Gemini to create first drafts or polish your rough notes into professional communication.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* DOCS */}
              <Card className="p-6 border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold">
                  <FileText className="w-5 h-5" /> Gemini in Docs
                </div>
                <ul className="space-y-4 text-sm text-slate-700">
                   <li>
                     <strong className="block text-slate-900 mb-1">Drafting from scratch</strong>
                     "Write a project brief for [Project Name] including goals, timeline, and stakeholders."
                   </li>
                   <li>
                     <strong className="block text-slate-900 mb-1">Refining</strong>
                     Highlight text -> "Make this more concise" or "Change tone to confident."
                   </li>
                   <li>
                     <strong className="block text-slate-900 mb-1">Summarizing</strong>
                     "Summarize this document in 5 bullet points."
                   </li>
                </ul>
              </Card>

              {/* GMAIL */}
              <Card className="p-6 border-t-4 border-t-red-500 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4 text-red-600 font-bold">
                  <Mail className="w-5 h-5" /> Gemini in Gmail
                </div>
                <ul className="space-y-4 text-sm text-slate-700">
                   <li>
                     <strong className="block text-slate-900 mb-1">Thread Summary</strong>
                     Open a long thread -> Click the Star icon -> "Summarize this email thread."
                   </li>
                   <li>
                     <strong className="block text-slate-900 mb-1">Smart Reply</strong>
                     "Draft a reply thanking them for the update and asking to reschedule to Tuesday."
                   </li>
                   <li>
                     <strong className="block text-slate-900 mb-1">Tone Polish</strong>
                     "Formalize this draft."
                   </li>
                </ul>
              </Card>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <PenTool className="w-4 h-4" /> Try this Prompt in Docs
               </h3>
               <PromptCard 
                 label="Help Me Write"
                 prompt={`Act as a [Role, e.g., Product Manager].
Draft a [Document Type, e.g., One-Pager] for [Topic].
Include sections for:
- Problem Statement
- Proposed Solution
- Key Metrics
- Next Steps`}
               />
               <p className="text-xs text-slate-500 mt-3 italic">
                 Tip: You can press <strong>Ctrl + Shift + Y</strong> (or Cmd + Shift + Y) in Docs to open the Gemini panel quickly.
               </p>
            </div>
          </section>
        );

      case 2: // ANALYSIS (Sheets)
        return (
          <section id="analysis" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Analyst (Sheets)</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Sheets can be intimidating. Gemini helps you get set up faster and figure out complex formulas without searching the web.
            </p>

            <div className="grid grid-cols-1 gap-6 mb-8">
               <Card className="p-6 flex flex-col md:flex-row gap-6 items-start border-l-4 border-l-emerald-500">
                  <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 shrink-0">
                    <Table className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">1. "Help me organize"</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Gemini can generate full tables with dummy data or structure to get you started.
                    </p>
                    <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm font-mono text-slate-700">
                      "Create a project tracker for a website launch with columns for Task, Owner, Status, Deadline, and Notes."
                    </div>
                  </div>
               </Card>

               <Card className="p-6 flex flex-col md:flex-row gap-6 items-start border-l-4 border-l-emerald-500">
                  <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">2. Formula Help</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Describe what you want to calculate, and it will write the function for you.
                    </p>
                    <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm font-mono text-slate-700">
                      "Write a formula to sum Column B if Column A says 'Completed' and Column C is greater than 100."
                    </div>
                  </div>
               </Card>
            </div>

            <Callout variant="info" title="Context Aware">
              Gemini in Sheets works best when you have headers. It reads row 1 to understand what your data is about.
            </Callout>
          </section>
        );

      case 3: // VISUALS (Slides)
        return (
          <section id="visuals" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Designer (Slides)</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Stop searching stock photo sites. Generate custom visuals directly in your slide deck to match your exact concept.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold">
                   <Image className="w-5 h-5" /> Generate Images
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Open the "Create image with Gemini" panel. Describe the scene, style, and mood.
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs font-mono text-slate-700 mb-2">
                  "A futuristic sustainable city with vertical gardens, soft lighting, isometric style."
                </div>
                <p className="text-xs text-slate-500">Great for: Title slides, mood boards, abstract concepts.</p>
              </Card>

              <Card className="p-6">
                 <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold">
                   <Presentation className="w-5 h-5" /> Help Me Visualize
                </div>
                <p className="text-sm text-slate-600 mb-4">
                   Need a slide background that isn't white? Ask for it.
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs font-mono text-slate-700 mb-2">
                  "A professional gradient background using corporate blue and subtle geometric shapes."
                </div>
                <p className="text-xs text-slate-500">Great for: consistent branding without a designer.</p>
              </Card>
            </div>

            <Callout variant="warning" title="Design Tip">
              Be descriptive with styles. Add words like "minimalist," "photorealistic," "sketch," or "corporatememphis" to get the look you want.
            </Callout>
          </section>
        );

      case 4: // PRACTICE
        return (
          <section id="practice" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Real Workflows</h2>
            <p className="text-lg text-slate-700 mb-8">
              You have a new project. How do you combine these tools?
            </p>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {[
                {
                  id: 'kickoff',
                  title: 'The Project Kickoff',
                  icon: <Zap className="w-5 h-5 text-amber-500" />,
                  steps: [
                    { tool: 'Docs', action: 'Draft a project brief using "Help me write".' },
                    { tool: 'Sheets', action: 'Generate a timeline tracker from the brief.' },
                    { tool: 'Gmail', action: 'Draft a kickoff email to the team summarizing the brief.' }
                  ]
                },
                {
                  id: 'review',
                  title: 'The Quarterly Review',
                  icon: <Briefcase className="w-5 h-5 text-blue-500" />,
                  steps: [
                    { tool: 'Sheets', action: 'Ask Gemini to explain complex formulas in the data export.' },
                    { tool: 'Docs', action: 'Summarize the key wins and losses into a memo.' },
                    { tool: 'Slides', action: 'Generate title images for the presentation deck.' }
                  ]
                }
              ].map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenario(activeScenario === scenario.id ? null : scenario.id)}
                  className={`text-left p-6 rounded-xl border transition-all ${activeScenario === scenario.id ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                >
                   <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">{scenario.icon}</div>
                        <h3 className="font-bold text-slate-900">{scenario.title}</h3>
                     </div>
                     <ArrowRight className={`w-5 h-5 text-slate-400 transition-transform ${activeScenario === scenario.id ? 'rotate-90 text-blue-500' : ''}`} />
                   </div>
                   
                   {activeScenario === scenario.id && (
                     <div className="mt-4 pt-4 border-t border-blue-100/50 animate-fade-in space-y-3">
                       {scenario.steps.map((step, i) => (
                         <div key={i} className="flex gap-3 text-sm text-slate-700">
                           <span className="font-bold text-blue-600 w-16 shrink-0">{step.tool}</span>
                           <span>{step.action}</span>
                         </div>
                       ))}
                     </div>
                   )}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
              <h3 className="font-bold text-slate-900 mb-2">Ready to try it?</h3>
              <p className="text-sm text-slate-600 mb-6">
                Open a Google Doc right now and look for the sparkle icon.
              </p>
              <div className="flex justify-center gap-4">
                 <a href="https://docs.new" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">
                    <FileText className="w-4 h-4 text-blue-600" /> New Doc
                 </a>
                 <a href="https://sheets.new" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">
                    <Table className="w-4 h-4 text-emerald-600" /> New Sheet
                 </a>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="Gemini & Workspace"
      description="Learn how to use Gemini directly inside Gmail, Docs, Sheets, and Slides to draft, organize, and visualize without switching tabs."
      duration="20 mins"
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