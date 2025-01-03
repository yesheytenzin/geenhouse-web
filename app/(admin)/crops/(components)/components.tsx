"use client";

import { useState } from "react";
import { EnvironmentParameterContext } from "./context";
import CropsThresholdTable from "./(table)/main";

export default function ThresholdCombinedComponents() {
  const [value, setValue] = useState<
    "temperature" | "soilmoisture" | "humidity"
  >("temperature");
  return (
    <EnvironmentParameterContext.Provider value={{ value, setValue }}>
      <div className="max-w-4xl mx-auto">
        <CropsThresholdTable />
      </div>
    </EnvironmentParameterContext.Provider>
  );
}
