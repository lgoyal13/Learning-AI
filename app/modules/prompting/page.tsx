import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button } from '../../../components/ui';
import { CheckCircle2, XCircle, ChevronRight, Zap, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Page() {
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'intro', title: 'Why Prompting Matters' },
    { id: 'framework', title: 'The Framework (C.T.F.)' },
    { id: 'examples', title: 'Business Examples' },
    { id: 'tips', title: 'Power Tips' },
    { id: 'troubleshooting', title: 'Troubleshooting' },
    { id: 'quiz', title: 'Knowledge Check' },
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
        <h2>Garbage In, Garbage Out</h2>
        <p>
          Imagine you have a brilliant intern who has read every business textbook in the world but has 
          <strong> zero context</strong> about your specific day. If you walk by their desk and shout 
          "Write the email!", they will stare at you blankly—or worse, write a generic email that makes no sense.
        </p>
        <p>
          AI works the same way. It isn't a mind reader. The quality of the output is determined entirely 
          by the quality of your instructions (the "Prompt").
        </p>
        <Callout variant="info" title="The Golden Rule">
          Treat the AI like a smart, junior employee. Be specific, give context, and tell it exactly what good looks like.
        </Callout>
      </section>
    ),

    // SECTION 2: FRAMEWORK
    (
      <section key="framework" id="framework" className="mb-12 animate-fade-in">
        <h2>The Framework: C.T.F.</h2>
        <p>
          You don't need to be a coder to write good prompts. You just need to cover these three bases.
          If your prompt is failing, check if you are missing one of these.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
          <Card className="p-6 border-t-4 border-t-blue-500 bg-blue-50/50">
            <h3 className="text-xl font-bold text-blue-900 mb-2">1. Context</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">"Set the Stage"</p>
            <p className="text-slate-700">
              Who is the AI acting as? What is the background info?
            </p>
            <p className="mt-4 text-sm text-slate-600 italic">"Act as a Project Manager reviewing a budget overrun..."</p>
          </Card>

          <Card className="p-6 border-t-4 border-t-purple-500 bg-purple-50/50">
            <h3 className="text-xl font-bold text-purple-900 mb-2">2. Task</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">"Define the Action"</p>
            <p className="text-slate-700">
              What specific job do you want done? Use active verbs.
            </p>
            <p className="mt-4 text-sm text-slate-600 italic">"Draft a rejection email based on Contract Clause 4.a..."</p>
          </Card>

          <Card className="p-6 border-t-4 border-t-emerald-500 bg-emerald-50/50">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">3. Format</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">"Specify Output"</p>
            <p className="text-slate-700">
              How do you want the answer to look? Tone? Length?
            </p>
            <p className="mt-4 text-sm text-slate-600 italic">"Use a professional tone. Keep it under 200 words."</p>
          </Card>
        </div>
      </section>
    ),

    // SECTION 3: EXAMPLES
    (
      <section key="examples" id="examples" className="mb-12 animate-fade-in">
        <h2>Business Examples: Before & After</h2>
        <p>See the difference when you apply the C.T.F. framework.</p>

        <div className="space-y-8 not-prose">
          {/* Example 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-800">The "Lazy" Prompt</span>
              </div>
              <p className="font-mono text-sm text-slate-700">"Summarize this file."</p>
              <div className="mt-4 text-xs text-red-600">
                <strong>Result:</strong> A generic summary that might miss the key dates or financial figures you actually care about.
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800">The "Pro" Prompt</span>
              </div>
              <p className="font-mono text-sm text-slate-700">
                "Act as a Project Manager. <span className="text-blue-600 font-bold">[Context]</span> 
                Summarize these meeting notes. <span className="text-purple-600 font-bold">[Task]</span> 
                Focus specifically on the timeline slippage and the budget impact. Format as a bulleted list. <span className="text-emerald-600 font-bold">[Format]</span>"
              </p>
            </div>
          </div>
        </div>
      </section>
    ),

    // SECTION 4: POWER TIPS
    (
      <section key="tips" id="tips" className="mb-12 animate-fade-in">
        <h2>3 Power Tips</h2>
        
        <h3>1. Assign a Role (Persona)</h3>
        <p>
          Tell the AI who to be. If you want a simple explanation, ask it to be a "Teacher". 
          If you want a strict review, ask it to be a "Compliance Officer".
        </p>

        <h3>2. Set Constraints</h3>
        <p>
          The AI tends to be verbose. Constrain it to get better results.
        </p>
        <ul className="list-disc pl-5 space-y-2">
            <li>"Do not use jargon."</li>
            <li>"Keep it under 3 sentences."</li>
            <li>"Use 8th-grade reading level."</li>
        </ul>

        <h3>3. Give Examples (Few-Shot Prompting)</h3>
        <p>
          The best way to show the AI what you want is to give it an example.
        </p>
        <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm text-slate-700 my-4">
          <p className="text-slate-500">// Example of providing a pattern</p>
          <p className="mb-2">Task: Extract names and roles.</p>
          <p className="mb-1">Input: "John Smith, the lead engineer, called Jane Doe, the client."</p>
          <p className="mb-3">Output: John Smith (Engineer), Jane Doe (Client)</p>
          <p className="mb-1">Input: "Dr. A. Miller sent the report to supervisor Bob Jones."</p>
          <p className="mb-1">Output:</p>
        </div>
      </section>
    ),

    // SECTION 5: TROUBLESHOOTING
    (
      <section key="troubleshooting" id="troubleshooting" className="mb-12 animate-fade-in">
        <h2>Troubleshooting: "It didn't work!"</h2>
        <p>
          Sometimes the AI gives a bad answer. Don't give up! Try these fixes:
        </p>
        <ul>
          <li><strong>Clarify the Context:</strong> Did you assume the AI knew something it didn't?</li>
          <li><strong>Break it Down:</strong> If the task is complex, ask the AI to "Think step-by-step".</li>
          <li><strong>Iterate:</strong> Treat it like a conversation. "That was too formal. Rewrite it to be friendlier."</li>
        </ul>
      </section>
    ),

    // SECTION 6: QUIZ
    (
      <section key="quiz" id="quiz" className="mb-12 pt-8 border-t border-slate-200 animate-fade-in">
        <h2 className="flex items-center gap-3">
          <Zap className="text-yellow-500 fill-yellow-500" /> 
          Knowledge Check
        </h2>
        <p className="mb-6">Select the prompt that follows the C.T.F. framework best.</p>

        <Card className="p-6 bg-slate-50 not-prose">
          <h3 className="font-bold text-lg mb-4">Scenario: You need to explain a price increase to a client.</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => { setQuizAnswer(1); setShowExplanation(true); }}
              className={`w-full text-left p-4 rounded border-2 transition-all ${
                quizAnswer === 1 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="font-mono text-sm">"Write an email explaining the price increase."</div>
            </button>

            <button
              onClick={() => { setQuizAnswer(2); setShowExplanation(true); }}
              className={`w-full text-left p-4 rounded border-2 transition-all ${
                quizAnswer === 2 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="font-mono text-sm">
                "Act as a Sales Director. Write a brief email to a long-term client explaining that the 10% price increase is due to rising supply chain costs. Tone should be partnership-focused, not defensive."
              </div>
            </button>
          </div>

          {showExplanation && (
            <div className="mt-6 animate-fade-in">
              {quizAnswer === 2 ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg flex gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="font-bold">Correct!</p>
                    <p className="text-sm mt-1">
                      You provided Context (Sales Director), the Task (explain 10% increase), and Format/Tone (brief, partnership-focused).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-100 text-red-800 p-4 rounded-lg flex gap-3">
                  <XCircle className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="font-bold">Not quite.</p>
                    <p className="text-sm mt-1">
                      The first prompt is too vague. The AI will make up a reason for the increase (Hallucination) and might sound too robotic.
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
      title="Prompting Basics: The Art of Asking"
      description="Learn the simple formula to get high-quality, professional results from AI every time. Stop wrestling with the model and start delegating effectively."
      duration="20 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules/workflow"
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