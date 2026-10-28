import React from 'react';
import { Info, Activity, GitCommit, Layers } from 'lucide-react';

interface StepExplanationProps {
  description: string;
  counters?: {
    comparisons?: number;
    swaps?: number;
    writes?: number;
    accesses?: number;
    depth?: number;
  };
  complexityNotice?: string;
}

export const StepExplanation: React.FC<StepExplanationProps> = ({
  description,
  counters,
  complexityNotice,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-md">
      {/* Current Step Description */}
      <div className="flex items-start gap-3 flex-1">
        <div className="p-2 rounded-lg bg-brand-blue/20 text-brand-blue shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Current Operation</p>
          <p className="text-sm font-medium text-slate-100 mt-0.5 leading-snug">
            {description || 'Ready. Select an operation or hit Play.'}
          </p>
          {complexityNotice && (
            <p className="text-xs text-brand-cyan/80 mt-1 italic">
              💡 {complexityNotice}
            </p>
          )}
        </div>
      </div>

      {/* Operation Counters */}
      {counters && Object.keys(counters).length > 0 && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          {counters.comparisons !== undefined && (
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-1.5 text-xs">
              <Activity className="w-3.5 h-3.5 text-brand-amber" />
              <span className="text-slate-400">Compares:</span>
              <span className="font-mono font-bold text-amber-300">{counters.comparisons}</span>
            </div>
          )}

          {counters.swaps !== undefined && (
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-1.5 text-xs">
              <GitCommit className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-slate-400">Swaps:</span>
              <span className="font-mono font-bold text-cyan-300">{counters.swaps}</span>
            </div>
          )}

          {counters.writes !== undefined && (
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-1.5 text-xs">
              <Layers className="w-3.5 h-3.5 text-brand-violet" />
              <span className="text-slate-400">Writes:</span>
              <span className="font-mono font-bold text-violet-300">{counters.writes}</span>
            </div>
          )}

          {counters.accesses !== undefined && (
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Accesses:</span>
              <span className="font-mono font-bold text-blue-300">{counters.accesses}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
