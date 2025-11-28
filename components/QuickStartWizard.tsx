import React, { useState } from 'react';
import { Button, Card, ProgressBar, Badge } from './ui';
import { ShieldCheck, Zap, Mail, FileText, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export const QuickStartWizard: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  // State for interactive demos
  const [claimSummary, setClaimSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  const [emailDraft, setEmailDraft] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);

  // Mock messy data for Step 3
  const messyNote = `
    MEETING NOTE - 10/24/2023 - 2:30 PM
    Spoke w/ Client (Acme Corp). They say the timeline is slipping maybe 2 weeks? 
    Not sure. Dev team said it's backend issues. PM said it's clearly scope creep.
    Contract excludes overages for changes requested after Sept 1st.
    Client upset, says they pay retainer on time. 
    Needs a callback. I told them I'd review the SOW.
    Estimate for extra hours is $4500. 
    Remaining budget is $1000.
    Bottom line: looks like we need to issue a Change Order based on Section 4.a.
  `;

  const handleSummarize = async () => {
    setIsSummarizing(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = `**Meeting Summary: Client (Acme Corp)**
- **Timeline Risk:** Launch likely delayed by ~2 weeks due to backend issues (vs. scope creep debate).
- **Budget Issue:** Extra requests after Sept 1st are out of scope. Estimated overage: $4,500. Remaining budget: $1,000.
- **Action Item:** Need to review SOW Section 4.a and likely issue a Change Order.`;

    setClaimSummary(result);
    setIsSummarizing(false);
  };

  const handleDraftEmail = async () => {
    setIsDrafting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = `Subject: Regarding recent change requests - Acme Corp

Dear Client,

I hope you're having a good week.

I've reviewed the additional requests discussed in our last meeting. While we want to accommodate these changes, they fall outside the original scope outlined in our agreement. As per Section 4.a of our contract, any changes requested after September 1st require a separate Change Order.

We are happy to proceed with these updates, but we will need to formalize the budget adjustment first. Let me know if you'd like to discuss this over a quick call.

Best regards,

[Your Name]`;
    
    setEmailDraft(result);
    setIsDrafting(false);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps + 1));

  if (step > totalSteps) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Quick Start Complete!</h2>
        <p className="text-lg text-slate-600 mb-8">
          You've just learned the basics: Safety, Summarization, and Drafting.
          You are ready to explore the full modules.
        </p>
        <Button size="lg" onClick={onComplete}>Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <ProgressBar current={step} total={totalSteps} />
      </div>

      <Card className="p-8 min-h-[500px] flex flex-col">
        {/* STEP 1: WELCOME & CONCEPT */}
        {step === 1 && (
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">What is "Enterprise AI"?</h2>
            </div>
            
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                Welcome! Think of AI not as a robot that takes over your job, but as a 
                <strong> highly efficient intern</strong>.
              </p>
              <p>
                It's great at:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reading long documents instantly.</li>
                <li>Drafting polite emails when you're tired.</li>
                <li>Summarizing messy notes into clear reports.</li>
              </ul>
              <p>
                It is <strong>NOT</strong> a "truth engine." It can make mistakes. 
                <span className="block mt-2 font-semibold text-blue-700">
                  Rule #1: You are the pilot. AI is the co-pilot. Always review its work.
                </span>
              </p>
            </div>
            <div className="mt-12 flex justify-end">
              <Button size="lg" onClick={nextStep}>Got it, let's continue <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {/* STEP 2: SAFETY FIRST */}
        {step === 2 && (
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Safety First: The Golden Rule</h2>
            </div>
            
            <div className="space-y-6 text-lg text-slate-700">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                <h3 className="font-bold text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5"/>
                  NEVER share PII (Personally Identifiable Information)
                </h3>
                <p className="mt-2 text-red-600 text-sm">
                  Do not put client names, account numbers, SSNs, or financial info into public AI tools.
                </p>
              </div>

              <p>
                When using AI, we must <strong>anonymize</strong> our data.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                  <p className="font-bold text-red-700 mb-2">❌ Don't type this:</p>
                  <p className="text-sm font-mono text-slate-600">
                    "Write a rejection email for Client Acme Corp, Account #12345, located at 500 Main St..."
                  </p>
                </div>
                <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-700 mb-2">✅ Do type this:</p>
                  <p className="text-sm font-mono text-slate-600">
                    "Write a rejection email for a client regarding budget overages..."
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 flex justify-end">
              <Button size="lg" onClick={nextStep}>I promise to protect PII <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {/* STEP 3: THE "AHA" - SUMMARIZATION */}
        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <FileText className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Task 1: Taming the Mess</h2>
            </div>
            
            <p className="text-slate-600 mb-6">
              We all get messy notes. Let's see how fast AI can clean this up.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Input */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold uppercase text-slate-500 mb-2">Messy Meeting Note</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono text-slate-600 flex-1 whitespace-pre-line overflow-y-auto max-h-64">
                  {messyNote}
                </div>
                <div className="mt-4">
                  <Button onClick={handleSummarize} isLoading={isSummarizing} disabled={claimSummary.length > 0} className="w-full">
                    ✨ Clean this up with AI
                  </Button>
                </div>
              </div>

              {/* Output */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold uppercase text-slate-500 mb-2">AI Output</label>
                <div className={`bg-white border-2 border-dashed ${claimSummary ? 'border-purple-200 bg-purple-50' : 'border-slate-200'} rounded-lg p-4 flex-1 overflow-y-auto max-h-64 transition-all duration-500`}>
                  {isSummarizing ? (
                    <div className="h-full flex items-center justify-center text-slate-400 animate-pulse">
                      Analyzing text...
                    </div>
                  ) : claimSummary ? (
                    <div className="prose prose-sm prose-slate animate-fade-in">
                      {claimSummary.split('\n').map((line, i) => <p key={i} className="my-1">{line}</p>)}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                      Waiting for your command...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button size="lg" variant="secondary" onClick={nextStep} disabled={!claimSummary}>
                Next: Drafting <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: THE "AHA" - DRAFTING */}
        {step === 4 && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Task 2: The Difficult Email</h2>
            </div>
            
            <p className="text-slate-600 mb-6">
              Delivering bad news to a client is hard. Finding the right words takes time. Let AI create a "First Draft" for you to edit.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-slate-800 mb-2">Scenario:</h4>
              <p className="text-sm text-slate-600">
                Based on the previous note, we need to deny the extra work request due to the "Scope Creep" clause. 
                The client is already upset. We need a tone that is firm on the contract, but empathetic to the relationship.
              </p>
            </div>

            <div className="flex-1 flex flex-col">
               <Button onClick={handleDraftEmail} isLoading={isDrafting} disabled={emailDraft.length > 0} className="self-start mb-4">
                  ✨ Draft Response
               </Button>
               
               <div className={`flex-1 min-h-[200px] border rounded-lg p-6 text-sm whitespace-pre-wrap leading-relaxed ${emailDraft ? 'bg-white border-indigo-200 shadow-sm' : 'bg-slate-50 border-dashed border-slate-300'}`}>
                  {isDrafting ? (
                     <div className="flex items-center gap-2 text-indigo-600">
                        <Zap className="w-4 h-4 animate-spin" /> Writing email...
                     </div>
                  ) : emailDraft ? (
                    emailDraft
                  ) : (
                    <span className="text-slate-400 italic">Email draft will appear here...</span>
                  )}
               </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button size="lg" onClick={nextStep} disabled={!emailDraft}>
                Finish <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};