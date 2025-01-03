import { createContext, useState } from "react";
import { CropThreshold } from "./(table)/columns";

export type ParameterValueTypes = "soilmoisture" | "temperature" | "humidity";

interface EnvironmentParameterSetType {
  value: ParameterValueTypes;
  setValue: (val: ParameterValueTypes) => void;
}

// Create the context
export const EnvironmentParameterContext = createContext<EnvironmentParameterSetType>({
  value: "temperature",
  setValue: () => {},
});
