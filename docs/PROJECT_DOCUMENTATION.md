# AI Coach / Enterprise AI Academy - Comprehensive Project Documentation

**Last Updated:** January 11, 2026
**Document Version:** 1.0
**Status:** Active Development (Phase 3)

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Target Users](#target-users)
3. [Tech Stack](#tech-stack)
4. [Features - Complete List](#features---complete-list)
5. [Current State](#current-state)
6. [Data Architecture](#data-architecture)
7. [File Structure](#file-structure)
8. [How to Run](#how-to-run)
9. [Future Roadmap](#future-roadmap)

---

## Project Overview

### What Is This?
An intelligent AI coaching platform that helps non-technical business professionals use AI tools (ChatGPT, Claude, Gemini) effectively in their daily work.

### The Problem It Solves
Most professionals have access to AI tools but:
- Don't know **which** tool to use for **which** task
- Don't know **how** to write effective prompts
- Get inconsistent, generic results
- Waste time on trial-and-error ("workslop")
- See no clear ROI from AI investments

### The Solution
An intelligent coach that:
1. **Recommends workflows** based on user's role and task
2. **Guides step-by-step** through proven AI-enhanced processes
3. **Provides optimized prompts** with copy-to-clipboard functionality
4. **Teaches the "why"** using the PCTR framework so users build lasting skills

### Core Philosophy
> "Workflows are the textbook; the product is the tutor."

The goal is **skill-building over dependency** - users should become 10x better at AI, not dependent on our prompts forever.

---

## Target Users

### Primary Persona
**Non-technical business professionals** who:
- Have access to AI tools but struggle to use them effectively
- Work in analytical, financial, or marketing roles
- Need to produce reports, analyses, and communications regularly
- Want to save time on repetitive tasks

### Supported Roles (Currently Built)

| Role | ID | Workflows | Description |
|------|-----|-----------|-------------|
| **Strategic Business Analyst** | `business-analyst` | 5 | Data analysis, executive reporting, OKRs, competitive intel |
| **FP&A / Financial Analyst** | `finance-analyst` | 5 | Variance analysis, forecasting, budgets, board reporting |
| **Marketing Manager** | `marketing-manager` | 5 | Campaign planning, content strategy, email sequences |

### Who Built This
**Owner:** Aditya Goyal
- Strategic Analyst at AAA (American Automobile Association)
- Manages $27M retention initiatives
- Led AI pilot program with 100 employees
- Built this to solve real pain points from his work experience

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework |
| **TypeScript** | ~5.8.2 | Type safety |
| **Vite** | 6.2.0 | Build tool & dev server |
| **Lucide React** | 0.554.0 | Icon library |

### AI Integration
| Technology | Details |
|------------|---------|
| **Gemini API** | `@google/genai` v1.30.0 |
| **Model** | `gemini-2.5-flash` |
| **Integration** | Direct API calls with structured JSON output |
| **API Key** | Via environment variable `process.env.API_KEY` |

### Styling
- **Tailwind CSS** (utility classes, no external CSS files)
- Custom component library (`components/ui.tsx`)
- Responsive design (mobile + desktop)

### State Management
- **React useState/useEffect** (no external state library)
- **Custom Router Context** (`lib/routerContext.tsx`) - simulates Next.js-style routing
- **localStorage** for user preferences (e.g., learning mode toggle)

### Data Storage
- **JSON files** for workflows, roles, and prompt templates
- **No database** (MVP decision - static data is sufficient)
- Data loaded via `lib/workflowLoader.ts`

### Testing
| Technology | Purpose |
|------------|---------|
| **Vitest** | 4.0.16 | Test runner |
| **Testing Library/React** | 16.3.1 | React component testing |
| **jsdom** | 27.4.0 | DOM simulation |

### Hosting/Deployment
- **Current:** Local development only (`npm run dev`)
- **Planned:** Vercel (free tier)
- **No backend server** - fully client-side app

---

## Features - Complete List

### A. Core AI-Powered Features (Phase 3 - Built)

#### 1. Workflow Advisor (`/workflows`)
**Status:** ✅ Fully Implemented

**What it does:**
- User describes their task in natural language
- Gemini AI analyzes the request and recommends the best matching workflow
- Returns customization suggestions (add steps, modify steps, skip steps, tips)
- Shows confidence score and alternative workflows

**How it works:**
1. User inputs task description (e.g., "I need to prepare a retention report for my VP")
2. Optionally filters by role
3. Clicks "Find My Workflow"
4. Gemini compares against all 15 workflows and returns structured recommendation
5. User can start the recommended workflow directly

**AI Integration:** `recommendWorkflow()` in `services/geminiService.ts`
- Structured JSON output with schema validation
- Fallback keyword matching if API fails

---

#### 2. Step-by-Step Workflow Guide (`/workflows/[workflow-id]`)
**Status:** ✅ Fully Implemented

**What it does:**
- Wizard-style interface walking through each AI-enhanced step
- Shows optimized prompts with copy-to-clipboard
- Learning Mode toggle (detailed explanations vs. fast mode)
- PCTR breakdown for each prompt explaining WHY it works
- Time estimates and expected outputs per step

**Key UI Elements:**
- Progress bar and step dots
- Tool badges (ChatGPT, Claude, Gemini, Perplexity)
- Collapsible educational sections
- Common mistakes warnings
- Prompt variations

**Learning Mode Features:**
- PCTR framework breakdown (Persona, Context, Task, Requirements)
- Common mistakes for each prompt
- Prompt variations for different scenarios
- "Why this workflow matters" context

---

#### 3. Smart Prompt Refiner (`/prompt-refiner`)
**Status:** ✅ Fully Implemented

**What it does:**
- User pastes their own prompt
- Gemini evaluates it against the PCTR framework
- Returns ratings (Strong/Okay/Missing) for each dimension
- Generates an improved version of the prompt
- Provides a "Pro Tip" for future improvement

**How it works:**
1. User pastes their prompt
2. Optionally adds scenario context
3. Clicks "Evaluate Prompt"
4. Shows side-by-side before/after comparison
5. Teaches transferable prompting skills

**AI Integration:** `evaluatePrompt()` in `services/geminiService.ts`

---

#### 4. Simple Prompt Generator (`/generator`)
**Status:** ✅ Fully Implemented

**What it does:**
- Simple 3-question wizard to generate an expert prompt
- Questions: What do you want to create? Who's the audience? What's the goal?
- Generates ready-to-use prompt with PCTR breakdown
- Tool recommendation if user selects "Not sure"

**How it works:**
1. **Phase 1 (Input):** User describes task or picks example
2. **Phase 2 (Questions):** Audience, Goal, and Tool selection
3. **Phase 3 (Output):** Generated prompt with copy button + "Open in [Tool]" button

**AI Integration:** `generateSimplePrompt()` in `services/geminiService.ts`

---

### B. Learning Modules (Educational Content)

#### 5. Learning Path Hub (`/modules`)
**Status:** ✅ Implemented

Shows 4 learning modules with progress indicators:
1. AI Fundamentals (15 min) - unlocked
2. Prompt Engineering 101 (20 min) - unlocked
3. Ethics & Responsible Use (10 min) - unlocked
4. Business Workflows (25 min) - locked (future)

---

#### 6. AI Fundamentals Module (`/modules/fundamentals`)
**Status:** ✅ Implemented

Content covers:
- What is an LLM and how it works
- Understanding "hallucinations"
- The "smart intern" analogy
- Human-in-the-loop principles

---

#### 7. Prompting Foundations Module (`/modules/prompting`)
**Status:** ✅ Fully Implemented (most complete module)

**Sections:**
1. **The PCTR Pattern** - Framework for structuring prompts
2. **Talk Like You Are Delegating** - Weak vs. strong prompts comparison
3. **Make Iteration Your Default** - Interactive chat simulator demo
4. **Fixing Errors** - "Repair Kit" with copyable correction phrases
5. **Core Techniques** - Zero-shot, Few-shot, Step-by-step prompting

**Interactive Elements:**
- Chat simulator showing iteration process
- Copyable phrase bank
- Collapsible examples section

---

#### 8. Ethics & Responsible Use Module (`/modules/responsible-use`)
**Status:** ✅ Implemented

Content covers:
- PII (Personally Identifiable Information) protection
- What not to share with AI
- Data anonymization techniques
- Human oversight requirements

---

#### 9. AI Tools Modules
**Status:** ✅ Implemented

- **Tools Overview** (`/modules/tools-overview`) - Hub page for tool comparisons
- **Tool: Research** (`/modules/tool-research`) - Deep dive on Perplexity
- **Tool: Documents** (`/modules/tool-documents`) - Deep dive on NotebookLM
- **Tool: Builder** (`/modules/tool-builder`) - Deep dive on code assistants

---

### C. Quick Start & Onboarding

#### 10. Quick Start Wizard (`/quick-start`)
**Status:** ✅ Fully Implemented

4-step interactive wizard:
1. **What is Enterprise AI?** - Intro concept ("AI as smart intern")
2. **Safety First** - PII protection rules with do/don't examples
3. **Task 1: Taming the Mess** - Interactive summarization demo
4. **Task 2: The Difficult Email** - Interactive drafting demo

Simulated AI responses (no actual API call - hardcoded for demo speed)

---

### D. Reference Materials

#### 11. Reference Guide Hub (`/reference`)
**Status:** ✅ Implemented

Links to:
- Policy Quick View
- Prompting Guide
- Resources

---

#### 12. Prompting Guide (`/reference/prompting-guide`)
**Status:** ✅ Implemented

Reference page with:
- PCTR framework cheat sheet
- Prompt templates by category
- Best practices

---

#### 13. Policy Quick View (`/reference/policy-quick-view`)
**Status:** ✅ Implemented

Quick reference for:
- Data handling policies
- Approved tools list
- Do/don't examples

---

### E. Navigation & Layout

#### 14. App Layout
**Status:** ✅ Implemented

- **Desktop:** Sidebar navigation (Dashboard, Quick Start, Learning Modules, Reference Guide)
- **Mobile:** Hamburger menu with overlay
- Status indicator ("System Operational")
- Responsive design

---

## Current State

### What's Working (Fully Functional)

| Feature | Route | Status |
|---------|-------|--------|
| Home Dashboard | `/` | ✅ |
| Quick Start Wizard | `/quick-start` | ✅ |
| Prompt Generator | `/generator` | ✅ |
| Prompt Refiner | `/prompt-refiner` | ✅ |
| Workflow Advisor | `/workflows` | ✅ |
| Workflow Step Guide | `/workflows/[id]` | ✅ |
| Learning Modules (4) | `/modules/*` | ✅ |
| AI Tools Modules (4) | `/modules/tool-*` | ✅ |
| Reference Pages | `/reference/*` | ✅ |
| Mobile Responsive | All routes | ✅ |

### What's Not Built Yet

| Feature | Description | Phase |
|---------|-------------|-------|
| User Accounts | Login, profiles, progress tracking | Post-MVP |
| Backend Database | Persistent data storage | Post-MVP |
| Analytics | Usage tracking, engagement metrics | Post-MVP |
| API Integrations | Direct ChatGPT/Claude connections | Post-MVP |
| Workflow Automation | Execute workflows automatically | Post-MVP |
| ADK Multi-Agent Demo | Google ADK Python demo | Phase 6 |

### Data Status

| Data Type | Count | Status |
|-----------|-------|--------|
| Role Profiles | 3 | ✅ Complete |
| Workflows | 15 | ✅ Complete |
| Prompt Templates | 10 | ✅ Complete (more can be added) |
| TypeScript Schemas | 8+ interfaces | ✅ Complete |

---

## Data Architecture

### Schema Overview (`data/schemas/types.ts`)

```typescript
// Core types
type AITool = 'chatgpt' | 'claude' | 'gemini' | 'perplexity' | 'notebooklm';
type WorkflowCategory = 'analysis' | 'reporting' | 'planning' | 'research' | 'communication';
type Frequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'ad-hoc';
type Complexity = 'beginner' | 'intermediate' | 'advanced';

// Main interfaces
interface RoleProfile { ... }      // Business role definition
interface Workflow { ... }         // Complete workflow with before/after processes
interface PromptTemplate { ... }   // Reusable prompt with PCTR breakdown
interface TaskCategory { ... }     // For Task Advisor matching
```

### Data Relationships

```
RoleProfile (1) ─────────> (many) Workflow
     │
     └── workflowIds[]

Workflow (1) ─────────> (many) PromptTemplate
     │
     └── promptIds[]

Workflow contains:
  - currentProcess[] (manual steps - before AI)
  - aiProcess[] (AI-enhanced steps - with AI)
```

### Sample Workflow Structure

Each workflow includes:
- **Before AI:** 6-8 manual steps with time estimates and pain points
- **After AI:** 4-6 AI-enhanced steps with tool recommendations
- **Time Savings:** Calculated automatically (typically 40-65% reduction)
- **Prompt References:** Links to specific prompt templates per step

---

## File Structure

```
Learning AI Academy/
├── App.tsx                    # Main router and page switching
├── index.tsx                  # React entry point
├── types.ts                   # Shared TypeScript types
│
├── app/                       # Page components (route-based)
│   ├── page.tsx              # Home dashboard
│   ├── quick-start/page.tsx
│   ├── generator/page.tsx    # Simple prompt generator
│   ├── prompt-refiner/page.tsx
│   ├── workflows/page.tsx    # Workflow advisor
│   ├── modules/              # Learning modules
│   │   ├── page.tsx          # Module list
│   │   ├── fundamentals/page.tsx
│   │   ├── prompting/page.tsx
│   │   ├── responsible-use/page.tsx
│   │   ├── workflow/page.tsx
│   │   ├── tools-overview/page.tsx
│   │   ├── tool-research/page.tsx
│   │   ├── tool-documents/page.tsx
│   │   └── tool-builder/page.tsx
│   └── reference/
│       ├── page.tsx
│       ├── prompting-guide/page.tsx
│       └── policy-quick-view/page.tsx
│
├── components/               # Shared UI components
│   ├── Layout.tsx           # App shell with sidebar
│   ├── ui.tsx               # Design system (Button, Card, Badge, etc.)
│   ├── Modules.tsx          # Module list component
│   ├── ModuleLayout.tsx     # Module page wrapper
│   ├── PromptRefiner.tsx    # Prompt evaluation component
│   ├── WorkflowGuide.tsx    # Step-by-step workflow wizard
│   ├── QuickStartWizard.tsx # Onboarding wizard
│   └── Playground.tsx       # (Empty - placeholder)
│
├── services/
│   └── geminiService.ts     # All Gemini API integrations
│
├── lib/
│   ├── routerContext.tsx    # Custom router (simulates Next.js)
│   └── workflowLoader.ts    # Data loading utilities
│
├── data/                    # JSON data files
│   ├── schemas/
│   │   └── types.ts         # TypeScript interfaces
│   ├── roles/
│   │   ├── business-analyst.json
│   │   ├── finance-analyst.json
│   │   └── marketing-manager.json
│   ├── workflows/
│   │   ├── monthly-retention-analysis.json
│   │   ├── okr-framework-development.json
│   │   ├── competitive-intelligence-report.json
│   │   ├── monthly-business-review.json
│   │   ├── executive-dashboard-build.json
│   │   ├── monthly-variance-analysis.json
│   │   ├── rolling-forecast-build.json
│   │   ├── annual-budget-process.json
│   │   ├── board-financial-reporting.json
│   │   ├── investment-roi-analysis.json
│   │   ├── campaign-planning-launch.json
│   │   ├── weekly-marketing-reporting.json
│   │   ├── content-strategy-copywriting.json
│   │   ├── email-sequence-creation.json
│   │   └── marketing-competitive-analysis.json
│   └── prompts/
│       ├── retention-data-consolidation.json
│       ├── retention-variance-analysis.json
│       ├── retention-root-cause-analysis.json
│       ├── retention-report-draft.json
│       ├── okr-framework-generation.json
│       ├── competitive-research-query.json
│       ├── mbr-insight-generation.json
│       ├── fpa-variance-commentary.json
│       └── campaign-messaging-development.json
│
├── tests/                   # Test files
├── Context:Information/     # Research docs (not in git)
├── CLAUDE.md               # Project instructions for Claude
├── PROJECT_PLAN.md         # 10-week development roadmap
└── PROJECT_DOCUMENTATION.md # This file
```

---

## How to Run

### Prerequisites
- Node.js 18+
- npm
- Google AI Studio API key

### Setup
```bash
# Install dependencies
npm install

# Set environment variable
export API_KEY="your-gemini-api-key"

# Start development server
npm run dev
```

### Available Commands
```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run preview  # Preview production build
npm run test     # Run tests
npm run test:watch # Run tests in watch mode
```

### Accessing the App
- Local: http://localhost:5173 (or whatever Vite assigns)

---

## Future Roadmap

### Phase 4: UX Polish (Planned)
- [ ] Navigation improvements
- [ ] Onboarding flow refinement
- [ ] Help documentation
- [ ] Visual design polish

### Phase 5: Testing & Validation (Planned)
- [ ] Internal testing with real tasks
- [ ] Beta testing with 3-5 users
- [ ] Iteration based on feedback
- [ ] Time savings measurement

### Phase 6: Demo & Documentation (Planned)
- [ ] ADK multi-agent demo (Python)
- [ ] Demo video
- [ ] Presentation materials
- [ ] Technical documentation

### Post-MVP Considerations
- User accounts and progress tracking
- Backend API and database
- Analytics integration
- Additional roles and workflows
- Direct AI tool integrations

---

## Key Metrics (Target)

| Metric | Target |
|--------|--------|
| Time savings | 30%+ on measured tasks |
| Usefulness rating | 8/10+ from beta testers |
| Workflow completion rate | 80%+ |
| Research sources | 50+ cited |
| Roles covered | 3-4 deep |
| Workflows per role | 4-5 |
| Prompt templates | 10+ per role |

---

## Contact & Resources

- **Project Owner:** Aditya Goyal
- **AI Assistant:** Claude (Anthropic)
- **Documentation:** This file + CLAUDE.md + PROJECT_PLAN.md
- **Research:** `Context:Information/AI_Coaching_Platform_Complete_Research.md`

---

*This documentation reflects the project state as of January 11, 2026. Update as the project evolves.*
