import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { Plus, Trash2, Search, ArrowRight, Shuffle, CornerDownRight } from 'lucide-react';

interface LLNode {
  id: string;
  val: number;
}

type ListType = 'singly' | 'doubly' | 'circular';

const PSEUDOCODES = {
  insertHead: [
    'function insertHead(head, val):',
    '  newNode = new Node(val)',
    '  newNode.next = head',
    '  head = newNode',
    '  return head // O(1)',
  ],
  insertTail: [
    'function insertTail(head, val):',
    '  newNode = new Node(val)',
    '  if head == null: return newNode',
    '  curr = head',
    '  while curr.next != null: curr = curr.next',
    '  curr.next = newNode // O(n)',
    '  return head',
  ],
  insertPos: [
    'function insertAtPosition(head, pos, val):',
    '  if pos == 0: return insertHead(head, val)',
    '  curr = head',
    '  for i = 0 to pos - 2: curr = curr.next',
    '  newNode.next = curr.next',
    '  curr.next = newNode',
  ],
  deleteVal: [
    'function deleteValue(head, target):',
    '  if head.val == target: return head.next',
    '  curr = head',
    '  while curr.next and curr.next.val != target:',
    '    curr = curr.next',
    '  if curr.next: curr.next = curr.next.next',
  ],
  search: [
    'function search(head, target):',
    '  curr = head, idx = 0',
    '  while curr != null:',
    '    if curr.val == target: return idx',
    '    curr = curr.next, idx++',
    '  return -1',
  ],
  traverse: [
    'function traverse(head):',
    '  curr = head',
    '  while curr != null:',
    '    visit(curr.val)',
    '    curr = curr.next',
  ],
};

export const LinkedListVisualizer: React.FC = () => {
  const [listType, setListType] = useState<ListType>('singly');
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: 'n1', val: 12 },
    { id: 'n2', val: 25 },
    { id: 'n3', val: 47 },
    { id: 'n4', val: 89 },
  ]);

  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);
  const [activeOp, setActiveOp] = useState<keyof typeof PSEUDOCODES>('insertHead');

  // Input states
  const [inputVal, setInputVal] = useState<string>('33');
  const [inputPos, setInputPos] = useState<string>('2');
  const [searchVal, setSearchVal] = useState<string>('47');

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
  const displayNodes: LLNode[] = currentStep ? currentStep.dataState : nodes;

  const handleInsertHead = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    if (nodes.length >= 8) {
      alert('Linked List limit is 8 nodes for visual clarity.');
      return;
    }
    setActiveOp('insertHead');
    const newNode: LLNode = { id: `n_${Date.now()}`, val };
    const newSteps: VisualizerStep[] = [
      {
        id: 0,
        description: `Create new node in heap memory with data = ${val}.`,
        codeLine: 2,
        dataState: [...nodes],
        activeNode: newNode.id,
      },
      {
        id: 1,
        description: `Set newNode.next -> current HEAD (node ${nodes[0]?.val || 'NULL'}).`,
        codeLine: 3,
        dataState: [...nodes],
        activeNode: newNode.id,
      },
      {
        id: 2,
        description: `Update HEAD pointer to point to newNode (${val}). Operation finishes in O(1) time!`,
        codeLine: 4,
        dataState: [newNode, ...nodes],
        activeNode: newNode.id,
      },
    ];
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setNodes([newNode, ...nodes]);
    setIsPlaying(true);
  };

  const handleInsertTail = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    if (nodes.length >= 8) {
      alert('Linked List limit is 8 nodes for visual clarity.');
      return;
    }
    setActiveOp('insertTail');
    const newNode: LLNode = { id: `n_${Date.now()}`, val };
    const newSteps: VisualizerStep[] = [];

    newSteps.push({
      id: 0,
      description: `Allocate newNode(${val}) in memory.`,
      codeLine: 2,
      dataState: [...nodes],
      activeNode: newNode.id,
    });

    for (let i = 0; i < nodes.length; i++) {
      newSteps.push({
        id: newSteps.length,
        description: `Traversing list: curr is at node ${nodes[i].val} (index ${i}).`,
        codeLine: 5,
        dataState: [...nodes],
        activeNode: nodes[i].id,
        visitedNodes: nodes.slice(0, i + 1).map(n => n.id),
      });
    }

    const updated = [...nodes, newNode];
    newSteps.push({
      id: newSteps.length,
      description: `Reached last node. Point tail->next to newNode(${val}). Total traversal time: O(n).`,
      codeLine: 6,
      dataState: updated,
      activeNode: newNode.id,
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setNodes(updated);
    setIsPlaying(true);
  };

  const handleInsertPosition = () => {
    const val = parseInt(inputVal, 10);
    const pos = parseInt(inputPos, 10);
    if (isNaN(val) || isNaN(pos) || pos < 0 || pos > nodes.length) {
      alert(`Position must be between 0 and ${nodes.length}`);
      return;
    }
    if (nodes.length >= 8) {
      alert('Linked List limit is 8 nodes for visual clarity.');
      return;
    }
    setActiveOp('insertPos');
    const newNode: LLNode = { id: `n_${Date.now()}`, val };
    const newSteps: VisualizerStep[] = [];

    newSteps.push({
      id: 0,
      description: `Insert ${val} at position ${pos}. Allocate new node.`,
      codeLine: 2,
      dataState: [...nodes],
      activeNode: newNode.id,
    });

    for (let i = 0; i < pos; i++) {
      newSteps.push({
        id: newSteps.length,
        description: `Traversing: step ${i + 1}/${pos} at node ${nodes[i].val}.`,
        codeLine: 4,
        dataState: [...nodes],
        activeNode: nodes[i].id,
        visitedNodes: nodes.slice(0, i + 1).map(n => n.id),
      });
    }

    const updated = [...nodes];
    updated.splice(pos, 0, newNode);

    newSteps.push({
      id: newSteps.length,
      description: `Linked pointers: prev->next = newNode and newNode->next = nextNode. Inserted at pos ${pos}.`,
      codeLine: 6,
      dataState: updated,
      activeNode: newNode.id,
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setNodes(updated);
    setIsPlaying(true);
  };

  const handleDelete = () => {
    const target = parseInt(inputVal, 10);
    if (isNaN(target)) {
      alert('Enter the value of the node to delete in the Value box.');
      return;
    }
    if (nodes.length === 0) return;
    setActiveOp('deleteVal');
    const newSteps: VisualizerStep[] = [];
    let foundIdx = -1;

    for (let i = 0; i < nodes.length; i++) {
      newSteps.push({
        id: newSteps.length,
        description: `Checking node ${nodes[i].val} == ${target}?`,
        codeLine: 4,
        dataState: [...nodes],
        activeNode: nodes[i].id,
        visitedNodes: nodes.slice(0, i + 1).map(n => n.id),
      });
      if (nodes[i].val === target) {
        foundIdx = i;
        break;
      }
    }

    if (foundIdx === -1) {
      newSteps.push({
        id: newSteps.length,
        description: `Value ${target} not found in linked list. Nothing deleted.`,
        codeLine: 6,
        dataState: [...nodes],
      });
    } else {
      const updated = [...nodes];
      updated.splice(foundIdx, 1);
      newSteps.push({
        id: newSteps.length,
        description: `Found node ${target} at index ${foundIdx}. Bypass pointers: prev->next = curr->next and free node memory.`,
        codeLine: 6,
        dataState: updated,
      });
      setNodes(updated);
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleSearch = () => {
    const target = parseInt(searchVal, 10);
    if (isNaN(target)) return;
    setActiveOp('search');
    const newSteps: VisualizerStep[] = [];
    let found = false;

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].val === target) {
        newSteps.push({
          id: newSteps.length,
          description: `Node ${nodes[i].val} matches target ${target}! Found at index ${i} (address ${nodes[i].id}).`,
          codeLine: 4,
          dataState: [...nodes],
          activeNode: nodes[i].id,
          visitedNodes: nodes.slice(0, i + 1).map(n => n.id),
        });
        found = true;
        break;
      } else {
        newSteps.push({
          id: newSteps.length,
          description: `Node ${nodes[i].val} != ${target}. Following next pointer to next node.`,
          codeLine: 5,
          dataState: [...nodes],
          activeNode: nodes[i].id,
          visitedNodes: nodes.slice(0, i + 1).map(n => n.id),
        });
      }
    }

    if (!found) {
      newSteps.push({
        id: newSteps.length,
        description: `Reached end of list (curr == NULL). Target ${target} not found. Return -1.`,
        codeLine: 6,
        dataState: [...nodes],
      });
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleTraverse = () => {
    setActiveOp('traverse');
    const newSteps: VisualizerStep[] = [];
    for (let i = 0; i < nodes.length; i++) {
      newSteps.push({
        id: newSteps.length,
        description: `Traversing node ${i + 1}/${nodes.length}: Data = ${nodes[i].val}. Next pointer -> ${nodes[i + 1]?.val || (listType === 'circular' ? nodes[0]?.val : 'NULL')}.`,
        codeLine: 4,
        dataState: [...nodes],
        activeNode: nodes[i].id,
        visitedNodes: nodes.slice(0, i + 1).map(n => n.id),
      });
    }
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      {/* Header and Type Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Linked List Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic node chains connected through heap pointer references.
          </p>
        </div>

        {/* List Type Tabs */}
        <div className="flex p-1 rounded-xl bg-dark-950 border border-slate-800">
          {(['singly', 'doubly', 'circular'] as ListType[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setListType(t);
                setSteps([]);
                setCurrentStepIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                listType === t
                  ? 'bg-brand-cyan text-dark-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t} List
            </button>
          ))}
        </div>
      </div>

      {/* SVG Linked List Interactive Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl relative overflow-x-auto min-h-[220px] flex flex-col justify-center">
        {displayNodes.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-mono text-sm">
            Linked List is empty (HEAD == NULL). Insert nodes below.
          </div>
        ) : (
          <div className="flex items-center justify-start min-w-max py-6 px-4">
            {/* HEAD Label */}
            <div className="flex flex-col items-center mr-4">
              <span className="px-2.5 py-1 rounded bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan font-mono text-xs font-bold">
                HEAD
              </span>
              <div className="w-0.5 h-4 bg-brand-cyan"></div>
              <ArrowRight className="w-4 h-4 text-brand-cyan -mt-1 transform rotate-90" />
            </div>

            {/* Nodes Chain */}
            {displayNodes.map((node, idx) => {
              const isActive = currentStep?.activeNode === node.id;
              const isVisited = currentStep?.visitedNodes?.includes(node.id);

              let borderColor = 'border-slate-700';
              let bgColor = 'bg-slate-800/90';
              let textColor = 'text-white';

              if (isActive) {
                borderColor = 'border-brand-cyan';
                bgColor = 'bg-brand-cyan/20';
                textColor = 'text-brand-cyan font-bold';
              } else if (isVisited) {
                borderColor = 'border-brand-blue';
                bgColor = 'bg-brand-blue/15';
                textColor = 'text-blue-300';
              }

              return (
                <div key={node.id} className="flex items-center">
                  {/* Single Node Card */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md ${borderColor} ${bgColor} ${
                        isActive ? 'scale-105 shadow-cyan-500/30' : ''
                      }`}
                    >
                      {/* Prev Pointer (for Doubly) */}
                      {listType === 'doubly' && (
                        <div className="px-2 py-3 bg-dark-950/60 border-r border-slate-700/60 text-[10px] font-mono text-slate-500 flex items-center justify-center">
                          ◀
                        </div>
                      )}

                      {/* Node Data Field */}
                      <div className="px-4 py-3 min-w-[50px] text-center font-mono font-bold text-base">
                        <span className={textColor}>{node.val}</span>
                      </div>

                      {/* Next Pointer Field */}
                      <div className="px-3 py-3 bg-dark-950/60 border-l border-slate-700/60 text-[10px] font-mono text-brand-cyan/80 flex items-center justify-center">
                        •next
                      </div>
                    </div>

                    {/* Node Index & Memory Address */}
                    <div className="mt-2 text-center text-[10px] font-mono text-slate-400">
                      idx: {idx}
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {idx < displayNodes.length - 1 ? (
                    <div className="flex items-center px-2">
                      <div className="h-0.5 w-6 sm:w-10 bg-brand-cyan/70"></div>
                      <ArrowRight className="w-4 h-4 text-brand-cyan -ml-1" />
                    </div>
                  ) : (
                    /* Tail Connector */
                    <div className="flex items-center pl-2">
                      {listType === 'circular' ? (
                        <div className="flex items-center text-xs font-mono text-amber-400 gap-1 pl-2">
                          <CornerDownRight className="w-4 h-4" />
                          <span className="text-[10px] font-bold border border-amber-500/40 rounded px-1.5 py-0.5 bg-amber-500/10">
                            wraps to HEAD
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-0.5 w-6 bg-slate-700"></div>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-xs border border-slate-700">
                            NULL
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
          <span>Type: <strong className="text-white capitalize">{listType} Linked List</strong></span>
          <span>Insert Head: <strong className="text-emerald-400">O(1)</strong> | Search/Tail: <strong className="text-amber-400">O(n)</strong></span>
        </div>
      </div>

      {/* Operation Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insert Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-brand-emerald" />
            Insert Nodes
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Value"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-emerald"
            />
            <input
              type="number"
              placeholder="Position"
              value={inputPos}
              onChange={(e) => setInputPos(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-emerald"
            />
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              onClick={handleInsertHead}
              className="py-1.5 px-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold transition-all active:scale-95"
            >
              Head O(1)
            </button>
            <button
              onClick={handleInsertTail}
              className="py-1.5 px-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold transition-all active:scale-95"
            >
              Tail O(n)
            </button>
            <button
              onClick={handleInsertPosition}
              className="py-1.5 px-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold transition-all active:scale-95"
            >
              At Pos
            </button>
          </div>
        </div>

        {/* Delete & Traverse Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            Delete & Traverse
          </h4>
          <p className="text-[11px] text-slate-400">Deletes node with value matching Value input</p>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleDelete}
              className="flex-1 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Delete Node
            </button>
            <button
              onClick={handleTraverse}
              className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <Shuffle className="w-3 h-3" /> Traverse
            </button>
          </div>
        </div>

        {/* Search Card */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            Search Node
          </h4>
          <input
            type="number"
            placeholder="Search Value"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={handleSearch}
            className="w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Search className="w-3 h-3" /> Search O(n)
          </button>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Select an operation above to animate linked list pointer updates.'}
        complexityNotice="Unlike arrays, linked lists can insert/delete at known pointers in O(1) time without shifting elements!"
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
