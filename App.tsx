
import React from 'react';
import { RouterProvider, useRouter } from './lib/routerContext';
import RootLayout from './app/layout';

// Pages
import HomePage from './app/page';
import QuickStartPage from './app/quick-start/page';
import ModulesPage from './app/modules/page';
import ModulesFundamentalsPage from './app/modules/fundamentals/page';
import ModulesPromptingPage from './app/modules/prompting/page';
import ModulesWorkflowPage from './app/modules/workflow/page';
import ModulesResponsibleUsePage from './app/modules/responsible-use/page';
// NEW: Import the Hub Page
import ModulesToolsOverviewPage from './app/modules/tools-overview/page';

import ReferencePage from './app/reference/page';
import PolicyQuickViewPage from './app/reference/policy-quick-view/page';
import ReferencePromptingGuidePage from './app/reference/prompting-guide/page';
import PlaygroundPage from './app/playground/page';
import AdvancedPage from './app/advanced/page';

const RouteHandler = () => {
  const { path } = useRouter();

  // Simple exact match router
  if (path === '/') return <HomePage />;
  if (path === '/quick-start') return <QuickStartPage />;
  
  // Modules
  if (path === '/modules') return <ModulesPage />;
  if (path === '/modules/fundamentals') return <ModulesFundamentalsPage />;
  if (path === '/modules/prompting') return <ModulesPromptingPage />;
  if (path === '/modules/workflow') return <ModulesWorkflowPage />;
  if (path === '/modules/responsible-use') return <ModulesResponsibleUsePage />;
  
  // NEW: Route for Tools Overview
  if (path === '/modules/tools-overview') return <ModulesToolsOverviewPage />;
  
  // Fallback for demo: any other module goes to main list
  if (path.startsWith('/modules/')) return <ModulesPage />; 
  
  // Reference
  if (path === '/reference') return <ReferencePage />;
  if (path === '/reference/policy-quick-view') return <PolicyQuickViewPage />;
  if (path === '/reference/prompting-guide') return <ReferencePromptingGuidePage />;
  
  if (path === '/playground') return <PlaygroundPage />;
  if (path === '/advanced') return <AdvancedPage />;

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
