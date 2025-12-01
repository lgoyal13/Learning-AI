import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button, Badge } from '../../../components/ui';
import { 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Database,
  Clock,
  Layers,
  Thermometer,
  BookOpen,
  Cpu,
  Sparkles,
  Users,
  PenTool
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // State for Quiz
  const [hallucinationGuess, setHallucinationGuess] = useState<'a' | 'b' | null>(null);

  const sections = [
    { id: 'what-is-llm', title: 'What is an LLM?' },
    { id: 'knowledge', title: 'Where Knowledge Comes From' },
    { id: 'mechanics', title: 'How It Generates Answers' },
    { id: 'trust-gap', title: 'Why It Can Be Wrong' },
    { id: 'habits', title: 'Key Words & Habits' },
    { id: 'safety', title: 'Safe Prompting at Work' },
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

  const handleJumpTo = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Step 1: What is AI and what are LLMs?
        return (
          <section id="what-is-llm" className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What is an LLM?</h2>
            
            <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl">
              Think of AI as a <strong>super-smart helper</strong> that is ready 24/7 to draft emails, summarize documents, or answer questions. 
              The brain behind these tools (like Gemini, ChatGPT, or Claude) is called a <strong>Large Language Model (LLM)</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="p-6 bg-blue-50 border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Super-Powered Autocomplete</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Imagine the autocomplete on your phone, but trained on nearly everything ever written. It doesn't just predict the next word—it predicts the next paragraph, idea, or answer based on the conversation so far.
                </p>
              </Card>

              <Card className="p-6 bg-purple-50 border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">It Predicts Patterns, It Doesn't "Think"</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  The model doesn't "know" facts like a calculator knows math. It looks at the words you typed and predicts the most likely response based on patterns it learned during training.
                </p>
              </Card>
            </div>

            {/* Visual Analogy */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-10 text-center">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">The Mental Model: Pattern Completion</h3>
              <p className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                "The quick brown fox jumps over the..."
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-mono text-lg font-bold animate-pulse shadow-sm">
                prediction: "lazy dog"
              </div>
              <p className="text-slate-500 mt-6 max-w-lg mx-auto leading-relaxed">
                The model doesn't understand what a "dog" is. It just knows that statistically, "lazy dog" almost always follows "jumps over the".
              </p>
            </div>
          </section>
        );

      case 1: // Step 2: Where LLMs get their knowledge
        return (
          <section id="knowledge" className="mb-12 animate-fade-in">
             <h2 className="text-2xl font-bold text-slate-900 mb-6">Where knowledge comes from</h2>
             <p className="text-lg text-slate-700 mb-8 max-w-3xl">
               If an LLM isn't a live search engine (unless connected to the web), how does it know so much? It relies on a massive library of frozen knowledge.
             </p>

             <div className="space-y-6">
               <Card className="p-6 flex gap-4">
                 <div className="p-3 bg-slate-100 rounded-lg h-fit text-slate-600">
                   <Database className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg mb-2">1. The Library (Pre-Training)</h3>
                   <p className="text-slate-600 leading-relaxed">
                     The model was trained on billions of pages of text—books, websites, articles, and code. This is where it learned grammar, reasoning, and general world facts.
                   </p>
                 </div>
               </Card>

               <Card className="p-6 flex gap-4">
                 <div className="p-3 bg-slate-100 rounded-lg h-fit text-slate-600">
                   <Clock className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg mb-2">2. The "Knowledge Cut-off"</h3>
                   <p className="text-slate-600 leading-relaxed">
                     Training takes months. Once it stops, the model's internal memory is frozen. It doesn't know about news from yesterday or private internal documents unless you provide them.
                   </p>
                 </div>
               </Card>

               <Card className="p-6 flex gap-4">
                 <div className="p-3 bg-slate-100 rounded-lg h-fit text-slate-600">
                   <CheckCircle className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg mb-2">3. Fine-Tuning (Safety School)</h3>
                   <p className="text-slate-600 leading-relaxed">
                     Raw models just want to complete sentences randomly. Humans review thousands of conversations to teach the model to be <strong>helpful</strong>, <strong>harmless</strong>, and <strong>honest</strong>. This makes it act like a polite assistant.
                   </p>
                 </div>
               </Card>
             </div>
          </section>
        );

      case 2: // Step 3: How an LLM turns your prompt into an answer
        return (
          <section id="mechanics" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">How it generates answers</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              When you type a prompt like "Write an email about a project delay," a specific process happens in milliseconds.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 mb-10">
              <h3 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">The Generation Loop</h3>
              <ol className="space-y-4 text-slate-700">
                <li className="flex gap-4">
                  <div className="bg-white border border-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-500 shrink-0">1</div>
                  <div>
                    <strong className="text-slate-900">It Tokenizes:</strong> The model breaks your text into small chunks called "tokens" (parts of words).
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white border border-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-500 shrink-0">2</div>
                  <div>
                    <strong className="text-slate-900">It Predicts:</strong> Based on your pattern, it calculates the most likely next token to start the email.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white border border-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-500 shrink-0">3</div>
                  <div>
                    <strong className="text-slate-900">It Loops:</strong> It takes that new token, adds it to the sequence, and predicts the next one. This repeats until the answer is done.
                  </div>
                </li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                  <Cpu className="w-5 h-5" /> Tokens
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  The "atoms" of language for AI. Roughly 4 characters or 0.75 words.
                </p>
                <div className="bg-slate-100 p-2 rounded text-xs font-mono text-slate-500 break-all">
                  [Ingen][ious] = 2 tokens
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold">
                  <Layers className="w-5 h-5" /> Context Window
                </div>
                <p className="text-sm text-slate-600">
                  The model's "short-term memory." It includes your current conversation. If it gets too long, the oldest parts fall out and are forgotten.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-orange-600 font-bold">
                  <Thermometer className="w-5 h-5" /> Temperature
                </div>
                <p className="text-sm text-slate-600">
                  A setting that controls creativity. <br/>
                  <strong>High:</strong> Creative, random.<br/>
                  <strong>Low:</strong> Precise, repetitive.
                </p>
              </div>
            </div>
          </section>
        );

      case 3: // Step 4: Why smart answers can still be wrong
        return (
          <section id="trust-gap" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Why smart answers can still be wrong</h2>
            
            <p className="text-lg text-slate-700 mb-8 max-w-3xl">
              Remember: the model is a <strong>prediction engine</strong>, not a truth engine. It prioritizes "sounding correct" based on patterns it learned, which means it can be confidently wrong.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="p-5 border-t-4 border-t-red-400 bg-white">
                 <div className="flex items-center gap-2 mb-3 text-red-700 font-bold">
                   <Sparkles className="w-5 h-5" /> Hallucinations
                 </div>
                 <p className="text-sm text-slate-600">
                   The model can make up facts, dates, or citations to fill a gap in its pattern. If it doesn't know the answer, it might invent a plausible one.
                 </p>
              </Card>

              <Card className="p-5 border-t-4 border-t-amber-400 bg-white">
                 <div className="flex items-center gap-2 mb-3 text-amber-700 font-bold">
                   <Clock className="w-5 h-5" /> Old Information
                 </div>
                 <p className="text-sm text-slate-600">
                   It doesn't know about events that happened after its training cut-off (often months ago) unless it uses a web search tool.
                 </p>
              </Card>

              <Card className="p-5 border-t-4 border-t-blue-400 bg-white">
                 <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold">
                   <Users className="w-5 h-5" /> Biases
                 </div>
                 <p className="text-sm text-slate-600">
                   It learns from the internet, so it can repeat unfair stereotypes or skewed viewpoints found in its training data.
                 </p>
              </Card>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 inline">Quiz: Spot the Hallucination. </h3>
                <span className="text-lg text-slate-600">You asked: <span className="italic">"What is our travel policy for ride-shares?"</span></span>
                <p className="text-sm text-slate-500 mt-2">One of these answers is safer. The other is a likely hallucination.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Answer A */}
                <Card 
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${hallucinationGuess === 'a' ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-blue-300'}`} 
                  onClick={() => setHallucinationGuess('a')}
                >
                   <div className="font-bold text-xs text-slate-400 uppercase mb-2">Answer A</div>
                   <p className="text-slate-800 font-medium">
                     "According to the 2024 Travel Policy (Document ID #9921), reimbursement is capped at $50 per ride."
                   </p>
                </Card>

                {/* Answer B */}
                <Card 
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${hallucinationGuess === 'b' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-blue-300'}`} 
                  onClick={() => setHallucinationGuess('b')}
                >
                   <div className="font-bold text-xs text-slate-400 uppercase mb-2">Answer B</div>
                   <p className="text-slate-800 font-medium">
                     "Standard ride-share services are generally reimbursable for business travel. Please refer to your regional addendum for caps."
                   </p>
                </Card>
              </div>

              {hallucinationGuess === 'a' && (
                <div className="bg-green-100 border border-green-200 rounded-lg p-4 flex gap-4 animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 text-green-700 shrink-0 mt-1" />
                  <div>
                    <strong className="text-green-800 block mb-1">Correct! This is the hallucination.</strong>
                    <p className="text-green-800 text-sm">
                      Specific Document IDs or exact dollar amounts are often invented by the model to look helpful. Never trust a citation unless the model has access to the specific document via RAG.
                    </p>
                  </div>
                </div>
              )}

              {hallucinationGuess === 'b' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-4 animate-fade-in">
                   <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                   <div>
                     <strong className="text-yellow-800 block mb-1">Actually, this one is safer.</strong>
                     <p className="text-yellow-800 text-sm">
                       This vague answer is safer because it doesn't invent specific policy numbers. Answer A invented a fake Document ID.
                     </p>
                   </div>
                </div>
              )}
            </div>
          </section>
        );

      case 4: // Step 5: Key words and default habits
        return (
          <section id="habits" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Key words & default habits</h2>
            
            <p className="text-lg text-slate-700 mb-8">
              To work effectively, you need to speak the language and build a few simple habits.
            </p>

            <div className="mb-12">
               <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Beginner's Glossary</h3>
               </div>
               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="divide-y divide-slate-100">
                        <div className="p-4">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Prompt</span>
                            <span className="text-sm text-slate-600">The instruction you type to the AI.</span>
                        </div>
                        <div className="p-4">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Token</span>
                            <span className="text-sm text-slate-600">The basic units of text (like syllables) the model reads and writes.</span>
                        </div>
                        <div className="p-4">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Context Window</span>
                            <span className="text-sm text-slate-600">The model's "short-term memory" limit in a conversation.</span>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <div className="p-4">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Hallucination</span>
                            <span className="text-sm text-slate-600">When the AI confidently states a false fact.</span>
                        </div>
                         <div className="p-4">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Fine-Tuning</span>
                            <span className="text-sm text-slate-600">Additional training to make a model better at specific tasks.</span>
                        </div>
                        <div className="p-4">
                            <span className="block font-bold text-slate-900 text-sm mb-1">RAG</span>
                            <span className="text-sm text-slate-600">Retrieval-Augmented Generation. Giving the AI a specific document to read so it doesn't guess.</span>
                        </div>
                    </div>
                 </div>
               </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-6">Your New Default Habits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Writing Habits */}
                <div className="space-y-6">
                    <h4 className="font-bold text-blue-700 flex items-center gap-2">
                        <PenTool className="w-5 h-5" /> Write Better Prompts
                    </h4>
                    <Card className="p-5 border-l-4 border-l-blue-500">
                        <strong className="block text-slate-900 mb-1">Be Specific</strong>
                        <p className="text-sm text-slate-600 mb-3">Don't say "Write an email." Say "Write a 3-paragraph thank you email for the kickoff meeting."</p>
                    </Card>
                    <Card className="p-5 border-l-4 border-l-blue-500">
                        <strong className="block text-slate-900 mb-1">Give Context</strong>
                        <p className="text-sm text-slate-600 mb-3">Explain who you are and what you are trying to achieve.</p>
                    </Card>
                    <Card className="p-5 border-l-4 border-l-blue-500">
                        <strong className="block text-slate-900 mb-1">Ask for Structure</strong>
                        <p className="text-sm text-slate-600">Ask for bullet points, tables, or bold headings to make the answer usable.</p>
                    </Card>
                </div>

                {/* Checking Habits */}
                <div className="space-y-6">
                    <h4 className="font-bold text-green-700 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" /> Check the Work
                    </h4>
                    <Card className="p-5 border-l-4 border-l-green-500">
                        <strong className="block text-slate-900 mb-1">Ask for Sources</strong>
                        <p className="text-sm text-slate-600 mb-3">If a fact matters, ask the model: "Where did you find that information?"</p>
                    </Card>
                    <Card className="p-5 border-l-4 border-l-green-500">
                        <strong className="block text-slate-900 mb-1">Verify Numbers</strong>
                        <p className="text-sm text-slate-600 mb-3">LLMs are not calculators. Always double-check math in a spreadsheet.</p>
                    </Card>
                    <Card className="p-5 border-l-4 border-l-green-500">
                        <strong className="block text-slate-900 mb-1">The Golden Rule</strong>
                        <p className="text-sm text-slate-600">Never paste passwords, HR data, or customer info unless the tool is approved for it.</p>
                    </Card>
                </div>
            </div>
          </section>
        );

      case 5: // Step 6: Safe prompting at work
        return (
          <section id="safety" className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Safe prompting at work</h2>
            <p className="text-lg text-slate-700 mb-8">
              Knowing what is safe to share in your <strong>prompt</strong> and <strong>context</strong> is just as important as writing a good instruction.
            </p>

            <div className="space-y-8 mb-12">
              
              {/* Green */}
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-green-800 mb-2">Green: Clearly Safe</h3>
                    <p className="text-slate-600 mb-3">Routine, anonymized tasks using approved internal tools.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Brainstorming marketing ideas.</li>
                      <li>Drafting emails without names.</li>
                      <li>Explaining code snippets or Excel formulas.</li>
                    </ul>
                 </div>
              </div>

              {/* Yellow */}
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-6 h-6 text-amber-600" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-amber-700 mb-2">Yellow: Proceed with Caution</h3>
                    <p className="text-slate-600 mb-3">Tasks that involve internal data. Remove identifiers first.</p>
                     <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Summarizing meeting notes (remove client names).</li>
                      <li>Drafting a sensitive memo (review heavily before sending).</li>
                    </ul>
                 </div>
              </div>

              {/* Red */}
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <ShieldX className="w-6 h-6 text-red-600" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-red-700 mb-2">Red: Strictly Prohibited</h3>
                    <p className="text-slate-600 mb-3">Never put this data into a general AI chatbot.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><strong>PII:</strong> Social Security Numbers, Home Addresses.</li>
                      <li><strong>Secrets:</strong> Passwords, API Keys, Unannounced Strategy.</li>
                      <li><strong>HR Data:</strong> Salaries, Performance Reviews, Medical Info.</li>
                    </ul>
                 </div>
              </div>
            </div>

            {/* Recap Block */}
            <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-6 text-2xl">Module Recap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div>
                    <strong className="block text-slate-900 mb-2">What it is</strong>
                    <p className="text-sm text-slate-600">A prediction engine trained on internet text. It predicts the next token based on patterns.</p>
                 </div>
                 <div>
                    <strong className="block text-slate-900 mb-2">Why it fails</strong>
                    <p className="text-sm text-slate-600">It can hallucinate (make things up), have old info, or reflect biases.</p>
                 </div>
                 <div>
                    <strong className="block text-slate-900 mb-2">How to use it</strong>
                    <p className="text-sm text-slate-600">Be specific, give context, and check the work. Treat it like a smart intern.</p>
                 </div>
                 <div>
                    <strong className="block text-slate-900 mb-2">How to stay safe</strong>
                    <p className="text-sm text-slate-600">Never share PII or secrets. You are the pilot responsible for the flight.</p>
                 </div>
              </div>
              
              <div className="pt-6 border-t border-slate-200">
                <p className="text-lg text-slate-700 mb-4">
                   You have the fundamentals. Now let's put them to work.
                </p>
                <Button onClick={() => push('/modules/prompting')} className="w-full sm:w-auto">
                   Next: Prompting Foundations <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

          </section>
        );

      default:
        return null;
    }
  };

  return (
    <ModuleLayout
      title="AI Fundamentals & Safe Use"
      description="Understand what modern AI is actually doing, why it sometimes makes things up, and the simple habits that keep you safe at work."
      duration="15 mins"
      audience="All Employees"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      onJumpTo={handleJumpTo}
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