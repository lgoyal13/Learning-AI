# AI COACH PROJECT PLAN
## Research-Grounded MVP Development

**Last Updated:** January 9, 2026
**Project Goal:** Build an intelligent AI coaching platform that reduces "workslop" by teaching business professionals optimized AI workflows and prompts based on industry research and validated best practices.

---

## 🎯 PROJECT OVERVIEW

### Vision
Transform non-technical business professionals from AI novices to power users by providing intelligent, role-specific workflow guidance based on real industry practices.

### Success Criteria
- Reduce time spent on repetitive tasks by 30%+ for target users
- Workflows grounded in validated industry research (not AI-generated speculation)
- Deep coverage of 3-4 roles (vs shallow coverage of many)
- Users can complete real work tasks end-to-end using the coach

### Target Roles (Priority Order)
Based on Aditya's experience and market demand:

1. **Business Operations / Strategic Analyst** (Priority 1 - Your expertise)
2. **Finance / FP&A Analyst** (Priority 2 - Adjacent skills)
3. **Marketing Manager** (Priority 3 - High AI adoption potential)
4. **Operations Manager** (Priority 4 - Process optimization focus)

---

## 🧭 CORE PRODUCT PRINCIPLES (NORTH STAR)

**Reference these principles for ALL product decisions.**

### The Insight
A workflow library alone does NOT solve workslop. Users won't browse a library - they arrive with a problem. Static prompts become stale. Copy-paste without understanding creates dependency, not capability.

### The Hierarchy of Value
```
HIGHEST VALUE
┌─────────────────────────────────────────────┐
│  SKILL-BUILDING                             │
│  Users become 10x better at AI              │
├─────────────────────────────────────────────┤
│  INTELLIGENCE LAYER                         │
│  Task Advisor + Prompt Refiner              │
│  (The actual product)                       │
├─────────────────────────────────────────────┤
│  THE "WHY"                                  │
│  PCTR breakdowns, explanations, judgment    │
├─────────────────────────────────────────────┤
│  WORKFLOW LIBRARY                           │
│  Data layer that powers intelligent features│
│  (Necessary, but not sufficient)            │
└─────────────────────────────────────────────┘
LOWEST VALUE (but still necessary)
```

### Feature Impact Ranking
| Feature | Impact | Why |
|---------|--------|-----|
| Smart Prompt Refiner | HIGH | Meets users at THEIR prompt, teaches transferable skills |
| Intelligent Task Advisor | HIGH | Solves "where do I start?", contextual, adaptive |
| Workflow Library | MEDIUM | Reference material; passive without intelligent layer |

### The Moat
- **Weak moat:** "We have 50 workflow templates" (anyone can make prompts; AI tools are adding this)
- **Strong moat:** "Deep role-specific expertise + intelligent guidance + skill-building focus"

### Design Principles (Apply to ALL Features)
1. **Workflows are the textbook; the product is the tutor**
2. **Every prompt must teach WHY it works** (PCTR breakdown required)
3. **Include variations** so users learn to adapt, not just copy
4. **Add common mistakes** to build judgment, not just success paths
5. **Design for Task Advisor consumption** - workflows are recommendations, not just references
6. **Meet users where they are** - entry point is their problem, not our library

### When Making Tradeoffs
Ask: "Does this build user capability, or create dependency?"
- If dependency → reconsider or add educational layer
- If capability → proceed

---

## 📚 PHASE 0: RESEARCH FOUNDATION (Weeks 1-2)

### Goal
Build a validated knowledge base of role responsibilities, workflows, and best practices from authoritative sources.

### Activities

#### Week 1: Primary Research
- [ ] Run comprehensive research query through Perplexity Pro
- [ ] Access O*NET database for task taxonomies
- [ ] Review LinkedIn job postings (100+ per role for pattern analysis)
- [ ] Collect workflow templates from Notion, Asana, Monday.com
- [ ] Document McKinsey/BCG frameworks for operations and planning

#### Week 2: Synthesis & Validation
- [ ] Create role profiles (responsibilities, tools, metrics)
- [ ] Build task taxonomy with time allocation estimates
- [ ] Extract 8-12 high-impact workflows per role
- [ ] Validate against Aditya's resume (does this match reality?)
- [ ] Identify gaps and conduct follow-up research

### Deliverables
```
/research/
  ├── role-profiles/
  │   ├── business-analyst.md
  │   ├── finance-analyst.md
  │   ├── marketing-manager.md
  │   └── operations-manager.md
  ├── task-taxonomies/
  │   └── [role]-tasks.json
  ├── workflow-catalog/
  │   └── [role]-workflows.md
  ├── sources.md (all citations)
  └── research-summary.md
```

### Success Metrics
- 50+ cited sources across all roles
- 8-12 workflows per priority role
- Validation checklist completed with Aditya

---

## 📐 PHASE 1: DATA SCHEMA & STRUCTURE (Week 3)

### Goal
Define the data models and structures that will power the AI coach.

### Activities

#### 1. Define Core Schemas
```typescript
// Role Profile Schema
interface RoleProfile {
  id: string;
  name: string;
  description: string;
  coreSesponsibilities: string[];
  typicalTools: string[];
  successMetrics: string[];
  timeAllocation: {
    category: string;
    percentage: number;
  }[];
  painPoints: string[];
}

// Workflow Schema
interface Workflow {
  id: string;
  roleId: string;
  name: string;
  category: string; // "analysis" | "writing" | "research" | "planning" | "communication"
  description: string;
  estimatedTime: number; // minutes
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  complexity: "beginner" | "intermediate" | "advanced";

  // Current state
  currentProcess: {
    stepNumber: number;
    description: string;
    timeMinutes: number;
    painPoints: string[];
  }[];

  // AI-enhanced state
  aiWorkflow: {
    stepNumber: number;
    description: string;
    tool: string; // "ChatGPT" | "Gemini" | "Claude" | "Perplexity" | "NotebookLM"
    timeMinutes: number;
    prompt: string;
    explanation: string;
    tips: string[];
  }[];

  // Metadata
  timeSavingsMinutes: number;
  timeSavingsPercentage: number;
  sources: string[]; // Citations
  tags: string[];
}

// Prompt Template Schema
interface PromptTemplate {
  id: string;
  workflowId: string;
  name: string;
  category: string;
  tool: string;

  // The prompt itself
  systemPrompt?: string;
  userPromptTemplate: string;

  // PCTR breakdown
  persona: string;
  context: string;
  task: string;
  requirements: string[];

  // Guidance
  whenToUse: string;
  commonMistakes: string[];
  variations: {
    name: string;
    prompt: string;
    useCase: string;
  }[];

  // Quality
  qualityScore: number; // 0-10
  exampleInputs: string[];
  exampleOutputs: string[];
}

// Task Category Schema
interface TaskCategory {
  id: string;
  name: string;
  description: string;
  roleIds: string[];
  aiTools: string[];
  commonPatterns: string[];
}
```

#### 2. Create Template Files
- [ ] Build 5 complete workflow examples (from Aditya's resume)
- [ ] Build 15 prompt templates (3 per workflow)
- [ ] Build 4 role profiles
- [ ] Document the schema with examples

### Deliverables
```
/src/data/
  ├── schemas/
  │   ├── types.ts (TypeScript interfaces)
  │   └── schema-docs.md
  ├── roles/
  │   ├── business-analyst.json
  │   ├── finance-analyst.json
  │   ├── marketing-manager.json
  │   └── operations-manager.json
  ├── workflows/
  │   ├── retention-analysis.json
  │   ├── okr-planning.json
  │   ├── board-reporting.json
  │   └── [8-10 more].json
  └── prompts/
      └── [40-60 prompt templates].json
```

### Success Metrics
- Schema accommodates all research findings
- 5 "gold standard" workflows validated by Aditya
- All data structured consistently

---

## 🤖 PHASE 2: AI-ASSISTED DATA GENERATION (Week 4)

### Goal
Use AI to expand the data within our validated structures.

### Activities

#### 1. Create Sub-Agent Instructions
Now that we have validated schemas and seed examples, create instructions for AI to generate:
- Workflow variations (e.g., "Monthly retention analysis" → "Quarterly retention analysis")
- Prompt variations (different tones, audiences, complexity levels)
- Additional scenarios within each task category

#### 2. Generate & Curate
- [ ] Run sub-agent with clear constraints (must follow schema)
- [ ] Generate 20-30 additional workflows across roles
- [ ] Generate 100+ prompt templates
- [ ] Review every output (remove generic/useless content)
- [ ] Validate samples with Aditya

#### 3. Quality Control
- [ ] Every workflow must cite research source
- [ ] Every prompt must score 7+ on PCTR framework
- [ ] Time savings must be realistic (no inflated claims)

### Deliverables
- Expanded workflow library (30-40 total workflows)
- Comprehensive prompt library (100-150 templates)
- Quality control report (what was kept, what was rejected)

### Success Metrics
- 70%+ acceptance rate (AI-generated content that passes review)
- All content traceable to research or seed examples
- Aditya validates 5 random samples as "actually useful"

---

## 💻 PHASE 3: CORE APP FEATURES (Weeks 5-7)

### Goal
Build the three core intelligent coaching features.

### Week 5: Intelligent Task Advisor

#### Features
1. **Conversational Intake**
   - User describes their goal in plain English
   - AI asks 3-5 clarifying questions
   - Questions adapt based on previous answers

2. **Workflow Recommendation Engine**
   - Match user input to workflow library
   - Rank by relevance, time, complexity
   - Show top 3 options with rationale

3. **Custom Workflow Generator**
   - If no match, generate custom workflow
   - Use Gemini 2.5 Pro with structured output
   - Base on similar workflows in library

#### UI Components
- Conversational interface (chat-style)
- Workflow comparison cards
- Time savings calculator
- "Why this workflow?" explanations

---

### Week 6: Step-by-Step Workflow Guide

#### Features
1. **Wizard Interface**
   - Show one step at a time
   - Progress indicator
   - Can skip/go back

2. **Step Details**
   - Tool recommendation with rationale
   - Optimized prompt (copy-to-clipboard)
   - Expected output description
   - Common pitfalls warning
   - "Why this matters" educational layer

3. **Learning Mode Toggle**
   - Fast mode: Just show prompts
   - Learning mode: Explain reasoning

4. **Progress Tracking**
   - Mark steps complete
   - Paste outputs back for review
   - Coach suggests refinements

#### UI Components
- Step wizard with progress bar
- Prompt display cards (syntax highlighted)
- Tool badges (ChatGPT, Gemini, etc.)
- Collapsible explanation sections
- Output review interface

---

### Week 7: Smart Prompt Refiner

#### Features
1. **Prompt Analysis**
   - User pastes their prompt
   - AI evaluates against PCTR framework
   - Scores each dimension (0-10)
   - Identifies missing elements

2. **Improvement Generation**
   - Generates improved version
   - Shows before/after comparison
   - Highlights what changed and why
   - Explains impact of each change

3. **Interactive Refinement**
   - User can accept/reject suggestions
   - Can iterate multiple times
   - Can save to personal library

4. **Learning Insights**
   - "Common mistakes in your prompts"
   - "You're getting better at X"
   - Pattern recognition over time

#### UI Components
- Prompt input textarea
- PCTR dimension scores (visual)
- Before/after diff view
- Improvement suggestions list
- Quality score meter

---

## 🎨 PHASE 4: UX POLISH & INTEGRATION (Week 8)

### Goal
Make the app cohesive and production-ready.

### Activities

#### 1. Navigation & Information Architecture
- [ ] Design unified navigation
- [ ] Role selector (pick your role)
- [ ] Workflow library browser
- [ ] Prompt library browser
- [ ] Search functionality

#### 2. Onboarding Flow
- [ ] Welcome screen
- [ ] Role selection
- [ ] Quick tutorial (5 min)
- [ ] Sample workflow walkthrough

#### 3. Help & Documentation
- [ ] Inline help text
- [ ] "How to use this" guides
- [ ] FAQ section
- [ ] Glossary (AI terms explained)

#### 4. Visual Design
- [ ] Consistent design system
- [ ] Role-based color coding
- [ ] Icon system
- [ ] Responsive layouts

### Deliverables
- Complete, polished UI
- Onboarding experience
- Help documentation
- Design system documentation

---

## 🧪 PHASE 5: TESTING & VALIDATION (Week 9)

### Goal
Validate with real users and iterate.

### Activities

#### 1. Internal Testing (Week 9, Days 1-3)
- [ ] Aditya tests all workflows
- [ ] Aditya tests with real work tasks
- [ ] Document bugs and UX issues
- [ ] Fix critical issues

#### 2. Beta Testing (Week 9, Days 4-5)
- [ ] 3-5 colleagues from different roles test
- [ ] Collect feedback survey
- [ ] Measure time savings
- [ ] Identify most/least used features

#### 3. Iteration (Week 9, Weekend)
- [ ] Fix top 10 issues
- [ ] Remove workflows that confused users
- [ ] Polish the most-used workflows
- [ ] Add missing prompts/steps

### Success Metrics
- 80%+ task completion rate (users finish workflows)
- 30%+ time savings (measured)
- 8/10+ usefulness rating
- Users would recommend to colleagues

---

## 🚀 PHASE 6: ADK DEMO & FUTURE ROADMAP (Week 10)

### Goal
Build one impressive multi-agent demo and document the future.

### Activities

#### 1. ADK Multi-Agent Demo
Pick ONE workflow to fully automate:
- **Competitive Intelligence Brief** (good showcase)
  - Research Agent (Perplexity via API)
  - Analysis Agent (Gemini 2.5 Pro)
  - Fact-Check Agent (Claude via API)
  - Summary Agent (Gemini 2.5 Flash)

Build as Python script using Google ADK:
```python
# competitive_intel_agent.py
from google_adk import SequentialAgent, LlmAgent

# Shows what's POSSIBLE, not what MVP does
```

#### 2. Documentation
- [ ] "How ADK Works" explainer
- [ ] "Future: MCP Integration" mockups
- [ ] "Future: Full Automation" roadmap
- [ ] Technical architecture diagrams

#### 3. Demo Materials
- [ ] Demo video (5 min)
- [ ] Slide deck explaining the app
- [ ] ROI calculator (time saved)
- [ ] Case study from beta testing

### Deliverables
- Working ADK demo (Python script)
- Demo video
- Presentation materials
- Technical documentation

---

## 📅 COMPLETE PROJECT TIMELINE

### Total Duration: 10 Weeks

```
PHASE 0: Research Foundation
├── Week 1: Primary Research (Jan 13-19)
│   └── Perplexity research, O*NET, LinkedIn, templates
└── Week 2: Synthesis (Jan 20-26)
    └── Role profiles, task taxonomies, validation

PHASE 1: Data Schema & Structure
└── Week 3: Schema Design (Jan 27 - Feb 2)
    └── TypeScript schemas, seed examples, documentation

PHASE 2: AI-Assisted Data Generation
└── Week 4: Data Expansion (Feb 3-9)
    └── Sub-agent generation, curation, quality control

PHASE 3: Core App Features
├── Week 5: Task Advisor (Feb 10-16)
│   └── Conversational intake, recommendations
├── Week 6: Workflow Guide (Feb 17-23)
│   └── Step wizard, prompts, learning mode
└── Week 7: Prompt Refiner (Feb 24 - Mar 2)
    └── Analysis, improvement, scoring

PHASE 4: UX Polish
└── Week 8: Integration (Mar 3-9)
    └── Navigation, onboarding, help, design

PHASE 5: Testing
└── Week 9: Validation (Mar 10-16)
    └── Internal test, beta test, iteration

PHASE 6: Demo & Roadmap
└── Week 10: ADK Demo (Mar 17-23)
    └── Multi-agent demo, documentation, materials
```

### Key Milestones
- **Week 2 Complete:** Research validated, ready to build
- **Week 4 Complete:** Full data library ready
- **Week 7 Complete:** All core features working
- **Week 9 Complete:** Tested and validated MVP
- **Week 10 Complete:** Demo-ready product

---

## 🎯 HIGH-LEVEL TASKS BY ROLE

### Your Tasks (Aditya)
**Research Phase:**
- Run Perplexity research query
- Review and validate role profiles
- Provide real work examples from AAA
- Test each workflow against reality

**Build Phase:**
- Test features as they're built
- Provide feedback on UX
- Write content for help sections
- Validate AI-generated data

**Testing Phase:**
- Complete 5+ workflows with real tasks
- Recruit 3-5 beta testers
- Collect feedback
- Measure time savings

**Demo Phase:**
- Create demo video
- Build presentation materials
- Prepare for AAA showcase

### My Tasks (Claude)
**Research Phase:**
- Structure research findings
- Create role profiles
- Build workflow catalog
- Document sources

**Build Phase:**
- Design data schemas
- Write TypeScript types
- Build React components
- Implement AI logic (Gemini integration)
- Create sub-agent instructions
- Generate and curate data

**Polish Phase:**
- Design UI/UX
- Write help documentation
- Build onboarding flow
- Create ADK demo

**Support Phase:**
- Debug issues
- Iterate based on feedback
- Optimize performance
- Document architecture

---

## 📊 SUCCESS METRICS

### Quantitative (Must Hit)
- **30%+ time savings** on measured tasks
- **8/10+ usefulness** rating from beta testers
- **80%+ completion rate** for workflows
- **50+ research sources** cited across content

### Qualitative (Nice to Have)
- "This actually helps me do my job better"
- "I learned something about prompting"
- "I'd pay for this"
- "I recommended this to a colleague"

### MVP vs Production Checklist
At the end of 10 weeks, we should have:
- ✅ Working prototype (runs locally or on Vercel)
- ✅ 3-4 roles deeply covered
- ✅ 30-40 validated workflows
- ✅ 100+ optimized prompts
- ✅ Research-backed content
- ✅ Tested by 5+ real users
- ✅ Demo-ready materials
- ❌ No user accounts (not needed for MVP)
- ❌ No backend database (JSON files are fine)
- ❌ No analytics (manual tracking is fine)
- ❌ No integrations (documented for future)

---

## 🔄 NEXT IMMEDIATE ACTIONS

### This Week (Week Starting Jan 13)
1. **Today:** Run the Perplexity research query (use the prompt I provided)
2. **Tomorrow:** Review research results, identify gaps
3. **Day 3-4:** Access O*NET database, collect LinkedIn job postings
4. **Day 5:** Compile findings into role profiles
5. **Weekend:** Validate profiles with real-world experience

### Next Week (Week Starting Jan 20)
1. Build complete workflow catalog
2. Extract seed examples from your resume
3. Create data schemas
4. Validate everything together

---

## 💬 DECISION POINTS

We'll need to decide:

**Week 2:** Which 3-4 roles to prioritize (based on research depth)

**Week 4:** How much AI-generated content to include (based on quality)

**Week 7:** Which features to keep/cut (based on time)

**Week 9:** Whether to do another iteration or ship MVP

---

## 📚 RESOURCES NEEDED

### Research Access
- Perplexity Pro account (for comprehensive research)
- O*NET Online (free, but need to register)
- LinkedIn (for job posting analysis)

### Development
- Google AI Studio (free tier is fine for MVP)
- Vercel account (free deployment)
- GitHub (version control)

### Testing
- 3-5 beta testers from different roles
- Time tracking tool (simple spreadsheet is fine)
- Feedback survey (Google Forms)

### Optional (Future)
- Google ADK Python environment
- Claude API key (for MCP demos)
- Analytics tool (Posthog free tier)

---

## 🎮 PROJECT PHILOSOPHY

### Build Principles
1. **Research-grounded > AI-generated speculation**
2. **Depth > Breadth** (3 roles done well > 10 done poorly)
3. **Real utility > Impressive demo** (must save actual time)
4. **Teach, don't automate** (build skills, not dependency)
5. **Ship, iterate, validate** (MVP → feedback → v2)

### Quality Bars
- Every workflow must cite research source
- Every prompt must score 7+ on PCTR
- Every feature must be tested with real task
- Every claim must be measurable

---

**END OF PROJECT PLAN**

*This is a living document. Update as we learn and iterate.*
