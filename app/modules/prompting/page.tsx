
import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, PromptCard, Button } from '../../../components/ui';
import { CheckCircle2, ArrowRight, ArrowLeft, Target, Repeat, GitBranch, Lightbulb, Zap, User, FileText, Layers, MessageSquare, Wrench, ListChecks, BookOpen } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'pattern-recap', title: 'The PCTR Pattern in Action' },
    { id: 'delegating', title: 'Talk Like You Are Delegating' },
    { id: 'iteration-loop', title: 'Iteration as Your Default' },
    { id: 'repair', title: 'Fixing Errors and Weird Answers' },
    { id: 'strategies', title: 'Zero, Few, and Step-by-Step' },
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
      case 0: // The PCTR Pattern in Action
        return (
          <section id="pattern-recap" className="mb-12 animate-fade-in">
            <h2>The PCTR pattern in action</h2>
            <p className="text-lg text-slate-700 mb-8">
              Remember the <strong>P.C.T.R.</strong> framework from the Quick Start? Let’s see it applied to a strategy task instead of a simple email. 
              This structure works because it answers all the questions the model has before it even asks.
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Scenario: The Research Summary
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                You have a set of market research notes. You need to summarize them into something your manager can act on.
              </p>
              
              <PromptCard 
                label="Full PCTR Prompt"
                prompt={`Act as a Strategy Analyst at a membership-based company.

Context: I have attached 5 PDFs containing market research interviews with lapsed members. We are trying to understand why they canceled.

Task: Summarize these into 3 key insights about pricing and 3 key insights about product features.

Requirements:
- Use bullet points.
- Keep each insight to 1-2 sentences.
- Add an "Open Questions" section for things the data didn't answer.`}
              />
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Spot the Pattern</h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                   <div className="font-bold bg-white border border-slate-200 px-2 rounded text-slate-900">P</div>
                   <span><strong>Persona:</strong> "Strategy Analyst" sets the tone (analytical, concise).</span>
                </li>
                <li className="flex gap-3">
                   <div className="font-bold bg-white border border-slate-200 px-2 rounded text-slate-900">C</div>
                   <span><strong>Context:</strong> Explains the source (interviews) and the goal (why they canceled).</span>
                </li>
                <li className="flex gap-3">
                   <div className="font-bold bg-white border border-slate-200 px-2 rounded text-slate-900">T</div>
                   <span><strong>Task:</strong> Specific instructions on what to extract (pricing vs product).</span>
                </li>
                <li className="flex gap-3">
                   <div className="font-bold bg-white border border-slate-200 px-2 rounded text-slate-900">R</div>
                   <span><strong>Requirements:</strong> Constraints on length and sections ("Open Questions").</span>
                </li>
              </ul>
            </div>
          </section>
        );

      case 1: // Talk Like You Are Delegating
        return (
          <section id="delegating" className="mb-12 animate-fade-in">
            <h2>Talk like you are delegating, not wishing</h2>
            <p className="text-lg text-slate-700 mb-8">
              Imagine you are talking to a very sharp new hire who does not know our context yet. 
              They are smart, but they can't read your mind. If you are vague, they will guess (and usually guess wrong).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
              <Card className="p-6 border-l-4 border-l-slate-300 bg-slate-50">
                <div className="flex items-center gap-2 mb-4 text-slate-500 font-bold uppercase text-xs tracking-wider">
                  <span className="text-lg">☁️</span> The Wish
                </div>
                <p className="font-mono text-sm text-slate-600 italic mb-4">
                  "Write a recap of our marketing experiment."
                </p>
                <p className="text-xs text-slate-500">
                  <strong>The Risk:</strong> The model guesses the audience (Customers? Internal?), guesses what "recap" means (Email? 10-page report?), and guesses what "good" looks like.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-blue-500 bg-white shadow-md">
                <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase text-xs tracking-wider">
                  <span className="text-lg">🤝</span> The Delegation
                </div>
                <div className="space-y-2 text-sm text-slate-800">
                  <p><strong>Audience:</strong> "For my VP of Marketing who has 5 minutes."</p>
                  <p><strong>Context:</strong> "We ran a split test on the landing page last week."</p>
                  <p><strong>Task:</strong> "Recap the goals, what happened, and whether we should scale."</p>
                  <p><strong>Requirements:</strong> "Use bullets. Include a clear recommendation at the top."</p>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <ListChecks className="w-5 h-5" /> Checklist when delegating
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4" /> Who is this for? (Audience)</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4" /> What decision should this help them make? (Goal)</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4" /> What format would help them act quickly? (Format)</li>
              </ul>
            </div>
          </section>
        );

      case 2: // Iteration as Your Default
        return (
          <section id="iteration-loop" className="mb-12 animate-fade-in">
            <h2>Make iteration your default</h2>
            <p className="text-lg text-slate-700 mb-6">
              Your first answer is rarely the final one. Treat it as a draft from a capable intern. 
              The best prompters spend 20% of their time on the first prompt and 80% on the back-and-forth.
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 text-sm font-bold text-slate-600 uppercase tracking-wide">
               <div className="flex-1 text-center bg-slate-100 p-3 rounded">1. First Draft</div>
               <ArrowRight className="text-slate-400 rotate-90 md:rotate-0" />
               <div className="flex-1 text-center bg-blue-100 text-blue-700 p-3 rounded">2. Critique</div>
               <ArrowRight className="text-slate-400 rotate-90 md:rotate-0" />
               <div className="flex-1 text-center bg-green-100 text-green-700 p-3 rounded">3. Refine</div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Start with a broad ask:</h3>
                <PromptCard 
                   label="Prompt 1"
                   prompt="Draft a one-page project update for the leadership team regarding the Q3 migration delays."
                />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">Then, steer the ship:</h3>
                <PromptCard 
                   label="Prompt 2 (The Refinement)"
                   prompt="This is good, but too long. Shorten this to 3 bullet points for the COO. Make the risk section more direct and remove the technical implementation details."
                />
              </div>
            </div>

            <Callout variant="info" title="Mental Model" className="mt-8">
              Don't rewrite the AI's output manually. Tell <em>it</em> how to rewrite it. "Make it shorter," "Make it punchier," "Fix the tone."
            </Callout>
          </section>
        );

      case 3: // Fixing Errors and Weird Answers
        return (
          <section id="repair" className="mb-12 animate-fade-in">
            <h2>Fixing errors and weird answers</h2>
            <p className="text-lg text-slate-700 mb-8">
              Sometimes the model just doesn't get it. It hallucinates, misses the point, or adopts a weird robot voice. 
              Don't just give up. Correct it firmly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="p-6 bg-slate-50 border-slate-200 opacity-70">
                 <h4 className="font-bold text-slate-500 mb-2 uppercase text-xs tracking-wider">The Frustrated User</h4>
                 <p className="font-mono text-sm text-slate-600 italic">"That is not what I meant. Try again."</p>
                 <p className="text-xs text-slate-400 mt-2">(The model often just guesses again... and fails again.)</p>
              </Card>

              <Card className="p-6 bg-white border-green-200 shadow-sm">
                 <h4 className="font-bold text-green-700 mb-2 uppercase text-xs tracking-wider">The Power User</h4>
                 <p className="font-mono text-sm text-slate-800">
                    "You misunderstood what I meant by 'high value members'."
                    <br/><br/>
                    "In this context:<br/>
                    - High value members = people with 3+ products and 5+ years tenure.<br/>
                    - We are not talking about income."
                    <br/><br/>
                    "Rewrite your summary using that definition and focus on what makes them stay."
                 </p>
              </Card>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-slate-600" /> Reusable Repair Stems
              </h3>
              <ul className="space-y-3 text-sm text-slate-700 font-mono">
                <li className="bg-white p-2 rounded border border-slate-200">
                  "You missed the part about [Constraint]. Please check your work and fix it."
                </li>
                <li className="bg-white p-2 rounded border border-slate-200">
                  "Use this definition instead: [Insert Definition]."
                </li>
                <li className="bg-white p-2 rounded border border-slate-200">
                  "Ignore the previous answer. Focus only on [Topic]."
                </li>
              </ul>
            </div>
          </section>
        );

      case 4: // Zero, Few, and Step-by-Step
        return (
          <section id="strategies" className="mb-12 animate-fade-in">
            <h2>Zero, few, and step-by-step</h2>
            <p className="text-lg text-slate-700 mb-8">
              You do not need a new trick for every task. Most of the time you are choosing between three modes. 
              You saw these in the Quick Start. Here is a quick reminder of when each one shines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 not-prose">
              <Card className="p-5 border-t-4 border-t-blue-500">
                 <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                    <Zap className="w-4 h-4 text-blue-500" /> Zero-Shot
                 </div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Direct Ask</p>
                 <p className="text-sm text-slate-600">
                    Good for simple, one-off tasks where the instructions are self-explanatory.
                 </p>
              </Card>

              <Card className="p-5 border-t-4 border-t-purple-500">
                 <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                    <Layers className="w-4 h-4 text-purple-500" /> Few-Shot
                 </div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Provide Examples</p>
                 <p className="text-sm text-slate-600">
                    Good for style mimicry ("write like this") or enforcing a specific repetitive format.
                 </p>
              </Card>

              <Card className="p-5 border-t-4 border-t-emerald-500">
                 <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                    <GitBranch className="w-4 h-4 text-emerald-500" /> Step-by-Step
                 </div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Chain of Thought</p>
                 <p className="text-sm text-slate-600">
                    Ask it to "think out loud." Essential for complex logic, math, or high-stakes reasoning.
                 </p>
              </Card>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <BookOpen className="w-5 h-5 text-slate-500" />
               <div className="flex-1 text-sm text-slate-600">
                 Need templates for these? Check the Reference Guide.
               </div>
               <Button variant="ghost" size="sm" onClick={() => push('/reference/prompting-guide')}>
                 Open Prompting Guide
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
      title="Prompting Foundations: Talk to AI Like a Teammate"
      description="Move from hit-or-miss prompts to clear, reliable conversations. Learn a simple pattern (PCTR) and how to delegate work like you would to a capable intern."
      duration="20 mins"
      audience="All Employees"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
    >
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
