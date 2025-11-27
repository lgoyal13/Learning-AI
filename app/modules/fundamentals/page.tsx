import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button } from '../../../components/ui';
import { BrainCircuit, Search, PenTool, AlertTriangle, CheckCircle2, XCircle, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const sections = [
    { id: 'what-is-it', title: 'What is Generative AI?' },
    { id: 'prediction', title: 'Prediction Engine' },
    { id: 'hallucinations', title: 'The Trust Gap' },
    { id: 'strengths', title: 'When to Use It' },
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
    // SECTION 1: WHAT IS IT
    (
      <section key="what-is-it" id="what-is-it" className="mb-12 animate-fade-in">
        <h2>It looks like search, but it’s an improv machine</h2>
        <p className="text-lg text-slate-700">
          When you use a search engine (like internal search or Google), it retrieves an exact file. If you ask for the "2024 Holiday Calendar," it finds the PDF.
        </p>
        <p className="text-slate-600">
          <strong>Generative AI (like Gemini or ChatGPT) is doing something completely different.</strong> It doesn’t "look up" answers in a database. It <em>generates</em> a new answer from scratch, word by word, based on patterns it learned.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
          <Card className="p-4 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-2 mb-2 font-bold text-blue-900">
              <Search className="w-5 h-5" /> Search Engine
            </div>
            <p className="text-sm text-slate-600">Finds an existing file.</p>
            <p className="text-xs text-slate-500 mt-2">"Here is the link to the policy PDF."</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-2 mb-2 font-bold text-purple-900">
              <BrainCircuit className="w-5 h-5" /> Generative AI
            </div>
            <p className="text-sm text-slate-600">Writes a new explanation.</p>
            <p className="text-xs text-slate-500 mt-2">"Here is a summary of the policy based on what I read."</p>
          </Card>
        </div>
      </section>
    ),

    // SECTION 2: PREDICTION ENGINE
    (
      <section key="prediction" id="prediction" className="mb-12 animate-fade-in">
        <h2>The "Autocomplete" Analogy</h2>
        <p>
          Think of LLMs as incredibly advanced autocomplete. They’ve read billions of sentences, so they are experts at predicting the next likely word.
        </p>
        <div className="bg-slate-50 p-6 rounded-lg my-6 border border-slate-200 text-center">
           <p className="text-xl text-slate-800 font-medium">
             "The quick brown fox jumps over the..."
           </p>
           <p className="text-sm text-slate-500 mt-2">
             The model predicts <strong>"lazy dog"</strong> because that's the pattern it knows.
           </p>
        </div>
        <p className="text-slate-600">
          This is why AI is so good at creative tasks (poems, emails, code) but risky with facts. It doesn't always "know" the truth; it knows what <em>sounds</em> right.
        </p>
        
        {/* Resource Hook */}
        <div className="mt-8 flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
           <BookOpen className="w-5 h-5 text-slate-500" />
           <div className="flex-1 text-sm text-slate-600">
             Want a deeper dive on how LLMs actually work?
           </div>
           <Button variant="ghost" size="sm" onClick={() => push('/reference/resources')}>
             Open Resource Library
           </Button>
        </div>
      </section>
    ),

    // SECTION 3: HALLUCINATIONS
    (
      <section key="hallucinations" id="hallucinations" className="mb-12 animate-fade-in">
        <h2>The Trust Gap: Hallucinations</h2>
        <p>
          Because the AI is optimizing for "what sounds like a good answer," it sometimes prioritizes <strong>fluency</strong> over <strong>fact</strong>.
        </p>
        <Callout variant="warning" title="What is a Hallucination?">
          A confident, plausible-sounding answer that is completely made up.
        </Callout>
        
        <div className="my-6 not-prose">
          <h3 className="font-bold text-slate-900 mb-3">Real World Example:</h3>
          <Card className="p-6 bg-slate-50">
            <p className="font-mono text-sm text-slate-600 mb-2"><strong>User:</strong> "Summarize the 'Project Apollo' strategic report from 2019."</p>
            <p className="font-mono text-sm text-slate-800 mb-2"><strong>AI:</strong> "Project Apollo was a strategic initiative launched in Q3 2019 to optimize cloud infrastructure..."</p>
            <div className="flex items-center gap-2 text-red-600 text-sm font-bold mt-4">
              <AlertTriangle className="w-4 h-4" /> 
              Reality Check: We never had a "Project Apollo". The AI invented a plausible-sounding project because you asked for it.
            </div>
          </Card>
        </div>
      </section>
    ),

    // SECTION 4: STRENGTHS
    (
      <section key="strengths" id="strengths" className="mb-12 animate-fade-in">
        <h2>Use the "Jagged Frontier"</h2>
        <p>
          AI is a genius at some tasks and surprisingly bad at others. To get value, you need to use it for its superpowers, not its weak spots.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
             <h3 className="font-bold text-green-800 flex items-center gap-2 mb-4">
               <CheckCircle2 className="w-5 h-5" /> The Superpowers
             </h3>
             <ul className="space-y-3 text-sm text-slate-700">
               <li><strong>Transformation:</strong> "Turn this messy list into a clean table."</li>
               <li><strong>Summarization:</strong> "Give me the top 3 themes from this transcript."</li>
               <li><strong>Ideation:</strong> "Give me 10 ideas for a project name."</li>
               <li><strong>Drafting:</strong> "Write a polite first draft of this difficult email."</li>
             </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
             <h3 className="font-bold text-red-800 flex items-center gap-2 mb-4">
               <XCircle className="w-5 h-5" /> The Danger Zone
             </h3>
             <ul className="space-y-3 text-sm text-slate-700">
               <li><strong>Fact Retrieval:</strong> "What was our exact Q3 revenue?" (Check the dashboard).</li>
               <li><strong>Math:</strong> "Calculate the variance across these 50 rows." (Use Excel).</li>
               <li><strong>High Stakes:</strong> "Should we approve this loan?" (Use Human Judgment).</li>
             </ul>
          </div>
        </div>
      </section>
    ),

    // SECTION 5: QUIZ
    (
      <section key="quiz" id="quiz" className="mb-12 pt-8 border-t border-slate-200 animate-fade-in">
        <h2>Knowledge Check</h2>
        <p className="mb-6">Which task is best suited for Generative AI?</p>

        <Card className="p-6 bg-slate-50 not-prose">
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => { setQuizAnswer('math'); setShowExplanation(true); }}
              className={`text-left p-4 rounded border-2 transition-all ${
                quizAnswer === 'math' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-bold block mb-1">A. Calculate the exact variance of our yearly budget.</span>
            </button>

            <button
              onClick={() => { setQuizAnswer('summary'); setShowExplanation(true); }}
              className={`text-left p-4 rounded border-2 transition-all ${
                quizAnswer === 'summary' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-bold block mb-1">B. Summarize a 10-page project proposal into key risks.</span>
            </button>
            
            <button
              onClick={() => { setQuizAnswer('search'); setShowExplanation(true); }}
              className={`text-left p-4 rounded border-2 transition-all ${
                quizAnswer === 'search' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-bold block mb-1">C. Find the phone number for Client X.</span>
            </button>
          </div>

          {showExplanation && (
            <div className="mt-6 animate-fade-in">
              {quizAnswer === 'summary' ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                  <p className="font-bold">Spot on.</p>
                  <p className="text-sm mt-1">
                    Summarization is the classic LLM use case. It excels at reading text and extracting themes. Math and phone numbers are risky—better left to calculators and directories.
                  </p>
                </div>
              ) : (
                <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                  <p className="font-bold">Careful.</p>
                  <p className="text-sm mt-1">
                    LLMs can make math errors and invent facts (like phone numbers). They are safest when working with text you provide, like summarizing a document.
                  </p>
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
      title="AI Fundamentals"
      description="Look under the hood. Understand how Large Language Models (LLMs) actually work, so you know when to trust them—and when to doubt them."
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
          <Button onClick={() => push('/modules')} variant="outline">
            Finish module <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </ModuleLayout>
  );
}