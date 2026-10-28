import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Play,
  ArrowUpDown,
  Code2,
  HelpCircle,
  Activity,
  Trophy,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Layers
} from 'lucide-react';
import { getStoredProgress } from '../../services/storage';

export type NavSection =
  | 'dashboard'
  | 'learn'
  | 'visualizer'
  | 'sorting'
  | 'practice'
  | 'quizzes'
  | 'complexity'
  | 'progress'
  | 'about';

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const progress = getStoredProgress();

  const navItems: { id: NavSection; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 shrink-0" /> },
    { id: 'learn', label: 'Learn Data Structures', icon: <BookOpen className="w-5 h-5 shrink-0" />, badge: '10' },
    { id: 'visualizer', label: 'Algorithm Visualizer', icon: <Play className="w-5 h-5 shrink-0" />, badge: 'Live' },
    { id: 'sorting', label: 'Sorting Lab', icon: <ArrowUpDown className="w-5 h-5 shrink-0" /> },
    { id: 'practice', label: 'Coding Practice', icon: <Code2 className="w-5 h-5 shrink-0" />, badge: '50+' },
    { id: 'quizzes', label: 'Quizzes & Viva', icon: <HelpCircle className="w-5 h-5 shrink-0" /> },
    { id: 'complexity', label: 'Complexity Lab', icon: <Activity className="w-5 h-5 shrink-0" />, badge: 'Big-O' },
    { id: 'progress', label: 'Learning Progress', icon: <Trophy className="w-5 h-5 shrink-0" /> },
    { id: 'about', label: 'About Project', icon: <Info className="w-5 h-5 shrink-0" />, badge: 'FDS' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-dark-900 border-r border-slate-800 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div
            onClick={() => { onNavigate('dashboard'); onCloseMobile(); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center text-dark-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-dark-950" />
            </div>

            {!isCollapsed && (
              <div>
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1 heading-font">
                  DSA <span className="text-brand-cyan">VISION</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  College FDS Lab
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-brand-cyan text-dark-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className={isActive ? 'text-dark-950' : 'text-slate-400 group-hover:text-brand-cyan'}>
                  {item.icon}
                </span>

                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-dark-950/20 text-dark-950'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Streak / Student Badge */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {progress.streak.current} Day Streak
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {progress.solvedQuestionIds.length} Solved
                  </span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
          ) : (
            <div className="flex justify-center" title={`${progress.streak.current} Day Streak`}>
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
