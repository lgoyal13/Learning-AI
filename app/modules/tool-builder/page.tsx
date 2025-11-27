import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button } from '../../../components/ui';
import { PenTool, Sliders, Cpu, ShieldAlert, Hammer, ArrowRight, ArrowLeft, CheckCircle2, Bot, Wrench, Braces, Layers, Target, AlertTriangle, BookOpen } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'why-builders', title: 'Why Use a Builder Instead of Chat?' },
    { id: 'system-prompts', title: 'System Prompts and Personas' },
    { id: 'structured-output', title: 'Designing Structured Outputs' },
    { id: 'models-and-settings', title: 'Experimenting with Models & Settings' },
    { id: 'mini-project', title: 'Mini Project: Your First Internal Tool' },
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
          <section id="why-builders" className="mb-12 animate-fade-in">
            <h2>The "Copy-Paste" Trap</h2>
            <p className="text-lg text-slate-700">
              We've all been there: You have a prompt that works perfectly, but you have to copy-paste it from a Google Doc every time you need it. 
              Or worse, you try to teach a colleague how to use it, and they change one word that breaks everything.
            </p>
            <p className="text-slate-600 mb-8">
              <strong>Builder tools</strong> (like Google AI Studio or custom GPTs) solve this. They let you "freeze" a great prompt into a reusable button that anyone on your team can click.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2 mb-4 text-slate-500 font-bold uppercase text-xs tracking-wider">
                  <span className="text-lg">💬</span> Chat Mode
                </div>
                <h3 className="font-bold text-slate-900 mb-2">The Ad-Hoc Brainstormer</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>"Draft an email..."</li>
                  <li>"Summarize this doc..."</li>
                  <li>"Give me 5 ideas for..."</li>
                </ul>
              </Card>

              <Card className="p-6 bg-white border-blue-200 shadow-md">
                 <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase text-xs tracking-wider">
                  <Wrench className="w-4 h-4" /> Builder Mode
                </div>
                <h3 className="font-bold text-slate-900 mb-2">The Reusable Assistant</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>"The 'Customer Feedback Triage' Bot"</li>
                  <li>"The 'Meeting Notes to Tasks' Generator"</li>
                  <li>"The 'Invoice Data Extractor'"</li>
                </ul>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" /> The Secret
              </h3>
              <p className="text-sm text-blue-800">
                Building an internal tool isn't about coding. It's about taking a prompt you <em>already use</em> and giving it a permanent home.
              </p>
            </div>
          </section>
        );
      case 1:
        return (
          <section id="system-prompts" className="mb-12 animate-fade-in">
            <h2>The "Hidden Prompt"</h2>
            <p className="mb-6">
              In a normal chat, you type instructions every time. In a builder, you set a <strong>System Instruction</strong> once.
              This is the "god mode" prompt that defines who the AI is, what it knows, and what it is allowed to say.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
              <Card className="p-6 border-l-4 border-l-slate-300 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-2">Basic System Prompt</h3>
                <p className="font-mono text-sm text-slate-600 italic mb-4">
                  "You are a helpful assistant."
                </p>
                <p className="text-xs text-slate-500">
                  <strong>Result:</strong> Polite, generic, and eager to please (sometimes too eager).
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-500 bg-white">
                <h3 className="font-bold text-slate-900 mb-2">Strong System Prompt</h3>
                <p className="font-mono text-sm text-slate-800 mb-4">
                  "You are a Senior Business Analyst at [Company]. You speak in concise, plain English. You prioritize accuracy over politeness. If you lack data, state 'Insufficient Data' rather than guessing."
                </p>
                <p className="text-xs text-purple-600 font-medium">
                  <strong>Result:</strong> Professional, grounded, consistent, and safe for work.
                </p>
              </Card>
            </div>

            <h3 className="font-bold text-slate-900 mb-4">Mini Exercise: The Tone Shift</h3>
            <p className="text-sm text-slate-600 mb-4">
              Imagine running the prompt "Write an apology email" through these two personas:
            </p>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li><strong>Persona A:</strong> "You are an empathetic customer support agent." (Result: Warm, apologetic, maybe offers a refund).</li>
              <li><strong>Persona B:</strong> "You are a strict legal compliance officer." (Result: Formal, liability-focused, no admissions of fault).</li>
            </ul>
          </section>
        );
      case 2:
        return (
          <section id="structured-output" className="mb-12 animate-fade-in">
            <h2>Make it talk to spreadsheets</h2>
            <p className="mb-6">
              One of the best uses for a custom tool is to force the AI to stop "chatting" and start "structuring."
              You can tell it: "Do not write paragraphs. Output <strong>only JSON</strong> or a CSV table."
            </p>

            <div className="bg-slate-900 text-slate-200 p-6 rounded-xl font-mono text-sm shadow-xl mb-8 overflow-x-auto not-prose">
              <div className="flex items-center gap-2 mb-4 text-slate-400 border-b border-slate-700 pb-2">
                <Braces className="w-4 h-4" /> JSON Schema Example
              </div>
              <div className="space-y-1">
                <p><span className="text-purple-400">product_name</span>: string</p>
                <p><span className="text-blue-400">headline</span>: string</p>
                <p><span className="text-green-400">tone</span>: "serious" | "playful"</p>
                <p><span className="text-amber-400">CTA</span>: string</p>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 mb-4">Why do this?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
              <Card className="p-4 bg-white border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">For Humans</h4>
                <p className="text-sm text-slate-600">
                  Clean tables you can copy-paste directly into Google Sheets or Excel without spending 20 minutes reformatting.
                </p>
              </Card>
              <Card className="p-4 bg-white border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">For Engineers</h4>
                <p className="text-sm text-slate-600">
                  If you ever want to turn your prototype into a real app, this schema is the "contract" developers need to connect it to code.
                </p>
              </Card>
            </div>
          </section>
        );
      case 3:
        return (
          <section id="models-and-settings" className="mb-12 animate-fade-in">
            <h2>Under the hood: Speed vs. Smarts</h2>
            <p className="mb-6">
              In a builder tool, you aren't stuck with the default brain. You can choose the engine that fits the job.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-blue-100 rounded text-blue-600 shrink-0 mt-1">
                   <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Model Choice</h3>
                  <p className="text-sm text-slate-600">
                    <strong>Flash (Fast/Cheap):</strong> Perfect for high-volume tasks like summarizing 50 emails or extracting data. <br/>
                    <strong>Pro (Deep/Reasoning):</strong> Better for complex logic, creative writing, or nuanced strategic analysis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-purple-100 rounded text-purple-600 shrink-0 mt-1">
                   <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Temperature</h3>
                  <p className="text-sm text-slate-600">
                    Controls the "wildness." <br/>
                    <strong>Low (0.0 - 0.3):</strong> Predictable, factual. Good for data extraction. <br/>
                    <strong>High (0.7 - 1.0):</strong> Creative, varied. Good for brainstorming 50 different taglines.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-slate-50 border-slate-200">
               <h3 className="font-bold text-slate-900 mb-3">Mini Lab Experiment</h3>
               <p className="text-sm text-slate-600 mb-4">
                 Try running a "Campaign Idea Generator" with these settings:
               </p>
               <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                 <li><strong>Flash, Temp 0.2:</strong> Safe, consistent, standard corporate ideas.</li>
                 <li><strong>Flash, Temp 0.9:</strong> Wild, unexpected, sometimes weird ideas.</li>
                 <li><strong>Pro, Temp 0.5:</strong> Deep, strategic concepts that connect dots.</li>
               </ul>
            </Card>
          </section>
        );
      case 4:
        return (
          <section id="mini-project" className="mb-12 animate-fade-in">
            <h2>Mini Project: Build Your Own Assistant</h2>
            <p className="mb-6">
              Ready to build? Don't start with a blank page. Pick a real, annoying task from your week and automate it.
            </p>

            <Card className="p-6 border-l-4 border-l-emerald-500 bg-white mb-8">
              <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-600" /> Example: The "Meeting Action Item" Bot
              </h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <strong className="block text-slate-900">System Instruction:</strong>
                  You are an efficient Executive Assistant. You extract action items from messy notes.
                </div>
                <div>
                  <strong className="block text-slate-900">Input:</strong>
                  Raw meeting transcript (pasted by the user).
                </div>
                <div>
                  <strong className="block text-slate-900">Structured Output (JSON):</strong>
                  List of objects with: Owner, Task, Due Date, Priority.
                </div>
                <div>
                  <strong className="block text-slate-900">Guardrails:</strong>
                  If no due date is mentioned, suggest one but mark it "Suggested." If owner is unclear, mark "Unassigned."
                </div>
              </div>
            </Card>
            
            <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 text-center">
              <h3 className="font-bold text-slate-900 mb-4">Ready to try it?</h3>
              <p className="text-slate-600 mb-6">
                Go to the Playground now and try setting a System Instruction for your own task.
              </p>
              <Button onClick={() => push('/playground')} size="lg" className="w-full md:w-auto">
                Open Playground <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Resource Hook */}
            <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <BookOpen className="w-5 h-5 text-slate-500" />
               <div className="flex-1 text-sm text-slate-600">
                 Want to see Tina Huang build this live?
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
      title="The Builder's Lab: Prototyping AI Tools"
      description="Ready to move beyond basic chat? Learn how to use 'Playground' environments (like Google AI Studio) to build reusable, reliable AI assistants for your team."
      duration="20 mins"
      audience="Power Users & Champions"
      sections={sections}
      nextModulePath="/playground"
    >
      {/* HEADER ALERT */}
      <div className="mb-8 not-prose">
        <Callout variant="warning" title="Advanced Module">
          This module is optional. It is intended for employees who are comfortable with technology and want to build tools for others.
        </Callout>
      </div>

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