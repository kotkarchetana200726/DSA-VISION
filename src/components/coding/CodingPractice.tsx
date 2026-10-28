import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CODING_QUESTIONS } from '../../data/codingQuestionsData';
import { CodingQuestion, SupportedLanguage, TestCase, TestResult, SubmissionResult } from '../../types/coding';
import { TopicId } from '../../types/dsa';
import { CodeEditor } from './CodeEditor';
import { runSingleTestCase, runAllTestCases, executeCode } from '../../services/codeRunner';
import { getStoredProgress, recordSubmission, toggleBookmarkQuestion } from '../../services/storage';
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  Clock,
  Code2,
  ChevronDown,
  ChevronRight,
  Filter,
  Search as SearchIcon,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const CodingPractice: React.FC<{ initialQuestionId?: string }> = ({ initialQuestionId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeQuestion, setActiveQuestion] = useState<CodingQuestion>(() => {
    if (initialQuestionId) {
      const found = CODING_QUESTIONS.find(q => q.id === initialQuestionId);
      if (found) return found;
    }
    return CODING_QUESTIONS[0];
  });

  const [language, setLanguage] = useState<SupportedLanguage>('cpp');
  const [code, setCode] = useState<string>(activeQuestion.starterCode[language]);

  // Bottom Panel State
  const [activeTab, setActiveTab] = useState<'testcases' | 'custom' | 'result'>('testcases');
  const [activeSampleIdx, setActiveSampleIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>(activeQuestion.sampleCases[0]?.input || '');
  const [customOutput, setCustomOutput] = useState<string>('');
  const [isRunningCustom, setIsRunningCustom] = useState<boolean>(false);

  // Execution & Submission state
  const [isRunningTest, setIsRunningTest] = useState<boolean>(false);
  const [sampleTestResults, setSampleTestResults] = useState<Record<string, TestResult>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastSubmission, setLastSubmission] = useState<SubmissionResult | null>(null);

  // Hints visibility
  const [expandedHints, setExpandedHints] = useState<boolean>(false);

  // Student progress state
  const [progress, setProgress] = useState(getStoredProgress());

  useEffect(() => {
    const handleProgressUpdate = () => setProgress(getStoredProgress());
    window.addEventListener('dsa_vision_progress_updated', handleProgressUpdate);
    return () => window.removeEventListener('dsa_vision_progress_updated', handleProgressUpdate);
  }, []);

  // Update starter code when question or language changes
  useEffect(() => {
    const savedDraft = progress.customCodeDrafts?.[activeQuestion.id]?.[language];
    if (savedDraft) {
      setCode(savedDraft);
    } else {
      setCode(activeQuestion.starterCode[language] || '');
    }
    setCustomInput(activeQuestion.sampleCases[0]?.input || '');
    setCustomOutput('');
    setSampleTestResults({});
    setLastSubmission(null);
    setActiveSampleIdx(0);
    setActiveTab('testcases');
  }, [activeQuestion, language]);

  // Filtered Questions List
  const filteredQuestions = CODING_QUESTIONS.filter(q => {
    const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    const matchesDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesDiff && matchesSearch;
  });

  // Handle Run Single Sample Test Case
  const handleRunSampleCase = async (testCase: TestCase) => {
    setIsRunningTest(true);
    setActiveTab('testcases');
    try {
      const res = await runSingleTestCase(code, language, testCase);
      setSampleTestResults(prev => ({ ...prev, [testCase.id]: res }));
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsRunningTest(false);
    }
  };

  // Handle Run Custom Input
  const handleRunCustom = async () => {
    setIsRunningCustom(true);
    setActiveTab('custom');
    try {
      const { stdout, stderr, compileError, durationMs } = await executeCode(code, language, customInput);
      if (compileError) {
        setCustomOutput(`[Compilation Error]\n${compileError}`);
      } else if (stderr) {
        setCustomOutput(`${stdout}\n[Runtime Error / stderr]\n${stderr}`);
      } else {
        setCustomOutput(stdout || '[No Output / Empty]');
      }
    } catch (err: any) {
      setCustomOutput(`[Execution Error] ${err.message || String(err)}`);
    } finally {
      setIsRunningCustom(false);
    }
  };

  // Handle Full Submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setActiveTab('result');
    try {
      const allTests = [...activeQuestion.sampleCases, ...activeQuestion.hiddenTestCases];
      const result = await runAllTestCases(activeQuestion.id, code, language, allTests);
      setLastSubmission(result);
      recordSubmission(result);

      if (result.passed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#10b981', '#8b5cf6'],
        });
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetCode = () => {
    if (confirm('Reset code to default starter template? Any unsaved edits will be lost.')) {
      setCode(activeQuestion.starterCode[language]);
    }
  };

  const isBookmarked = progress.bookmarkedQuestionIds.includes(activeQuestion.id);
  const isSolved = progress.solvedQuestionIds.includes(activeQuestion.id);

  return (
    <div className="space-y-6">
      {/* Top Filter Bar & Question Switcher */}
      <div className="p-4 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/80 flex flex-wrap items-center justify-between gap-4">
        {/* Topic & Difficulty Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-cyan" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan"
            >
              <option value="all">All Topics (10)</option>
              <option value="arrays">Arrays</option>
              <option value="searching">Searching</option>
              <option value="sorting">Sorting</option>
              <option value="linked-lists">Linked Lists</option>
              <option value="stacks">Stacks</option>
              <option value="queues">Queues</option>
              <option value="trees">Binary Search Trees</option>
              <option value="heaps">Heaps</option>
              <option value="graphs">Graphs</option>
              <option value="hash-tables">Hash Tables</option>
            </select>
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Search box */}
          <div className="relative">
            <SearchIcon className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan w-40 sm:w-48"
            />
          </div>
        </div>

        {/* Question Selector Quick Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            Problem:
          </span>
          <select
            value={activeQuestion.id}
            onChange={(e) => {
              const q = CODING_QUESTIONS.find(item => item.id === e.target.value);
              if (q) setActiveQuestion(q);
            }}
            className="px-3 py-1.5 rounded-lg bg-dark-950 border border-brand-cyan/40 text-xs text-white font-medium focus:outline-none focus:border-brand-cyan max-w-xs truncate"
          >
            {filteredQuestions.map(q => (
              <option key={q.id} value={q.id}>
                {progress.solvedQuestionIds.includes(q.id) ? '✓ ' : ''}[{q.difficulty}] {q.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split-Screen Coding Practice Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[750px]">
        {/* LEFT PANEL: Problem Details & Spec */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl overflow-hidden h-[750px]">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeQuestion.difficulty === 'Easy'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : activeQuestion.difficulty === 'Medium'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {activeQuestion.difficulty}
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-medium capitalize">
                  {activeQuestion.topic.replace('-', ' ')}
                </span>

                {isSolved && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Solved
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-white leading-snug">
                {activeQuestion.title}
              </h2>
            </div>

            <button
              onClick={() => toggleBookmarkQuestion(activeQuestion.id)}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Scrollable Problem Spec Body */}
          <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs leading-relaxed">
            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Problem Statement
              </h3>
              <p className="whitespace-pre-line text-slate-200 leading-normal">
                {activeQuestion.description}
              </p>
            </div>

            {/* Input & Output Format */}
            <div className="grid grid-cols-1 gap-3 p-3.5 rounded-xl bg-dark-950 border border-slate-800 font-mono text-[11px]">
              <div>
                <span className="text-brand-cyan font-bold block mb-1">Input Format:</span>
                <p className="text-slate-300 whitespace-pre-line">{activeQuestion.inputFormat}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-brand-cyan font-bold block mb-1">Output Format:</span>
                <p className="text-slate-300 whitespace-pre-line">{activeQuestion.outputFormat}</p>
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Constraints
              </h3>
              <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-slate-300">
                {activeQuestion.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Expected Complexities */}
            <div className="flex gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Expected Time:</span>
                <span className="font-bold text-emerald-400">{activeQuestion.expectedTimeComplexity}</span>
              </div>
              <div className="pl-4 border-l border-slate-700">
                <span className="text-slate-400 block text-[10px]">Expected Space:</span>
                <span className="font-bold text-brand-cyan">{activeQuestion.expectedSpaceComplexity}</span>
              </div>
            </div>

            {/* Sample Cases */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sample Test Cases
              </h3>
              {activeQuestion.sampleCases.map((sample, idx) => (
                <div key={sample.id} className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>Example {idx + 1}</span>
                    {sample.explanation && (
                      <span className="text-slate-500 font-normal italic">
                        {sample.explanation}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-0.5">Input:</span>
                      <pre className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-200 overflow-x-auto whitespace-pre">
                        {sample.input}
                      </pre>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-0.5">Expected Output:</span>
                      <pre className="p-2 rounded bg-slate-900 border border-slate-800 text-brand-cyan font-bold overflow-x-auto whitespace-pre">
                        {sample.expectedOutput}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hints Accordion */}
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedHints(!expandedHints)}
                className="w-full p-3 bg-slate-800/40 hover:bg-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-300 transition-colors"
              >
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Hints & Architectural Guidance ({activeQuestion.hints.length})
                </span>
                {expandedHints ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {expandedHints && (
                <div className="p-3.5 bg-dark-950 space-y-2 border-t border-slate-800">
                  {activeQuestion.hints.map((hint, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Code Editor & Execution Console */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl overflow-hidden h-[750px]">
          {/* Top Editor Toolbar */}
          <div className="p-3 px-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-cyan" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="px-3 py-1 rounded-lg bg-dark-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-brand-cyan"
              >
                <option value="cpp">C++ 17 (GCC 10.2)</option>
                <option value="python">Python 3 (3.10)</option>
                <option value="javascript">JavaScript (Node.js 18)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                title="Reset code"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleRunSampleCase(activeQuestion.sampleCases[activeSampleIdx] || activeQuestion.sampleCases[0])}
                disabled={isRunningTest || isSubmitting}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-brand-cyan fill-current" />
                <span>{isRunningTest ? 'Running...' : 'Run Code'}</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isRunningTest}
                className="px-4 py-1.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 disabled:opacity-50 text-dark-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
              </button>
            </div>
          </div>

          {/* Code Editor Window */}
          <div className="flex-1 min-h-[340px] relative">
            <CodeEditor
              language={language}
              code={code}
              onChange={setCode}
            />
          </div>

          {/* Bottom Console / Test Results Tabs */}
          <div className="h-64 border-t border-slate-800 flex flex-col bg-dark-950 shrink-0">
            {/* Tabs Header */}
            <div className="flex items-center justify-between px-4 bg-slate-900/80 border-b border-slate-800 text-xs">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('testcases')}
                  className={`py-2.5 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'testcases'
                      ? 'border-brand-cyan text-brand-cyan'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Test Cases ({activeQuestion.sampleCases.length})
                </button>

                <button
                  onClick={() => setActiveTab('custom')}
                  className={`py-2.5 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'custom'
                      ? 'border-brand-cyan text-brand-cyan'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Custom Input
                </button>

                <button
                  onClick={() => setActiveTab('result')}
                  className={`py-2.5 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'result'
                      ? 'border-brand-cyan text-brand-cyan'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Submission Result
                  {lastSubmission && (
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      lastSubmission.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {lastSubmission.passedTests}/{lastSubmission.totalTests}
                    </span>
                  )}
                </button>
              </div>

              {lastSubmission && (
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {lastSubmission.totalTimeMs} ms
                </div>
              )}
            </div>

            {/* Tab 1: Visible Sample Test Cases */}
            {activeTab === 'testcases' && (
              <div className="p-4 overflow-y-auto flex-1 space-y-3 font-mono text-xs">
                {/* Case Pills */}
                <div className="flex gap-2">
                  {activeQuestion.sampleCases.map((tc, idx) => {
                    const result = sampleTestResults[tc.id];
                    let pillBg = 'bg-slate-800 text-slate-300 border-slate-700';
                    if (result) {
                      pillBg = result.passed
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                    }

                    return (
                      <button
                        key={tc.id}
                        onClick={() => setActiveSampleIdx(idx)}
                        className={`px-3 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${pillBg} ${
                          activeSampleIdx === idx ? 'ring-2 ring-brand-cyan/60' : ''
                        }`}
                      >
                        {result ? (
                          result.passed ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-rose-400" />
                        ) : null}
                        Case {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Active Case Inspection */}
                {activeQuestion.sampleCases[activeSampleIdx] && (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold block mb-1">Input:</span>
                        <pre className="p-2.5 rounded-lg bg-dark-900 border border-slate-800 text-slate-200 whitespace-pre overflow-x-auto text-xs">
                          {activeQuestion.sampleCases[activeSampleIdx].input}
                        </pre>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 font-bold block mb-1">Expected Output:</span>
                        <pre className="p-2.5 rounded-lg bg-dark-900 border border-slate-800 text-brand-cyan whitespace-pre overflow-x-auto text-xs">
                          {activeQuestion.sampleCases[activeSampleIdx].expectedOutput}
                        </pre>
                      </div>
                    </div>

                    {/* Result for this sample if executed */}
                    {sampleTestResults[activeQuestion.sampleCases[activeSampleIdx].id] && (
                      <div className="p-3 rounded-xl border bg-dark-900/90 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span className={sampleTestResults[activeQuestion.sampleCases[activeSampleIdx].id].passed ? 'text-emerald-400 flex items-center gap-1' : 'text-rose-400 flex items-center gap-1'}>
                            {sampleTestResults[activeQuestion.sampleCases[activeSampleIdx].id].passed ? (
                              <><CheckCircle2 className="w-4 h-4" /> Passed Test Case</>
                            ) : (
                              <><XCircle className="w-4 h-4" /> Wrong Answer / Output Mismatch</>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {sampleTestResults[activeQuestion.sampleCases[activeSampleIdx].id].executionTimeMs} ms
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Actual Output:</span>
                          <pre className="p-2 rounded bg-dark-950 border border-slate-800 text-slate-200 whitespace-pre overflow-x-auto mt-1">
                            {sampleTestResults[activeQuestion.sampleCases[activeSampleIdx].id].actualOutput}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Custom Input & Output */}
            {activeTab === 'custom' && (
              <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400 font-bold">Standard Input (stdin):</span>
                    <button
                      onClick={handleRunCustom}
                      disabled={isRunningCustom}
                      className="px-2 py-0.5 rounded bg-brand-cyan text-dark-950 text-[10px] font-bold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" /> {isRunningCustom ? 'Running...' : 'Run Input'}
                    </button>
                  </div>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Provide custom input lines..."
                    className="flex-1 w-full p-2.5 rounded-lg bg-dark-900 border border-slate-800 text-slate-200 font-mono text-xs resize-none focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold mb-1">Output Console (stdout):</span>
                  <pre className="flex-1 w-full p-2.5 rounded-lg bg-dark-900 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap overflow-y-auto">
                    {customOutput || '// Output will appear here after clicking "Run Input"'}
                  </pre>
                </div>
              </div>
            )}

            {/* Tab 3: Submission Results */}
            {activeTab === 'result' && (
              <div className="p-4 overflow-y-auto flex-1 space-y-4 font-mono text-xs">
                {!lastSubmission ? (
                  <div className="text-center py-10 text-slate-500">
                    Click <strong>"Submit"</strong> to run your solution against the full test suite (sample + hidden validation test cases).
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Header Verdict Card */}
                    <div className={`p-4 rounded-xl border flex items-center justify-between ${
                      lastSubmission.passed
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        {lastSubmission.passed ? (
                          <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-7 h-7 text-rose-400" />
                        )}
                        <div>
                          <h4 className="text-sm font-bold">
                            {lastSubmission.passed ? 'Accepted!' : 'Rejected / Test Cases Failed'}
                          </h4>
                          <p className="text-[11px] opacity-80 mt-0.5">
                            Passed {lastSubmission.passedTests} of {lastSubmission.totalTests} total test cases in {lastSubmission.totalTimeMs} ms
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Compilation / Runtime Error banner if present */}
                    {lastSubmission.compileError && (
                      <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-200">
                        <span className="font-bold text-[11px] block mb-1">Compilation / Runtime Diagnostics:</span>
                        <pre className="whitespace-pre-wrap font-mono text-[10px] overflow-x-auto text-rose-300">
                          {lastSubmission.compileError}
                        </pre>
                      </div>
                    )}

                    {/* Detailed Test Cases Grid */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Detailed Test Suite Breakdown:
                      </span>
                      <div className="space-y-2">
                        {lastSubmission.testResults.map((tr, idx) => (
                          <div
                            key={tr.testCaseId}
                            className={`p-3 rounded-lg border flex items-start justify-between text-xs ${
                              tr.passed
                                ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-300'
                                : 'bg-rose-500/5 border-rose-500/30 text-rose-300'
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-bold flex items-center gap-1.5">
                                {tr.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                                Test Case #{idx + 1} {tr.isSample ? '(Sample)' : '(Hidden Validation)'}
                              </span>
                              {(!tr.passed || tr.isSample) && (
                                <div className="text-[10px] text-slate-400 font-mono space-y-0.5 mt-1">
                                  <p>Input: <code>{tr.input}</code></p>
                                  <p>Expected: <code className="text-brand-cyan">{tr.expectedOutput}</code></p>
                                  <p>Actual: <code className={tr.passed ? 'text-emerald-400' : 'text-rose-400'}>{tr.actualOutput}</code></p>
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {tr.executionTimeMs} ms
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
