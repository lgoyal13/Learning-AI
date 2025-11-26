import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button } from '../../../components/ui';
import { ShieldAlert, UserCheck, Eye, Lock, CheckCircle2, XCircle, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Page() {
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'intro', title: 'The Trust Imperative' },
    { id: 'pii', title: 'The Golden Rule (PII)' },
    { id: 'hitl', title: 'Human in the Loop' },
    { id: 'quiz', title: 'Scenario Challenge' },
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

  const sectionContent = [
    // SECTION 1: INTRO
    (
      <section key="intro" id="intro" className="mb-12 animate-fade-in">
        <h2>The Trust Imperative</h2>
        <p>
          As a business, our product is <strong>trust</strong>. Our clients trust us with their most sensitive data—financial records, strategic plans, and personal details.
        </p>
        <p>
          AI helps us serve them faster, but it also introduces new risks. This module isn't about scaring you; it's about giving you the <strong>license to operate</strong> safely.
        </p>
        <Callout variant="info" title="The Core Principle">
          You are the Pilot. AI is the Co-pilot. You are responsible for the flight, not the machine.
        </Callout>
      </section>
    ),

    // SECTION 2: PII
    (
      <section key="pii" id="pii" className="mb-12 animate-fade-in">
        <h2 className="flex items-center gap-2">
          <Lock className="w-6 h-6 text-blue-600" />
          The Golden Rule: Protect PII
        </h2>
        <p>
          <strong>PII (Personally Identifiable Information)</strong> and <strong>SPII (Sensitive PII)</strong> are radioactive to public AI models. Once you paste data into a public tool, you may lose control of it.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-bold mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5"/> Never Input This:
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>❌ Full Names (John Doe)</li>
              <li>❌ Account Numbers (ACCT-12345678)</li>
              <li>❌ Social Security Numbers</li>
              <li>❌ Employee Salary Data</li>
              <li>❌ Specific Addresses</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5"/> Safe to Input:
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>✅ Generic Roles ("The Client")</li>
              <li>✅ Generalized Problems ("Budget Issues")</li>
              <li>✅ Public Contract Wording ("Section 4.a")</li>
              <li>✅ Internal Meeting Notes (Anonymized)</li>
              <li>✅ Excel Formulas / SQL Queries (No data)</li>
            </ul>
          </div>
        </div>

        <h3>How to Anonymize (The "Mad Libs" Method)</h3>
        <p>Before you prompt, strip the data. Replace specifics with placeholders.</p>
        <Card className="p-4 bg-slate-100 font-mono text-sm not-prose">
          <p className="line-through text-red-500 mb-2">
            "Write a rejection for John Smith (Account #999) regarding his refund request for the Manhattan project."
          </p>
          <p className="text-green-600">
            "Write a rejection for <span className="font-bold">[Client]</span> regarding refund request excluded under <span className="font-bold">[Contract Clause]</span>."
          </p>
        </Card>
      </section>
    ),

    // SECTION 3: HUMAN IN THE LOOP
    (
      <section key="hitl" id="hitl" className="mb-12 animate-fade-in">
        <h2 className="flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-blue-600" />
          Human in the Loop (HITL)
        </h2>
        <p>
          "Automated Decision Making" is often regulated. We <strong>never</strong> let AI make the final call on hiring, lending, or legal matters.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 items-center bg-blue-50 p-6 rounded-xl border border-blue-100 not-prose">
          <div className="flex-1">
            <h3 className="text-blue-900 font-bold text-lg mb-2">The 80/20 Rule</h3>
            <p className="text-slate-700">
              Let AI do the heavy lifting (80% of the work)—drafting, summarizing, researching. 
              <br/><br/>
              <strong>You do the final 20%</strong>: Verifying facts, checking tone, and making the decision.
            </p>
          </div>
          <div className="shrink-0 bg-white p-4 rounded-full shadow-sm">
             <div className="text-center">
               <span className="block text-3xl font-bold text-blue-600">You</span>
               <span className="text-xs text-slate-500 uppercase tracking-wide">Sign the work</span>
             </div>
          </div>
        </div>

        <h3 className="mt-6">Beware of Hallucinations</h3>
        <p>
          AI loves to please. If you ask it about a specific contract clause that doesn't exist, it might invent one just to be helpful. 
          <strong>Always verify output against the actual source document.</strong>
        </p>
      </section>
    ),

    // SECTION 4: SCENARIO QUIZ
    (
      <section key="quiz" id="quiz" className="mb-12 pt-8 border-t border-slate-200 animate-fade-in">
        <h2 className="flex items-center gap-2">
          <Eye className="w-6 h-6 text-yellow-600" /> 
          Scenario Challenge
        </h2>
        <p className="mb-6">Test your judgment.</p>

        <Card className="p-6 bg-slate-50 not-prose">
          <div className="flex items-start gap-4">
             <div className="bg-white p-2 rounded border border-slate-200 shadow-sm shrink-0">
                <FileText className="w-8 h-8 text-slate-400" />
             </div>
             <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">The HR Investigation</h3>
                <p className="text-slate-600 mb-4">
                  You have a PDF transcript of an employee relations interview. 
                  You need a timeline of events. You plan to upload the PDF to the "Enterprise AI" internal tool to summarize it.
                </p>
                <p className="font-medium text-slate-900 mb-4">Is this safe?</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => { setQuizAnswer('unsafe'); setShowExplanation(true); }}
              className={`text-left p-4 rounded border-2 transition-all ${
                quizAnswer === 'unsafe' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-bold block mb-1">No, it contains sensitive personal data.</span>
              <span className="text-sm text-slate-500">I must manually summarize it.</span>
            </button>

            <button
              onClick={() => { setQuizAnswer('safe'); setShowExplanation(true); }}
              className={`text-left p-4 rounded border-2 transition-all ${
                quizAnswer === 'safe' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-bold block mb-1">Yes, but check the tool.</span>
              <span className="text-sm text-slate-500">If "Enterprise AI" is approved for Restricted data, I can proceed.</span>
            </button>
          </div>

          {showExplanation && (
            <div className="mt-6 animate-fade-in">
              {quizAnswer === 'safe' ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg flex gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="font-bold">Correct!</p>
                    <p className="text-sm mt-1">
                      This is a trick question! The context says "Enterprise AI" (our <strong>internal</strong> tool). 
                      If IT Compliance has certified this tool for Internal Restricted data, you CAN use it. 
                      However, you could NEVER upload this to a public tool like ChatGPT.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg flex gap-3">
                  <ShieldAlert className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="font-bold">It depends.</p>
                    <p className="text-sm mt-1">
                      You are right to be cautious! If this were a public tool, it would be a major violation. 
                      Since it's an internal tool, check the "Approved Tools" list. Many internal instances are secure for business data.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </section>
    )
  ];

  return (
    <ModuleLayout
      title="Responsible & Safe Use"
      description="AI is powerful, but trust is fragile. Learn how to use these tools without compromising customer privacy or company integrity."
      duration="10 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules"
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
        {sectionContent[currentStep]}
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
          <Button variant="outline" disabled className="opacity-75 cursor-not-allowed">
            Module Complete <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </ModuleLayout>
  );
}