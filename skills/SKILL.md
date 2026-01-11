---
name: ai-learning-app-design
description: Design system for an AI learning app that teaches users to work with LLMs through guided prompt crafting. Use this skill for ALL design decisions - UI components, layouts, user flows, copy, interactions, and visual styling. Ensures warm, intuitive, learning-focused design that thinks in pathways and scaffolds user growth.
---

# AI Learning App Design System

A guide app that walks users through AI tasks and helps them craft optimized prompts. Every design choice serves the learning journey.

## Core Design Philosophy

**Progressive disclosure over information dumps.** Show users only what they need at each moment. Reveal complexity as they progress, not upfront. This respects cognitive load and keeps users focused.

**Scaffolding is half motivation, half instruction.** Every teaching moment needs both encouragement AND guidance. Never instruct without also supporting emotionally. Never celebrate without also moving forward.

**Immediate feedback loops.** The tighter the loop between action and result, the faster users learn. When they write a prompt, show the output instantly. No navigation away, no waiting.

**Reduce choices to increase learning.** Don't give blank boxes — give templates to modify. Don't explain everything — highlight what to change. Constrain the task so users can focus on what matters.

**Design for calm.** Anxiety kills comprehension. Generous whitespace, gentle error handling, always a clear next step. Users should never feel stuck or overwhelmed.

## Design Decisions Framework

Before implementing any UI element:
1. Does this help the user learn or complete their task?
2. Could this be simpler?
3. Does this feel warm and encouraging?
4. Is the user's next step obvious?
5. Am I showing only what's needed right now?

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
- **Use color sparingly**: Neutral base, color draws attention to what matters now

### Typography
- **Headings**: Friendly, rounded sans-serif (Plus Jakarta Sans, Nunito, or similar)
- **Body**: Highly readable, generous line-height (1.6+), 16-18px base
- **Hierarchy**: Title, subtitle, body, caption — no more complexity for MVP

### Spacing & Layout
- **Generous whitespace**: Breathing room reduces anxiety. When in doubt, add more space
- **Single column for learning flows**: No horizontal scanning during lessons
- **Consistent rhythm**: 8px base scale (8, 16, 24, 32, 48, 64)
- **Card-based sections**: Soft-bordered containers group related content

### Interactions & Animation
- **Subtle, purposeful**: Gentle fades and slides (200-300ms)
- **Celebrate success**: Small animation on completion — confetti is too much, a gentle pulse or checkmark animation is right
- **Immediate response**: Every action gets visual feedback (button state, loading indicator, result)
- **Forgiving inputs**: Large click targets, clear focus states

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
- Placeholder text that guides, not just labels
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

### Navigation
- Minimal for MVP — the flow IS the navigation
- Clear back button when in sequences
- Exit path available but not emphasized

## Copy & Tone

### Voice Principles
The tone must match the warm visual design. Casual copy + friendly UI = trust.

- **Contractions always**: "you're" not "you are", "let's" not "let us"
- **Short sentences**: One idea per sentence. Break up walls of text.
- **Active voice**: "Add context" not "Context should be added"
- **Encouraging**: "You've got this" energy without being patronizing
- **Honest about AI**: "This usually helps, though results can vary"

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

### Setting Expectations
Be honest about what AI can and can't do. Users trust you more when you're upfront.
- "This prompt will help Claude understand your context — though results can still vary"
- "AI works best when you're specific, but it won't be perfect every time"

### Avoid
- Jargon: "optimize parameters", "token limit", "context window"
- Passive voice: "Your prompt has been generated"
- Hedging: "You might want to...", "Perhaps consider..."
- Long paragraphs: Break into 1-2 sentence chunks

## Friendly Visual Elements

Research shows friendly visuals build trust and engagement in learning apps.

- **Consider a simple mascot or illustration style** that appears during feedback moments
- **Subtle success animations**: A gentle bounce, a soft glow, a friendly checkmark
- **Warm illustrations** over stock photos or abstract shapes
- **Consistent character**: If you use an illustration style, apply it throughout

Keep it simple for MVP — even a consistent icon style counts.

## Progress Without Pressure

Show progress to motivate, but avoid anxiety-inducing competition.

**Do:**
- Show current step in a sequence
- Celebrate completion of sections
- Let users see what they've learned

**Don't (for MVP):**
- Leaderboards
- Streaks or daily goals
- Points or XP systems
- Anything that creates fear of losing progress

Intrinsic motivation (the "aha moment") beats extrinsic rewards for genuine learning.

## MVP Constraints

### Include
- Core flow: task selection → guided prompt crafting → immediate testing → reflection
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

### Extend Later (only after core is solid)
- Prompt library / history
- More advanced techniques
- User accounts
- Progress tracking over time

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
- [ ] Could be simpler

**When stuck:** "What would a supportive teacher do here?"
