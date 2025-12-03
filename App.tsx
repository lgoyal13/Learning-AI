import React from 'react';
import { RouterProvider, useRouter } from './lib/routerContext';
import RootLayout from './app/layout';

// Core Pages
import HomePage from './app/page';
import QuickStartPage from './app/quick-start/page';
import GeneratorPage from './app/generator/page';

// Modules
import ModulesPage from './app/modules/page';
import ModulesFundamentalsPage from './app/modules/fundamentals/page';
import ModulesPromptingPage from './app/modules/prompting/page';
import ModulesWorkflowPage from './app/modules/workflow/page';
import ModulesResponsibleUsePage from './app/modules/responsible-use/page';

// AI Tools Modules (hub + deep dives)
import ModulesToolsOverviewPage from './app/modules/tools-overview/page';
import ModulesToolsResearchPage from './app/modules/tool-research/page';
import ModulesToolsDocumentsPage from './app/modules/tool-documents/page';
import ModulesToolsBuilderPage from './app/modules/tool-builder/page';

// Reference & other tools
import ReferencePage from './app/reference/page';
import PolicyQuickViewPage from './app/reference/policy-quick-view/page';
import ReferencePromptingGuidePage from './app/reference/prompting-guide/page';
import AdvancedPage from './app/advanced/page';

const RouteHandler = () => {
  const { path } = useRouter();

  // Strip off any hash or query, just in case
  const cleanPath = path.split('#')[0].split('?')[0];

  // Top-level pages
  if (cleanPath === '/') return <HomePage />;
  if (cleanPath === '/quick-start') return <QuickStartPage />;
  if (cleanPath === '/generator') return <GeneratorPage />;

  // Core learning modules
  if (cleanPath === '/modules') return <ModulesPage />;
  if (cleanPath === '/modules/fundamentals') return <ModulesFundamentalsPage />;
  if (cleanPath === '/modules/prompting') return <ModulesPromptingPage />;
  if (cleanPath === '/modules/workflow') return <ModulesWorkflowPage />;
  if (cleanPath === '/modules/responsible-use') return <ModulesResponsibleUsePage />;

  // AI Tools & Research: hub + deep dives
  if (cleanPath === '/modules/tools-overview') return <ModulesToolsOverviewPage />;
  if (cleanPath === '/modules/tool-research') return <ModulesToolsResearchPage />;
  if (cleanPath === '/modules/tool-documents') return <ModulesToolsDocumentsPage />;
  if (cleanPath === '/modules/tool-builder') return <ModulesToolsBuilderPage />;

  // Reference section
  if (cleanPath === '/reference') return <ReferencePage />;
  if (cleanPath === '/reference/policy-quick-view') return <PolicyQuickViewPage />;
  if (cleanPath === '/reference/prompting-guide') return <ReferencePromptingGuidePage />;

  // Advanced tools
  if (cleanPath === '/advanced') return <AdvancedPage />;

  // Fallback – if nothing matched, send them home
  return <HomePage />;
};

export default function App() {
  return (
    <RouterProvider>
      <RootLayout>
        <RouteHandler />
      </RootLayout>
    </RouterProvider>
  );
}