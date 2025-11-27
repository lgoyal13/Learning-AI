import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button } from '../../../components/ui';
import { Globe, Search, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, Zap, BrainCircuit, Target, BookOpen } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'why-research-tools', title: 'Why Research Tools Exist' },
    { id: 'fast-vs-deep', title: 'Fast vs Deep Research' },
    { id: 'gemini-deep-research', title: 'Gemini for Deep Research' },
    { id: 'perplexity-engine', title: 'Perplexity as a Research Engine' },
    { id: 'choose-tool', title: 'Choosing the Right Tool' },
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
          <section id="why-research-tools" className="mb-12 animate-fade-in">
            <h2>When you need facts, not just chat</h2>
            <p className="text-lg text-slate-700">
              Standard chat models are great conversationalists, but they don't always know what happened this morning. 
              <strong>Research tools</strong> are built differently: they read the live web first, then synthesize an answer.
            </p>
            <p className="text-slate-600">
              Use these tools when accuracy, citations, and recency matter more than speed or creativity.
            </p>

            <div className="my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">What you can do here</h3>
              <p className="text-slate-600 mb-4">
                Instead of opening 15 browser tabs, you can ask an AI agent to read them all and summarize the consensus.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <h4 className="font-bold text-slate-900 mb-3">Best use cases:</h4>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                     Market intelligence & competitor news
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                     Checking recent regulation changes
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                     Scanning news for specific topics ("telematics trends")
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                     Fact-checking a claim with source links
                   </li>
                 </ul>
              </div>
            </div>
          </section>
        );
      case 1:
        return (
          <section id="fast-vs-deep" className="mb-12 animate-fade-in">
            <h2>Two speeds: Fast vs. Deep</h2>
            <p className="mb-6">
              Research tools usually offer two modes. Knowing which one to pick will save you time and frustration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
              <Card className="p-6 border-t-4 border-t-blue-400">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-bold text-slate-900">Fast Mode</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">
                  <strong>Goal:</strong> Quick orientation. Good for scanning headlines, simple definitions, and getting the "gist."
                </p>
                <div className="bg-slate-50 p-3 rounded text-xs font-mono text-slate-600 border border-slate-100">
                  "Give me a quick overview of telematics-based auto insurance."
                </div>
              </Card>

              <Card className="p-6 border-t-4 border-t-purple-600">
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-slate-900">Deep / Reasoning Mode</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">
                  <strong>Goal:</strong> Strategic depth. Good for multi-step analysis, comparisons, and reports you'd show a manager.
                </p>
                <div className="bg-slate-50 p-3 rounded text-xs font-mono text-slate-600 border border-slate-100">
                  "Compare how regulators in US vs EU talk about telematics privacy. Cite 3 recent rulings."
                </div>
              </Card>
            </div>

            <Callout variant="info" title="The Trade-off">
              Deep mode takes longer (sometimes minutes) because it is literally "thinking" and verifying multiple sources. Use it for high-stakes questions.
            </Callout>
          </section>
        );
      case 2:
        return (
          <section id="gemini-deep-research" className="mb-12 animate-fade-in">
            <h2>Gemini & The Google Ecosystem</h2>
            <p className="mb-6">
              Gemini shines when you need to connect web research directly into your workflow (Docs, Slides, Gmail).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-8">
              <li>
                <strong>Deep Research:</strong> It can read dozens of sources to build a structured report.
              </li>
              <li>
                <strong>Integration:</strong> You can export that report straight to a Google Doc or draft an email based on it.
              </li>
            </ul>

            <Card className="p-6 bg-white border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Scenario: The Product Launch Plan</h3>
              <p className="text-sm text-slate-600 mb-6">
                You need a tactical plan for a new launch, grounded in current competitor activity.
              </p>

              <div className="space-y-4">
                <div>
                  <strong className="text-sm text-slate-900 block mb-1">Try this prompt:</strong>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm text-slate-700">
                    "Plan a 3-week campaign for our new renters' insurance product targeting young professionals. Use recent articles about renters' insurance trends. Output a table with week, channel, message, and main CTA."
                  </div>
                </div>

                <div>
                  <strong className="text-sm text-slate-900 block mb-1">Check the work:</strong>
                  <p className="text-sm text-slate-600">
                    Look for the citations (little numbers). Click a few to ensure the "trends" are actually from this year, not 2021.
                  </p>
                </div>

                <div>
                   <strong className="text-sm text-slate-900 block mb-1">Iterate:</strong>
                   <p className="text-sm text-slate-600">
                     "Make the tone more urgent," or "Add SMS touchpoints for Week 2."
                   </p>
                </div>
              </div>
            </Card>
          </section>
        );
      case 3:
        return (
          <section id="perplexity-engine" className="mb-12 animate-fade-in">
            <h2>Perplexity: The Citation Engine</h2>
            <p className="mb-6">
              Think of Perplexity as a search engine that answers you in paragraphs, not blue links. 
              Its superpower is transparency—almost every sentence links back to a source.
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Example: Competitive Intelligence</h3>
              <PromptCard 
                label="Market Scan Prompt"
                prompt={`Provide a competitive intelligence summary for [Industry] in [Time Window]. For each competitor:
1. Cite at least two reputable sources.
2. Summarize their recent launches in 1–2 sentences.
3. Present a table with columns: Competitor, Launch Date, Source Link, Key Feature.`}
              />
              <p className="text-sm text-slate-600 mt-4">
                Adjust the <strong>Time Window</strong> (e.g., "last 30 days") to filter out old noise.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">Tailor it to your role</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <Target className="w-4 h-4 text-purple-600 mt-0.5" />
                  <strong>Product Manager:</strong> "Summarize user complaints about [Competitor App] from Reddit and Twitter."
                </li>
                <li className="flex gap-2">
                  <Target className="w-4 h-4 text-purple-600 mt-0.5" />
                  <strong>Marketer:</strong> "Find viral trends related to [Topic] in the last week."
                </li>
                <li className="flex gap-2">
                  <Target className="w-4 h-4 text-purple-600 mt-0.5" />
                  <strong>Risk/Ops:</strong> "List regulatory changes for [Industry] in [Region] effective 2025."
                </li>
              </ul>
            </div>
          </section>
        );
      case 4:
        return (
          <section id="choose-tool" className="mb-12 animate-fade-in">
            <h2>The Research Rule of Thumb</h2>
            <p className="mb-8 text-lg text-slate-700">
              You don’t need to be a "power user." You just need to know which tool fits the question.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 not-prose">
              <Card className="p-4 border-t-4 border-t-slate-400">
                <h3 className="font-bold text-slate-900 mb-2">Use Chat when...</h3>
                <p className="text-sm text-slate-600">
                  You are brainstorming or drafting based on knowledge you <strong>already have</strong>. No need for citations.
                </p>
              </Card>

              <Card className="p-4 border-t-4 border-t-blue-500">
                <h3 className="font-bold text-slate-900 mb-2">Use NotebookLM when...</h3>
                <p className="text-sm text-slate-600">
                  The answer is hidden in your <strong>own files</strong> (PDFs, docs). You trust your own data more than the web.
                </p>
              </Card>

              <Card className="p-4 border-t-4 border-t-purple-600">
                <h3 className="font-bold text-slate-900 mb-2">Use Research Tools when...</h3>
                <p className="text-sm text-slate-600">
                  You need <strong>external facts</strong>, news, or market data. You need to see the source to believe it.
                </p>
              </Card>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Troubleshooting
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                   <span><strong>Generic answers?</strong> Narrow the scope. Add a region, persona, or time frame.</span>
                </li>
                <li className="flex gap-2 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                   <span><strong>Suspicious facts?</strong> Click the citation. If the link is broken or the text doesn't match, the AI hallucinated.</span>
                </li>
                <li className="flex gap-2 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                   <span><strong>Need a report?</strong> Ask for structure. "Format as an executive summary with bullet points."</span>
                </li>
              </ul>
            </div>

            {/* Resource Hook */}
            <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <BookOpen className="w-5 h-5 text-slate-500" />
               <div className="flex-1 text-sm text-slate-600">
                 Want real-world walkthroughs of Perplexity and Gemini?
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
      title="Research & Web: Beyond Google"
      description="Learn how to use AI research tools (like Perplexity or Gemini) to gather live facts, citations, and competitive intelligence in minutes."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules/tool-documents"
    >
      {/* Progress Bar */}
      <div className="mb-8">
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

      {/* Content Area */}
      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation Footer */}
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