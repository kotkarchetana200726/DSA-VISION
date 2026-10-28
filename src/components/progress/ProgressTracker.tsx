import React, { useState, useEffect } from 'react';
import { getStoredProgress, saveProgress } from '../../services/storage';
import { CODING_QUESTIONS } from '../../data/codingQuestionsData';
import { TOPICS_DATA } from '../../data/topicsData';
import { QUIZ_QUESTIONS } from '../../data/quizzesData';
import { AchievementBadge } from '../../types/progress';
import {
  Trophy,
  CheckCircle2,
  Flame,
  Award,
  BarChart3,
  RotateCcw,
  Clock,
  Sparkles,
  BookOpen,
  Code2,
  ShieldCheck,
  Target
} from 'lucide-react';

export const ProgressTracker: React.FC = () => {
  const [progress, setProgress] = useState(getStoredProgress());

  useEffect(() => {
    const handleUpdate = () => setProgress(getStoredProgress());
    window.addEventListener('dsa_vision_progress_updated', handleUpdate);
    return () => window.removeEventListener('dsa_vision_progress_updated', handleUpdate);
  }, []);

  const totalQuestions = CODING_QUESTIONS.length;
  const solvedCount = progress.solvedQuestionIds.length;
  const attemptedCount = progress.attemptedQuestionIds.length;

  // Breakdown by Difficulty
  const solvedEasy = CODING_QUESTIONS.filter(q => q.difficulty === 'Easy' && progress.solvedQuestionIds.includes(q.id)).length;
  const totalEasy = CODING_QUESTIONS.filter(q => q.difficulty === 'Easy').length;

  const solvedMed = CODING_QUESTIONS.filter(q => q.difficulty === 'Medium' && progress.solvedQuestionIds.includes(q.id)).length;
  const totalMed = CODING_QUESTIONS.filter(q => q.difficulty === 'Medium').length;

  const solvedHard = CODING_QUESTIONS.filter(q => q.difficulty === 'Hard' && progress.solvedQuestionIds.includes(q.id)).length;
  const totalHard = CODING_QUESTIONS.filter(q => q.difficulty === 'Hard').length;

  // Achievement Badges
  const badges: AchievementBadge[] = [
    {
      id: 'b-first-solve',
      title: 'First Blood',
      description: 'Solved your very first coding problem in DSA VISION.',
      icon: 'Target',
      unlocked: solvedCount >= 1,
    },
    {
      id: 'b-five-solved',
      title: 'Problem Solver',
      description: 'Successfully submitted 5 distinct algorithmic problems.',
      icon: 'Award',
      unlocked: solvedCount >= 5,
    },
    {
      id: 'b-ten-solved',
      title: 'Algorithm Apprentice',
      description: 'Solved 10 coding problems across various topics.',
      icon: 'Trophy',
      unlocked: solvedCount >= 10,
    },
    {
      id: 'b-quiz-master',
      title: 'Quiz Conqueror',
      description: 'Attempted at least 2 conceptual quizzes.',
      icon: 'Sparkles',
      unlocked: progress.quizAttempts.length >= 2,
    },
    {
      id: 'b-streak-master',
      title: 'Disciplined Scholar',
      description: 'Achieved a learning streak of 2 days or more.',
      icon: 'Flame',
      unlocked: progress.streak.longest >= 2,
    },
    {
      id: 'b-curriculum-pro',
      title: 'Curriculum Explorer',
      description: 'Completed 3 or more full theory modules.',
      icon: 'BookOpen',
      unlocked: progress.completedTopicModules.length >= 3,
    },
  ];

  const handleResetAllData = () => {
    if (confirm('Are you sure you want to reset all your progress data? This cannot be undone.')) {
      localStorage.removeItem('dsa_vision_user_progress_v1');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Student Analytics & Learning Milestones
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track your verified problem submissions, quiz performance history, and unlocked badges.
          </p>
        </div>

        <button
          onClick={handleResetAllData}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Analytics
        </button>
      </div>

      {/* Main Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Difficulty Breakdown Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-brand-cyan" />
            Solved by Difficulty
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {/* Easy */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-emerald-400 font-bold">Easy</span>
                <span className="text-slate-300">{solvedEasy} / {totalEasy}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${totalEasy > 0 ? (solvedEasy / totalEasy) * 100 : 0}%` }}
                  className="h-full bg-emerald-400 rounded-full"
                ></div>
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-amber-400 font-bold">Medium</span>
                <span className="text-slate-300">{solvedMed} / {totalMed}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${totalMed > 0 ? (solvedMed / totalMed) * 100 : 0}%` }}
                  className="h-full bg-amber-400 rounded-full"
                ></div>
              </div>
            </div>

            {/* Hard */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-rose-400 font-bold">Hard</span>
                <span className="text-slate-300">{solvedHard} / {totalHard}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${totalHard > 0 ? (solvedHard / totalHard) * 100 : 0}%` }}
                  className="h-full bg-rose-400 rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak & Consistency Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            Consistency & Active Streak
          </h3>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-around text-center">
            <div>
              <span className="text-2xl font-black text-amber-400 font-mono block">
                {progress.streak.current}
              </span>
              <span className="text-[11px] text-slate-400">Current Streak (Days)</span>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div>
              <span className="text-2xl font-black text-brand-cyan font-mono block">
                {progress.streak.longest}
              </span>
              <span className="text-[11px] text-slate-400">Longest Streak (Days)</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Practice at least one question or take a quiz daily to keep your streak burning!
          </p>
        </div>

        {/* Quiz Performance Overview */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-violet" />
            Quiz Mastery Stats
          </h3>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-around text-center">
            <div>
              <span className="text-2xl font-black text-brand-violet font-mono block">
                {progress.quizAttempts.length}
              </span>
              <span className="text-[11px] text-slate-400">Total Attempts</span>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div>
              <span className="text-2xl font-black text-emerald-400 font-mono block">
                {progress.quizAttempts.length > 0
                  ? `${Math.round(progress.quizAttempts.reduce((a, b) => a + b.percentage, 0) / progress.quizAttempts.length)}%`
                  : '0%'}
              </span>
              <span className="text-[11px] text-slate-400">Average Accuracy</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed">
            {progress.quizAttempts.length > 0
              ? 'Great work! Keep testing your oral viva readiness.'
              : 'Attempt quizzes in the Quiz Lab to test your viva prep.'}
          </p>
        </div>
      </div>

      {/* Topic Mastery Progress Grid */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-cyan" />
          Topic Mastery & Syllabus Progress
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TOPICS_DATA.map((topic) => {
            const isCompleted = progress.completedTopicModules.includes(topic.id);
            const topicQ = CODING_QUESTIONS.filter(q => q.topic === topic.id);
            const solvedTopic = topicQ.filter(q => progress.solvedQuestionIds.includes(q.id)).length;
            const percent = topicQ.length > 0 ? Math.round((solvedTopic / topicQ.length) * 100) : 0;

            return (
              <div key={topic.id} className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 truncate">{topic.name}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>{solvedTopic}/{topicQ.length} solved</span>
                  <span className="text-brand-cyan">{percent}%</span>
                </div>

                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div style={{ width: `${percent}%` }} className="h-full bg-brand-cyan rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Achievement Badges & Honours
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                b.unlocked
                  ? 'bg-amber-500/10 border-amber-500/30 text-slate-200'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <div className={`p-3 rounded-xl shrink-0 ${
                b.unlocked ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-600'
              }`}>
                {b.unlocked ? <Trophy className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{b.title}</h4>
                  {b.unlocked && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 uppercase">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-snug">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
