export type RoverName = "curiosity" | "perseverance" | "opportunity" | "spirit";

export type CameraCode =
  | "FHAZ"
  | "RHAZ"
  | "MAST"
  | "CHEMCAM"
  | "MAHLI"
  | "MARDI"
  | "NAVCAM"
  | "PANCAM"
  | "MINITES"
  | "SKYCAM"
  | "SUPERCAM"
  | "PIXL"
  | "MEDA"
  | "LCAM";

export type DateMode = "sol" | "earth";

export interface RoverInfo {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: "active" | "complete";
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: Array<{
    name: CameraCode;
    full_name: string;
  }>;
}

export interface LandingSite {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  region: string;
  description: string;
}

export interface NasaPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: CameraCode;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: RoverInfo;
}

export interface ProcessedPhoto extends NasaPhoto {
  qualityScore: number;
  dominantColor: string;
  landingSite: LandingSite;
}

export interface PhotoSummary {
  roverBreakdown: Record<string, number>;
  cameraUsage: Record<string, number>;
  landingSiteUsage: Record<string, number>;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  latestCapture: string | null;
}

export interface MarsPhotoResponse {
  photos: ProcessedPhoto[];
  summary: PhotoSummary;
}

export interface QueryFilters {
  rover: RoverName;
  camera: CameraCode | "all";
  dateMode: DateMode;
  sol?: number;
  earthDate?: string;
  limit: number;
}

export interface ClientFilters {
  landingSite: string;
  dateRange: {
    start: string;
    end: string;
  };
}
