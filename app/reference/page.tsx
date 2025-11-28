
import React, { useState } from 'react';
import { PageLayout, Heading, Card, Callout, PromptCard, Button, Badge } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { 
  Shield, ArrowRight, Video, FileText, Book, ExternalLink, 
  Youtube, Clock, Target, BookOpen, Users, Map, 
  ChevronDown, ChevronUp, MessageSquare, Globe, Layers, PenTool,
  CheckCircle2, XCircle, Brain, Search, Layout
} from 'lucide-react';

// Data Types for the new library
type PromptTemplate = {
  id: string;
  title: string;
  useWhen: string;
  role: string;
  task: string;
  context: string[];
  requirements: string[];
  examples?: string[];
  toolHint?: string;
};

type PromptCategory = {
  id: string;
  title: string;
  description: string;
  templates: PromptTemplate[];
};

export default function Page() {
  const { push } = useRouter();
  
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

  // Helper to format the prompt string from the structured data
  const formatPromptText = (t: PromptTemplate) => {
    let text = `Persona: ${t.role}\n\nTask: ${t.task}\n\nContext:\n${t.context.map(c => `- ${c}`).join('\n')}\n\nRequirements:\n${t.requirements.map(r => `- ${r}`).join('\n')}`;
    
    if (t.examples && t.examples.length > 0) {
      text += `\n\nExamples:\n${t.examples.map(e => `- ${e}`).join('\n')}`;
    }
    return text;
  };

  // --- TEMPLATE DATA ---
  const categories: PromptCategory[] = [
    {
      id: 'writing',
      title: 'Writing & Communication',
      description: 'Turn messy thoughts into clear, audience-ready emails and messages.',
      templates: [
        {
          id: 'quiet-client',
          title: 'Follow-up Email for a Quiet Client',
          useWhen: 'Use this when someone never replied to your last email.',
          role: 'Senior account manager who values long-term relationships.',
          task: 'Draft a friendly follow-up email to a client who has not replied in {{X days}} about {{project/topic}}.',
          context: [
            'Client: {{industry, relationship length, any sensitivities}}',
            'Last email summary: {{one sentence recap or paste body}}',
            'Goal: Get a clear yes/no or new timeline without sounding pushy.'
          ],
          requirements: [
            'Tone: {{professional, warm, respectful}}',
            'Length: {{120–180 words}}',
            'Include: A short recap, a clear next step, and an easy opt-out.'
          ],
          examples: [
            'Good sign-off: "If now is not the right time, just let me know and we will pause."'
          ]
        },
        {
          id: 'exec-summary',
          title: 'Executive Summary Email for a Busy Leader',
          useWhen: 'Use this when you need to recap a complex topic for a director or VP who has very little time.',
          role: 'Strategy or operations lead writing to a busy senior leader.',
          task: 'Draft an email that summarizes {{topic or project}} and highlights only what this leader needs to know and decide.',
          context: [
            'Audience: {{role, how familiar they are with the topic}}',
            'Source: {{link or pasted notes, deck, or memo}}',
            'Decision needed: {{approve, prioritize, give feedback, or simply be informed}}'
          ],
          requirements: [
            'Start with 3–5 short bullet points that cover status, risks, and next step.',
            'Keep body under {{200}} words.',
            'End with a clear ask and a simple reply option (for example "Reply with 1, 2, or 3").'
          ],
          examples: [
            'Example ask: "Reply 1 to approve, 2 if you want changes, 3 if we should pause."'
          ]
        }
      ]
    },
    {
      id: 'summarizing',
      title: 'Reading & Summarizing',
      description: 'Turn long internal content into decisions, owners, and timelines.',
      templates: [
        {
          id: 'memo-decisions',
          title: 'Memo to Decisions, Owners, and Timeline',
          useWhen: 'Use this when you have a long internal memo and need a crisp action summary.',
          role: 'Project manager preparing a quick summary for a cross-functional team.',
          task: 'Turn the memo into a short summary that lists decisions, owners, and timelines.',
          context: [
            'Source: {{paste memo text or key sections}}',
            'Audience: {{team name or roles}}',
            'Timeframe: {{next 4–6 weeks, this quarter, etc.}}'
          ],
          requirements: [
            'Create three sections: "Key decisions", "Owners", and "Timeline".',
            'For each decision, include: one sentence, the owner, and the expected date.',
            'Flag any open questions that must be resolved first.'
          ],
          examples: [
            'Example label: "Decision 1: Sunset legacy form X by June 15 (Owner: Ops Lead)."'
          ]
        },
        {
          id: 'meeting-actions',
          title: 'Meeting Transcript to Action Items',
          useWhen: 'Use this when you have a long meeting recording or transcript.',
          role: 'Team member responsible for turning the conversation into actions.',
          task: 'Summarize the meeting into key points and a clear action list.',
          context: [
            'Source: {{pasted transcript, detailed notes, or bullet points}}',
            'Meeting type: {{status update, planning, retro, escalation}}',
            'Participants: {{roles, not names}}'
          ],
          requirements: [
            'Provide a short "What we covered" summary in 3–5 bullets.',
            'List action items with owner, due date, and success criteria if mentioned.',
            'Highlight any risks, blockers, or follow-up discussions.'
          ]
        }
      ]
    },
    {
      id: 'analysis',
      title: 'Analysis & Planning',
      description: 'Use AI to clarify options, tradeoffs, and next steps.',
      templates: [
        {
          id: 'options-tradeoffs',
          title: 'Options and Tradeoffs for a Decision',
          useWhen: 'Use this when you are weighing 2–4 options and need a structured view.',
          role: 'Business or product analyst helping a team choose between options.',
          task: 'Lay out options, pros and cons, and a recommendation for {{decision or project}}.',
          context: [
            'Decision: {{short description}}',
            'Options: {{list of options with one line each}}',
            'Constraints: {{budget, timeline, risk tolerance, dependencies}}'
          ],
          requirements: [
            'Present a table with columns: Option, Pros, Cons, Key risks, Rough effort.',
            'Add a short narrative section: "When this option makes sense."',
            'End with a neutral recommendation based on the constraints, not on hype.'
          ]
        },
        {
          id: 'risks-mitigations',
          title: 'Risks and Mitigations from a Project Brief',
          useWhen: 'Use this when you have a project brief but no formal risk register.',
          role: 'Project lead preparing a simple risk view for stakeholders.',
          task: 'Extract risks and propose mitigations from the project description.',
          context: [
            'Project description: {{paste brief or key bullets}}',
            'Timeline: {{expected launch or key milestones}}',
            'Critical dependencies: {{vendors, teams, systems}}'
          ],
          requirements: [
            'Identify at least 5 plausible risks across scope, schedule, and quality.',
            'For each risk, include likelihood and impact (low/medium/high).',
            'Propose one practical mitigation per risk.'
          ]
        }
      ]
    },
    {
      id: 'research',
      title: 'Research & Fact-checking',
      description: 'Get grounded, sourced answers instead of guesswork.',
      templates: [
        {
          id: 'fact-check',
          title: 'Quick Fact Check for a Claim',
          useWhen: 'Use this when you want to sanity-check a factual claim before sharing it.',
          role: 'Careful professional who wants to avoid spreading incorrect information.',
          task: 'Check whether {{claim or statement}} is accurate and provide supporting sources.',
          context: [
            'Claim: {{paste the sentence or paragraph you want to check}}',
            'Context: {{how you plan to use this}}',
            'Time window: {{for example "last 12 months"}}'
          ],
          requirements: [
            'Search for 2–3 recent, reputable sources that directly address the claim.',
            'Explain whether the claim is supported, partially supported, or not supported.',
            'Include citation-style links with publication date and outlet name.',
            'Flag any uncertainty or conflicting information.'
          ],
          examples: [
            'Example label: "This claim is partially supported; here is what the sources agree on and where they differ."'
          ]
        },
        {
          id: 'comp-intel',
          title: 'Competitive Intelligence Deep Dive',
          toolHint: 'Best in: Gemini (with web) or Perplexity',
          useWhen: 'Use this when you want a monthly view across multiple industries, with real sources and a table you can drop into a deck.',
          role: 'Market and competitive intelligence analyst for {{your company}}.',
          task: 'Provide a competitive-intelligence summary for {{time window}} covering these industries:\n- {{Industry 1}}\n- {{Industry 2}}\n- {{Industry 3}}\n- Membership organizations relevant to {{your company}}.',
          context: [
            'I care about genuine company moves: launches, partnerships, promotions, regulatory changes, performance results.',
            'I need this for a strategy discussion at {{company / team}}.'
          ],
          requirements: [
            'For each industry, find and cite around 2 reputable, recent, and tightly relevant articles or reports within {{time window}} (you can widen by a few days if the coverage clusters).',
            'For each source, give 1–2 sentence summaries focused on what actually changed and why it matters.',
            'Present results in a table with columns: Industry; Article title and source (with publication date); Short description; "Why this matters" for {{company / product}}.',
            'Avoid generic blog posts; prioritize serious news and reports.',
            'At the end, add a short section with "Key themes across industries" and "Implications for {{your company / AAA Insurance-style org}}."'
          ],
          examples: [
            'Tip: Paste your industries and time window clearly.'
          ]
        }
      ]
    },
    {
      id: 'coaching',
      title: 'Coaching & Reflection',
      description: 'Use AI as a quiet thinking partner about your work week and habits.',
      templates: [
        {
          id: 'weekly-reflection',
          title: 'Weekly Work Reflection',
          useWhen: 'Use this at the end of the week to reflect on what worked and what did not.',
          role: 'Knowledge worker reflecting on their own performance and priorities.',
          task: 'Guide me through a short reflection on this week and help me set up next week.',
          context: [
            'Highlights: {{3 things that went well}}',
            'Lowlights: {{3 things that felt frustrating or unclear}}',
            'Upcoming priorities: {{3–5 important tasks or goals}}'
          ],
          requirements: [
            'Ask me 5–7 thoughtful questions one by one; wait for my answer after each.',
            'Help me identify patterns in what energizes me and what drains me.',
            'End with a suggested "top 3" focus list for next week.'
          ]
        },
        {
          id: 'tough-convo',
          title: 'Coaching Questions for a Tough Conversation',
          useWhen: 'Use this when you have a hard conversation coming up and want to think it through.',
          role: 'Supportive coach helping me prepare for a difficult conversation at work.',
          task: 'Ask me coaching-style questions to help me clarify what I want from the conversation and how to show up well.',
          context: [
            'Relationship: {{manager, peer, direct report, stakeholder}}',
            'Situation: {{brief description}}',
            'Constraints: {{timing, sensitivity, any non-negotiables}}'
          ],
          requirements: [
            'Ask questions in plain, human language; avoid therapy jargon.',
            'Help me articulate my goals, fears, and non-negotiables.',
            'Summarize back what you heard and suggest 2–3 opening lines I could use.'
          ]
        }
      ]
    }
  ];

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
          <SectionHeader id="templates" title="Prompt Template Library" icon={FileText} />
          {openSections['templates'] && (
            <div className="p-6 animate-fade-in bg-white">
              <p className="text-slate-600 mb-8 text-lg">
                Pick a job you are trying to do and grab a template. Every prompt follows the same pattern (PCTR) and works in any modern chatbot.
              </p>
              
              <div className="space-y-10">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-slate-900">{cat.title}</h4>
                      <p className="text-sm text-slate-600">{cat.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cat.templates.map((template) => (
                        <div key={template.id} className="flex flex-col h-full">
                           <div className="mb-2">
                             <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{template.title}</span>
                                {template.toolHint && (
                                   <Badge variant="blue" className="text-[10px] py-0">{template.toolHint}</Badge>
                                )}
                             </div>
                             <p className="text-xs text-slate-500 italic">{template.useWhen}</p>
                           </div>
                           <div className="flex-1">
                             <PromptCard 
                               label={template.title}
                               prompt={formatPromptText(template)}
                             />
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
