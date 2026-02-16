interface APODProps {
  apod: {
    title: string;
    url: string;
    explanation: string;
  };
}

const APODPanel = ({ apod }: APODProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-2xl">🌌</span>
        Daily Space Context
      </h3>
      
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="relative overflow-hidden rounded-xl">
          {/* Use a placeholder div instead of problematic external image */}
          <div className="h-full w-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <span className="text-4xl">🪐</span>
              <p className="mt-2 text-sm font-medium">{apod.title}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <p className="text-xs font-medium text-white/90 truncate">{apod.title}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-xl font-semibold text-white">{apod.title}</h4>
          <p className="text-sm text-white/80 leading-relaxed">
            {apod.explanation}
          </p>
          
          <div className="rounded-lg border border-blue-400/30 bg-blue-400/5 p-3">
            <p className="text-sm text-blue-200">
              <span className="font-semibold">Mission Connection:</span> Today&apos;s featured cosmic view 
              provides context for Mars exploration, reminding us that the Red Planet is part of 
              our broader solar system neighborhood that rovers are helping us understand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APODPanel;
