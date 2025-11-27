import React, { useState } from 'react';
import { PageLayout, Heading, Card, Callout, PromptCard, Button, Badge } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { 
  Shield, ArrowRight, Video, FileText, Book, ExternalLink, 
  Youtube, Clock, Target, BookOpen, Users, Map, 
  ChevronDown, ChevronUp, MessageSquare, Globe, Layers, PenTool,
  CheckCircle2, XCircle
} from 'lucide-react';

export default function Page() {
  const { push } = useRouter();
  
  // State for collapsible sections. Defaulting 'templates' to open.
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'templates': true,
    'safety': false,
    'tools': false,
    'resources': false
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const SectionHeader = ({ id, title, icon: Icon }: { id: string, title: string, icon: any }) => (
    <button 
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      {openSections[id] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
    </button>
  );

  return (
    <PageLayout 
      title="Reference & Cheat Sheets" 
      description="Your control center for prompt templates, safety rules, and quick tool guides. Bookmark this page."
      actions={
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => push('/reference/prompting-guide')}>
             Prompting Guide
          </Button>
          <Button variant="outline" onClick={() => push('/reference/policy-quick-view')}>
             Policy Check
          </Button>
        </div>
      }
    >
      <div className="space-y-6 max-w-4xl mx-auto">

        {/* SECTION 1: PROMPT TEMPLATES */}
        <Card className="overflow-hidden p-0">
          <SectionHeader id="templates" title="Prompt Templates" icon={FileText} />
          {openSections['templates'] && (
            <div className="p-6 animate-fade-in bg-white">
              <p className="text-slate-600 mb-6">
                Don't start from zero. Copy these patterns and fill in your specific details to get a better first draft.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PromptCard 
                  label="The 'Difficult Email' Draft"
                  prompt="Draft a polite but firm email to a client explaining that we need the signed contract before we can start work. Reference section 2.1 of the proposal. Keep the tone collaborative." 
                />
                <PromptCard 
                  label="Meeting Summarizer"
                  prompt="Summarize the following meeting notes into a chronological list of action items. Highlight any deadlines that are at risk or blocked." 
                />
                <PromptCard 
                  label="The 'Critic' Mode"
                  prompt="Review this draft for clarity and tone. Point out 3 specific sentences that could be more concise, and propose rewrites for them." 
                />
                <PromptCard 
                  label="Data Extraction (JSON)"
                  prompt="Extract the following fields from the text below and format them as a JSON list: Date, Vendor Name, Total Amount, Invoice Number." 
                />
              </div>
            </div>
          )}
        </Card>

        {/* SECTION 2: APPROVED USE CASES & SAFETY */}
        <Card className="overflow-hidden p-0">
          <SectionHeader id="safety" title="Approved Use Cases & Safety" icon={Shield} />
          {openSections['safety'] && (
            <div className="p-6 animate-fade-in bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Use Cases */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> Green Light (Go)
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span><strong>Drafting:</strong> Internal comms, marketing copy, newsletters.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span><strong>Brainstorming:</strong> Agendas, interview questions, slide outlines.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span><strong>Summarizing:</strong> <em>Anonymized</em> feedback, public industry reports.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span><strong>Technical:</strong> Explaining Excel formulas, debugging snippets.</span>
                    </li>
                  </ul>
                </div>

                {/* Safety Rules */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" /> Red Light (Stop)
                  </h4>
                  <Callout variant="danger" className="mb-4">
                    <ul className="space-y-2 text-sm">
                      <li>❌ <strong>PII:</strong> Names, SSNs, Addresses, Phone Numbers.</li>
                      <li>❌ <strong>Financials:</strong> Account numbers, precise salary data.</li>
                      <li>❌ <strong>Secrets:</strong> Unannounced strategy, passwords, keys.</li>
                    </ul>
                  </Callout>
                  <p className="text-sm text-slate-500">
                    *When in doubt, use placeholders (e.g., "Client X", "Project Y") or ask the Governance team.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* SECTION 3: TOOL QUICK REFERENCE */}
        <Card className="overflow-hidden p-0">
          <SectionHeader id="tools" title="Tool Quick Reference" icon={Target} />
          {openSections['tools'] && (
            <div className="p-6 animate-fade-in bg-white">
              <p className="text-slate-600 mb-6">
                Which engine should you use? Pick the right tool for the job.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold">
                    <MessageSquare className="w-4 h-4" /> Chat
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Gemini / ChatGPT</div>
                  <p className="text-sm text-slate-700">Best for drafting, rewriting, and quick explanations.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold">
                    <Globe className="w-4 h-4" /> Research
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Perplexity</div>
                  <p className="text-sm text-slate-700">Best for facts, citations, and market intel.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold">
                    <Layers className="w-4 h-4" /> Docs
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">NotebookLM</div>
                  <p className="text-sm text-slate-700">Best for summarizing and querying 50+ page PDFs.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold">
                    <PenTool className="w-4 h-4" /> Builder
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">AI Studio</div>
                  <p className="text-sm text-slate-700">Best for creating reusable prompts and mini-apps.</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* SECTION 4: RESOURCE LIBRARY PREVIEW */}
        <Card className="overflow-hidden p-0 border-blue-200 shadow-sm">
          <SectionHeader id="resources" title="Deep Dive: Videos, Guides, & Docs" icon={BookOpen} />
          {openSections['resources'] && (
            <div className="p-6 animate-fade-in bg-white">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    We’ve curated the best external content from experts like <strong>Tina Huang</strong> and <strong>Jeff Su</strong>, alongside official Google documentation.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="p-1.5 bg-red-100 text-red-600 rounded">
                        <Youtube className="w-4 h-4" />
                      </div>
                      "Google AI Studio in 26 Minutes" (Video)
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="p-1.5 bg-blue-100 text-blue-600 rounded">
                        <FileText className="w-4 h-4" />
                      </div>
                      Official HubSpot x Tina Huang Prompting Guide (PDF)
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="p-1.5 bg-purple-100 text-purple-600 rounded">
                        <Map className="w-4 h-4" />
                      </div>
                      3-Hour Recommended Learning Path
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-auto bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col items-center text-center">
                  <h4 className="font-bold text-blue-900 mb-2">Ready to master the tools?</h4>
                  <p className="text-sm text-blue-700 mb-4 max-w-xs">
                    Access the full library of hand-picked resources to accelerate your learning.
                  </p>
                  <Button onClick={() => push('/reference/resources')} className="w-full">
                    Open Resource Library <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

      </div>
    </PageLayout>
  );
}