const PhotoSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="h-64 w-full animate-pulse bg-slate-800" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-20 animate-pulse rounded bg-slate-700" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-700" />
        <div className="h-4 w-24 animate-pulse rounded bg-slate-700" />
      </div>
    </div>
  );
};

export default PhotoSkeleton;
