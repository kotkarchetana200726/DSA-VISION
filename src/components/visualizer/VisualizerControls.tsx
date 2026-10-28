import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface VisualizerControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onSpeedChange: (speed: number) => void;
  canNext: boolean;
  canPrev: boolean;
}

export const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  canNext,
  canPrev,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl glass-panel border border-slate-700/60 bg-dark-900/90 shadow-lg">
      {/* Playback Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          title="Reset to initial state"
          className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50 hover:border-slate-500 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onPrev}
          disabled={!canPrev}
          title="Previous step"
          className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50 active:scale-95"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {isPlaying ? (
          <button
            onClick={onPause}
            title="Pause execution"
            className="px-4 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium flex items-center gap-2 transition-all duration-200 border border-amber-500/40 active:scale-95 shadow-sm"
          >
            <Pause className="w-4 h-4 fill-current" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={!canNext && totalSteps > 0}
            title="Play animation"
            className="px-4 py-2.5 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan font-medium flex items-center gap-2 transition-all duration-200 border border-brand-cyan/40 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play</span>
          </button>
        )}

        <button
          onClick={onNext}
          disabled={!canNext}
          title="Next step"
          className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50 active:scale-95"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Step Counter Badge */}
        <div className="ml-2 px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 text-xs font-mono text-slate-300">
          Step <span className="text-brand-cyan font-bold">{totalSteps === 0 ? 0 : currentStep + 1}</span> of <span className="text-slate-400">{totalSteps}</span>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-400">Speed:</span>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={2100 - speed}
          onChange={(e) => onSpeedChange(2100 - Number(e.target.value))}
          className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
          title={`Animation delay: ${speed}ms`}
        />
        <span className="text-xs font-mono text-brand-cyan min-w-[3.5rem] text-right">
          {speed <= 300 ? 'Fast' : speed <= 900 ? 'Normal' : 'Slow'}
        </span>
      </div>
    </div>
  );
};
