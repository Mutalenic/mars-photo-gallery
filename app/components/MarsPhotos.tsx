"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { fetchMarsPhotos } from "@/lib/nasaClient";
import { DEFAULT_FILTERS, LANDING_SITE_OPTIONS, ROVER_CAMERAS, ROVER_OPTIONS } from "@/lib/constants";
import { CameraCode, PhotoSummary, ProcessedPhoto, QueryFilters } from "@/types/nasa";

import ErrorDisplay from "./ErrorDisplay";
import LoadingSpinner from "./LoadingSpinner";

const MarsPhotos = () => {
  const [queryFilters, setQueryFilters] = useState<QueryFilters>(DEFAULT_FILTERS);
  const [landingSite, setLandingSite] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" });
  const [photos, setPhotos] = useState<ProcessedPhoto[]>([]);
  const [summary, setSummary] = useState<PhotoSummary | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<ProcessedPhoto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchMarsPhotos(queryFilters)
      .then((result) => {
        if (cancelled) return;
        setPhotos(result.photos);
        setSummary(result.summary);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [queryFilters]);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesLanding = landingSite === "all" || photo.landingSite.id === landingSite;
      const withinStart = !dateRange.start || photo.earth_date >= dateRange.start;
      const withinEnd = !dateRange.end || photo.earth_date <= dateRange.end;
      return matchesLanding && withinStart && withinEnd;
    });
  }, [photos, landingSite, dateRange]);

  const cameraOptions = useMemo(() => {
    const base = [{ value: "all", label: "All cameras" }];
    return base.concat(ROVER_CAMERAS[queryFilters.rover].map((camera) => ({ value: camera.code, label: camera.label })));
  }, [queryFilters.rover]);

  const heroPhoto = filteredPhotos[0] ?? photos[0];

  const summaryCards = useMemo(() => {
    if (!summary) return [];

    return [
      {
        key: "window",
        title: "Temporal window",
        value:
          summary.dateRange.start && summary.dateRange.end
            ? `${summary.dateRange.start} → ${summary.dateRange.end}`
            : "Pending",
        hint: "earth-date span"
      },
      {
        key: "latest",
        title: "Latest capture",
        value: summary.latestCapture ?? "--",
        hint: "chrono freshness"
      },
      {
        key: "landing",
        title: "Landing sites",
        value: String(Object.keys(summary.landingSiteUsage).length || "--"),
        hint: "active contexts"
      }
    ];
  }, [summary]);

  const handleDateModeChange = (mode: QueryFilters["dateMode"]) => {
    setQueryFilters((prev) => ({
      ...prev,
      dateMode: mode,
      sol: mode === "sol" ? prev.sol ?? 1000 : undefined,
      earthDate: mode === "earth" ? prev.earthDate ?? new Date().toISOString().split("T")[0] : undefined
    }));
  };

  const handleCameraChange = (value: string) => {
    setQueryFilters((prev) => ({
      ...prev,
      camera: (value as CameraCode | "all") ?? "all"
    }));
  };

  const handleSolChange = (value: string) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setQueryFilters((prev) => ({
      ...prev,
      sol: parsed
    }));
  };

  const handleEarthDateChange = (value: string) => {
    setQueryFilters((prev) => ({
      ...prev,
      earthDate: value
    }));
  };

  if (loading) {
    return <LoadingSpinner label="Fetching rover telemetry" />;
  }

  if (error) {
    return <ErrorDisplay message={error} actionLabel="Retry" onAction={() => setQueryFilters({ ...queryFilters })} />;
  }

  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm text-white/70">
            Rover
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
              value={queryFilters.rover}
              onChange={(event) => setQueryFilters((prev) => ({ ...prev, rover: event.target.value as QueryFilters["rover"], camera: "all" }))}
            >
              {ROVER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-white/70">
            Camera
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
              value={queryFilters.camera}
              onChange={(event) => handleCameraChange(event.target.value)}
            >
              {cameraOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-white/70">
            Mode
            <div className="mt-1 flex gap-2">
              {["sol", "earth"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleDateModeChange(mode as QueryFilters["dateMode"])}
                  className={`flex-1 rounded-xl border p-3 text-sm font-semibold ${
                    queryFilters.dateMode === mode ? "border-amber-400 bg-amber-300/10 text-amber-200" : "border-white/10 text-white"
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </label>

          <label className="text-sm text-white/70">
            {queryFilters.dateMode === "sol" ? "Sol (Martian day)" : "Earth Date"}
            {queryFilters.dateMode === "sol" ? (
              <input
                type="number"
                min={0}
                value={queryFilters.sol ?? 0}
                onChange={(event) => handleSolChange(event.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
              />
            ) : (
              <input
                type="date"
                value={queryFilters.earthDate ?? ""}
                onChange={(event) => handleEarthDateChange(event.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
              />
            )}
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="text-sm text-white/70">
            Landing site filter
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
              value={landingSite}
              onChange={(event) => setLandingSite(event.target.value)}
            >
              {LANDING_SITE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-white/70">
            Start date
            <input
              type="date"
              value={dateRange.start}
              onChange={(event) => setDateRange((prev) => ({ ...prev, start: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
            />
          </label>

          <label className="text-sm text-white/70">
            End date
            <input
              type="date"
              value={dateRange.end}
              onChange={(event) => setDateRange((prev) => ({ ...prev, end: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
            />
          </label>
        </div>
      </div>

      {heroPhoto && (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800">
            <Image
              src={heroPhoto.img_src}
              alt={`Rover capture ${heroPhoto.id}`}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">{heroPhoto.rover.name}</p>
              <h3 className="mt-2 text-2xl font-semibold">{heroPhoto.camera.full_name}</h3>
              <p className="text-sm text-white/70">Captured on {heroPhoto.earth_date}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <StatCard title="Photos ingested" value={filteredPhotos.length.toString()} hint="after client filters" />
            {summaryCards.map((card) => (
              <StatCard key={card.key} title={card.title} value={card.value} hint={card.hint} />
            ))}
            <button
              className="rounded-2xl border border-white/10 bg-amber-300/10 p-4 text-left text-amber-100"
              onClick={() => setSelectedPhoto(heroPhoto)}
            >
              Open briefing modal
              <span className="block text-sm text-amber-200/70">Quality score {heroPhoto.qualityScore}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Mission breakdown</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(summary?.roverBreakdown ?? {}).map(([rover, count]) => (
            <StatCard key={rover} title={rover} value={String(count)} hint="photos in window" />
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <button
            key={photo.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image src={photo.img_src} alt={`${photo.camera.full_name}`} width={600} height={600} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
            <div className="space-y-1 p-4 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">{photo.rover.name}</p>
              <p className="text-base font-semibold">{photo.camera.full_name}</p>
              <p className="text-sm text-white/70">{photo.earth_date}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
            <button className="absolute right-4 top-4 rounded-full border border-white/20 p-2 text-white" onClick={() => setSelectedPhoto(null)}>
              &times;
            </button>
            <Image src={selectedPhoto.img_src} alt="Selected Mars capture" width={1600} height={1200} className="h-[500px] w-full object-cover" />
            <div className="grid gap-4 p-6 text-white md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-200">{selectedPhoto.rover.name}</p>
                <h4 className="text-2xl font-semibold">{selectedPhoto.camera.full_name}</h4>
                <p className="text-white/70">Captured {selectedPhoto.earth_date}</p>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>Landing site: {selectedPhoto.landingSite.name}</p>
                <p>Region: {selectedPhoto.landingSite.region}</p>
                <p>Quality score: {selectedPhoto.qualityScore}</p>
                <p>Dominant color: {selectedPhoto.dominantColor}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const StatCard = ({ title, value, hint }: { title: string; value: string; hint: string }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-white">
    <p className="text-sm uppercase tracking-[0.3em] text-white/50">{title}</p>
    <p className="mt-2 text-3xl font-semibold">{value}</p>
    <p className="text-sm text-white/60">{hint}</p>
  </div>
);

export default MarsPhotos;
