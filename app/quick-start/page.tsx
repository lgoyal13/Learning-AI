import React, { useState } from 'react';
import { PageLayout, Card, Button, ProgressBar, Callout, Badge } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { 
  ArrowRight, 
  ArrowLeft,
  BrainCircuit, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle,
  ThumbsUp,
  Zap,
  BookOpen,
  Mic,
  Copy,
  PenTool,
  ShieldAlert,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1: Model Choice State
  const [modelScenario, setModelScenario] = useState<'A' | 'B' | null>(null);
  const [modelChoice, setModelChoice] = useState<'fast' | 'deep' | null>(null);

  // Step 2: Prompt Builder State
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [constraints, setConstraints] = useState('');
  const [format, setFormat] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Step 3: Scenario Selection State
  const [selectedWorkScenario, setSelectedWorkScenario] = useState<string | null>(null);

  // Step 4: Safety Checklist State
  const [safetyChecks, setSafetyChecks] = useState({
    names: false,
    ids: false,
    sensitive: false
  });

  const totalSteps = 4;

  const handleNext = () => {
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Completion Screen
  if (currentStep === totalSteps) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
        <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-6">You're ready to start.</h2>
        <p className="text-xl text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
          You now have the framework: Pick the right model, build a structured prompt, and check for safety.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button size="lg" onClick={() => push('/modules')}>
            Continue Learning
          </Button>
          <Button size="lg" variant="outline" onClick={() => push('/playground')}>
            Try the Playground
          </Button>
        </div>

        {/* Resource Hook */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 max-w-lg mx-auto">
          <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" /> Want to go deeper?
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Visit the Resource Library for handpicked videos from experts like Tina Huang and Jeff Su.
          </p>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50" onClick={() => push('/reference/resources')}>
            Open Resource Library <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <section className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 1: Choose Your AI & Model</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                You can stick with whatever AI you already have access to—Gemini, ChatGPT, or Claude. 
                The important thing is knowing they all have two "speeds": a <strong>Fast</strong> mode for quick drafts, and a <strong>Reasoning/Deep</strong> mode for high-stakes thinking.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-4 bg-white border-blue-100">
                  <div className="flex items-center gap-2 mb-2 font-bold text-blue-900">
                    <Zap className="w-5 h-5 text-blue-600" /> Gemini
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Fast:</strong> Flash models.<br/>
                    <strong>Deep:</strong> Pro/Advanced models for nuance.
                  </p>
                </Card>
                <Card className="p-4 bg-white border-green-100">
                  <div className="flex items-center gap-2 mb-2 font-bold text-green-900">
                    <MessageSquare className="w-5 h-5 text-green-600" /> ChatGPT
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Fast:</strong> GPT-4o mini / default.<br/>
                    <strong>Deep:</strong> o1 / reasoning models for analysis.
                  </p>
                </Card>
                <Card className="p-4 bg-white border-purple-100">
                  <div className="flex items-center gap-2 mb-2 font-bold text-purple-900">
                    <BrainCircuit className="w-5 h-5 text-purple-600" /> Claude
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Fast:</strong> Haiku / Sonnet.<br/>
                    <strong>Deep:</strong> Opus / 3.5 Sonnet for careful reading.
                  </p>
                </Card>
              </div>

              <Card className="p-6 bg-slate-50 border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Quick Quiz: Pick the Right Mode</h3>
                
                {!modelScenario ? (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 mb-2">Select a scenario to test yourself:</p>
                    <button 
                      onClick={() => setModelScenario('A')}
                      className="w-full text-left p-3 bg-white border border-slate-200 rounded hover:border-blue-300 hover:text-blue-700 transition-colors text-sm font-medium"
                    >
                      Scenario A: "Drafting a quick follow-up email to confirm a meeting time."
                    </button>
                    <button 
                      onClick={() => setModelScenario('B')}
                      className="w-full text-left p-3 bg-white border border-slate-200 rounded hover:border-blue-300 hover:text-blue-700 transition-colors text-sm font-medium"
                    >
                      Scenario B: "Summarizing a 25-page strategy document for your VP."
                    </button>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <p className="font-medium text-slate-900 mb-4">
                      {modelScenario === 'A' 
                        ? 'Scenario A: "Drafting a quick follow-up email to confirm a meeting time."'
                        : 'Scenario B: "Summarizing a 25-page strategy document for your VP."'}
                    </p>
                    
                    <div className="flex gap-4 mb-4">
                      <Button 
                        variant={modelChoice === 'fast' ? 'primary' : 'outline'} 
                        onClick={() => setModelChoice('fast')}
                        className="flex-1"
                      >
                        Use Fast Mode
                      </Button>
                      <Button 
                        variant={modelChoice === 'deep' ? 'primary' : 'outline'} 
                        onClick={() => setModelChoice('deep')}
                        className="flex-1"
                      >
                        Use Deep Mode
                      </Button>
                    </div>

                    {modelChoice && (
                      <div className={`p-3 rounded text-sm ${
                        (modelScenario === 'A' && modelChoice === 'fast') || (modelScenario === 'B' && modelChoice === 'deep')
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {(modelScenario === 'A' && modelChoice === 'fast') && "Correct! Speed is fine here. No complex reasoning needed."}
                        {(modelScenario === 'A' && modelChoice === 'deep') && "You could, but it's overkill. Save the deeper thinking for harder tasks."}
                        {(modelScenario === 'B' && modelChoice === 'deep') && "Exactly. For high-stakes summaries, you want the careful, slower model."}
                        {(modelScenario === 'B' && modelChoice === 'fast') && "Careful. Fast models might miss nuance in a 25-page doc. Better to go deep here."}
                      </div>
                    )}
                    
                    <button 
                      onClick={() => { setModelScenario(null); setModelChoice(null); }}
                      className="text-xs text-slate-500 hover:text-slate-800 mt-4 underline"
                    >
                      Try another scenario
                    </button>
                  </div>
                )}
              </Card>
            </div>
          </section>
        );

      case 1:
        return (
          <section className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 2: Build a Strong Prompt</h2>
              <p className="text-lg text-slate-700 mb-6">
                Great prompts usually cover four things: <strong>Goal</strong>, <strong>Context</strong>, <strong>Constraints</strong>, and <strong>Format</strong>. 
                Fill in the blanks below to see how a pro-level prompt comes together.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Goal</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Draft a clear status update for my team..."
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Context</label>
                    <textarea 
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                      placeholder="e.g., We are behind schedule because of X. Audience is my manager..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Constraints</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Be honest but calm. Under 200 words. No jargon."
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Format</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Start with a summary, then 3 bullets."
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="flex flex-col">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Live Preview</label>
                  <div className="flex-1 bg-slate-900 text-slate-200 p-6 rounded-xl font-mono text-sm shadow-lg relative group">
                    <p className="mb-4 text-slate-400 text-xs uppercase tracking-wider">Your Prompt:</p>
                    <div className="space-y-4">
                      <p>You are helping me with a task. Here is the context:</p>
                      <p className="text-blue-300">{context || "[Context will appear here...]"}</p>
                      <p>My goal is:</p>
                      <p className="text-green-300">{goal || "[Goal will appear here...]"}</p>
                      <p>Please follow these constraints: {constraints ? <span className="text-amber-300">{constraints}</span> : <span className="text-slate-500">[Constraints...]</span>}</p>
                      <p>Return the answer in this format: {format ? <span className="text-purple-300">{format}</span> : <span className="text-slate-500">[Format...]</span>}</p>
                    </div>
                    
                    {(goal || context) && (
                      <button 
                        onClick={() => copyToClipboard(`You are helping me with a task. Here is the context: ${context}. My goal is: ${goal}. Please follow these constraints: ${constraints}. Return the answer in this format: ${format}.`)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        title="Copy prompt"
                      >
                        {copiedPrompt ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-slate-900 mb-4">Example prompts you can steal</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4 bg-slate-50 border-slate-200 text-sm">
                    <strong className="block text-blue-700 mb-2">Email Rewrite</strong>
                    <p className="text-slate-600 mb-3">
                      "I'm a [role]. Here's a messy draft: [...]. Rewrite this for a non-technical audience in under 200 words. Keep the key message but simplify the language."
                    </p>
                    <button className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1" onClick={() => copyToClipboard("I'm a [role]. Here's a messy draft: [...]. Rewrite this for a non-technical audience in under 200 words. Keep the key message but simplify the language.")}>
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </Card>
                  <Card className="p-4 bg-slate-50 border-slate-200 text-sm">
                    <strong className="block text-purple-700 mb-2">Campaign Brainstorm</strong>
                    <p className="text-slate-600 mb-3">
                      "You are my brainstorming partner. I’m planning a campaign for [Project]. Ask me 5 clarifying questions, then propose 10 ideas in a table."
                    </p>
                    <button className="text-xs font-bold text-slate-500 hover:text-purple-600 flex items-center gap-1" onClick={() => copyToClipboard("You are my brainstorming partner. I’m planning a campaign for [Project]. Ask me 5 clarifying questions, then propose 10 ideas in a table.")}>
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </Card>
                  <Card className="p-4 bg-slate-50 border-slate-200 text-sm">
                    <strong className="block text-emerald-700 mb-2">Status Update</strong>
                    <p className="text-slate-600 mb-3">
                      "Turn these raw notes: [...] into a clear status update for my manager. Be concise, honest about risks, and end with 3 bullet points of next steps."
                    </p>
                    <button className="text-xs font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1" onClick={() => copyToClipboard("Turn these raw notes: [...] into a clear status update for my manager. Be concise, honest about risks, and end with 3 bullet points of next steps.")}>
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        );

      case 2:
        return (
          <section className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 3: Try It on Your Own Work</h2>
              <p className="text-lg text-slate-700 mb-6">
                Enough theory. Pick a real task you have on your plate <strong>this week</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => setSelectedWorkScenario('meeting')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${selectedWorkScenario === 'meeting' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200 bg-white'}`}
                >
                  <h3 className="font-bold text-slate-900 mb-1">Messy Notes</h3>
                  <p className="text-xs text-slate-500">Turn a transcript into a summary.</p>
                </button>
                <button
                  onClick={() => setSelectedWorkScenario('email')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${selectedWorkScenario === 'email' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200 bg-white'}`}
                >
                  <h3 className="font-bold text-slate-900 mb-1">Tricky Email</h3>
                  <p className="text-xs text-slate-500">Draft a sensitive reply.</p>
                </button>
                <button
                  onClick={() => setSelectedWorkScenario('doc')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${selectedWorkScenario === 'doc' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200 bg-white'}`}
                >
                  <h3 className="font-bold text-slate-900 mb-1">Long Document</h3>
                  <p className="text-xs text-slate-500">Summarize a PDF or report.</p>
                </button>
              </div>

              {selectedWorkScenario && (
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 animate-fade-in">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-blue-600" /> Your Starter Template
                  </h3>
                  <div className="bg-white p-4 rounded border border-slate-200 font-mono text-sm text-slate-700 mb-4 whitespace-pre-wrap">
                    {selectedWorkScenario === 'meeting' && 
                      `"Act as a Project Manager. \nHere are the raw notes from a meeting: [PASTE NOTES]. \nPlease summarize the key decisions, list action items with owners, and flag any risks. \nFormat as a clean email body."`}
                    {selectedWorkScenario === 'email' && 
                      `"Act as a professional communicator. \nI need to reply to this email: [PASTE EMAIL]. \nMy goal is to [GOAL, e.g. decline politely]. \nDraft a response that is [TONE, e.g. firm but kind] and under 150 words."`}
                    {selectedWorkScenario === 'doc' && 
                      `"I am pasting the text of a document below. \nPlease summarize the top 3 key takeaways and any deadlines mentioned. \nFormat as a bulleted list. \n\n[PASTE DOCUMENT TEXT]"`}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      onClick={() => copyToClipboard(
                        selectedWorkScenario === 'meeting' ? `"Act as a Project Manager. \nHere are the raw notes from a meeting: [PASTE NOTES]. \nPlease summarize the key decisions, list action items with owners, and flag any risks. \nFormat as a clean email body."` :
                        selectedWorkScenario === 'email' ? `"Act as a professional communicator. \nI need to reply to this email: [PASTE EMAIL]. \nMy goal is to [GOAL, e.g. decline politely]. \nDraft a response that is [TONE, e.g. firm but kind] and under 150 words."` :
                        `"I am pasting the text of a document below. \nPlease summarize the top 3 key takeaways and any deadlines mentioned. \nFormat as a bulleted list. \n\n[PASTE DOCUMENT TEXT]"`
                      )}
                    >
                      <Copy className="w-4 h-4 mr-2" /> Copy to Clipboard
                    </Button>
                    <p className="text-sm text-slate-500 self-center">
                      Open Gemini, ChatGPT, or Claude in a new tab and try it.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      case 3:
        return (
          <section className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 4: Prompting Safely at Work</h2>
              <p className="text-lg text-slate-700 mb-6">
                You can be bold with your ideas, but you must be careful with your data. 
                Before you paste anything into a public AI model, run this quick check.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-green-50 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Generally Safe
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-green-800">
                    <li>Anonymized examples ("Client A", "Region X").</li>
                    <li>Generic scenarios or templates.</li>
                    <li>Fake or sample data for testing.</li>
                    <li>Publicly available information.</li>
                  </ul>
                </Card>
                <Card className="p-6 bg-red-50 border-red-200">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" /> Never Paste Directly
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-red-800">
                    <li>Full account numbers or SSNs.</li>
                    <li>Client names + contact details.</li>
                    <li>Sensitive salary or HR data.</li>
                    <li>Unreleased financial results.</li>
                  </ul>
                </Card>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Final Safety Check</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={safetyChecks.names}
                      onChange={(e) => setSafetyChecks(prev => ({ ...prev, names: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                    />
                    <span className="text-sm text-slate-700">Does your prompt include full names?</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={safetyChecks.ids}
                      onChange={(e) => setSafetyChecks(prev => ({ ...prev, ids: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                    />
                    <span className="text-sm text-slate-700">Does your prompt include account numbers or IDs?</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={safetyChecks.sensitive}
                      onChange={(e) => setSafetyChecks(prev => ({ ...prev, sensitive: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                    />
                    <span className="text-sm text-slate-700">Does your prompt include internal URLs or unreleased financials?</span>
                  </label>
                </div>

                {(safetyChecks.names || safetyChecks.ids || safetyChecks.sensitive) && (
                  <div className="mt-6 bg-amber-50 text-amber-800 p-4 rounded-lg flex gap-3 animate-fade-in">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      <strong>Wait!</strong> Before you paste, replace that data with placeholders like "Client A" or generic ranges. 
                      If it would look risky on a leaked slide, rewrite it.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout 
      title="Prompting Quickstart" 
      description="Stop playing with toy examples. Use this guide to handle one real, high-stakes task using the strongest model available."
    >
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-3">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
          </div>
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Navigation */}
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
            <Button onClick={handleNext} variant="primary">
              Finish Quickstart <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  );
}