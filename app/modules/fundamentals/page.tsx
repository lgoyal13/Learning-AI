import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button } from '../../../components/ui';
import { 
  BrainCircuit, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert,
  FileText,
  Lock,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // State for Section 2 (Hallucination Quiz)
  const [hallucinationGuess, setHallucinationGuess] = useState<'a' | 'b' | null>(null);

  const sections = [
    { id: 'model-behavior', title: 'What an AI Model Actually Does' },
    { id: 'trust-gap', title: 'Why Smart Answers Can Still Be Wrong' },
    { id: 'default-habits', title: 'Your New Default Habits' },
    { id: 'safe-prompting', title: 'Safe Prompting at Work' },
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
      case 0: // What an AI Model Actually Does
        return (
          <section id="model-behavior" className="mb-12 animate-fade-in">
            <h2>What an AI model is actually doing</h2>
            <p className="text-lg text-slate-700 mb-6">
              It helps to understand the difference between a <strong>Search Engine</strong> and <strong>Generative AI</strong>. 
              Search looks up an existing file. AI predicts the next word in a sentence based on patterns it has learned.
            </p>
            <p className="text-slate-600 mb-8">
              It isn't "looking up the truth." It is playing a very advanced game of "Autocomplete."
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center mb-10">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">The Pattern Prediction Game</h3>
              <p className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                "The quick brown fox jumps over the..."
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-mono text-sm font-bold animate-pulse">
                prediction: "lazy dog"
              </div>
              <p className="text-sm text-slate-500 mt-4 max-w-lg mx-auto">
                The model doesn't "know" there is a dog. It just knows that statistically, "lazy dog" almost always follows "jumps over the".
              </p>
            </div>

            <h3 className="font-bold text-slate-900 mb-4">Where this "Autocomplete" shines:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
              <Card className="p-4 border-l-4 border-l-blue-500">
                <div className="flex items-center gap-2 mb-2 font-bold text-blue-900">
                  <FileText className="w-5 h-5" /> Drafting Emails
                </div>
                <p className="text-sm text-slate-600">Predicting polite, professional phrases to fill a blank page.</p>
              </Card>
              <Card className="p-4 border-l-4 border-l-purple-500">
                <div className="flex items-center gap-2 mb-2 font-bold text-purple-900">
                  <MessageSquare className="w-5 h-5" /> Summarizing
                </div>
                <p className="text-sm text-slate-600">Predicting a shorter version of the text you provide.</p>
              </Card>
              <Card className="p-4 border-l-4 border-l-emerald-500">
                <div className="flex items-center gap-2 mb-2 font-bold text-emerald-900">
                  <BrainCircuit className="w-5 h-5" /> Transforming
                </div>
                <p className="text-sm text-slate-600">Turning a messy list into a clean, formatted table.</p>
              </Card>
            </div>
          </section>
        );

      case 1: // Why Smart Answers Can Still Be Wrong
        return (
          <section id="trust-gap" className="mb-12 animate-fade-in">
            <h2>Why smart-sounding answers can still be wrong</h2>
            <p className="text-lg text-slate-700 mb-6">
              Because the AI is optimized to be <em>helpful</em> and <em>fluent</em>, it hates to say "I don't know." 
              If it doesn't have the answer, it might fill in the gap with something that sounds plausible but is completely made up.
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Quiz: Spot the Hallucination</h3>
              <p className="text-slate-600 text-sm mb-4">You asked: "What is our travel policy for ride-shares?" Which answer is suspicious?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Answer A */}
                <Card className={`p-5 cursor-pointer border-2 transition-all ${hallucinationGuess === 'a' ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-blue-300'}`} onClick={() => setHallucinationGuess('a')}>
                   <div className="text-xs font-bold text-slate-500 uppercase mb-2">Answer A</div>
                   <p className="text-sm text-slate-800 mb-4">
                     "According to the 2024 Travel Policy (Document ID #9921), employees are permitted to use Uber/Lyft for trips under 20 miles. Reimbursement is capped at $50 per ride."
                   </p>
                   <p className="text-xs text-blue-600 underline">Source: Global_Travel_Policy_v2.pdf</p>
                </Card>

                {/* Answer B */}
                <Card className={`p-5 cursor-pointer border-2 transition-all ${hallucinationGuess === 'b' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-blue-300'}`} onClick={() => setHallucinationGuess('b')}>
                   <div className="text-xs font-bold text-slate-500 uppercase mb-2">Answer B</div>
                   <p className="text-sm text-slate-800 mb-4">
                     "Based on the Employee Handbook guidelines I have access to, standard ride-share services are generally reimbursable for business travel. Please refer to the specific expense limits in your regional addendum."
                   </p>
                   <p className="text-xs text-blue-600 underline">Source: Handbook_2024.pdf</p>
                </Card>
              </div>

              {hallucinationGuess === 'a' && (
                <div className="bg-green-100 border border-green-200 rounded-lg p-4 flex gap-3 animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 text-green-700 shrink-0" />
                  <div>
                    <strong className="text-green-800 block">Correct! Answer A is suspicious.</strong>
                    <p className="text-green-800 text-sm mt-1">
                      It cites a specific "Document ID #9921" and a very specific "$50 cap." 
                      If the AI invents specific numbers or IDs that don't exist in your files, that is a hallmark hallucination. It looks <em>too</em> perfect.
                    </p>
                  </div>
                </div>
              )}

              {hallucinationGuess === 'b' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 animate-fade-in">
                   <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0" />
                   <div>
                     <strong className="text-yellow-800 block">Not quite. Answer B is actually safer.</strong>
                     <p className="text-yellow-800 text-sm mt-1">
                       Answer B is vague ("generally reimbursable"), which is safer. Answer A invented a specific Document ID (#9921) and a $50 cap that might not exist. 
                       Specific numbers are often red flags.
                     </p>
                   </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border-t border-slate-200 pt-6">
              <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Red Flags to Watch For
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-red-500">•</span> Overconfident tone with zero uncertainty.</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Citations that don't match the claim when you click them.</li>
                <li className="flex gap-2"><span className="text-red-500">•</span> Specific IDs, dates, or dollar amounts that appear nowhere in the source text.</li>
              </ul>
            </div>
          </section>
        );

      case 2: // Your New Default Habits
        return (
          <section id="default-habits" className="mb-12 animate-fade-in">
            <h2>Your new default habits</h2>
            <p className="text-lg text-slate-700 mb-8">
              You don't need to be a prompt engineer to use AI safely. You just need to change how you read the output.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-white border-blue-200 shadow-sm flex flex-col">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg w-fit mb-4">
                   <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">1. Skim for Plausibility</h3>
                <p className="text-sm text-slate-600">
                  Ask yourself: "Does this sound like us?" If the tone is weird or the product names are slightly off, dig deeper.
                </p>
              </Card>

              <Card className="p-6 bg-white border-blue-200 shadow-sm flex flex-col">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg w-fit mb-4">
                   <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">2. Verify Facts</h3>
                <p className="text-sm text-slate-600">
                  If it gives you a number, a date, or a policy clause, check the original document. Never trust a naked fact from an LLM.
                </p>
              </Card>

              <Card className="p-6 bg-white border-blue-200 shadow-sm flex flex-col">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg w-fit mb-4">
                   <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">3. Re-ask to Check</h3>
                <p className="text-sm text-slate-600">
                  If something feels off, challenge the AI: "Are you sure about that policy limit? Please quote the exact sentence."
                </p>
              </Card>

              <Card className="p-6 bg-white border-blue-200 shadow-sm flex flex-col">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg w-fit mb-4">
                   <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">4. No Blind Copy-Paste</h3>
                <p className="text-sm text-slate-600">
                  You are the pilot. The AI is the co-pilot. You must read and own every word you send out.
                </p>
              </Card>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-start gap-3">
              <div className="mt-1">
                 <CheckCircle2 className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                 <strong className="text-sm text-slate-900 block mb-1">Cheat Sheet Prompt:</strong>
                 <p className="text-sm text-slate-600 font-mono">
                   "Draft this email for me. Then, list 3 reasons why your draft might be incomplete or need my review."
                 </p>
              </div>
            </div>
          </section>
        );

      case 3: // Safe Prompting at Work
        return (
          <section id="safe-prompting" className="mb-12 animate-fade-in">
            <h2>Safe prompting at work</h2>
            <p className="text-lg text-slate-700 mb-6">
              Use AI for <strong>thinking and drafting</strong>, not for <strong>storing secrets</strong>. 
              Once you type data into a public model, you cannot get it back.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 font-bold uppercase text-xs tracking-wider">
                  <XCircle className="w-4 h-4" /> Unsafe Prompt
                </div>
                <Card className="p-5 bg-red-50 border-red-200">
                  <p className="text-sm text-slate-700 font-mono mb-2">
                    "Write a collection letter to <span className="bg-red-200 font-bold px-1">John Smith</span> at <span className="bg-red-200 font-bold px-1">Acme Corp</span> regarding invoice <span className="bg-red-200 font-bold px-1">#992-AZ</span> for $50,000 that is 90 days overdue."
                  </p>
                  <p className="text-xs text-red-700 font-bold mt-3">
                    Why: PII (Names) + Financial Data.
                  </p>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-bold uppercase text-xs tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> Safer Rewrite
                </div>
                <Card className="p-5 bg-green-50 border-green-200">
                  <p className="text-sm text-slate-700 font-mono mb-2">
                    "Write a polite but firm collection letter to <span className="bg-green-200 font-bold px-1 text-green-900">[Client Name]</span> regarding an invoice that is 90 days overdue. Emphasize that we want to maintain the relationship."
                  </p>
                  <p className="text-xs text-green-700 font-bold mt-3">
                    Why: Focuses on the <em>task</em>, not the <em>data</em>.
                  </p>
                </Card>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
               <h3 className="font-bold text-slate-900 mb-4">Never paste these into public AI:</h3>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                 <li className="flex gap-2"><span className="text-red-500 font-bold">×</span> Full names of customers or employees</li>
                 <li className="flex gap-2"><span className="text-red-500 font-bold">×</span> Account numbers or claim IDs</li>
                 <li className="flex gap-2"><span className="text-red-500 font-bold">×</span> Confidential strategy docs</li>
                 <li className="flex gap-2"><span className="text-red-500 font-bold">×</span> Passwords or API keys</li>
               </ul>
            </div>

            <Callout variant="warning" title="When in doubt, ask yourself:">
               <p className="mt-1 font-medium text-amber-900">
                 "Would I email this text to an external vendor?"
               </p>
               <p className="mt-1 text-sm text-amber-800">
                 If the answer is no, do not paste it into a public AI tool.
               </p>
            </Callout>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="AI Fundamentals & Safe Use"
      description="Understand what modern AI is actually doing, why it sometimes makes things up, and the simple habits that keep you safe at work."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules/prompting"
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