import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Button, Badge, Callout, PromptCard, Heading } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { Globe, Layers, PenTool, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2, Target, BookOpen, BrainCircuit, Lightbulb, Briefcase, FileText, Zap, Layout, ExternalLink } from 'lucide-react';

// Import Deep Dive Modules
import ResearchPage from '../tool-research/page';
import DocumentsPage from '../tool-documents/page';
import BuilderPage from '../tool-builder/page';

type ActiveView = 'overview' | 'research' | 'documents' | 'builder';

export default function Page() {
  const { push } = useRouter();
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [currentStep, setCurrentStep] = useState(0);

  // Steps array for navigation
  const sections = [
    { id: 'start-here', title: 'Start here' },
    { id: 'ma-analyst', title: 'M&A analyst workflow' },
    { id: 'project-manager', title: 'Project manager workflow' },
    { id: 'analytics-bi', title: 'Analytics and BI workflow' },
    { id: 'automated-builder', title: 'Automated workflow builder' },
  ];
  
  const totalSteps = sections.length;

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

  const handleJumpTo = (step: number) => {
    setCurrentStep(step);
    scrollToTop();
  };

  // If in a deep dive, render that component with a back button
  if (activeView === 'research') {
    return (
      <div className="animate-fade-in">
        <div className="bg-slate-50 border-b border-slate-200 p-4 sticky top-0 z-10">
           <div className="max-w-6xl mx-auto">
             <Button variant="ghost" onClick={() => setActiveView('overview')} className="text-slate-600 hover:text-blue-600 pl-0">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Workflow Playbook
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
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Workflow Playbook
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
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Workflow Playbook
             </Button>
           </div>
        </div>
        <BuilderPage />
      </div>
    );
  }

  const sectionContent = [
    // STEP 1: START HERE (Intro)
    (
      <section key="start-here" className="animate-fade-in mb-12">
        <div className="max-w-3xl mx-auto space-y-8">
           <Heading level={2}>You know the tools. Now see the workflows.</Heading>
           
           <p className="text-lg text-slate-700 leading-relaxed">
              You have seen how to prompt and how tools like NotebookLM, Perplexity, Gemini, and ChatGPT work on their own. This module shows how power users chain them together to run projects from start to finish.
           </p>

           <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">After this module you will be able to:</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  Spot when to use a docs tool, a research engine, or chat.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  Borrow three ready made workflows for your own projects.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  Start sketching your own workflows using the same patterns.
                </li>
              </ul>
           </div>

           <div className="space-y-4">
             <h3 className="font-bold text-slate-900">Preview the workflows:</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-white border-slate-200 hover:border-blue-300 transition-colors">
                   <h4 className="font-bold text-slate-900 mb-1 text-sm">M&A analyst</h4>
                   <p className="text-xs text-slate-500 mb-3">Due diligence summary.</p>
                   <div className="flex flex-wrap gap-1">
                     <Badge className="text-[10px] py-0 px-1.5" variant="neutral">NotebookLM</Badge>
                     <Badge className="text-[10px] py-0 px-1.5" variant="neutral">Perplexity</Badge>
                   </div>
                </Card>
                <Card className="p-4 bg-white border-slate-200 hover:border-emerald-300 transition-colors">
                   <h4 className="font-bold text-slate-900 mb-1 text-sm">Project manager</h4>
                   <p className="text-xs text-slate-500 mb-3">Launch planning.</p>
                   <div className="flex flex-wrap gap-1">
                     <Badge className="text-[10px] py-0 px-1.5" variant="neutral">Docs</Badge>
                     <Badge className="text-[10px] py-0 px-1.5" variant="neutral">Sheets</Badge>
                   </div>
                </Card>
                <Card className="p-4 bg-white border-slate-200 hover:border-purple-300 transition-colors">
                   <h4 className="font-bold text-slate-900 mb-1 text-sm">Analytics and BI partner</h4>
                   <p className="text-xs text-slate-500 mb-3">Metric investigation.</p>
                   <div className="flex flex-wrap gap-1">
                     <Badge className="text-[10px] py-0 px-1.5" variant="neutral">NotebookLM</Badge>
                     <Badge className="text-[10px] py-0 px-1.5" variant="neutral">Chat</Badge>
                   </div>
                </Card>
             </div>
           </div>

           <div className="pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-4 font-medium">Explore these tools directly:</p>
              <div className="flex flex-wrap gap-3">
                 <a href="https://notebooklm.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-slate-500 h-8 px-3 text-sm">
                   NotebookLM <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                 </a>
                 <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-slate-500 h-8 px-3 text-sm">
                   Perplexity <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                 </a>
                 <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-slate-500 h-8 px-3 text-sm">
                   Gemini <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                 </a>
                 <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-slate-500 h-8 px-3 text-sm">
                   ChatGPT <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                 </a>
              </div>
           </div>
        </div>
      </section>
    ),

    // STEP 2: M&A ANALYST
    (
      <section key="ma-analyst" className="animate-fade-in mb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Scenario Card */}
          <Card className="p-5 md:p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-wider">
               <Briefcase className="w-4 h-4" /> Scenario 1
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Evaluate an acquisition target without drowning in PDFs</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You are an M&A analyst with a messy data room and a noisy news feed about the target and its competitors. You need to get from scattered PDFs and headlines to a clear deal story your leadership can react to.
            </p>
            
            <div className="flex flex-wrap gap-2 py-2">
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                 NotebookLM
               </span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                 Perplexity or Gemini Deep Research
               </span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                 Gemini or ChatGPT
               </span>
            </div>
            
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Pattern: your docs plus web research plus chat synthesis.
            </div>
          </Card>

          {/* Workflow Card */}
          <Card className="p-5 md:p-6 border-slate-200 bg-slate-50 rounded-2xl space-y-6">
             <p className="font-semibold text-slate-700 text-sm">Here is how a power user might run this week of due diligence.</p>
             
             <div className="space-y-8 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 before:-z-10">
                
                {/* Step 1 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">1</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Tame the data room</h4>
                   <p className="text-xs text-slate-600 mb-3">Upload financials, contracts, and key decks into NotebookLM so you work from a structured summary instead of raw files.</p>
                   <PromptCard 
                      label="NotebookLM prompt"
                      prompt="From these sources, create a study guide that summarizes revenue streams, cost structure, and major contractual obligations."
                   />
                </div>

                {/* Step 2 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">2</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Scan the market</h4>
                   <p className="text-xs text-slate-600 mb-3">Use a research engine to see what has happened around the target and its competitors in the last year.</p>
                   <PromptCard 
                      label="Perplexity or Deep Research prompt"
                      prompt="For the last 12 to 18 months, summarize major moves by {{target}} and its 3 main competitors in {{industry}}. Focus on product launches, partnerships, regulation, and funding. Include citations."
                   />
                </div>

                {/* Step 3 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">3</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Draft the deal rationale</h4>
                   <p className="text-xs text-slate-600 mb-3">Bring the internal summary and the external scan into chat and draft a clean one page narrative.</p>
                   <PromptCard 
                      label="Chat assistant prompt"
                      prompt="Using this NotebookLM summary and this competitive scan, outline a one page deal rationale. Include strategic fit, key risks, and 3 open questions."
                   />
                </div>

                {/* Step 4 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">4</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Prepare leadership talking points</h4>
                   <p className="text-xs text-slate-600 mb-3">Turn the deal rationale into concise talking points leaders can use with the board.</p>
                   <PromptCard 
                      label="Chat assistant prompt"
                      prompt="Draft 5 bullet talking points for our CFO and CEO to use when discussing this potential acquisition with the board. Keep them punchy and focused on impact."
                   />
                </div>

             </div>

             <Callout variant="info" title="Why this combo works">
               <ul className="list-disc pl-4 mt-1 space-y-1 text-sm">
                 <li>Docs tool turns a pile of PDFs into something you can reason about.</li>
                 <li>Research engine keeps you honest about what is happening outside your four walls.</li>
                 <li>Chat stitches both together into a story that executives can act on.</li>
               </ul>
             </Callout>
          </Card>
        </div>
      </section>
    ),

    // STEP 3: PROJECT MANAGER
    (
      <section key="project-manager" className="animate-fade-in mb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Scenario Card */}
          <Card className="p-5 md:p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-wider">
               <Briefcase className="w-4 h-4" /> Scenario 2
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Cross-Functional Launch</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You are running a launch with scattered notes, requirements docs, and stakeholders who want clear plans and concise updates.
            </p>
            
            <div className="flex flex-wrap gap-2 py-2">
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                 Docs
               </span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                 Sheets
               </span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                 Chat Assistant
               </span>
            </div>
            
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Pattern: Consolidate -> Structure -> Communicate
            </div>
          </Card>

          {/* Workflow Card */}
          <Card className="p-5 md:p-6 border-slate-200 bg-slate-50 rounded-2xl space-y-6">
             <p className="font-semibold text-slate-700 text-sm">Here is how a power user runs this workflow:</p>
             
             <div className="space-y-8 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 before:-z-10">
                
                {/* Step 1 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">1</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Turn notes into a brief</h4>
                   <p className="text-xs text-slate-600 mb-3">Consolidate messy inputs using "Help me write" in Docs.</p>
                   <PromptCard 
                      label="Prompt (in Docs)"
                      prompt="From these meeting notes, create a concise project brief with goals, scope, key milestones, and dependencies."
                   />
                </div>

                {/* Step 2 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">2</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Build a timeline</h4>
                   <p className="text-xs text-slate-600 mb-3">Move from text to structure in Sheets.</p>
                   <PromptCard 
                      label="Prompt (in Sheets)"
                      prompt="Create a table with columns: Workstream, Owner, Start date, End date, and Status. Suggest dates for a 6-week timeline."
                   />
                </div>

                {/* Step 3 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">3</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Risk scan</h4>
                   <p className="text-xs text-slate-600 mb-3">Proactively identify blockers.</p>
                   <PromptCard 
                      label="Prompt (in Chat Assistant)"
                      prompt="Identify five likely risks to schedule or quality. Rate likelihood and impact (low/med/high) and propose a mitigation for each."
                   />
                </div>

                {/* Step 4 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">4</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Executive update</h4>
                   <p className="text-xs text-slate-600 mb-3">Communicate status clearly.</p>
                   <PromptCard 
                      label="Prompt (in Chat Assistant)"
                      prompt="Draft an executive update email. Keep it under 200 words and end with a simple 'reply 1, 2, or 3' decision list."
                   />
                </div>

             </div>

             <Callout variant="info" title="Why this combo works">
               <ul className="list-disc pl-4 mt-1 space-y-1 text-sm">
                 <li>Workspace tools keep your data organized where you work.</li>
                 <li>AI handles the formatting and translation (text to table).</li>
                 <li>You focus on unblocking the team.</li>
               </ul>
             </Callout>
          </Card>
        </div>
      </section>
    ),

    // STEP 4: ANALYTICS / BI
    (
      <section key="analytics-bi" className="animate-fade-in mb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Scenario Card */}
          <Card className="p-5 md:p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-wider">
               <Briefcase className="w-4 h-4" /> Scenario 3
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Explain a sudden change in a key metric</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You are an analytics or BI partner asked why a core metric moved. You have dashboards, QBR decks, and a vague ask to find the story.
            </p>
            
            <div className="flex flex-wrap gap-2 py-2">
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                 NotebookLM
               </span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                 Perplexity or Gemini Deep Research
               </span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                 Chat assistant
               </span>
            </div>
            
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Pattern: your historical decks plus external context plus narrative.
            </div>
          </Card>

          {/* Workflow Card */}
          <Card className="p-5 md:p-6 border-slate-200 bg-slate-50 rounded-2xl space-y-6">
             <p className="font-semibold text-slate-700 text-sm">Treat the model like an analyst in training who helps you connect internal and external signals.</p>
             
             <div className="space-y-8 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 before:-z-10">
                
                {/* Step 1 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">1</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Summarize internal evidence</h4>
                   <p className="text-xs text-slate-600 mb-3">Gather exports, decks, and memos into a single summary so you see what the team already knows.</p>
                   <PromptCard 
                      label="NotebookLM prompt"
                      prompt="Summarize what we already know about trends in {{metric}} from these QBR decks and memos. Highlight any mentioned drivers, experiments, or external events."
                   />
                </div>

                {/* Step 2 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">2</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Pull in external context</h4>
                   <p className="text-xs text-slate-600 mb-3">Add what is happening in the market or environment that might explain the change.</p>
                   <PromptCard 
                      label="Research prompt"
                      prompt="For the last 6 to 12 months, summarize industry level factors that could affect {{metric}} in {{industry}} and region. Include regulation, macro trends, competitor promotions, or major incidents. Cite sources."
                   />
                </div>

                {/* Step 3 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">3</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Generate hypotheses</h4>
                   <p className="text-xs text-slate-600 mb-3">Use chat to list plausible explanations and how you would test them.</p>
                   <PromptCard 
                      label="Chat assistant prompt"
                      prompt="Using the internal summary and the external factors, list 5 plausible hypotheses for why {{metric}} changed. For each, note which data we would check, whether it is likely short term or structural, and a quick test we can run."
                   />
                </div>

                {/* Step 4 */}
                <div className="relative pl-10">
                   <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">4</div>
                   <h4 className="font-bold text-slate-900 text-sm mb-1">Draft a stakeholder deck outline</h4>
                   <p className="text-xs text-slate-600 mb-3">Move from notes to a concrete deck outline you can fill in with real data.</p>
                   <PromptCard 
                      label="Deck outline prompt"
                      prompt="Draft an outline for a 5 to 7 slide deck explaining what changed in {{metric}}, the hypotheses you explored, the supporting data you will show, and recommended next steps. Use slide titles and bullet points only."
                   />
                </div>

             </div>

             <Callout variant="info" title="Why this combo works">
               <ul className="list-disc pl-4 mt-1 space-y-1 text-sm">
                 <li>NotebookLM keeps history and prior work at your fingertips.</li>
                 <li>Research fills in external context you might miss in your own data.</li>
                 <li>Chat helps you turn analysis into a narrative without starting from a blank slide.</li>
               </ul>
             </Callout>
          </Card>
        </div>
      </section>
    ),

    // STEP 5: AUTOMATED WORKFLOW BUILDER
    (
      <section key="automated-builder" className="animate-fade-in mb-16">
         <div className="max-w-3xl mx-auto">
            <Card className="p-12 border-dashed border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                   <PenTool className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Automated workflow builder coming soon</h3>
            </Card>
         </div>

        {/* Closing Deep Dive Panel */}
        <div className="bg-white border-t border-slate-100 pt-8 mt-12">
          <div className="flex items-center gap-2 mb-6">
             <Layout className="w-6 h-6 text-slate-700" />
             <h3 className="font-bold text-xl text-slate-900">Where to go next</h3>
          </div>
          <p className="text-slate-600 mb-6">Ready to see these tools in detail? Open a deep dive.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="p-6 cursor-pointer hover:border-blue-400 group transition-all"
              onClick={() => setActiveView('research')}
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg w-fit mb-4">
                 <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600">Research & Web</h4>
              <p className="text-sm text-slate-500">Master Perplexity and citations.</p>
              <div className="mt-4 flex items-center text-xs font-bold text-blue-600">
                 Open Deep Dive <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:border-purple-400 group transition-all"
              onClick={() => setActiveView('documents')}
            >
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg w-fit mb-4">
                 <Layers className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-purple-600">Your Documents</h4>
              <p className="text-sm text-slate-500">Master NotebookLM and summaries.</p>
              <div className="mt-4 flex items-center text-xs font-bold text-purple-600">
                 Open Deep Dive <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:border-emerald-400 group transition-all"
              onClick={() => setActiveView('builder')}
            >
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg w-fit mb-4">
                 <PenTool className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600">Builder & Experiments</h4>
              <p className="text-sm text-slate-500">Master Workspace and prompt tools.</p>
              <div className="mt-4 flex items-center text-xs font-bold text-emerald-600">
                 Open Deep Dive <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </div>
        </div>
      </section>
    )
  ];

  return (
    <ModuleLayout
      title="Workflow Playbook: Combining Tools in Real Projects"
      description="See how power users chain together chat, research engines, and your docs tools to run complex workflows in their day jobs."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNextStep}
      onPrev={handlePrevStep}
      onJumpTo={handleJumpTo}
    >
      {/* ACTIVE STEP CONTENT */}
      <div className="min-h-[400px]">
        {sectionContent[currentStep]}
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