import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { ArrowRight, Eye, RotateCcw, AlertTriangle } from 'lucide-react';

const PSEUDOCODES = {
  enqueue: [
    'function enqueue(queue, val):',
    '  if isFull(): throw QueueOverflow',
    '  if isEmpty(): front = rear = 0',
    '  else: rear = (rear + 1) % capacity // circular wrap',
    '  queue[rear] = val',
    '  return true // O(1)',
  ],
  dequeue: [
    'function dequeue(queue):',
    '  if isEmpty(): throw QueueUnderflow',
    '  val = queue[front]',
    '  if front == rear: front = rear = -1 // reset',
    '  else: front = (front + 1) % capacity',
    '  return val // O(1)',
  ],
  front: [
    'function front(queue):',
    '  if isEmpty(): throw QueueUnderflow',
    '  return queue[front] // O(1)',
  ],
};

export const QueueVisualizer: React.FC = () => {
  const CAPACITY = 6;
  const [isCircular, setIsCircular] = useState<boolean>(true);
  const [queue, setQueue] = useState<(number | null)[]>([14, 28, 42, null, null, null]);
  const [front, setFront] = useState<number>(0);
  const [rear, setRear] = useState<number>(2);
  const [count, setCount] = useState<number>(3);

  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);
  const [activeOp, setActiveOp] = useState<keyof typeof PSEUDOCODES>('enqueue');
  const [inputVal, setInputVal] = useState<string>('55');
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
  const displayQueue = currentStep ? currentStep.dataState.queue : queue;
  const displayFront = currentStep ? currentStep.dataState.front : front;
  const displayRear = currentStep ? currentStep.dataState.rear : rear;

  const handleEnqueue = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    setActiveOp('enqueue');
    setAlertNotice(null);

    if (count === CAPACITY) {
      setAlertNotice('Queue Overflow! All buffer slots are occupied.');
      return;
    }

    if (!isCircular && rear === CAPACITY - 1) {
      setAlertNotice('Linear Queue False Overflow! Rear reached end of array. (Switch to Circular Queue to reuse slots)');
      return;
    }

    const newRear = count === 0 ? 0 : isCircular ? (rear + 1) % CAPACITY : rear + 1;
    const newFront = count === 0 ? 0 : front;
    const updated = [...queue];
    updated[newRear] = val;
    const newCount = count + 1;

    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Check overflow: count (${count}) < capacity (${CAPACITY}). Safe to enqueue ${val}.`,
        codeLine: 2,
        dataState: { queue: [...queue], front, rear },
      },
      {
        id: 1,
        description: `Advance rear pointer: rear = (${rear} + 1) % ${CAPACITY} = ${newRear}.`,
        codeLine: 4,
        dataState: { queue: [...queue], front: newFront, rear: newRear },
        highlightedIndices: [newRear],
      },
      {
        id: 2,
        description: `Stored ${val} at index ${newRear}. FIFO order preserved. Queue size is now ${newCount}.`,
        codeLine: 5,
        dataState: { queue: updated, front: newFront, rear: newRear },
        highlightedIndices: [newRear],
      },
    ];

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setQueue(updated);
    setFront(newFront);
    setRear(newRear);
    setCount(newCount);
    setIsPlaying(true);
  };

  const handleDequeue = () => {
    setActiveOp('dequeue');
    setAlertNotice(null);

    if (count === 0) {
      setAlertNotice('Queue Underflow! Queue is completely empty.');
      return;
    }

    const val = queue[front];
    const updated = [...queue];
    updated[front] = null;
    const newCount = count - 1;
    const newFront = newCount === 0 ? -1 : isCircular ? (front + 1) % CAPACITY : front + 1;
    const newRear = newCount === 0 ? -1 : rear;

    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Extract front item ${val} from index ${front}.`,
        codeLine: 3,
        dataState: { queue: [...queue], front, rear },
        highlightedIndices: [front],
      },
      {
        id: 1,
        description: `Advance front pointer: front moves from ${front} to ${newFront}. Element ${val} dequeued in O(1) time.`,
        codeLine: 5,
        dataState: { queue: updated, front: newFront, rear: newRear },
      },
    ];

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setQueue(updated);
    setFront(newFront);
    setRear(newRear);
    setCount(newCount);
    setIsPlaying(true);
  };

  const handleFront = () => {
    setActiveOp('front');
    setAlertNotice(null);

    if (count === 0) {
      setAlertNotice('Queue is empty (no front element).');
      return;
    }

    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Inspecting FRONT element: queue[${front}] is ${queue[front]}. FIFO head remains unchanged.`,
        codeLine: 3,
        dataState: { queue: [...queue], front, rear },
        highlightedIndices: [front],
      },
    ];
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleClear = () => {
    setQueue([null, null, null, null, null, null]);
    setFront(-1);
    setRear(-1);
    setCount(0);
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
            Queue Data Structure Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            First-In First-Out (FIFO) buffer with capacity {CAPACITY} and pointer tracking.
          </p>
        </div>

        {/* Circular / Linear Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-dark-950 border border-slate-800 text-xs">
            <button
              onClick={() => setIsCircular(true)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                isCircular ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Circular Queue
            </button>
            <button
              onClick={() => setIsCircular(false)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                !isCircular ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Linear Queue
            </button>
          </div>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {alertNotice && (
        <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{alertNotice}</span>
        </div>
      )}

      {/* Main Queue Buffer Canvas */}
      <div className="p-8 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl flex flex-col items-center justify-center min-h-[300px]">
        {/* Buffer Cells */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-8">
          {displayQueue.map((item: number | null, idx: number) => {
            const isFront = idx === displayFront && count > 0;
            const isRear = idx === displayRear && count > 0;
            const isHighlighted = currentStep?.highlightedIndices?.includes(idx);

            let borderStyle = 'border-slate-700';
            let bgStyle = 'bg-slate-800/80';
            let textStyle = 'text-white';

            if (isHighlighted) {
              borderStyle = 'border-brand-cyan ring-2 ring-brand-cyan/60 scale-105 shadow-lg shadow-cyan-500/20';
              bgStyle = 'bg-brand-cyan/20';
              textStyle = 'text-brand-cyan font-bold';
            } else if (isFront && isRear) {
              borderStyle = 'border-brand-violet ring-1 ring-brand-violet/60';
              bgStyle = 'bg-brand-violet/20';
            } else if (isFront) {
              borderStyle = 'border-brand-emerald ring-1 ring-brand-emerald/60';
              bgStyle = 'bg-emerald-500/15';
            } else if (isRear) {
              borderStyle = 'border-brand-blue ring-1 ring-brand-blue/60';
              bgStyle = 'bg-brand-blue/15';
            }

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Pointer Tag */}
                <div className="h-6 text-[10px] font-mono font-bold flex items-center gap-1">
                  {isFront && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      FRONT
                    </span>
                  )}
                  {isRear && (
                    <span className="px-1.5 py-0.5 rounded bg-brand-blue/20 text-blue-300 border border-brand-blue/30">
                      REAR
                    </span>
                  )}
                </div>

                {/* Queue Cell Box */}
                <div
                  className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl flex items-center justify-center font-bold font-mono text-base sm:text-lg border-2 transition-all duration-300 ${borderStyle} ${bgStyle} ${textStyle}`}
                >
                  {item !== null ? item : <span className="text-slate-600 font-normal">∅</span>}
                </div>

                {/* Index Indicator */}
                <div className="mt-2 text-center text-xs font-mono text-slate-400">
                  [{idx}]
                </div>
              </div>
            );
          })}
        </div>

        {/* State Summary Row */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <span>Front: <strong className="text-emerald-400">{displayFront}</strong> | </span>
            <span>Rear: <strong className="text-blue-400">{displayRear}</strong> | </span>
            <span>Count: <strong className="text-white">{count}/{CAPACITY}</strong></span>
          </div>
          <div>
            <span>Wrap formula: <code className="text-brand-cyan">rear = (rear + 1) % {CAPACITY}</code></span>
          </div>
        </div>
      </div>

      {/* Operation Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Enqueue Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Enqueue (Insert at Rear)
          </h4>
          <input
            type="number"
            placeholder="Value to enqueue"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-blue"
          />
          <button
            onClick={handleEnqueue}
            disabled={count === CAPACITY}
            className="w-full py-2 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 disabled:opacity-40 disabled:cursor-not-allowed border border-brand-blue/40 text-brand-blue text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <ArrowRight className="w-3.5 h-3.5" /> Enqueue O(1)
          </button>
        </div>

        {/* Dequeue Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Dequeue (Remove from Front)
          </h4>
          <p className="text-[11px] text-slate-400">Pops element at current FRONT index</p>
          <button
            onClick={handleDequeue}
            disabled={count === 0}
            className="w-full py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <ArrowRight className="w-3.5 h-3.5" /> Dequeue O(1)
          </button>
        </div>

        {/* Front / Peek Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Front (Inspect First)
          </h4>
          <p className="text-[11px] text-slate-400">Reads front element without removal</p>
          <button
            onClick={handleFront}
            disabled={count === 0}
            className="w-full py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" /> Front O(1)
          </button>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Enqueue and dequeue items to explore circular buffer wrap-around behavior.'}
        complexityNotice="Circular Queues eliminate false overflow by wrapping indices modulo capacity, ensuring O(1) insertions."
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
