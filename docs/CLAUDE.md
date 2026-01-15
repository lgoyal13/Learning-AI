# CLAUDE.md - Project Instructions & Context

## Project Overview

**Project Name:** AI Coach / Enterprise AI Academy (MVP)
**Owner:** Aditya Goyal
**Started:** January 9, 2026
**Current Phase:** Research & Data Foundation

### Mission Statement
Build an intelligent AI coaching platform that helps non-technical business professionals use AI tools effectively in their daily work. The goal is to reduce "workslop" (wasted AI work with no ROI) by providing research-grounded, role-specific workflow guidance and optimized prompts.

### Core Problem Being Solved
Most professionals have access to AI tools (ChatGPT, Gemini, Claude) but:
- Don't know WHICH tool to use for WHICH task
- Don't know HOW to write effective prompts
- Get inconsistent, generic results
- Waste time on trial-and-error
- See no clear ROI from AI investments

### The Solution (MVP Scope)
An intelligent coach that:
1. **Recommends workflows** based on user's role and task
2. **Guides step-by-step** through proven AI-enhanced processes
3. **Provides optimized prompts** that actually work
4. **Teaches the "why"** so users build lasting skills

---

## Core Product Principles (North Star)

These principles guide ALL product decisions. Reference them when building features, designing UI, or making tradeoffs.

### The Recipe Book Problem
A library of workflows and prompts alone does NOT solve workslop. Users won't browse a library - they come with a problem and want help NOW. Static prompts become stale. Copy-paste without understanding creates dependency, not capability.

### What Actually Reduces Workslop
| Root Cause | Solution | Feature |
|------------|----------|---------|
| Wrong tool selection | Intelligent recommendation | Task Advisor |
| Bad prompts | Real-time feedback on YOUR prompts | Prompt Refiner |
| No mental model | Teaching the WHY, not just the what | PCTR framework |
| Inconsistent results | Proven templates as starting points | Workflow Library |

### The Hierarchy of Value
1. **Skill-building > Dependency** - Goal is users become 10x better at AI, not dependent on our prompts forever
2. **The "why" > the "what"** - PCTR breakdowns and explanations are more valuable than the prompts themselves
3. **Intelligence layer > static content** - Task Advisor and Prompt Refiner ARE the product; workflows are the fuel
4. **Meeting users where they are** - Entry point is their problem, not our library

### Feature Impact Ranking
| Feature | Impact | Role |
|---------|--------|------|
| Smart Prompt Refiner | HIGH | Meets users at their prompt, teaches skills |
| Intelligent Task Advisor | HIGH | Solves "where do I start?", contextual guidance |
| Workflow Library | MEDIUM | Data layer that powers intelligent features |

### The Moat
- **Weak:** "We have 50 workflow templates" (anyone can make prompts)
- **Strong:** "Deep role-specific expertise + intelligent guidance layer + skill-building focus"

### Design Principles
1. **Workflows are the textbook; the product is the tutor**
2. **Every prompt must teach WHY it works** (PCTR breakdown required)
3. **Include variations** so users learn to adapt, not just copy
4. **Add common mistakes** to build judgment
5. **Design for Task Advisor consumption** - workflows are recommendations, not just references

---

## About Aditya (Project Owner)

### Professional Background
**Current Role:** Strategic Analyst at AAA (American Automobile Association)
- Manages $27M retention initiatives
- Built OKR frameworks across divisions
- Created BigQuery pipelines saving 2,000+ hours
- Led AI pilot program with 100 employees (10% IRR)
- Reduced attrition by 31% through data-driven insights

**Key Skills:**
- Strategic planning and OKR development
- Data analysis (SQL, BigQuery, Tableau)
- Financial modeling and IRR calculations
- Executive reporting and board presentations
- Process optimization and automation
- Cross-functional stakeholder management

### Technical Background
- **Self-described:** "Non-technical background, learning to vibe code"
- **Experience:** Built this app in Google AI Studio
- **Languages:** Learning React/TypeScript through this project
- **Comfort level:** Can read code, needs guidance on architecture

### Work Style Preferences
1. **Likes video game analogies** - Use gaming metaphors to explain concepts
2. **Prefers plain English** - Avoid jargon, explain technical terms
3. **Values depth over breadth** - Would rather do 3 things well than 10 things poorly
4. **Research-grounded approach** - Wants validated frameworks, not AI-generated speculation
5. **Iterative thinker** - Prefers to build incrementally and test
6. **Quality-focused** - "Do it right" mindset (see resume achievements)

### Communication Preferences
- Break down complex concepts into digestible pieces
- Provide options when there are multiple paths forward
- Be honest about tradeoffs and limitations
- Use concrete examples from his work context (AAA, retention analysis, OKRs)
- Keep summaries concise, expand on request

---

## Project Decisions Made

### Scope Decisions (Confirmed)
- **Focus:** Product quality, NOT business/monetization (for now)
- **Depth:** 3-4 roles with 4-5 workflows each (vs. many roles with few workflows)
- **Data:** Research-grounded content, NOT pure AI-generated
- **Features:** Intelligent guidance, skill building, productivity boosters
- **NOT building:** Workflow automation, integrations, user accounts, backend database

### Priority Roles (In Order)
1. **Strategic Business Analyst / Business Operations** (Aditya's expertise)
2. **Financial Analyst / FP&A** (Adjacent to Aditya's skills)
3. **Marketing Manager** (High AI adoption potential)
4. *(Optional)* Operations Manager

### Core Features (MVP)
1. **Intelligent Task Advisor** - Conversational intake, workflow recommendations
2. **Step-by-Step Workflow Guide** - Wizard interface, prompts per step
3. **Smart Prompt Refiner** - Evaluate and improve user prompts

### Technical Stack
- **Frontend:** React 19 + TypeScript (existing)
- **Build:** Vite (existing)
- **Styling:** Tailwind CSS (existing)
- **AI:** Gemini 2.5 Flash/Pro via Google AI Studio
- **Data Storage:** JSON files (no database for MVP)
- **Deployment:** Vercel (free tier)

---

## Key Project Files

### Documentation
- `PROJECT_PLAN.md` - Complete 10-week development roadmap
- `RESEARCH_SOURCES.md` - All citations and references
- `CLAUDE.md` - This file (project context and instructions)

### Research
- `Context:Information/AI_Coaching_Platform_Complete_Research.md` - Perplexity research (1,100+ lines)
- `Context:Information/Aditya Goyal 26 Resume.pdf` - Aditya's background

### Data (To Be Created)
- `/data/roles/` - Role profiles (JSON)
- `/data/workflows/` - Workflow definitions (JSON)
- `/data/prompts/` - Prompt templates (JSON)

### Application Code
- `/app/` - Page components
- `/components/` - Shared UI components
- `/services/` - Gemini API integration
- `/lib/` - Utilities

---

## Current Project Status

### Completed (Phase 0, 1 & 2 Data Foundation)
- [x] Initial codebase assessment
- [x] Vision mapping and feature ideation
- [x] Research prompt created for Perplexity
- [x] Perplexity research completed (1,100+ lines)
- [x] 10-week project plan created
- [x] Research sources documented
- [x] Priority extraction approach decided
- [x] Core product principles defined and documented
- [x] TypeScript schemas created (RoleProfile, Workflow, PromptTemplate)
- [x] /data/ folder structure created

**Role Profiles (3 complete):**
- [x] Business Analyst role profile
- [x] FP&A / Financial Analyst role profile
- [x] Marketing Manager role profile

**Business Analyst Workflows (5 complete):**
- [x] Monthly Retention Analysis
- [x] OKR Framework Development
- [x] Competitive Intelligence Report
- [x] Monthly Business Review
- [x] Executive Dashboard Build

**FP&A Workflows (5 complete):**
- [x] Monthly Variance Analysis
- [x] Rolling 12-Month Forecast
- [x] Annual Budget Process
- [x] Board Financial Reporting
- [x] Investment ROI Analysis

**Marketing Workflows (5 complete):**
- [x] Campaign Planning & Launch
- [x] Weekly Marketing Performance Report
- [x] Content Strategy & Copywriting
- [x] Email Sequence Creation
- [x] Marketing Competitive Analysis

**Prompt Templates (10 complete):**
- [x] 4 for Retention Analysis workflow
- [x] 1 for OKR Framework
- [x] 1 for Competitive Intel
- [x] 1 for MBR
- [x] 1 for FP&A Variance
- [x] 1 for Campaign Messaging
- [x] 1 for additional coverage

### Summary Statistics
| Asset | Count |
|-------|-------|
| Role Profiles | 3 |
| Workflows | 15 |
| Prompt Templates | 10 |
| TypeScript Interfaces | 8 |

### Next Up (Phase 3 - Core Features)
- [ ] Build Intelligent Task Advisor UI component
- [ ] Build Step-by-Step Workflow Guide UI
- [ ] Build Smart Prompt Refiner UI
- [ ] Integrate workflows with Gemini API for recommendations
- [ ] Create more prompt templates as needed

---

## Working Guidelines for Claude

### Communication Style
1. **Use video game analogies** when explaining technical concepts
   - Example: "Think of the data schema like a character sheet in D&D"
   - Example: "This is like unlocking a new skill tree"

2. **Explain technical terms** in plain English
   - Bad: "We'll use a RESTful API with JSON serialization"
   - Good: "The app will talk to Gemini and get back structured data we can display"

3. **Be concise but thorough**
   - Lead with the key point
   - Offer to expand on details if needed
   - Use headers and bullet points for scanability

4. **Show, don't just tell**
   - Provide concrete examples
   - Include before/after comparisons
   - Use code snippets when relevant

### Decision-Making Framework
1. **Always present options** when there are multiple valid paths
2. **Recommend one option** with clear rationale
3. **Explain tradeoffs** honestly
4. **Let Aditya make final calls** on scope and direction
5. **Document decisions** in relevant files

### Quality Standards
1. **Research-grounded:** All workflows must cite sources
2. **Validated:** Test claims against Aditya's real experience
3. **Practical:** Focus on actual time savings, not theoretical benefits
4. **Honest:** Flag limitations and risks upfront

### Guardrails
1. **Don't over-engineer:** Keep solutions simple and focused
2. **Don't scope creep:** Stick to MVP unless Aditya requests expansion
3. **Don't assume technical knowledge:** Explain concepts as needed
4. **Don't rush:** Quality over speed
5. **Don't ignore context:** Reference Aditya's AAA experience when relevant
6. **Don't forget the mission:** Reduce workslop, teach real skills

### Task Management (Required)
**Always create a task list for any multi-step job using the TodoWrite tool.**
- Break down work into specific, trackable tasks before starting
- Mark tasks as in_progress when you begin them
- Mark tasks as completed immediately when done (don't batch)
- Keep only ONE task in_progress at a time
- This ensures progress visibility and prevents skipping steps

### When In Doubt
- Ask clarifying questions
- Present options with recommendations
- Reference this document or previous decisions
- Default to simpler solutions

---

## Project Timeline (Updated)

### Current: Week 1 (Jan 9-15, 2026)
**Phase 0: Research Foundation**
- [x] Run Perplexity research
- [ ] Extract priority workflows
- [ ] Create role profiles
- [ ] Validate with Aditya

### Week 2 (Jan 16-22)
**Phase 1: Data Schema & Structure**
- [ ] Design TypeScript schemas
- [ ] Create seed examples from Aditya's resume
- [ ] Build JSON data files

### Week 3 (Jan 23-29)
**Phase 2: AI-Assisted Data Expansion**
- [ ] Create sub-agent instructions
- [ ] Generate workflow variations
- [ ] Curate and validate content

### Weeks 4-6 (Jan 30 - Feb 19)
**Phase 3: Core App Features**
- [ ] Build Intelligent Task Advisor
- [ ] Build Step-by-Step Workflow Guide
- [ ] Build Smart Prompt Refiner

### Week 7 (Feb 20-26)
**Phase 4: UX Polish**
- [ ] Navigation and information architecture
- [ ] Onboarding flow
- [ ] Help documentation

### Week 8 (Feb 27 - Mar 5)
**Phase 5: Testing & Validation**
- [ ] Internal testing
- [ ] Beta testing with 3-5 users
- [ ] Iteration based on feedback

### Week 9 (Mar 6-12)
**Phase 6: Demo & Documentation**
- [ ] ADK multi-agent demo (optional)
- [ ] Demo materials
- [ ] Technical documentation

---

## Success Metrics

### MVP Success Criteria
- [ ] 3 roles deeply covered with 4-5 workflows each
- [ ] All content traceable to research sources
- [ ] 30%+ time savings validated on real tasks
- [ ] 5+ beta users can complete workflows without help
- [ ] Aditya would actually use this at work

### Quality Bars
- Every workflow must cite research source
- Every prompt must score 7+ on PCTR framework
- Time savings must be realistic (no inflated claims)
- UI must be intuitive for non-technical users

---

## Useful Context

### PCTR Framework (Prompt Quality)
- **P**ersona: Who should the AI act as?
- **C**ontext: What background info does it need?
- **T**ask: What specifically should it do?
- **R**equirements: Format, constraints, quality criteria

### Key Research Findings
- Business professionals waste 40-50% of time on repetitive tasks
- AI can reduce this by 40-67% with proper workflows
- Most professionals don't know which AI tool to use for which task
- Role-specific guidance is more valuable than generic tips

### Aditya's Real Workflows (From Resume)
- Monthly retention/attrition reporting
- OKR framework development
- Executive dashboard building
- Financial modeling (IRR calculations)
- Vendor partnership evaluations
- Board reporting preparation

---

## Commands & Conventions

### File Naming
- Use kebab-case for files: `monthly-business-review.json`
- Use PascalCase for components: `WorkflowGuide.tsx`
- Use camelCase for variables: `workflowData`

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Tailwind for styling
- JSON for data storage

### Git Workflow
- Commit messages: `feat: Add workflow advisor component`
- Co-author line: `Co-Authored-By: Claude <noreply@anthropic.com>`

---

## Quick Reference

### Priority Roles
1. Strategic Business Analyst
2. FP&A / Financial Analyst
3. Marketing Manager

### Priority Workflows (To Be Finalized)
See workflow extraction below...

### Key Files to Reference
- Research: `Context:Information/AI_Coaching_Platform_Complete_Research.md`
- Plan: `PROJECT_PLAN.md`
- Sources: `RESEARCH_SOURCES.md`

---

*Last Updated: January 9, 2026*
*Next Update: After workflow extraction and Aditya's review*
