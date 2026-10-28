import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { Plus, Play, RefreshCw, Network } from 'lucide-react';

interface GraphVertex {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  u: number;
  v: number;
}

const PSEUDOCODES = {
  bfs: [
    'function BFS(graph, startVertex):',
    '  queue.enqueue(startVertex)',
    '  visited[startVertex] = true',
    '  while not queue.isEmpty():',
    '    curr = queue.dequeue()',
    '    for each neighbor in adj[curr]:',
    '      if not visited[neighbor]:',
    '        visited[neighbor] = true',
    '        queue.enqueue(neighbor)',
  ],
  dfs: [
    'function DFS(graph, curr, visited):',
    '  visited[curr] = true',
    '  visit(curr)',
    '  for each neighbor in adj[curr]:',
    '    if not visited[neighbor]:',
    '      DFS(graph, neighbor, visited)',
  ],
};

export const GraphVisualizer: React.FC = () => {
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [activeAlgorithm, setActiveAlgorithm] = useState<'bfs' | 'dfs'>('bfs');

  // Initial 5-vertex sample graph in circular layout
  const [vertices, setVertices] = useState<GraphVertex[]>([
    { id: 0, label: '0', x: 200, y: 60 },
    { id: 1, label: '1', x: 380, y: 70 },
    { id: 2, label: '2', x: 420, y: 200 },
    { id: 3, label: '3', x: 280, y: 260 },
    { id: 4, label: '4', x: 150, y: 190 },
  ]);

  const [edges, setEdges] = useState<GraphEdge[]>([
    { u: 0, v: 1 },
    { u: 0, v: 4 },
    { u: 1, v: 2 },
    { u: 2, v: 3 },
    { u: 3, v: 4 },
    { u: 1, v: 3 },
  ]);

  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(700);

  // Form input states
  const [edgeU, setEdgeU] = useState<string>('0');
  const [edgeV, setEdgeV] = useState<string>('2');
  const [startVertex, setStartVertex] = useState<string>('0');

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

  // Build Adjacency List for current state
  const adjList: Record<number, number[]> = {};
  vertices.forEach(v => { adjList[v.id] = []; });
  edges.forEach(e => {
    adjList[e.u]?.push(e.v);
    if (!isDirected) adjList[e.v]?.push(e.u);
  });
  Object.keys(adjList).forEach(k => adjList[Number(k)].sort((a, b) => a - b));

  const handleAddVertex = () => {
    if (vertices.length >= 8) {
      alert('Graph visualizer limit is 8 vertices.');
      return;
    }
    const newId = vertices.length;
    // Position in a ring
    const angle = (newId / 8) * 2 * Math.PI;
    const x = Math.round(280 + 130 * Math.cos(angle));
    const y = Math.round(160 + 100 * Math.sin(angle));

    setVertices([...vertices, { id: newId, label: String(newId), x, y }]);
  };

  const handleAddEdge = () => {
    const u = parseInt(edgeU, 10);
    const v = parseInt(edgeV, 10);
    if (isNaN(u) || isNaN(v) || u === v || u >= vertices.length || v >= vertices.length) {
      alert(`Valid distinct vertices between 0 and ${vertices.length - 1} required.`);
      return;
    }
    const exists = edges.some(e => (e.u === u && e.v === v) || (!isDirected && e.u === v && e.v === u));
    if (exists) {
      alert('Edge already exists!');
      return;
    }
    setEdges([...edges, { u, v }]);
  };

  const handleRunBFS = () => {
    const start = parseInt(startVertex, 10);
    if (isNaN(start) || start >= vertices.length) return;
    setActiveAlgorithm('bfs');

    const newSteps: VisualizerStep[] = [];
    const visited: boolean[] = new Array(vertices.length).fill(false);
    const visitedOrder: number[] = [];
    const queue: number[] = [start];
    visited[start] = true;

    newSteps.push({
      id: 0,
      description: `Enqueue start vertex ${start} into BFS FIFO queue. Mark as visited.`,
      codeLine: 2,
      dataState: { queue: [...queue], visited: [...visitedOrder] },
      activeNode: start,
      visitedNodes: [start],
    });

    while (queue.length > 0) {
      const curr = queue.shift()!;
      visitedOrder.push(curr);

      newSteps.push({
        id: newSteps.length,
        description: `Dequeued vertex ${curr}. Inspecting unvisited neighbors in adjacency list: [${adjList[curr]?.join(', ') || ''}].`,
        codeLine: 5,
        dataState: { queue: [...queue], visited: [...visitedOrder] },
        activeNode: curr,
        visitedNodes: [...visitedOrder],
      });

      for (const neighbor of adjList[curr] || []) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);

          newSteps.push({
            id: newSteps.length,
            description: `Neighbor ${neighbor} is unvisited. Enqueue ${neighbor} into BFS queue frontier.`,
            codeLine: 8,
            dataState: { queue: [...queue], visited: [...visitedOrder] },
            activeNode: neighbor,
            visitedNodes: [...visitedOrder, neighbor],
          });
        }
      }
    }

    newSteps.push({
      id: newSteps.length,
      description: `BFS complete! All reachable vertices visited in level-order: ${visitedOrder.join(' ➔ ')}.`,
      codeLine: 9,
      dataState: { queue: [], visited: [...visitedOrder] },
      visitedNodes: [...visitedOrder],
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleRunDFS = () => {
    const start = parseInt(startVertex, 10);
    if (isNaN(start) || start >= vertices.length) return;
    setActiveAlgorithm('dfs');

    const newSteps: VisualizerStep[] = [];
    const visited: boolean[] = new Array(vertices.length).fill(false);
    const visitedOrder: number[] = [];
    const callStack: number[] = [];

    const dfsHelper = (u: number) => {
      visited[u] = true;
      visitedOrder.push(u);
      callStack.push(u);

      newSteps.push({
        id: newSteps.length,
        description: `DFS Visit: Entering vertex ${u}. Pushed onto call stack: [${callStack.join(', ')}].`,
        codeLine: 2,
        dataState: { stack: [...callStack], visited: [...visitedOrder] },
        activeNode: u,
        visitedNodes: [...visitedOrder],
      });

      for (const v of adjList[u] || []) {
        if (!visited[v]) {
          newSteps.push({
            id: newSteps.length,
            description: `From vertex ${u}, traverse edge to unvisited neighbor ${v}.`,
            codeLine: 5,
            dataState: { stack: [...callStack], visited: [...visitedOrder] },
            activeNode: v,
            visitedNodes: [...visitedOrder],
          });
          dfsHelper(v);
        }
      }

      callStack.pop();
      newSteps.push({
        id: newSteps.length,
        description: `Backtracking from vertex ${u}. Returning to previous stack frame.`,
        codeLine: 6,
        dataState: { stack: [...callStack], visited: [...visitedOrder] },
        activeNode: u,
        visitedNodes: [...visitedOrder],
      });
    };

    dfsHelper(start);

    newSteps.push({
      id: newSteps.length,
      description: `DFS traversal finished! Order: ${visitedOrder.join(' ➔ ')}.`,
      codeLine: 1,
      dataState: { stack: [], visited: [...visitedOrder] },
      visitedNodes: [...visitedOrder],
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const resetDefaultGraph = () => {
    setVertices([
      { id: 0, label: '0', x: 200, y: 60 },
      { id: 1, label: '1', x: 380, y: 70 },
      { id: 2, label: '2', x: 420, y: 200 },
      { id: 3, label: '3', x: 280, y: 260 },
      { id: 4, label: '4', x: 150, y: 190 },
    ]);
    setEdges([
      { u: 0, v: 1 },
      { u: 0, v: 4 },
      { u: 1, v: 2 },
      { u: 2, v: 3 },
      { u: 3, v: 4 },
      { u: 1, v: 3 },
    ]);
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
            Graph Data Structure & Traversal Lab
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Non-linear networks with Breadth-First Search (Queue) and Depth-First Search (Stack) execution.
          </p>
        </div>

        {/* Directed / Undirected switch */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-dark-950 border border-slate-800 text-xs">
            <button
              onClick={() => { setIsDirected(false); setSteps([]); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                !isDirected ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Undirected
            </button>
            <button
              onClick={() => { setIsDirected(true); setSteps([]); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                isDirected ? 'bg-brand-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Directed
            </button>
          </div>
          <button
            onClick={resetDefaultGraph}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Main SVG Graph & Adjacency List Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Graph Canvas */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl relative min-h-[340px] flex items-center justify-center overflow-hidden">
          <svg className="w-full max-w-[550px] h-[300px]" viewBox="0 0 550 300">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="23"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
              </marker>
            </defs>

            {/* Render Edges */}
            {edges.map((e, idx) => {
              const uNode = vertices.find(v => v.id === e.u);
              const vNode = vertices.find(v => v.id === e.v);
              if (!uNode || !vNode) return null;

              return (
                <line
                  key={`edge-${idx}`}
                  x1={uNode.x}
                  y1={uNode.y}
                  x2={vNode.x}
                  y2={vNode.y}
                  stroke="#475569"
                  strokeWidth="2.5"
                  markerEnd={isDirected ? 'url(#arrow)' : undefined}
                />
              );
            })}

            {/* Render Vertex Nodes */}
            {vertices.map((v) => {
              const isActive = currentStep?.activeNode === v.id;
              const isVisited = currentStep?.visitedNodes?.includes(v.id);

              let fill = '#1e293b';
              let stroke = '#64748b';
              let text = '#f1f5f9';

              if (isActive) {
                fill = '#0891b2';
                stroke = '#22d3ee';
                text = '#ffffff';
              } else if (isVisited) {
                fill = '#1e3a8a';
                stroke = '#3b82f6';
                text = '#93c5fd';
              }

              return (
                <g key={`vertex-${v.id}`} className="cursor-pointer">
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r="20"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isActive ? '3.5' : '2'}
                    className="transition-all duration-300 shadow-md"
                  />
                  <text
                    x={v.x}
                    y={v.y + 5}
                    textAnchor="middle"
                    fill={text}
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {v.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Adjacency List Panel */}
        <div className="lg:col-span-1 p-5 rounded-2xl glass-card border border-slate-700/60 bg-dark-900/90 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
              <Network className="w-4 h-4 text-brand-cyan" />
              Adjacency List Representation
            </h4>
            <div className="space-y-2 font-mono text-xs max-h-[220px] overflow-y-auto pr-2">
              {vertices.map((v) => (
                <div key={v.id} className="flex items-center gap-2 p-1.5 rounded bg-dark-950 border border-slate-800">
                  <span className="w-6 h-6 rounded bg-brand-cyan/20 text-brand-cyan font-bold flex items-center justify-center shrink-0">
                    {v.id}
                  </span>
                  <span className="text-slate-500">➔</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {adjList[v.id]?.length > 0 ? (
                      adjList[v.id].map((nbr, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                          {nbr}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-600">NULL</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            <span>Space Complexity: <strong className="text-brand-cyan">O(V + E)</strong></span>
          </div>
        </div>
      </div>

      {/* Operation Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Run BFS / DFS */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Launch Graph Traversal
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Start Vertex:</span>
            <input
              type="number"
              value={startVertex}
              onChange={(e) => setStartVertex(e.target.value)}
              className="w-20 px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleRunBFS}
              className="py-2 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 border border-brand-cyan/40 text-brand-cyan text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> BFS (Queue)
            </button>
            <button
              onClick={handleRunDFS}
              className="py-2 rounded-lg bg-brand-violet/20 hover:bg-brand-violet/30 border border-brand-violet/40 text-brand-violet text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> DFS (Stack)
            </button>
          </div>
        </div>

        {/* Add Edge */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Add Edge
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="From u"
              value={edgeU}
              onChange={(e) => setEdgeU(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
            <input
              type="number"
              placeholder="To v"
              value={edgeV}
              onChange={(e) => setEdgeV(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>
          <button
            onClick={handleAddEdge}
            className="w-full py-2 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 border border-brand-blue/40 text-brand-blue text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> Add Edge ({edgeU} ➔ {edgeV})
          </button>
        </div>

        {/* Add Vertex */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Add Vertex
          </h4>
          <p className="text-[11px] text-slate-400">Current vertex count: {vertices.length} (Max 8)</p>
          <button
            onClick={handleAddVertex}
            disabled={vertices.length >= 8}
            className="w-full py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> Add Vertex {vertices.length}
          </button>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Select BFS or DFS to trace vertex visits, queue/stack frontiers, and edge traversals.'}
        complexityNotice="BFS finds shortest path in unweighted networks; DFS is ideal for topological sort and cycle detection (O(V + E))."
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
            codeLines={PSEUDOCODES[activeAlgorithm]}
            activeLine={currentStep ? currentStep.codeLine : 1}
            title={`${activeAlgorithm.toUpperCase()} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
