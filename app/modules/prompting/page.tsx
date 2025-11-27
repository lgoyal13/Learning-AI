import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button } from '../../../components/ui';
import { CheckCircle2, ArrowRight, ArrowLeft, Target, ListChecks, Repeat, GitBranch, Lightbulb, Zap, User, FileText, BookOpen } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'mindset-shift', title: 'The Mindset Shift' },
    { id: 'task-and-context', title: 'Task + Context' },
    { id: 'requirements-and-format', title: 'Requirements & Output Shape' },
    { id: 'examples-and-iteration', title: 'Examples, Iteration, and Branching' },
    { id: 'full-prompt', title: 'Putting It All Together' },
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
          <section id="mindset-shift" className="mb-12 animate-fade-in">
            <h2>Stop guessing, start directing</h2>
            <p className="text-lg text-slate-700">
              The biggest misconception about AI is that you need "magic words" to get a good answer. 
              The truth is much simpler: treat the AI like a very smart, very literal intern.
            </p>
            <p className="text-slate-600">
              If you give vague instructions, you get a vague draft. If you give clear context and constraints, you get work you can actually use.
            </p>
            
            <div className="my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">What you'll master in this module</h3>
              <p className="text-slate-600 mb-4">
                We’re going to practice a reliable pattern for prompts that works across Gemini, ChatGPT, Claude, or any internal tool.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700">Turning "write an email" into a specific mission.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700">Giving the model enough context to be useful.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700">Defining exactly what "good" looks like (format, tone, length).</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700">Treating the first answer as a rough draft, not the final product.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        );
      case 1:
        return (
          <section id="task-and-context" className="mb-12 animate-fade-in">
            <h2>Step 1: The "What" and the "Who"</h2>
            <p className="mb-6">
              Every good prompt starts with two things: a clear <strong>Task</strong> (the job to be done) and rich <strong>Context</strong> (the background info).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
              <Card className="p-6 border-l-4 border-l-slate-300 bg-slate-50">
                <div className="flex items-center gap-2 mb-4 text-slate-500 font-bold uppercase text-xs tracking-wider">
                  <span className="text-lg">😕</span> Vague Ask
                </div>
                <p className="font-mono text-sm text-slate-600 italic">
                  "Write a marketing email."
                </p>
                <p className="text-xs text-slate-500 mt-4">
                  Result: Generic fluff. The AI guesses the product, the audience, and the goal (and usually guesses wrong).
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-blue-500 bg-white shadow-md">
                <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase text-xs tracking-wider">
                  <span className="text-lg">🚀</span> Clear Direction
                </div>
                <p className="font-mono text-sm text-slate-800">
                  "Act as a Marketing Manager. Write a 150-word email to AAA members in California promoting a new renters’ insurance product. 
                  <br/><br/>
                  Context: The audience is 25–35, mostly renters in urban areas. Key selling point: peace of mind and simple claims."
                </p>
                <p className="text-xs text-blue-600 mt-4 font-medium">
                  Result: Specific, targeted, and immediately useful.
                </p>
              </Card>
            </div>

            <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" /> Quick Starters
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Try copying these into your chat tool right now:
              </p>
              <div className="space-y-4">
                <PromptCard 
                  label="The Strategist"
                  prompt="I’m a [Project Manager] launching [New Tool]. Ask me 3 questions to clarify my goals, then propose a rollout plan." 
                />
                <PromptCard 
                  label="The Blind Spot Check"
                  prompt="I'm pasting a draft strategy document below. Act as a skeptical stakeholder and point out 3 missing risks I haven't addressed." 
                />
              </div>
            </div>
          </section>
        );
      case 2:
        return (
          <section id="requirements-and-format" className="mb-12 animate-fade-in">
            <h2>Step 2: Define the output shape</h2>
            <p className="mb-6">
              AI models love structure. If you don't tell them <em>how</em> to present the answer, you'll likely get a wall of text. 
              Be the editor—tell it exactly what you want back.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 not-prose">
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                  <ListChecks className="w-4 h-4 text-purple-600" /> Format
                </div>
                <p className="text-sm text-slate-600">"A comparison table," "bullet points," "a JSON list," "a drafted email."</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                  <Target className="w-4 h-4 text-red-600" /> Length
                </div>
                <p className="text-sm text-slate-600">"Under 200 words," "a one-page brief," "3 sentences max."</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                  <User className="w-4 h-4 text-blue-600" /> Tone
                </div>
                <p className="text-sm text-slate-600">"Clear and neutral," "Optimistic but professional," "ELI5 (Explain Like I'm 5)."</p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                  <Target className="w-4 h-4 text-amber-600" /> Constraints
                </div>
                <p className="text-sm text-slate-600">"No confidential data," "Don't invent facts," "Ask me if you are unsure."</p>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 mb-4">Example: The Structured Request</h3>
            <PromptCard 
              label="Internal Comms Prompt"
              prompt={`You are an internal comms writer. Based on the messy notes below, generate:
1. A 3-bullet executive summary.
2. A 150-word email draft for all staff.
3. A table of top 3 risks with columns: Risk, Owner, Mitigation.`}
            />

            <Callout variant="info" title="Pro Tip" className="mt-8">
              Planning to paste this into a deck? Tell the AI upfront: 
              <br/><em>"Format this as short bullets suitable for a slide presentation."</em>
            </Callout>
          </section>
        );
      case 3:
        return (
          <section id="examples-and-iteration" className="mb-12 animate-fade-in">
            <h2>Step 3: Iterate, refine, and branch</h2>
            <p className="mb-6">
              The first answer is rarely perfect. That's normal. The real work happens in the follow-up. 
              Treat the chat as a collaborative session, not a one-off query.
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4">The Rewrite Loop</h3>
              <p className="text-slate-600 mb-4">
                Instead of rewriting the AI's output yourself, ask <em>it</em> to do the revision.
              </p>
              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-full border border-slate-200 shadow-sm shrink-0">
                    <Repeat className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Try this follow-up:</h4>
                    <div className="font-mono text-xs bg-white p-2 rounded border border-slate-200 text-slate-700">
                      "That's a good start. Now give me 3 alternative versions:
                      <br/>Option 1: More concise (half the length).
                      <br/>Option 2: More persuasive and energetic.
                      <br/>Option 3: Simpler language (8th grade reading level)."
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-purple-600" /> Branching
                </h3>
                <p className="text-sm text-slate-600">
                  You can edit your original prompt and re-run it to see how a slight change in tone ("be stricter") or context ("assume a tight budget") ripples through the answer.
                </p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-emerald-900 mb-2">The Quality Checklist</h3>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li>◻️ "What did you miss in this summary?"</li>
                  <li>◻️ "Are there any assumptions you made?"</li>
                  <li>◻️ "Can you propose a stronger alternative?"</li>
                </ul>
              </div>
            </div>
          </section>
        );
      case 4:
        return (
          <section id="full-prompt" className="mb-12 animate-fade-in">
            <h2>Putting It All Together</h2>
            <p className="mb-6">
              You don't need a complex acronym. Just remember the shape of a good request. 
              Keep this template handy for your next high-stakes task.
            </p>

            <div className="bg-slate-900 text-slate-200 p-6 rounded-xl font-mono text-sm shadow-2xl mb-8 overflow-x-auto">
              <div className="text-slate-400 mb-2">// THE REUSABLE PATTERN</div>
              <div className="space-y-2">
                <div><span className="text-purple-400">Role:</span> [Optional Persona, e.g. "Expert Analyst"]</div>
                <div><span className="text-blue-400">Task:</span> [The specific job to do]</div>
                <div><span className="text-green-400">Context:</span> [Background info, Audience, Goal]</div>
                <div><span className="text-amber-400">Requirements:</span> [Format, Length, Tone, Constraints]</div>
                <div><span className="text-slate-500">Examples:</span> [Optional: "Here is a good example..."]</div>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 mb-4">Worked Example: Marketing Plan</h3>
            <Card className="p-6 bg-white border-slate-200 mb-12">
              <ul className="space-y-3 text-sm">
                <li><strong className="text-purple-700">Role:</strong> Marketing Manager at AAA.</li>
                <li><strong className="text-blue-700">Task:</strong> Plan a 3-email onboarding sequence.</li>
                <li><strong className="text-green-700">Context:</strong> New roadside-assistance members in California, mostly first-time AAA users. They are anxious about using the app correctly.</li>
                <li><strong className="text-amber-700">Requirements:</strong> Output a table with columns: Email #, Subject Line, Core Goal, Key Message, CTA. Keep tone reassuring and clear.</li>
              </ul>
            </Card>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Reflection
              </h3>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex gap-2">
                   <ArrowRight className="w-4 h-4 mt-0.5" /> 
                   Where in your current job could you try this today?
                </li>
                <li className="flex gap-2">
                   <ArrowRight className="w-4 h-4 mt-0.5" /> 
                   What’s one recurring email or document you could "hand off" to AI for a first draft?
                </li>
                <li className="flex gap-2">
                   <ArrowRight className="w-4 h-4 mt-0.5" /> 
                   What’s one experiment you could run this week?
                </li>
              </ul>
            </div>

            {/* Resource Hook */}
            <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <BookOpen className="w-5 h-5 text-slate-500" />
               <div className="flex-1 text-sm text-slate-600">
                 Want to see more prompt frameworks and example scripts?
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