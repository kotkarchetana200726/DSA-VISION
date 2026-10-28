import React from 'react';
import { Code2 } from 'lucide-react';

interface PseudocodePanelProps {
  codeLines: string[];
  activeLine: number; // 1-indexed or 0-indexed
  title?: string;
}

export const PseudocodePanel: React.FC<PseudocodePanelProps> = ({
  codeLines,
  activeLine,
  title = 'Algorithm Pseudocode',
}) => {
  return (
    <div className="rounded-xl glass-panel border border-slate-700/60 overflow-hidden bg-dark-900/95 flex flex-col h-full shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-slate-300">
        <Code2 className="w-4 h-4 text-brand-cyan" />
        <span>{title}</span>
      </div>
      <div className="p-3 font-code text-xs leading-relaxed overflow-x-auto flex-1 flex flex-col justify-center">
        {codeLines.map((line, idx) => {
          const lineNumber = idx + 1;
          const isActive = lineNumber === activeLine;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 px-2.5 py-1 rounded transition-all duration-200 ${
                isActive
                  ? 'bg-brand-cyan/20 border-l-2 border-brand-cyan text-brand-cyan font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <span className={`w-5 text-right select-none font-mono text-[10px] ${isActive ? 'text-brand-cyan' : 'text-slate-600'}`}>
                {lineNumber}
              </span>
              <pre className="font-mono text-xs whitespace-pre">{line}</pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};
