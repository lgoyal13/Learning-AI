
import React from 'react';
import { ModuleLayout } from '../../../components/ModuleLayout';
import { Card, Button, Badge } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';
import { Globe, Layers, PenTool, MessageSquare, ArrowRight } from 'lucide-react';

export default function Page() {
  const { push } = useRouter();

  const sections = [
    { id: 'intro', title: 'The Right Tool for the Job' },
    { id: 'categories', title: 'Tool Categories' },
    { id: 'deep-dives', title: 'Deep Dives' },
  ];

  return (
    <ModuleLayout
      title="AI Tools & Research"
      description="Don't just use a chatbot for everything. Learn to pick the right specialized AI tool for research, document analysis, and prototyping."
      duration="10 mins"
      audience="All Employees"
      sections={sections}
      nextModulePath="/modules/tool-research"
    >
      {/* SECTION 1: INTRO */}
      <section id="intro" className="mb-12">
        <h2>Stop Using a Hammer for Everything</h2>
        <p>
          We often see people trying to use a standard Chat Assistant (like ChatGPT) for tasks it isn't good at—like 
          browsing live news or analyzing 50-page PDFs.
        </p>
        <p>
          Just like you wouldn't use Excel to write a letter, you shouldn't use a text generator to do deep research. 
          Understanding the <strong>Core Categories</strong> of AI tools will double your efficiency.
        </p>
      </section>

      {/* SECTION 2: CATEGORIES */}
      <section id="categories" className="mb-12">
        <h2>The 4 Main Tool Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          {/* Chat Assistants */}
          <Card className="p-6 border-t-4 border-t-yellow-500">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-lg text-slate-900">Chat Assistants</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Writing, brainstorming, rewriting, and coding help.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Drafting emails</li>
              <li>Summarizing short text</li>
              <li>Rephrasing tone</li>
            </ul>
          </Card>

          {/* Research Tools */}
          <Card className="p-6 border-t-4 border-t-blue-500">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900">Research Tools</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Finding facts, citations, and live web info.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Market research</li>
              <li>Competitor news</li>
              <li>Fact-checking</li>
            </ul>
          </Card>

          {/* Your Docs Tools */}
          <Card className="p-6 border-t-4 border-t-purple-500">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-lg text-slate-900">"Your Docs" Tools</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Analyzing YOUR uploaded files without hallucinating.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Summarizing 50 PDFs</li>
              <li>Project onboarding</li>
              <li>Contract review</li>
            </ul>
          </Card>

          {/* Builder Tools */}
          <Card className="p-6 border-t-4 border-t-emerald-500">
            <div className="flex items-center gap-2 mb-3">
              <PenTool className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-lg text-slate-900">Builder Tools</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Best for:</strong> Prototyping reusable tools and templates.
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
              <li>Creating "The Email Bot"</li>
              <li>Testing system prompts</li>
              <li>Advanced workflows</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SECTION 3: DEEP DIVES */}
      <section id="deep-dives" className="mb-12">
        <h2>Explore Specific Tools</h2>
        <p className="mb-6">Choose a path to learn more.</p>
        
        <div className="space-y-4 not-prose">
          <Card 
            className="p-4 hover:border-blue-300 cursor-pointer group flex items-center justify-between"
            onClick={() => push('/modules/tool-research')}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Research & Web Deep Dive</h3>
                <p className="text-sm text-slate-500">How to get cited, factual answers from the web.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
          </Card>

          <Card 
            className="p-4 hover:border-purple-300 cursor-pointer group flex items-center justify-between"
            onClick={() => push('/modules/tool-documents')}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">"Your Docs" Deep Dive</h3>
                <p className="text-sm text-slate-500">How to chat with internal files securely.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500" />
          </Card>

          <Card 
            className="p-4 hover:border-emerald-300 cursor-pointer group flex items-center justify-between bg-slate-50"
            onClick={() => push('/modules/tool-builder')}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">Builder's Lab</h3>
                  <Badge variant="neutral">Advanced</Badge>
                </div>
                <p className="text-sm text-slate-500">Create your own reusable AI assistants.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
          </Card>
        </div>
      </section>
    </ModuleLayout>
  );
}
