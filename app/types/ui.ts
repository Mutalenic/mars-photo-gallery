import { CameraCode, DateMode, RoverName } from "@/types/nasa";

export type FilterOption<T extends string> = {
  label: string;
  value: T;
};

export type RoverOption = FilterOption<RoverName>;
export type CameraOption = FilterOption<CameraCode | "all">;
export type DateModeOption = FilterOption<DateMode>;

export type RangeValue = {
  start: string;
  end: string;
};
