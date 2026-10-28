import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { Plus, Trash2, Edit3, Eye, Search, Shuffle, ArrowRight } from 'lucide-react';

const PSEUDOCODES = {
  access: [
    'function access(arr, index):',
    '  if index < 0 or index >= arr.length: throw OutOfBounds',
    '  return arr[index] // O(1) direct offset formula',
  ],
  insert: [
    'function insert(arr, index, value):',
    '  for i = arr.length down to index + 1:',
    '    arr[i] = arr[i - 1] // shift right',
    '  arr[index] = value // place new value',
    '  return arr',
  ],
  delete: [
    'function delete(arr, index):',
    '  for i = index to arr.length - 2:',
    '    arr[i] = arr[i + 1] // shift left',
    '  arr.pop()',
    '  return arr',
  ],
  update: [
    'function update(arr, index, value):',
    '  if index >= 0 and index < arr.length:',
    '    arr[index] = value // O(1) in-place rewrite',
  ],
  linearSearch: [
    'function linearSearch(arr, target):',
    '  for i = 0 to arr.length - 1:',
    '    if arr[i] == target: return i // Found',
    '  return -1 // Not Found',
  ],
  binarySearch: [
    'function binarySearch(arr, target):',
    '  low = 0, high = arr.length - 1',
    '  while low <= high:',
    '    mid = floor((low + high) / 2)',
    '    if arr[mid] == target: return mid',
    '    else if arr[mid] < target: low = mid + 1',
    '    else: high = mid - 1',
    '  return -1 // Target not found',
  ],
};

export const ArrayVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([15, 28, 42, 59, 73, 86, 94]);
  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);
  const [activeOp, setActiveOp] = useState<keyof typeof PSEUDOCODES>('access');

  // Input states
  const [inputVal, setInputVal] = useState<string>('50');
  const [inputIdx, setInputIdx] = useState<string>('3');
  const [searchVal, setSearchVal] = useState<string>('42');

  const timerRef = useRef<number | null>(null);

  // Playback timer
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

  const currentStep: VisualizerStep | undefined = steps[currentStepIdx];
  const displayArray: number[] = currentStep ? currentStep.dataState : array;

  // GENERATE STEPS FOR OPERATIONS
  const handleAccess = () => {
    const idx = parseInt(inputIdx, 10);
    if (isNaN(idx) || idx < 0 || idx >= array.length) {
      alert(`Index must be between 0 and ${array.length - 1}`);
      return;
    }
    setActiveOp('access');
    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Access element at index ${idx}. Verifying bounds 0 <= ${idx} < ${array.length}.`,
        codeLine: 2,
        dataState: [...array],
        highlightedIndices: [idx],
        counters: { accesses: 0 },
      },
      {
        id: 1,
        description: `Direct O(1) memory lookup: Base_Address + (${idx} * 4) bytes. Found element ${array[idx]} at index ${idx}.`,
        codeLine: 3,
        dataState: [...array],
        highlightedIndices: [idx],
        counters: { accesses: 1 },
      },
    ];
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleUpdate = () => {
    const idx = parseInt(inputIdx, 10);
    const val = parseInt(inputVal, 10);
    if (isNaN(idx) || idx < 0 || idx >= array.length || isNaN(val)) {
      alert(`Valid index (0..${array.length - 1}) and value required.`);
      return;
    }
    setActiveOp('update');
    const oldVal = array[idx];
    const updated = [...array];
    updated[idx] = val;

    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Targeting index ${idx} containing current value ${oldVal}.`,
        codeLine: 2,
        dataState: [...array],
        highlightedIndices: [idx],
        counters: { accesses: 1, writes: 0 },
      },
      {
        id: 1,
        description: `Updating index ${idx}: Overwrite ${oldVal} with new value ${val} in O(1) time.`,
        codeLine: 3,
        dataState: updated,
        highlightedIndices: [idx],
        counters: { accesses: 1, writes: 1 },
      },
    ];
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setArray(updated);
    setIsPlaying(true);
  };

  const handleInsert = () => {
    const idx = parseInt(inputIdx, 10);
    const val = parseInt(inputVal, 10);
    if (isNaN(idx) || idx < 0 || idx > array.length || isNaN(val)) {
      alert(`Valid index (0..${array.length}) and value required.`);
      return;
    }
    if (array.length >= 12) {
      alert('Array visualizer limit is 12 elements for optimal display.');
      return;
    }
    setActiveOp('insert');
    const newSteps: VisualizerStep[] = [];
    const working = [...array];
    let writes = 0;

    newSteps.push({
      id: newSteps.length,
      description: `Initiate insertion of ${val} at index ${idx}. All elements from index ${idx} to ${array.length - 1} must shift right.`,
      codeLine: 1,
      dataState: [...working],
      highlightedIndices: [idx],
      counters: { writes: 0 },
    });

    // Make room at end
    working.push(0);

    // Shift elements
    for (let i = working.length - 1; i > idx; i--) {
      working[i] = working[i - 1];
      writes++;
      newSteps.push({
        id: newSteps.length,
        description: `Shift element ${working[i]} right from index ${i - 1} to index ${i}.`,
        codeLine: 3,
        dataState: [...working],
        highlightedIndices: [i, i - 1],
        counters: { writes },
      });
    }

    working[idx] = val;
    writes++;
    newSteps.push({
      id: newSteps.length,
      description: `Insert new element ${val} at vacant index ${idx}. Total shifts: ${writes - 1}. Array size is now ${working.length}.`,
      codeLine: 4,
      dataState: [...working],
      highlightedIndices: [idx],
      counters: { writes },
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setArray(working);
    setIsPlaying(true);
  };

  const handleDelete = () => {
    const idx = parseInt(inputIdx, 10);
    if (isNaN(idx) || idx < 0 || idx >= array.length) {
      alert(`Valid index (0..${array.length - 1}) required.`);
      return;
    }
    if (array.length <= 1) {
      alert('Cannot delete the last remaining element in array.');
      return;
    }
    setActiveOp('delete');
    const newSteps: VisualizerStep[] = [];
    const working = [...array];
    const removedVal = working[idx];
    let writes = 0;

    newSteps.push({
      id: newSteps.length,
      description: `Delete element ${removedVal} at index ${idx}. Subsequent elements must shift left to close the gap.`,
      codeLine: 1,
      dataState: [...working],
      highlightedIndices: [idx],
      counters: { writes: 0 },
    });

    for (let i = idx; i < working.length - 1; i++) {
      working[i] = working[i + 1];
      writes++;
      newSteps.push({
        id: newSteps.length,
        description: `Shift element ${working[i]} left from index ${i + 1} to index ${i}.`,
        codeLine: 3,
        dataState: [...working],
        highlightedIndices: [i, i + 1],
        counters: { writes },
      });
    }

    working.pop();
    newSteps.push({
      id: newSteps.length,
      description: `Completed deletion of ${removedVal}. Final array length: ${working.length}.`,
      codeLine: 4,
      dataState: [...working],
      highlightedIndices: [],
      counters: { writes },
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setArray(working);
    setIsPlaying(true);
  };

  const handleLinearSearch = () => {
    const target = parseInt(searchVal, 10);
    if (isNaN(target)) {
      alert('Enter a valid target number to search.');
      return;
    }
    setActiveOp('linearSearch');
    const newSteps: VisualizerStep[] = [];
    let comparisons = 0;
    let found = false;

    newSteps.push({
      id: newSteps.length,
      description: `Starting Linear Search for target ${target} from index 0.`,
      codeLine: 1,
      dataState: [...array],
      highlightedIndices: [0],
      counters: { comparisons: 0 },
    });

    for (let i = 0; i < array.length; i++) {
      comparisons++;
      if (array[i] === target) {
        newSteps.push({
          id: newSteps.length,
          description: `Comparison ${comparisons}: array[${i}] == ${target} MATCHES! Target found at index ${i}.`,
          codeLine: 3,
          dataState: [...array],
          highlightedIndices: [i],
          counters: { comparisons },
        });
        found = true;
        break;
      } else {
        newSteps.push({
          id: newSteps.length,
          description: `Comparison ${comparisons}: array[${i}] (${array[i]}) != ${target}. Advancing to next index.`,
          codeLine: 2,
          dataState: [...array],
          highlightedIndices: [i],
          counters: { comparisons },
        });
      }
    }

    if (!found) {
      newSteps.push({
        id: newSteps.length,
        description: `Search completed after ${comparisons} comparisons. Target ${target} was NOT found in the array. Return -1.`,
        codeLine: 4,
        dataState: [...array],
        highlightedIndices: [],
        counters: { comparisons },
      });
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleBinarySearch = () => {
    const target = parseInt(searchVal, 10);
    if (isNaN(target)) {
      alert('Enter a valid target number to search.');
      return;
    }

    // Check if sorted
    const isSorted = array.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
    if (!isSorted) {
      alert('Note: Binary Search requires a sorted array! Sort the array first using the "Sort Array" button.');
      return;
    }

    setActiveOp('binarySearch');
    const newSteps: VisualizerStep[] = [];
    let low = 0;
    let high = array.length - 1;
    let comparisons = 0;
    let found = false;

    newSteps.push({
      id: newSteps.length,
      description: `Initialize Binary Search for target ${target}. Search range: low = 0, high = ${high}.`,
      codeLine: 2,
      dataState: [...array],
      highlightedIndices: [low, high],
      counters: { comparisons: 0 },
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      comparisons++;

      newSteps.push({
        id: newSteps.length,
        description: `Calculated midpoint index: mid = floor((${low} + ${high}) / 2) = ${mid} (value = ${array[mid]}).`,
        codeLine: 4,
        dataState: [...array],
        highlightedIndices: [mid],
        secondaryIndices: [low, high],
        counters: { comparisons },
      });

      if (array[mid] === target) {
        newSteps.push({
          id: newSteps.length,
          description: `Comparison ${comparisons}: array[mid] == ${target}! Target located at index ${mid}. O(log n) efficiency achieved!`,
          codeLine: 5,
          dataState: [...array],
          highlightedIndices: [mid],
          counters: { comparisons },
        });
        found = true;
        break;
      } else if (array[mid] < target) {
        newSteps.push({
          id: newSteps.length,
          description: `array[mid] (${array[mid]}) < ${target}. Target must be in the right half. Discarding left half (indices ${low}..${mid}). Setting low = ${mid + 1}.`,
          codeLine: 6,
          dataState: [...array],
          highlightedIndices: [mid],
          secondaryIndices: [low, high],
          counters: { comparisons },
        });
        low = mid + 1;
      } else {
        newSteps.push({
          id: newSteps.length,
          description: `array[mid] (${array[mid]}) > ${target}. Target must be in the left half. Discarding right half (indices ${mid}..${high}). Setting high = ${mid - 1}.`,
          codeLine: 7,
          dataState: [...array],
          highlightedIndices: [mid],
          secondaryIndices: [low, high],
          counters: { comparisons },
        });
        high = mid - 1;
      }
    }

    if (!found) {
      newSteps.push({
        id: newSteps.length,
        description: `Search interval exhausted (low > high). Target ${target} does not exist in array. Return -1.`,
        codeLine: 8,
        dataState: [...array],
        highlightedIndices: [],
        counters: { comparisons },
      });
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const generateRandomArray = () => {
    const count = 7;
    const rand = Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
    setArray(rand);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const sortArray = () => {
    const sorted = [...array].sort((a, b) => a - b);
    setArray(sorted);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Array Data Structure Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Contiguous memory representation with 0-based indexing and physical address calculation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={sortArray}
            className="px-3 py-1.5 rounded-lg bg-brand-indigo/20 hover:bg-brand-indigo/30 border border-brand-indigo/40 text-brand-indigo text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Sort the array to enable Binary Search"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            Sort Array
          </button>
          <button
            onClick={generateRandomArray}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Randomize
          </button>
        </div>
      </div>

      {/* Main Visualizer Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl relative overflow-hidden">
        {/* Memory address header indicator */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs text-slate-400">
          <span>Physical Representation (Memory Blocks)</span>
          <span className="font-mono text-brand-cyan">Array Length: {displayArray.length}</span>
        </div>

        {/* Array Cells Container */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 min-h-[160px]">
          {displayArray.map((val, idx) => {
            const isHighlighted = currentStep?.highlightedIndices?.includes(idx);
            const isSecondary = currentStep?.secondaryIndices?.includes(idx);

            let cellBg = 'bg-slate-800/90 border-slate-700 text-white';
            if (isHighlighted) {
              cellBg = 'bg-brand-cyan/25 border-brand-cyan text-brand-cyan shadow-lg shadow-cyan-500/20 scale-105 ring-2 ring-brand-cyan/50';
            } else if (isSecondary) {
              cellBg = 'bg-brand-blue/25 border-brand-blue text-blue-300 scale-100 ring-1 ring-brand-blue/40';
            }

            return (
              <div key={idx} className="flex flex-col items-center transition-all duration-300">
                {/* Pointer / Role Indicator */}
                <div className="h-5 text-[10px] font-mono font-bold">
                  {currentStep?.secondaryIndices?.[0] === idx && (
                    <span className="text-blue-400">LOW</span>
                  )}
                  {currentStep?.secondaryIndices?.[1] === idx && (
                    <span className="text-indigo-400">HIGH</span>
                  )}
                  {isHighlighted && activeOp === 'binarySearch' && (
                    <span className="text-brand-cyan">MID</span>
                  )}
                </div>

                {/* Array Block */}
                <div
                  className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl flex items-center justify-center font-bold font-mono text-base sm:text-lg border-2 transition-all duration-300 ${cellBg}`}
                >
                  {val}
                </div>

                {/* Index & Simulated Memory Address */}
                <div className="mt-2 text-center">
                  <span className="text-xs font-mono font-bold text-slate-400 block">
                    [{idx}]
                  </span>
                  <span className="text-[9px] font-mono text-slate-600 block">
                    0x{((idx * 4) + 1000).toString(16).toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Array formula callout */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
          <span>Address formula: <code className="text-brand-cyan">Base + (Index × 4B)</code></span>
          <span>Access: <strong className="text-emerald-400">O(1)</strong> | Insert/Delete: <strong className="text-amber-400">O(n)</strong></span>
        </div>
      </div>

      {/* Operation Controls & Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Access / Update Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-brand-blue" />
            Access / Update
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Index"
              value={inputIdx}
              onChange={(e) => setInputIdx(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
            <input
              type="number"
              placeholder="Value"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleAccess}
              className="flex-1 py-1.5 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 border border-brand-blue/40 text-brand-blue text-xs font-semibold transition-all active:scale-95"
            >
              Access O(1)
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 py-1.5 rounded-lg bg-brand-violet/20 hover:bg-brand-violet/30 border border-brand-violet/40 text-brand-violet text-xs font-semibold transition-all active:scale-95"
            >
              Update O(1)
            </button>
          </div>
        </div>

        {/* Insert / Delete Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-brand-emerald" />
            Insert / Delete
          </h4>
          <p className="text-[11px] text-slate-400">Uses index & value from above controls</p>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleInsert}
              className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" /> Insert
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>

        {/* Linear Search Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            Linear Search
          </h4>
          <input
            type="number"
            placeholder="Target to search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={handleLinearSearch}
            className="w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Search className="w-3 h-3" /> Linear Search O(n)
          </button>
        </div>

        {/* Binary Search Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-brand-cyan" />
            Binary Search
          </h4>
          <p className="text-[11px] text-slate-400">Requires sorted array (halves space)</p>
          <button
            onClick={handleBinarySearch}
            className="w-full py-1.5 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 border border-brand-cyan/40 text-brand-cyan text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Search className="w-3 h-3" /> Binary Search O(log n)
          </button>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Select any operation above to generate step-by-step interactive animations.'}
        counters={currentStep?.counters}
        complexityNotice={
          activeOp === 'binarySearch'
            ? 'Binary Search divides search interval in half at every comparison: T(n) = T(n/2) + O(1) = O(log n).'
            : activeOp === 'insert' || activeOp === 'delete'
            ? 'Inserting or deleting in the middle requires shifting on average n/2 elements: O(n).'
            : undefined
        }
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
