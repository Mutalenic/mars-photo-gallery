import { LandingSite, RoverName } from "@/types/nasa";

export const landingSites: Record<RoverName, LandingSite> = {
  curiosity: {
    id: "gale-crater",
    name: "Gale Crater",
    latitude: -4.5895,
    longitude: 137.4417,
    region: "Aeolis Palus",
    description:
      "Curiosity landed in Gale Crater in 2012 to investigate Mars' habitability and geology."
  },
  perseverance: {
    id: "jezero-crater",
    name: "Jezero Crater",
    latitude: 18.4447,
    longitude: 77.4508,
    region: "Nili Fossae",
    description:
      "Perseverance is exploring the ancient river delta within Jezero Crater searching for signs of past life."
  },
  opportunity: {
    id: "meridiani-planum",
    name: "Meridiani Planum",
    latitude: -1.9462,
    longitude: 354.4734,
    region: "Equatorial Highlands",
    description:
      "Opportunity investigated sedimentary layers in Meridiani Planum, revealing evidence of past water."
  },
  spirit: {
    id: "gusev-crater",
    name: "Gusev Crater",
    latitude: -14.5858,
    longitude: 175.472636,
    region: "Gusev Basin",
    description:
      "Spirit explored Gusev Crater and the Columbia Hills, uncovering rocks altered by water."
  }
};
