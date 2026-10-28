import React, { useState } from 'react';
import { Sidebar, NavSection } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { LearnModules } from './components/learn/LearnModules';
import { VisualizerContainer } from './components/visualizer/VisualizerContainer';
import { SortingLab } from './components/sorting/SortingLab';
import { CodingPractice } from './components/coding/CodingPractice';
import { QuizLab } from './components/quiz/QuizLab';
import { ComplexityLab } from './components/complexity/ComplexityLab';
import { ProgressTracker } from './components/progress/ProgressTracker';
import { AboutProject } from './components/about/AboutProject';
import { TopicId } from './types/dsa';

export const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Routing params for cross-module jumps
  const [visualizerInitialTopic, setVisualizerInitialTopic] = useState<TopicId>('arrays');
  const [practiceInitialQuestionId, setPracticeInitialQuestionId] = useState<string | undefined>(undefined);

  const handleNavigate = (section: string, param?: string) => {
    const targetSection = section as NavSection;
    if (targetSection === 'visualizer' && param) {
      setVisualizerInitialTopic(param as TopicId);
    }
    if (targetSection === 'practice' && param) {
      setPracticeInitialQuestionId(param);
    }
    setCurrentSection(targetSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={(sec) => handleNavigate(sec)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Header */}
        <Header
          currentSection={currentSection}
          onOpenMobile={() => setIsMobileOpen(true)}
          onNavigate={(sec, param) => handleNavigate(sec, param)}
        />

        {/* Dynamic Section Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentSection === 'dashboard' && (
            <Dashboard onNavigate={handleNavigate} />
          )}

          {currentSection === 'learn' && (
            <LearnModules
              onNavigateToVisualizer={(topicId) => handleNavigate('visualizer', topicId)}
              onNavigateToPractice={(qId) => handleNavigate('practice', qId)}
              onNavigateToQuiz={() => handleNavigate('quizzes')}
            />
          )}

          {currentSection === 'visualizer' && (
            <VisualizerContainer initialTopic={visualizerInitialTopic} />
          )}

          {currentSection === 'sorting' && (
            <SortingLab />
          )}

          {currentSection === 'practice' && (
            <CodingPractice initialQuestionId={practiceInitialQuestionId} />
          )}

          {currentSection === 'quizzes' && (
            <QuizLab />
          )}

          {currentSection === 'complexity' && (
            <ComplexityLab />
          )}

          {currentSection === 'progress' && (
            <ProgressTracker />
          )}

          {currentSection === 'about' && (
            <AboutProject />
          )}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-900 bg-dark-950 py-6 px-4 text-center text-xs font-mono text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>DSA VISION — Interactive Data Structures & Algorithms Lab</span>
            <span>College Fundamentals of Data Structures (FDS) Mini Project</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
