import React, { useState, useEffect } from 'react';
import { getStoredProgress } from '../../services/storage';
import { CODING_QUESTIONS } from '../../data/codingQuestionsData';
import { TOPICS_DATA } from '../../data/topicsData';
import { TopicId } from '../../types/dsa';
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  Code2,
  Play,
  ArrowRight,
  Flame,
  BookOpen,
  ArrowUpDown,
  Search,
  Compass,
  Zap,
  Target,
  Clock,
  Layers,
  GitCommit,
  Server,
  ListFilter,
  Network,
  Boxes,
  Share2,
  Hash
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (section: string, param?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState(getStoredProgress());

  useEffect(() => {
    const handleUpdate = () => setProgress(getStoredProgress());
    window.addEventListener('dsa_vision_progress_updated', handleUpdate);
    return () => window.removeEventListener('dsa_vision_progress_updated', handleUpdate);
  }, []);

  // Calculated Stats
  const totalQuestions = CODING_QUESTIONS.length;
  const solvedCount = progress.solvedQuestionIds.length;
  const attemptedCount = progress.attemptedQuestionIds.length;
  const completedTopicsCount = progress.completedTopicModules.length;
  const totalTopics = TOPICS_DATA.length;
  const overallPercent = Math.round((solvedCount / totalQuestions) * 100);

  // Daily Coding Challenge (deterministic based on day of year)
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const dailyQuestion = CODING_QUESTIONS[dayOfYear % CODING_QUESTIONS.length] || CODING_QUESTIONS[0];
  const isDailySolved = progress.solvedQuestionIds.includes(dailyQuestion.id);

  // Recently Attempted Questions
  const recentSubmissionsList = Object.values(progress.submissions).flat();
  recentSubmissionsList.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  const recentQuestions = recentSubmissionsList.slice(0, 3).map(sub => {
    const q = CODING_QUESTIONS.find(item => item.id === sub.questionId);
    return { ...sub, question: q };
  });

  // Next recommended topic to study
  const nextTopicToLearn = TOPICS_DATA.find(t => !progress.completedTopicModules.includes(t.id)) || TOPICS_DATA[0];

  const getTopicIcon = (id: TopicId) => {
    switch (id) {
      case 'arrays': return <Layers className="w-5 h-5 text-brand-cyan" />;
      case 'searching': return <Search className="w-5 h-5 text-brand-blue" />;
      case 'sorting': return <ArrowUpDown className="w-5 h-5 text-brand-indigo" />;
      case 'linked-lists': return <GitCommit className="w-5 h-5 text-brand-violet" />;
      case 'stacks': return <Server className="w-5 h-5 text-brand-purple" />;
      case 'queues': return <ListFilter className="w-5 h-5 text-brand-emerald" />;
      case 'trees': return <Network className="w-5 h-5 text-amber-400" />;
      case 'heaps': return <Boxes className="w-5 h-5 text-rose-400" />;
      case 'graphs': return <Share2 className="w-5 h-5 text-cyan-400" />;
      case 'hash-tables': return <Hash className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl glass-panel border border-brand-cyan/30 bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 shadow-2xl overflow-hidden">
        {/* Glow backdrop accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>College FDS Mini Project • Interactive Learning Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight heading-font">
              Master Fundamentals of Data Structures & Algorithms
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Step through physical memory models, trace pointers, analyze asymptotic bounds, and write C++17 solutions evaluated against comprehensive validation test suites.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('visualizer')}
              className="px-5 py-3 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Visualizer</span>
            </button>
            <button
              onClick={() => onNavigate('practice')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Code2 className="w-4 h-4 text-brand-cyan" />
              <span>Start Practice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calculated Stats Grid (from actual LocalStorage) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Solved Problems */}
        <div className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 shadow-lg space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Solved Problems</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{solvedCount}</span>
            <span className="text-xs text-slate-500 font-mono">/ {totalQuestions}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-2">
            <div
              style={{ width: `${Math.max(overallPercent, 2)}%` }}
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            ></div>
          </div>
        </div>

        {/* Stat 2: Active Streak */}
        <div className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 shadow-lg space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Learning Streak</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{progress.streak.current}</span>
            <span className="text-xs text-slate-400">days active</span>
          </div>
          <p className="text-[11px] text-slate-500">Longest streak: {progress.streak.longest} days</p>
        </div>

        {/* Stat 3: Curriculum Topics */}
        <div className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 shadow-lg space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Completed Topics</span>
            <div className="p-2 rounded-xl bg-brand-cyan/15 text-brand-cyan">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{completedTopicsCount}</span>
            <span className="text-xs text-slate-500 font-mono">/ {totalTopics}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-2">
            <div
              style={{ width: `${Math.max(Math.round((completedTopicsCount / totalTopics) * 100), 2)}%` }}
              className="h-full bg-brand-cyan rounded-full transition-all duration-500"
            ></div>
          </div>
        </div>

        {/* Stat 4: Quizzes Attempted */}
        <div className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 shadow-lg space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Quizzes Taken</span>
            <div className="p-2 rounded-xl bg-brand-violet/15 text-brand-violet">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {progress.quizAttempts.length}
            </span>
            <span className="text-xs text-slate-400">attempts</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {progress.quizAttempts.length > 0
              ? `Avg score: ${Math.round(progress.quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / progress.quizAttempts.length)}%`
              : 'Take a quiz to test knowledge'}
          </p>
        </div>
      </div>

      {/* Continue Learning & Daily Challenge Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning Card */}
        <div className="p-6 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> Recommended Next Topic
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
                Syllabus Unit
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {nextTopicToLearn.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {nextTopicToLearn.definition}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              {getTopicIcon(nextTopicToLearn.id)}
              <span className="text-xs font-mono text-slate-400">
                {CODING_QUESTIONS.filter(q => q.topic === nextTopicToLearn.id).length} Practice Problems
              </span>
            </div>
            <button
              onClick={() => onNavigate('learn')}
              className="px-4 py-2 rounded-xl bg-brand-cyan/20 hover:bg-brand-cyan/30 border border-brand-cyan/40 text-brand-cyan font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
            >
              Study Topic <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Daily Coding Challenge Card */}
        <div className="p-6 rounded-2xl glass-card border border-brand-indigo/30 bg-dark-900/90 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Daily Coding Challenge
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                dailyQuestion.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {dailyQuestion.difficulty}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {dailyQuestion.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {dailyQuestion.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Time: <strong className="text-emerald-400">{dailyQuestion.expectedTimeComplexity}</strong></span>
              {isDailySolved && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Solved
                </span>
              )}
            </div>
            <button
              onClick={() => onNavigate('practice', dailyQuestion.id)}
              className="px-4 py-2 rounded-xl bg-brand-indigo hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
            >
              Solve Problem <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Data Structures & Core Topic Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-cyan" />
            FDS Topic Modules & Visualizers
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {completedTopicsCount}/{totalTopics} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS_DATA.map((topic) => {
            const isDone = progress.completedTopicModules.includes(topic.id);
            const topicQuestions = CODING_QUESTIONS.filter(q => q.topic === topic.id);
            const solvedTopicQ = topicQuestions.filter(q => progress.solvedQuestionIds.includes(q.id)).length;

            return (
              <div
                key={topic.id}
                className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/80 hover:border-brand-cyan/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-xl bg-dark-950 border border-slate-800">
                      {getTopicIcon(topic.id)}
                    </div>
                    {isDone && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white mt-3">{topic.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {topic.definition}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Solved: {solvedTopicQ}/{topicQuestions.length}</span>
                    <span className="text-brand-cyan">{topic.timeComplexity.search || topic.timeComplexity.access || 'O(n)'}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('visualizer', topic.id)}
                      className="flex-1 py-1.5 rounded-lg bg-brand-cyan/15 hover:bg-brand-cyan/25 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" /> Visualizer
                    </button>
                    <button
                      onClick={() => onNavigate('practice')}
                      className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Code2 className="w-3 h-3" /> Practice
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Attempted Problems & Quick Links */}
      {recentQuestions.length > 0 && (
        <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-cyan" />
            Recently Attempted Problems
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recentQuestions.map((sub, idx) => {
              if (!sub.question) return null;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate('practice', sub.question!.id)}
                  className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      sub.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {sub.passed ? 'Passed' : 'Failed'} ({sub.passedTests}/{sub.totalTests})
                    </span>
                    <p className="text-xs font-semibold text-white line-clamp-1">
                      {sub.question.title}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
