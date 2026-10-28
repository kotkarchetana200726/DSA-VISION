import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { ArrowDown, ArrowUp, Eye, RotateCcw, AlertTriangle } from 'lucide-react';

const PSEUDOCODES = {
  push: [
    'function push(stack, capacity, value):',
    '  if top == capacity - 1: throw StackOverflow',
    '  top = top + 1',
    '  stack[top] = value',
    '  return true // O(1)',
  ],
  pop: [
    'function pop(stack):',
    '  if top == -1: throw StackUnderflow',
    '  val = stack[top]',
    '  top = top - 1',
    '  return val // O(1)',
  ],
  peek: [
    'function peek(stack):',
    '  if top == -1: throw StackUnderflow',
    '  return stack[top] // O(1)',
  ],
};

export const StackVisualizer: React.FC = () => {
  const CAPACITY = 6;
  const [stack, setStack] = useState<number[]>([10, 25, 45]);
  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);
  const [activeOp, setActiveOp] = useState<keyof typeof PSEUDOCODES>('push');
  const [inputVal, setInputVal] = useState<string>('70');
  const [alertNotice, setAlertNotice] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          setCurrentStepIdx(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIdx, steps.length, speed]);

  const currentStep = steps[currentStepIdx];
  const displayStack: number[] = currentStep ? currentStep.dataState : stack;

  const handlePush = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    setActiveOp('push');
    setAlertNotice(null);

    if (stack.length >= CAPACITY) {
      setAlertNotice('Stack Overflow! Cannot push into full stack (top == capacity - 1).');
      const errSteps: VisualizerStep[] = [
        {
          id: 0,
          description: `Stack Overflow Error: Current size ${stack.length} equals capacity ${CAPACITY}. Cannot push ${val}.`,
          codeLine: 2,
          dataState: [...stack],
        },
      ];
      setSteps(errSteps);
      setCurrentStepIdx(0);
      return;
    }

    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Check overflow condition: top (${stack.length - 1}) < capacity - 1 (${CAPACITY - 1}). Safe to push.`,
        codeLine: 2,
        dataState: [...stack],
      },
      {
        id: 1,
        description: `Increment top pointer: top = ${stack.length}.`,
        codeLine: 3,
        dataState: [...stack],
      },
      {
        id: 2,
        description: `Pushed ${val} onto top of the stack. Element is now the most recently inserted (LIFO).`,
        codeLine: 4,
        dataState: [...stack, val],
        highlightedIndices: [stack.length],
      },
    ];

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setStack([...stack, val]);
    setIsPlaying(true);
  };

  const handlePop = () => {
    setActiveOp('pop');
    setAlertNotice(null);

    if (stack.length === 0) {
      setAlertNotice('Stack Underflow! Cannot pop from empty stack (top == -1).');
      const errSteps: VisualizerStep[] = [
        {
          id: 0,
          description: `Stack Underflow Error: Top == -1 (empty stack). No elements to pop.`,
          codeLine: 2,
          dataState: [],
        },
      ];
      setSteps(errSteps);
      setCurrentStepIdx(0);
      return;
    }

    const poppedVal = stack[stack.length - 1];
    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Read top element at index ${stack.length - 1} containing value ${poppedVal}.`,
        codeLine: 3,
        dataState: [...stack],
        highlightedIndices: [stack.length - 1],
      },
      {
        id: 1,
        description: `Decrement top pointer and remove ${poppedVal}. LIFO extraction completed in O(1) time.`,
        codeLine: 4,
        dataState: stack.slice(0, -1),
      },
    ];

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setStack(stack.slice(0, -1));
    setIsPlaying(true);
  };

  const handlePeek = () => {
    setActiveOp('peek');
    setAlertNotice(null);

    if (stack.length === 0) {
      setAlertNotice('Stack Underflow on peek: Stack is empty.');
      return;
    }

    const topVal = stack[stack.length - 1];
    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Peek top element: stack[${stack.length - 1}] is ${topVal}. No elements removed.`,
        codeLine: 3,
        dataState: [...stack],
        highlightedIndices: [stack.length - 1],
      },
    ];
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleClear = () => {
    setStack([]);
    setSteps([]);
    setCurrentStepIdx(0);
    setAlertNotice(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Stack Data Structure Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Last-In First-Out (LIFO) model with fixed capacity of {CAPACITY} elements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Stack
          </button>
        </div>
      </div>

      {alertNotice && (
        <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{alertNotice}</span>
        </div>
      )}

      {/* Main Stack Container Visualizer */}
      <div className="p-8 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl flex flex-col md:flex-row items-center justify-around gap-8 min-h-[360px]">
        {/* Stack Bucket Visualizer */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono text-slate-400 mb-2">
            Stack Top ⬇
          </div>

          {/* The Stack Box Container */}
          <div className="w-48 sm:w-56 h-72 border-b-4 border-l-4 border-r-4 border-slate-600 rounded-b-2xl p-2.5 flex flex-col-reverse justify-start gap-1.5 bg-dark-950/80 relative shadow-inner">
            {/* Capacity Guide Slots */}
            {Array.from({ length: CAPACITY }).map((_, idx) => {
              const item = displayStack[idx];
              const isTop = idx === displayStack.length - 1;
              const isHighlighted = currentStep?.highlightedIndices?.includes(idx);

              return (
                <div
                  key={idx}
                  className={`h-9 rounded-lg flex items-center justify-between px-3 border transition-all duration-300 font-mono text-sm font-bold ${
                    item !== undefined
                      ? isHighlighted
                        ? 'bg-brand-cyan/30 border-brand-cyan text-brand-cyan shadow-md shadow-cyan-500/20 scale-102 ring-2 ring-brand-cyan/60'
                        : isTop
                        ? 'bg-brand-blue/30 border-brand-blue text-white ring-1 ring-brand-blue/50'
                        : 'bg-slate-800/90 border-slate-700 text-slate-200'
                      : 'border-dashed border-slate-800 text-slate-700'
                  }`}
                >
                  <span className="text-xs text-slate-500 font-mono">[{idx}]</span>
                  <span>{item !== undefined ? item : '—'}</span>
                  {isTop && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                      TOP
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs font-mono text-slate-400 mt-2">
            Base Address (Index 0)
          </div>
        </div>

        {/* Stack State Indicators & Metrics */}
        <div className="space-y-4 max-w-sm w-full">
          <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Stack State Metrics
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Current Size:</span>
                <span className="font-bold text-white">{displayStack.length} / {CAPACITY}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Top Index:</span>
                <span className="font-bold text-brand-cyan">
                  {displayStack.length > 0 ? displayStack.length - 1 : -1}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Top Element:</span>
                <span className="font-bold text-brand-blue">
                  {displayStack.length > 0 ? displayStack[displayStack.length - 1] : 'NONE'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Status:</span>
                <span className={`font-bold ${
                  displayStack.length === CAPACITY ? 'text-rose-400' : displayStack.length === 0 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {displayStack.length === CAPACITY ? 'FULL (Overflow risk)' : displayStack.length === 0 ? 'EMPTY (Underflow risk)' : 'NORMAL'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Value to push"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handlePush}
                disabled={displayStack.length >= CAPACITY}
                className="py-2 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 disabled:opacity-40 disabled:cursor-not-allowed border border-brand-cyan/40 text-brand-cyan text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <ArrowDown className="w-3.5 h-3.5" /> Push
              </button>
              <button
                onClick={handlePop}
                disabled={displayStack.length === 0}
                className="py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Pop
              </button>
              <button
                onClick={handlePeek}
                disabled={displayStack.length === 0}
                className="py-2 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 disabled:opacity-40 disabled:cursor-not-allowed border border-brand-blue/40 text-brand-blue text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" /> Peek
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Push or Pop elements to demonstrate LIFO stack semantics.'}
        complexityNotice="Push, Pop, and Peek operations operate strictly on top pointer in guaranteed O(1) constant time."
      />

      {/* Controls & Pseudocode Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <VisualizerControls
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onNext={() => setCurrentStepIdx(prev => Math.min(prev + 1, steps.length - 1))}
            onPrev={() => setCurrentStepIdx(prev => Math.max(prev - 1, 0))}
            onReset={() => {
              setIsPlaying(false);
              setCurrentStepIdx(0);
            }}
            currentStep={currentStepIdx}
            totalSteps={steps.length}
            speed={speed}
            onSpeedChange={setSpeed}
            canNext={currentStepIdx < steps.length - 1}
            canPrev={currentStepIdx > 0}
          />
        </div>

        <div className="lg:col-span-1">
          <PseudocodePanel
            codeLines={PSEUDOCODES[activeOp]}
            activeLine={currentStep ? currentStep.codeLine : 1}
            title={`${activeOp.toUpperCase()} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
