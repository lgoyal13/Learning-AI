import React from 'react';
import { PageLayout, Heading, Card, Callout, PromptCard, Button, Badge } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { Shield, ArrowRight, Video, FileText, Book, ExternalLink, Youtube, Clock, Target, BookOpen, Users, Map } from 'lucide-react';

export default function Page() {
  const { push } = useRouter();

  return (
    <PageLayout 
      title="Quick Reference Guide" 
      description="Approved tools, safety rules, and prompt templates for your daily work."
      actions={
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => push('/reference/prompting-guide')}>
             Prompting Guide
          </Button>
          <Button variant="outline" onClick={() => push('/reference/policy-quick-view')}>
             Policy Check
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          
          <section>
            <Heading level={2} className="mb-4">Common Templates</Heading>
            <div className="space-y-4">
              <PromptCard 
                label="Email Draft"
                prompt="Draft a polite but firm email to a client explaining that we need the signed contract before we can start work. Reference section 2.1 of the proposal." 
              />
              <PromptCard 
                label="Summarization"
                prompt="Summarize the following meeting notes into a chronological list of action items. Highlight any deadlines that are at risk." 
              />
            </div>
          </section>

          <section>
            <Heading level={2} className="mb-4">Approved Use Cases</Heading>
            <Card className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    <li>Drafting internal emails</li>
                    <li>Brainstorming marketing copy</li>
                    <li>Summarizing <i>anonymized</i> feedback</li>
                    <li>Explaining complex excel formulas</li>
                 </ul>
                 <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    <li>Debugging SQL queries</li>
                    <li>Rephrasing technical jargon for clients</li>
                    <li>Meeting agenda creation</li>
                    <li>Role-playing difficult conversations</li>
                 </ul>
              </div>
            </Card>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="bg-blue-50 border-blue-200 p-6">
             <div className="flex items-center gap-2 mb-2 font-bold text-blue-900">
                <Shield className="w-5 h-5" />
                Policy Quick View
             </div>
             <p className="text-sm text-blue-800 mb-4">
               Not sure if it's safe? Check the Red/Yellow/Green list before you prompt.
             </p>
             <Button size="sm" className="w-full" onClick={() => push('/reference/policy-quick-view')}>
               View Rules <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
          </Card>

          <Callout variant="danger" title="Strictly Prohibited">
            <ul className="space-y-2 text-sm mt-2">
              <li>❌ Account Numbers</li>
              <li>❌ Client Names</li>
              <li>❌ Social Security Numbers</li>
              <li>❌ Employee Salaries</li>
              <li>❌ Confidential Strategy</li>
            </ul>
          </Callout>
          
          <Callout variant="success" title="Approved Tools">
            <ul className="space-y-2 text-sm mt-2">
              <li>✅ Internal Gemini Chat</li>
              <li>✅ GitHub Copilot (Devs only)</li>
              <li>✅ Microsoft Copilot (Enterprise)</li>
            </ul>
          </Callout>
        </div>
      </div>

      <hr className="my-12 border-slate-200" />

      {/* NEW: Rich Resource Library Section (merged from resources/page.tsx) */}
      <section>
        <div className="mb-6">
          <Heading level={2}>Resource Library</Heading>
          <p className="text-slate-600 mt-2 max-w-3xl">
            Go deeper with curated videos, guides, and docs from expert creators and official sources. 
            This is your launchpad for mastering AI tools and frameworks beyond this training.
          </p>
        </div>

        {/* 1) Intro: Learn from Expert Creators */}
        <section className="mb-10">
          <Heading level={3} className="mb-4">Learn from Expert Creators</Heading>
          <p className="text-slate-600 text-lg leading-relaxed max-w-4xl">
            We have curated the best external resources to help you go deeper. This library features
            content from top AI educators like <strong>Tina Huang</strong> and <strong>Jeff Su</strong>,
            alongside official documentation from Google. Whether you are looking for career strategy
            or technical tool mastery, start here.
          </p>
        </section>

        {/* 2) Featured Creators */}
        <section className="mb-12">
          <Heading level={3} className="mb-6">Featured Creators</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tina Huang */}
            <Card className="p-6 border-t-4 border-t-blue-500 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">Tina Huang</h3>
                  <p className="text-sm text-slate-500">AI Skills & Practical Tool Mastery</p>
                </div>
              </div>
              <ul className="space-y-2 text-slate-600 mb-6 flex-1">
                <li className="flex gap-2 items-start"><span className="text-blue-500">•</span> Prompt engineering frameworks (TCRE)</li>
                <li className="flex gap-2 items-start"><span className="text-blue-500">•</span> Google AI tools deep dives (Gemini, AI Studio)</li>
                <li className="flex gap-2 items-start"><span className="text-blue-500">•</span> Vibe coding for non-technical users</li>
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open('https://www.youtube.com/@TinaHuang1', '_blank')}
              >
                View YouTube Channel <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Jeff Su */}
            <Card className="p-6 border-t-4 border-t-purple-500 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">Jeff Su</h3>
                  <p className="text-sm text-slate-500">Career Strategy & AI Upskilling</p>
                </div>
              </div>
              <ul className="space-y-2 text-slate-600 mb-6 flex-1">
                <li className="flex gap-2 items-start"><span className="text-purple-500">•</span> Career advancement through AI skills</li>
                <li className="flex gap-2 items-start"><span className="text-purple-500">•</span> Productivity hacks for daily work</li>
                <li className="flex gap-2 items-start"><span className="text-purple-500">•</span> Resume optimization & interview prep</li>
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open('https://www.youtube.com/@JeffSu', '_blank')}
              >
                View YouTube Channel <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </section>

        {/* 3) Recommended Learning Path */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Map className="w-6 h-6 text-slate-700" />
            <Heading level={3}>Recommended Learning Path (~3 Hours)</Heading>
          </div>
          <p className="text-slate-600 mb-6">
            Follow these resources in order to build a complete skillset, from mindset to advanced application.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-medium text-xs">
                  <tr>
                    <th className="px-6 py-4">Stage</th>
                    <th className="px-6 py-4">Resource Title</th>
                    <th className="px-6 py-4">Creator</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Goal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">1. Foundations</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      Every Essential AI Skill in 25 Minutes
                    </td>
                    <td className="px-6 py-4">Tina Huang</td>
                    <td className="px-6 py-4">25 min</td>
                    <td className="px-6 py-4 text-slate-600">
                      Understand what AI skills matter in 2025.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">2. Practical Tool Mastery</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      Google AI Studio In 26 Minutes
                    </td>
                    <td className="px-6 py-4">Tina Huang</td>
                    <td className="px-6 py-4">26 min</td>
                    <td className="px-6 py-4 text-slate-600">
                      Master prompt engineering frameworks (TCRE).
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">3. Ecosystem Overview</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      Everything Free You Can Do With Gemini
                    </td>
                    <td className="px-6 py-4">Tina Huang</td>
                    <td className="px-6 py-4">35 min</td>
                    <td className="px-6 py-4 text-slate-600">
                      Know which tool solves which problem.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">4. Career Alignment</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      Career Strategy Content
                    </td>
                    <td className="px-6 py-4">Jeff Su</td>
                    <td className="px-6 py-4">20-30 min</td>
                    <td className="px-6 py-4 text-slate-600">
                      Understand ROI and personal motivation.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">5. Advanced Topics</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      Firebase Studio & AI Agents
                    </td>
                    <td className="px-6 py-4">Tina Huang</td>
                    <td className="px-6 py-4">30-45 min</td>
                    <td className="px-6 py-4 text-slate-600">
                      Build custom solutions and automation.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">6. Practice & Feedback</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      Interactive Sandbox + Templates
                    </td>
                    <td className="px-6 py-4">Your Platform</td>
                    <td className="px-6 py-4">60+ min</td>
                    <td className="px-6 py-4 text-slate-600">
                      Apply frameworks to real tasks.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4) Videos & Key Frameworks */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-6 h-6 text-slate-700" />
            <Heading level={3}>Videos & Key Frameworks</Heading>
          </div>
          <p className="text-slate-600 mb-6">
            Specific videos that teach the acronyms and mental models we use in our internal training (TCRE, RHSTI, etc.).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Video 1 */}
            <Card
              className="p-4 bg-slate-50 hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => window.open('https://www.youtube.com/watch?v=13EPujO40iE', '_blank')}
            >
              <div className="text-xs font-bold text-slate-500 uppercase mb-2">
                Tina Huang • 26m
              </div>
              <h4 className="font-bold text-slate-900 mb-2 hover:text-blue-600 underline-offset-2 hover:underline">
                Google AI Studio In 26 Minutes
              </h4>
              <Badge variant="blue" className="mb-2">
                TCRE Framework
              </Badge>
              <p className="text-xs text-slate-600">
                Best for learning to prompt effectively.
              </p>
            </Card>

            {/* Video 2 */}
            <Card
              className="p-4 bg-slate-50 hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => window.open('https://www.youtube.com/watch?v=NDf0p5hgjvk', '_blank')}
            >
              <div className="text-xs font-bold text-slate-500 uppercase mb-2">
                Tina Huang • 35m
              </div>
              <h4 className="font-bold text-slate-900 mb-2 hover:text-blue-600 underline-offset-2 hover:underline">
                Everything Free You Can Do With Gemini
              </h4>
              <Badge variant="blue" className="mb-2">
                Ecosystem
              </Badge>
              <p className="text-xs text-slate-600">
                Best for tool selection and integration.
              </p>
            </Card>

            {/* Video 3 */}
            <Card
              className="p-4 bg-slate-50 hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => window.open('https://www.youtube.com/watch?v=nuEhBT31KQw', '_blank')}
            >
              <div className="text-xs font-bold text-slate-500 uppercase mb-2">
                Tina Huang • 25m
              </div>
              <h4 className="font-bold text-slate-900 mb-2 hover:text-blue-600 underline-offset-2 hover:underline">
                Every Essential AI Skill in 25 Minutes
              </h4>
              <Badge variant="blue" className="mb-2">
                Skills Priorities
              </Badge>
              <p className="text-xs text-slate-600">
                Best for quick orientation to 2025 AI landscape.
              </p>
            </Card>

            {/* Video 4 */}
            <Card
              className="p-4 bg-slate-50 hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => window.open('https://www.youtube.com/@JeffSu', '_blank')}
            >
              <div className="text-xs font-bold text-slate-500 uppercase mb-2">
                Jeff Su • Varies
              </div>
              <h4 className="font-bold text-slate-900 mb-2 hover:text-blue-600 underline-offset-2 hover:underline">
                Career Strategy Content Series
              </h4>
              <Badge variant="blue" className="mb-2">
                Career ROI
              </Badge>
              <p className="text-xs text-slate-600">
                Best for professional development alignment.
              </p>
            </Card>
          </div>
        </section>

        {/* 5) Guides & Official Docs */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-slate-700" />
            <Heading level={3}>Guides & Official Documentation</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <h4 className="font-bold text-slate-900 mb-2">HubSpot x Tina Huang Guide</h4>
              <p className="text-sm text-slate-600 mb-4">
                A comprehensive PDF guide on prompting strategies.
              </p>
              <a
                href="https://clickhubspot.com/yj4t"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                Download Guide <ExternalLink className="w-3 h-3" />
              </a>
            </Card>
            <Card className="p-6">
              <h4 className="font-bold text-slate-900 mb-2">Google AI Studio Docs</h4>
              <p className="text-sm text-slate-600 mb-4">
                Technical docs for API keys, system instructions, and tuning.
              </p>
              <a
                href="https://aistudio.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                Read Docs <ExternalLink className="w-3 h-3" />
              </a>
            </Card>
            <Card className="p-6">
              <h4 className="font-bold text-slate-900 mb-2">Gemini Web App</h4>
              <p className="text-sm text-slate-600 mb-4">
                The standard interface for AI assistance.
              </p>
              <a
                href="https://gemini.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                Visit Gemini <ExternalLink className="w-3 h-3" />
              </a>
            </Card>
            <Card className="p-6">
              <h4 className="font-bold text-slate-900 mb-2">Perplexity AI</h4>
              <p className="text-sm text-slate-600 mb-4">
                Free research tool with citations.
              </p>
              <a
                href="https://www.perplexity.ai"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                Visit Perplexity <ExternalLink className="w-3 h-3" />
              </a>
            </Card>
          </div>
        </section>

        {/* 6) How to Use This Page */}
        <section className="mb-12 bg-slate-100 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-slate-700" />
                <h3 className="font-bold text-lg text-slate-900">For Learners</h3>
              </div>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="bg-slate-200 text-slate-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    1
                  </span>
                  <span>
                    Start with Tina&apos;s <strong>&quot;Every Essential AI Skill in 25 Minutes&quot;</strong>.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-slate-200 text-slate-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    2
                  </span>
                  <span>
                    Move to <strong>&quot;Google AI Studio In 26 Minutes&quot;</strong> and then the <strong>&quot;Gemini&quot;</strong> overview.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-slate-200 text-slate-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    3
                  </span>
                  <span>
                    Add Jeff Su&apos;s content for career alignment and practice in the sandbox.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-slate-700" />
                <h3 className="font-bold text-lg text-slate-900">For Instructors / Managers</h3>
              </div>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="bg-slate-200 text-slate-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    1
                  </span>
                  <span>Watch core videos to understand frameworks.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-slate-200 text-slate-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    2
                  </span>
                  <span>Assign the <strong>HubSpot Guide</strong> as pre-reading for workshops.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-slate-200 text-slate-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    3
                  </span>
                  <span>Reference frameworks consistently and credit creators in your resources.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </PageLayout>
  );
}
