import { landingSites } from "@/lib/landingSites";
import {
  MarsPhotoResponse,
  NasaPhoto,
  PhotoSummary,
  ProcessedPhoto,
  QueryFilters,
  RoverName
} from "@/types/nasa";

const API_BASE = "https://api.nasa.gov/mars-photos/api/v1";
const cache = new Map<string, MarsPhotoResponse>();

const getApiKey = () => {
  if (!process.env.NEXT_PUBLIC_NASA_API_KEY) {
    console.warn("Missing NEXT_PUBLIC_NASA_API_KEY; falling back to DEMO_KEY");
  }
  return process.env.NEXT_PUBLIC_NASA_API_KEY ?? "DEMO_KEY";
};

const encodeFilters = (filters: QueryFilters) => JSON.stringify(filters);

const buildRequestUrl = (filters: QueryFilters) => {
  const params = new URLSearchParams();

  if (filters.dateMode === "sol" && typeof filters.sol === "number") {
    params.append("sol", filters.sol.toString());
  }

  if (filters.dateMode === "earth" && filters.earthDate) {
    params.append("earth_date", filters.earthDate);
  }

  if (filters.camera !== "all") {
    params.append("camera", filters.camera);
  }

  params.append("api_key", getApiKey());

  return `${API_BASE}/rovers/${filters.rover}/photos?${params.toString()}`;
};

const computeQualityScore = (photo: NasaPhoto) => {
  const solWeight = photo.sol % 100;
  const cameraWeight = photo.camera.name.length * 3;
  return Math.min(100, Math.round(50 + solWeight / 2 + cameraWeight));
};

const deriveDominantColor = (photo: NasaPhoto) => {
  const hash = photo.id % 360;
  return `hsl(${hash}, 45%, 55%)`;
};

const buildLandingSite = (roverName: string) => {
  const normalized = roverName.toLowerCase() as RoverName;
  return landingSites[normalized];
};

const summarizePhotos = (photos: ProcessedPhoto[]): PhotoSummary => {
  const summary: PhotoSummary = {
    roverBreakdown: {},
    cameraUsage: {},
    landingSiteUsage: {},
    dateRange: {
      start: null,
      end: null
    },
    latestCapture: null
  };

  for (const photo of photos) {
    summary.roverBreakdown[photo.rover.name] = (summary.roverBreakdown[photo.rover.name] ?? 0) + 1;
    summary.cameraUsage[photo.camera.full_name] = (summary.cameraUsage[photo.camera.full_name] ?? 0) + 1;
    summary.landingSiteUsage[photo.landingSite.name] =
      (summary.landingSiteUsage[photo.landingSite.name] ?? 0) + 1;

    if (!summary.dateRange.start || photo.earth_date < summary.dateRange.start) {
      summary.dateRange.start = photo.earth_date;
    }

    if (!summary.dateRange.end || photo.earth_date > summary.dateRange.end) {
      summary.dateRange.end = photo.earth_date;
    }

    if (!summary.latestCapture || photo.earth_date > summary.latestCapture) {
      summary.latestCapture = photo.earth_date;
    }
  }

  return summary;
};

export const fetchMarsPhotos = async (filters: QueryFilters): Promise<MarsPhotoResponse> => {
  const cacheKey = encodeFilters(filters);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const url = buildRequestUrl(filters);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch NASA data");
  }

  const data = await response.json();
  const limitedPhotos: NasaPhoto[] = data.photos.slice(0, filters.limit);

  const processed: ProcessedPhoto[] = limitedPhotos.map((photo) => {
    const landingSite = buildLandingSite(photo.rover.name);
    return {
      ...photo,
      qualityScore: computeQualityScore(photo),
      dominantColor: deriveDominantColor(photo),
      landingSite
    };
  });

  const summary = summarizePhotos(processed);
  const payload: MarsPhotoResponse = {
    photos: processed,
    summary
  };

  cache.set(cacheKey, payload);
  return payload;
};
