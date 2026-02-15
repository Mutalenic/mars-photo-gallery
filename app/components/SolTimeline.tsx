import { useState } from "react";

interface SolTimelineProps {
  currentSol: number;
  onSolChange: (sol: number) => void;
  maxSol?: number;
}

const SolTimeline = ({ currentSol, onSolChange, maxSol = 3000 }: SolTimelineProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSolChange(parseInt(e.target.value));
  };
  
  const getSolPosition = (sol: number) => (sol / maxSol) * 100;
  
  const getMilestonePosition = (sol: number) => getSolPosition(sol);
  
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-2xl">📅</span>
        Mission Timeline - Sol {currentSol}
      </h3>
      
      <div className="space-y-6">
        {/* Timeline Slider */}
        <div className="relative">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            {/* Progress bar */}
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
              style={{ width: `${getSolPosition(currentSol)}%` }}
            />
            
            {/* Milestone markers */}
            <div 
              className="absolute top-1/2 h-4 w-1 bg-red-500 transform -translate-y-1/2"
              style={{ left: `${getMilestonePosition(0)}%` }}
              title="Landing: Sol 0"
            />
            <div 
              className="absolute top-1/2 h-4 w-1 bg-green-500 transform -translate-y-1/2"
              style={{ left: `${getMilestonePosition(1000)}%` }}
              title="Major milestone: Sol 1000"
            />
            <div 
              className="absolute top-1/2 h-4 w-1 bg-blue-500 transform -translate-y-1/2"
              style={{ left: `${getMilestonePosition(2000)}%` }}
              title="Extended mission: Sol 2000"
            />
            
            {/* Current position indicator */}
            <div 
              className="absolute top-1/2 h-6 w-6 bg-white rounded-full transform -translate-y-1/2 shadow-lg border-2 border-amber-400 transition-all duration-300"
              style={{ left: `${getSolPosition(currentSol)}%` }}
            >
              <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75" />
            </div>
          </div>
          
          {/* Hidden range input for interaction */}
          <input
            type="range"
            min="0"
            max={maxSol}
            value={currentSol}
            onChange={handleSliderChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Mission timeline slider"
          />
        </div>
        
        {/* Timeline Labels */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-xs font-mono text-white/60">LANDING</p>
            <p className="text-sm font-semibold text-red-400">Sol 0</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-white/60">PRIMARY</p>
            <p className="text-sm font-semibold text-white">Sol {Math.floor(maxSol * 0.25)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-white/60">EXTENDED</p>
            <p className="text-sm font-semibold text-white">Sol {Math.floor(maxSol * 0.5)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-white/60">CURRENT</p>
            <p className="text-sm font-semibold text-amber-400">Sol {maxSol}</p>
          </div>
        </div>
        
        {/* Quick Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => onSolChange(Math.max(0, currentSol - 100))}
            className="px-3 py-1 rounded-lg border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition-colors"
          >
            -100 Sols
          </button>
          <button
            onClick={() => onSolChange(Math.max(0, currentSol - 10))}
            className="px-3 py-1 rounded-lg border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition-colors"
          >
            -10 Sols
          </button>
          <button
            onClick={() => onSolChange(Math.min(maxSol, currentSol + 10))}
            className="px-3 py-1 rounded-lg border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition-colors"
          >
            +10 Sols
          </button>
          <button
            onClick={() => onSolChange(Math.min(maxSol, currentSol + 100))}
            className="px-3 py-1 rounded-lg border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition-colors"
          >
            +100 Sols
          </button>
        </div>
        
        {/* Mission Context */}
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-3">
          <p className="text-sm text-amber-200">
            <span className="font-semibold">Mission Phase:</span> 
            {currentSol < 90 ? ' Landing and initial systems check' :
             currentSol < 365 ? ' Primary mission phase' :
             currentSol < 1000 ? ' Extended mission - exploring Mount Sharp' :
             currentSol < 2000 ? ' Long-term science operations' :
             ' Extended mission - climbing Mount Sharp'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolTimeline;
