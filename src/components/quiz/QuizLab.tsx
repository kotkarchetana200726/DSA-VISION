import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../../data/quizzesData';
import { QuizQuestion, QuestionType } from '../../types/quiz';
import { TopicId } from '../../types/dsa';
import { recordQuizAttempt, getStoredProgress } from '../../services/storage';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Sparkles,
  Trophy,
  Filter,
  FileQuestion,
  BookOpen
} from 'lucide-react';

export const QuizLab: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [revealedViva, setRevealedViva] = useState<Record<string, boolean>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const filteredQuestions = QUIZ_QUESTIONS.filter(q => {
    const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    const matchesType = selectedType === 'all' || q.type === selectedType;
    return matchesTopic && matchesType;
  });

  const mcqQuestions = filteredQuestions.filter(q => q.type === 'mcq' || q.type === 'dry-run');

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isFinished) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleToggleViva = (questionId: string) => {
    setRevealedViva(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleFinishQuiz = () => {
    setIsFinished(true);
    let correctCount = 0;
    mcqQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionIndex) correctCount++;
    });

    const total = mcqQuestions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 100;

    recordQuizAttempt({
      id: `attempt_${Date.now()}`,
      topic: (selectedTopic === 'all' ? 'arrays' : selectedTopic) as TopicId,
      timestamp: new Date().toISOString(),
      totalQuestions: total,
      score: correctCount,
      percentage,
    });

    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setRevealedViva({});
    setIsFinished(false);
  };

  // Score calculation
  let correctCount = 0;
  mcqQuestions.forEach(q => {
    if (userAnswers[q.id] === q.correctOptionIndex) correctCount++;
  });
  const scorePercent = mcqQuestions.length > 0 ? Math.round((correctCount / mcqQuestions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Quizzes, Dry-Runs & Viva Preparation Lab
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Test your conceptual knowledge, code tracing skills, and college oral exam answers.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-cyan" />
            <select
              value={selectedTopic}
              onChange={(e) => { setSelectedTopic(e.target.value); handleResetQuiz(); }}
              className="px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan"
            >
              <option value="all">All Topics</option>
              <option value="arrays">Arrays</option>
              <option value="searching">Searching</option>
              <option value="sorting">Sorting</option>
              <option value="linked-lists">Linked Lists</option>
              <option value="stacks">Stacks</option>
              <option value="queues">Queues</option>
              <option value="trees">Binary Trees & BST</option>
              <option value="heaps">Heaps</option>
              <option value="graphs">Graphs</option>
              <option value="hash-tables">Hash Tables</option>
            </select>
          </div>

          <div className="flex p-1 rounded-xl bg-dark-950 border border-slate-800 text-xs">
            <button
              onClick={() => { setSelectedType('all'); handleResetQuiz(); }}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedType === 'all' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => { setSelectedType('mcq'); handleResetQuiz(); }}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedType === 'mcq' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              MCQs
            </button>
            <button
              onClick={() => { setSelectedType('dry-run'); handleResetQuiz(); }}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedType === 'dry-run' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dry Runs
            </button>
            <button
              onClick={() => { setSelectedType('viva'); handleResetQuiz(); }}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedType === 'viva' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Viva Questions
            </button>
          </div>
        </div>
      </div>

      {/* Finished Summary Banner if submitted */}
      {isFinished && mcqQuestions.length > 0 && (
        <div className="p-6 rounded-2xl glass-card border border-emerald-500/40 bg-dark-900/90 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Quiz Attempt Completed!</h3>
              <p className="text-xs text-slate-300 mt-1">
                You scored <strong className="text-emerald-400 text-sm">{correctCount}</strong> out of <strong className="text-white text-sm">{mcqQuestions.length}</strong> ({scorePercent}% accuracy).
              </p>
            </div>
          </div>

          <button
            onClick={handleResetQuiz}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      )}

      {/* Questions Stream */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIdx) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const selectedOption = userAnswers[q.id];
          const isCorrect = selectedOption === q.correctOptionIndex;

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-4"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-xs font-mono font-bold flex items-center justify-center">
                    {qIdx + 1}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    q.type === 'viva'
                      ? 'bg-brand-violet/20 text-brand-violet border border-brand-violet/30'
                      : q.type === 'dry-run'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
                  }`}>
                    {q.type === 'dry-run' ? 'Code Dry-Run' : q.type.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 capitalize">
                    {q.topic.replace('-', ' ')}
                  </span>
                </div>

                <span className="text-[10px] text-slate-500 font-mono">
                  {q.difficulty}
                </span>
              </div>

              {/* Question Title */}
              <p className="text-sm font-semibold text-white leading-relaxed">
                {q.question}
              </p>

              {/* Code Snippet for Dry-Run */}
              {q.codeSnippet && (
                <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 font-mono text-xs overflow-x-auto text-brand-cyan leading-relaxed">
                  <pre>{q.codeSnippet}</pre>
                </div>
              )}

              {/* MCQ Options */}
              {q.options && q.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    let optStyle = 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600';

                    if (isFinished) {
                      if (optIdx === q.correctOptionIndex) {
                        optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected) {
                        optStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan font-bold shadow-md shadow-cyan-500/15';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isFinished}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3.5 rounded-xl border text-xs text-left transition-all duration-200 flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-md bg-dark-950 border border-slate-700 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isFinished && optIdx === q.correctOptionIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isFinished && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Explanation after finishing */}
              {isFinished && q.answerExplanation && (
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-brand-cyan flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Explanation:
                  </span>
                  <p>{q.answerExplanation}</p>
                </div>
              )}

              {/* Viva Question Answer Toggle */}
              {q.type === 'viva' && q.vivaAnswer && (
                <div className="pt-2">
                  <button
                    onClick={() => handleToggleViva(q.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-violet/20 hover:bg-brand-violet/30 border border-brand-violet/40 text-brand-violet text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {revealedViva[q.id] ? 'Hide Model Answer' : 'Reveal Model Viva Answer'}
                  </button>

                  {revealedViva[q.id] && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-brand-violet/30 text-xs text-slate-200 space-y-1.5 leading-relaxed">
                      <span className="font-bold text-brand-violet block uppercase tracking-wider text-[10px]">
                        Examiner Viva Answer Guide:
                      </span>
                      <p>{q.vivaAnswer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Finish Button at Bottom */}
      {!isFinished && mcqQuestions.length > 0 && (
        <div className="flex justify-center pt-4 pb-12">
          <button
            onClick={handleFinishQuiz}
            className="px-8 py-3 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-dark-950 font-bold text-sm shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Submit Quiz & Check Score
          </button>
        </div>
      )}
    </div>
  );
};
