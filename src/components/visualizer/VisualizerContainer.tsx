import React, { useState } from 'react';
import { TopicId } from '../../types/dsa';
import { ArrayVisualizer } from './ArrayVisualizer';
import { LinkedListVisualizer } from './LinkedListVisualizer';
import { StackVisualizer } from './StackVisualizer';
import { QueueVisualizer } from './QueueVisualizer';
import { TreeVisualizer } from './TreeVisualizer';
import { HeapVisualizer } from './HeapVisualizer';
import { GraphVisualizer } from './GraphVisualizer';
import { HashTableVisualizer } from './HashTableVisualizer';
import { Layers, GitCommit, Server, ListFilter, Network, Boxes, Share2, Hash } from 'lucide-react';

interface VisualizerContainerProps {
  initialTopic?: TopicId;
}

const MODULES: { id: TopicId; name: string; icon: React.ReactNode }[] = [
  { id: 'arrays', name: 'Arrays', icon: <Layers className="w-4 h-4" /> },
  { id: 'linked-lists', name: 'Linked Lists', icon: <GitCommit className="w-4 h-4" /> },
  { id: 'stacks', name: 'Stacks', icon: <Server className="w-4 h-4" /> },
  { id: 'queues', name: 'Queues', icon: <ListFilter className="w-4 h-4" /> },
  { id: 'trees', name: 'Binary Trees & BST', icon: <Network className="w-4 h-4" /> },
  { id: 'heaps', name: 'Heaps', icon: <Boxes className="w-4 h-4" /> },
  { id: 'graphs', name: 'Graphs', icon: <Share2 className="w-4 h-4" /> },
  { id: 'hash-tables', name: 'Hash Tables', icon: <Hash className="w-4 h-4" /> },
];

export const VisualizerContainer: React.FC<VisualizerContainerProps> = ({ initialTopic = 'arrays' }) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId>(initialTopic);

  return (
    <div className="space-y-6">
      {/* Module Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MODULES.map((m) => {
          const isSelected = selectedTopic === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedTopic(m.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? 'bg-brand-cyan text-dark-950 font-bold border-brand-cyan shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {m.icon}
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Data Structure Visualizer Component */}
      <div className="transition-all duration-300">
        {selectedTopic === 'arrays' && <ArrayVisualizer />}
        {selectedTopic === 'linked-lists' && <LinkedListVisualizer />}
        {selectedTopic === 'stacks' && <StackVisualizer />}
        {selectedTopic === 'queues' && <QueueVisualizer />}
        {selectedTopic === 'trees' && <TreeVisualizer />}
        {selectedTopic === 'heaps' && <HeapVisualizer />}
        {selectedTopic === 'graphs' && <GraphVisualizer />}
        {selectedTopic === 'hash-tables' && <HashTableVisualizer />}
      </div>
    </div>
  );
};
