import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PromptOutput } from '../components/PromptOutput';
import type { SimpleGeneratorOutput } from '../types';

const mockOutput: SimpleGeneratorOutput = {
  prompt: '**ROLE**\nSenior financial analyst\n\n**CONTEXT**\n- Creating a board presentation\n- Summarizing Q4 results\n\n**TASK**\nCreate a presentation with key metrics and recommendations\n\n**FORMAT**\nExecutive-level slides\n\n**INPUT**\n[INSERT: Your Q4 data here]',
  pctrBreakdown: {
    persona: 'Senior financial analyst sets professional expertise',
    context: 'Board audience means executive-level communication',
    task: 'Create presentation with specific deliverables',
    requirements: 'Include metrics and recommendations as structure',
  },
};

describe('PromptOutput', () => {
  it('renders the success header', () => {
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={vi.fn()}
        onRefine={vi.fn()}
      />
    );

    expect(screen.getByText('Your Prompt is Ready')).toBeInTheDocument();
  });

  it('displays the generated prompt with markdown formatting', () => {
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={vi.fn()}
        onRefine={vi.fn()}
      />
    );

    // Check that the ROLE header is rendered
    expect(screen.getByText('ROLE')).toBeInTheDocument();
  });

  it('shows the collapsible PCTR breakdown', () => {
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={vi.fn()}
        onRefine={vi.fn()}
      />
    );

    // The "Why this prompt works" button should be visible
    expect(screen.getByText('Why this prompt works')).toBeInTheDocument();
  });

  it('expands PCTR breakdown when clicked', () => {
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={vi.fn()}
        onRefine={vi.fn()}
      />
    );

    // Click to expand
    fireEvent.click(screen.getByText('Why this prompt works'));

    // Labels should use the new names
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Context')).toBeInTheDocument();
    expect(screen.getByText('Task')).toBeInTheDocument();
    expect(screen.getByText('Format')).toBeInTheDocument();
  });

  it('has a copy button', () => {
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={vi.fn()}
        onRefine={vi.fn()}
      />
    );

    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('copies prompt to clipboard when copy is clicked', async () => {
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={vi.fn()}
        onRefine={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Copy'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockOutput.prompt);
  });

  it('calls onReset when Start Over is clicked', () => {
    const onReset = vi.fn();
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={onReset}
        onRefine={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Start Over'));

    expect(onReset).toHaveBeenCalled();
  });

  it('calls onRefine when Refine is clicked', () => {
    const onRefine = vi.fn();
    render(
      <PromptOutput
        originalInput="Board presentation on Q4"
        output={mockOutput}
        onReset={vi.fn()}
        onRefine={onRefine}
      />
    );

    fireEvent.click(screen.getByText('Refine This Prompt'));

    expect(onRefine).toHaveBeenCalled();
  });
});
