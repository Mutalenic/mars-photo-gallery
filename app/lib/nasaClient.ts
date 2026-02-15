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

// Mock data for development when API is unavailable
const getMockData = (): MarsPhotoResponse => {
  const mockPhotos: ProcessedPhoto[] = [
    {
      id: 102683,
      sol: 1000,
      img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG",
      earth_date: "2015-05-30",
      camera: {
        id: 20,
        name: "FHAZ",
        rover_id: 5,
        full_name: "Front Hazard Avoidance Camera"
      },
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active"
      },
      qualityScore: 75,
      dominantColor: "hsl(120, 45%, 55%)",
      landingSite: {
        id: "gale_crater",
        name: "Gale Crater",
        region: "Martian southern hemisphere"
      }
    },
    {
      id: 102684,
      sol: 1000,
      img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/rcam/RRB_486265257EDR_F0481570RHAZ00323M_.JPG",
      earth_date: "2015-05-30",
      camera: {
        id: 21,
        name: "RHAZ",
        rover_id: 5,
        full_name: "Rear Hazard Avoidance Camera"
      },
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active"
      },
      qualityScore: 82,
      dominantColor: "hsl(200, 45%, 55%)",
      landingSite: {
        id: "gale_crater",
        name: "Gale Crater",
        region: "Martian southern hemisphere"
      }
    },
    {
      id: 102685,
      sol: 1000,
      img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/mcam/MLB_486265257EDR_F0481570MHAZ00323M_.JPG",
      earth_date: "2015-05-30",
      camera: {
        id: 22,
        name: "MAST",
        rover_id: 5,
        full_name: "Mast Camera"
      },
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active"
      },
      qualityScore: 90,
      dominantColor: "hsl(60, 45%, 55%)",
      landingSite: {
        id: "gale_crater",
        name: "Gale Crater",
        region: "Martian southern hemisphere"
      }
    }
  ];

  return {
    photos: mockPhotos,
    summary: summarizePhotos(mockPhotos)
  };
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

  try {
    const url = buildRequestUrl(filters);
    console.log('Fetching from NASA API:', url);
    
    const response = await fetch(url);

    if (!response.ok) {
      console.warn('NASA API failed, using mock data');
      return getMockData();
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
  } catch (error) {
    console.error('Error fetching from NASA API:', error);
    console.log('Falling back to mock data');
    return getMockData();
  }
};
