# Product Philosophy - Extended

This document expands on the core philosophy in SKILL.md with detailed rationale and design decisions.

---

## The Recipe Book Problem

A library of workflows and prompts alone does NOT solve "workslop" (wasted AI work with no ROI).

**Why static content fails:**
- Users won't browse a library—they arrive with a problem and want help NOW
- Static prompts become stale as AI tools evolve
- Copy-paste without understanding creates dependency, not capability
- Generic prompts don't fit specific situations

**What actually reduces workslop:**

| Root Cause | Solution | Feature |
|------------|----------|---------|
| Wrong tool selection | Intelligent recommendation | Tool suggestions per step |
| Bad prompts | Real-time feedback on YOUR prompts | Prompt Refiner |
| No mental model | Teaching the WHY, not just the what | PCTR framework throughout |
| Inconsistent results | Proven templates as starting points | Game Plan Generator |

---

## The Moat

**Weak moat:** "We have 50 workflow templates" (anyone can make prompts; AI tools are adding this)

**Strong moat:** "Deep role-specific expertise + intelligent guidance layer + skill-building focus"

---

## Feature Impact Ranking

| Feature | Impact | Why |
|---------|--------|-----|
| Smart Prompt Refiner | HIGH | Meets users at THEIR prompt, teaches transferable skills |
| Intelligent Game Plan Generator | HIGH | Solves "where do I start?", contextual, adaptive |
| Workflow Library | MEDIUM | Reference material; passive without intelligent layer |

---

## Key Design Decisions

### Why "Game Plan" Not "Workflow"

"Workflow" sounds:
- Corporate and technical
- Like something IT creates
- Like documentation, not help

"Game plan" sounds:
- Actionable and personal
- Like a strategy, not bureaucracy
- Like help, not process

### Why Templates with [INSERT] Markers

Templates with explicit gaps:
1. **Set honest expectations** — "This is a starting point, not a final answer"
2. **Teach what matters** — The brackets show which details change the output
3. **Invite continuation** — "Oh, I need to clarify that. Let me think..."
4. **Make it reusable** — They can save and adapt for similar tasks

### Why No Assessment Gate

We considered having the AI assess whether a task "needs" a workflow before suggesting one.

**Problems with assessment:**
- User describes something simple-sounding
- AI thinks: "Simple task, just needs a prompt"
- But actually: This is a sensitive task with hidden complexity the AI can't see

**Solution: Invitation, not assessment**
- Always offer the option to go deeper
- Let the user decide—they know their context better
- No judgment about task complexity

### Why Universal Patterns Over Role-Specific Libraries

We could maintain separate workflow examples for each role (marketing, finance, etc.).

**Problems with role-specific:**
- High maintenance (5 workflows × 4 roles = 20 to maintain)
- Adding a new role requires building a whole library
- Cross-functional tasks don't fit neatly

**Solution: Universal patterns + domain flavor**
- 5 universal workflow patterns (research→synthesize→present, etc.)
- Short domain context blurbs (finance cares about X, marketing cares about Y)
- User's own words provide the specifics

More scalable, more flexible, easier to extend.

---

## The User Journey Principle

**Start where they are, expand their view gradually.**

1. User arrives with a task → Give them a prompt immediately (useful in 2 minutes)
2. Offer to go deeper → "This might be part of a bigger effort..."
3. If yes, ask thoughtful questions → Cumulative, building on what they said
4. Generate a plan → Tailored to their specific situation
5. Let them refine → Chat to fill gaps, adjust, improve
6. Give them something to keep → Downloadable if they've invested the time

Each step adds value. They can stop anywhere and still have something useful.

---

## Quality Over Quantity

**The bar for outputs:**
- Every prompt must follow PCTR
- Every step must have "why this matters" and "watch out"
- Every plan must acknowledge its confidence level
- Every gap must be explicitly marked

**What we don't do:**
- Generate vague, generic content to fill space
- Pretend we know things we don't
- Overwhelm with options when one good answer will do
- Add features that don't teach

---

## Learning Through Use

The app teaches by showing, not lecturing.

**Teaching through structure:**
- PCTR labels on every prompt → Users absorb the pattern
- `[INSERT]` markers → Users learn what context matters
- Step-by-step plans → Users learn how to decompose tasks
- Tool recommendations with rationale → Users learn which tool for which job

**Not:**
- Long explanations before they can do anything
- Mandatory tutorials
- Quizzes or certifications
- Theory without practice

The best learning happens when users accomplish real tasks and notice the patterns along the way.
