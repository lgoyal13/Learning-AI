
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
  Check
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
    role: '',
    task: '',
    context: '',
    requirements: '',
    examples: ''
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Side */}
          <div className="flex flex-col">
            <label className="font-bold text-slate-700 mb-2">How would you ask your AI for help?</label>
            <textarea
              className="w-full h-40 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-700"
              placeholder="e.g., Write a summary of this meeting..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-2">Type the exact prompt you’d paste into Gemini, ChatGPT, or Claude.</p>
            
            {!showExpert && (
              <Button 
                variant="outline" 
                onClick={() => setShowExpert(true)} 
                className="mt-6 self-start"
                disabled={userPrompt.length === 0}
              >
                Show expert version <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Expert Side */}
          {showExpert && (
            <div className="animate-fade-in flex flex-col h-full">
              <label className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> A prompt a power user would try
              </label>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 h-40 overflow-y-auto text-sm text-slate-800 space-y-2">
                <p><strong>Act as a Project Manager.</strong></p>
                <p><strong>Task:</strong> Write a recap email for the "Website Redesign" kickoff meeting.</p>
                <p><strong>Context:</strong> We decided to delay launch by 2 weeks. Stakeholders are nervous about budget.</p>
                <p><strong>Requirements:</strong> Use bullet points. Tone should be confident but realistic. Keep it under 200 words.</p>
              </div>

              <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Spot the differences:</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Role:</strong> Tells the AI <em>who</em> to be.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Context:</strong> Explains the "vibe" (nervous stakeholders).</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Requirements:</strong> Sets length and format constraints.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // --- Render Step 2: Builder ---
  const renderStep2 = () => {
    const previewString = `You are ${pctr.role || '[Role]'}.\nYour task is to ${pctr.task || '[Task]'}.\nHere is the context: ${pctr.context || '[Context]'}.\nPlease follow these requirements: ${pctr.requirements || '[Requirements]'}.${pctr.examples ? `\nExamples: ${pctr.examples}` : ''}`;

    return (
      <div className="animate-fade-in space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 2: Turn your task into a structured prompt</h2>
          <p className="text-lg text-slate-600 mb-6">
            Most good prompts share the same bones: Role, Task, Context, and Requirements (P.C.T.R). Fill these in once, and you can reuse them across tools.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Role <span className="font-normal text-slate-500">- Who is the AI?</span></label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Expert Copywriter, Senior Developer"
                  value={pctr.role}
                  onChange={e => setPctr({...pctr, role: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Task <span className="font-normal text-slate-500">- What do you need done?</span></label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Draft a press release, Debug this SQL"
                  value={pctr.task}
                  onChange={e => setPctr({...pctr, task: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Context <span className="font-normal text-slate-500">- Background info & audience</span></label>
                <textarea 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                  placeholder="e.g., Audience is technical managers. We are launching on Monday."
                  value={pctr.context}
                  onChange={e => setPctr({...pctr, context: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Requirements <span className="font-normal text-slate-500">- Format, tone, length</span></label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Bullet points, professional tone, under 200 words"
                  value={pctr.requirements}
                  onChange={e => setPctr({...pctr, requirements: e.target.value})}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-slate-700 mb-1">Your prompt preview</label>
              <div className="flex-1 bg-slate-900 rounded-xl p-6 shadow-lg flex flex-col relative group">
                <div className="font-mono text-sm text-slate-300 whitespace-pre-wrap flex-1 leading-relaxed">
                  {previewString}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Ready to copy into your AI tool</span>
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
              <p className="text-sm text-slate-600 mb-3">Use when the task is simple and unambiguous.</p>
              <div className="bg-slate-50 p-2 rounded text-xs text-slate-700 italic border border-slate-100">
                "Summarize this email in 5 bullets."
              </div>
            </Card>

            <Card className="p-5 border-t-4 border-t-purple-500">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                <Layers className="w-4 h-4 text-purple-500" /> Few-Shot
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Show examples</p>
              <p className="text-sm text-slate-600 mb-3">Use when you care about specific style or format.</p>
              <div className="bg-slate-50 p-2 rounded text-xs text-slate-700 italic border border-slate-100">
                "Here are 3 example tweets. Write a 4th one matching this style."
              </div>
            </Card>

            <Card className="p-5 border-t-4 border-t-emerald-500">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                <Brain className="w-4 h-4 text-emerald-500" /> Chain-of-Thought
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Think step-by-step</p>
              <p className="text-sm text-slate-600 mb-3">Use for math, logic, or complex decisions.</p>
              <div className="bg-slate-50 p-2 rounded text-xs text-slate-700 italic border border-slate-100">
                "First, categorize the error. Then, suggest a fix. Finally, draft the reply."
              </div>
            </Card>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Which technique would you pick?
            </h3>

            <div className="space-y-6">
              {/* Scenario 1 */}
              <div className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-800 mb-3">Scenario A: You need a summary of a simple news article.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant={quizState['A'] === 'zero' ? 'primary' : 'outline'} onClick={() => handleQuizClick('A', 'zero')}>Zero-Shot</Button>
                  <Button size="sm" variant={quizState['A'] === 'few' ? 'primary' : 'outline'} onClick={() => handleQuizClick('A', 'few')}>Few-Shot</Button>
                  <Button size="sm" variant={quizState['A'] === 'cot' ? 'primary' : 'outline'} onClick={() => handleQuizClick('A', 'cot')}>Chain-of-Thought</Button>
                </div>
                {quizState['A'] === 'zero' && <p className="mt-2 text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Correct! It's a simple task.</p>}
                {(quizState['A'] && quizState['A'] !== 'zero') && <p className="mt-2 text-xs text-slate-500">Overkill. Summary is a standard task; Zero-shot is fine.</p>}
              </div>

              {/* Scenario 2 */}
              <div className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-800 mb-3">Scenario B: Writing a LinkedIn post that must sound exactly like your CEO.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant={quizState['B'] === 'zero' ? 'primary' : 'outline'} onClick={() => handleQuizClick('B', 'zero')}>Zero-Shot</Button>
                  <Button size="sm" variant={quizState['B'] === 'few' ? 'primary' : 'outline'} onClick={() => handleQuizClick('B', 'few')}>Few-Shot</Button>
                  <Button size="sm" variant={quizState['B'] === 'cot' ? 'primary' : 'outline'} onClick={() => handleQuizClick('B', 'cot')}>Chain-of-Thought</Button>
                </div>
                {quizState['B'] === 'few' && <p className="mt-2 text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Correct! Providing examples (shots) of previous posts ensures style matching.</p>}
                {(quizState['B'] && quizState['B'] !== 'few') && <p className="mt-2 text-xs text-slate-500">Without examples (Few-shot), the AI will just guess the generic tone.</p>}
              </div>

               {/* Scenario 3 */}
               <div className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-800 mb-3">Scenario C: Categorizing 50 support tickets based on a complex 10-page policy PDF.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant={quizState['C'] === 'zero' ? 'primary' : 'outline'} onClick={() => handleQuizClick('C', 'zero')}>Zero-Shot</Button>
                  <Button size="sm" variant={quizState['C'] === 'few' ? 'primary' : 'outline'} onClick={() => handleQuizClick('C', 'few')}>Few-Shot</Button>
                  <Button size="sm" variant={quizState['C'] === 'cot' ? 'primary' : 'outline'} onClick={() => handleQuizClick('C', 'cot')}>Chain-of-Thought</Button>
                </div>
                {quizState['C'] === 'cot' && <p className="mt-2 text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Correct! Complex logic needs "Step-by-step" reasoning.</p>}
                {(quizState['C'] && quizState['C'] !== 'cot') && <p className="mt-2 text-xs text-slate-500">This is complex. Ask it to "Think step-by-step" (Chain of Thought) to avoid errors.</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex gap-4 items-start">
             <div className="p-2 bg-indigo-100 rounded-full text-indigo-600 shrink-0">
               <Zap className="w-5 h-5" />
             </div>
             <div>
               <h4 className="font-bold text-indigo-900 text-sm mb-1">Fast vs Deep Modes (Very Short Version)</h4>
               <p className="text-sm text-indigo-800 leading-relaxed">
                 Use your AI’s <strong>fast/flash mode</strong> for quick drafts, simple summaries, and brainstorming.
                 <br/>
                 Switch to a <strong>deep/reasoning mode</strong> (or 'Deep Research') when you’re doing multi-step logic, careful analysis, or anything you’d show to a VP.
               </p>
             </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Render Step 4: Launch ---
  const renderStep4 = () => (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 4: Try this now in your own AI</h2>
        <p className="text-lg text-slate-600 mb-6">
          You’ve seen how to structure prompts and when to use different techniques. Now pick the AI you already have and try one of your prompts for real.
        </p>

        <Card className="bg-blue-50 border-blue-200 p-6 mb-8 text-center">
           <h3 className="font-bold text-blue-900 mb-2">Did you copy your prompt from Step 2?</h3>
           <p className="text-sm text-blue-800 mb-4">
             If not, go back and copy it. Then paste it into one of the tools below.
           </p>
           <p className="text-xs font-mono bg-white inline-block px-3 py-1 rounded text-blue-600 border border-blue-100">
             Try adding: "What would you change to make this even clearer for a VP?"
           </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-all group border-t-4 border-t-blue-500">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Gemini</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6 min-h-[60px]">
              Great inside Google Docs, Sheets, and for long, detailed reasoning.
            </p>
            <a 
              href="https://gemini.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors group-hover:border-blue-400 group-hover:text-blue-700"
            >
              Open Gemini <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all group border-t-4 border-t-green-500">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-slate-900">ChatGPT</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6 min-h-[60px]">
              Strong for writing, coding, and image generation.
            </p>
            <a 
              href="https://chatgpt.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors group-hover:border-green-400 group-hover:text-green-700"
            >
              Open ChatGPT <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all group border-t-4 border-t-purple-500">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-bold text-slate-900">Claude</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6 min-h-[60px]">
              Excellent at careful reading of long documents, with strong privacy defaults.
            </p>
            <a 
              href="https://claude.ai" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors group-hover:border-purple-400 group-hover:text-purple-700"
            >
              Open Claude <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Card>
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
        <div className="flex justify-between mt-12 pt-8 border-t border-slate-200">
          <Button 
            variant="secondary" 
            onClick={handlePrev} 
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={currentStep === 1 && !showExpert}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => push('/modules/prompting')} variant="primary">
              Finish Quickstart <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
