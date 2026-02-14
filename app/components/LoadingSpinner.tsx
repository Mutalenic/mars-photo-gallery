'use client'
type LoadingSpinnerProps = {
  label?: string;
};

const LoadingSpinner = ({ label = " Fetching telemetry" }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-16 text-slate-100">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-amber-400" />
      <p className="text-sm uppercase tracking-[0.3em] text-white/70">{label}</p>
    </div>
  );
};

export default LoadingSpinner;