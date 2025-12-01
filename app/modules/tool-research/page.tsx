import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button, Badge } from '../../../components/ui';
import { 
  Globe, Search, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, 
  Zap, BrainCircuit, Target, BookOpen, Filter, MapPin, Calendar, 
  FileText, ExternalLink, MousePointerClick
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page({ onBack }: { onBack?: () => void }) {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [researchMode, setResearchMode] = useState<'quick' | 'deep'>('quick');

  const sections = [
    { id: 'intro', title: 'The Research Engine' },
    { id: 'modes', title: 'Fast vs. Deep Mode' },
    { id: 'formula', title: 'The Research Prompt Formula' },
    { id: 'playbook', title: 'Role-Based Playbook' },
    { id: 'trust', title: 'Trust & Verification' },
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
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Research Engine</h2>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl">
              Standard chatbots are like very well-read improvisers—they know a lot, but they often guess when they don't know the specifics.
              <br/><br/>
              <strong>Research tools</strong> (like Perplexity or Gemini with Google Search) work differently. They browse the live web, read dozens of sources in seconds, and synthesize an answer with citations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-blue-50 border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">It Reads for You</h3>
                </div>
                <p className="text-slate-700">
                  Instead of giving you 10 blue links to click through, it reads the pages and summarizes the answer.
                </p>
              </Card>

              <Card className="p-6 bg-purple-50 border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">It Cites Sources</h3>
                </div>
                <p className="text-slate-700">
                  Good research tools show their work. Every claim usually has a little number [1] you can click to verify.
                </p>
              </Card>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">After this module you will be able to:</h3>
               <ul className="space-y-3 text-sm text-slate-700">
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Choose between "Fast" and "Deep" research modes.
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Write prompts that force the AI to look at specific timeframes and sources.
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                   Quickly verify citations to catch hallucinations.
                 </li>
               </ul>
            </div>
          </section>
        );

      case 1: // MODES (Interactive)
        return (
          <section id="modes" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Fast vs. Deep Mode</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Research tools usually offer two speeds. Knowing which one to pick will save you time and frustration.
            </p>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8">
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                <button
                  onClick={() => setResearchMode('quick')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${researchMode === 'quick' ? 'bg-white shadow text-blue-600 ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                >
                  <Zap className="w-4 h-4" /> Quick Check
                </button>
                <button
                  onClick={() => setResearchMode('deep')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${researchMode === 'deep' ? 'bg-white shadow text-purple-600 ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                >
                  <BrainCircuit className="w-4 h-4" /> Deep Research
                </button>
              </div>

              <div className="p-6 md:p-8 min-h-[400px]">
                {researchMode === 'quick' && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="md:col-span-1 space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-xs font-bold text-blue-600 uppercase mb-2">Best For</p>
                          <ul className="text-sm text-blue-900 space-y-2">
                            <li>• Fact checking</li>
                            <li>• Definitions</li>
                            <li>• Getting the "gist"</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                           <p className="text-xs font-bold text-slate-500 uppercase mb-2">Wait time</p>
                           <p className="text-slate-900 font-bold">5-10 seconds</p>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 space-y-4">
                        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                           <p className="text-xs font-bold text-slate-400 uppercase mb-2">Example Prompt</p>
                           <p className="text-slate-900 font-mono text-sm">"What is the starting price of the Tesla Model 3 in the US right now?"</p>
                        </div>
                        
                        <div className="relative pl-6 border-l-2 border-blue-200 space-y-2">
                           <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                           <p className="text-xs font-bold text-blue-600 uppercase">Output</p>
                           <p className="text-sm text-slate-700 leading-relaxed">
                             The Tesla Model 3 currently starts at approximately <strong>$38,990</strong> for the rear-wheel drive version, before incentives. Prices vary by region.
                           </p>
                           <div className="flex gap-2 mt-2">
                             <Badge variant="neutral" className="text-[10px]"><ExternalLink className="w-3 h-3 mr-1"/> tesla.com</Badge>
                             <Badge variant="neutral" className="text-[10px]"><ExternalLink className="w-3 h-3 mr-1"/> caranddriver.com</Badge>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {researchMode === 'deep' && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="md:col-span-1 space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <p className="text-xs font-bold text-purple-600 uppercase mb-2">Best For</p>
                          <ul className="text-sm text-purple-900 space-y-2">
                            <li>• Market analysis</li>
                            <li>• Competitor scans</li>
                            <li>• Complex topics</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                           <p className="text-xs font-bold text-slate-500 uppercase mb-2">Wait time</p>
                           <p className="text-slate-900 font-bold">1-5 minutes</p>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 space-y-4">
                        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                           <p className="text-xs font-bold text-slate-400 uppercase mb-2">Example Prompt</p>
                           <p className="text-slate-900 font-mono text-sm">"Analyze EV pricing trends for Q3 2024. Compare Tesla, Ford, and BYD strategies."</p>
                        </div>
                        
                        <div className="relative pl-6 border-l-2 border-purple-200 space-y-2">
                           <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                           <p className="text-xs font-bold text-purple-600 uppercase">Output</p>
                           <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                             <p><strong>Executive Summary:</strong> In Q3 2024, the EV market saw continued price wars driven by saturation in Asia and interest rates in the US.</p>
                             <div className="bg-slate-50 p-2 rounded border border-slate-200 text-xs font-mono">
                               | Brand | Strategy | Price Change |<br/>
                               |-------|----------|--------------|<br/>
                               | Tesla | Volume   | -4.5% [1]    |<br/>
                               | Ford  | Hybrid   | -2.0% [2]    |<br/>
                               | BYD   | Export   | -8.0% [3]    |
                             </div>
                             <p><strong>Key Insight:</strong> BYD's aggressive export incentives have forced competitors to defend market share at the cost of margin...</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Callout variant="info" title="Pro Tip">
              Start with <strong>Quick Check</strong>. If the answer feels too shallow, tell the tool: "Go deeper and create a report on this."
            </Callout>
          </section>
        );

      case 2: // FORMULA
        return (
          <section id="formula" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Research Prompt Formula</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              When searching the web, the AI needs boundaries. If you don't give it constraints, it will give you a generic Wikipedia-style summary.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <Card className="p-4 border-l-4 border-l-blue-500">
                  <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                    <Calendar className="w-5 h-5 text-blue-500" /> Timeframe
                  </div>
                  <p className="text-sm text-slate-600">"In the last 6 months..." or "Projections for 2025..."</p>
               </Card>
               <Card className="p-4 border-l-4 border-l-purple-500">
                  <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                    <MapPin className="w-5 h-5 text-purple-500" /> Geography
                  </div>
                  <p className="text-sm text-slate-600">"In the US Market..." or "EU Regulations..."</p>
               </Card>
               <Card className="p-4 border-l-4 border-l-emerald-500">
                  <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                    <Filter className="w-5 h-5 text-emerald-500" /> Source Type
                  </div>
                  <p className="text-sm text-slate-600">"Cite only major news outlets..." or "Ignore forums/blogs..."</p>
               </Card>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4">The Formula in Action</h3>
              <PromptCard 
                label="Research Prompt Template"
                prompt={`Act as a Market Analyst.

Task: Research [Topic, e.g., adoption of AI in legal firms].

Constraints:
1. Focus on [Geography, e.g., the UK market].
2. Look for data from [Timeframe, e.g., the last 12 months].
3. Cite only [Source Type, e.g., industry reports and reputable news].

Output:
- A summary of the top 3 trends.
- A table of key statistics with source links.
- 3 strategic implications.`}
              />
            </div>
          </section>
        );

      case 3: // PLAYBOOK
        return (
          <section id="playbook" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Role-Based Playbook</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Here is how different roles use research tools to save hours of Googling.
            </p>

            <div className="space-y-6">
              {/* Marketing */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                    <Target className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Marketing & Strategy</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Use research tools to find trends, benchmarks, and competitor moves.
                  </p>
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 font-mono text-xs text-slate-700">
                    "Find the average email open rates for B2B SaaS in 2024. Cite 3 recent reports and break it down by region."
                  </div>
                </div>
              </div>

              {/* Ops */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Ops & Project Management</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Use research tools to compare software, vendors, or regulations.
                  </p>
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 font-mono text-xs text-slate-700">
                    "Create a comparison table for Asana vs Monday.com vs ClickUp. Include pricing for enterprise tiers, AI features, and compliance certifications."
                  </div>
                </div>
              </div>

              {/* Sales/CS */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Globe className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Sales & Customer Success</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Use research tools to prep for a meeting by understanding the client's recent news.
                  </p>
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 font-mono text-xs text-slate-700">
                    "I have a meeting with [Company Name]. Summarize their last 2 earnings calls and any major product launches from the last 6 months."
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 4: // TRUST
        return (
          <section id="trust" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Trust & Verification</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Even with citations, AI can make mistakes. It might cite a 2019 article as "recent" or misinterpret a paywalled report.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-t-4 border-t-amber-500">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> Common Pitfalls
                </h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex gap-3 items-start">
                     <span className="font-bold text-amber-600">1.</span>
                     <div>
                       <strong>Date Confusion:</strong>
                       <p className="text-slate-600">Always check the date of the citation. "Recent" might mean 3 years ago to an AI.</p>
                     </div>
                  </li>
                  <li className="flex gap-3 items-start">
                     <span className="font-bold text-amber-600">2.</span>
                     <div>
                       <strong>Paywalls:</strong>
                       <p className="text-slate-600">If a source is paywalled, the AI might guess the content from the headline. Verify the actual text.</p>
                     </div>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-t-4 border-t-green-500">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> Verification Routine
                </h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex gap-3 items-start">
                     <span className="font-bold text-green-600">1.</span>
                     <div>
                       <strong>Click One Link:</strong>
                       <p className="text-slate-600">Randomly click one citation. Does it actually say what the AI claims it says?</p>
                     </div>
                  </li>
                  <li className="flex gap-3 items-start">
                     <span className="font-bold text-green-600">2.</span>
                     <div>
                       <strong>Ask for "Direct Quotes":</strong>
                       <p className="text-slate-600">If a number looks wrong, ask: "Quote the specific sentence from the report where you found this number."</p>
                     </div>
                  </li>
                </ul>
              </Card>
            </div>

            <Callout variant="info" title="Final Rule">
               Research tools are for <strong>discovery</strong>. You are still responsible for <strong>accuracy</strong>. Never paste a stat into a client deck without clicking the source link first.
            </Callout>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="Research & Web: The Citation Engine"
      description="Learn how to use AI to scan the live web, find facts, and build reports with real citations—without getting lost in 50 open tabs."
      duration="15 mins"
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