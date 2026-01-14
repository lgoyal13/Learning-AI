---
name: prompt-engineering-patterns
description: Patterns for writing effective prompts to Gemini API and generating user-facing prompts in the AI Learning App. Use when implementing API calls to Gemini, generating prompts for users to copy, working on the prompt generator feature, or debugging prompt quality issues.
---

# Prompt Engineering Patterns

This skill covers two types of prompting:
1. **API prompts** — What we send to Gemini to generate outputs
2. **User-facing prompts** — What we generate for users to copy into AI tools

Both need to be excellent. Our prompts to Gemini determine output quality. User-facing prompts determine user success.

## Core Principle: Structure Beats Instructions

Giving the model a format to complete works better than telling it what to do.

**Instead of:**
```
Generate a game plan with 5 steps for the user's task.
```

**Do:**
```
Here is an example of a well-structured game plan:

[Example game plan]

Now create one following this same structure for:
Task: {user_task}
Context: {user_context}
```

The model completes the pattern rather than interpreting instructions.

## Few-Shot Examples Are Critical

Always include examples in prompts when possible. For the AI Learning App:
- Workflow patterns document = few-shot examples for generation
- Domain contexts = few-shot flavor for different professional contexts
- Existing workflows in the app = pattern library

See [FEW_SHOT_EXAMPLES.md](FEW_SHOT_EXAMPLES.md) for example structures to include in API calls.

## The PCTR Framework

All user-facing prompts should follow PCTR structure. See [PCTR_FRAMEWORK.md](PCTR_FRAMEWORK.md) for complete details.

**Quick reference:**
- **P (Persona):** Who should the AI be? Specific expertise.
- **C (Context):** What background does the AI need? User's situation, audience, constraints.
- **T (Task):** What specifically should the AI do? Clear action verb, specific scope.
- **R (Requirements):** Output constraints. Format, length, tone.

**Marking gaps:** Use `[INSERT: description]` for unknown information. Be specific about what's needed.

## API Prompt Structure

For Gemini API calls, use this structure:

```
[SECTION 1: SYSTEM CONTEXT]
{AI's role and principles - always included}

[SECTION 2: REFERENCE MATERIAL]
{Few-shot examples, patterns, domain context}

[SECTION 3: USER CONTEXT]
{Everything gathered from the user}

[SECTION 4: INSTRUCTIONS]
{What to generate - place AFTER context}

[SECTION 5: OUTPUT FORMAT]
{JSON schema if parsing needed}
```

**Key patterns:**
- Front-load constraints before the generation request
- Place instructions after context (not before)
- Use "Based on the information above..." to bridge context to task
- Request structured JSON with explicit schema when parsing output

## Gemini-Specific Guidelines

**Be precise and direct:** State the goal clearly. Avoid unnecessary persuasive language.

**Use consistent structure:** Pick XML-style tags or Markdown headings and stick with one.

**Completion strategy:** Instead of asking the model to generate, start the output:
```
Based on the user's context, here is their game plan:

Plan Name:
```
The model fills in naturally following the pattern.

## Quality Checklists

**Before implementing an API call:**
- [ ] Includes few-shot examples where applicable
- [ ] Constraints are front-loaded
- [ ] Output format specified (JSON schema if parsing)
- [ ] System context sets the AI's role
- [ ] User context clearly separated
- [ ] Instructions come after context

**Before generating a user-facing prompt:**
- [ ] Follows PCTR structure
- [ ] Persona is specific and relevant
- [ ] Context includes all user-provided info
- [ ] Gaps marked with `[INSERT: description]`
- [ ] Task has clear action verb
- [ ] Requirements include format and length
- [ ] Copy-paste ready (except INSERT markers)
