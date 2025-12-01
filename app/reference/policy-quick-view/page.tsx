import React from 'react';
import { PageLayout, Card, Callout, Heading, Badge } from '../../../components/ui';
import { ShieldCheck, ShieldAlert, ShieldX, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function Page() {
  return (
    <PageLayout 
      title="Policy Quick View" 
      description="Can I use AI for this? A quick reference for daily decisions."
    >
      <div className="mb-8">
        <p className="text-lg text-slate-700">
          Use this page as a quick traffic light check before you paste information into an AI tool.
        </p>
      </div>
      
      {/* SECTION 1: TRAFFIC LIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-t-4 border-t-green-500 bg-green-50/30">
          <div className="flex items-center gap-2 mb-4">
             <ShieldCheck className="w-6 h-6 text-green-600" />
             <h2 className="text-xl font-bold text-green-800">GREEN (Go)</h2>
          </div>
          <p className="text-sm font-bold text-slate-800 mb-4">Safe, routine uses you can do today.</p>
          <ul className="space-y-2 text-sm text-slate-800">
             <li className="flex gap-2">✅ Summarize public documents.</li>
             <li className="flex gap-2">✅ Draft internal emails without names.</li>
             <li className="flex gap-2">✅ Brainstorm marketing concepts.</li>
             <li className="flex gap-2">✅ Explain code snippets.</li>
          </ul>
        </Card>

        <Card className="border-t-4 border-t-yellow-500 bg-yellow-50/30">
          <div className="flex items-center gap-2 mb-4">
             <ShieldAlert className="w-6 h-6 text-yellow-600" />
             <h2 className="text-xl font-bold text-yellow-800">YELLOW (Caution)</h2>
          </div>
          <p className="text-sm font-bold text-slate-800 mb-4">Uses where you must slow down and follow extra steps.</p>
          <ul className="space-y-2 text-sm text-slate-800">
             <li className="flex gap-2">⚠️ Analyze anonymized meeting notes.</li>
             <li className="flex gap-2">⚠️ Draft client letters for review.</li>
             <li className="flex gap-2">⚠️ Upload internal PDFs to secure tools.</li>
          </ul>
        </Card>

        <Card className="border-t-4 border-t-red-500 bg-red-50/30">
          <div className="flex items-center gap-2 mb-4">
             <ShieldX className="w-6 h-6 text-red-600" />
             <h2 className="text-xl font-bold text-red-800">RED (Stop)</h2>
          </div>
          <p className="text-sm font-bold text-slate-800 mb-4">Uses that are not allowed with AI tools.</p>
          <ul className="space-y-2 text-sm text-slate-800">
             <li className="flex gap-2">❌ Do not upload PII or customer names.</li>
             <li className="flex gap-2">❌ Do not ask for hiring decisions.</li>
             <li className="flex gap-2">❌ Do not paste secrets or credentials.</li>
          </ul>
        </Card>
      </div>

      {/* SECTION 2: EVERYDAY EXAMPLES */}
      <section className="mb-12">
        <Heading level={2} className="mb-6">Everyday Examples</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">HR examples</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-green-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                Drafting a generic job description.
              </li>
              <li className="flex items-start gap-2 text-yellow-800">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                Summarizing anonymized interview notes.
              </li>
              <li className="flex items-start gap-2 text-red-800">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                Asking "Should I hire this person?".
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Member service examples</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-green-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                Drafting a template response for a FAQ.
              </li>
              <li className="flex items-start gap-2 text-yellow-800">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                Summarizing a call transcript with names removed.
              </li>
              <li className="flex items-start gap-2 text-red-800">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                Pasting a member's full claim history and address.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Internal reporting examples</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-green-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                Summarizing a published industry report.
              </li>
              <li className="flex items-start gap-2 text-yellow-800">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                Analyzing Q3 sales trends from internal data (secure tool only).
              </li>
              <li className="flex items-start gap-2 text-red-800">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                Uploading the unreleased strategic acquisition list to a public bot.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ */}
      <section className="mb-12">
        <Heading level={2} className="mb-6">Frequently Asked Questions</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Callout variant="info" title="Can I use ChatGPT?">
            Only the Enterprise version provided by IT. The free version on the open web learns from your data. Do not use it for company work.
          </Callout>
          <Callout variant="info" title="What if I delete the name?">
             Anonymization helps, but be careful with "quasi-identifiers" (e.g., "The Mayor of Chicago" is identifiable even without a name). When in doubt, leave it out.
          </Callout>
          <Callout variant="info" title="Can AI reject a candidate?">
             <strong>No.</strong> AI can draft the email or summarize the resume, but a human manager must review the file and make the hiring decision.
          </Callout>
          <Callout variant="info" title="How do I report an issue?">
             If you suspect a data leak or see a biased output, email the <strong>AI Governance Team</strong> immediately.
          </Callout>
        </div>
      </section>

    </PageLayout>
  );
}