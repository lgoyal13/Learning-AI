import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Button, Badge, Callout, PromptCard, Heading } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { Globe, Layers, PenTool, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2, Target, BookOpen, BrainCircuit, Lightbulb, Briefcase, FileText, Zap, Layout, ExternalLink, Workflow } from 'lucide-react';

// Import Deep Dive Modules
import ResearchPage from '../tool-research/page';
import DocumentsPage from '../tool-documents/page';
import BuilderPage from '../tool-builder/page';

type ActiveView = 'overview' | 'research' | 'documents' | 'builder';

// --- Helper Components for Workflow Layout ---

interface WorkflowStep {
  title: string;
  tools: string[];
  summary: string;
  bullets: string[];
  prompt: {
    label: string;
    text: string;
  };
}

const WorkflowTimeline: React.FC<{ steps: WorkflowStep[] }> = ({ steps }) => {
  return (
    <div className="relative border-l-2 border-slate-200 ml-3 md:ml-4 space-y-12 my-8 pb-4">
      {steps.map((step, idx) => (
        <div key={idx} className="relative pl-8 md:pl-12">
          {/* Number Circle */}
          <div className="absolute -left-[11px] top-0 bg-white border-2 border-slate-200 text-slate-500 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs z-10">
            {idx + 1}
          </div>
          
          {/* Card */}
          <Card className="p-5 md:p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Header: Title + Chips */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <h3 className="font-bold text-slate-900 text-lg leading-tight">{step.title}</h3>
              <div className="flex flex-wrap gap-2 shrink-0">
                {step.tools.map(t => (
                  <Badge key={t} variant="neutral" className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 border-slate-200 bg-slate-50 text-slate-600">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Summary */}
            <p className="text-sm font-medium text-slate-800 mb-4 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
              {step.summary}
            </p>
            
            {/* Bullets */}
            <ul className="space-y-3 mb-6">
              {step.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            
            {/* Prompt */}
            <PromptCard label={step.prompt.label} prompt={step.prompt.text} />
          </Card>
        </div>
      ))}
    </div>
  );
};

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
        <ResearchPage onBack={() => setActiveView('overview')} />
      </div>
    );
  }

  if (activeView === 'documents') {
    return (
      <div className="animate-fade-in">
        <DocumentsPage onBack={() => setActiveView('overview')} />
      </div>
    );
  }

  if (activeView === 'builder') {
    return (
      <div className="animate-fade-in">
        <BuilderPage onBack={() => setActiveView('overview')} />
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
              You have seen how to prompt and how tools like NotebookLM, Perplexity, Gemini, and ChatGPT work on their own. This module shows how power users chain them together to run real projects from first question to final deliverable.
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
                <Card 
                  onClick={() => handleJumpTo(1)}
                  role="button"
                  tabIndex={0}
                  className="p-4 h-full bg-blue-50 border-blue-200 hover:shadow-md hover:scale-[1.02] transition-all text-left group focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                   <h4 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-blue-700 transition-colors">M&A analyst</h4>
                   <p className="text-xs text-slate-600 mb-3">Due diligence summary.</p>
                   <div className="flex flex-wrap gap-1 mt-auto">
                     <Badge className="text-[10px] py-0 px-1.5 bg-white/50 border-blue-200 text-blue-700" variant="neutral">NotebookLM</Badge>
                     <Badge className="text-[10px] py-0 px-1.5 bg-white/50 border-blue-200 text-blue-700" variant="neutral">Perplexity</Badge>
                   </div>
                </Card>

                <Card 
                  onClick={() => handleJumpTo(2)}
                  role="button"
                  tabIndex={0}
                  className="p-4 h-full bg-emerald-50 border-emerald-200 hover:shadow-md hover:scale-[1.02] transition-all text-left group focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                   <h4 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-emerald-700 transition-colors">Project manager</h4>
                   <p className="text-xs text-slate-600 mb-3">Launch planning.</p>
                   <div className="flex flex-wrap gap-1 mt-auto">
                     <Badge className="text-[10px] py-0 px-1.5 bg-white/50 border-emerald-200 text-emerald-700" variant="neutral">Docs</Badge>
                     <Badge className="text-[10px] py-0 px-1.5 bg-white/50 border-emerald-200 text-emerald-700" variant="neutral">Sheets</Badge>
                   </div>
                </Card>

                <Card 
                  onClick={() => handleJumpTo(3)}
                  role="button"
                  tabIndex={0}
                  className="p-4 h-full bg-purple-50 border-purple-200 hover:shadow-md hover:scale-[1.02] transition-all text-left group focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                   <h4 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-purple-700 transition-colors">Analytics and BI partner</h4>
                   <p className="text-xs text-slate-600 mb-3">Metric investigation.</p>
                   <div className="flex flex-wrap gap-1 mt-auto">
                     <Badge className="text-[10px] py-0 px-1.5 bg-white/50 border-purple-200 text-purple-700" variant="neutral">NotebookLM</Badge>
                     <Badge className="text-[10px] py-0 px-1.5 bg-white/50 border-purple-200 text-purple-700" variant="neutral">Chat</Badge>
                   </div>
                </Card>
             </div>
           </div>

           <div className="pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Explore these tools directly:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <a href="https://notebooklm.google.com/" target="_blank" rel="noopener noreferrer" className="block group h-full">
                    <Card className="p-4 h-full hover:border-blue-300 hover:shadow-sm transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">NotebookLM</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-600">Turn your PDFs and notes into a private research space.</p>
                    </Card>
                 </a>

                 <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer" className="block group h-full">
                    <Card className="p-4 h-full hover:border-blue-300 hover:shadow-sm transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Perplexity</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-600">Run live web research with citations you can click and check.</p>
                    </Card>
                 </a>

                 <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="block group h-full">
                    <Card className="p-4 h-full hover:border-blue-300 hover:shadow-sm transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Gemini</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-600">Work inside Gmail, Docs, Sheets, and Slides with an AI partner.</p>
                    </Card>
                 </a>

                 <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="block group h-full">
                    <Card className="p-4 h-full hover:border-blue-300 hover:shadow-sm transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">ChatGPT</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-600">Use a flexible chat assistant for drafts, explanations, and ideas.</p>
                    </Card>
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
          <Heading level={2}>M&A Analyst Workflow</Heading>
          <p className="text-lg text-slate-700 leading-relaxed">
            Due diligence is messy. You have a data room full of internal PDFs and a noisy internet full of news. 
            This workflow shows how to combine NotebookLM (internal view), Perplexity (external view), and Chat (synthesis) to build a clear deal story.
          </p>

          <WorkflowTimeline steps={[
            {
              title: "Summarize the target from core documents",
              tools: ["NotebookLM"],
              summary: "Load the CIM, strategy deck, and key filings to get the story in one place.",
              bullets: [
                "Upload the main deal documents into NotebookLM and create a notebook for this target.",
                "Ask for a one page due diligence brief that covers the business model, revenue mix, and major risks.",
                "Highlight any sections where NotebookLM is uncertain or lacks detail."
              ],
              prompt: {
                label: "Try this prompt in NotebookLM",
                text: "You are an M&A analyst preparing for an internal deal review.\nContext: I have uploaded our CIM, the target's most recent annual filing, and the internal strategy deck to this notebook.\nTask: Write a one page due diligence brief that explains what this company does, how it makes money, and the top three risks or unknowns.\nRequirements: Use plain language, call out open questions clearly, and reference specific documents or sections whenever you mention a risk."
              }
            },
            {
              title: "Pull external context and comps",
              tools: ["Perplexity", "Deep Research"],
              summary: "Check the outside view before you fall in love with the deal.",
              bullets: [
                "Use Perplexity Deep Research to find recent news, key competitors, and any regulatory or technology shifts that matter for this target.",
                "Ask for a short comparison of the target against two to three close public or well known private peers.",
                "Check that all major claims are backed by citations you can click and skim."
              ],
              prompt: {
                label: "Try this prompt in Perplexity",
                text: "You are helping an M&A team sanity check a potential acquisition.\nContext: We are evaluating Company X in the [industry] space. We want to understand the outside view before we commit.\nTask: Use recent, cited sources to summarize market trends, key competitors, and any regulatory or technology shifts that could change the story for Company X in the next three to five years.\nRequirements: Include three to five bullet points on market trends, a short section on the most relevant competitors, and call out any red flags or upside opportunities with citations."
              }
            },
            {
              title: "Pressure test the deal thesis",
              tools: ["NotebookLM", "Perplexity"],
              summary: "Combine internal and external views to stress test your narrative.",
              bullets: [
                "Ask NotebookLM to restate the current deal thesis and generate arguments for and against it using the uploaded documents.",
                "Use Perplexity to look for examples of similar deals that worked well or poorly.",
                "List questions you still need to answer before an investment committee."
              ],
              prompt: {
                label: "Try this prompt in NotebookLM",
                text: "You are an internal deal coach.\nContext: I have a draft deal thesis for acquiring Company X, based on the documents in this notebook and external research.\nTask: List the strongest arguments for this acquisition and the strongest arguments against it, using evidence from the documents and research where possible.\nRequirements: Separate the case for and the case against, flag any assumptions that are not well supported, and end with three questions we should answer before taking this to the investment committee."
              }
            },
            {
              title: "Draft the exec ready summary",
              tools: ["Chat", "Gemini", "ChatGPT"],
              summary: "Turn the work into a short narrative that leaders can react to.",
              bullets: [
                "Combine your brief, external context, and thesis into a three slide story.",
                "Lead with the recommendation, back it with two to three key facts, and end with open questions."
              ],
              prompt: {
                label: "Try this prompt in Chat",
                text: "You are helping an M&A analyst prepare for an executive review.\nContext: I have a due diligence brief, outside market research, and a list of pros, cons, and open questions for acquiring Company X.\nTask: Turn this into a three slide executive summary with a clear recommendation, two to three supporting points, and the key risks and open questions.\nRequirements: Write slide titles and bullet points only, avoid jargon, and keep each slide focused on one idea."
              }
            }
          ]} />
        </div>
      </section>
    ),

    // STEP 3: PROJECT MANAGER
    (
      <section key="project-manager" className="animate-fade-in mb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Heading level={2}>Project Manager Workflow</Heading>
          <p className="text-lg text-slate-700 leading-relaxed">
             Launches are chaotic. You have messy kickoff notes, email threads, and stakeholders who want a clear timeline yesterday. 
             This workflow shows how to use Gemini inside Docs and Sheets to structure the chaos quickly.
          </p>

          <WorkflowTimeline steps={[
            {
              title: "Turn messy notes into a launch brief",
              tools: ["Docs", "Gemini"],
              summary: "Pull the story together from kickoff notes and email threads.",
              bullets: [
                "Paste your raw meeting notes and any key emails into a Doc and ask Gemini to build a structured launch brief.",
                "Clarify goals, audience, channels, and timing.",
                "Flag any decisions that are still missing."
              ],
              prompt: {
                label: "Try this prompt in Gemini for Docs",
                text: "You are a project manager planning a product launch.\nContext: Below are messy kickoff notes and a few email snippets about this launch.\nTask: Turn this into a one page launch brief that captures the goal, target audience, key channels, timing, and owners for major workstreams.\nRequirements: Use clear headings, call out any missing decisions or conflicting information, and keep the brief readable for busy stakeholders."
              }
            },
            {
              title: "Map owners and timeline in Sheets",
              tools: ["Sheets", "Gemini"],
              summary: "Move from text to a structured tracker to see the gaps.",
              bullets: [
                "Open a new Sheet and ask Gemini to create a project tracker based on the brief you just wrote.",
                "Include standard columns like Task, Owner, Due Date, and Status.",
                "Ask it to suggest a 6-week timeline working backward from the launch date."
              ],
              prompt: {
                label: "Try this prompt in Gemini for Sheets",
                text: "You are a project manager setting up a tracker.\nContext: We are launching in 6 weeks. The key workstreams are Marketing, Engineering, and Legal.\nTask: Create a table with columns for Workstream, Owner, Task, Start Date, End Date, and Status.\nRequirements: Pre-fill a sample 6-week timeline with realistic milestones for a standard software launch."
              }
            },
            {
              title: "Create the core project plan doc",
              tools: ["Docs", "Gemini"],
              summary: "Assemble dependencies and risks into a formal plan.",
              bullets: [
                "Use the Help Me Write feature in Docs to expand your brief into a full plan.",
                "Add sections for Risk Management and Stakeholder Communication.",
                "Ensure every major milestone has a clear owner listed."
              ],
              prompt: {
                label: "Try this prompt in Gemini for Docs",
                text: "You are a project manager finalizing a plan.\nContext: I have a launch brief and a timeline tracker.\nTask: Draft a 'Risk Management' section for our project plan.\nRequirements: List 5 potential risks (e.g., scope creep, vendor delays), rate them by impact (High/Med/Low), and propose a one-sentence mitigation strategy for each."
              }
            },
            {
              title: "Draft the first stakeholder update",
              tools: ["Gmail", "Gemini"],
              summary: "Turn status notes into a concise email update.",
              bullets: [
                "Open Gmail and use 'Help me write' to draft a status update for leadership.",
                "Summarize what is on track, what is at risk, and what you need from them.",
                "Keep it short enough to be read on a phone."
              ],
              prompt: {
                label: "Try this prompt in Gmail",
                text: "You are a project manager sending a weekly update.\nContext: The launch is on track for Nov 1st. Marketing assets are approved, but Legal review is delayed by 2 days.\nTask: Draft a short update email to the steering committee.\nRequirements: Use bullet points, highlight the Legal delay as a 'Yellow' status item, and ask for help prioritizing the review."
              }
            }
          ]} />
        </div>
      </section>
    ),

    // STEP 4: ANALYTICS / BI
    (
      <section key="analytics-bi" className="animate-fade-in mb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Heading level={2}>Analytics and BI Workflow</Heading>
          <p className="text-lg text-slate-700 leading-relaxed">
             When a key metric drops, everyone wants an answer immediately. 
             This workflow shows how to use Chat to scope the problem, NotebookLM to review past reports, and Docs to write the narrative.
          </p>

          <WorkflowTimeline steps={[
            {
              title: "Clarify the metric question",
              tools: ["Chat", "Gemini"],
              summary: "Don't start digging until you know exactly what you are digging for.",
              bullets: [
                "Paste the stakeholder's request into Chat to sanity check it.",
                "Ask the AI to list clarifying questions about timeframes, data sources, and definitions.",
                "Use these questions to narrow the scope before you write a single SQL query."
              ],
              prompt: {
                label: "Try this prompt in Chat",
                text: "You are a senior data analyst.\nContext: A stakeholder just emailed asking 'Why is retention down this month?'\nTask: List 5 clarifying questions I should ask to narrow this request down to a solvable problem.\nRequirements: Focus on data definitions (e.g., which user segment?), timeframes (e.g- year-over-year vs month-over-month?), and potential technical causes."
              }
            },
            {
              title: "Summarize what we already know from internal docs",
              tools: ["NotebookLM"],
              summary: "Check past QBRs and memos so you don't reinvent the wheel.",
              bullets: [
                "Upload the last 3 Quarterly Business Reviews (QBRs) and strategy memos to NotebookLM.",
                "Ask if we have seen this trend before and what drove it last time.",
                "Grab quotes or charts from old decks that explain seasonality or known headwinds."
              ],
              prompt: {
                label: "Try this prompt in NotebookLM",
                text: "You are a BI partner reviewing historical performance.\nContext: I have uploaded our Q1, Q2, and Q3 business reviews.\nTask: Summarize every mention of 'retention' or 'churn' volatility.\nRequirements: List the dates when retention dropped previously, the reasons given at the time (e.g., price hikes, outages), and whether those reasons apply to our current situation."
              }
            },
            {
              title: "Generate hypotheses and tests",
              tools: ["Chat", "Gemini"],
              summary: "Brainstorm explanations and how to validate them.",
              bullets: [
                "Share the context you have gathered with Chat and ask for a list of hypotheses.",
                "For each hypothesis, ask for a 'sanity check' data point you can look up quickly.",
                "Prioritize them from 'most likely' to 'edge case'."
              ],
              prompt: {
                label: "Try this prompt in Chat",
                text: "You are a data detective.\nContext: Retention is down 5% MoM. We know seasonality is usually flat this time of year. We recently launched a new onboarding flow.\nTask: List 5 hypotheses for the drop.\nRequirements: For each hypothesis, describe the specific data check I would run to prove or disprove it (e.g., 'Check support ticket volume for login errors')."
              }
            },
            {
              title: "Write the narrative for leadership",
              tools: ["Docs", "Chat"],
              summary: "Turn your findings into a story, not just a dashboard screenshot.",
              bullets: [
                "Paste your findings and key charts into a Doc.",
                "Ask the AI to draft an executive summary that leads with the 'Why,' not the 'What.'",
                "Ensure the tone is objective but definitive where the data supports it."
              ],
              prompt: {
                label: "Try this prompt in Docs",
                text: "You are writing a root cause analysis for the VP of Product.\nContext: I have found that retention dropped because the new onboarding flow has a broken link on mobile devices. This affects 40% of traffic.\nTask: Draft a one-paragraph executive summary.\nRequirements: Start with the root cause (broken mobile link), quantify the impact (40% of traffic affected), and state the fix (engineering is deploying a patch today)."
              }
            }
          ]} />
        </div>
      </section>
    ),

    // STEP 5: AUTOMATED WORKFLOW BUILDER
    (
      <section key="automated-builder" className="animate-fade-in mb-16">
         <div className="max-w-3xl mx-auto">
            <Card 
               className="p-12 border-dashed border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-slate-50/80 transition-all group"
               onClick={() => push('/advanced')}
            >
                <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                   <Workflow className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700">Automated workflow builder coming soon</h3>
                <p className="text-sm text-slate-500 group-hover:text-slate-600">
                  Click to see advanced pilots <ArrowRight className="w-4 h-4 inline ml-1" />
                </p>
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
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600">Gemini & Workspace</h4>
              <p className="text-sm text-slate-500">Master Gemini in Docs, Sheets, and Veo.</p>
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