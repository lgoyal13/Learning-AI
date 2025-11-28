import React, { useState } from 'react';
import { useRouter } from '../lib/routerContext';
import { LayoutDashboard, Zap, BookOpen, Book, Menu, X, ShieldCheck, Layers } from 'lucide-react';

export default function RootLayout({ children }: { children?: React.ReactNode }) {
  const { path, push } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const isActive = path === href || (href !== '/' && path.startsWith(href));
    return (
      <button
        onClick={() => {
          push(href);
          setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => push('/')}>
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight">Enterprise<span className="text-blue-600">AI</span></h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
          <NavItem href="/quick-start" icon={<Zap className="w-5 h-5" />} label="Quick Start" />
          <NavItem href="/modules" icon={<Book className="w-5 h-5" />} label="Learning Modules" />
          <NavItem href="/reference" icon={<ShieldCheck className="w-5 h-5" />} label="Reference Guide" />
          <NavItem href="/advanced" icon={<Layers className="w-5 h-5" />} label="Advanced" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-500 font-medium uppercase mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-700">System Operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2" onClick={() => push('/')}>
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg text-slate-900">Enterprise AI</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-16 px-4 md:hidden">
           <nav className="space-y-2">
            <NavItem href="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
            <NavItem href="/quick-start" icon={<Zap className="w-5 h-5" />} label="Quick Start" />
            <NavItem href="/modules" icon={<Book className="w-5 h-5" />} label="Learning Modules" />
            <NavItem href="/reference" icon={<ShieldCheck className="w-5 h-5" />} label="Reference Guide" />
            <NavItem href="/advanced" icon={<Layers className="w-5 h-5" />} label="Advanced" />
           </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 md:p-8 pt-20 p-4">
        {children}
      </main>
    </div>
  );
}