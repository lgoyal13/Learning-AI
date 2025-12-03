import React, { useState } from 'react';
import { PageLayout, Card, Button, ProgressBar, Callout, Badge, PromptCard } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  Copy, 
  ExternalLink,
  MessageSquare,
  Lightbulb,
  Brain,
  List,
  Layers,
  Check,
  Home,
  Book,
  FileText,
  User,
  Target,
  ListChecks,
  MousePointerClick,
  Sparkles,
  Loader2,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { evaluatePrompt } from '../../services/geminiService';
import { PromptEvaluationOutput } from '../../types';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // --- Step 1 State ---
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState<PromptEvaluationOutput | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // --- Step 2 State (P.C.T.R) ---
  const [pctr, setPctr] = useState({
    persona: '',
    context: '',
    task: '',
    requirements: ''
  });
  const [copiedPctr, setCopiedPctr] = useState(false);

  // --- Step 3 State (Quiz) ---
  const [quizState, setQuizState] = useState<Record<string, string | null>>({});

  const handleNext = () => {
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPctr(true);
    setTimeout(() => setCopiedPctr(false), 2000);
  };

  const handleGetFeedback = async () => {
    if (!userPrompt.trim()) return;
    setIsFeedbackLoading(true);
    setFeedbackError(null);
    setFeedback(null);
    
    // Scenario text from the UI context
    const scenarioText = "You’ve just left a messy project meeting. You need to send a recap email to stakeholders so everyone knows what was decided and what happens next.";

    try {
      const result = await evaluatePrompt(userPrompt, scenarioText);
      setFeedback(result);
    } catch (err) {
      setFeedbackError("We couldn't analyze your prompt right now. Please try again.");
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  // Shared Styles
  const textAreaStyles = "w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-900 bg-white placeholder:text-slate-400";
  const inputStyles = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white placeholder:text-slate-400";

  // --- Render Step 1: Comparison ---
  const renderStep1 = () => {
    const getRatingVariant = (rating: string) => {
      switch (rating) {
        case 'Strong': return 'success';
        case 'Okay': return 'warning';
        case 'Missing': return 'danger';
        default: return 'neutral';
      }
    };

    const getRatingStyles = (rating: string) => {
      switch (rating) {
        case 'Strong': return 'bg-green-50 border-green-200 text-green-900';
        case 'Okay': return 'bg-amber-50 border-amber-200 text-amber-900';
        case 'Missing': return 'bg-red-50 border-red-200 text-red-900';
        default: return 'bg-slate-50 border-slate-200 text-slate-900';
      }
    };

    return (
      <div className="animate-fade-in space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 1: Write the prompt you normally would</h2>
          <p className="text-lg text-slate-600 mb-6">
            Type the prompt you would usually send to an AI tool for this task.
          </p>

          <Card className="bg-slate-50 border-slate-200 p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Scenario
            </h3>
            <p className="text-slate-700">
              You’ve just left a messy project meeting. You need to send a recap email to stakeholders so everyone knows what was decided and what happens next.
            </p>
          </Card>

          {/* User Input Section - Full Width */}
          <div className="flex flex-col space-y-3">
              <label className="font-bold text-slate-700">Your usual prompt</label>
              <textarea
                className={textAreaStyles}
                placeholder="e.g., Write a summary of this meeting..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={5}
              />
              
              <Button 
                onClick={handleGetFeedback} 
                isLoading={isFeedbackLoading}
                disabled={userPrompt.length === 0}
                className="mt-4 self-start"
              >
                Get feedback on your prompt <Sparkles className="w-4 h-4 ml-2" />
              </Button>
          </div>

          {/* Feedback Section */}
          {(isFeedbackLoading || feedback || feedbackError) && (
            <div className="animate-fade-in mt-12 pt-8 border-t border-slate-200">
              
              {/* Loading State */}
              {isFeedbackLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                  <p className="font-medium animate-pulse">Analyzing your prompt against the PCTR rubric...</p>
                </div>
              )}

              {/* Error State */}
              {feedbackError && (
                 <Callout variant="danger" title="Error">
                   {feedbackError}
                 </Callout>
              )}

              {/* Success State */}
              {feedback && !isFeedbackLoading && (
                <div className="space-y-8 animate-slide-up">
                  
                  {/* Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" /> AI Coach Feedback
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed bg-blue-50 border border-blue-100 p-4 rounded-xl">
                      {feedback.summary}
                    </p>
                  </div>

                  {/* PCTR Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Persona */}
                    <div className={`p-5 rounded-xl border ${getRatingStyles(feedback.pctr.persona.rating)}`}>
                       <div className="flex justify-between items-start mb-2">
                         <span className="font-bold flex items-center gap-2"><User className="w-4 h-4"/> Persona</span>
                         <Badge variant={getRatingVariant(feedback.pctr.persona.rating)}>{feedback.pctr.persona.rating}</Badge>
                       </div>
                       <p className="text-sm opacity-90">{feedback.pctr.persona.comment}</p>
                    </div>

                    {/* Context */}
                    <div className={`p-5 rounded-xl border ${getRatingStyles(feedback.pctr.context.rating)}`}>
                       <div className="flex justify-between items-start mb-2">
                         <span className="font-bold flex items-center gap-2"><Layers className="w-4 h-4"/> Context</span>
                         <Badge variant={getRatingVariant(feedback.pctr.context.rating)}>{feedback.pctr.context.rating}</Badge>
                       </div>
                       <p className="text-sm opacity-90">{feedback.pctr.context.comment}</p>
                    </div>

                    {/* Task */}
                    <div className={`p-5 rounded-xl border ${getRatingStyles(feedback.pctr.task.rating)}`}>
                       <div className="flex justify-between items-start mb-2">
                         <span className="font-bold flex items-center gap-2"><Target className="w-4 h-4"/> Task</span>
                         <Badge variant={getRatingVariant(feedback.pctr.task.rating)}>{feedback.pctr.task.rating}</Badge>
                       </div>
                       <p className="text-sm opacity-90">{feedback.pctr.task.comment}</p>
                    </div>

                    {/* Requirements */}
                    <div className={`p-5 rounded-xl border ${getRatingStyles(feedback.pctr.requirements.rating)}`}>
                       <div className="flex justify-between items-start mb-2">
                         <span className="font-bold flex items-center gap-2"><ListChecks className="w-4 h-4"/> Requirements</span>
                         <Badge variant={getRatingVariant(feedback.pctr.requirements.rating)}>{feedback.pctr.requirements.rating}</Badge>
                       </div>
                       <p className="text-sm opacity-90">{feedback.pctr.requirements.comment}</p>
                    </div>
                  </div>

                  {/* Improved Prompt */}
                  <div className="space-y-3">
                     <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" /> Suggested version
                     </h4>
                     <PromptCard label="REWRITTEN PROMPT" prompt={feedback.improvedPrompt} />
                  </div>

                  {/* Tip */}
                  <Callout variant="success" title="Coach's Tip">
                    {feedback.tip}
                  </Callout>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Render Step 2: Builder ---
  const renderStep2 = () => {
    const previewString = `Persona: ${pctr.persona || '[Who is the AI?]'}\n\nContext: ${pctr.context || '[What is the background?]'}\n\nTask: ${pctr.task || '[What do you need done?]'}\n\nRequirements: ${pctr.requirements || '[Format, tone, length?]'}`;

    return (
      <div className="animate-fade-in space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 2: Turn it into a structured PCTR prompt</h2>
          <p className="text-lg text-slate-600 mb-6">
            Fill in Persona, Context, Task, and Requirements so the model knows exactly what you want.
          </p>
          
          <Card className="bg-slate-50 border-slate-200 p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Scenario: The Messy Update
            </h3>
            <p className="text-slate-700 leading-relaxed">
              You have a messy email thread from the engineering team about the new "Search Bar" feature. It is full of jargon, bug reports, and delay notices. You need to write a clean, non-technical update for the Marketing VP explaining when it will launch and why it is late.
            </p>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Persona</label>
                <p className="text-xs text-slate-500 mb-2">Tell the model who it is acting as.</p>
                <input 
                  type="text" 
                  className={inputStyles}
                  placeholder="e.g., Product Manager communicating to Execs"
                  value={pctr.persona}
                  onChange={e => setPctr({...pctr, persona: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Context</label>
                <p className="text-xs text-slate-500 mb-2">Share the minimum background it needs to do the job.</p>
                <textarea 
                  className={textAreaStyles}
                  rows={3}
                  placeholder="e.g., Audience is Marketing VP. Feature is delayed due to bugs."
                  value={pctr.context}
                  onChange={e => setPctr({...pctr, context: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Task</label>
                <p className="text-xs text-slate-500 mb-2">State exactly what you want done.</p>
                <input 
                  type="text" 
                  className={inputStyles}
                  placeholder="e.g., Draft an update email explaining the delay"
                  value={pctr.task}
                  onChange={e => setPctr({...pctr, task: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Requirements</label>
                <p className="text-xs text-slate-500 mb-2">Add any constraints for tone, length, and format.</p>
                <input 
                  type="text" 
                  className={inputStyles}
                  placeholder="e.g., Non-technical, reassuring tone, under 150 words"
                  value={pctr.requirements}
                  onChange={e => setPctr({...pctr, requirements: e.target.value})}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-slate-700 mb-1">Your prompt preview</label>
              <div className="flex-1 bg-slate-900 rounded-xl p-6 shadow-lg flex flex-col relative group min-h-[300px]">
                <div className="font-mono text-sm text-slate-300 whitespace-pre-wrap flex-1 leading-relaxed">
                  {previewString}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Ready to copy</span>
                  <button 
                    onClick={() => copyToClipboard(previewString)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-colors"
                  >
                    {copiedPctr ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedPctr ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <Callout variant="info" title="Pro tip" className="mt-4">
                 If the answer feels off, tweak Context or Requirements first before you rewrite the whole prompt.
              </Callout>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Render Step 3: Techniques ---
  const renderStep3 = () => {
    const handleQuizClick = (scenario: string, choice: string) => {
      setQuizState(prev => ({ ...prev, [scenario]: choice }));
    };

    const scenarios = [
      {
        id: 'A',
        title: 'Scenario A: You need a summary of a simple news article.',
        correct: 'zero',
        correctLabel: 'Zero-Shot',
        feedbackCorrect: 'Best match: Correct! It is a simple task.',
        feedbackWrong: 'Overkill. Summary is a standard task; Zero-shot is fine.',
        examplePrompt: 'Summarize this article in 3 bullet points.'
      },
      {
        id: 'B',
        title: 'Scenario B: Writing a LinkedIn post that must sound exactly like your CEO.',
        correct: 'few',
        correctLabel: 'Few-Shot',
        feedbackCorrect: 'Best match: Correct! Providing examples (shots) ensures style matching.',
        feedbackWrong: 'Without examples (Few-shot), the AI will just guess the tone.',
        examplePrompt: `Write a LinkedIn post about Q3 results.
        
Example 1: "Thrilled to announce..."
Example 2: "Another record quarter..."

Task: Write a new post in this same style about our new product.`
      },
      {
        id: 'C',
        title: 'Scenario C: Categorizing 50 support tickets based on a complex 10-page policy PDF.',
        correct: 'cot',
        correctLabel: 'Chain-of-Thought',
        feedbackCorrect: 'Best match: Correct! Complex logic needs "Step-by-step" reasoning.',
        feedbackWrong: 'This is complex. Ask it to "Think step-by-step" to avoid errors.',
        examplePrompt: `Read the attached policy. Then, categorize these tickets.

For each ticket, think step-by-step:
1. Identify the user issue.
2. Check which policy section applies.
3. Assign the category.
`
      }
    ];

    const ChoiceButton = ({ choice, label, subtext, current, onClick }: { choice: string, label: string, subtext: string, current: string | null, onClick: () => void }) => (
       <button 
         onClick={onClick}
         className={`flex-1 p-3 rounded-lg border text-left transition-all hover:shadow-sm ${
           current === choice 
             ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' 
             : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 cursor-pointer'
         }`}
       >
         <span className={`block font-bold text-sm mb-1 ${current === choice ? 'text-blue-900' : 'text-slate-900'}`}>{label}</span>
         <span className="block text-xs text-slate-500">{subtext}</span>
       </button>
    );

    return (
      <div className="animate-fade-in space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 3: Pick the right technique for the task</h2>
          <p className="text-lg text-slate-600 mb-8">
            Match your task to zero shot, few shot, or step by step prompting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-5 border-t-4 border-t-blue-500">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                <Zap className="w-4 h-4 text-blue-500" /> Zero-Shot
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Ask directly</p>
              <p className="text-sm text-slate-600">Use when the task is simple and unambiguous.</p>
            </Card>

            <Card className="p-5 border-t-4 border-t-purple-500">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                <Layers className="w-4 h-4 text-purple-500" /> Few-Shot
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Show examples</p>
              <p className="text-sm text-slate-600">Use when you care about specific style or format.</p>
            </Card>

            <Card className="p-5 border-t-4 border-t-emerald-500">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                <Brain className="w-4 h-4 text-emerald-500" /> Step-by-Step
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Chain of Thought</p>
              <p className="text-sm text-slate-600">Use for math, logic, or complex decisions.</p>
            </Card>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Which technique would you pick?
            </h3>

            <div className="space-y-8">
              {scenarios.map((s) => {
                const userChoice = quizState[s.id];
                const isCorrect = userChoice === s.correct;
                const hasAnswered = !!userChoice;

                return (
                  <div key={s.id} className="border-b border-slate-200 pb-8 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-slate-800 mb-3">{s.title}</p>
                    
                    <div className="mb-3 p-3 bg-white border border-blue-100 rounded-lg flex items-center gap-2 shadow-sm">
                       <MousePointerClick className="w-4 h-4 text-blue-500" />
                       <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Select a tile to check your answer:</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mb-3">
                      <ChoiceButton 
                        choice="zero" 
                        label="Zero shot" 
                        subtext="One direct ask." 
                        current={userChoice || null}
                        onClick={() => handleQuizClick(s.id, 'zero')}
                      />
                      <ChoiceButton 
                        choice="few" 
                        label="Few shot" 
                        subtext="Show one or two examples first." 
                        current={userChoice || null}
                        onClick={() => handleQuizClick(s.id, 'few')}
                      />
                      <ChoiceButton 
                        choice="cot" 
                        label="Step by step" 
                        subtext="Ask the model to reason through the steps." 
                        current={userChoice || null}
                        onClick={() => handleQuizClick(s.id, 'cot')}
                      />
                    </div>
                    
                    {hasAnswered && (
                      <div className="animate-fade-in bg-white border border-slate-200 rounded-lg p-4 mt-3">
                        {isCorrect ? (
                          <p className="text-xs text-green-600 font-bold flex items-center gap-1 mb-2">
                            <CheckCircle2 className="w-3 h-3"/> {s.feedbackCorrect}
                          </p>
                        ) : (
                          <p className="text-xs text-slate-500 mb-2">
                            {s.feedbackWrong}
                          </p>
                        )}
                        
                        <div className="mt-3 pt-3 border-t border-slate-100">
                           <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Example {s.correctLabel} Prompt</span>
                           <div className="font-mono text-xs text-slate-700 bg-slate-50 p-2 rounded whitespace-pre-wrap">
                             {s.examplePrompt}
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Render Step 4: Completion & Exit Paths ---
  const renderStep4 = () => (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 4: Jump into a model and practice</h2>
        <p className="text-lg text-slate-600 mb-8">
          Take your new prompt style straight into Gemini, ChatGPT, or Claude.
        </p>

        {/* Exit Paths */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 mb-8 text-center">
           <h3 className="text-xl font-bold text-slate-900 mb-6">What do you want to do next?</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Card 
               className="p-6 hover:border-blue-400 cursor-pointer group hover:shadow-md transition-all flex flex-col items-center text-center"
               onClick={() => push('/modules')}
             >
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
                  <List className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Browse Modules</h4>
                <p className="text-sm text-slate-500 mb-4">Deep dive into specific tools.</p>
                <span className="text-xs font-bold text-blue-600 group-hover:underline">Go to Learning Path</span>
             </Card>

             <Card 
               className="p-6 hover:border-purple-400 cursor-pointer group hover:shadow-md transition-all flex flex-col items-center text-center"
               onClick={() => push('/reference')}
             >
                <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-3">
                  <Book className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Template Library</h4>
                <p className="text-sm text-slate-500 mb-4">Copy-paste approved prompts.</p>
                <span className="text-xs font-bold text-purple-600 group-hover:underline">View Templates</span>
             </Card>

             <Card 
               className="p-6 hover:border-slate-400 cursor-pointer group hover:shadow-md transition-all flex flex-col items-center text-center"
               onClick={() => push('/')}
             >
                <div className="p-3 bg-slate-100 text-slate-600 rounded-full mb-3">
                  <Home className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Return Home</h4>
                <p className="text-sm text-slate-500 mb-4">Back to the main dashboard.</p>
                <span className="text-xs font-bold text-slate-600 group-hover:underline">Go Home</span>
             </Card>
           </div>
        </div>

        {/* Tools Links (Secondary) */}
        <div className="mt-8 pt-8 border-t border-slate-200">
           <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Practice in your own tools</p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                 <Zap className="w-4 h-4 text-blue-500" /> Open Gemini
                 <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
              </a>
              <a href="https://chatgpt.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                 <MessageSquare className="w-4 h-4 text-green-500" /> Open ChatGPT
                 <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
              </a>
              <a href="https://claude.ai" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                 <Brain className="w-4 h-4 text-purple-500" /> Open Claude
                 <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
              </a>
           </div>
        </div>

        {/* Recap */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Quick recap</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600" /> Use Persona, Context, Task, and Requirements to shape your prompts.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600" /> Try zero shot, few shot, and step by step, then keep the one that works.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600" /> Practice directly in Gemini, ChatGPT, or Claude to make these habits stick.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <PageLayout 
      title="Prompting Quickstart" 
      description="Stop playing with toy examples. Use this interactive guide to build a high-quality prompt for your real work in under 5 minutes."
    >
      <div className="max-w-4xl mx-auto pb-12">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation */}
        {currentStep < totalSteps && (
          <div className="flex justify-between mt-12 pt-8 border-t border-slate-200">
            <Button 
              variant="secondary" 
              onClick={handlePrev} 
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>

            <Button onClick={handleNext} disabled={currentStep === 1 && !feedback}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}