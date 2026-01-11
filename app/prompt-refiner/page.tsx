import React from 'react';
import { PageLayout } from '../../components/ui';
import PromptRefiner from '../../components/PromptRefiner';

export default function PromptRefinerPage() {
  return (
    <PageLayout
      title="Prompt Refiner"
      description="Paste your prompt and get instant feedback based on the PCTR framework. Learn how to write prompts that actually work."
    >
      <PromptRefiner />
    </PageLayout>
  );
}
