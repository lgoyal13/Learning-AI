import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button } from '../../../components/ui';
import { FileText, Users, ArrowRight, ArrowLeft, CheckCircle2, Check } from 'lucide-react';

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'intro', title: 'Workflows vs. Chat' },
    { id: 'minutes', title: 'Meeting Minutes' },
    { id: 'contracts', title: 'Contract Comparison' },
    { id: 'excel', title: 'Excel Helper' },
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
        <h2>From Chatting to Working</h2>
        <p>
          Most people stop at "Write me an email." But the real power of AI comes when you use it to transform
          inputs (documents, data, notes) into structured outputs (tables, reports, summaries).
        </p>
      </section>
    ),

    // SECTION 2: MEETING MINUTES
    (
      <section key="minutes" id="minutes" className="mb-12 animate-fade-in">
        <h2 className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Workflow 1: The "Instant" Minutes
        </h2>
        <p>
          Stop spending an hour formatting meeting notes. Paste your raw, messy notes (or a transcript) and let AI structure it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
          <Card className="p-4 bg-slate-50 border-slate-200">
            <h4 className="font-bold text-slate-700 text-sm uppercase mb-2">Input (Messy Notes)</h4>
            <p className="font-mono text-xs text-slate-600">
              "Jim said we need to delay the launch. Sarah disagrees, says marketing is ready. 
              Budget is tight, we have $5k left. Next meeting is Tuesday."
            </p>
          </Card>
          <div className="flex items-center justify-center md:rotate-0 rotate-90">
             <ArrowRight className="text-slate-400" />
          </div>
          <Card className="p-4 bg-white border-green-200 shadow-sm">
            <h4 className="font-bold text-green-700 text-sm uppercase mb-2">Output (Structured)</h4>
            <div className="text-xs text-slate-700 space-y-2">
              <p><strong>Decisions:</strong> No consensus on launch date.</p>
              <p><strong>Action Items:</strong> Jim and Sarah to resolve timeline.</p>
              <p><strong>Next Steps:</strong> Meeting on Tuesday.</p>
            </div>
          </Card>
        </div>

        <PromptCard 
           label="Prompt Template"
           prompt="Act as a Project Coordinator. Review these raw meeting notes. \n1. Summarize the key decisions. \n2. List action items with owners. \n3. List open risks. \nFormat as a clean HTML email." 
        />
      </section>
    ),

    // SECTION 3: CONTRACTS
    (
      <section key="contracts" id="contracts" className="mb-12 animate-fade-in">
        <h2 className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple-600" />
          Workflow 2: Document Comparison
        </h2>
        <p>
          Need to see what changed between "Vendor Agreement v1" and "Vendor Agreement v2"? 
          Instead of reading both, ask AI to spot the differences.
        </p>
        <Callout variant="info" title="Tip: Use Anonymization">
          If the contract is confidential, remove the client name and dollar amounts before pasting.
        </Callout>
        
        <div className="mt-4">
          <PromptCard 
             label="Comparison Prompt"
             prompt="I am pasting two versions of a clause below. Compare them and list exactly what changed. Explain the implications of the change in plain English. \n\nVersion A: [...] \nVersion B: [...]" 
          />
        </div>
      </section>
    ),

    // SECTION 4: EXCEL
    (
      <section key="excel" id="excel" className="mb-12 animate-fade-in">
        <h2>Workflow 3: The Excel & Data Helper</h2>
        <p>
          You have a spreadsheet but don't know the formula to extract the data you need. 
          Describe the problem to AI.
        </p>
        
        <div className="space-y-4 not-prose">
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 mb-2">Scenario</h3>
            <p className="text-slate-600 text-sm mb-4">
              "I have a column of full names (John Smith) and I need to split them into First Name and Last Name columns."
            </p>
            <div className="bg-slate-50 p-3 rounded text-sm font-mono text-blue-700">
              <strong>AI Answer:</strong> "You can use the TEXTSPLIT function. <br/>Formula: =TEXTSPLIT(A2, ' ')"
            </div>
          </Card>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="bg-blue-50 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
             <div>
               <h3 className="font-bold text-blue-900 text-lg">Ready for the next step?</h3>
               <p className="text-blue-700 text-sm">Learn how to stay safe while being productive.</p>
             </div>
             <Button onClick={() => window.location.href='/modules/responsible-use'}>
               Go to Responsible Use <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
          </div>
        </div>
      </section>
    )
  ];

  return (
    <ModuleLayout
      title="Business Workflows"
      description="Move beyond simple chat. Learn how to chain prompts together to automate repetitive business processes."
      duration="25 mins"
      audience="Project Managers, Ops, Admin"
      sections={sections}
      nextModulePath="/modules/responsible-use"
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