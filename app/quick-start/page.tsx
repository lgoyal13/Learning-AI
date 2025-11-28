
import React, { useState } from 'react';
import { PageLayout, Card, Button, ProgressBar, Callout, Badge } from '../../components/ui';
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
  FileText
} from 'lucide-react';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // --- Step 1 State ---
  const [userPrompt, setUserPrompt] = useState('');
  const [showExpert, setShowExpert] = useState(false);

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

  // Shared Styles
  const textAreaStyles = "w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-900 bg-white placeholder:text-slate-400";
  const inputStyles = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white placeholder:text-slate-400";

  // --- Render Step 1: Comparison ---
  const renderStep1 = () => (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 1: Write the prompt you’d normally use</h2>
        <p className="text-lg text-slate-600 mb-6">
          Let’s use a real-world scenario, not a toy example. Imagine this just happened at work.
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
            <label className="font-bold text-slate-700">How would you ask your AI for help?</label>
            <textarea
              className={textAreaStyles}
              placeholder="e.g., Write a summary of this meeting..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={5}
            />
            <p className="text-xs text-slate-500">Type the exact prompt you’d paste into Gemini, ChatGPT, or Claude.</p>
            
            {!showExpert && (
              <Button 
                variant="outline" 
                onClick={() => setShowExpert(true)} 
                className="mt-4 self-start"
                disabled={userPrompt.length === 0}
              >
                Show expert version <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
        </div>

        {/* Expert Side - Full Width Below */}
        {showExpert && (
          <div className="animate-fade-in mt-12 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-blue-700 mb-4 flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5" /> A prompt a power user would try
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-6 text-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 font-bold text-blue-900">Persona</div>
                  <div className="md:col-span-3">Act as a Project Manager.</div>
                </div>
                
                <div className="border-t border-blue-200/50 pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 font-bold text-blue-900">Context</div>
                  <div className="md:col-span-3">We decided to delay launch by 2 weeks. Stakeholders are nervous about budget.</div>
                </div>

                <div className="border-t border-blue-200/50 pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                   <div className="md:col-span-1 font-bold text-blue-900">Task</div>
                   <div className="md:col-span-3">Write a recap email for the "Website Redesign" kickoff meeting.</div>
                </div>

                <div className="border-t border-blue-200/50 pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                   <div className="md:col-span-1 font-bold text-blue-900">Requirements</div>
                   <div className="md:col-span-3">Use bullet points. Tone should be confident but realistic. Keep it under 200 words.</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3 text-sm">Why this works better:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Persona:</strong> Tells the AI <em>who</em> to be.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Context:</strong> Explains the "vibe" (nervous stakeholders).</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Requirements:</strong> Sets constraints.</span>
                  </li>
                </ul>
              </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- Render Step 2: Builder ---
  const renderStep2 = () => {
    const previewString = `Persona: ${pctr.persona || '[Who is the AI?]'}\n\nContext: ${pctr.context || '[What is the background?]'}\n\nTask: ${pctr.task || '[What do you need done?]'}\n\nRequirements: ${pctr.requirements || '[Format, tone, length?]'}`;

    return (
      <div className="animate-fade-in space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 2: Turn your task into a structured prompt</h2>
          <p className="text-lg text-slate-600 mb-6">
            Fill in each box using information from the scenario below. Notice how a messy task turns into a structured prompt.
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
                <label className="block text-sm font-bold text-slate-700 mb-1">Persona <span className="font-normal text-slate-500">- Who is the AI?</span></label>
                <input 
                  type="text" 
                  className={inputStyles}
                  placeholder="e.g., Product Manager communicating to Execs"
                  value={pctr.persona}
                  onChange={e => setPctr({...pctr, persona: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Context <span className="font-normal text-slate-500">- Background info & audience</span></label>
                <textarea 
                  className={textAreaStyles}
                  rows={3}
                  placeholder="e.g., Audience is Marketing VP. Feature is delayed due to bugs."
                  value={pctr.context}
                  onChange={e => setPctr({...pctr, context: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Task <span className="font-normal text-slate-500">- What do you need done?</span></label>
                <input 
                  type="text" 
                  className={inputStyles}
                  placeholder="e.g., Draft an update email explaining the delay"
                  value={pctr.task}
                  onChange={e => setPctr({...pctr, task: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Requirements <span className="font-normal text-slate-500">- Format, tone, length</span></label>
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
        feedbackCorrect: 'Correct! It is a simple task.',
        feedbackWrong: 'Overkill. Summary is a standard task; Zero-shot is fine.',
        examplePrompt: 'Summarize this article in 3 bullet points.'
      },
      {
        id: 'B',
        title: 'Scenario B: Writing a LinkedIn post that must sound exactly like your CEO.',
        correct: 'few',
        correctLabel: 'Few-Shot',
        feedbackCorrect: 'Correct! Providing examples (shots) ensures style matching.',
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
        feedbackCorrect: 'Correct! Complex logic needs "Step-by-step" reasoning.',
        feedbackWrong: 'This is complex. Ask it to "Think step-by-step" to avoid errors.',
        examplePrompt: `Read the attached policy. Then, categorize these tickets.

For each ticket, think step-by-step:
1. Identify the user issue.
2. Check which policy section applies.
3. Assign the category.
`
      }
    ];

    return (
      <div className="animate-fade-in space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 3: Match your technique to the task</h2>
          <p className="text-lg text-slate-600 mb-8">
            Now that you can structure a prompt, let’s add one more layer: when to ask for more examples, and when to let your AI think step-by-step.
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
                <Brain className="w-4 h-4 text-emerald-500" /> Chain-of-Thought
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Think step-by-step</p>
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
                    <div className="flex gap-2 mb-3">
                      <Button size="sm" variant={userChoice === 'zero' ? 'primary' : 'outline'} onClick={() => handleQuizClick(s.id, 'zero')}>Zero-Shot</Button>
                      <Button size="sm" variant={userChoice === 'few' ? 'primary' : 'outline'} onClick={() => handleQuizClick(s.id, 'few')}>Few-Shot</Button>
                      <Button size="sm" variant={userChoice === 'cot' ? 'primary' : 'outline'} onClick={() => handleQuizClick(s.id, 'cot')}>Chain-of-Thought</Button>
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
        <h2 className="text-2xl font-bold text-slate-900 mb-2">You are ready</h2>
        <p className="text-lg text-slate-600 mb-8">
          You have learned the <strong>PCTR</strong> framework, how to delegate using <strong>Persona</strong>, and when to use <strong>Few-Shot</strong> examples.
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
        <div className="mt-12 pt-8 border-t border-slate-200">
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

            <Button onClick={handleNext} disabled={currentStep === 1 && !showExpert}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
