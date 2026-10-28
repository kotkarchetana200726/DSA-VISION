import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { Plus, Trash2, Search, RefreshCw, Hash, ArrowRight } from 'lucide-react';

type CollisionStrategy = 'chaining' | 'probing';

const TABLE_SIZE = 7;

const PSEUDOCODES = {
  chaining: [
    'function insertChaining(key, value):',
    '  index = hash(key) % TABLE_SIZE',
    '  bucket = table[index] // Linked List',
    '  if key in bucket: update(value)',
    '  else: bucket.append(key, value) // O(1) avg',
  ],
  probing: [
    'function insertProbing(key, value):',
    '  index = hash(key) % TABLE_SIZE',
    '  while table[index] is occupied and not DELETED:',
    '    if table[index].key == key: break',
    '    index = (index + 1) % TABLE_SIZE // Linear Probe',
    '  table[index] = (key, value) // Open addressing',
  ],
};

export const HashTableVisualizer: React.FC = () => {
  const [strategy, setStrategy] = useState<CollisionStrategy>('chaining');

  // Chaining state: array of number arrays
  const [chainTable, setChainTable] = useState<number[][]>([
    [14],
    [15, 22],
    [],
    [17],
    [],
    [26, 33],
    [],
  ]);

  // Probing state: array of values or null or 'DELETED'
  const [probeTable, setProbeTable] = useState<(number | 'DELETED' | null)[]>([
    14,
    15,
    22,
    17,
    null,
    26,
    33,
  ]);

  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(650);

  const [inputKey, setInputKey] = useState<string>('29');
  const [searchKey, setSearchKey] = useState<string>('22');

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

  // Hash Function: key % TABLE_SIZE
  const computeHash = (key: number) => {
    return Math.abs(key) % TABLE_SIZE;
  };

  const currentCount = strategy === 'chaining'
    ? chainTable.reduce((acc, b) => acc + b.length, 0)
    : probeTable.filter(x => x !== null && x !== 'DELETED').length;
  const loadFactor = (currentCount / TABLE_SIZE).toFixed(2);

  const handleInsert = () => {
    const key = parseInt(inputKey, 10);
    if (isNaN(key)) return;
    const initialIndex = computeHash(key);
    const newSteps: VisualizerStep[] = [];

    newSteps.push({
      id: 0,
      description: `Compute hash: hash(${key}) = ${key} % ${TABLE_SIZE} = index ${initialIndex}.`,
      codeLine: 2,
      dataState: strategy === 'chaining' ? chainTable.map(b => [...b]) : [...probeTable],
      highlightedIndices: [initialIndex],
    });

    if (strategy === 'chaining') {
      const bucket = chainTable[initialIndex];
      const hasCollision = bucket.length > 0;

      if (hasCollision) {
        newSteps.push({
          id: 1,
          description: `Collision detected at bucket ${initialIndex}! Existing keys: [${bucket.join(', ')}]. Appending ${key} to separate chain.`,
          codeLine: 5,
          dataState: chainTable.map(b => [...b]),
          highlightedIndices: [initialIndex],
        });
      }

      const updated = chainTable.map((b, i) => i === initialIndex ? [...b, key] : [...b]);
      newSteps.push({
        id: newSteps.length,
        description: `Successfully inserted key ${key} into bucket ${initialIndex}. Total chain length: ${updated[initialIndex].length}.`,
        codeLine: 5,
        dataState: updated,
        highlightedIndices: [initialIndex],
      });

      setSteps(newSteps);
      setCurrentStepIdx(0);
      setChainTable(updated);
      setIsPlaying(true);
    } else {
      // Linear Probing
      let curr = initialIndex;
      const updated = [...probeTable];
      let probes = 0;

      while (updated[curr] !== null && updated[curr] !== 'DELETED' && updated[curr] !== key && probes < TABLE_SIZE) {
        probes++;
        const next = (curr + 1) % TABLE_SIZE;
        newSteps.push({
          id: newSteps.length,
          description: `Slot ${curr} is occupied by ${updated[curr]}. Collision! Probing next slot: (${curr} + 1) % ${TABLE_SIZE} = ${next}.`,
          codeLine: 5,
          dataState: [...updated],
          highlightedIndices: [curr, next],
        });
        curr = next;
      }

      if (probes >= TABLE_SIZE) {
        newSteps.push({
          id: newSteps.length,
          description: `Hash Table is 100% full (Load Factor = 1.0). Rehash required!`,
          codeLine: 4,
          dataState: [...updated],
        });
      } else {
        updated[curr] = key;
        newSteps.push({
          id: newSteps.length,
          description: `Placed key ${key} in open slot ${curr} after ${probes} probe(s).`,
          codeLine: 6,
          dataState: updated,
          highlightedIndices: [curr],
        });
        setProbeTable(updated);
      }

      setSteps(newSteps);
      setCurrentStepIdx(0);
      setIsPlaying(true);
    }
  };

  const handleSearch = () => {
    const key = parseInt(searchKey, 10);
    if (isNaN(key)) return;
    const initialIndex = computeHash(key);
    const newSteps: VisualizerStep[] = [];

    newSteps.push({
      id: 0,
      description: `Compute index: hash(${key}) % ${TABLE_SIZE} = ${initialIndex}. Checking bucket ${initialIndex}.`,
      codeLine: 2,
      dataState: strategy === 'chaining' ? chainTable.map(b => [...b]) : [...probeTable],
      highlightedIndices: [initialIndex],
    });

    if (strategy === 'chaining') {
      const bucket = chainTable[initialIndex];
      const found = bucket.includes(key);

      if (found) {
        newSteps.push({
          id: 1,
          description: `Key ${key} FOUND in separate chain at bucket index ${initialIndex}!`,
          codeLine: 4,
          dataState: chainTable.map(b => [...b]),
          highlightedIndices: [initialIndex],
        });
      } else {
        newSteps.push({
          id: 1,
          description: `Key ${key} NOT FOUND in bucket ${initialIndex} chain [${bucket.join(', ') || 'empty'}].`,
          codeLine: 5,
          dataState: chainTable.map(b => [...b]),
          highlightedIndices: [initialIndex],
        });
      }
    } else {
      // Linear probing search
      let curr = initialIndex;
      let probes = 0;
      let found = false;

      while (probeTable[curr] !== null && probes < TABLE_SIZE) {
        if (probeTable[curr] === key) {
          newSteps.push({
            id: newSteps.length,
            description: `Key ${key} FOUND at probed index ${curr}! (Probes: ${probes}).`,
            codeLine: 4,
            dataState: [...probeTable],
            highlightedIndices: [curr],
          });
          found = true;
          break;
        } else {
          newSteps.push({
            id: newSteps.length,
            description: `Index ${curr} has ${probeTable[curr]}. Not target ${key}. Advancing probe...`,
            codeLine: 5,
            dataState: [...probeTable],
            highlightedIndices: [curr],
          });
          curr = (curr + 1) % TABLE_SIZE;
          probes++;
        }
      }

      if (!found) {
        newSteps.push({
          id: newSteps.length,
          description: `Hit NULL slot or exhausted table. Key ${key} is NOT present in table.`,
          codeLine: 5,
          dataState: [...probeTable],
        });
      }
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleDelete = () => {
    const key = parseInt(inputKey, 10);
    if (isNaN(key)) return;
    const initialIndex = computeHash(key);
    const newSteps: VisualizerStep[] = [];

    newSteps.push({
      id: 0,
      description: `Locate key ${key} starting at index hash(${key}) = ${initialIndex}.`,
      codeLine: 2,
      dataState: strategy === 'chaining' ? chainTable.map(b => [...b]) : [...probeTable],
      highlightedIndices: [initialIndex],
    });

    if (strategy === 'chaining') {
      const updated = chainTable.map((b, i) => (i === initialIndex ? b.filter(x => x !== key) : [...b]));
      newSteps.push({
        id: 1,
        description: `Removed key ${key} from separate chain at bucket ${initialIndex}.`,
        codeLine: 4,
        dataState: updated,
        highlightedIndices: [initialIndex],
      });
      setChainTable(updated);
    } else {
      // Deleting in linear probing requires a TOMBSTONE marker
      const updated = [...probeTable];
      let curr = initialIndex;
      let probes = 0;
      let found = false;

      while (updated[curr] !== null && probes < TABLE_SIZE) {
        if (updated[curr] === key) {
          updated[curr] = 'DELETED'; // Tombstone!
          newSteps.push({
            id: newSteps.length,
            description: `Key ${key} found at index ${curr}. Marked as 'DELETED' (Tombstone). Why? So future searches can still probe past this slot!`,
            codeLine: 4,
            dataState: updated,
            highlightedIndices: [curr],
          });
          found = true;
          break;
        }
        curr = (curr + 1) % TABLE_SIZE;
        probes++;
      }

      if (!found) {
        newSteps.push({
          id: newSteps.length,
          description: `Key ${key} not found to delete.`,
          codeLine: 3,
          dataState: updated,
        });
      }
      setProbeTable(updated);
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const resetTable = () => {
    if (strategy === 'chaining') {
      setChainTable([[14], [15, 22], [], [17], [], [26, 33], []]);
    } else {
      setProbeTable([14, 15, 22, 17, null, 26, 33]);
    }
    setSteps([]);
    setCurrentStepIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Hash Table & Collision Resolution Lab
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Bucket calculation formula: <code className="text-brand-cyan">index = key % {TABLE_SIZE}</code> with Separate Chaining vs Linear Probing.
          </p>
        </div>

        {/* Strategy Switch */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-dark-950 border border-slate-800 text-xs">
            <button
              onClick={() => { setStrategy('chaining'); setSteps([]); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                strategy === 'chaining' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Separate Chaining
            </button>
            <button
              onClick={() => { setStrategy('probing'); setSteps([]); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                strategy === 'probing' ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Linear Probing
            </button>
          </div>
          <button
            onClick={resetTable}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Main Table Visualizer */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
        {/* Load Factor & Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span>Buckets (m): <strong className="text-white">{TABLE_SIZE}</strong></span>
            <span>Stored Keys (n): <strong className="text-white">{currentCount}</strong></span>
            <span>
              Load Factor (α = n/m):{' '}
              <strong className={Number(loadFactor) > 0.75 ? 'text-rose-400' : 'text-emerald-400'}>
                {loadFactor}
              </strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {Number(loadFactor) > 0.75 ? '⚠️ Rehash Recommended (α > 0.75)' : 'Optimal Load Factor'}
          </span>
        </div>

        {/* Visualizer Rendering */}
        {strategy === 'chaining' ? (
          /* Separate Chaining Visualizer */
          <div className="space-y-2.5 py-4">
            {Array.from({ length: TABLE_SIZE }).map((_, bIdx) => {
              const bucket = currentStep ? (currentStep.dataState as number[][])[bIdx] : chainTable[bIdx];
              const isHighlighted = currentStep?.highlightedIndices?.includes(bIdx);

              return (
                <div key={bIdx} className="flex items-center gap-3">
                  {/* Bucket Index Cell */}
                  <div
                    className={`w-16 h-11 rounded-lg flex items-center justify-center font-mono font-bold text-xs border-2 transition-all ${
                      isHighlighted
                        ? 'bg-brand-cyan/25 border-brand-cyan text-brand-cyan ring-2 ring-brand-cyan/60 scale-102'
                        : 'bg-slate-800/90 border-slate-700 text-slate-300'
                    }`}
                  >
                    [{bIdx}]
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

                  {/* Chain Nodes */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {bucket && bucket.length > 0 ? (
                      bucket.map((val, nodeIdx) => (
                        <div key={nodeIdx} className="flex items-center gap-2">
                          <div className="px-3.5 py-2 rounded-lg bg-dark-950 border border-slate-700 text-white font-mono font-bold text-xs shadow-sm flex items-center gap-2">
                            <span>{val}</span>
                            <span className="text-[9px] text-brand-cyan/80">•next</span>
                          </div>
                          {nodeIdx < bucket.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600 font-mono text-xs italic">NULL (empty bucket)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Linear Probing Open Addressing Visualizer */
          <div className="py-6 flex flex-wrap items-center justify-center gap-3">
            {Array.from({ length: TABLE_SIZE }).map((_, idx) => {
              const val = currentStep ? (currentStep.dataState as any[])[idx] : probeTable[idx];
              const isHighlighted = currentStep?.highlightedIndices?.includes(idx);
              const isDeleted = val === 'DELETED';

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-20 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-base border-2 transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-brand-cyan/25 border-brand-cyan text-brand-cyan shadow-lg shadow-cyan-500/20 scale-105 ring-2 ring-brand-cyan/60'
                        : isDeleted
                        ? 'bg-rose-500/10 border-rose-500/50 text-rose-300'
                        : val !== null
                        ? 'bg-slate-800/90 border-slate-700 text-white'
                        : 'border-dashed border-slate-800 text-slate-700'
                    }`}
                  >
                    {isDeleted ? (
                      <span className="text-[10px] tracking-tight uppercase text-rose-400">DEL</span>
                    ) : val !== null ? (
                      val
                    ) : (
                      <span className="text-slate-600 text-xs font-normal">EMPTY</span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 mt-2">[{idx}]</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Operation Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insert & Delete */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Insert / Delete Key
          </h4>
          <input
            type="number"
            placeholder="Key (integer)"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan"
          />
          <div className="flex gap-2">
            <button
              onClick={handleInsert}
              className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" /> Insert
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Search Key
          </h4>
          <input
            type="number"
            placeholder="Target key"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-blue"
          />
          <button
            onClick={handleSearch}
            className="w-full py-1.5 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 border border-brand-blue/40 text-brand-blue text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Search className="w-3.5 h-3.5" /> Search Key O(1) avg
          </button>
        </div>

        {/* Hash Details */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-brand-cyan" />
            Hash Function Preview
          </h4>
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p>Input Key: <strong className="text-white">{inputKey || '0'}</strong></p>
            <p>Hash formula: <code className="text-brand-cyan">key % {TABLE_SIZE}</code></p>
            <p>Calculated Bucket: <strong className="text-emerald-400 font-bold">{computeHash(parseInt(inputKey || '0', 10))}</strong></p>
          </div>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Insert keys that produce the same modulo to observe collisions and resolution strategies.'}
        complexityNotice="Average time complexity is O(1) for insert/search/delete. In worst case (all keys collide into same slot), it degrades to O(n)."
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
            codeLines={PSEUDOCODES[strategy]}
            activeLine={currentStep ? currentStep.codeLine : 1}
            title={`${strategy.toUpperCase()} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
