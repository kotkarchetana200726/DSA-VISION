import React, { useState } from 'react';
import { TOPICS_DATA } from '../../data/topicsData';
import { CODING_QUESTIONS } from '../../data/codingQuestionsData';
import { QUIZ_QUESTIONS } from '../../data/quizzesData';
import { TopicId } from '../../types/dsa';
import { toggleTopicCompleted, getStoredProgress } from '../../services/storage';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  AlertTriangle,
  HelpCircle,
  Code2,
  Play,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface LearnModulesProps {
  onNavigateToVisualizer: (topicId: TopicId) => void;
  onNavigateToPractice: (questionId: string) => void;
  onNavigateToQuiz: () => void;
}

export const LearnModules: React.FC<LearnModulesProps> = ({
  onNavigateToVisualizer,
  onNavigateToPractice,
  onNavigateToQuiz,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('arrays');
  const [progress, setProgress] = useState(getStoredProgress());

  const currentTopic = TOPICS_DATA.find(t => t.id === selectedTopicId) || TOPICS_DATA[0];
  const relatedQuestions = CODING_QUESTIONS.filter(q => q.topic === currentTopic.id);
  const relatedQuizzes = QUIZ_QUESTIONS.filter(q => q.topic === currentTopic.id);
  const isCompleted = progress.completedTopicModules.includes(currentTopic.id);

  const handleToggleCompleted = () => {
    toggleTopicCompleted(currentTopic.id);
    setProgress(getStoredProgress());
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Learn Data Structures — Core Curriculum Modules
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete theoretical definitions, memory models, asymptotic bounds, real-world case studies, and common student mistakes.
          </p>
        </div>

        {/* Completion status button */}
        <button
          onClick={handleToggleCompleted}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
            isCompleted
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10'
              : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
          {isCompleted ? 'Module Completed' : 'Mark as Completed'}
        </button>
      </div>

      {/* Topic Horizontal Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TOPICS_DATA.map((t) => {
          const isSelected = t.id === selectedTopicId;
          const isDone = progress.completedTopicModules.includes(t.id);

          return (
            <button
              key={t.id}
              onClick={() => setSelectedTopicId(t.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? 'bg-brand-cyan text-dark-950 font-bold border-brand-cyan shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {isDone && <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-dark-950' : 'text-emerald-400'}`} />}
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Topic Study Guide */}
        <div className="lg:col-span-2 space-y-6">
          {/* Definition & Concept Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-cyan">
                  Concept Definition
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  {currentTopic.name}
                </h3>
              </div>
              <button
                onClick={() => onNavigateToVisualizer(currentTopic.id)}
                className="px-3.5 py-1.5 rounded-xl bg-brand-cyan/20 hover:bg-brand-cyan/30 border border-brand-cyan/40 text-brand-cyan text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Open Visualizer
              </button>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {currentTopic.definition}
            </p>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono text-slate-300">
              💡 <em>{currentTopic.tagline}</em>
            </div>
          </div>

          {/* Key Operations & Complexity Table */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-cyan" />
              Core Operations & Asymptotic Time Limits
            </h4>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Operation</th>
                    <th className="p-3">Mechanism</th>
                    <th className="p-3">Average Case</th>
                    <th className="p-3">Worst Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-dark-950/60">
                  {currentTopic.keyOperations.map((op, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white">{op.name}</td>
                      <td className="p-3 text-slate-300 font-sans text-xs">{op.description}</td>
                      <td className="p-3 font-bold text-emerald-400">{op.averageTime}</td>
                      <td className="p-3 font-bold text-amber-400">{op.worstTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Complexity Snapshot Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {currentTopic.timeComplexity.access && (
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block">Access</span>
                  <span className="text-xs font-bold text-brand-cyan">{currentTopic.timeComplexity.access}</span>
                </div>
              )}
              {currentTopic.timeComplexity.search && (
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block">Search</span>
                  <span className="text-xs font-bold text-brand-blue">{currentTopic.timeComplexity.search}</span>
                </div>
              )}
              {currentTopic.timeComplexity.insertion && (
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block">Insertion</span>
                  <span className="text-xs font-bold text-brand-emerald">{currentTopic.timeComplexity.insertion}</span>
                </div>
              )}
              {currentTopic.timeComplexity.deletion && (
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block">Deletion</span>
                  <span className="text-xs font-bold text-rose-400">{currentTopic.timeComplexity.deletion}</span>
                </div>
              )}
            </div>
          </div>

          {/* Real-World Industry Applications */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-violet" />
              Real-World Engineering Applications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTopic.realWorldApplications.map((app, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-300 leading-snug flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-brand-violet/20 text-brand-violet font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Student Pitfalls & Mistakes */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-brand-amber" />
              Common Student Pitfalls & Viva Traps
            </h4>
            <div className="space-y-2.5">
              {currentTopic.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs flex items-start gap-2.5 leading-relaxed">
                  <span className="font-bold text-amber-400 shrink-0">⚠️ Pitfall {idx + 1}:</span>
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Practice Questions & Viva Prep Quick Links */}
        <div className="lg:col-span-1 space-y-6">
          {/* Practice Questions Card */}
          <div className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-brand-cyan" />
                Practice Problems ({relatedQuestions.length})
              </h4>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {relatedQuestions.map((q) => {
                const isQSolved = progress.solvedQuestionIds.includes(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => onNavigateToPractice(q.id)}
                    className="w-full p-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-brand-cyan/40 text-left transition-all group flex items-start justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          q.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : q.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {q.difficulty}
                        </span>
                        {isQSolved && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      </div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-brand-cyan transition-colors line-clamp-1">
                        {q.title}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-cyan shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Oral Exam Viva Questions Card */}
          <div className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-violet" />
                Viva Questions ({currentTopic.vivaQuestions.length})
              </h4>
              <button
                onClick={onNavigateToQuiz}
                className="text-[11px] text-brand-violet font-semibold hover:underline flex items-center gap-1"
              >
                Quiz Lab <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {currentTopic.vivaQuestions.map((v, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 space-y-2 text-xs">
                  <p className="font-bold text-slate-200">
                    Q: {v.question}
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    <strong className="text-brand-violet">Answer:</strong> {v.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
