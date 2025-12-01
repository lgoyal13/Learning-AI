import React, { useState } from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Callout, Button, Badge } from '../../../components/ui';
import { 
  Zap, BrainCircuit, Globe, Paperclip, Mic, Image, Search,
  ArrowRight, ArrowLeft, CheckCircle2, Check, Layers, PenTool,
  Video, Edit3, Settings, Lightbulb, MousePointerClick, Smartphone,
  Target
} from 'lucide-react';
import { useRouter } from '../../../lib/routerContext';

export default function Page() {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // State for Practice Section
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string | null>>({});

  const sections = [
    { id: 'speeds', title: 'Two Speeds: Fast vs Pro' },
    { id: 'deep-research', title: 'Deep Research: Reports, Not Links' },
    { id: 'visuals', title: 'Visuals: Images & Video' },
    { id: 'quick-wins', title: 'Quick Wins: The Hidden Toolbar' },
    { id: 'practice', title: 'Practice: Match the Tool' },
    { id: 'toolkit', title: 'Your Daily Toolkit' },
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

  const togglePracticeAnswer = (scenarioId: string, answer: string) => {
    setPracticeAnswers(prev => ({
      ...prev,
      [scenarioId]: prev[scenarioId] === answer ? null : answer
    }));
  };

  const sectionContent = [
    // SECTION 1: SPEEDS (Fast vs Pro)
    (
      <section key="speeds" id="speeds" className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Two Speeds: Fast vs Pro</h2>
        <p className="text-lg text-slate-700 mb-8">
          Most modern AI tools have two gears. Knowing when to switch gears is the difference between a frustrating "hallucination" and a perfect answer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
          <Card className="p-6 border-t-4 border-t-blue-500 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Fast Mode</h3>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Flash / Mini / Standard</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> 90% of daily tasks. Writing, summarizing, lists, and simple coding.
            </p>
            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 border border-slate-100">
                <span className="font-bold text-blue-700 block mb-1">Ops</span>
                "Summarize this vendor proposal in 5 bullets."
              </div>
              <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 border border-slate-100">
                <span className="font-bold text-blue-700 block mb-1">Customer Success</span>
                "Draft a short apology email for a late shipment."
              </div>
              <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 border border-slate-100">
                <span className="font-bold text-blue-700 block mb-1">Marketing</span>
                "Write a 100-word LinkedIn post about our launch."
              </div>
            </div>
          </Card>

          <Card className="p-6 border-t-4 border-t-purple-600 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Pro Mode</h3>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Advanced / Reasoning / Plus</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Complex analysis, comparisons, and high-stakes decisions. It "thinks" before answering.
            </p>
            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 border border-slate-100">
                <span className="font-bold text-purple-700 block mb-1">Ops</span>
                "Compare these 3 CRM pricing plans and recommend the best value."
              </div>
              <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 border border-slate-100">
                <span className="font-bold text-purple-700 block mb-1">Customer Success</span>
                "Analyze these 50 feedback tickets and find the top 3 themes."
              </div>
              <div className="bg-slate-50 p-3 rounded text-xs text-slate-700 border border-slate-100">
                <span className="font-bold text-purple-700 block mb-1">Marketing</span>
                "Weigh the pros and cons of this campaign strategy based on Q3 data."
              </div>
            </div>
          </Card>
        </div>

        <Callout variant="info" title="Rule of Thumb">
          Start in <strong>Fast Mode</strong>. If the answer is shallow or misses the nuance, switch to <strong>Pro Mode</strong>.
        </Callout>
      </section>
    ),

    // SECTION 2: DEEP RESEARCH
    (
      <section key="deep-research" id="deep-research" className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Deep Research: Reports, Not Links</h2>
        <p className="text-lg text-slate-700 mb-6">
          Standard chat models might do a quick Google search, but they often hallucinate details. 
          <strong>Deep Research</strong> tools (like Perplexity or Gemini Deep Research) actually read multiple sources and write a cited report.
        </p>

        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mb-8">
           <h3 className="font-bold text-slate-900 mb-6">What "Deep Research" looks like at work</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-purple-700 font-bold">
                    <Target className="w-4 h-4" /> Ops & Admin
                 </div>
                 <p className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-200 shadow-sm">
                   "Create a comparison table of the top 5 OKR software tools including pricing, setup time, and pros/cons."
                 </p>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <Target className="w-4 h-4" /> Marketing
                 </div>
                 <p className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-200 shadow-sm">
                   "Find email open rate benchmarks for the B2B SaaS industry in 2024, citing at least 3 recent reports."
                 </p>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Target className="w-4 h-4" /> Customer Success
                 </div>
                 <p className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-200 shadow-sm">
                   "Research common causes of churn in enterprise software and summarize 3 recent case studies on fixing it."
                 </p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Callout variant="success" title="The Outcome">
             Expect a 1-2 page briefing with bullet points, tables, and clickable citations. Perfect for "getting smart" on a topic quickly.
          </Callout>
          
          <Callout variant="warning" title="Pro Tip">
             Always ask for <strong>sources</strong>. It forces the model to verify its facts and gives you a link to check if it looks suspicious.
          </Callout>
        </div>
      </section>
    ),

    // SECTION 3: VISUALS
    (
      <section key="visuals" id="visuals" className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Visuals: Images & Video</h2>
        <p className="text-lg text-slate-700 mb-6">
          You don't need to be a designer to create visuals. Modern tools can turn your text description into a ready-to-use image or short video clip.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <Card className="p-5 border-t-4 border-t-indigo-500">
             <div className="flex items-center gap-2 mb-3 font-bold text-slate-900">
                <Image className="w-5 h-5 text-indigo-500" /> Images
             </div>
             <p className="text-sm text-slate-600 mb-4">
               <strong>Tools:</strong> ChatGPT, Gemini.
             </p>
             <ul className="text-sm text-slate-700 space-y-2">
               <li>• <strong>PM:</strong> "Generate a timeline graphic for a 6-month launch."</li>
               <li>• <strong>Marketing:</strong> "Create a clean, minimalist product shot on a wooden desk."</li>
             </ul>
           </Card>

           <Card className="p-5 border-t-4 border-t-pink-500">
             <div className="flex items-center gap-2 mb-3 font-bold text-slate-900">
                <Video className="w-5 h-5 text-pink-500" /> Video
             </div>
             <p className="text-sm text-slate-600 mb-4">
               <strong>Tools:</strong> Gemini (Veo), Sora (coming soon).
             </p>
             <ul className="text-sm text-slate-700 space-y-2">
               <li>• <strong>CS:</strong> "Create a 5-second clip showing a happy customer using a tablet."</li>
               <li>• <strong>Sales:</strong> "Generate a dynamic background for my slide deck."</li>
             </ul>
           </Card>

           <Card className="p-5 border-t-4 border-t-slate-500">
             <div className="flex items-center gap-2 mb-3 font-bold text-slate-900">
                <Settings className="w-5 h-5 text-slate-500" /> Usage Pattern
             </div>
             <ol className="text-sm text-slate-700 space-y-3 list-decimal pl-4">
               <li><strong>Describe:</strong> "I need an image of..."</li>
               <li><strong>Refine:</strong> "Make it wider (16:9) and use our brand colors (blue/white)."</li>
               <li><strong>Download:</strong> Save it for your deck.</li>
             </ol>
           </Card>
        </div>
      </section>
    ),

    // SECTION 4: QUICK WINS
    (
      <section key="quick-wins" id="quick-wins" className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Wins: The Hidden Toolbar</h2>
        <p className="text-lg text-slate-700 mb-8">
          The text box is just the beginning. Use these four features to speed up your daily work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
          
          <Card className="p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Mic className="w-5 h-5 text-blue-500" /> Voice Mode
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Talk instead of type. Great for "brainstorming while walking."
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "I need to plan a team offsite. Here are my messy ideas. Help me structure an agenda."
            </div>
          </Card>

          <Card className="p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Paperclip className="w-5 h-5 text-orange-500" /> File Upload
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Don't copy-paste. Upload spreadsheets, PDFs, or images directly.
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "Analyze this budget spreadsheet. Where are we overspending compared to last month?"
            </div>
          </Card>

          <Card className="p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Edit3 className="w-5 h-5 text-purple-500" /> Canvas / Live Edit
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Edit the output directly side-by-side (like in OpenAI Canvas or Claude Artifacts).
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "Highlight the email draft and change just the second paragraph to be friendlier."
            </div>
          </Card>

          <Card className="p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Settings className="w-5 h-5 text-slate-500" /> Custom Instructions
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Set stable preferences so you don't have to repeat yourself.
            </p>
            <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-700">
              "Always answer with bullet points. Never use hashtags. Keep responses under 200 words."
            </div>
          </Card>
        </div>
      </section>
    ),

    // SECTION 5: PRACTICE
    (
      <section key="practice" id="practice" className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Practice: Match the Tool</h2>
        <p className="text-lg text-slate-700 mb-8">
          You have a lot of tools now. Which one would you reach for in these moments?
        </p>

        <div className="space-y-4 max-w-2xl">
           {[
             {
               id: 's1',
               task: "Your boss asks: 'What are the top 3 market trends in our industry right now?'",
               options: [
                 { id: 'fast', label: 'Fast Mode Chat' },
                 { id: 'research', label: 'Deep Research Tool', correct: true },
                 { id: 'video', label: 'Video Generator' }
               ],
               explanation: "Correct! Market trends require outside facts and citations. A standard chat might hallucinate or be outdated."
             },
             {
               id: 's2',
               task: "You need to summarize a 50-page vendor contract PDF to find the cancellation clause.",
               options: [
                 { id: 'upload', label: 'Upload to Pro Mode/NotebookLM', correct: true },
                 { id: 'fast', label: 'Copy-Paste into Fast Mode' },
                 { id: 'voice', label: 'Voice Mode' }
               ],
               explanation: "Correct! Uploading preserves the document structure. Copy-pasting 50 pages often breaks the context limit."
             },
             {
               id: 's3',
               task: "You are walking to your car and have a great idea for a campaign slogan.",
               options: [
                 { id: 'research', label: 'Deep Research' },
                 { id: 'canvas', label: 'Canvas Edit' },
                 { id: 'voice', label: 'Voice Mode', correct: true }
               ],
               explanation: "Correct! Voice mode is perfect for capturing messy, spontaneous ideas when you aren't at a keyboard."
             }
           ].map((scenario) => (
             <div key={scenario.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <p className="font-bold text-slate-900 mb-4">{scenario.task}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {scenario.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => togglePracticeAnswer(scenario.id, opt.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        practiceAnswers[scenario.id] === opt.id 
                          ? (opt.correct ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200')
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {practiceAnswers[scenario.id] && scenario.options.find(o => o.id === practiceAnswers[scenario.id])?.correct && (
                  <div className="text-sm text-green-700 bg-green-50 p-3 rounded flex items-start gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    {scenario.explanation}
                  </div>
                )}
             </div>
           ))}
        </div>
      </section>
    ),

    // SECTION 6: TOOLKIT RECAP
    (
      <section key="toolkit" id="toolkit" className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Daily Toolkit</h2>
        <p className="text-lg text-slate-700 mb-8">
          You don't need to master every tool today. Just start mapping your common tasks to the right feature.
        </p>

        <Card className="p-0 overflow-hidden border-slate-200 bg-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
             <div className="p-6">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <MousePointerClick className="w-5 h-5 text-blue-500" /> Routine Work
               </h3>
               <ul className="space-y-4">
                 <li className="flex items-center justify-between">
                   <span className="text-slate-600 text-sm">Drafting & Emails</span>
                   <Badge variant="blue">Fast Mode</Badge>
                 </li>
                 <li className="flex items-center justify-between">
                   <span className="text-slate-600 text-sm">Brainstorming</span>
                   <Badge variant="blue">Voice Mode</Badge>
                 </li>
                 <li className="flex items-center justify-between">
                   <span className="text-slate-600 text-sm">Editing Drafts</span>
                   <Badge variant="blue">Canvas / Live Edit</Badge>
                 </li>
               </ul>
             </div>
             
             <div className="p-6">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <BrainCircuit className="w-5 h-5 text-purple-500" /> Deep Work
               </h3>
               <ul className="space-y-4">
                 <li className="flex items-center justify-between">
                   <span className="text-slate-600 text-sm">Market Analysis</span>
                   <Badge variant="neutral" className="bg-purple-100 text-purple-700 border-purple-200">Deep Research</Badge>
                 </li>
                 <li className="flex items-center justify-between">
                   <span className="text-slate-600 text-sm">Data & Docs</span>
                   <Badge variant="neutral" className="bg-orange-100 text-orange-700 border-orange-200">Upload / Pro Mode</Badge>
                 </li>
                 <li className="flex items-center justify-between">
                   <span className="text-slate-600 text-sm">Slides & Social</span>
                   <Badge variant="neutral" className="bg-pink-100 text-pink-700 border-pink-200">Images / Video</Badge>
                 </li>
               </ul>
             </div>
          </div>
        </Card>

        <Callout variant="success" title="Challenge for Today">
           Pick <strong>one feature</strong> (like Voice Mode or Deep Research) and use it three times before the end of the day.
        </Callout>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Ready for the deep dives?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
             <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => push('/modules/tool-research')}>
               <div className="text-left">
                 <div className="font-bold text-slate-900">Research & Web</div>
                 <div className="text-xs text-slate-500 font-normal">Master Perplexity</div>
               </div>
               <ArrowRight className="w-4 h-4 ml-auto text-slate-400" />
             </Button>

             <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => push('/modules/tool-documents')}>
               <div className="text-left">
                 <div className="font-bold text-slate-900">Your Documents</div>
                 <div className="text-xs text-slate-500 font-normal">Master NotebookLM</div>
               </div>
               <ArrowRight className="w-4 h-4 ml-auto text-slate-400" />
             </Button>

             <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => push('/modules/tool-builder')}>
               <div className="text-left">
                 <div className="font-bold text-slate-900">Workspace</div>
                 <div className="text-xs text-slate-500 font-normal">Master Gemini</div>
               </div>
               <ArrowRight className="w-4 h-4 ml-auto text-slate-400" />
             </Button>
          </div>
        </div>
      </section>
    )
  ];

  return (
    <ModuleLayout
      title="Modern Chatbots & Modes"
      description="Your AI is more than one chat window. Learn when to use fast modes, when to slow down for deep reasoning, and how to use voice, visuals, and research tools."
      duration="20 mins"
      audience="Intermediate Users"
      sections={sections}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      onJumpTo={handleJumpTo}
    >
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