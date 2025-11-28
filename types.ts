import React from 'react';

export type View = 'home' | 'quick-start' | 'modules' | 'reference';

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string; // Lucide icon name
  locked?: boolean;
}

export interface QuickStartStep {
  id: number;
  title: string;
  content: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SafetyStatus {
  SAFE = 'safe',
  WARNING = 'warning',
  DANGER = 'danger'
}