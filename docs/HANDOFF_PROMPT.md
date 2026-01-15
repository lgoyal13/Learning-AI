# Task Planner Implementation Handoff

## Project Context

You are continuing the implementation of a **Task Planner** feature for an AI Learning Academy app. The app helps business professionals use AI tools effectively by providing guided prompts and step-by-step planning.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Gemini API

**Source of Truth:** Read `/PRDs/TASK_PLANNER_PRD.md` for the full product requirements.

---

## What Has Been Completed (Phase 1)

### Phase 1.1-1.4: Quick Prompt Improvements ✅
- **Prompt output format** updated to use PCTR markdown with sections: ROLE, CONTEXT, TASK, FORMAT, INPUT
- **Complexity detection** added (`assessComplexity()` in geminiService.ts) - detects when a task needs planning vs a single prompt
- **ComplexityBridge component** created - shows "This looks like a bigger task" with options to build a plan or get the prompt
- **Bridge integrated** into generator flow - runs complexity check after prompt generation

### Phase 1.5: Smart Input Extraction ✅
- **`extractContextFromInput()`** service function added - uses Gemini to parse user input and extract audience, goal, tool mentions
- **Generator page updated** - runs extraction when user clicks Continue, pre-fills questions if confidence > 60%
- **Visual feedback** added - shows "I noticed some details" message and "Auto-detected" badges

### Phase 1.6: Prompt Output Scannability ✅
- **PromptOutput.tsx redesigned** - color-coded sections (purple=ROLE, blue=CONTEXT, green=TASK, amber=FORMAT)
- **Visual hierarchy improved** - each section has its own card with header and content area

### Files Modified in Phase 1:
- `services/geminiService.ts` - Added `extractContextFromInput()`, `assessComplexity()`
- `components/PromptOutput.tsx` - Complete redesign with color-coded sections
- `components/ComplexityBridge.tsx` - New component
- `app/generator/page.tsx` - Integrated extraction and bridge
- `app/task-planner/page.tsx` - Basic entry page created
- `App.tsx` - Added `/task-planner` route
- `types.ts` - Added `ExtractedContext`, `CoachQuestionConfig` types

---

## What Remains (Phases 2-4)

### Phase 2: Task Planner Core (NEXT)

**Goal:** Build the full Task Planner flow with understanding card, clarifying questions, and plan generation.

#### 2.1 Complete Task Planner Entry Page
- **File:** `app/task-planner/page.tsx`
- Currently has basic textarea + examples
- Need to add: loading states, error handling, stage management

#### 2.2 Add Task Planner Types
- **File:** `types.ts`
- Add these types:
```typescript
interface TaskPlannerState {
  userInput: string;
  understanding: TaskUnderstanding | null;
  clarifyingQuestions: ClarifyingQuestion[];
  answers: Record<string, string>;
  plan: TaskPlan | null;
  currentPhase: 'input' | 'understanding' | 'questions' | 'generating' | 'output';
  isLoading: boolean;
  error: string | null;
}

interface TaskUnderstanding {
  deliverables: string[];      // What they're creating
  inputs: string[];            // What they have to work with
  audience: string | null;     // Who it's for
  timeline: string | null;     // When they need it
  constraints: string[];       // Any limitations mentioned
}

interface ClarifyingQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  allowCustom: boolean;
}

interface TaskPlan {
  title: string;
  summary: string;
  totalTimeMinutes: number;
  stepCount: number;
  steps: TaskPlanStep[];
}

interface TaskPlanStep {
  number: number;
  title: string;
  who: 'you' | 'you-ai' | 'ai';        // Who does this step
  timeMinutes: number;
  tool: string | null;                  // Recommended AI tool
  description: string;                  // 2-4 sentences
  whyThisStep: string;                  // Explanation
  prompt: string | null;                // The prompt for this step
  promptCaveat: string | null;          // Warning for human steps
}
```

#### 2.3 Create Understanding Card Component
- **New file:** `components/UnderstandingCard.tsx`
- Shows AI's parsed understanding of the task
- Layout with icons:
  - 📊 What you're creating (deliverables)
  - 📄 What you have (inputs)
  - 👥 Who it's for (audience)
  - ⏰ Timeline
- Buttons: `[Got it right]` `[Let me clarify...]`

#### 2.4 Add Understanding Analysis Service
- **File:** `services/geminiService.ts`
- **New function:** `analyzeTaskForPlanning(input: string): Promise<TaskUnderstanding>`
- System prompt should extract deliverables, inputs, audience, timeline, constraints from freeform text

#### 2.5 Add Question Generation Service
- **File:** `services/geminiService.ts`
- **New function:** `generateClarifyingQuestions(understanding: TaskUnderstanding): Promise<ClarifyingQuestion[]>`
- **CRITICAL RULE:** Maximum 2 questions
- Only ask what's truly needed to create a good plan
- Return 0 questions if understanding is complete

#### 2.6 Add Plan Generation Service
- **File:** `services/geminiService.ts`
- **New function:** `generateTaskPlan(understanding: TaskUnderstanding, answers: Record<string, string>): Promise<TaskPlan>`
- **CRITICAL RULES:**
  - 3-5 steps typical, **7 maximum**
  - Be honest about what AI can vs can't do
  - Human steps must have prompts too (with caveat)
  - Use `[INSERT: description]` markers for gaps
  - Recommend specific tools (ChatGPT, Claude, Gemini)

#### 2.7 Build Task Planner Flow
- **File:** `app/task-planner/page.tsx`
- Stage flow: `input` → `understanding` → `questions` (if needed) → `generating` → `output`
- Handle loading states, errors, back navigation

---

### Phase 3: Plan Output

**Goal:** Build the plan display with expandable step sections.

#### 3.1 Create TaskPlanView Component
- **New file:** `components/TaskPlanView.tsx`
- Header: Plan title, total time, step count, confidence badge
- List of TaskPlanStep components
- Actions: Start over, Adjust plan

#### 3.2 Create TaskPlanStep Component
- **New file:** `components/TaskPlanStep.tsx`
- **Always visible:**
  - Step number & title
  - Who badge (You / You + AI / AI) with colors
  - Time estimate
  - Tool recommendation (if any)
  - Description (2-4 sentences)
- **Expandable sections (collapsed by default):**
  - `[📝 Get prompt]` or `[📝 Get prompt anyway]` for human steps
  - `[💡 Why this step]`
  - `[🤔 Help me think]`
- For human steps, show caveat: "This step is best done by you, but here's a prompt if you want AI help..."

#### 3.3 Add Reverse Bridge (Simple Task Detection)
- **New file:** `components/SimpleBridge.tsx`
- When Task Planner detects a simple task, show:
  - "Actually, this is pretty straightforward..."
  - Single prompt output
  - Button: `[Get full plan anyway]`

---

### Phase 4: Iteration & Polish

**Goal:** Add Help Me Think, plan adjustments, and share/download.

#### 4.1 Create Thinking Assistant Component
- **New file:** `components/ThinkingAssistant.tsx`
- Modal or slide-out panel
- Shows context-specific questions to help user think through a step
- Text input for user thoughts
- Buttons: `[Help me brainstorm]` `[I've got it now]`

#### 4.2 Add Thinking Service
- **File:** `services/geminiService.ts`
- **New function:** `helpThinkStep(step: TaskPlanStep, userThoughts: string): Promise<ThinkingResponse>`
- Returns: refined ideas, optional updated prompt, suggestions

#### 4.3 Create Plan Adjustments Component
- **New file:** `components/PlanAdjustments.tsx`
- Chip-based adjustment options:
  - `[Simplify - fewer steps]`
  - `[More detail on steps]`
  - `[Tighter timeline]`
  - `[Add a step]`
  - `[Remove a step]`
  - `[Something else...]`

#### 4.4 Add Adjustment Service
- **File:** `services/geminiService.ts`
- **New function:** `adjustTaskPlan(plan: TaskPlan, adjustment: string): Promise<TaskPlan>`
- Should only regenerate affected portions, not the whole plan

#### 4.5 Add Share/Download
- In `TaskPlanView.tsx`, add buttons:
  - `[📋 Copy as text]` - Plain text version
  - `[📤 Share plan]` - Shareable text format
  - `[📥 Download]` - Text or PDF file

---

## Key Constraints (Non-Negotiable)

| Rule | Specification |
|------|---------------|
| **Step count** | 3-5 typical, **7 maximum** |
| **Questions** | **Max 2** clarifying questions before generating |
| **Prompt format** | PCTR with markdown (ROLE, CONTEXT, TASK, FORMAT, INPUT) |
| **Gaps** | Use `[INSERT: description]` markers |
| **Human steps** | Must have "Get prompt anyway" AND "Help me think" options |
| **Display** | Prompts **collapsed by default** in plan steps |

---

## Key Files Reference

### Services
- `services/geminiService.ts` - All Gemini API calls. Follow existing patterns for schema validation.

### Components
- `components/ui.tsx` - UI primitives (Button, Card, Badge, etc.)
- `components/PromptOutput.tsx` - Reuse for displaying prompts in steps
- `components/CoachQuestion.tsx` - Reuse for clarifying questions
- `components/ComplexityBridge.tsx` - Reference for bridge pattern

### Types
- `types.ts` - All TypeScript interfaces

### Pages
- `app/generator/page.tsx` - Reference for stage-based flow pattern
- `app/task-planner/page.tsx` - The page you'll be building out

---

## Existing Patterns to Follow

### Gemini Service Pattern
```typescript
export const yourFunction = async (input: YourInput): Promise<YourOutput> => {
  const model = "gemini-2.5-flash";

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: { /* ... */ },
    required: [/* ... */]
  };

  const systemInstruction = `Your instructions here...`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `Your prompt here: ${input}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.3,
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini.");
    const data = JSON.parse(text);

    return { /* mapped data */ };
  } catch (error) {
    console.error("Error:", error);
    return { /* fallback */ };
  }
};
```

### Stage-Based Flow Pattern
See `app/generator/page.tsx` for the pattern:
- Use a state object with `stage` property
- `updateState()` helper for partial updates
- `goToStage()` helper for navigation
- Conditional rendering based on `state.stage`

---

## Testing Checklist

### Phase 2 Testing
- [ ] Understanding card correctly parses: "Create an annual report from 12 monthly reviews for my VP by Friday"
- [ ] Clarifying questions are relevant and max 2
- [ ] Plan generation respects 7 step maximum
- [ ] Human vs AI step assignment is appropriate

### Phase 3 Testing
- [ ] Plan view displays all steps correctly
- [ ] Expandable sections are collapsed by default
- [ ] "Get prompt anyway" shows caveat for human steps
- [ ] Prompts use proper PCTR markdown format
- [ ] Simple tasks show reverse bridge

### Phase 4 Testing
- [ ] Help me think opens and provides useful guidance
- [ ] Adjustments modify plan correctly
- [ ] Copy/share/download produce usable output
- [ ] Full flow works end-to-end

---

## Commands

```bash
# Run dev server
npm run dev

# Type check
npx tsc --noEmit

# Build
npm run build

# Run tests
npm test
```

---

## Start Here

1. Read the PRD at `/PRDs/TASK_PLANNER_PRD.md`
2. Start with **Phase 2.2** - Add the Task Planner types to `types.ts`
3. Then **Phase 2.4** - Add the `analyzeTaskForPlanning()` service
4. Then **Phase 2.3** - Create the UnderstandingCard component
5. Build out the full Task Planner flow in `app/task-planner/page.tsx`
6. Test as you go!

Good luck! 🚀
