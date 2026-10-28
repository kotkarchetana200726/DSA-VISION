import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { Plus, ArrowDown, Eye, RefreshCw, Shuffle } from 'lucide-react';

type HeapType = 'min' | 'max';

const PSEUDOCODES = {
  insert: [
    'function insert(heap, val):',
    '  heap.push(val) // Append at end',
    '  i = heap.length - 1',
    '  while i > 0 and heap[parent(i)] violates property:',
    '    swap(heap[i], heap[parent(i)])',
    '    i = parent(i) // Heapify Up O(log n)',
  ],
  extract: [
    'function extractRoot(heap):',
    '  root = heap[0]',
    '  heap[0] = heap.pop() // Move last to root',
    '  heapifyDown(0) // Sink down O(log n)',
    '  return root',
  ],
  peek: [
    'function peek(heap):',
    '  return heap[0] // O(1) root access',
  ],
};

export const HeapVisualizer: React.FC = () => {
  const [heapType, setHeapType] = useState<HeapType>('max');
  // Initial max-heap: 90, 75, 80, 50, 60, 40, 70
  const [heap, setHeap] = useState<number[]>([90, 75, 80, 50, 60, 40, 70]);
  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);
  const [activeOp, setActiveOp] = useState<keyof typeof PSEUDOCODES>('insert');
  const [inputVal, setInputVal] = useState<string>('85');

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
  const displayHeap: number[] = currentStep ? currentStep.dataState : heap;

  // Comparison logic based on min/max
  const violates = (parent: number, child: number, type: HeapType) => {
    return type === 'max' ? parent < child : parent > child;
  };

  const handleInsert = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    if (heap.length >= 15) {
      alert('Heap visualizer limit is 15 nodes for complete tree visibility.');
      return;
    }
    setActiveOp('insert');

    const newSteps: VisualizerStep[] = [];
    const working = [...heap, val];
    let i = working.length - 1;
    let swaps = 0;

    newSteps.push({
      id: 0,
      description: `Append new value ${val} at the end of the array (index ${i}) to preserve complete tree shape.`,
      codeLine: 2,
      dataState: [...working],
      highlightedIndices: [i],
      counters: { swaps: 0 },
    });

    // Heapify Up
    while (i > 0) {
      const parentIdx = Math.floor((i - 1) / 2);
      if (violates(working[parentIdx], working[i], heapType)) {
        swaps++;
        newSteps.push({
          id: newSteps.length,
          description: `Heap property violated: parent[${parentIdx}] (${working[parentIdx]}) vs child[${i}] (${working[i]}). Swapping!`,
          codeLine: 5,
          dataState: [...working],
          highlightedIndices: [i, parentIdx],
          counters: { swaps },
        });

        // Swap
        const tmp = working[i];
        working[i] = working[parentIdx];
        working[parentIdx] = tmp;

        i = parentIdx;

        newSteps.push({
          id: newSteps.length,
          description: `Swapped. Node is now at index ${i}. Checking new parent...`,
          codeLine: 6,
          dataState: [...working],
          highlightedIndices: [i],
          counters: { swaps },
        });
      } else {
        break;
      }
    }

    newSteps.push({
      id: newSteps.length,
      description: `Heap property fully satisfied! Insertion of ${val} completed in O(log n) time.`,
      codeLine: 6,
      dataState: [...working],
      highlightedIndices: [i],
      counters: { swaps },
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setHeap(working);
    setIsPlaying(true);
  };

  const handleExtract = () => {
    if (heap.length === 0) return;
    setActiveOp('extract');
    const newSteps: VisualizerStep[] = [];
    const rootVal = heap[0];

    if (heap.length === 1) {
      newSteps.push({
        id: 0,
        description: `Extracted root ${rootVal}. Heap is now empty.`,
        codeLine: 2,
        dataState: [],
      });
      setSteps(newSteps);
      setCurrentStepIdx(0);
      setHeap([]);
      setIsPlaying(true);
      return;
    }

    const working = [...heap];
    const lastVal = working.pop()!;
    working[0] = lastVal;
    let swaps = 0;

    newSteps.push({
      id: 0,
      description: `Extract root ${rootVal}. Replaced root with last element (${lastVal}) from index ${heap.length - 1}.`,
      codeLine: 3,
      dataState: [...working],
      highlightedIndices: [0],
      counters: { swaps: 0 },
    });

    // Heapify Down
    let i = 0;
    while (true) {
      let targetIdx = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < working.length && violates(working[targetIdx], working[left], heapType)) {
        targetIdx = left;
      }
      if (right < working.length && violates(working[targetIdx], working[right], heapType)) {
        targetIdx = right;
      }

      if (targetIdx !== i) {
        swaps++;
        newSteps.push({
          id: newSteps.length,
          description: `Sinking root: swap node at index ${i} (${working[i]}) with child at index ${targetIdx} (${working[targetIdx]}).`,
          codeLine: 4,
          dataState: [...working],
          highlightedIndices: [i, targetIdx],
          counters: { swaps },
        });

        const tmp = working[i];
        working[i] = working[targetIdx];
        working[targetIdx] = tmp;

        i = targetIdx;
      } else {
        break;
      }
    }

    newSteps.push({
      id: newSteps.length,
      description: `Extracted root ${rootVal}. Heapify down completed in O(log n) time.`,
      codeLine: 5,
      dataState: [...working],
      counters: { swaps },
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setHeap(working);
    setIsPlaying(true);
  };

  const handlePeek = () => {
    if (heap.length === 0) return;
    setActiveOp('peek');
    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Peek root element: heap[0] is ${heap[0]} (${heapType === 'max' ? 'Maximum' : 'Minimum'}). Direct O(1) access.`,
        codeLine: 2,
        dataState: [...heap],
        highlightedIndices: [0],
      },
    ];
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const resetHeap = () => {
    const sample = heapType === 'max' ? [90, 75, 80, 50, 60, 40, 70] : [10, 25, 15, 50, 40, 60, 30];
    setHeap(sample);
    setSteps([]);
    setCurrentStepIdx(0);
  };

  // Compute node coordinates for complete binary tree of size up to 15
  const getCoordinates = (idx: number) => {
    const depth = Math.floor(Math.log2(idx + 1));
    const posInLevel = idx - (Math.pow(2, depth) - 1);
    const totalInLevel = Math.pow(2, depth);
    const width = 640;
    const spacing = width / (totalInLevel + 1);
    const x = spacing * (posInLevel + 1);
    const y = 35 + depth * 65;
    return { x, y };
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Binary Heap & Priority Queue Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete binary tree mapped onto flat array indexing: Parent = (i-1)/2, Children = 2i+1, 2i+2.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-dark-950 border border-slate-800 text-xs">
            <button
              onClick={() => {
                setHeapType('max');
                setHeap([90, 75, 80, 50, 60, 40, 70]);
                setSteps([]);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                heapType === 'max' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Max-Heap
            </button>
            <button
              onClick={() => {
                setHeapType('min');
                setHeap([10, 25, 15, 50, 40, 60, 30]);
                setSteps([]);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                heapType === 'min' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Min-Heap
            </button>
          </div>
          <button
            onClick={resetHeap}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Complete Binary Tree SVG Representation */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl relative overflow-x-auto min-h-[320px] flex flex-col justify-center">
        {displayHeap.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-mono text-sm">
            Heap is empty. Insert elements below.
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <svg className="w-full max-w-[650px] h-[260px]" viewBox="0 0 640 260">
              {/* Edges from parent to children */}
              {displayHeap.map((_, idx) => {
                const left = 2 * idx + 1;
                const right = 2 * idx + 2;
                const pCoord = getCoordinates(idx);
                return (
                  <React.Fragment key={`edges-${idx}`}>
                    {left < displayHeap.length && (
                      <line
                        x1={pCoord.x}
                        y1={pCoord.y}
                        x2={getCoordinates(left).x}
                        y2={getCoordinates(left).y}
                        stroke="#475569"
                        strokeWidth="2"
                      />
                    )}
                    {right < displayHeap.length && (
                      <line
                        x1={pCoord.x}
                        y1={pCoord.y}
                        x2={getCoordinates(right).x}
                        y2={getCoordinates(right).y}
                        stroke="#475569"
                        strokeWidth="2"
                      />
                    )}
                  </React.Fragment>
                );
              })}

              {/* Node Circles */}
              {displayHeap.map((val, idx) => {
                const coord = getCoordinates(idx);
                const isHighlighted = currentStep?.highlightedIndices?.includes(idx);
                const isRoot = idx === 0;

                let fill = '#1e293b';
                let stroke = '#64748b';
                let text = '#f1f5f9';

                if (isHighlighted) {
                  fill = '#0891b2';
                  stroke = '#22d3ee';
                  text = '#ffffff';
                } else if (isRoot) {
                  fill = '#1e3a8a';
                  stroke = '#3b82f6';
                }

                return (
                  <g key={`node-${idx}`} className="cursor-pointer">
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="18"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isHighlighted ? '3' : '2'}
                      className="transition-all duration-300"
                    />
                    <text
                      x={coord.x}
                      y={coord.y + 5}
                      textAnchor="middle"
                      fill={text}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Dual Representation: 1D Array Layout */}
      <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
          <span>Array Memory Mapping</span>
          <span className="text-brand-cyan">Parent=(i-1)/2 | Left=2i+1 | Right=2i+2</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {displayHeap.map((val, idx) => {
            const isHighlighted = currentStep?.highlightedIndices?.includes(idx);
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-11 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isHighlighted
                      ? 'bg-brand-cyan/25 border-brand-cyan text-brand-cyan scale-105 ring-1 ring-brand-cyan'
                      : idx === 0
                      ? 'bg-brand-blue/20 border-brand-blue text-blue-300'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200'
                  }`}
                >
                  {val}
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operation Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insert */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Insert Value
          </h4>
          <input
            type="number"
            placeholder="Value to insert"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan"
          />
          <button
            onClick={handleInsert}
            disabled={heap.length >= 15}
            className="w-full py-2 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 disabled:opacity-40 disabled:cursor-not-allowed border border-brand-cyan/40 text-brand-cyan text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> Insert & Heapify Up O(log n)
          </button>
        </div>

        {/* Extract Root */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Extract Root ({heapType === 'max' ? 'Max' : 'Min'})
          </h4>
          <p className="text-[11px] text-slate-400">Pops root and sinks down last element</p>
          <button
            onClick={handleExtract}
            disabled={heap.length === 0}
            className="w-full py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <ArrowDown className="w-3.5 h-3.5" /> Extract Root & Heapify Down
          </button>
        </div>

        {/* Peek */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Peek Root
          </h4>
          <p className="text-[11px] text-slate-400">Inspects root element in O(1) time</p>
          <button
            onClick={handlePeek}
            disabled={heap.length === 0}
            className="w-full py-2 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 disabled:opacity-40 disabled:cursor-not-allowed border border-brand-blue/40 text-brand-blue text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" /> Peek Root O(1)
          </button>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Select Insert or Extract Root to animate bubble-up and sink-down heapification.'}
        counters={currentStep?.counters}
        complexityNotice="Building a heap from an unsorted array takes linear O(n) time, while each insertion/extraction is logarithmic O(log n)."
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
