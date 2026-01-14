# Product Requirements Document: Unified Prompt & Game Plan Generator

**Document Version:** 1.0  
**Created:** January 12, 2026  
**Author:** Aditya Goyal + Claude  
**Status:** Ready for Implementation

---

## Executive Summary

This PRD describes a redesigned user experience that unifies the Prompt Generator and Workflow Generator into a single, conversational flow. The experience follows a Claude Code–inspired "planning mode" approach where thoughtful questions gather context, and the system progressively helps users—from a simple prompt up to a full step-by-step game plan.

### Core Philosophy

> **"Skill-building over dependency."**

Everything teaches. The prompts show structure. The `[INSERT]` markers show what context matters. The game plans show how to think about complex tasks. Users get better at AI even if they never return.

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Assessment gate | **Removed** — User decides, not AI | Users know their task complexity better than AI can infer |
| Terminology | **"Game plan"** not "workflow" | Less corporate, more approachable |
| Role-specific examples | **Replaced** with universal patterns + domain flavor | More scalable, less maintenance |
| Step-by-step wizard | **Removed** — Plan view serves this purpose | Reduces friction, plan view is sufficient |
| Learning content | **Light touch** — One sentence each for "why" and "watch out" | Scannable, not overwhelming |
| Persistence | **None for MVP** — Single session | Simplifies implementation |

---

## User Journey Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STAGE 1: PROMPT GENERATION                       │
│                                                                     │
│  Planning-mode style conversation:                                  │
│  • User describes task                                              │
│  • System asks 2-3 thoughtful questions                             │
│  • Generates optimized prompt with PCTR structure                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      STAGE 2: INVITATION                            │
│                                                                     │
│  "This sounds like it might be part of a bigger effort.             │
│   Want me to help you think through the full process?"              │
│                                                                     │
│   [Yes, build me a game plan]    [No, the prompt is enough]         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼ (if yes)
┌─────────────────────────────────────────────────────────────────────┐
│                 STAGE 3: CLARIFYING QUESTIONS                       │
│                                                                     │
│  2-3 open-ended questions that build on prior context:              │
│  • Success criteria                                                 │
│  • Starting point (what they have vs need)                          │
│  • Constraints catch-all                                            │
│                                                                     │
│  Emphasis: "The more detail you give, the better your plan"         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    STAGE 4: PLAN GENERATION                         │
│                                                                     │
│  AI generates custom game plan using:                               │
│  • System instruction                                               │
│  • Universal workflow patterns                                      │
│  • Inferred domain context                                          │
│  • PCTR guide                                                       │
│  • All user-provided context                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 STAGE 5: PLAN PRESENTATION                          │
│                                                                     │
│  Full plan view with:                                               │
│  • Confidence score and reasoning                                   │
│  • All steps visible (collapsible detail)                           │
│  • [INSERT] markers for gaps                                        │
│  • Learning content per step (collapsible)                          │
│  • Copy/Refine/Download actions                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼ (optional)
┌─────────────────────────────────────────────────────────────────────┐
│                  STAGE 6: REFINEMENT CHAT                           │
│                                                                     │
│  Chat interface to:                                                 │
│  • Fill in [INSERT] markers                                         │
│  • Adjust steps                                                     │
│  • Ask questions                                                    │
│  • Download final plan as markdown                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Stage 1: Prompt Generation (Redesigned)

### Overview

The Prompt Generator transforms from a simple form into a planning-mode conversation. It asks thoughtful, open-ended questions that help users clarify their thinking while gathering the context needed for a good prompt.

### User Experience Flow

**Step 1.1: Task Description**

User sees a welcoming prompt:

> "What are you trying to create or accomplish?"
> 
> *Be as specific as you'd like—the more context you give, the better I can help.*

Input: Open text field (not a dropdown or examples)

The user types their task in their own words.

**Step 1.2: Clarifying Questions**

Based on their task description, the system asks 2-3 follow-up questions. These should feel cumulative—referencing what they already said.

**Question A: Audience**
> "Who is this for? (The person or group who will see/use the output)"

**Question B: Goal**
> "What's the goal? What should this help them understand, decide, or do?"

**Question C: Tool Preference** (optional)
> "Do you have a preferred AI tool, or want me to recommend one?"
> 
> Options: ChatGPT / Claude / Gemini / Perplexity / Not sure

**Step 1.3: Prompt Generation**

System generates an optimized prompt with visible PCTR structure.

Display format:
```
YOUR PROMPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━

[P] You are a senior financial analyst with expertise in variance analysis.

[C] I'm preparing a monthly report for my CFO. We were 15% over budget on marketing spend last quarter.

[T] Identify the top 3 likely root causes for the budget variance and suggest one follow-up question I should ask each department head.

[R] Format as a bulleted list. Keep each root cause explanation to 2 sentences max. Use professional tone.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Copy Prompt]  [Open in ChatGPT]  [Open in Claude]
```

The PCTR labels ([P], [C], [T], [R]) are subtle—visible for learning but not intrusive.

### Design Principles for Stage 1

1. **Questions feel like a conversation, not a form.** Each question acknowledges what came before.

2. **Open-ended over multiple choice.** We want them thinking, not clicking.

3. **Emphasize that detail helps.** Gentle reminders that more context = better output.

4. **The prompt teaches by example.** Seeing PCTR structure helps them internalize it.

---

## Stage 2: Invitation

### Overview

After generating the prompt, we invite the user to go deeper—without judging whether their task "deserves" a game plan. The user decides.

### User Experience

Immediately after showing the generated prompt:

> **Want to take this further?**
> 
> This sounds like it might be part of a bigger effort. I can help you think through the full process—showing where AI can help at each step, what's best handled by you, and where to watch out for common mistakes.
> 
> **[Yes, help me think through this]**  **[No, the prompt is enough]**

### Design Principles for Stage 2

1. **No assessment.** We don't judge task complexity. The user knows better.

2. **Consultative tone.** "I can help you think through" not "Let me build you a workflow."

3. **Clear value proposition.** They understand what they'll get: step-by-step help, AI recommendations, pitfall warnings.

4. **Easy to decline.** "No, the prompt is enough" is a valid, respected choice.

### If They Click "No"

The experience ends gracefully. They have their prompt. Maybe a subtle footer:

> "Come back anytime if you want to explore further."

No guilt, no upsell.

---

## Stage 3: Clarifying Questions

### Overview

If they click "Yes," we ask 2-3 more questions to gather the context needed for a good game plan. These questions build on what we already know—they should feel cumulative, not repetitive.

### User Experience

**Opening frame:**

> "Great! A few more questions to make your game plan as useful as possible."
> 
> *The more detail you give, the more tailored this will be.*

**Question 1: Success Criteria**

> "You mentioned this is for [audience from Stage 1]. What would make this successful in their eyes? What are they hoping to learn or decide?"

Open text field.

**Question 2: Starting Point**

> "What do you already have to work with, and what will you need to figure out?"
> 
> *Examples: data you have, research you've done, gaps you know about*

Open text field.

**Question 3: Catch-All**

> "Anything else I should know?"
> 
> *Timeline, tools you can or can't use, specific constraints, format requirements, etc.*

Open text field. Optional—can be left blank.

### Design Principles for Stage 3

1. **Cumulative context.** Questions reference what they already told us.

2. **Open-ended.** We want their words, not our categories.

3. **Emphasize detail.** Remind them that more = better.

4. **Catch-all as safety net.** Captures anything we didn't think to ask.

5. **Not too many questions.** 3 max. Respect their time.

---

## Stage 4: Plan Generation

### Overview

The AI generates a custom game plan using reference documents and all the context gathered from Stages 1-3. This is the core intelligence of the feature.

### Inputs to Generation

The generation prompt receives:

| Input | Source |
|-------|--------|
| Task description | Stage 1 |
| Audience | Stage 1 |
| Goal | Stage 1 |
| Tool preference | Stage 1 |
| Success criteria | Stage 3 |
| Starting point | Stage 3 |
| Constraints/other | Stage 3 |
| System instruction | Reference doc (always included) |
| Universal workflow patterns | Reference doc (always included) |
| Domain context | Reference doc (selected based on inferred domain) |
| PCTR guide | Reference doc (always included) |

### Reference Documents

Four reference documents provide the AI's "knowledge base":

**Document 1: System Instruction**

Sets the AI's identity and principles. Always included.

```markdown
You are an AI game plan coach helping non-technical business professionals complete tasks using AI tools effectively.

Your principles:
- Teach, don't just answer. Every output should help users get better at AI.
- Be honest about uncertainty. Use [INSERT: description] markers for information gaps.
- Keep it scannable. Busy professionals skim first.
- Use the PCTR framework for all prompts you generate.
- Mark human steps clearly. Not everything should be AI-assisted.
- Plans should be starting points, not finished products.

Your outputs:
- Game plans should have 3-7 steps (aim for 4-5)
- Each step needs: who does it, time estimate, what to do, and (if AI) a prompt
- Include brief "why this matters" and "watch out" notes per step
- Mark unknown information with [INSERT: description of what's needed]
- Always state your confidence level and reasoning
```

**Document 2: Universal Workflow Patterns**

Structural templates the AI can draw from. See Appendix A for full content.

Patterns include:
- Research → Synthesize → Present
- Analyze Data → Find Patterns → Recommend
- Draft → Feedback → Refine
- Plan → Structure → Execute
- Collect → Organize → Maintain

**Document 3: Domain Context Blurbs**

Short flavor text for different professional contexts. The AI infers which one applies based on the user's task description.

Domains:
- Finance & FP&A
- Marketing
- Business Operations / Strategy
- General Business (default fallback)

See Appendix B for full content.

**Document 4: PCTR Prompt Guide**

How to construct good prompts. Referenced when generating prompts within the game plan.

See Appendix C for full content.

### The Generation Prompt Structure

The prompt sent to Gemini follows this structure:

```
[SECTION 1: SYSTEM INSTRUCTION]
{Insert System Instruction document}

[SECTION 2: REFERENCE MATERIAL]

## Workflow Patterns
{Insert Universal Workflow Patterns document}

## Domain Context
{Insert relevant domain context blurb - AI should infer which one}

## Prompt Quality Guide
{Insert PCTR Guide document}

[SECTION 3: USER CONTEXT]

## What the user told us

**Original task:** {task description from Stage 1}
**Audience:** {audience from Stage 1}
**Goal:** {goal from Stage 1}
**Tool preference:** {tool preference from Stage 1, or "No preference"}

**Success looks like:** {response from Stage 3, Question 1}
**Starting point:** {response from Stage 3, Question 2}
**Constraints/other:** {response from Stage 3, Question 3, or "None specified"}

[SECTION 4: INSTRUCTIONS]

Based on the above, create a step-by-step game plan for this user.

First, infer the most relevant domain from the user's task and explain why in one sentence.

Then, assess your confidence level (High/Medium/Low) in creating a useful plan and explain why in one sentence.

Then, generate the game plan.

[SECTION 5: OUTPUT FORMAT]

Return as structured JSON matching this exact schema:

{
  "planName": "string - concise name based on their task",
  "inferredDomain": "string - e.g., 'Finance & FP&A'",
  "domainReasoning": "string - one sentence explaining why this domain",
  "confidence": "High | Medium | Low",
  "confidenceReasoning": "string - one sentence explaining confidence level",
  "userContextSummary": "string - 2-3 sentence summary of what you understood",
  "totalTimeMinutes": "number",
  "insertMarkers": ["array of all [INSERT: x] markers used"],
  "steps": [
    {
      "stepNumber": "number",
      "stepName": "string",
      "actor": "Human | AI-Assisted | Mixed",
      "timeMinutes": "number",
      "tool": "string | null - if AI-Assisted: ChatGPT, Claude, Gemini, Perplexity, or null",
      "toolRationale": "string | null - one sentence on why this tool, if applicable",
      "whatToDo": "string - 2-3 sentences, plain language instructions",
      "prompt": "string | null - full PCTR-structured prompt if AI-Assisted, with [INSERT] markers",
      "whyThisMatters": "string - one sentence",
      "watchOut": "string - one sentence, common mistake or pitfall"
    }
  ]
}
```

### Output Validation

Before rendering, validate:
- `steps` array has 3-7 items
- Each step has required fields
- `actor` is one of the allowed values
- `confidence` is one of the allowed values
- JSON is well-formed

If validation fails, retry generation once. If still failing, show graceful error.

### Handling Generation Failures

If generation fails or produces invalid output:

> "I had trouble building a custom game plan. Here's a general template that might help as a starting point."

Show a fallback general-purpose plan based on the closest matching pattern.

---

## Stage 5: Plan Presentation

### Overview

The generated game plan is displayed in a full-page view. All steps are visible with collapsible detail. Users can copy, refine, or download.

### User Experience

**Header Section:**

```
YOUR GAME PLAN: Competitive Analysis for Leadership
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Match Confidence: HIGH
This follows a Research → Analyze → Present pattern, common for strategic analysis tasks.

Based on what you shared:
You're creating a competitive analysis for your VP and leadership team to understand 
market positioning. You have some internal data but need to research competitor moves. 
This is for an upcoming leadership meeting.

Total time: ~2.5 hours  |  Steps: 5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Steps Section:**

Each step displayed as a card:

```
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2: Research Competitors                                       │
│                                                                     │
│  👤 Who: AI-Assisted (You + Perplexity)                             │
│  ⏱️ Time: ~25 min                                                   │
│  🎯 Output: Research notes on each competitor                       │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  WHAT TO DO:                                                        │
│  Use Perplexity to research each competitor's recent moves,         │
│  positioning, and any public metrics. Focus on the last 6 months.   │
│                                                                     │
│  WHY PERPLEXITY:                                                    │
│  Best for research with citations—you can verify what it finds.     │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  PROMPT:                                                            │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ [P] You are a competitive intelligence analyst.             │    │
│  │                                                             │    │
│  │ [C] I'm researching [INSERT: competitor name] for a         │    │
│  │ strategic analysis. My company is in the                    │    │
│  │ [INSERT: your industry] space.                              │    │
│  │                                                             │    │
│  │ [T] Find recent news, strategic moves, and market           │    │
│  │ positioning for this competitor from the last 6 months.     │    │
│  │                                                             │    │
│  │ [R] Cite your sources. Flag anything unverified.            │    │
│  │ Focus on facts, not speculation.                            │    │
│  └─────────────────────────────────────────────────────────────┘    │
│  [Copy Prompt]                                                      │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  ▼ Why this matters (click to expand)                               │
│  ▼ Watch out (click to expand)                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Collapsible Learning Content:**

When expanded:

> **Why this matters:** Fresh competitor intel prevents you from building on outdated assumptions.
> 
> **Watch out:** Don't just copy-paste results—extract the 3-5 findings most relevant to your questions.

**[INSERT] Marker Styling:**

`[INSERT: competitor name]` should be visually distinct:
- Different background color (light yellow or highlight)
- Slightly bold
- Clear that this is a gap to fill

**Footer Section:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is a starting-point game plan. You may need to fill in the 
[INSERT] sections and adjust based on your specific situation.

GAPS TO FILL:
• [INSERT: your 3-5 key competitors]
• [INSERT: specific questions leadership wants answered]
• [INSERT: your industry]
• [INSERT: your internal data/metrics]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Copy Full Plan]    [Refine This]    [Start Over]
```

### Action Buttons

**[Copy Full Plan]**

Copies a clean, formatted text version of the entire plan to clipboard. Format:

```
GAME PLAN: Competitive Analysis for Leadership
Generated: January 12, 2026

SUMMARY:
[userContextSummary]

Total time: ~2.5 hours

---

STEP 1: Define Your Focus
Who: You
Time: ~15 min

What to do:
[whatToDo]

Why this matters: [whyThisMatters]
Watch out: [watchOut]

---

STEP 2: Research Competitors
Who: AI-Assisted (Perplexity)
Time: ~25 min

What to do:
[whatToDo]

Prompt:
[prompt]

Why this matters: [whyThisMatters]
Watch out: [watchOut]

---
[... continue for all steps ...]

---

GAPS TO FILL:
[list of INSERT markers]
```

**[Refine This]**

Opens Stage 6: Refinement Chat.

**[Start Over]**

Returns to Stage 1 with fresh state.

---

## Stage 6: Refinement Chat

### Overview

Optional stage. If the user wants to refine their game plan, they enter a chat interface where they can fill gaps, adjust steps, or ask questions.

### User Experience

**Opening:**

> "What would you like to refine? You can:"
> - Fill in any of the [INSERT] markers
> - Ask me to adjust or add steps
> - Ask questions about any part of the plan

**Chat Interface:**

Standard chat with the plan visible/collapsed on the side or above.

User can type things like:
- "My competitors are Acme, Beta Corp, and Gamma Inc"
- "Can you add a step for getting feedback from my manager?"
- "I don't have access to Perplexity, can you adjust for ChatGPT?"
- "What should I do if I can't find recent news on a competitor?"

**AI Behavior:**

- References the existing plan
- Updates relevant sections based on user input
- Shows what changed
- Maintains helpful, teaching tone

**After Refinement:**

> "I've updated your game plan. Want to download a final version?"
> 
> **[Download as Markdown]**  **[Keep Refining]**  **[Done]**

### Download Format

If they click **[Download as Markdown]**, generate a `.md` file with:

- Full game plan with all refinements incorporated
- [INSERT] markers replaced with their actual content (where provided)
- PCTR breakdowns intact
- Clean formatting suitable for saving/printing

File name: `Game_Plan_[PlanName]_[Date].md`

---

## Technical Considerations (Non-Technical Summary)

### API Calls

| Stage | API Call | Purpose |
|-------|----------|---------|
| Stage 1 | Gemini | Generate optimized prompt from user inputs |
| Stage 4 | Gemini | Generate full game plan from all context |
| Stage 6 | Gemini | Handle refinement conversation |

### Data Flow

All context flows forward through stages:
- Stage 1 outputs feed into Stage 2
- Stages 1 + 3 outputs feed into Stage 4
- Stage 4 output + conversation feeds Stage 6

No persistence between sessions. All state is local to the current session.

### Reference Document Management

The four reference documents (System Instruction, Workflow Patterns, Domain Contexts, PCTR Guide) should be:
- Stored as separate files or constants
- Injected into prompts at generation time
- Easy to update without changing code logic

### Error Handling

| Scenario | Handling |
|----------|----------|
| Generation fails | Retry once, then show fallback template |
| Invalid JSON output | Retry once, then show error with "Try Again" option |
| User leaves mid-flow | State is lost, no recovery needed for MVP |

---

## UI/UX Requirements

### Visual Hierarchy

1. **Scannable first.** Users should grasp the plan structure at a glance.
2. **Progressive disclosure.** Details available on demand (collapsible).
3. **Clear action buttons.** What can I do next is always obvious.
4. **Distinct [INSERT] markers.** Gaps are visually unmissable.

### Tone and Copy

1. **Consultative, not robotic.** "I can help you think through" not "Processing your request."
2. **Encouraging detail.** Remind users that more context = better output.
3. **Honest about limitations.** Confidence scores, "starting point" framing.
4. **Teaching through showing.** PCTR labels visible, structure implicit.

### Responsive Design

All stages should work on:
- Desktop (primary)
- Tablet
- Mobile (functional, though less ideal for this type of work)

### Accessibility

- Proper heading hierarchy
- Keyboard navigation for all actions
- Screen reader compatible
- Sufficient color contrast for [INSERT] markers

---

## Success Metrics (Post-MVP)

For MVP, we'll observe manually. Post-MVP, track:

| Metric | What It Tells Us |
|--------|------------------|
| Invitation acceptance rate | Do users want game plans? |
| Plan completion rate | Do they get all the way through? |
| Copy Full Plan clicks | Are they using what we generate? |
| Refine This engagement | Do they want to go deeper? |
| Download rate | Are they keeping the output? |
| Return visits | Does this create repeat usage? |

---

## Out of Scope for MVP

The following are explicitly NOT included in this version:

- User accounts / authentication
- Saving game plans for later
- Sharing game plans with others
- Multiple game plans per session
- Analytics / tracking
- Direct integrations with AI tools (just copy/paste for now)
- Workflow automation (executing steps automatically)
- Custom reference documents (user-uploaded)

---

## Appendices

### Appendix A: Universal Workflow Patterns Document

```markdown
# Universal Workflow Patterns for AI-Augmented Work

## Pattern A: Research → Synthesize → Present

**Best for:** Competitive analysis, market research, due diligence, landscape scans

**Structure:**
1. Define focus and questions (Human)
2. Gather information (AI + search tools)
3. Synthesize findings (AI + human review)
4. Create deliverable (AI draft + human polish)
5. Present/share (Human)

**Characteristics:**
- Front-loaded with information gathering
- AI excels at synthesis across many sources
- Human judgment critical for "so what" interpretation
- Usually ends with a presentation or document

---

## Pattern B: Analyze Data → Find Patterns → Recommend

**Best for:** Variance analysis, performance reviews, root cause analysis, diagnostics

**Structure:**
1. Gather/prepare data (Human)
2. Explore and describe data (AI)
3. Identify patterns/anomalies (AI + human validation)
4. Generate hypotheses (AI)
5. Recommend actions (Human with AI input)

**Characteristics:**
- Requires structured data as input
- AI good at pattern spotting, humans good at context
- Recommendations need human validation
- Often feeds into a decision or action

---

## Pattern C: Draft → Feedback → Refine

**Best for:** Reports, emails, presentations, proposals, communications

**Structure:**
1. Define purpose and audience (Human)
2. Create first draft (AI)
3. Review and give feedback (Human)
4. Revise based on feedback (AI)
5. Final polish (Human)

**Characteristics:**
- Iterative by nature
- AI generates volume, human provides taste
- May loop multiple times
- Quality depends on clear initial direction

---

## Pattern D: Plan → Structure → Execute

**Best for:** Project plans, OKRs, campaign plans, event coordination

**Structure:**
1. Define goals and constraints (Human)
2. Generate structure/framework (AI)
3. Review and adjust (Human)
4. Fill in details (AI + Human)
5. Finalize plan (Human)

**Characteristics:**
- Strategic thinking upfront
- AI good at structure, human good at priorities
- Details often need human knowledge
- Output is usually a plan document

---

## Pattern E: Collect → Organize → Maintain

**Best for:** Documentation, knowledge bases, SOPs, tracking systems

**Structure:**
1. Define what to capture (Human)
2. Create template/structure (AI)
3. Populate initial content (Human + AI)
4. Review and refine (Human)
5. Establish update cadence (Human)

**Characteristics:**
- Ongoing, not one-time
- AI good at structure and templates
- Content often requires human input
- Success depends on maintenance
```

### Appendix B: Domain Context Documents

```markdown
# Domain Contexts

## Finance & FP&A

**Priorities:** Accuracy, auditability, clear data lineage, meeting deadlines (close, board, audit)

**Stakeholders:** CFO, board, auditors, department heads

**Deliverables:** Variance analyses, forecasts, board decks, financial reports

**Tone:** Precise, professional, metrics-driven

**Cautions:** Sensitive data, audit trail matters, precision over speed

---

## Marketing

**Priorities:** Speed, creativity, audience resonance, measurable impact

**Stakeholders:** CMO, brand teams, agencies, customers

**Deliverables:** Campaign plans, content, performance reports, briefs

**Tone:** Persuasive, audience-aware, brand-consistent

**Cautions:** Brand voice matters, creative needs human judgment, trends move fast

---

## Business Operations / Strategy

**Priorities:** Cross-functional alignment, executive communication, actionable insights

**Stakeholders:** Executives, department heads, cross-functional teams

**Deliverables:** Strategy docs, OKRs, business reviews, recommendations

**Tone:** Executive-friendly, clear, structured

**Cautions:** Political sensitivity, stakeholder management, context is everything

---

## General Business (Default)

**Priorities:** Clarity, efficiency, getting things done

**Stakeholders:** Varies by task

**Deliverables:** Varies by task

**Tone:** Professional, clear, appropriate to audience

**Cautions:** When uncertain, ask for clarification; default to being helpful
```

### Appendix C: PCTR Prompt Guide Document

```markdown
# PCTR Framework for Effective Prompts

## P - Persona

**What it is:** Who should the AI be?

**Why it matters:** Gives the AI a perspective, expertise level, and shapes tone.

**Good example:** "You are a senior financial analyst with expertise in variance analysis."

**Weak example:** "You are an AI assistant."

---

## C - Context

**What it is:** What background does the AI need?

**Why it matters:** Helps the AI understand the situation and tailor its response.

**Include:**
- Your role and situation
- The audience for the output
- Relevant constraints or history

**Good example:** "I'm preparing a monthly report for my CFO. We were 15% over budget on marketing spend last quarter."

**Weak example:** "I have some data."

---

## T - Task

**What it is:** What specifically should the AI do?

**Why it matters:** Clear tasks get clear outputs.

**Use action verbs:** Analyze, Identify, Draft, Compare, Summarize, Create, Explain

**Good example:** "Identify the top 3 root causes and suggest follow-up questions for each department head."

**Weak example:** "Help me with this."

---

## R - Requirements

**What it is:** What are the constraints on the output?

**Why it matters:** Without requirements, the AI guesses—and often guesses wrong.

**Include:**
- Format (bullets, table, narrative, JSON)
- Length (2 sentences, 1 page, 500 words)
- Tone (formal, casual, technical)
- Other constraints

**Good example:** "Format as a bulleted list. Keep each item to 2 sentences max. Use professional tone."

**Weak example:** (no requirements = AI guesses)

---

## Marking Gaps with [INSERT]

When information is unknown, mark it clearly:

**Format:** `[INSERT: description of what's needed]`

**Be specific:** Describe what type of information belongs there.

**Examples:**
- `[INSERT: your 3 main competitors]`
- `[INSERT: the time period for analysis, e.g., Q3 2025]`
- `[INSERT: your company's industry]`
- `[INSERT: specific metrics you want to highlight]`
```

---

## Implementation Notes

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/generator/page.tsx` | Modify | Update Prompt Generator to planning-mode style |
| `app/game-plan/page.tsx` | Create | New page for Stages 3-5 |
| `components/GamePlanView.tsx` | Create | Renders the generated game plan |
| `components/RefinementChat.tsx` | Create | Chat interface for Stage 6 |
| `services/geminiService.ts` | Modify | Add game plan generation function |
| `data/reference/` | Create | Directory for reference documents |
| `data/reference/system-instruction.md` | Create | System instruction doc |
| `data/reference/workflow-patterns.md` | Create | Workflow patterns doc |
| `data/reference/domain-contexts.md` | Create | Domain context blurbs |
| `data/reference/pctr-guide.md` | Create | PCTR guide doc |

### Routing

| Route | Stage |
|-------|-------|
| `/generator` | Stages 1-2 (Prompt Generation + Invitation) |
| `/game-plan` | Stages 3-5 (Questions + Generation + Presentation) |
| `/game-plan?refine=true` | Stage 6 (Refinement Chat) |

Or consider a single route (`/generator`) that progresses through stages with state management.

---

## Open Questions for Implementation

1. **Single page or multiple routes?** Should the whole flow live on one page with state transitions, or separate routes?

2. **How to handle back navigation?** If they're in Stage 4, can they go back to Stage 3 and change answers?

3. **Loading states during generation?** Stage 4 generation might take a few seconds. What do we show?

4. **Mobile keyboard handling?** The open-ended questions need comfortable text input on mobile.

5. **Markdown download implementation?** Need to generate and trigger download of `.md` file.

---

*End of PRD*
