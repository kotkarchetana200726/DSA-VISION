import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from '../visualizer/VisualizerControls';
import { PseudocodePanel } from '../visualizer/PseudocodePanel';
import { StepExplanation } from '../visualizer/StepExplanation';
import { VisualizerStep, SortAlgorithmResult } from '../../types/dsa';
import { Shuffle, ArrowUpDown, Play, BarChart3, Clock, CheckCircle2, RefreshCw } from 'lucide-react';

type SortAlgo = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

const ALGO_DETAILS: Record<SortAlgo, {
  name: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: boolean;
  pseudocode: string[];
}> = {
  bubble: {
    name: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    pseudocode: [
      'for i = 0 to n - 2:',
      '  swapped = false',
      '  for j = 0 to n - 2 - i:',
      '    if arr[j] > arr[j + 1]:',
      '      swap(arr[j], arr[j + 1])',
      '      swapped = true',
      '  if not swapped: break // sorted',
    ],
  },
  selection: {
    name: 'Selection Sort',
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: false,
    pseudocode: [
      'for i = 0 to n - 2:',
      '  minIdx = i',
      '  for j = i + 1 to n - 1:',
      '    if arr[j] < arr[minIdx]: minIdx = j',
      '  swap(arr[i], arr[minIdx])',
    ],
  },
  insertion: {
    name: 'Insertion Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    pseudocode: [
      'for i = 1 to n - 1:',
      '  key = arr[i], j = i - 1',
      '  while j >= 0 and arr[j] > key:',
      '    arr[j + 1] = arr[j] // shift right',
      '    j = j - 1',
      '  arr[j + 1] = key',
    ],
  },
  merge: {
    name: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    pseudocode: [
      'function mergeSort(arr, l, r):',
      '  if l >= r: return',
      '  m = l + (r - l) / 2',
      '  mergeSort(arr, l, m)',
      '  mergeSort(arr, m + 1, r)',
      '  merge(arr, l, m, r) // linear merge',
    ],
  },
  quick: {
    name: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    stable: false,
    pseudocode: [
      'function quickSort(arr, low, high):',
      '  if low < high:',
      '    pi = partition(arr, low, high)',
      '    quickSort(arr, low, pi - 1)',
      '    quickSort(arr, pi + 1, high)',
    ],
  },
};

export const SortingLab: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<SortAlgo>('bubble');
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 22]);
  const [customInput, setCustomInput] = useState<string>('45, 12, 85, 32, 89, 39, 69, 22');
  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(450);
  const [isComparisonMode, setIsComparisonMode] = useState<boolean>(false);
  const [comparisonResults, setComparisonResults] = useState<SortAlgorithmResult[]>([]);

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
  const displayArray: number[] = currentStep ? currentStep.dataState : array;
  const maxVal = Math.max(...displayArray, 100);

  // GENERATE ANIMATION STEPS FOR EACH ALGORITHM
  const generateStepsForAlgo = (algo: SortAlgo, initialArr: number[]): VisualizerStep[] => {
    const list = [...initialArr];
    const n = list.length;
    const newSteps: VisualizerStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let writes = 0;

    newSteps.push({
      id: 0,
      description: `Starting ${ALGO_DETAILS[algo].name} on array of ${n} elements.`,
      codeLine: 1,
      dataState: [...list],
      counters: { comparisons: 0, swaps: 0, writes: 0 },
    });

    if (algo === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
          comparisons++;
          newSteps.push({
            id: newSteps.length,
            description: `Comparing elements arr[${j}] (${list[j]}) and arr[${j + 1}] (${list[j + 1]}).`,
            codeLine: 4,
            dataState: [...list],
            highlightedIndices: [j, j + 1],
            counters: { comparisons, swaps, writes },
          });

          if (list[j] > list[j + 1]) {
            swaps++;
            writes += 2;
            const tmp = list[j];
            list[j] = list[j + 1];
            list[j + 1] = tmp;
            swapped = true;

            newSteps.push({
              id: newSteps.length,
              description: `Swapped ${list[j + 1]} and ${list[j]} because ${list[j + 1]} > ${list[j]}.`,
              codeLine: 5,
              dataState: [...list],
              highlightedIndices: [j, j + 1],
              swappedIndices: [j, j + 1],
              counters: { comparisons, swaps, writes },
            });
          }
        }
        if (!swapped) break;
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        newSteps.push({
          id: newSteps.length,
          description: `Pass ${i + 1}: Initialized minimum index at ${i} (value ${list[i]}).`,
          codeLine: 2,
          dataState: [...list],
          highlightedIndices: [i],
          counters: { comparisons, swaps, writes },
        });

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          newSteps.push({
            id: newSteps.length,
            description: `Checking arr[${j}] (${list[j]}) vs current min arr[${minIdx}] (${list[minIdx]}).`,
            codeLine: 4,
            dataState: [...list],
            highlightedIndices: [j],
            secondaryIndices: [minIdx],
            counters: { comparisons, swaps, writes },
          });

          if (list[j] < list[minIdx]) {
            minIdx = j;
            newSteps.push({
              id: newSteps.length,
              description: `Found smaller element ${list[j]} at index ${j}! New minimum candidate.`,
              codeLine: 4,
              dataState: [...list],
              highlightedIndices: [minIdx],
              counters: { comparisons, swaps, writes },
            });
          }
        }

        if (minIdx !== i) {
          swaps++;
          writes += 2;
          const tmp = list[i];
          list[i] = list[minIdx];
          list[minIdx] = tmp;

          newSteps.push({
            id: newSteps.length,
            description: `Swapped minimum element ${list[i]} into its correct sorted position at index ${i}.`,
            codeLine: 5,
            dataState: [...list],
            highlightedIndices: [i, minIdx],
            swappedIndices: [i, minIdx],
            counters: { comparisons, swaps, writes },
          });
        }
      }
    } else if (algo === 'insertion') {
      for (let i = 1; i < n; i++) {
        const key = list[i];
        let j = i - 1;
        writes++;

        newSteps.push({
          id: newSteps.length,
          description: `Pick key element arr[${i}] = ${key} to insert into sorted left portion.`,
          codeLine: 2,
          dataState: [...list],
          highlightedIndices: [i],
          counters: { comparisons, swaps, writes },
        });

        while (j >= 0) {
          comparisons++;
          if (list[j] > key) {
            list[j + 1] = list[j];
            writes++;
            newSteps.push({
              id: newSteps.length,
              description: `Shift element ${list[j]} right from index ${j} to ${j + 1}.`,
              codeLine: 4,
              dataState: [...list],
              highlightedIndices: [j, j + 1],
              counters: { comparisons, swaps, writes },
            });
            j--;
          } else {
            break;
          }
        }
        list[j + 1] = key;
        writes++;

        newSteps.push({
          id: newSteps.length,
          description: `Placed key ${key} into sorted position at index ${j + 1}.`,
          codeLine: 6,
          dataState: [...list],
          highlightedIndices: [j + 1],
          counters: { comparisons, swaps, writes },
        });
      }
    } else if (algo === 'merge') {
      const ms = (l: number, r: number) => {
        if (l >= r) return;
        const m = Math.floor(l + (r - l) / 2);
        ms(l, m);
        ms(m + 1, r);

        // Merge step
        const leftArr = list.slice(l, m + 1);
        const rightArr = list.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;

        newSteps.push({
          id: newSteps.length,
          description: `Merging sorted subarrays [${l}..${m}] and [${m + 1}..${r}].`,
          codeLine: 6,
          dataState: [...list],
          secondaryIndices: [l, r],
          counters: { comparisons, swaps, writes },
        });

        while (i < leftArr.length && j < rightArr.length) {
          comparisons++;
          writes++;
          if (leftArr[i] <= rightArr[j]) {
            list[k] = leftArr[i++];
          } else {
            list[k] = rightArr[j++];
          }
          newSteps.push({
            id: newSteps.length,
            description: `Wrote ${list[k]} into merged array at index ${k}.`,
            codeLine: 6,
            dataState: [...list],
            highlightedIndices: [k],
            counters: { comparisons, swaps, writes },
          });
          k++;
        }

        while (i < leftArr.length) {
          writes++;
          list[k] = leftArr[i++];
          newSteps.push({
            id: newSteps.length,
            description: `Remaining left element ${list[k]} placed at index ${k}.`,
            codeLine: 6,
            dataState: [...list],
            highlightedIndices: [k],
            counters: { comparisons, swaps, writes },
          });
          k++;
        }

        while (j < rightArr.length) {
          writes++;
          list[k] = rightArr[j++];
          newSteps.push({
            id: newSteps.length,
            description: `Remaining right element ${list[k]} placed at index ${k}.`,
            codeLine: 6,
            dataState: [...list],
            highlightedIndices: [k],
            counters: { comparisons, swaps, writes },
          });
          k++;
        }
      };

      ms(0, n - 1);
    } else if (algo === 'quick') {
      const qs = (low: number, high: number) => {
        if (low < high) {
          // Partition around pivot (last element)
          const pivot = list[high];
          let i = low - 1;

          newSteps.push({
            id: newSteps.length,
            description: `Selected pivot ${pivot} at index ${high} for range [${low}..${high}].`,
            codeLine: 3,
            dataState: [...list],
            highlightedIndices: [high],
            secondaryIndices: [low, high],
            counters: { comparisons, swaps, writes },
          });

          for (let j = low; j < high; j++) {
            comparisons++;
            newSteps.push({
              id: newSteps.length,
              description: `Comparing arr[${j}] (${list[j]}) with pivot ${pivot}.`,
              codeLine: 3,
              dataState: [...list],
              highlightedIndices: [j, high],
              counters: { comparisons, swaps, writes },
            });

            if (list[j] < pivot) {
              i++;
              if (i !== j) {
                swaps++;
                writes += 2;
                const tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
                newSteps.push({
                  id: newSteps.length,
                  description: `Swapped smaller element ${list[i]} to left partition at index ${i}.`,
                  codeLine: 3,
                  dataState: [...list],
                  highlightedIndices: [i, j],
                  counters: { comparisons, swaps, writes },
                });
              }
            }
          }

          // Place pivot
          swaps++;
          writes += 2;
          const tmp = list[i + 1];
          list[i + 1] = list[high];
          list[high] = tmp;
          const pi = i + 1;

          newSteps.push({
            id: newSteps.length,
            description: `Pivot ${pivot} placed into its final partition position at index ${pi}.`,
            codeLine: 3,
            dataState: [...list],
            highlightedIndices: [pi],
            counters: { comparisons, swaps, writes },
          });

          qs(low, pi - 1);
          qs(pi + 1, high);
        }
      };

      qs(0, n - 1);
    }

    newSteps.push({
      id: newSteps.length,
      description: `Algorithm complete! Array is fully sorted. Total comparisons: ${comparisons}, swaps: ${swaps}, writes: ${writes}.`,
      codeLine: 1,
      dataState: [...list],
      counters: { comparisons, swaps, writes },
    });

    return newSteps;
  };

  const startSort = () => {
    const newSteps = generateStepsForAlgo(selectedAlgo, array);
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const randomizeArray = () => {
    const count = 8;
    const rand = Array.from({ length: count }, () => Math.floor(Math.random() * 85) + 15);
    setArray(rand);
    setCustomInput(rand.join(', '));
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const applyCustomInput = () => {
    const parsed = customInput
      .split(',')
      .map(x => parseInt(x.trim(), 10))
      .filter(x => !isNaN(x));

    if (parsed.length < 2 || parsed.length > 14) {
      alert('Please enter between 2 and 14 comma-separated integers.');
      return;
    }

    setArray(parsed);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  // TRUE BROWSER BENCHMARK EXECUTION FOR COMPARISON MODE
  const runComparisonBenchmark = () => {
    const algos: SortAlgo[] = ['bubble', 'selection', 'insertion', 'merge', 'quick'];
    const results: SortAlgorithmResult[] = [];

    // Larger array for measurable browser execution timing (e.g. 500 items cloned)
    const benchmarkSize = 500;
    const baseBenchArray = Array.from({ length: benchmarkSize }, () => Math.floor(Math.random() * 1000));

    algos.forEach((algo) => {
      const arrCopy = [...baseBenchArray];
      let comps = 0;
      let swaps = 0;
      let writes = 0;

      const start = performance.now();

      if (algo === 'bubble') {
        for (let i = 0; i < arrCopy.length - 1; i++) {
          let swapped = false;
          for (let j = 0; j < arrCopy.length - 1 - i; j++) {
            comps++;
            if (arrCopy[j] > arrCopy[j + 1]) {
              swaps++;
              writes += 2;
              const tmp = arrCopy[j];
              arrCopy[j] = arrCopy[j + 1];
              arrCopy[j + 1] = tmp;
              swapped = true;
            }
          }
          if (!swapped) break;
        }
      } else if (algo === 'selection') {
        for (let i = 0; i < arrCopy.length - 1; i++) {
          let minIdx = i;
          for (let j = i + 1; j < arrCopy.length; j++) {
            comps++;
            if (arrCopy[j] < arrCopy[minIdx]) minIdx = j;
          }
          if (minIdx !== i) {
            swaps++;
            writes += 2;
            const tmp = arrCopy[i];
            arrCopy[i] = arrCopy[minIdx];
            arrCopy[minIdx] = tmp;
          }
        }
      } else if (algo === 'insertion') {
        for (let i = 1; i < arrCopy.length; i++) {
          const key = arrCopy[i];
          let j = i - 1;
          writes++;
          while (j >= 0) {
            comps++;
            if (arrCopy[j] > key) {
              arrCopy[j + 1] = arrCopy[j];
              writes++;
              j--;
            } else break;
          }
          arrCopy[j + 1] = key;
          writes++;
        }
      } else if (algo === 'merge') {
        const ms = (l: number, r: number) => {
          if (l >= r) return;
          const m = Math.floor(l + (r - l) / 2);
          ms(l, m);
          ms(m + 1, r);
          const left = arrCopy.slice(l, m + 1);
          const right = arrCopy.slice(m + 1, r + 1);
          let i = 0, j = 0, k = l;
          while (i < left.length && j < right.length) {
            comps++;
            writes++;
            if (left[i] <= right[j]) arrCopy[k++] = left[i++];
            else arrCopy[k++] = right[j++];
          }
          while (i < left.length) { writes++; arrCopy[k++] = left[i++]; }
          while (j < right.length) { writes++; arrCopy[k++] = right[j++]; }
        };
        ms(0, arrCopy.length - 1);
      } else if (algo === 'quick') {
        const qs = (l: number, h: number) => {
          if (l < h) {
            const p = arrCopy[h];
            let i = l - 1;
            for (let j = l; j < h; j++) {
              comps++;
              if (arrCopy[j] < p) {
                i++;
                swaps++;
                writes += 2;
                const tmp = arrCopy[i];
                arrCopy[i] = arrCopy[j];
                arrCopy[j] = tmp;
              }
            }
            swaps++;
            writes += 2;
            const tmp = arrCopy[i + 1];
            arrCopy[i + 1] = arrCopy[h];
            arrCopy[h] = tmp;
            const pi = i + 1;
            qs(l, pi - 1);
            qs(pi + 1, h);
          }
        };
        qs(0, arrCopy.length - 1);
      }

      const end = performance.now();
      const measuredTimeMs = parseFloat((end - start).toFixed(3));

      results.push({
        name: ALGO_DETAILS[algo].name,
        comparisons: comps,
        swaps,
        writes,
        measuredTimeMs,
        bestTime: ALGO_DETAILS[algo].best,
        averageTime: ALGO_DETAILS[algo].average,
        worstTime: ALGO_DETAILS[algo].worst,
        spaceComplexity: ALGO_DETAILS[algo].space,
        isStable: ALGO_DETAILS[algo].stable,
      });
    });

    setComparisonResults(results);
    setIsComparisonMode(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Sorting Laboratory & Performance Benchmark
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare Bubble, Selection, Insertion, Merge, and Quick Sort with live step animations and genuine timing.
          </p>
        </div>

        {/* Algorithm Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex p-1 rounded-xl bg-dark-950 border border-slate-800 text-xs">
            {(['bubble', 'selection', 'insertion', 'merge', 'quick'] as SortAlgo[]).map((algo) => (
              <button
                key={algo}
                onClick={() => {
                  setSelectedAlgo(algo);
                  setSteps([]);
                  setCurrentStepIdx(0);
                  setIsComparisonMode(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg capitalize font-semibold transition-all ${
                  selectedAlgo === algo && !isComparisonMode
                    ? 'bg-brand-cyan text-dark-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {algo}
              </button>
            ))}
          </div>

          <button
            onClick={runComparisonBenchmark}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isComparisonMode
                ? 'bg-brand-violet text-white border-brand-violet shadow-lg shadow-violet-500/20'
                : 'bg-brand-violet/20 hover:bg-brand-violet/30 border-brand-violet/40 text-brand-violet'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Comparison Mode
          </button>
        </div>
      </div>

      {/* Main Visualizer or Comparison View */}
      {!isComparisonMode ? (
        <div className="space-y-6">
          {/* Bar Chart Visualization Canvas */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl min-h-[340px] flex flex-col justify-end">
            <div className="flex items-end justify-center gap-2 sm:gap-4 h-64 pt-6 px-4">
              {displayArray.map((val, idx) => {
                const heightPercent = Math.max(12, Math.round((val / maxVal) * 100));
                const isHighlighted = currentStep?.highlightedIndices?.includes(idx);
                const isSecondary = currentStep?.secondaryIndices?.includes(idx);
                const isSwapped = currentStep?.swappedIndices?.includes(idx as any);

                let barColor = 'from-slate-700 to-slate-800 border-slate-600 text-slate-300';
                if (isSwapped) {
                  barColor = 'from-rose-500 to-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/30 scale-102';
                } else if (isHighlighted) {
                  barColor = 'from-cyan-400 to-cyan-500 border-cyan-300 text-dark-950 shadow-lg shadow-cyan-500/30 scale-102';
                } else if (isSecondary) {
                  barColor = 'from-blue-500 to-blue-600 border-blue-400 text-white';
                }

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center max-w-[55px] h-full justify-end">
                    <span className="text-xs font-mono font-bold mb-1 text-slate-300">{val}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg bg-gradient-to-t border-t-2 border-l border-r transition-all duration-300 flex items-center justify-center font-mono text-xs font-bold ${barColor}`}
                    ></div>
                    <span className="text-[10px] font-mono text-slate-500 mt-2">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Complexity Badges row */}
            <div className="mt-6 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
              <div>
                <span>Selected: <strong className="text-brand-cyan">{ALGO_DETAILS[selectedAlgo].name}</strong> | </span>
                <span>Best: <strong className="text-emerald-400">{ALGO_DETAILS[selectedAlgo].best}</strong> | </span>
                <span>Avg: <strong className="text-amber-400">{ALGO_DETAILS[selectedAlgo].average}</strong> | </span>
                <span>Worst: <strong className="text-rose-400">{ALGO_DETAILS[selectedAlgo].worst}</strong></span>
              </div>
              <div>
                <span>Aux Space: <strong className="text-violet-400">{ALGO_DETAILS[selectedAlgo].space}</strong> | </span>
                <span>Stable: <strong className="text-white">{ALGO_DETAILS[selectedAlgo].stable ? 'Yes' : 'No'}</strong></span>
              </div>
            </div>
          </div>

          {/* Input & Action Bar */}
          <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto flex-1">
              <span className="text-xs font-medium text-slate-400 shrink-0">Custom Array:</span>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g. 15, 42, 8, 99, 23"
                className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan font-mono"
              />
              <button
                onClick={applyCustomInput}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold shrink-0"
              >
                Set
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={randomizeArray}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Shuffle className="w-3.5 h-3.5" /> Random
              </button>

              <button
                onClick={startSort}
                className="px-4 py-1.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Sort Array
              </button>
            </div>
          </div>

          {/* Step Explanation Banner */}
          <StepExplanation
            description={currentStep?.description || `Ready to sort using ${ALGO_DETAILS[selectedAlgo].name}. Click "Sort Array" or step through the algorithm.`}
            counters={currentStep?.counters}
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
                codeLines={ALGO_DETAILS[selectedAlgo].pseudocode}
                activeLine={currentStep ? currentStep.codeLine : 1}
                title={`${ALGO_DETAILS[selectedAlgo].name} Pseudocode`}
              />
            </div>
          </div>
        </div>
      ) : (
        /* COMPARISON MODE VIEW */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-violet" />
                  Algorithm Comparison Benchmark
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Identical copy of 500 random elements sorted by each algorithm simultaneously in the browser.
                </p>
              </div>

              <button
                onClick={runComparisonBenchmark}
                className="px-3.5 py-2 rounded-xl bg-brand-violet hover:bg-violet-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-violet-500/25 active:scale-95 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-run Benchmark
              </button>
            </div>

            {/* Performance Comparison Bar Chart */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Comparisons Count (Operations)
              </div>
              <div className="space-y-3">
                {comparisonResults.map((res) => {
                  const maxComp = Math.max(...comparisonResults.map(r => r.comparisons), 1);
                  const barWidth = Math.max(5, Math.round((res.comparisons / maxComp) * 100));

                  return (
                    <div key={res.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-slate-200">{res.name}</span>
                        <span className="text-brand-cyan">{res.comparisons.toLocaleString()} comparisons</span>
                      </div>
                      <div className="h-3 rounded-full bg-dark-950 overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${barWidth}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue transition-all duration-500"
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comprehensive Metrics Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Algorithm</th>
                    <th className="p-3">Measured Time (approx)*</th>
                    <th className="p-3">Comparisons</th>
                    <th className="p-3">Swaps</th>
                    <th className="p-3">Time Complexity (Best / Avg / Worst)</th>
                    <th className="p-3">Aux Space</th>
                    <th className="p-3">Stable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-dark-950/60">
                  {comparisonResults.map((res) => (
                    <tr key={res.name} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {res.name}
                      </td>
                      <td className="p-3 text-amber-300 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {res.measuredTimeMs} ms
                      </td>
                      <td className="p-3 text-brand-cyan font-bold">{res.comparisons.toLocaleString()}</td>
                      <td className="p-3 text-slate-300">{res.swaps.toLocaleString()}</td>
                      <td className="p-3 text-slate-300">
                        <span className="text-emerald-400">{res.bestTime}</span> /{' '}
                        <span className="text-amber-400">{res.averageTime}</span> /{' '}
                        <span className="text-rose-400">{res.worstTime}</span>
                      </td>
                      <td className="p-3 text-violet-300">{res.spaceComplexity}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          res.isStable ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {res.isStable ? 'YES' : 'NO'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-[11px] text-slate-400">
              * <strong>Measurement Disclaimer:</strong> Browser execution times are measured via high-resolution <code>performance.now()</code> timers running pure in-memory loops. Timing is subject to browser JIT compilation and system thread scheduling; theoretical Big-O curves represent mathematical upper bounds independent of hardware clock speeds.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
