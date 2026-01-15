import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CoachQuestion } from '../components/CoachQuestion';
import type { CoachQuestionConfig } from '../types';

const mockQuestion: CoachQuestionConfig = {
  question: "Who's going to read this?",
  options: [
    { label: 'Board / Executives', value: 'board and executives' },
    { label: 'My team', value: 'my team' },
    { label: 'Clients', value: 'external clients' },
  ],
  allowCustom: true,
  allowSkip: true,
};

describe('CoachQuestion', () => {
  it('renders the question text', () => {
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
      />
    );

    expect(screen.getByText("Who's going to read this?")).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
      />
    );

    expect(screen.getByText('Board / Executives')).toBeInTheDocument();
    expect(screen.getByText('My team')).toBeInTheDocument();
    expect(screen.getByText('Clients')).toBeInTheDocument();
  });

  it('calls onAnswer when an option is clicked', () => {
    const onAnswer = vi.fn();
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={onAnswer}
        onSkip={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Board / Executives'));

    expect(onAnswer).toHaveBeenCalledWith('board and executives');
  });

  it('shows skip button when allowSkip is true', () => {
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
      />
    );

    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('calls onSkip when skip is clicked', () => {
    const onSkip = vi.fn();
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={vi.fn()}
        onSkip={onSkip}
      />
    );

    fireEvent.click(screen.getByText('Skip'));

    expect(onSkip).toHaveBeenCalled();
  });

  it('hides skip button when allowSkip is false', () => {
    const questionNoSkip = { ...mockQuestion, allowSkip: false };
    render(
      <CoachQuestion
        question={questionNoSkip}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
      />
    );

    expect(screen.queryByText('Skip')).not.toBeInTheDocument();
  });

  it('shows custom input button when allowCustom is true', () => {
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
      />
    );

    expect(screen.getByText('Type your own...')).toBeInTheDocument();
  });

  it('hides custom input button when allowCustom is false', () => {
    const questionNoCustom = { ...mockQuestion, allowCustom: false };
    render(
      <CoachQuestion
        question={questionNoCustom}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
      />
    );

    expect(screen.queryByText('Type your own...')).not.toBeInTheDocument();
  });

  it('shows custom input field when Type your own is clicked', () => {
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Type your own...'));

    expect(screen.getByPlaceholderText('Type your answer...')).toBeInTheDocument();
  });

  it('highlights selected option', () => {
    render(
      <CoachQuestion
        question={mockQuestion}
        onAnswer={vi.fn()}
        onSkip={vi.fn()}
        currentValue="board and executives"
      />
    );

    const selectedButton = screen.getByText('Board / Executives');
    expect(selectedButton).toHaveClass('bg-blue-600');
  });
});
