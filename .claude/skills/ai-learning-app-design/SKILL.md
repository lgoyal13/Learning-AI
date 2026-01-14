---
name: ai-learning-app-design
description: Design system for an AI learning app that teaches users to work with LLMs through guided prompt crafting. Use this skill for ALL design decisions - UI components, layouts, user flows, copy, interactions, visual styling, and product decisions. Ensures warm, intuitive, learning-focused design that thinks in pathways and scaffolds user growth.
---

# AI Learning App Design System

A guide app that walks users through AI tasks and helps them craft optimized prompts. Every design choice serves the learning journey.

## Core Product Philosophy

> **"Skill-building over dependency."**

Everything teaches. Users should become better at AI, not dependent on our app.

**The hierarchy of value:**
1. **Skill-building** (highest) — Users become 10x better at AI
2. **Intelligence layer** — Smart recommendations and guidance  
3. **The "why"** — Teaching patterns, not just providing answers
4. **Content library** (lowest, but necessary) — Reference material

**Key principle:** Meet users where they are. Nobody arrives wanting a "workflow." They arrive wanting help with a task. Start with their problem, not our structure.

For extended philosophy, see [PHILOSOPHY.md](PHILOSOPHY.md).

## Core Design Philosophy

**Progressive disclosure over information dumps.** Show users only what they need at each moment. Reveal complexity as they progress, not upfront. This respects cognitive load and keeps users focused.

**Scaffolding is half motivation, half instruction.** Every teaching moment needs both encouragement AND guidance. Never instruct without also supporting emotionally. Never celebrate without also moving forward.

**Immediate feedback loops.** The tighter the loop between action and result, the faster users learn. When they write a prompt, show the output instantly. No navigation away, no waiting.

**Reduce choices to increase learning.** Don't give blank boxes — give templates to modify. Don't explain everything — highlight what to change. Constrain the task so users can focus on what matters.

**Design for calm.** Anxiety kills comprehension. Generous whitespace, gentle error handling, always a clear next step. Users should never feel stuck or overwhelmed.

## Product Terminology

Use approachable language, not corporate jargon:

| Use | Don't Use |
|-----|-----------|
| "Game plan" | "Workflow" |
| "Step-by-step plan" | "Process documentation" |
| `[INSERT: ...]` markers | Blank spaces or "TBD" |
| "Starting point" | "Complete solution" |
| "Try it" | "Submit" |
| "Let's adjust" | "Error" |

## The PCTR Framework

All prompts in the app follow PCTR structure. Make the structure visible but not intrusive—users absorb the pattern through repeated exposure.

- **P (Persona):** Who should the AI be?
- **C (Context):** What background does the AI need?
- **T (Task):** What specifically should the AI do?
- **R (Requirements):** Output constraints (format, length, tone)

**Display with subtle labels:**
```
[P] You are a senior financial analyst...

[C] I'm preparing a report for my CFO...

[T] Identify the top 3 root causes...

[R] Format as a bulleted list...
```

## The [INSERT] Marker Pattern

When information is missing, use explicit markers instead of blank spaces:

**Format:** `[INSERT: description of what's needed]`

**Why this teaches:**
1. Shows users what context matters
2. Sets honest expectations ("this is a starting point")
3. Invites continuation rather than completion
4. Makes gaps explicit, not hidden

**Styling:** Visually distinct (highlight color), grouped at bottom for reference.

**Good markers:**
- `[INSERT: your 3-5 key competitors]`
- `[INSERT: your stakeholder's priorities]`

**Bad markers:**
- `[INSERT: data]` — too vague
- `[INSERT: info]` — not descriptive

## Planning Mode Conversation Pattern

The prompt generator and game plan flow should feel like a conversation, not a form.

**Instead of:**
```
Task: _______________
Audience: _______________
Goal: _______________
[Submit]
```

**Do:**
```
"What are you trying to create or accomplish?"
> [user types]

"Got it. Who is this for?"
> [user types]

"And what's the goal—what should this help them understand or decide?"
> [user types]
```

**Key principles:**
- Questions are cumulative (reference what they already said)
- Open-ended over multiple choice
- Emphasize that more detail helps
- 2-4 questions max per phase

## Invitation, Not Assessment

We don't judge whether a task "needs" a game plan. We offer the option and let users decide.

**The invitation after prompt generation:**
> "This sounds like it might be part of a bigger effort. Want me to help you think through the full process?"
>
> **[Yes, help me think through this]**  **[No, the prompt is enough]**

No AI assessment of complexity. The user knows their context better than we can infer.

## Confidence and Honesty

Always be transparent about limitations:

**Confidence indicators:**
- Show confidence level (High/Medium/Low) on generated plans
- Explain why in one sentence
- Frame outputs as "starting points"

**Honest copy:**
- "This is a starting point—you may need to adjust"
- "I've marked gaps where I need more info from you"
- "Results can vary, but this usually helps"

## Design Decisions Framework

Before implementing any UI element:
1. Does this help the user learn or complete their task?
2. Could this be simpler?
3. Does this feel warm and encouraging?
4. Is the user's next step obvious?
5. Am I showing only what's needed right now?
6. Does this build capability, or create dependency?

If any answer is "no" → redesign.

## The Learning Flow Pattern

Structure every learning sequence as:
```
Context → Action → Feedback → Reflection
```

**Context** (1-2 sentences max)
- What are we doing?
- Why does it matter?
- Keep it brief — users want to DO, not read

**Action** (one focused task)
- Give them a template or starting point, not a blank slate
- Highlight the specific part they should modify
- Large, comfortable input area
- One clear CTA

**Feedback** (immediate, in-place)
- Show the AI output right there — no page navigation
- Pair the result with a brief explanation of what worked
- Celebrate small wins with subtle animation or encouraging copy
- If something didn't work, reframe as "let's adjust" not "error"

**Reflection** (optional but powerful)
- Before moving on, prompt them to notice what changed
- "See how adding context changed the response?"
- This cements the learning

## Progressive Disclosure in Practice

**Level 1: First interaction**
- Minimal UI, maximum guidance
- Pre-filled template with one thing to change
- Hand-holding copy: "Try changing the highlighted part"

**Level 2: Building confidence**
- Show more of the prompt structure
- Let them modify multiple elements
- Lighter guidance: "What else might help Claude understand?"

**Level 3: Independence**
- Fuller editing capability
- Suggestions available on demand, not forced
- "You've got this" energy

Design the UI to support this progression. Early screens are more constrained; later screens offer more freedom.

## Visual Language

### Colors
- **Primary**: Warm, approachable (soft indigo, warm teal, gentle coral — NOT cold corporate blue)
- **Background**: Off-white or light warm gray (pure white feels clinical)
- **Text**: Dark warm gray, never pure black
- **Success**: Soft green or warm gold — celebratory but not loud
- **Adjustments needed**: Gentle amber, never harsh red
- **[INSERT] markers**: Light yellow or warm highlight — distinct but not alarming
- **Use color sparingly**: Neutral base, color draws attention to what matters now

### Typography
- **Headings**: Friendly, rounded sans-serif (Plus Jakarta Sans, Nunito, or similar)
- **Body**: Highly readable, generous line-height (1.6+), 16-18px base
- **PCTR labels**: Subtle, slightly smaller, muted color
- **Hierarchy**: Title, subtitle, body, caption — no more complexity for MVP

### Spacing & Layout
- **Generous whitespace**: Breathing room reduces anxiety. When in doubt, add more space
- **Single column for learning flows**: No horizontal scanning during lessons
- **Consistent rhythm**: 8px base scale (8, 16, 24, 32, 48, 64)
- **Card-based sections**: Soft-bordered containers group related content
- **Collapsible detail**: "Why this matters" and "Watch out" sections collapsed by default

### Interactions & Animation
- **Subtle, purposeful**: Gentle fades and slides (200-300ms)
- **Celebrate success**: Small animation on completion — confetti is too much, a gentle pulse or checkmark animation is right
- **Immediate response**: Every action gets visual feedback (button state, loading indicator, result)
- **Forgiving inputs**: Large click targets, clear focus states

## Game Plan Presentation

When showing generated game plans:

**Header:**
- Plan name (concise, based on their task)
- Confidence score with one-sentence reasoning
- Summary of what we understood from their input
- Total time estimate

**Steps:**
- All visible (not a wizard)
- Collapsible detail per step
- Clear actor labels (Human / AI-Assisted / Mixed)
- Tool badges for AI steps
- Prompts with copy buttons
- [INSERT] markers visually highlighted

**Footer:**
- List of gaps to fill
- Action buttons: Copy Full Plan, Refine This, Start Over

## Scaffolding Patterns for Prompt Crafting

**Never start with a blank box.** Always provide:
- A template or example prompt
- Visual highlighting of the part to modify
- Placeholder text that guides ("Describe your audience here...")

**Show before/after.** When teaching a concept:
- Display the "before" prompt
- Let them make the change
- Show both versions side-by-side with the output difference

**Reduce degrees of freedom.** Early on:
- Pre-fill most of the prompt
- Only expose one or two editable sections
- Expand editing capability as users progress

**Immediate testing.** After any prompt edit:
- "Try it" button is prominent
- Output appears in-place, not a new screen
- Feedback explains what happened

## Component Patterns

### Primary Action Button
- One clear CTA per screen
- Warm color, generous padding, rounded corners
- Action-oriented labels: "Try It", "See What Happens", "Continue"

### Prompt Input Area
- Large, comfortable textarea
- Highlighted sections for what to edit (subtle background color or border)
- PCTR labels visible but subtle
- [INSERT] markers in distinct highlight color
- Character count if limits exist

### Output Display
- Appears directly below or beside the input (no navigation)
- Clear visual distinction from input area
- Brief annotation explaining what worked: "Claude understood your context because you mentioned..."

### Feedback Messages
- **Success**: Warm, brief ("Nice! See how that changed the response?")
- **Guidance**: Specific, actionable ("Try adding who this is for")
- **Needs adjustment**: Gentle, solution-focused ("Let's tweak this — here's what might help...")

### Progress Indicators
- Step dots or simple progress bar at top
- Current step clearly marked
- Total steps visible (Step 2 of 4)
- No percentage — feels too metric-driven for learning

### Game Plan Step Cards
- Step number and name prominent
- Actor badge (Human / AI-Assisted / Mixed)
- Time estimate
- Tool badge with rationale (for AI steps)
- "What to do" instructions
- Prompt with copy button (for AI steps)
- Collapsible "Why this matters" and "Watch out"

## Copy & Tone

### Voice Principles
The tone must match the warm visual design. Casual copy + friendly UI = trust.

- **Contractions always**: "you're" not "you are", "let's" not "let us"
- **Short sentences**: One idea per sentence. Break up walls of text.
- **Active voice**: "Add context" not "Context should be added"
- **Encouraging**: "You've got this" energy without being patronizing
- **Honest about AI**: "This usually helps, though results can vary"

### Invitation Copy
When suggesting a game plan:
> "This sounds like it might be part of a bigger effort. I can help you think through the full process—showing where AI can help at each step, what's best handled by you, and where to watch out for common mistakes."

### Detail Encouragement
Remind users that more context helps:
> "The more detail you give, the better I can help."
> "Be as specific as you'd like—it all helps."

### Micro-copy Examples
| Instead of | Use |
|------------|-----|
| Submit | Try It |
| Error | Let's adjust that |
| Next | Keep Going |
| Learn more | Show me how |
| Invalid input | Hmm, try this instead |
| Success | Nice work! |
| Processing | Thinking... |
| Workflow | Game plan |
| Generate | Build |

### Setting Expectations
Be honest about what AI can and can't do. Users trust you more when you're upfront.
- "This is a starting point—you may need to adjust based on your situation"
- "I've marked a few gaps where I need more info from you"
- "AI works best when you're specific, but it won't be perfect every time"

### Avoid
- Jargon: "optimize parameters", "token limit", "context window", "workflow"
- Passive voice: "Your prompt has been generated"
- Hedging: "You might want to...", "Perhaps consider..."
- Long paragraphs: Break into 1-2 sentence chunks
- Assessment language: "Your task requires...", "This is complex enough for..."

## MVP Constraints

### Include
- Core flow: prompt generation → invitation → clarifying questions → game plan → refinement
- PCTR structure visible on all prompts
- [INSERT] markers for gaps
- Confidence scores on generated plans
- One clear visual style, applied consistently
- Feedback and progress indicators
- Mobile-responsive from start

### Skip for Now
- Onboarding tutorials (the app IS the onboarding)
- Accounts, saving, or history
- Settings or preferences
- Multiple themes
- Gamification (streaks, points, badges)
- Social features
- Step-by-step wizard (plan view is sufficient)

### Extend Later (only after core is solid)
- Prompt library / history
- More advanced techniques
- User accounts
- Progress tracking over time
- Download as markdown

## Quick Reference

**Every screen answers:**
- What am I supposed to do here? (one clear action)
- Why does this matter? (brief context)
- What's next? (obvious path forward)

**Design checklist:**
- [ ] Single purpose per screen
- [ ] Warm, not clinical
- [ ] Progress visible
- [ ] Next step obvious
- [ ] Feedback immediate
- [ ] Choices reduced (templates over blank boxes)
- [ ] Copy matches visual warmth
- [ ] PCTR structure visible but subtle
- [ ] [INSERT] markers distinct
- [ ] Could be simpler
- [ ] Builds capability, not dependency

**When stuck:** "What would a supportive teacher do here?"
