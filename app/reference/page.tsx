import React, { useState } from 'react';
import { PageLayout, Heading, Card, Callout, PromptCard, Button, Badge } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { 
  Shield, ArrowRight, Video, FileText, Book, ExternalLink, 
  Youtube, Clock, Target, BookOpen, Users, Map, 
  ChevronDown, ChevronUp, MessageSquare, Globe, Layers, PenTool,
  CheckCircle2, XCircle, Brain, Search, Layout, Zap, File
} from 'lucide-react';

// Data Types for the new library
type PromptTemplate = {
  id: string;
  title: string;
  useWhen: string;
  toolHint?: string;
  promptContent?: string;
  // Legacy structured fields (optional now)
  role?: string;
  task?: string;
  context?: string[];
  requirements?: string[];
  examples?: string[];
};

type PromptCategory = {
  id: string;
  title: string;
  description: string;
  templates: PromptTemplate[];
};

export default function Page() {
  const { push } = useRouter();
  
  const [openSections, setOpenSections] = useState({
    guide: false,
    templates: true,
    safety: false,
    tools: false,
    resources: false
  });

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleSection = (id: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const SectionHeader = ({ 
    id, 
    title, 
    description,
    isOpen,
    onToggle,
    icon: Icon 
  }: { 
    id?: string, 
    title: string, 
    description?: string,
    isOpen: boolean,
    onToggle: () => void,
    icon: any 
  }) => (
    <button 
      id={id}
      type="button"
      onClick={onToggle}
      className="w-full flex items-start justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-slate-600">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2 text-slate-400">
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </button>
  );

  // Helper to format the prompt string from the structured data
  const formatPromptText = (t: PromptTemplate) => {
    if (t.promptContent) {
      return t.promptContent;
    }
    // Fallback for any legacy structured data
    let text = `Persona: ${t.role || ''}\n\nTask: ${t.task || ''}\n\nContext:\n${(t.context || []).map(c => `- ${c}`).join('\n')}\n\nRequirements:\n${(t.requirements || []).map(r => `- ${r}`).join('\n')}`;
    
    if (t.examples && t.examples.length > 0) {
      text += `\n\nExamples:\n${t.examples.map(e => `- ${e}`).join('\n')}`;
    }
    return text;
  };

  // --- TEMPLATE DATA ---
  const categories: PromptCategory[] = [
    {
      id: 'writing',
      title: 'Writing and rewriting',
      description: 'Draft emails, messages, and updates that sound like you.',
      templates: [
        {
          id: 'quiet-client',
          title: 'Follow-up Email for a Quiet Client',
          useWhen: 'Someone never replied to your last note.',
          promptContent: `You are a senior account manager and relationship-focused email strategist.

Goal: Draft a friendly follow-up email to a client who has not replied in {{X days}}. We want a clear yes/no or next step without sounding pushy or desperate.

Context:
- Client industry and relationship: {{industry, relationship length}}
- Last email recap: {{one sentence recap}}
- My goal for this follow-up is: [briefly describe what you want from this email, e.g., confirm scope, book a meeting, close the loop].
- Note any constraints or sensitivities: [e.g., pricing pressure, prior delays, none].

Instructions:
1. Briefly restate (in 2–3 bullets) how you interpret:
   - The relationship dynamic.
   - The likely reason for the silence.
   - The tone we should strike (reassuring, light, direct, etc.).
2. Draft TWO versions of the follow-up email:
   - Version A: Very light-touch, assumes they are just busy.
   - Version B: More direct about getting a decision or next step, while staying warm.
3. For each version:
   - Include a subject line.
   - Keep the body under 150 words.
   - Use tone: {{professional, warm}}.
   - Make it easy to say “no” or “not now” with a soft opt-out line.
4. After the drafts, add a short “Consultant Notes” section (for me, not the client):
   - In 3 bullets, explain when you’d choose A vs. B.
   - Suggest 1 tweak I could make if I know this client is very risk-averse, highly price-sensitive, or extremely busy.
5. Self-critique:
   - In 2 bullets, note what might still feel too pushy or too vague and how I could adjust the copy.`
        },
        {
          id: 'exec-summary',
          title: 'Executive Summary Email',
          useWhen: 'Recapping a complex topic for a busy leader.',
          promptContent: `You are an operations lead writing to a VP, acting as an executive communication consultant.

Task: Turn the raw material below into a crisp executive summary email for {{project}}.

Context:
- Audience: {{role}}
- Source content: {{paste notes or deck content}}
- Decision needed: {{approve, prioritize, or FYI}}
- Time sensitivity or key dates: [briefly note deadlines or write "none"].

Instructions:
1. Interpret the source:
   - In 3 bullets, identify:
     - Where the project stands.
     - The top 1–2 risks.
     - What this VP likely cares about most for this decision.
2. Draft the email:
   - Start with a "TL;DR" block of exactly 3 bullets: Status, Risk, Decision Needed.
   - Keep the body under 200 words.
   - Focus only on what the VP needs to decide or be aware of right now.
   - End with a single clear ask (e.g., "Reply with 1 or 2" or "Approve Option B so we can proceed").
3. Provide TWO subject line options:
   - One neutral, status-oriented option.
   - One that signals a decision is needed without sounding alarmist.
4. Add a "Below the Line" section (for me, not included in the email):
   - 3 bullets describing extra context I should keep handy if the VP replies with questions.
5. Self-critique:
   - In 2–3 bullets, suggest how I could tailor this differently for:
     - A VP who likes more detail.
     - A VP who only wants the big-picture outcomes.`
        }
      ]
    },
    {
      id: 'research',
      title: 'Research with Perplexity',
      description: 'Get cited answers for market scans and competitive intel.',
      templates: [
        {
          id: 'comp-intel',
          title: 'Competitive Intelligence Scan',
          useWhen: 'You need a market view with real sources.',
          promptContent: `You are a market intelligence analyst for {{Company}} using a web-connected AI tool.

Task: Provide a competitive summary for {{Time Window}} covering {{Industry}}.

Context:
- Focus on: launches, partnerships, regulatory changes, and notable performance results.
- Ignore: generic how-to blog posts, shallow listicles, and obvious SEO content.
- Priority competitors: [list key competitors or state that you want a broad landscape].

Instructions:
1. Research scope:
   - Limit to {{Time Window}}.
   - Prioritize reputable sources (major news outlets, official company channels, industry analysts).
2. For each major competitor:
   - Find 2 strong, recent items (news, launches, deals, or regulatory events).
   - If you cannot find 2 high-quality items, write "INSUFFICIENT DATA" for that competitor and explain why.
3. Present the core results in a table with columns:
   - Competitor
   - Date
   - Source (Publisher)
   - Source Link
   - Event / Update (1–2 sentences)
   - Why This Matters (for {{Company}})
4. After the table, write:
   - A narrative summary (5–7 bullets) on key trends you see across competitors.
   - 3–5 "Implications for {{Company}}" focusing on strategy, risk, or opportunity.
5. Quality and validation:
   - Flag any sources that seem low-quality or biased.
   - Call out any major gaps in information or blind spots.
6. Self-critique:
   - In 2 bullets, note what additional data or access (e.g., paid reports, internal performance dashboards) would improve this analysis by about 20%.`
        },
        {
          id: 'topic-primer',
          title: 'Instant Topic Briefing',
          useWhen: 'You need to get smart on a new industry fast.',
          promptContent: `You are a Product Manager’s research assistant.

Task: Give me a concise, executive-ready briefing on {{Topic, e.g., EV charging in CA}} so I can sound competent in a meeting in 1 hour.

Context:
- My role: [briefly describe your role, e.g., Strategy, Product, Ops].
- My company or industry: [briefly describe].
- The meeting audience: [e.g., executives, partners, clients].

Instructions:
1. Start with a "30-second overview":
   - 3–5 plain-language bullets that explain what this topic is and why it matters right now.
2. Then provide a structured briefing with sections:
   A. Core Concepts (3–5 bullets).
   B. Current Landscape (3–5 bullets, including key players or segments).
   C. Major changes in the last 12 months (3–5 bullets, clearly time-bound).
3. Links:
   - Provide 3–5 high-quality links to read more.
   - For each, give: Title, Source, Date, and a 1-sentence "Why this is worth my time".
4. Make it role-aware:
   - Add a short section: "Talking points for my role" with 3–5 bullets I can use in the meeting.
5. Wrap-up:
   - Suggest 3–5 smart follow-up questions I could ask that make me sound informed but not pretentious.
6. Self-critique:
   - In 2 bullets, explain what nuance or detail you had to compress due to brevity and what I should explore next if I have 30 more minutes.`
        }
      ]
    },
    {
      id: 'docs',
      title: 'NotebookLM and your docs',
      description: 'Summarize and query your own files securely.',
      templates: [
        {
          id: 'memo-decisions',
          title: 'Memo to Decisions & Owners',
          useWhen: 'Turning a long internal memo into an action list.',
          promptContent: `You are a project management consultant turning a long memo into a clear decision log.

Task: Turn this memo into a structured summary of decisions, owners, and timelines.

Context:
- Source memo: {{paste text or upload doc}}
- Audience: {{Team Name}}

Instructions:
1. Extract the essentials:
   - In 3–5 bullets, summarize what this memo is trying to accomplish.
2. Create three sections with clear formatting:

   A. Decisions
   - List each decision as a bullet or table row.
   - For each: Decision, Rationale (1 short phrase), Status (Decided / Proposed / Pending).

   B. Owners
   - For every decision, map to a single accountable owner (RACI-style "A").
   - If the memo is unclear, propose a likely owner and tag it as "Assumed".

   C. Timeline
   - Extract any dates, milestones, and deliverables.
   - Present as either a table or bullet timeline: Date → Milestone → Owner.

3. Add a section called "Open Questions & Risks":
   - List any unclear decisions, dependencies, or risks that could derail the plan.
4. Consistency check:
   - Confirm that every decision has both an owner and a timeline entry.
   - If any are missing, call them out explicitly in a short bullet list.
5. Self-critique:
   - In 2 bullets, flag where the memo itself is ambiguous and suggest 2 clarifying questions I should ask the team.`
        },
        {
          id: 'meeting-actions',
          title: 'Meeting Transcript to Actions',
          useWhen: 'You have a raw transcript or messy notes.',
          promptContent: `You are a team lead’s note-taking and action-tracking assistant.

Task: Turn this meeting transcript into key points, decisions, and reliable action items.

Context:
- Source: {{paste transcript}}
- Meeting type: {{Status update, Retro, Planning, etc.}}

Instructions:
1. Understand the meeting:
   - In 3 bullets, summarize the main purpose and outcome of the meeting.
2. "What we covered":
   - Provide a concise summary section with 5–10 bullets, grouped by topic or theme.
3. Action items:
   - Create a table with columns: Owner, Action Item, Due Date, Priority (High / Med / Low).
   - If owner or due date is not explicit, propose a reasonable owner/date and mark it as "Suggested".
4. Decisions:
   - List all decisions made in this meeting as bullets or a table.
   - For each, include: Decision, Rationale (short), and any dependencies.
5. Risks and blockers:
   - Highlight any risks, blockers, or open questions in their own section.
6. Optional: Email-ready summary
   - Draft a short email I could send to attendees with:
     - 3 bullets for "What we covered".
     - 3–5 bullets for "Key actions".
7. Self-critique:
   - In 2 bullets, note:
     - Where the transcript is ambiguous and you had to infer.
     - What additional context (e.g., project docs, roadmap) would make this summary more accurate.`
        }
      ]
    },
    {
      id: 'builder',
      title: 'Builders and system prompts',
      description: 'Configure custom assistants and generate full applications.',
      templates: [
        {
          id: 'gem-system-prompt',
          title: 'Custom Gem / System Prompt',
          useWhen: 'Defining the personality and rules for a custom bot.',
          promptContent: `You are the **{{Assistant Name}}**, the dedicated AI partner for **{{Team Name}}**.

### Core Identity
- **Role:** You are a {{Role, e.g., Senior Data Architect}}.
- **Tone:** {{Tone, e.g., Professional, Socratic, Direct}}.
- **Mission:** Help the user achieve {{Goal}} without {{Negative Constraint}}.

### Knowledge Base & Tools
- **Uploaded Docs:** Prioritize information from {{File Names}}. If a user asks about X, look in Y.
- **Capabilities:** You can {{Capabilities, e.g., run Python code, generate charts}}.
- **Limitations:** You cannot {{Limitation, e.g., access live customer PII}}.

### Operational Rules
1. **Input Analysis:** Before answering, verify if the user is asking about {{Topic}}.
2. **Reasoning:** Show your thinking step-by-step for complex requests.
3. **Fallback:** If the answer is not in your knowledge base, state "I cannot find this in our internal docs" before answering with general knowledge.

### Output Style Guide
- **Structure:** Start with a direct answer. Follow with bullet points for details.
- **Formatting:** Use Markdown tables for data. Use code blocks for scripts.
- **Length:** Keep responses under {{Word Count}} unless requested otherwise.`
        },
        {
          id: 'web-app-builder',
          title: 'One-Shot App Specification',
          useWhen: 'Building a working web app prototype in one go.',
          promptContent: `Act as a **Senior Frontend Engineer** and **UI/UX Designer**.

### Task
Build a fully functional **{{App Name}}** using React and Tailwind CSS.

### Technical Constraints
- **Framework:** React (Functional components, Hooks).
- **Styling:** Tailwind CSS (Use a {{Theme Name}} color palette).
- **Icons:** Lucide React.
- **Data:** Use mock data arrays inside the component. No backend.

### Functional Requirements
1. **Main View:** A {{Layout Type, e.g., Dashboard}} displaying {{Data Type}}.
2. **Interaction:** Users must be able to {{Action 1}} and {{Action 2}}.
3. **State:** Persist {{Data}} in local state (or localStorage).

### Design System ("The Vibe")
- **Aesthetic:** {{Adjectives, e.g., Clean, Minimalist, "Linear-style"}}.
- **Components:** Create reusable UI components (Card, Button, Input) with distinct hover/active states.
- **Responsiveness:** Fully responsive for mobile and desktop.

### Deliverable
Provide the **complete, single-file code** (or organized file structure) for this application. Ensure it is runnable immediately without errors.`
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety and fact checking',
      description: 'Verify claims and reflect on sensitive topics.',
      templates: [
        {
          id: 'fact-check',
          title: 'Claim Fact Check',
          useWhen: 'A statement looks suspicious or too good to be true.',
          promptContent: `You are a professional fact checker.

Task: Verify if {{Claim}} is accurate using recent, reputable sources.

Context:
- Claim: {{paste sentence}}
- How I will use it: {{how you will use it}}

Instructions:
1. Research:
   - Find 2–4 recent, credible sources that directly address the claim.
   - Prioritize primary sources (official statistics, company sites, reputable news, academic papers).
2. Present findings in a table with columns:
   - Source
   - Date
   - Type (news, government data, academic, company, etc.)
   - Key Evidence (1–2 sentences)
   - Link
3. Conclusion:
   - State whether the claim is Supported, Partially Supported, or Unsupported.
   - Explain in 3–5 sentences, referencing the evidence.
4. Nuance and caveats:
   - Note any conflicting information or important context that might change how we present this claim.
5. Suggest safer wording:
   - If the claim is not fully supported, propose a more precise or cautious way to phrase it.
6. Self-critique:
   - In 2 bullets, note:
     - Limitations of this quick fact-check (e.g., data lag, paywalled research).
     - What further verification step a careful researcher should take before publishing.`
        },
        {
          id: 'tough-convo',
          title: 'Tough Conversation Prep',
          useWhen: 'Preparing for a sensitive talk with a colleague.',
          promptContent: `You are a supportive coach helping me prepare for a tough conversation with {{Person}}.

Task: Help me clarify my goals, anticipate reactions, and craft language I can actually use.

Context:
- Situation: {{brief description}}
- My goal: {{what you want to achieve}}

Instructions:
1. Start with coaching questions:
   - Ask me up to 5 thoughtful questions ONE BY ONE.
   - Assume interactive use and leave space for my answers.
   - Focus on my non-negotiables, fears, desired outcomes, and what I am willing to compromise on.
2. Once you have enough context, create a "Conversation Plan" with sections:
   A. My Objectives (3–5 bullets).
   B. Their Likely Perspective (3–5 bullets).
   C. Risks if this goes badly (2–3 bullets).
   D. Ground rules for myself (2–3 bullets, e.g., "Do not interrupt", "Stay calm if…").
3. Script support:
   - Suggest 2–3 opening lines I could realistically say in my own voice.
   - Provide a short outline of the conversation (Beginning, Middle, End) with key phrases.
4. Contingency planning:
   - Give 3 example responses I can use if:
     - They become defensive.
     - They dismiss my concerns.
     - They react positively and want next steps.
5. Self-critique:
   - In 2 bullets, note:
     - What emotional nuance or history you cannot see and I should factor in.
     - One way I can adapt this plan if the power dynamic is strongly in their favor.`
        }
      ]
    }
  ];

  return (
    <PageLayout 
      title="Reference & Cheat Sheets" 
      description="This is your bookshelf of prompts. Scan by activity, pick a template that fits, and tweak it for your team, your audience, and your tools."
    >
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Quick Links Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-slate-500" />
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Quick Links</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="p-4 hover:border-blue-300 cursor-pointer group flex items-center gap-4 transition-all"
              onClick={() => push('/reference/prompting-guide')}
            >
               <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                 <Target className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Prompting Guide (PCTR)</h3>
                 <p className="text-sm text-slate-600">The 4-part formula for perfect prompts.</p>
               </div>
               <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Card>

            <Card 
              className="p-4 hover:border-emerald-300 cursor-pointer group flex items-center gap-4 transition-all"
              onClick={() => push('/reference/policy-quick-view')}
            >
               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-100 transition-colors">
                 <Shield className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 group-hover:text-emerald-700">Policy Check</h3>
                 <p className="text-sm text-slate-600">What is safe to paste into AI?</p>
               </div>
               <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </Card>
          </div>
        </section>

        {/* Main Accordion List */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          
          {/* SECTION 1: PROMPT TEMPLATES */}
          <Card className="overflow-hidden p-0 border-0 shadow-none">
            <SectionHeader 
              id="templates" 
              title="Prompt Template Library" 
              description="Job based prompts for writing, analysis, research, and more."
              isOpen={openSections.templates} 
              onToggle={() => toggleSection('templates')} 
              icon={FileText} 
            />
            {openSections.templates && (
              <div className="p-6 animate-fade-in bg-white border-t border-slate-100">
                <p className="text-slate-600 mb-8 text-lg">
                  Pick a job you are trying to do and grab a template. Every prompt follows the same pattern (PCTR) and works in any modern chatbot.
                </p>
                
                <div className="space-y-4">
                  {categories.map((cat) => {
                    let bannerClass = '';
                    let textClass = '';
                    let icon = <FileText className="w-5 h-5" />;

                    switch (cat.id) {
                      case 'writing':
                        bannerClass = 'bg-blue-50';
                        textClass = 'text-blue-900';
                        icon = <PenTool className="w-5 h-5 text-blue-600" />;
                        break;
                      case 'docs':
                        bannerClass = 'bg-emerald-50';
                        textClass = 'text-emerald-900';
                        icon = <Layers className="w-5 h-5 text-emerald-600" />;
                        break;
                      case 'builder':
                        bannerClass = 'bg-amber-50';
                        textClass = 'text-amber-900';
                        icon = <Zap className="w-5 h-5 text-amber-600" />;
                        break;
                      case 'research':
                        bannerClass = 'bg-purple-50';
                        textClass = 'text-purple-900';
                        icon = <Globe className="w-5 h-5 text-purple-600" />;
                        break;
                      case 'safety':
                        bannerClass = 'bg-rose-50';
                        textClass = 'text-rose-900';
                        icon = <Shield className="w-5 h-5 text-rose-600" />;
                        break;
                      default:
                        bannerClass = 'bg-slate-100';
                        textClass = 'text-slate-900';
                    }

                    const isExpanded = !!expandedCategories[cat.id];

                    return (
                      <div key={cat.id} className={`rounded-xl border transition-all duration-200 overflow-hidden ${isExpanded ? 'border-blue-200 shadow-md bg-white' : 'border-slate-200 bg-white hover:border-blue-300'}`}>
                        {/* Interactive Header */}
                        <button
                          onClick={() => toggleCategory(cat.id)}
                          className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${isExpanded ? bannerClass : 'bg-white hover:bg-slate-50'}`}
                        >
                           {/* Icon */}
                           <div className={`p-2 rounded-lg shadow-sm transition-colors ${isExpanded ? 'bg-white' : 'bg-slate-100 text-slate-500'}`}>
                             {icon}
                           </div>
                           
                           {/* Text */}
                           <div className="flex-1">
                              <h3 className={`font-bold text-lg transition-colors ${isExpanded ? textClass : 'text-slate-900'}`}>{cat.title}</h3>
                              <p className="text-sm text-slate-500">{cat.description}</p>
                           </div>
                           
                           {/* Chevron */}
                           <div className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-5 h-5" />
                           </div>
                        </button>

                        {/* Collapsible Content */}
                        {isExpanded && (
                          <div className="p-6 bg-slate-50/50 grid gap-6 md:grid-cols-2 animate-fade-in border-t border-slate-100">
                             {cat.templates.map((template) => (
                                <div key={template.id} className="flex flex-col h-full bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:border-blue-300 transition-colors">
                                   {/* Header */}
                                   <div className="mb-4">
                                      <div className="flex items-center justify-between mb-1">
                                          <span className="text-base font-bold text-slate-900">{template.title}</span>
                                          {template.toolHint && (
                                            <Badge variant="blue" className="text-[10px] py-0 px-1.5">{template.toolHint}</Badge>
                                          )}
                                      </div>
                                      <p className="text-xs text-slate-600 line-clamp-2">
                                        <strong className="text-slate-500 uppercase text-[10px] tracking-wide mr-1">Use this when:</strong> {template.useWhen}
                                      </p>
                                   </div>
                                   
                                   {/* Prompt */}
                                   <div className="flex-1">
                                      <PromptCard 
                                        label="PROMPT TEMPLATE"
                                        prompt={formatPromptText(template)}
                                      />
                                   </div>
                                </div>
                             ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>

          {/* SECTION 2: AI POLICY & SAFE USE */}
          <Card className="overflow-hidden p-0 border-0 shadow-none">
            <SectionHeader 
              id="safety" 
              title="AI Policy & Safe Use" 
              description="What is safe to paste and what should stay out."
              isOpen={openSections.safety} 
              onToggle={() => toggleSection('safety')} 
              icon={Shield} 
            />
            {openSections.safety && (
              <div className="p-6 animate-fade-in bg-white border-t border-slate-100">
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

          {/* SECTION 3: TOOLS & WORKFLOWS */}
          <Card className="overflow-hidden p-0 border-0 shadow-none">
            <SectionHeader 
              id="tools" 
              title="Advanced Tools & Workflows" 
              description="When to reach for NotebookLM, Perplexity, and Gemini."
              isOpen={openSections.tools} 
              onToggle={() => toggleSection('tools')} 
              icon={Target} 
            />
            {openSections.tools && (
              <div className="p-6 animate-fade-in bg-white border-t border-slate-100">
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
          <Card className="overflow-hidden p-0 border-0 shadow-none">
            <SectionHeader 
              id="resources" 
              title="Deep Dive: Videos, Guides, & Docs" 
              description="Curated external content from experts."
              isOpen={openSections.resources} 
              onToggle={() => toggleSection('resources')} 
              icon={BookOpen} 
            />
            {openSections.resources && (
              <div className="p-6 animate-fade-in bg-white border-t border-slate-100">
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
                    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 mb-2">
                      Coming soon
                    </span>
                    <h4 className="font-bold text-blue-900 mb-2">Ready to master the tools?</h4>
                    <p className="text-sm text-blue-700 mb-4 max-w-xs">
                      Access the full library of hand-picked resources to accelerate your learning.
                    </p>
                    <Button variant="outline" disabled className="w-full">
                      Resource Library (coming soon)
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>

        </div>
      </div>
    </PageLayout>
  );
}