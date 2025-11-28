import React from 'react';
import { Button, Card, Badge } from '../components/ui';
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
  ExternalLink
} from 'lucide-react';

export default function Page() {
  const { push } = useRouter();

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-fade-in pb-12">
      
      {/* Hero Section */}
      <section className="bg-slate-900 rounded-2xl p-8 md:p-16 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <Badge variant="blue" className="mb-4 bg-blue-500/20 text-blue-100 border-blue-500/50">Internal Academy</Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Learn to Talk to AI <br/>
            <span className="text-blue-400">Like a Pro.</span>
          </h1>
          
          <div className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl space-y-4">
            <p className="font-medium text-white">
              AI stops feeling mysterious once you know what to ask. This academy turns prompting into a practical skill you can rely on at work—so you feel faster, clearer, and a little bit unfairly effective.
            </p>
            <p className="text-base text-slate-400">
              You can use any modern chatbot—Gemini, ChatGPT, or Claude. We’ll just show you how to talk to them.
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
               onClick={() => push('/modules/fundamentals')}
               className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white h-14 px-8"
            >
              Get Started with the Basics
            </Button>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-20 -mb-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </section>

      {/* Task Cards Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">How can AI help you today?</h2>
            <p className="text-slate-600 mt-1">Select a task to see the playbook.</p>
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
             <h3 className="text-xl font-bold text-slate-900 mb-3">I write a lot of emails & docs.</h3>
             <p className="text-slate-600 text-sm mb-6 leading-relaxed">
               Client updates, project announcements, feedback notes—learn how to go from blank page to solid draft in minutes.
             </p>
             <div className="flex items-center text-blue-600 font-medium text-sm">
               Go to Drafting Playbook <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
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
             <div className="flex items-center text-purple-600 font-medium text-sm">
               Go to Summarization Playbook <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
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
             <div className="flex items-center text-emerald-600 font-medium text-sm">
               Go to Research Playbook <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
             </div>
          </Card>
        </div>
      </section>

      {/* Jump into Resources Section */}
      <section className="bg-slate-50 rounded-xl p-8 border border-slate-200">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Jump into resources</h2>
          <p className="text-slate-600 mt-1">Already know what you’re doing? Grab the templates and tool guides directly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="p-5 bg-white hover:border-blue-300 transition-colors cursor-pointer group"
            onClick={() => push('/reference')}
          >
            <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Templates
            </div>
            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600">Prompt Template Library</h3>
            <p className="text-sm text-slate-600 mb-4">Reusable patterns for drafting, summarizing, research, and more.</p>
            <span className="text-xs font-bold text-blue-600 flex items-center group-hover:translate-x-1 transition-transform">
              Browse templates <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </Card>

          <Card 
            className="p-5 bg-white hover:border-purple-300 transition-colors cursor-pointer group"
            onClick={() => push('/reference/resources')}
          >
            <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold text-sm uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Tutorials
            </div>
            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-purple-600">Advanced Tools & Workflow</h3>
            <p className="text-sm text-slate-600 mb-4">Short guides for NotebookLM, Perplexity, Gemini Workspace, and more.</p>
            <span className="text-xs font-bold text-purple-600 flex items-center group-hover:translate-x-1 transition-transform">
              See tool tutorials <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </Card>

          <Card 
            className="p-5 bg-white hover:border-emerald-300 transition-colors cursor-pointer group"
            onClick={() => push('/reference/policy-quick-view')}
          >
            <div className="flex items-center gap-2 mb-3 text-emerald-600 font-bold text-sm uppercase tracking-wider">
              <Shield className="w-4 h-4" /> Safety
            </div>
            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600">AI Policy & Safe Use</h3>
            <p className="text-sm text-slate-600 mb-4">What’s okay to paste into AI—and what should stay out.</p>
            <span className="text-xs font-bold text-emerald-600 flex items-center group-hover:translate-x-1 transition-transform">
              Read policy snapshot <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </Card>

          <Card 
            className="p-5 bg-white hover:border-amber-300 transition-colors cursor-pointer group"
            onClick={() => push('/reference')}
          >
            <div className="flex items-center gap-2 mb-3 text-amber-600 font-bold text-sm uppercase tracking-wider">
              <Globe className="w-4 h-4" /> Research
            </div>
            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-600">Competitive Research Starter</h3>
            <p className="text-sm text-slate-600 mb-4">A ready-to-go template for market and competitive intel using Gemini or Perplexity.</p>
            <span className="text-xs font-bold text-amber-600 flex items-center group-hover:translate-x-1 transition-transform">
              Try the research template <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </Card>
        </div>
      </section>

      {/* Ready to try this for real? */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Ready to try this for real?</h2>
          <p className="text-slate-600 text-sm">Use whichever AI you already have. These links open in a new tab so you can practice your new prompts immediately.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-colors group">
            <div className="p-2 bg-blue-50 rounded text-blue-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Gemini</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Great inside Google Docs, Sheets, and for long, detailed reasoning.
              </p>
              <a 
                href="https://gemini.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 flex items-center group-hover:underline"
              >
                Open Gemini <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-green-300 transition-colors group">
            <div className="p-2 bg-green-50 rounded text-green-600 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">ChatGPT</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Strong for writing, coding, and image generation.
              </p>
              <a 
                href="https://chatgpt.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-green-600 flex items-center group-hover:underline"
              >
                Open ChatGPT <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-purple-300 transition-colors group">
            <div className="p-2 bg-purple-50 rounded text-purple-600 shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Claude</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Excellent at careful reading of long documents, with strong privacy defaults.
              </p>
              <a 
                href="https://claude.ai" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-purple-600 flex items-center group-hover:underline"
              >
                Open Claude <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}