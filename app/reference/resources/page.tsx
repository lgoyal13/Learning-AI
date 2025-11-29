import React from 'react';
import { PageLayout, Heading, Card, Button } from '../../../components/ui';
import { useRouter } from '../../../lib/routerContext';

export default function ResourceLibraryStubPage() {
  const { push } = useRouter();

  return (
    <PageLayout
      title="Resource Library"
      description="Curated videos, guides, and docs to level up your AI skills."
    >
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card className="p-6 md:p-8">
          <Heading level={2} className="text-lg mb-3">
            We are still building this space
          </Heading>
          <p className="text-sm text-slate-700 mb-3 leading-relaxed">
            The Resource Library will collect our favorite deep dives, creator videos, and official docs on tools like Gemini, NotebookLM, and Perplexity.
          </p>
          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
            For now, you can get a lot of value from the Prompt Template Library and the Prompting Guide in the main Reference hub.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => push('/reference')}>
              Back to Reference & Cheat Sheets
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}