# Product Requirements Document: Task Planner & Quick Prompt

**Version:** 1.0  
**Date:** January 14, 2026  
**Author:** Aditya Goyal  
**Status:** Ready for Implementation

---

## Executive Summary

This PRD defines the redesign of the AI Learning Academy's prompt generation tools into two complementary experiences: **Quick Prompt** (fast, focused prompt generation) and **Task Planner** (consultant-style task planning). The goal is to help non-technical professionals figure out the best path to complete their work tasks and give them the resources (prompts, plans, guidance) to execute.

### Core Philosophy

- **Minimum viable path first** — Always start with the simplest approach that gets the user to DONE
- **Skill-building, not dependency** — Teach users WHY things work, not just give them outputs
- **AI is a tool, not the answer** — Be honest about when AI helps and when it doesn't, but never discourage AI use
- **Consultant, not form** — Feel like talking to a smart colleague, not filling out a survey

---

## Product Structure

### Two Tools with Smart Bridging

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AI LEARNING ACADEMY                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────────────┐       ┌─────────────────────┐            │
│   │  ⚡ QUICK PROMPT    │       │  💬 TASK PLANNER    │            │
│   │                     │       │                     │            │
│   │  "I know what I     │       │  "Help me think     │            │
│   │   need - just give  │ ←───→ │   through how to    │            │
│   │   me a good prompt" │       │   accomplish this"  │            │
│   │                     │       │                     │            │
│   │  Fast, 2-3 questions│       │  Consultant-style   │            │
│   │  Single prompt out  │       │  Plan output        │            │
│   └─────────────────────┘       └─────────────────────┘            │
│              ↑                            ↑                         │
│              └────── Smart Bridges ───────┘                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Smart Bridges:**
- Quick Prompt → Task Planner: "This seems like a bigger task. Want help planning it?"
- Task Planner → Quick Prompt: "This is simple — here's your prompt, no plan needed."

---

## Tool 1: Quick Prompt

### Purpose

For users who know what they need and just want a well-crafted prompt fast.

### User Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         QUICK PROMPT FLOW                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [User enters task description]                                     │
│                    │                                                 │
│                    ▼                                                 │
│   [AI asks 2-3 quick questions via chips]                           │
│      • Who's the audience?                                          │
│      • What's the goal?                                              │
│      • Which AI tool are you using?                                  │
│                    │                                                 │
│                    ▼                                                 │
│   [Complexity check - silent, in background]                        │
│                    │                                                 │
│           ┌───────┴───────┐                                         │
│           │               │                                          │
│        SIMPLE          COMPLEX                                       │
│           │               │                                          │
│           ▼               ▼                                          │
│   [Generate prompt]   [Generate prompt]                              │
│                       [Surface bridge:                               │
│                        "This looks like a multi-step                 │
│                        task. Want help planning?"]                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Prompt Output Format

All prompts must follow this structure and be well-formatted with markdown:

```
┌─────────────────────────────────────────────────────────────────────┐
│ YOUR PROMPT                                               [Copy]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ **ROLE**                                                            │
│ Senior Financial Analyst                                            │
│                                                                      │
│ **CONTEXT**                                                         │
│ - I have 12 monthly financial review documents                      │
│ - Creating an annual summary for my VP                              │
│ - Tone should be professional but accessible                        │
│                                                                      │
│ **TASK**                                                            │
│ Analyze the following monthly reports and extract:                  │
│ • Top 5 revenue trends                                              │
│ • Key KPI movements                                                 │
│ • Notable anomalies worth discussing                                │
│                                                                      │
│ **FORMAT**                                                          │
│ Bullet points grouped by category, 2-3 sentences each               │
│                                                                      │
│ **INPUT**                                                           │
│ [INSERT: Paste your monthly report data here]                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

💡 WHY THIS PROMPT WORKS
   [Collapsed by default - expandable]
   
   • Role: Gives AI expertise lens for financial analysis
   • Context: Grounds the task in your specific situation  
   • Task: Specific extractions, not vague "summarize"
   • Format: You'll get structured output you can use
```

### Prompt Quality Rules

1. **Scannable** — Use headers, bullets, whitespace
2. **Specific** — "Extract top 5 trends" not "summarize"
3. **Bounded** — Clear scope, not open-ended
4. **Actionable output** — Specify format user can actually use
5. **[INSERT] markers** — Make gaps explicit with clear descriptions

### Complexity Detection Signals

Quick Prompt watches for these signals and surfaces the bridge to Task Planner:

| Signal | Example | Action |
|--------|---------|--------|
| Multiple deliverables | "report AND presentation", "doc AND slides" | Surface bridge |
| Source document processing | "from these 12 docs", "synthesize", "consolidate" | Surface bridge |
| Sequential dependency | "first X, then Y", "after I do X" | Surface bridge |
| Unclear path | User seems unsure, vague task description | Surface bridge |

### Bridge to Task Planner UI

When complexity is detected:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 💬 THIS LOOKS LIKE A BIGGER TASK                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ You mentioned creating both a report and presentation from source   │
│ documents. A single prompt might not give you the best results.     │
│                                                                      │
│ Want me to help you plan the full approach?                         │
│                                                                      │
│ [Build me a plan]                      [Just give me the prompt]    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tool 2: Task Planner

### Purpose

For users who have a task but aren't sure of the best approach. Helps them think through how to accomplish it and gives them a concrete plan they can execute or share with their team.

### Entry Point UI

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  💬 TASK PLANNER                                                    │
│                                                                      │
│  Tell me what you're trying to accomplish, and I'll help you        │
│  figure out the best way to get it done.                            │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ I need to create an annual financial report and             │   │
│  │ presentation from 12 monthly reviews for my VP...           │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  [Let's plan this →]                                                │
│                                                                      │
│  💡 Examples:                                                       │
│  • "Prepare a board presentation from Q4 data"                      │
│  • "Write a project proposal for a new initiative"                  │
│  • "Create a competitive analysis for my team"                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Conversation Flow

#### Phase 1: Reflect Understanding

AI immediately shows what it understood from the user's input:

```
┌─────────────────────────────────────────────────────────────────────┐
│ HERE'S WHAT I'M HEARING                                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ 📊 WHAT YOU'RE CREATING                                             │
│    Annual report + Executive presentation                           │
│                                                                      │
│ 📄 WHAT YOU HAVE                                                    │
│    12 monthly financial reviews                                     │
│                                                                      │
│ 👥 AUDIENCE                                                         │
│    VP (and larger team?)                                            │
│                                                                      │
│ ⏰ TIMELINE                                                         │
│    Not specified                                                    │
│                                                                      │
│ [Got it right]                              [Let me clarify...]     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Phase 2: Targeted Questions (Maximum 2)

Only ask what's truly needed to generate a good plan:

```
┌─────────────────────────────────────────────────────────────────────┐
│ A COUPLE THINGS THAT'LL HELP ME BUILD YOUR PLAN                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ 1. WHAT'S THE MAIN MESSAGE?                                        │
│    What story do you want this to tell?                            │
│                                                                      │
│    [Growth/wins]  [Challenges ahead]  [Turnaround]                  │
│    [Year in review]  [Other...]                                     │
│                                                                      │
│ 2. HOW POLISHED DOES IT NEED TO BE?                                │
│                                                                      │
│    [Internal/casual]  [Executive-ready]  [Board-level]              │
│                                                                      │
│                                              [Build my plan]        │
└─────────────────────────────────────────────────────────────────────┘
```

**Question Rules:**
- Maximum 2 questions before generating
- Questions are dynamic — only ask what's not already known
- Provide chip options + freeform "Other..." option
- Questions should build on what user already said

#### Phase 3: Plan Generation

AI assesses complexity and generates appropriately sized plan.

---

### Plan Output Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│ YOUR GAME PLAN                                                      │
│ Annual Financial Report + Presentation                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ⏱️ Total time: ~3-4 hours  |  📋 Steps: 4                          │
│                                                                      │
│ ═══════════════════════════════════════════════════════════════════ │
│                                                                      │
│ STEP 1                                                              │
│ Extract key data from monthly reports                               │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                      │
│ 👤 WHO: You + AI                                                    │
│ ⏱️ TIME: 30-45 min                                                  │
│ 🛠️ TOOL: Claude or ChatGPT                                          │
│                                                                      │
│ Go through your 12 monthly reports and pull out:                    │
│ • Revenue figures (monthly + quarterly totals)                      │
│ • Key KPIs that moved significantly                                 │
│ • Notable events or anomalies                                       │
│                                                                      │
│ [📝 Get prompt]  [💡 Why this step]  [🤔 Help me think]            │
│                                                                      │
│ ═══════════════════════════════════════════════════════════════════ │
│                                                                      │
│ STEP 2                                                              │
│ Identify the narrative arc                                          │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                      │
│ 👤 WHO: You (recommended)                                           │
│ ⏱️ TIME: 30 min                                                     │
│ 🛠️ TOOL: Your brain + maybe a whiteboard                            │
│                                                                      │
│ Before writing anything, decide: What's the story?                  │
│ • What was the year's theme?                                        │
│ • What were the 2-3 biggest wins?                                   │
│ • What challenges did you overcome?                                 │
│ • What's the setup for next year?                                   │
│                                                                      │
│ This step is YOU because you know the context, the politics,        │
│ and what actually mattered — better than AI could infer.            │
│                                                                      │
│ [📝 Get prompt anyway]  [💡 Why this step]  [🤔 Help me think]     │
│                                                                      │
│ ═══════════════════════════════════════════════════════════════════ │
│                                                                      │
│ STEP 3                                                              │
│ Draft the report                                                    │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                      │
│ 👤 WHO: You + AI                                                    │
│ ⏱️ TIME: 45-60 min                                                  │
│ 🛠️ TOOL: Claude (recommended for long-form)                         │
│                                                                      │
│ Using your data (Step 1) and narrative (Step 2), draft the          │
│ annual report with these sections:                                  │
│ • Executive Summary                                                 │
│ • Year in Numbers                                                   │
│ • Key Accomplishments                                               │
│ • Challenges & Lessons                                              │
│ • Looking Ahead                                                     │
│                                                                      │
│ [📝 Get prompt]  [💡 Why this step]  [🤔 Help me think]            │
│                                                                      │
│ ═══════════════════════════════════════════════════════════════════ │
│                                                                      │
│ STEP 4                                                              │
│ Create the presentation                                             │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                      │
│ 👤 WHO: You + AI                                                    │
│ ⏱️ TIME: 30-45 min                                                  │
│ 🛠️ TOOL: ChatGPT or Claude                                          │
│                                                                      │
│ Transform your report into a focused 8-10 slide deck:               │
│ • Title slide                                                       │
│ • Year at a Glance (key metrics)                                    │
│ • 3-4 slides on major wins                                          │
│ • Lessons learned slide                                             │
│ • Looking ahead slide                                               │
│ • Q&A slide                                                         │
│                                                                      │
│ [📝 Get prompt]  [💡 Why this step]  [🤔 Help me think]            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Step Components

Each step contains these elements:

#### Always Visible

| Element | Description |
|---------|-------------|
| Step number & title | Clear, action-oriented |
| Who | `You` / `You + AI` / `AI` |
| Time estimate | Realistic range |
| Tool recommendation | Which AI tool (or "your brain") |
| Description | 2-4 sentences on what to do, with bullet points if helpful |

#### Expandable (Collapsed by Default)

| Button | Action | Content |
|--------|--------|---------|
| 📝 Get prompt | Expands prompt section | Full PCTR-formatted prompt |
| 📝 Get prompt anyway | For "You" steps | Prompt with caveat about human judgment |
| 💡 Why this step | Expands rationale | 1-2 sentences on why this matters |
| 🤔 Help me think | Opens thinking assistant | Mini-conversation to flesh out this step |

---

### The "Help Me Think" Feature

For ANY step (including "You" steps), user can click to get thinking assistance:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 🤔 LET'S THINK THROUGH STEP 2                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ You're identifying the narrative arc — the story you want to tell. │
│ Let me help you think through this.                                 │
│                                                                      │
│ A few questions to consider:                                        │
│                                                                      │
│ • If your VP could only remember ONE thing from this presentation, │
│   what should it be?                                                │
│                                                                      │
│ • What was the biggest surprise of the year — good or bad?         │
│                                                                      │
│ • Is there anything you're nervous about presenting?               │
│   (That's often where the real story is)                            │
│                                                                      │
│ ┌─────────────────────────────────────────────────────────────┐    │
│ │ Type your thoughts...                                        │    │
│ └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│ [Help me brainstorm]                            [I've got it now]   │
└─────────────────────────────────────────────────────────────────────┘
```

**Possible Outcomes:**
- Refined ideas user can use themselves
- A prompt they can use with AI if they want
- An updated step with their context baked in

**Key Principle:** This ensures we never discourage AI use — even "You" steps have an AI assist path.

---

### "Get Prompt Anyway" for Human Steps

For steps marked as "You (recommended)", the prompt includes a caveat:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 📝 PROMPT FOR STEP 2                                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ⚠️ A NOTE FIRST                                                     │
│ We suggested doing this step yourself because you have context      │
│ AI doesn't. But if you want AI's help as a starting point,          │
│ here's a prompt — just know you'll want to heavily edit the output. │
│                                                                      │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                      │
│ **ROLE**                                                            │
│ Strategic communications advisor                                    │
│                                                                      │
│ **CONTEXT**                                                         │
│ - I'm preparing an annual financial presentation for my VP          │
│ - I have data extracted from 12 monthly reports                     │
│ - [INSERT: Key data points from Step 1]                             │
│                                                                      │
│ **TASK**                                                            │
│ Help me identify a compelling narrative arc. Suggest:               │
│ • 2-3 possible "story" angles for the year                          │
│ • Which metrics best support each angle                             │
│ • What order to present information for maximum impact              │
│                                                                      │
│ **FORMAT**                                                          │
│ Brief options I can choose from, not a final answer                 │
│                                                                      │
│                                                            [Copy]   │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Plan Adjustments (Iteration)

After generating the plan, offer targeted adjustments:

```
┌─────────────────────────────────────────────────────────────────────┐
│ ✏️ WANT TO ADJUST THIS PLAN?                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ [Simplify - fewer steps]          [More detail on steps]            │
│ [Tighter timeline]                [Add a step]                       │
│ [Remove a step]                   [Something else...]                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Behavior:**
- User clicks chip or types request
- AI regenerates relevant portions only (not entire plan)
- Plan updates in place

---

### Reverse Bridge: Task Planner → Quick Prompt

If AI determines task is actually simple:

```
┌─────────────────────────────────────────────────────────────────────┐
│ ACTUALLY, THIS IS PRETTY STRAIGHTFORWARD                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ You don't need a full plan for this — it's really just one prompt  │
│ away.                                                                │
│                                                                      │
│ Here's what you need:                                                │
│                                                                      │
│ [Shows single well-formatted prompt]                                 │
│                                                                      │
│ Want a full plan anyway?                    [Yes, plan it out]      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Shareable Output

Users can share their plan:

```
[📤 Share plan]  [📥 Download as PDF]  [📋 Copy as text]
```

**Use Case:** "Here's how I'm planning to tackle the annual report. Let me know if you think I'm missing anything."

---

## Plan Constraints (Guardrails)

### Hard Rules for AI Generation

| Rule | Specification |
|------|---------------|
| **Step count** | 3-5 steps typical, 7 maximum. Never exceed 7. |
| **Time estimates** | Must be realistic. A 4-step plan shouldn't exceed "half a day" for typical tasks. |
| **Minimum viable path** | Always ask: "What's the smallest plan that gets them to DONE?" |
| **No jargon** | Plain language only. No "leverage," "optimize," "utilize," "synergize." |
| **Honest about AI** | Never oversell what AI can do, but never discourage AI use either. |
| **[INSERT] markers** | Every prompt with gaps must use clear markers. |
| **Tool recommendations** | Suggest specific tools (Claude, ChatGPT, Gemini) with brief rationale. |

### System Prompt Instruction

Include this in the AI system prompt:

```
When generating plans, always ask yourself: "What's the smallest plan that 
gets this person to DONE?" Start there. Only add complexity if the user 
asks for it or if it's truly necessary.

Plans should have 3-5 steps. Never exceed 7 steps. If a task seems to 
require more, you're overcomplicating it — find a way to consolidate.

For each step, be honest about whether AI helps or not. If a step is 
better done by the human, say so — but always offer a "Get prompt anyway" 
option and a "Help me think" option. Never discourage AI use.
```

---

## Complexity Detection Logic

### Simple Task → Single Prompt

**Signals:**
- Single deliverable
- Clear, bounded scope
- No source documents to process
- User seems confident about what they need

**Examples:**
- "Write an email to my team about the holiday schedule"
- "Help me draft feedback for a direct report"
- "Create a meeting agenda for our quarterly planning"
- "Summarize this article for my boss"

### Multi-Step Task → Plan

**Signals:**
- Multiple deliverables (report + presentation)
- Source documents to synthesize
- Sequential dependencies ("first X, then Y")
- User seems unsure of approach
- Task spans multiple work sessions

**Examples:**
- "Create an annual report and presentation from monthly data"
- "Research competitors and build a recommendation for leadership"
- "Prepare for a job interview at [company]"
- "Write a project proposal with supporting analysis"

---

## Who Does What: Step Assignment Logic

### You + AI (AI-Assisted)

- Data extraction from documents
- Synthesis and summarization
- First drafts of structured content
- Research and information gathering
- Formatting and polishing
- Transforming content between formats

### You (Human Recommended)

- Narrative/story decisions
- Political/contextual judgment calls
- Stakeholder-specific tailoring
- Final review and approval
- Creative direction
- Decisions requiring institutional knowledge

### AI (Can Handle Autonomously)

- Straightforward transformations
- Template application
- Reformatting between formats
- Proofreading/editing
- Simple research queries

**Critical:** Always offer "Get prompt anyway" + "Help me think" for human-recommended steps.

---

## Prompt Format Standard

Every generated prompt must follow this structure:

```
**ROLE**
[Specific expert persona — be specific, not generic]

**CONTEXT**
- [Situation — what's happening]
- [What you have — inputs, materials]
- [Constraints — requirements, limitations]
- [Audience — who this is for]

**TASK**
[Clear, specific instruction — what exactly to do]

**FORMAT**
[How output should be structured — bullets, sections, length]

**INPUT**
[INSERT: Clear description of what to paste here]
```

### Prompt Quality Checklist

- [ ] Uses markdown formatting (headers, bullets, bold)
- [ ] Role is specific (not just "helpful assistant")
- [ ] Context includes all necessary background
- [ ] Task is specific and bounded (not vague)
- [ ] Format specifies structure user can actually use
- [ ] [INSERT] markers have clear descriptions
- [ ] Scannable at a glance

---

## UI Components Needed

### New Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `TaskPlannerEntry` | Entry point with free text input | `/generator` or new route |
| `UnderstandingCard` | Shows AI's understanding of task | Task Planner flow |
| `ClarifyingQuestions` | 1-2 targeted questions with chips | Task Planner flow |
| `GamePlanView` | Full plan display with steps | Task Planner output |
| `PlanStep` | Individual step with expandable sections | Inside GamePlanView |
| `ThinkingAssistant` | Mini-chat for "Help me think" | Modal or slide-out |
| `ComplexityBridge` | "This looks like a bigger task" prompt | Quick Prompt flow |
| `SimpleBridge` | "This is straightforward" prompt | Task Planner flow |
| `PlanAdjustments` | Adjustment chips + input | Below plan |

### Modified Components

| Component | Changes Needed |
|-----------|----------------|
| `PromptOutput` | Update to new PCTR format with markdown |
| `PromptDisplay` | Add collapsed "Why this works" section |
| `CoachQuestion` | Support dynamic questions (not fixed) |

---

## State Management

### Task Planner State

```typescript
interface TaskPlannerState {
  // Input
  userInput: string;
  
  // Understanding
  understanding: {
    deliverables: string[];
    inputs: string[];
    audience: string;
    timeline: string | null;
    additionalContext: string[];
  };
  
  // Clarification
  clarifyingQuestions: Question[];
  answers: Record<string, string>;
  
  // Output
  complexity: 'simple' | 'multi-step';
  plan: Plan | null;
  singlePrompt: Prompt | null;
  
  // Iteration
  adjustmentHistory: Adjustment[];
  
  // UI State
  currentPhase: 'input' | 'understanding' | 'questions' | 'output';
  expandedSteps: Set<number>;
  activeThinkingStep: number | null;
}

interface Plan {
  title: string;
  totalTime: string;
  steps: PlanStep[];
}

interface PlanStep {
  number: number;
  title: string;
  who: 'you' | 'you-ai' | 'ai';
  time: string;
  tool: string;
  description: string;
  whyThisStep: string;
  prompt: Prompt | null;
  promptCaveat: string | null; // For "You" steps
}

interface Prompt {
  role: string;
  context: string[];
  task: string;
  format: string;
  input: string;
  whyItWorks: string[];
}
```

---

## API / AI Service Requirements

### New Service Functions

```typescript
// Analyze user input and extract understanding
analyzeTaskInput(input: string): Promise<TaskUnderstanding>

// Generate clarifying questions based on gaps
generateClarifyingQuestions(understanding: TaskUnderstanding): Promise<Question[]>

// Detect task complexity
assessComplexity(understanding: TaskUnderstanding, answers: Record<string, string>): Promise<'simple' | 'multi-step'>

// Generate single prompt (for simple tasks)
generatePrompt(understanding: TaskUnderstanding, answers: Record<string, string>): Promise<Prompt>

// Generate full plan (for multi-step tasks)
generatePlan(understanding: TaskUnderstanding, answers: Record<string, string>): Promise<Plan>

// Adjust existing plan based on user request
adjustPlan(plan: Plan, adjustment: string): Promise<Plan>

// Help user think through a specific step
helpThinkStep(step: PlanStep, userThoughts: string): Promise<ThinkingResponse>
```

---

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/quick-prompt` | QuickPrompt | Fast prompt generation |
| `/task-planner` | TaskPlanner | Consultant-style planning |
| `/generator` | Redirect or choice | Can redirect to appropriate tool or show both options |

---

## Out of Scope (MVP)

| Feature | Rationale | Future Version |
|---------|-----------|----------------|
| Full refinement chat | Adjustment requests cover 80% of needs | V2 |
| Plan persistence/history | No accounts in MVP | V2 |
| Team collaboration | Share link is enough for now | V2 |
| Workflow automation | We're planning, not executing | V2 |
| Custom templates | Let patterns emerge from usage first | V2 |
| User accounts | Keep MVP simple | V2 |

---

## Success Metrics

| Metric | What It Measures | Target |
|--------|------------------|--------|
| Completion rate | Users who get to a usable prompt/plan | >70% |
| Bridge acceptance | Users who accept complexity bridge | Track for learning |
| Prompt copy rate | Users who copy generated prompts | >50% |
| "Help me think" usage | Engagement with thinking assistant | Track for learning |
| Adjustment rate | How often users request changes | Track patterns |
| Time to output | How long from start to usable output | <3 min for simple, <5 min for plans |

---

## Implementation Order

### Phase 1: Quick Prompt Improvements
1. Update prompt output format (PCTR with markdown)
2. Add "Why this works" expandable section
3. Implement complexity detection
4. Add bridge to Task Planner

### Phase 2: Task Planner Core
1. Build entry point and input handling
2. Implement understanding card
3. Build clarifying questions (max 2)
4. Implement plan generation

### Phase 3: Plan Output
1. Build GamePlanView component
2. Build PlanStep with expandable sections
3. Implement "Get prompt" functionality
4. Implement "Get prompt anyway" with caveat

### Phase 4: Iteration & Polish
1. Add "Help me think" feature
2. Implement plan adjustments
3. Add reverse bridge (simple task detection)
4. Add share/download functionality
5. Polish and test

---

## Appendix A: Example Conversations

### Example 1: Simple Task (Quick Prompt)

**User:** "Write an email to my team about moving our weekly meeting to Thursday"

**AI Understanding:**
- Single deliverable (email)
- Clear scope
- No complexity signals

**Output:** Single well-formatted prompt, no bridge shown.

---

### Example 2: Complex Task (Task Planner)

**User:** "I need to create an annual financial report and presentation from 12 monthly reviews for my VP"

**AI Understanding:**
- Multiple deliverables (report + presentation)
- Source documents (12 monthly reviews)
- Executive audience

**Clarifying Questions:**
1. What's the main message? [Growth/wins] [Challenges] [Year in review]
2. How polished? [Internal] [Executive-ready] [Board-level]

**Output:** 4-step plan with prompts for AI-assisted steps, "Get prompt anyway" for human steps.

---

### Example 3: Complexity Bridge

**User in Quick Prompt:** "Help me prepare a competitive analysis with recommendations for my leadership team"

**AI Detection:**
- Research + synthesis + recommendations = multi-step
- Leadership audience = needs polish

**Bridge Shown:** "This looks like a multi-step task. Want help planning the full approach?"

---

## Appendix B: Prompt Templates

### Data Extraction Prompt Template

```
**ROLE**
Senior [Domain] Analyst with expertise in data synthesis

**CONTEXT**
- I have [X] documents containing [type of content]
- I need to extract [specific data points]
- This will be used for [purpose]

**TASK**
Review the following documents and extract:
• [Specific item 1]
• [Specific item 2]
• [Specific item 3]

Flag any anomalies, gaps, or inconsistencies you notice.

**FORMAT**
Structured list organized by [category], with brief notes on significance

**INPUT**
[INSERT: Paste your document content here]
```

### Narrative/Story Prompt Template

```
**ROLE**
Strategic communications advisor

**CONTEXT**
- I'm preparing [deliverable] for [audience]
- Key data points: [INSERT: Your data]
- Tone should be [tone description]

**TASK**
Help me identify a compelling narrative arc. Suggest:
• 2-3 possible "story" angles
• Which data points best support each angle
• Recommended order of information for impact

**FORMAT**
Brief options I can choose from, with pros/cons for each

**INPUT**
[INSERT: Your key data and context]
```

### Document Draft Prompt Template

```
**ROLE**
Senior [Domain] Writer with executive communication experience

**CONTEXT**
- Creating [document type] for [audience]
- Key messages: [INSERT: Your narrative from previous step]
- Must include: [requirements]
- Tone: [tone description]

**TASK**
Draft [document type] with the following sections:
• [Section 1]
• [Section 2]
• [Section 3]

**FORMAT**
[Specific format requirements — length, style, structure]

**INPUT**
[INSERT: Your data and narrative outline]
```

---

## Appendix C: System Prompt for AI

```
You are a task planning consultant helping non-technical professionals figure out 
the best way to accomplish their work tasks. Your job is to understand what they're 
trying to do, help them think through the approach, and give them actionable 
resources (prompts, plans, guidance) to execute.

CORE PRINCIPLES:

1. MINIMUM VIABLE PATH
Always ask: "What's the smallest plan that gets this person to DONE?"
Start simple. Only add complexity if truly necessary or requested.
Plans should have 3-5 steps. Never exceed 7.

2. BE HONEST ABOUT AI
Some tasks are better done by humans (narrative decisions, political judgment, 
stakeholder context). Say so — but always offer AI assistance if they want it.
Never oversell what AI can do. Never discourage AI use either.

3. CONSULTANT, NOT FORM
Your questions should feel like a smart colleague asking for clarification,
not a survey. Only ask what you truly need to know. Maximum 2 questions
before generating output.

4. ACTIONABLE OUTPUT
Everything you produce should be immediately usable. Prompts should be
well-formatted with clear PCTR structure. Plans should have clear steps
with time estimates and tool recommendations.

5. TEACH, DON'T JUST GIVE
Include brief "why this works" explanations. Help users understand the
reasoning so they can adapt and improve on their own.

PROMPT FORMAT:
Always structure prompts with:
- **ROLE**: Specific expert persona
- **CONTEXT**: Situation, inputs, constraints, audience
- **TASK**: Clear, specific instruction
- **FORMAT**: How output should be structured
- **INPUT**: [INSERT: description] markers for gaps

PLAN FORMAT:
Each step includes:
- Step number and clear title
- Who: You / You + AI / AI
- Time estimate (realistic)
- Tool recommendation
- 2-4 sentence description
- Expandable: prompt, rationale, thinking assistance
```

---

*End of PRD*
