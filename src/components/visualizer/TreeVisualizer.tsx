import React, { useState, useEffect, useRef } from 'react';
import { VisualizerControls } from './VisualizerControls';
import { PseudocodePanel } from './PseudocodePanel';
import { StepExplanation } from './StepExplanation';
import { VisualizerStep } from '../../types/dsa';
import { Plus, Trash2, Search, Shuffle, RefreshCw } from 'lucide-react';

interface BSTNode {
  val: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

interface RenderNode {
  val: number;
  x: number;
  y: number;
  leftX?: number;
  leftY?: number;
  rightX?: number;
  rightY?: number;
}

const PSEUDOCODES = {
  insert: [
    'function insert(node, val):',
    '  if node == null: return new Node(val)',
    '  if val < node.val: node.left = insert(node.left, val)',
    '  else if val > node.val: node.right = insert(node.right, val)',
    '  return node // O(log n) avg',
  ],
  search: [
    'function search(node, val):',
    '  if node == null or node.val == val: return node',
    '  if val < node.val: return search(node.left, val)',
    '  return search(node.right, val) // O(log n) avg',
  ],
  delete: [
    'function delete(node, val):',
    '  if node == null: return null',
    '  if val < node.val: node.left = delete(node.left, val)',
    '  else if val > node.val: node.right = delete(node.right, val)',
    '  else: // Node found',
    '    if node.left == null: return node.right // 0 or 1 child',
    '    if node.right == null: return node.left',
    '    succ = findMin(node.right) // 2 children case',
    '    node.val = succ.val',
    '    node.right = delete(node.right, succ.val)',
    '  return node',
  ],
  inorder: [
    'function inorder(node):',
    '  if node == null: return',
    '  inorder(node.left)',
    '  visit(node.val) // Ascending order',
    '  inorder(node.right)',
  ],
  preorder: [
    'function preorder(node):',
    '  if node == null: return',
    '  visit(node.val) // Root first',
    '  preorder(node.left)',
    '  preorder(node.right)',
  ],
  postorder: [
    'function postorder(node):',
    '  if node == null: return',
    '  postorder(node.left)',
    '  postorder(node.right)',
    '  visit(node.val) // Leaves first',
  ],
};

// Tree Helper Functions
const cloneTree = (node: BSTNode | null): BSTNode | null => {
  if (!node) return null;
  return {
    val: node.val,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  };
};

const insertNode = (root: BSTNode | null, val: number): BSTNode => {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) root.left = insertNode(root.left, val);
  else if (val > root.val) root.right = insertNode(root.right, val);
  return root;
};

const findMinNode = (node: BSTNode): BSTNode => {
  let curr = node;
  while (curr.left) curr = curr.left;
  return curr;
};

const deleteNode = (root: BSTNode | null, val: number): BSTNode | null => {
  if (!root) return null;
  if (val < root.val) {
    root.left = deleteNode(root.left, val);
  } else if (val > root.val) {
    root.right = deleteNode(root.right, val);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const minNode = findMinNode(root.right);
    root.val = minNode.val;
    root.right = deleteNode(root.right, minNode.val);
  }
  return root;
};

// Compute SVG 2D coordinates for BST rendering
const computeTreeLayout = (
  node: BSTNode | null,
  x: number = 300,
  y: number = 40,
  dx: number = 120,
  nodesList: RenderNode[] = []
): RenderNode[] => {
  if (!node) return nodesList;

  const renderNode: RenderNode = { val: node.val, x, y };

  if (node.left) {
    const leftX = x - dx;
    const leftY = y + 65;
    renderNode.leftX = leftX;
    renderNode.leftY = leftY;
    computeTreeLayout(node.left, leftX, leftY, dx * 0.55, nodesList);
  }

  if (node.right) {
    const rightX = x + dx;
    const rightY = y + 65;
    renderNode.rightX = rightX;
    renderNode.rightY = rightY;
    computeTreeLayout(node.right, rightX, rightY, dx * 0.55, nodesList);
  }

  nodesList.push(renderNode);
  return nodesList;
};

export const TreeVisualizer: React.FC = () => {
  // Initial balanced tree: 50, 30, 70, 20, 40, 60, 80
  const [root, setRoot] = useState<BSTNode | null>(() => {
    let tree: BSTNode | null = null;
    [50, 30, 70, 20, 40, 60, 80].forEach(v => {
      tree = insertNode(tree, v);
    });
    return tree;
  });

  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);
  const [activeOp, setActiveOp] = useState<keyof typeof PSEUDOCODES>('insert');

  const [inputVal, setInputVal] = useState<string>('35');
  const [searchVal, setSearchVal] = useState<string>('40');
  const [traversalOutput, setTraversalOutput] = useState<number[]>([]);

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
  const activeTree: BSTNode | null = currentStep ? currentStep.dataState : root;
  const renderNodes = computeTreeLayout(activeTree, 320, 45, 130);

  const handleInsert = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    setActiveOp('insert');
    setTraversalOutput([]);

    const newSteps: VisualizerStep[] = [];
    let curr = root;
    const visited: number[] = [];

    newSteps.push({
      id: 0,
      description: `Starting insertion of ${val} at tree ROOT.`,
      codeLine: 2,
      dataState: cloneTree(root),
    });

    while (curr) {
      visited.push(curr.val);
      if (val === curr.val) {
        newSteps.push({
          id: newSteps.length,
          description: `Key ${val} already exists in BST! Duplicate keys not allowed in standard BST.`,
          codeLine: 2,
          dataState: cloneTree(root),
          activeNode: curr.val,
          visitedNodes: [...visited],
        });
        setSteps(newSteps);
        setCurrentStepIdx(0);
        setIsPlaying(true);
        return;
      } else if (val < curr.val) {
        newSteps.push({
          id: newSteps.length,
          description: `${val} < ${curr.val}. Moving down to LEFT subtree.`,
          codeLine: 3,
          dataState: cloneTree(root),
          activeNode: curr.val,
          visitedNodes: [...visited],
        });
        if (!curr.left) break;
        curr = curr.left;
      } else {
        newSteps.push({
          id: newSteps.length,
          description: `${val} > ${curr.val}. Moving down to RIGHT subtree.`,
          codeLine: 4,
          dataState: cloneTree(root),
          activeNode: curr.val,
          visitedNodes: [...visited],
        });
        if (!curr.right) break;
        curr = curr.right;
      }
    }

    const updatedTree = insertNode(cloneTree(root), val);
    newSteps.push({
      id: newSteps.length,
      description: `Found vacant leaf position. Attached new node ${val}. Insertion completed!`,
      codeLine: 2,
      dataState: updatedTree,
      activeNode: val,
      visitedNodes: [...visited, val],
    });

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setRoot(updatedTree);
    setIsPlaying(true);
  };

  const handleSearch = () => {
    const val = parseInt(searchVal, 10);
    if (isNaN(val)) return;
    setActiveOp('search');
    setTraversalOutput([]);

    const newSteps: VisualizerStep[] = [];
    let curr = root;
    const visited: number[] = [];
    let found = false;

    newSteps.push({
      id: 0,
      description: `Initiate search for key ${val} starting at root (${root?.val ?? 'NULL'}).`,
      codeLine: 2,
      dataState: cloneTree(root),
    });

    while (curr) {
      visited.push(curr.val);
      if (curr.val === val) {
        newSteps.push({
          id: newSteps.length,
          description: `Key ${val} FOUND in node! Search terminated successfully in O(h) comparisons.`,
          codeLine: 2,
          dataState: cloneTree(root),
          activeNode: curr.val,
          visitedNodes: [...visited],
        });
        found = true;
        break;
      } else if (val < curr.val) {
        newSteps.push({
          id: newSteps.length,
          description: `${val} < ${curr.val}. Search left subtree.`,
          codeLine: 3,
          dataState: cloneTree(root),
          activeNode: curr.val,
          visitedNodes: [...visited],
        });
        curr = curr.left;
      } else {
        newSteps.push({
          id: newSteps.length,
          description: `${val} > ${curr.val}. Search right subtree.`,
          codeLine: 4,
          dataState: cloneTree(root),
          activeNode: curr.val,
          visitedNodes: [...visited],
        });
        curr = curr.right;
      }
    }

    if (!found) {
      newSteps.push({
        id: newSteps.length,
        description: `Reached NULL leaf. Key ${val} does NOT exist in the tree.`,
        codeLine: 2,
        dataState: cloneTree(root),
        visitedNodes: [...visited],
      });
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleDelete = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    setActiveOp('delete');
    setTraversalOutput([]);

    const newSteps: VisualizerStep[] = [];
    newSteps.push({
      id: 0,
      description: `Targeting node ${val} for deletion. Locating node in BST.`,
      codeLine: 2,
      dataState: cloneTree(root),
    });

    // Check node child cases
    let nodeToDelete: BSTNode | null = null;
    const findTarget = (n: BSTNode | null) => {
      if (!n) return;
      if (n.val === val) nodeToDelete = n;
      findTarget(n.left);
      findTarget(n.right);
    };
    findTarget(root);

    if (!nodeToDelete) {
      newSteps.push({
        id: 1,
        description: `Node ${val} does not exist in BST. Nothing deleted.`,
        codeLine: 2,
        dataState: cloneTree(root),
      });
    } else {
      const hasLeft = Boolean((nodeToDelete as BSTNode).left);
      const hasRight = Boolean((nodeToDelete as BSTNode).right);

      if (!hasLeft && !hasRight) {
        newSteps.push({
          id: 1,
          description: `Case 1: Node ${val} is a LEAF node (0 children). Simply remove pointer from parent.`,
          codeLine: 6,
          dataState: cloneTree(root),
          activeNode: val,
        });
      } else if (!hasLeft || !hasRight) {
        newSteps.push({
          id: 1,
          description: `Case 2: Node ${val} has ONE child. Bypass node and link parent directly to child.`,
          codeLine: 7,
          dataState: cloneTree(root),
          activeNode: val,
        });
      } else {
        const succ = findMinNode((nodeToDelete as BSTNode).right!);
        newSteps.push({
          id: 1,
          description: `Case 3: Node ${val} has TWO children! Find inorder successor (${succ.val}: smallest in right subtree), copy value, then delete successor.`,
          codeLine: 8,
          dataState: cloneTree(root),
          activeNode: succ.val,
        });
      }

      const updatedTree = deleteNode(cloneTree(root), val);
      newSteps.push({
        id: newSteps.length,
        description: `Deletion of node ${val} completed. BST invariants preserved.`,
        codeLine: 11,
        dataState: updatedTree,
      });

      setRoot(updatedTree);
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleTraversal = (type: 'inorder' | 'preorder' | 'postorder') => {
    setActiveOp(type);
    const newSteps: VisualizerStep[] = [];
    const visited: number[] = [];
    const output: number[] = [];

    const traverse = (node: BSTNode | null) => {
      if (!node) return;

      if (type === 'preorder') {
        visited.push(node.val);
        output.push(node.val);
        newSteps.push({
          id: newSteps.length,
          description: `Preorder Visit: Root node ${node.val}.`,
          codeLine: 3,
          dataState: cloneTree(root),
          activeNode: node.val,
          visitedNodes: [...visited],
        });
      }

      traverse(node.left);

      if (type === 'inorder') {
        visited.push(node.val);
        output.push(node.val);
        newSteps.push({
          id: newSteps.length,
          description: `Inorder Visit: Node ${node.val} (left subtree completed).`,
          codeLine: 4,
          dataState: cloneTree(root),
          activeNode: node.val,
          visitedNodes: [...visited],
        });
      }

      traverse(node.right);

      if (type === 'postorder') {
        visited.push(node.val);
        output.push(node.val);
        newSteps.push({
          id: newSteps.length,
          description: `Postorder Visit: Node ${node.val} (both children completed).`,
          codeLine: 5,
          dataState: cloneTree(root),
          activeNode: node.val,
          visitedNodes: [...visited],
        });
      }
    };

    traverse(root);
    setTraversalOutput(output);
    setSteps(newSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const resetBalancedTree = () => {
    let tree: BSTNode | null = null;
    [50, 30, 70, 20, 40, 60, 80].forEach(v => {
      tree = insertNode(tree, v);
    });
    setRoot(tree);
    setSteps([]);
    setCurrentStepIdx(0);
    setTraversalOutput([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-brand-cyan/20 bg-dark-900/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            Binary Search Tree (BST) Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Left subtree &lt; Root &lt; Right subtree invariant. Visualizing insert, delete, and traversals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetBalancedTree}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Sample Tree
          </button>
        </div>
      </div>

      {/* SVG Tree Canvas */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-2xl relative overflow-x-auto min-h-[380px] flex flex-col justify-center">
        {!activeTree ? (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            Tree is empty (root == NULL). Insert nodes below.
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <svg className="w-full max-w-[650px] h-[320px]" viewBox="0 0 640 320">
              {/* Branch Connecting Lines */}
              {renderNodes.map((n) => (
                <React.Fragment key={`edge-${n.val}`}>
                  {n.leftX !== undefined && n.leftY !== undefined && (
                    <line
                      x1={n.x}
                      y1={n.y}
                      x2={n.leftX}
                      y2={n.leftY}
                      stroke="#475569"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}
                  {n.rightX !== undefined && n.rightY !== undefined && (
                    <line
                      x1={n.x}
                      y1={n.y}
                      x2={n.rightX}
                      y2={n.rightY}
                      stroke="#475569"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}
                </React.Fragment>
              ))}

              {/* Node Circles */}
              {renderNodes.map((n) => {
                const isActive = currentStep?.activeNode === n.val;
                const isVisited = currentStep?.visitedNodes?.includes(n.val);

                let fill = '#1e293b';
                let stroke = '#64748b';
                let textColor = '#f1f5f9';

                if (isActive) {
                  fill = '#0891b2';
                  stroke = '#22d3ee';
                  textColor = '#ffffff';
                } else if (isVisited) {
                  fill = '#1e3a8a';
                  stroke = '#3b82f6';
                  textColor = '#93c5fd';
                }

                return (
                  <g key={`node-${n.val}`} className="node-circle cursor-pointer">
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="19"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isActive ? '3.5' : '2'}
                      className="transition-all duration-300 shadow-md"
                    />
                    <text
                      x={n.x}
                      y={n.y + 5}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {n.val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* Traversal Output Banner */}
        {traversalOutput.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 uppercase font-bold">{activeOp} Output:</span>
            <div className="flex gap-2 text-brand-cyan font-bold">
              {traversalOutput.join(' ➔ ')}
            </div>
          </div>
        )}
      </div>

      {/* Operation Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insert & Delete */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Insert / Delete Node
          </h4>
          <input
            type="number"
            placeholder="Node value"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
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
            placeholder="Search key"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-blue"
          />
          <button
            onClick={handleSearch}
            className="w-full py-1.5 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 border border-brand-blue/40 text-brand-blue text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Search className="w-3.5 h-3.5" /> Search BST O(log n)
          </button>
        </div>

        {/* Traversals */}
        <div className="p-4 rounded-xl glass-card border border-slate-700/60 bg-dark-900/80 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Tree Traversals
          </h4>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleTraversal('inorder')}
              className="py-1.5 px-2 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 border border-brand-cyan/40 text-brand-cyan text-[11px] font-semibold transition-all active:scale-95"
              title="Inorder: Left -> Root -> Right (Sorted)"
            >
              Inorder
            </button>
            <button
              onClick={() => handleTraversal('preorder')}
              className="py-1.5 px-2 rounded-lg bg-brand-indigo/20 hover:bg-brand-indigo/30 border border-brand-indigo/40 text-brand-indigo text-[11px] font-semibold transition-all active:scale-95"
              title="Preorder: Root -> Left -> Right"
            >
              Preorder
            </button>
            <button
              onClick={() => handleTraversal('postorder')}
              className="py-1.5 px-2 rounded-lg bg-brand-violet/20 hover:bg-brand-violet/30 border border-brand-violet/40 text-brand-violet text-[11px] font-semibold transition-all active:scale-95"
              title="Postorder: Left -> Right -> Root"
            >
              Postorder
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            💡 Inorder traversal of any BST guarantees sorted order!
          </p>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <StepExplanation
        description={currentStep?.description || 'Select Insert, Delete, Search, or Traversals to watch step animations.'}
        complexityNotice="BST operations take O(h) time where h is height: O(log n) when balanced, up to O(n) if skewed."
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
