import React from 'react';
import { Card, Badge, Button, PageLayout } from '../../components/ui';
import { useRouter } from '../../lib/routerContext';
import { 
  BookOpen, 
  Shield, 
  MessageSquare, 
  Briefcase, 
  Lock, 
  ArrowRight, 
  Globe, 
  Zap, 
  Layers, 
  PenTool, 
  Cpu, 
  Workflow 
} from 'lucide-react';
import { Module } from '../../types';

// Extended Module type locally to include path
interface ModuleWithRoute extends Omit<Module, 'icon'> {
  icon: string;
  path: string;
  tag?: string;
  tagVariant?: 'blue' | 'warning' | 'neutral' | 'success';
}

interface Track {
  id: string;
  title: string;
  description: string;
  modules: ModuleWithRoute[];
}

export default function Page() {
  const { push } = useRouter();

  const tracks: Track[] = [
    {
      id: 'core',
      title: 'Core Skillset: Foundations',
      description: 'Build the fundamentals first. These modules explain what AI is actually doing, how to stay safe, and how to talk to it like a capable teammate.',
      modules: [
        {
          id: 'fundamentals',
          title: 'AI Fundamentals & Safe Use',
          description: 'Understand what modern AI is actually doing under the hood, why it sometimes makes things up, and the simple habits that keep you safe at work.',
          duration: '15 min',
          icon: 'BookOpen',
          path: '/modules/fundamentals',
          tag: 'Start here',
          tagVariant: 'blue',
          locked: false
        },
        {
          id: 'prompting',
          title: 'Prompting Foundations',
          description: 'Learn the PCTR pattern and how to talk to AI like a capable intern. Practice turning vague asks into clear tasks and running reliable back-and-forth conversations.',
          duration: '20 min',
          icon: 'MessageSquare',
          path: '/modules/prompting',
          tag: 'Core Prompting',
          tagVariant: 'success',
          locked: false
        },
        {
          id: 'workflow',
          title: 'Modern Chatbots & Modes',
          description: 'See how fast vs deep modes work in practice, when to turn on web search or Deep Research, and how to use attachments and screenshots as part of your prompt.',
          duration: '20 min',
          icon: 'Zap',
          path: '/modules/workflow',
          tag: 'Fast vs Deep',
          tagVariant: 'neutral',
          locked: false
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Deep Dives',
      description: 'Once the core skills feel natural, these modules show you how power users combine chat, research engines, and your-docs tools to do real projects.',
      modules: [
        {
          id: 'tools-overview',
          title: 'Tools Overview: Your AI Toolkit',
          description: 'Get the high-level map. Learn the four job types (chat, research, your docs, builders) and play a quick "which tool should I use?" game.',
          duration: '15 min',
          icon: 'Briefcase',
          path: '/modules/tools-overview',
          locked: false
        },
        {
          id: 'tool-research',
          title: 'Research & Web',
          description: 'Use Perplexity and Deep Research features for live web research, market scans, and competitive intel with citations you can click and check.',
          duration: '15 min',
          icon: 'Globe',
          path: '/modules/tool-research',
          locked: false
        },
        {
          id: 'tool-documents',
          title: 'Your Documents (NotebookLM)',
          description: 'Turn piles of PDFs, decks, and notes into a private research space with NotebookLM and similar "your docs" tools.',
          duration: '15 min',
          icon: 'Layers',
          path: '/modules/tool-documents',
          locked: false
        },
        {
          id: 'tool-builder',
          title: 'Gemini & Workspace',
          description: 'Use Gemini for briefings with links, inside Docs, Sheets, Gmail, and Slides, and experiment with its image and video tools for internal campaigns.',
          duration: '20 min',
          icon: 'PenTool',
          path: '/modules/tool-builder',
          locked: false
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced & Coming Soon',
      description: 'For power users who want to turn good prompts into reusable workflows and pilots. These are optional and may require extra approvals.',
      modules: [
        {
          id: 'advanced-hub',
          title: 'Advanced Workflows & Pilots',
          description: 'Explore early pilots, advanced workflows, and automation experiments. Best for champions and people who already live in the tools.',
          duration: 'Ongoing',
          icon: 'Cpu',
          path: '/advanced',
          tag: 'Advanced',
          tagVariant: 'warning',
          locked: false
        },
        {
          id: 'automation-future',
          title: 'Workflow Automation',
          description: 'Future modules on connecting AI to other tools and automating parts of your job.',
          duration: 'TBD',
          icon: 'Workflow',
          path: '',
          locked: true
        }
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Workflow': return <Workflow className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <PageLayout 
      title="Learning modules" 
      description="Explore the core skills first, then dive into tools and advanced workflows. You can hop around, but most people start with the foundations."
    >
      {/* Hero Buttons */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Button onClick={() => push('/quick-start')} size="md">
            Start Prompting Quickstart <Zap className="w-4 h-4 ml-2" />
          </Button>
          <Button onClick={() => push('/reference')} variant="outline" size="md">
            Browse Prompt Templates <BookOpen className="w-4 h-4 ml-2" />
          </Button>
          <Button onClick={() => push('/reference/resources')} variant="outline" size="md">
            See Advanced Resources <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="space-y-16">
        {tracks.map((track) => (
          <section key={track.id} className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{track.title}</h2>
              <p className="text-lg text-slate-600 mt-2 max-w-3xl">
                {track.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {track.modules.map((module) => (
                <Card 
                  key={module.id} 
                  className={`group h-full flex flex-col ${module.locked ? 'opacity-75 bg-slate-50' : 'bg-white'}`}
                  hover={!module.locked}
                  onClick={() => !module.locked && push(module.path)}
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-lg ${module.locked ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                        {getIcon(module.icon)}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {module.tag && (
                          <Badge variant={module.tagVariant || 'neutral'}>{module.tag}</Badge>
                        )}
                        <Badge variant={module.locked ? 'neutral' : 'success'}>
                          {module.locked ? <Lock className="w-3 h-3 mr-1 inline" /> : null}
                          {module.locked ? 'Coming Soon' : module.duration}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                      {module.description}
                    </p>

                    <Button 
                      variant={module.locked ? 'secondary' : 'outline'} 
                      className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200"
                      disabled={module.locked}
                    >
                      {module.locked ? 'Not available yet' : 'Start module'}
                      {!module.locked && <ArrowRight className="w-4 h-4" />}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}