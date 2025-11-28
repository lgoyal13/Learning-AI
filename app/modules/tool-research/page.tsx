import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button } from '../../../components/ui';
import { Globe, Search, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, Zap, BrainCircuit, Target, BookOpen, MousePointerClick, List, Clock, ExternalLink } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [researchMode, setResearchMode] = useState<'quick' | 'deep'>('quick');

  const sections = [
    { id: 'why-research', title: 'Why Research Tools Exist' },
    { id: 'fast-vs-deep', title: 'Fast vs Deep Research' },
    { id: 'perplexity', title: 'Perplexity: The Citation Engine' },
    { id: 'interaction', title: 'Quick Check vs Deep Research' },
    { id: 'troubleshooting', title: 'Choosing & Troubleshooting' },
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
          <section id="why-research" className="mb-12 animate-fade-in">
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
              Deep mode takes longer (sometimes minutes) because it is literally "thinking," performing multiple searches, and verifying sources. Use it for high-stakes questions.
            </Callout>
          </section>
        );
      case 2:
        return (
          <section id="perplexity" className="mb-12 animate-fade-in">
            <h2>Perplexity: The Citation Engine</h2>
            <p className="mb-6">
              Think of Perplexity as a search engine that answers you in paragraphs, not blue links. 
              Its superpower is transparency—almost every sentence links back to a source.
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Template: Competitive Intel Scan</h3>
              <p className="text-sm text-slate-600 mb-4">
                Use this template to generate a professional briefing doc in minutes. Fill in the placeholders (brackets).
              </p>
              
              <PromptCard 
                label="Competitive Intel Template"
                prompt={`Conduct a competitive intelligence scan for the [Industry] industry in [Region] regarding [Topic]. Time window: last [Time Window].

For each major competitor (find at least 3):
1. Cite at least two reputable sources (news, press release, official blog).
2. Summarize their recent activity in 1–2 sentences.
3. Present a table with columns: Competitor, Launch Date, Source Link, Key Feature.

Finally, write a short narrative summary of the overall market trend.`}
              />
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
      case 3:
        return (
          <section id="interaction" className="mb-12 animate-fade-in">
            <h2>Quick check vs Deep Research</h2>
            <p className="mb-6">
              Not every question needs a 5-minute deep dive. Toggle below to see how the answer shape changes based on the mode.
            </p>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                <button
                  onClick={() => setResearchMode('quick')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${researchMode === 'quick' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Zap className="w-4 h-4 inline mr-2" /> Quick Check
                </button>
                <button
                  onClick={() => setResearchMode('deep')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${researchMode === 'deep' ? 'bg-white shadow text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <BrainCircuit className="w-4 h-4 inline mr-2" /> Deep Research
                </button>
              </div>

              <div className="p-8 min-h-[300px]">
                {researchMode === 'quick' && (
                  <div className="animate-fade-in">
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-xs font-bold text-blue-600 uppercase mb-2">Prompt</p>
                      <p className="text-sm text-blue-900 font-mono">"What is the starting price of the Tesla Model 3?"</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900">Typical Output</h4>
                      <div className="text-sm text-slate-700 leading-relaxed border-l-2 border-slate-300 pl-4">
                        The Tesla Model 3 currently starts at approximately <strong>$38,990</strong> for the rear-wheel drive version in the US, before incentives. Prices vary by region.
                        <br/><br/>
                        <span className="text-xs text-slate-500">Source: tesla.com/model3</span>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-2">When to use:</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Fact checking a single number.</li>
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Simple definitions.</li>
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> "Sanity check" before a meeting.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {researchMode === 'deep' && (
                  <div className="animate-fade-in">
                     <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                      <p className="text-xs font-bold text-purple-600 uppercase mb-2">Prompt</p>
                      <p className="text-sm text-purple-900 font-mono">"Analyze EV pricing trends for Q3 2024. Compare Tesla, Ford, and BYD."</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900">Typical Output (Snippet)</h4>
                      <div className="text-sm text-slate-700 leading-relaxed border-l-2 border-purple-300 pl-4">
                        <strong className="block text-slate-900 mb-2">Executive Summary: Aggressive Price Cuts Continue</strong>
                        <p className="mb-2">
                          In Q3 2024, the EV market saw continued price wars driven by saturation in the Chinese market and interest rate pressures in the US.
                        </p>
                        <div className="bg-slate-50 p-3 rounded border border-slate-200 my-3 font-mono text-xs">
                          | Brand | Strategy | Avg Price Change | Source |<br/>
                          |-------|----------|------------------|--------|<br/>
                          | Tesla | Volume   | -4.5%            | [1]    |<br/>
                          | Ford  | Hybrid   | -2.0%            | [2]    |<br/>
                          | BYD   | Export   | -8.0%            | [3]    |
                        </div>
                        <p>
                          <strong>Key Driver:</strong> BYD's new export incentives have forced competitors to lower margins...
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-2">When to use:</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Market analysis reports.</li>
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Competitive landscape scans.</li>
                           <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Understanding complex cause-and-effect.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      case 4:
        return (
          <section id="troubleshooting" className="mb-12 animate-fade-in">
            <h2>Choosing & Troubleshooting</h2>
            <p className="mb-8 text-lg text-slate-700">
              Even powerful tools can fail. Here is how to fix common issues when researching with AI.
            </p>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Troubleshooting Guide
              </h3>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex gap-3 items-start">
                   <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                   <div>
                     <strong>Generic answers?</strong>
                     <p className="text-slate-600">The scope is too broad. Add constraints: "Focus only on the US market" or "Ignore articles older than 3 months."</p>
                   </div>
                </li>
                <li className="flex gap-3 items-start">
                   <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                   <div>
                     <strong>Weird sources?</strong>
                     <p className="text-slate-600">Explicitly ask it to exclude them: "Do not cite forums like Reddit or Quora. Use only major news outlets."</p>
                   </div>
                </li>
                <li className="flex gap-3 items-start">
                   <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                   <div>
                     <strong>Too slow?</strong>
                     <p className="text-slate-600">You might be using Deep Research for a simple fact check. Switch back to "Standard" or "Quick" mode.</p>
                   </div>
                </li>
              </ul>
            </div>

            <Callout variant="info" title="Go Deeper" className="flex items-center justify-between">
               <span>See advanced Deep Research guides in the Resource Library.</span>
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
      title="Research & Web: Perplexity and Deep Research"
      description="Use AI research tools to go beyond simple chat. Learn when to use quick answers, when to turn on Deep Research, and how to run credible competitive and market scans."
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