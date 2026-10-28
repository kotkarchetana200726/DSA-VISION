import React, { useState } from 'react';
import { LineChart, Activity, Zap, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

interface ComplexityCurve {
  name: string;
  notation: string;
  color: string;
  description: string;
  exampleAlgos: string[];
  calc: (n: number) => number;
}

const CURVES: ComplexityCurve[] = [
  {
    name: 'Constant',
    notation: 'O(1)',
    color: '#10b981', // emerald
    description: 'Execution time remains flat regardless of input dataset size.',
    exampleAlgos: ['Array indexing', 'Stack push/pop', 'Hash table lookup (average)'],
    calc: () => 1,
  },
  {
    name: 'Logarithmic',
    notation: 'O(log n)',
    color: '#06b6d4', // cyan
    description: 'Halves the remaining work in each step. Highly scalable for massive datasets.',
    exampleAlgos: ['Binary Search', 'BST search (balanced)', 'Heapify up/down'],
    calc: (n) => Math.log2(n),
  },
  {
    name: 'Linear',
    notation: 'O(n)',
    color: '#3b82f6', // blue
    description: 'Running time scales in direct 1:1 proportion to input elements.',
    exampleAlgos: ['Linear Search', 'Array traversal', 'Counting sort'],
    calc: (n) => n,
  },
  {
    name: 'Linearithmic',
    notation: 'O(n log n)',
    color: '#8b5cf6', // violet
    description: 'Optimal comparison-based sorting complexity limit.',
    exampleAlgos: ['Merge Sort', 'Heap Sort', 'Quick Sort (average)'],
    calc: (n) => n * Math.log2(n),
  },
  {
    name: 'Quadratic',
    notation: 'O(n²)',
    color: '#f59e0b', // amber
    description: 'Nested loops over the collection. Becomes sluggish above n = 10,000.',
    exampleAlgos: ['Bubble Sort', 'Selection Sort', 'Insertion Sort (worst)'],
    calc: (n) => n * n,
  },
  {
    name: 'Exponential',
    notation: 'O(2ⁿ)',
    color: '#f43f5e', // rose
    description: 'Doubles operations with every additional element. Impractical for n > 40.',
    exampleAlgos: ['Recursive Fibonacci', 'Subset generation', 'Tower of Hanoi'],
    calc: (n) => Math.pow(2, Math.min(n, 20)),
  },
];

export const ComplexityLab: React.FC = () => {
  const [sliderN, setSliderN] = useState<number>(30);
  const [activeCurves, setActiveCurves] = useState<string[]>(['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)']);

  const toggleCurve = (notation: string) => {
    setActiveCurves(prev =>
      prev.includes(notation) ? prev.filter(c => c !== notation) : [...prev, notation]
    );
  };

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 280;
  const padding = 35;
  const plotWidth = svgWidth - padding * 2;
  const plotHeight = svgHeight - padding * 2;

  // Max value to scale SVG Y axis
  const maxN = sliderN;
  const maxY = Math.min(sliderN * sliderN, 2000);

  // Generate SVG path for a curve
  const generatePath = (calc: (n: number) => number) => {
    const points: string[] = [];
    const steps = 50;
    for (let i = 1; i <= steps; i++) {
      const n = (i / steps) * maxN;
      const rawY = calc(n);
      const clampedY = Math.min(rawY, maxY * 1.05);

      const x = padding + (n / maxN) * plotWidth;
      const y = svgHeight - padding - (clampedY / maxY) * plotHeight;
      points.push(`${i === 1 ? 'M' : 'L'} ${x.toFixed(1)} ${Math.max(padding, y).toFixed(1)}`);
    }
    return points.join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Algorithmic Complexity & Big-O Laboratory
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyze asymptotic growth rates, execution boundaries, and hardware scaling laws.
          </p>
        </div>

        {/* N Slider */}
        <div className="flex items-center gap-3 p-2 px-4 rounded-xl bg-dark-950 border border-slate-800">
          <span className="text-xs font-mono text-slate-400">Input Size (N):</span>
          <input
            type="range"
            min="5"
            max="100"
            value={sliderN}
            onChange={(e) => setSliderN(Number(e.target.value))}
            className="w-32 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
          />
          <span className="text-sm font-mono font-bold text-brand-cyan min-w-[2.5rem] text-right">
            {sliderN}
          </span>
        </div>
      </div>

      {/* SVG Big-O Chart & Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Graph Canvas */}
        <div className="lg:col-span-3 p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl relative flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
            <span>Growth Curves: Operations vs Input Size N = {sliderN}</span>
            <span className="text-slate-500">Y-axis clamped to {maxY.toLocaleString()} ops</span>
          </div>

          <div className="w-full flex justify-center py-4">
            <svg className="w-full max-w-[620px] h-[300px]" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
              {/* Axes */}
              <line
                x1={padding}
                y1={svgHeight - padding}
                x2={svgWidth - padding}
                y2={svgHeight - padding}
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={svgHeight - padding}
                stroke="#475569"
                strokeWidth="2"
              />

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75].map((frac) => (
                <line
                  key={frac}
                  x1={padding}
                  y1={svgHeight - padding - frac * plotHeight}
                  x2={svgWidth - padding}
                  y2={svgHeight - padding - frac * plotHeight}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Axis Labels */}
              <text x={svgWidth - padding} y={svgHeight - 12} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">
                Input Size (N) ➔
              </text>
              <text x={12} y={padding} fill="#94a3b8" fontSize="10" textAnchor="start" fontFamily="monospace">
                Operations ⬆
              </text>

              {/* Render Selected Curves */}
              {CURVES.map((curve) => {
                if (!activeCurves.includes(curve.notation)) return null;
                const pathD = generatePath(curve.calc);

                return (
                  <path
                    key={curve.notation}
                    d={pathD}
                    fill="none"
                    stroke={curve.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800/80">
            <span>Origin (N=0)</span>
            <span>Upper Bound Asymptote (Big-O)</span>
          </div>
        </div>

        {/* Curve Toggle Toggles & Details */}
        <div className="lg:col-span-1 p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 flex flex-col justify-between space-y-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Toggle Curves
            </h4>
            <div className="space-y-2">
              {CURVES.map((c) => {
                const isActive = activeCurves.includes(c.notation);
                return (
                  <button
                    key={c.notation}
                    onClick={() => toggleCurve(c.notation)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-slate-800/90 border-slate-600 text-white shadow-sm'
                        : 'bg-dark-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: isActive ? c.color : '#475569' }}
                      ></span>
                      <span>{c.notation}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 capitalize">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-brand-cyan font-bold block mb-1">Scale Rule:</span>
            <p>Algorithms with O(n²) or worse are avoided for real-time production datasets (&gt; 100k items).</p>
          </div>
        </div>
      </div>

      {/* Comparison Growth Table */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-cyan" />
          Growth Rate Table: Operation Counts Across Dataset Scales
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Complexity</th>
                <th className="p-3">N = 10</th>
                <th className="p-3">N = 50</th>
                <th className="p-3">N = 100</th>
                <th className="p-3">N = 1,000</th>
                <th className="p-3">N = 1,000,000 (1M)</th>
                <th className="p-3">Typical Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-dark-950/60">
              {CURVES.map((c) => {
                const at10 = Math.round(c.calc(10));
                const at50 = Math.round(c.calc(50));
                const at100 = Math.round(c.calc(100));
                const at1k = c.notation === 'O(2ⁿ)' ? '1.27 × 10³⁰¹ (Heat death of universe)' : Math.round(c.calc(1000)).toLocaleString();
                const at1m = c.notation === 'O(n²)' ? '1,000,000,000,000' : c.notation === 'O(2ⁿ)' ? '∞' : c.notation === 'O(n log n)' ? '20,000,000' : c.notation === 'O(n)' ? '1,000,000' : c.notation === 'O(log n)' ? '20' : '1';

                return (
                  <tr key={c.notation} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold" style={{ color: c.color }}>
                      {c.notation} ({c.name})
                    </td>
                    <td className="p-3 text-slate-300">{at10}</td>
                    <td className="p-3 text-slate-300">{at50.toLocaleString()}</td>
                    <td className="p-3 text-slate-300">{at100.toLocaleString()}</td>
                    <td className="p-3 text-amber-300 font-bold">{at1k}</td>
                    <td className="p-3 text-rose-400 font-bold">{at1m}</td>
                    <td className="p-3 text-slate-400 italic">{c.exampleAlgos[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* College FDS Exam Cheat-Sheet Card: Master Theorem */}
      <div className="p-6 rounded-2xl glass-card border border-brand-indigo/30 bg-dark-900/90 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-indigo" />
          Master Theorem Cheat-Sheet (Divide & Conquer Recurrences)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For recurrences of the form <code className="text-brand-cyan">T(n) = a·T(n/b) + f(n)</code> where <code className="text-slate-200">f(n) = Θ(n^c)</code>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs pt-1">
          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400">Case 1: c &lt; log_b(a)</span>
            <p className="text-slate-400 text-[11px]">Tree leaves dominate total work.</p>
            <p className="text-white font-bold text-xs">T(n) = Θ(n^(log_b(a)))</p>
          </div>
          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 space-y-1">
            <span className="font-bold text-brand-cyan">Case 2: c == log_b(a)</span>
            <p className="text-slate-400 text-[11px]">Work distributed equally across all levels.</p>
            <p className="text-white font-bold text-xs">T(n) = Θ(n^c · log n)</p>
          </div>
          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 space-y-1">
            <span className="font-bold text-amber-400">Case 3: c &gt; log_b(a)</span>
            <p className="text-slate-400 text-[11px]">Root level work dominates.</p>
            <p className="text-white font-bold text-xs">T(n) = Θ(f(n))</p>
          </div>
        </div>
      </div>
    </div>
  );
};
