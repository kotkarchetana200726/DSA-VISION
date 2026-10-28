import React from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  ShieldCheck,
  Sparkles,
  GitBranch,
  Terminal,
  BookOpen,
  Award
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-brand-cyan/30 bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Fundamentals of Data Structures (FDS) • College Mini Project</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight heading-font">
            DSA VISION — Interactive Learning Lab
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            A comprehensive, client-side, interactive laboratory for computer science students to visualize memory layouts, step through algorithms with bidirectional controls, and submit code validated against automated test suites.
          </p>
        </div>
      </div>

      {/* Academic Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-cyan" />
            Problem Statement
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Data structures and algorithms are inherently dynamic and pointer-intensive, making them difficult for beginners to grasp solely from 2D textbook diagrams and static slides. Students often struggle to trace linked list pointers, circular queue wrap-around math, tree recursion branches, and heapify sinks during dry runs.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-emerald" />
            Project Objectives
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Bridge abstract pseudocode with animated SVG memory blocks and pointer transitions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Provide deterministic step-by-step playback with reverse rewinding and active code highlighting.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Integrate an educational coding judge supporting C++17 with instant validation against edge test cases.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* System Architecture & Technology Stack */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-indigo" />
          System Architecture & Technology Stack
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-cyan block">Frontend Core</span>
            <p className="text-slate-400 text-[11px]">React 19 + TypeScript</p>
            <p className="text-slate-500 text-[10px]">Fast Vite HMR Bundler</p>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-blue block">Styling & UI</span>
            <p className="text-slate-400 text-[11px]">Tailwind CSS + Glassmorphism</p>
            <p className="text-slate-500 text-[10px]">Lucide Icons & Dark Mode</p>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-violet block">Code Editor & Judge</span>
            <p className="text-slate-400 text-[11px]">Monaco Editor / Custom Fallback</p>
            <p className="text-slate-500 text-[10px]">Piston CE API + Local Sandbox</p>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-emerald block">Persistence</span>
            <p className="text-slate-400 text-[11px]">Browser LocalStorage API</p>
            <p className="text-slate-500 text-[10px]">Submission & Streak Tracking</p>
          </div>
        </div>
      </div>

      {/* Syllabus Alignment Table */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-cyan" />
          FDS Syllabus Alignment
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Course Unit</th>
                <th className="p-3">Core Topics Covered</th>
                <th className="p-3">Interactive Visualizer Features</th>
                <th className="p-3">Practice Problems</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-dark-950/60">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white">Unit 1: Arrays & Analysis</td>
                <td className="p-3 text-slate-300">Contiguous memory, 0-indexing, address formulas</td>
                <td className="p-3 text-brand-cyan">Insert, delete, access, shift animations</td>
                <td className="p-3 text-emerald-400">5 Problems</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white">Unit 2: Searching & Sorting</td>
                <td className="p-3 text-slate-300">Linear, Binary Search, Bubble, Selection, Insertion, Merge, Quick</td>
                <td className="p-3 text-brand-cyan">Low/mid/high markers, swap counters, browser benchmarks</td>
                <td className="p-3 text-emerald-400">10 Problems</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white">Unit 3: Linked Lists</td>
                <td className="p-3 text-slate-300">Singly, Doubly, and Circular Linked Lists</td>
                <td className="p-3 text-brand-cyan">Pointer arrow rewiring, head/tail updates</td>
                <td className="p-3 text-emerald-400">5 Problems</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white">Unit 4: Stacks & Queues</td>
                <td className="p-3 text-slate-300">LIFO & FIFO, Circular Queue, Overflow, Underflow</td>
                <td className="p-3 text-brand-cyan">Top pointer box, circular modulo buffer</td>
                <td className="p-3 text-emerald-400">10 Problems</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white">Unit 5: Trees & Heaps</td>
                <td className="p-3 text-slate-300">BST insert/delete/traversal, Min/Max Heap</td>
                <td className="p-3 text-brand-cyan">SVG 2D coordinate tree, dual array-tree heap layout</td>
                <td className="p-3 text-emerald-400">10 Problems</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white">Unit 6: Graphs & Hashing</td>
                <td className="p-3 text-slate-300">BFS, DFS, Adjacency List, Separate Chaining, Linear Probing</td>
                <td className="p-3 text-brand-cyan">Animated graph wave frontier, tombstone markers</td>
                <td className="p-3 text-emerald-400">10 Problems</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* College Viva Tips & Oral Exam Advice */}
      <div className="p-6 rounded-2xl glass-panel border border-brand-violet/30 bg-dark-900/90 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-violet" />
          Tips for College Oral (Viva Voce) Examination
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">1. Always state Best, Average, AND Worst-Case bounds</span>
            <p className="text-slate-400 leading-relaxed">
              Don't simply say "Quick Sort is O(n log n)". Clarify that its worst-case is O(n²) when the pivot is poorly chosen on already sorted data.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">2. Emphasize Space Complexity & In-Place sorting</span>
            <p className="text-slate-400 leading-relaxed">
              Examiners love asking why Merge Sort is rarely used in systems memory compared to Quick Sort: Merge Sort requires O(n) auxiliary allocation!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">3. Understand Physical Memory vs Pointer Representation</span>
            <p className="text-slate-400 leading-relaxed">
              Explain that arrays leverage CPU cache locality through contiguous physical memory addresses, whereas linked lists scatter nodes across heap memory with pointer overhead.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">4. Master the Three Deletion Cases in BST</span>
            <p className="text-slate-400 leading-relaxed">
              Clearly differentiate leaf deletion, 1-child bypass, and 2-child replacement with the inorder successor (minimum of right subtree).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
