import React from 'react';
import { Button, Card, Badge, Callout } from '../components/ui';
import { useRouter } from '../lib/routerContext';
import { 
  ArrowRight, 
  Zap, 
  PenTool, 
  FileText, 
  Search, 
  CheckCircle2, 
  Shield,
  Layers,
  Globe,
  MessageSquare,
  BrainCircuit,
  Image as ImageIcon,
  Clock,
  Lock,
  ExternalLink,
  BookOpen,
  Map,
  Sparkles,
  Layout
} from 'lucide-react';

export default function Page() {
  const { push } = useRouter();

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-fade-in pb-12">
      
      {/* Hero Section */}
      <section className="bg-slate-900 rounded-2xl p-8 md:p-16 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <Badge variant="blue" className="mb-4 bg-blue-500/20 text-blue-100 border-blue-500/50">Built in Google AI Studio • Internal Academy</Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Get ahead of <br/>
            <span className="text-blue-400">90% of AI users.</span>
          </h1>
          
          <div className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl space-y-4">
            <p className="font-medium text-white">
              Most people just chat with AI. You are going to learn to pilot it. 
              Master the core habits of prompting, learn when to switch between Research, Docs, and Builder tools, and run safe workflows that actually save you time.
            </p>
            <p className="text-base text-slate-400">
              This internal academy helps you apply tools like Gemini, ChatGPT, Perplexity, and NotebookLM to your real work—safely and effectively.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
               size="lg" 
               onClick={() => push('/quick-start')}
               className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 h-14 text-lg shadow-lg shadow-blue-900/50"
            >
              <Zap className="w-5 h-5 mr-2" /> 
              Start the Prompting Quickstart
            </Button>
            <Button 
               size="lg" 
               variant="outline" 
               onClick={() => push('/modules')}
               className="bg-white/5 border-white/30 text-white hover:bg-white/10 h-14 px-8 font-medium backdrop-blur-sm transition-all"
            >
              Explore the Full Academy
            </Button>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-20 -mb-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </section>

      {/* Why This Exists (Outcomes) */}
      <section>
        <div className="mb-8">
           <h2 className="text-2xl font-bold text-slate-900">What you will learn</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Demystify the Tech</h3>
            <p className="text-slate-600 leading-relaxed">
              Stop guessing how LLMs work. Understand tokens, context windows, and why models hallucinate so you can trust your tools.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Practical Workflows</h3>
            <p className="text-slate-600 leading-relaxed">
              Move beyond "chat". Learn to use research engines, document analysis, and workspace tools to finish projects faster.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Safety First</h3>
            <p className="text-slate-600 leading-relaxed">
              Learn the "Golden Rule" of PII. Keep client data safe while leveraging the most powerful AI models available.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works (Structure Map) */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">How this academy is structured</h2>
          <p className="text-slate-600">
            We’ve designed a path to take you from beginner to power user. You can jump in anywhere, but here is the recommended flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>

          {/* Step 1 */}
          <Card 
            className="p-6 bg-white relative hover:border-blue-300 transition-colors cursor-pointer group" 
            onClick={() => push('/quick-start')}
            style={{ overflow: 'visible' }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm z-10">
              Step 1
            </div>
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 mb-2">Quick Start</h3>
              <p className="text-sm text-slate-600">
                A 5-minute crash course on the PCTR prompting formula. Start here to fix your bad habits immediately.
              </p>
            </div>
          </Card>

          {/* Step 2 */}
          <Card 
            className="p-6 bg-white relative hover:border-purple-300 transition-colors cursor-pointer group" 
            onClick={() => push('/modules')}
            style={{ overflow: 'visible' }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm z-10">
              Step 2
            </div>
             <div className="mb-4 flex justify-center">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-full group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 mb-2">Learning Modules</h3>
              <p className="text-sm text-slate-600">
                Deep dives into Fundamentals, Research, Docs, and Workflows. This is the core curriculum.
              </p>
            </div>
          </Card>

          {/* Step 3 */}
          <Card 
            className="p-6 bg-white relative hover:border-emerald-300 transition-colors cursor-pointer group" 
            onClick={() => push('/reference')}
            style={{ overflow: 'visible' }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm z-10">
              Step 3
            </div>
             <div className="mb-4 flex justify-center">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 mb-2">Reference Guide</h3>
              <p className="text-sm text-slate-600">
                Copy-paste templates, safety cheat sheets, and tool guides for your daily work.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Task Playbooks (Goal Oriented) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">What do you need to do today?</h2>
            <p className="text-slate-600 mt-1">Jump straight into a playbook for your specific task.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="p-6 hover:shadow-lg transition-all border-t-4 border-t-blue-500 cursor-pointer group"
            onClick={() => push('/modules/prompting')}
          >
             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <PenTool className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">I write emails & docs.</h3>
             <p className="text-slate-600 text-sm mb-6 leading-relaxed">
               Client updates, project announcements, feedback notes—learn how to go from blank page to solid draft in minutes.
             </p>
             <div className="flex items-center text-blue-600 font-medium text-sm mt-auto">
               Drafting Playbook <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
             </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-all border-t-4 border-t-purple-500 cursor-pointer group"
            onClick={() => push('/modules/tool-documents')}
          >
             <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">I read long documents.</h3>
             <p className="text-slate-600 text-sm mb-6 leading-relaxed">
               Contracts, vendor proposals, strategy decks—pull out dates, decisions, and risks without reading every word.
             </p>
             <div className="flex items-center text-purple-600 font-medium text-sm mt-auto">
               Summarization Playbook <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
             </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-all border-t-4 border-t-emerald-500 cursor-pointer group"
            onClick={() => push('/modules/tool-research')}
          >
             <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">I need to look things up.</h3>
             <p className="text-slate-600 text-sm mb-6 leading-relaxed">
               Policies, market trends, regulations—learn how to get grounded answers faster than scrolling search results.
             </p>
             <div className="flex items-center text-emerald-600 font-medium text-sm mt-auto">
               Research Playbook <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
             </div>
          </Card>
        </div>
      </section>

      {/* Audience & Usage */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Who is this for?</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            This academy is built for <strong>Project Managers, Marketers, Ops Leads, Customer Success, and Developers</strong>. 
            Basically, anyone who spends their day reading, writing, or analyzing data.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">Project Management</Badge>
            <Badge variant="neutral">Marketing</Badge>
            <Badge variant="neutral">Operations</Badge>
            <Badge variant="neutral">Engineering</Badge>
            <Badge variant="neutral">Sales</Badge>
          </div>
        </div>
        <div className="w-full md:w-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm max-w-sm">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> Use this app today
          </h3>
          <ul className="space-y-3 text-sm text-slate-700">
             <li className="flex gap-2 items-start">
               <span className="font-bold text-slate-300">1.</span>
               <span>Pick one task you have to do (e.g. write an update email).</span>
             </li>
             <li className="flex gap-2 items-start">
               <span className="font-bold text-slate-300">2.</span>
               <span>Run the <button onClick={() => push('/quick-start')} className="text-blue-600 font-medium hover:underline">Quick Start</button> with that task.</span>
             </li>
             <li className="flex gap-2 items-start">
               <span className="font-bold text-slate-300">3.</span>
               <span>Copy a <button onClick={() => push('/reference')} className="text-purple-600 font-medium hover:underline">Template</button> for next time.</span>
             </li>
          </ul>
        </div>
      </section>

      {/* Footer / Trust */}
      <div className="text-center pt-8 border-t border-slate-200">
        <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Internal Training Application • Built in <strong>Google AI Studio</strong></span>
        </p>
      </div>

    </div>
  );
}