import { ArraySChemaType } from "../../../shared/types/validationApi.types";

export const WEATHER_SCHEMA: ArraySChemaType[] = [
    { field: "main", validate: (v) => typeof v === "number" },
    { field: "wind", validate: (v) => typeof v === "number" },
    { field: "weather", validate: (v) => typeof v === "number" },
];

export const WEATHER_MAIN_SCHEMA: ArraySChemaType[] = [
    { field: "main", validate: (v) => typeof v === "number" }
];

export const WEATHER_WIND_SCHEMA: ArraySChemaType[] = [
    { field: "main", validate: (v) => typeof v === "number" },
    
];

export const WEATHER_WEATHER_SCHEMA: ArraySChemaType[] = [
    { field: "main", validate: (v) => typeof v === "number" },
    
];
