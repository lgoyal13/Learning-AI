import React, { useState, useEffect } from 'react';
import { PageLayout, Card, Button, Badge, Callout } from '../../components/ui';
import { UnderstandingCard } from '../../components/UnderstandingCard';
import { CoachQuestion } from '../../components/CoachQuestion';
import { TaskPlanView } from '../../components/TaskPlanView';
import { ThinkingAssistant } from '../../components/ThinkingAssistant';
import { PlanAdjustments } from '../../components/PlanAdjustments';
import { ArrowRight, ArrowLeft, MessageSquare, Sparkles, Loader2 } from 'lucide-react';
import {
  TaskPlannerPhase,
  TaskPlannerState,
  TaskUnderstanding,
  ClarifyingQuestion,
  TaskPlan,
  TaskPlanStep,
  CoachQuestionConfig
} from '../../types';
import {
  analyzeTaskForPlanning,
  generateClarifyingQuestions,
  generateTaskPlan,
  assessComplexity
} from '../../services/geminiService';

// Examples for the entry screen
const EXAMPLES = [
  "Prepare a board presentation from Q4 data",
  "Write a project proposal for a new initiative",
  "Create a competitive analysis for my team",
  "Build an annual financial report from monthly reviews",
];

// Initial input from generator (if user came from the bridge)
interface TaskPlannerInput {
  task: string;
  audience: string;
  goal: string;
  tool: string;
}

// Initial state
const initialState: TaskPlannerState = {
  userInput: '',
  understanding: null,
  clarifyingQuestions: [],
  answers: {},
  complexity: null,
  plan: null,
  singlePrompt: null,
  currentPhase: 'input',
  isLoading: false,
  error: null
};

export default function TaskPlannerPage() {
  const [state, setState] = useState<TaskPlannerState>(initialState);
  const [thinkingStep, setThinkingStep] = useState<TaskPlanStep | null>(null);
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);

  // Helper to update state
  const updateState = (updates: Partial<TaskPlannerState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Check if user came from generator with pre-filled context
  useEffect(() => {
    const storedInput = sessionStorage.getItem('taskPlannerInput');
    if (storedInput) {
      try {
        const parsed: TaskPlannerInput = JSON.parse(storedInput);
        updateState({ userInput: parsed.task });
        sessionStorage.removeItem('taskPlannerInput');
      } catch (e) {
        console.error('Failed to parse stored input:', e);
      }
    }
  }, []);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Handle initial submission - analyze the task
   */
  const handleSubmit = async () => {
    if (!state.userInput.trim()) return;

    updateState({ isLoading: true, error: null });

    try {
      // Analyze the task
      const understanding = await analyzeTaskForPlanning(state.userInput);

      // Check complexity in parallel
      const complexityResult = await assessComplexity(state.userInput);

      // If simple task, we could show SimpleBridge here
      // For now, continue to understanding phase
      updateState({
        understanding,
        complexity: complexityResult.complexity,
        currentPhase: 'understanding',
        isLoading: false
      });
    } catch (error) {
      console.error('Error analyzing task:', error);
      updateState({
        error: 'Failed to analyze your task. Please try again.',
        isLoading: false
      });
    }
  };

  /**
   * Handle confirming the understanding is correct
   */
  const handleConfirmUnderstanding = async () => {
    if (!state.understanding) return;

    updateState({ isLoading: true, error: null });

    try {
      // Generate clarifying questions
      const questions = await generateClarifyingQuestions(state.understanding);

      if (questions.length > 0) {
        // Has questions - go to questions phase
        updateState({
          clarifyingQuestions: questions,
          currentPhase: 'questions',
          isLoading: false
        });
      } else {
        // No questions needed - go straight to generating
        await handleGeneratePlan();
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      // If question generation fails, just proceed to plan generation
      await handleGeneratePlan();
    }
  };

  /**
   * Handle wanting to clarify the understanding
   */
  const handleClarifyUnderstanding = () => {
    // Go back to input phase with the current text
    updateState({ currentPhase: 'input' });
  };

  /**
   * Handle answering a clarifying question
   */
  const handleQuestionAnswer = (questionId: string, value: string) => {
    updateState({
      answers: { ...state.answers, [questionId]: value }
    });
  };

  /**
   * Handle skipping a question
   */
  const handleQuestionSkip = (questionId: string) => {
    // Mark as skipped
    updateState({
      answers: { ...state.answers, [questionId]: '' }
    });
  };

  /**
   * Handle submitting answers and generating the plan
   */
  const handleSubmitAnswers = async () => {
    await handleGeneratePlan();
  };

  /**
   * Generate the task plan
   */
  const handleGeneratePlan = async () => {
    if (!state.understanding) return;

    updateState({ currentPhase: 'generating', isLoading: true, error: null });

    try {
      const plan = await generateTaskPlan(state.understanding, state.answers);

      updateState({
        plan,
        currentPhase: 'output',
        isLoading: false
      });
    } catch (error) {
      console.error('Error generating plan:', error);
      updateState({
        error: 'Failed to generate your plan. Please try again.',
        currentPhase: 'questions', // Go back to questions if there were any
        isLoading: false
      });
    }
  };

  /**
   * Start over from the beginning
   */
  const handleStartOver = () => {
    setState(initialState);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Convert ClarifyingQuestion to CoachQuestionConfig format
   */
  const toCoachQuestion = (q: ClarifyingQuestion): CoachQuestionConfig => ({
    question: q.question,
    options: q.options,
    allowSkip: true,
    allowCustom: q.allowCustom
  });

  /**
   * Check if all questions are answered (or skipped)
   */
  const allQuestionsAnswered = () => {
    return state.clarifyingQuestions.every(q =>
      state.answers[q.id] !== undefined
    );
  };

  // ============================================================================
  // PHASE RENDERS
  // ============================================================================

  /**
   * Input phase - user describes their task
   */
  const renderInputPhase = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 text-blue-700">
        <div className="p-2 bg-blue-100 rounded-full">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold">Task Planner</h2>
      </div>

      {/* Intro text */}
      <p className="text-slate-600 leading-relaxed">
        Tell me what you're trying to accomplish, and I'll help you figure out the best way to get it done.
        I'll create a step-by-step plan showing where AI can help, what's best handled by you, and common pitfalls to avoid.
      </p>

      {/* Input area */}
      <Card className="p-0 overflow-hidden">
        <textarea
          className="w-full p-5 border-0 focus:ring-0 text-base text-slate-900 bg-white placeholder:text-slate-400 min-h-[180px] resize-none leading-relaxed"
          placeholder="I need to create an annual financial report and presentation from 12 monthly reviews for my VP..."
          value={state.userInput}
          onChange={(e) => updateState({ userInput: e.target.value })}
          autoFocus
          disabled={state.isLoading}
        />
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {state.userInput.length > 0 && `${state.userInput.length} characters`}
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!state.userInput.trim() || state.isLoading}
            isLoading={state.isLoading}
          >
            Let's plan this
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Examples */}
      <div>
        <p className="text-sm text-slate-500 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Examples:
        </p>
        <div className="space-y-2">
          {EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => updateState({ userInput: example })}
              className="block w-full text-left px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors disabled:opacity-50"
              disabled={state.isLoading}
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>

      {/* Error display */}
      {state.error && (
        <Callout variant="danger" title="Error">
          {state.error}
        </Callout>
      )}
    </div>
  );

  /**
   * Understanding phase - show what AI understood
   */
  const renderUnderstandingPhase = () => {
    if (!state.understanding) return null;

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => updateState({ currentPhase: 'input' })}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to edit
        </button>

        <UnderstandingCard
          understanding={state.understanding}
          onConfirm={handleConfirmUnderstanding}
          onClarify={handleClarifyUnderstanding}
          isLoading={state.isLoading}
        />

        {/* Simple task indicator */}
        {state.complexity === 'simple' && (
          <Callout variant="info" title="Quick heads up">
            This looks like a straightforward task. You might not need a full plan -
            but I'll build one if you'd like to see the approach.
          </Callout>
        )}

        {/* Error display */}
        {state.error && (
          <Callout variant="danger" title="Error">
            {state.error}
          </Callout>
        )}
      </div>
    );
  };

  /**
   * Questions phase - clarifying questions (max 2)
   */
  const renderQuestionsPhase = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => updateState({ currentPhase: 'understanding' })}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            A couple things that'll help me build your plan
          </h3>
          <p className="text-sm text-slate-500">
            {state.clarifyingQuestions.length === 1
              ? 'One quick question before I generate your plan.'
              : 'Just a couple questions to make your plan more useful.'}
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {state.clarifyingQuestions.map((question, index) => (
            <div key={question.id}>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Question {index + 1} of {state.clarifyingQuestions.length}
              </div>
              <CoachQuestion
                question={toCoachQuestion(question)}
                onAnswer={(value) => handleQuestionAnswer(question.id, value)}
                onSkip={() => handleQuestionSkip(question.id)}
                currentValue={state.answers[question.id]}
              />
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitAnswers}
            disabled={state.isLoading}
            isLoading={state.isLoading}
          >
            Build my plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Error display */}
        {state.error && (
          <Callout variant="danger" title="Error">
            {state.error}
          </Callout>
        )}
      </div>
    );
  };

  /**
   * Generating phase - loading state
   */
  const renderGeneratingPhase = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-blue-100 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Building your plan...
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            I'm analyzing your task and creating a step-by-step plan with prompts you can use.
          </p>
        </div>
      </Card>
    </div>
  );

  /**
   * Handle opening the thinking assistant for a step
   */
  const handleHelpMeThink = (step: TaskPlanStep) => {
    setThinkingStep(step);
    setIsThinkingOpen(true);
  };

  /**
   * Handle plan adjustments
   */
  const handleAdjustPlan = async (adjustment: string) => {
    if (!state.plan) return;
    setIsAdjusting(true);

    // For now, just regenerate the plan with the adjustment as additional context
    // In a full implementation, we'd have a dedicated adjustPlan service
    try {
      const updatedPlan = await generateTaskPlan(state.understanding!, {
        ...state.answers,
        adjustment
      });
      updateState({ plan: updatedPlan });
    } catch (error) {
      console.error('Error adjusting plan:', error);
    }
    setIsAdjusting(false);
  };

  /**
   * Output phase - show the generated plan
   */
  const renderOutputPhase = () => {
    if (!state.plan) return null;

    return (
      <div className="space-y-6 animate-fade-in">
        <TaskPlanView
          plan={state.plan}
          onStartOver={handleStartOver}
          onHelpMeThink={handleHelpMeThink}
        />

        {/* Plan adjustments */}
        <PlanAdjustments
          onAdjust={handleAdjustPlan}
          isLoading={isAdjusting}
        />
      </div>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <PageLayout
      title="Task Planner"
      description="Tell me what you're trying to accomplish, and I'll help you figure out the best way to get it done."
    >
      <div className="max-w-2xl mx-auto pb-20">
        {state.currentPhase === 'input' && renderInputPhase()}
        {state.currentPhase === 'understanding' && renderUnderstandingPhase()}
        {state.currentPhase === 'questions' && renderQuestionsPhase()}
        {state.currentPhase === 'generating' && renderGeneratingPhase()}
        {state.currentPhase === 'output' && renderOutputPhase()}
      </div>

      {/* Thinking Assistant Modal */}
      <ThinkingAssistant
        isOpen={isThinkingOpen}
        onClose={() => {
          setIsThinkingOpen(false);
          setThinkingStep(null);
        }}
        step={thinkingStep}
      />
    </PageLayout>
  );
}
