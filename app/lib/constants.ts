import { CameraCode, QueryFilters, RoverName } from "@/types/nasa";
import { landingSites } from "@/lib/landingSites";

export const ROVER_OPTIONS: Array<{ value: RoverName; label: string }> = [
  { value: "curiosity", label: "Curiosity" },
  { value: "perseverance", label: "Perseverance" },
  { value: "opportunity", label: "Opportunity" },
  { value: "spirit", label: "Spirit" }
];

export const ROVER_CAMERAS: Record<RoverName, Array<{ code: CameraCode; label: string }>> = {
  curiosity: [
    { code: "FHAZ", label: "Front Hazard" },
    { code: "RHAZ", label: "Rear Hazard" },
    { code: "MAST", label: "Mast" },
    { code: "CHEMCAM", label: "ChemCam" },
    { code: "MAHLI", label: "MAHLI" },
    { code: "MARDI", label: "MARDI" },
    { code: "NAVCAM", label: "Navigation" }
  ],
  perseverance: [
    { code: "NAVCAM", label: "Navigation" },
    { code: "MAST", label: "Mast" },
    { code: "SUPERCAM", label: "SuperCam" },
    { code: "PIXL", label: "PIXL" },
    { code: "LCAM", label: "LCAM" },
    { code: "MEDA", label: "MEDA" },
    { code: "SKYCAM", label: "SkyCam" }
  ],
  opportunity: [
    { code: "FHAZ", label: "Front Hazard" },
    { code: "RHAZ", label: "Rear Hazard" },
    { code: "NAVCAM", label: "Navigation" },
    { code: "PANCAM", label: "Panoramic" },
    { code: "MINITES", label: "Mini-TES" }
  ],
  spirit: [
    { code: "FHAZ", label: "Front Hazard" },
    { code: "RHAZ", label: "Rear Hazard" },
    { code: "NAVCAM", label: "Navigation" },
    { code: "PANCAM", label: "Panoramic" },
    { code: "MINITES", label: "Mini-TES" }
  ]
};

export const LANDING_SITE_OPTIONS = [
  { value: "all", label: "All landing sites" },
  ...Object.values(landingSites).map((site) => ({ value: site.id, label: site.name }))
];

export const DEFAULT_FILTERS: QueryFilters = {
  rover: "curiosity",
  camera: "all",
  dateMode: "sol",
  sol: 1000,
  limit: 50
};
