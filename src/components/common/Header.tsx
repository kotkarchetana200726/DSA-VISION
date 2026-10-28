import React from 'react';
import { NavSection } from './Sidebar';
import { Menu, Search, Flame, Sparkles, Code2, BookOpen, Layers } from 'lucide-react';
import { getStoredProgress } from '../../services/storage';

interface HeaderProps {
  currentSection: NavSection;
  onOpenMobile: () => void;
  onNavigate: (section: NavSection, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onOpenMobile,
  onNavigate,
}) => {
  const progress = getStoredProgress();

  const getSectionTitle = (sec: NavSection) => {
    switch (sec) {
      case 'dashboard': return 'Student Home Dashboard';
      case 'learn': return 'Learn Data Structures (Curriculum)';
      case 'visualizer': return 'Interactive Algorithm Visualizer';
      case 'sorting': return 'Sorting Laboratory & Benchmark';
      case 'practice': return 'Coding Practice & Online Judge';
      case 'quizzes': return 'Quizzes, Dry-Runs & Viva Preparation';
      case 'complexity': return 'Algorithmic Complexity & Big-O Lab';
      case 'progress': return 'Student Progress & Analytics';
      case 'about': return 'About Project & FDS Syllabus';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-dark-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 hidden sm:inline">DSA VISION</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-none">
            {getSectionTitle(currentSection)}
          </span>
        </div>
      </div>

      {/* Right: Quick Launchers & Streak Pill */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Coding Practice Jump */}
        <button
          onClick={() => onNavigate('practice')}
          className="hidden md:flex px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold items-center gap-1.5 transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Practice</span>
        </button>

        {/* Quick Visualizer Jump */}
        <button
          onClick={() => onNavigate('visualizer')}
          className="hidden md:flex px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold items-center gap-1.5 transition-all"
        >
          <Layers className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Visualizer</span>
        </button>

        {/* Active Streak Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
          <Flame className="w-4 h-4 fill-current" />
          <span>{progress.streak.current}d</span>
        </div>
      </div>
    </header>
  );
};
