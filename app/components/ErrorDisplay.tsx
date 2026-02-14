'use client'

type ErrorDisplayProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

const ErrorDisplay = ({ message, actionLabel, onAction }: ErrorDisplayProps) => {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
      <p className="text-base font-medium text-red-300">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;