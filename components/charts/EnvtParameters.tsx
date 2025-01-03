"use client";

import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";

const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate);
  return format(date, "dd/MM/yy@HH:mm"); // Format the date and time as desired
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`Time: ${formatDateTime(data.recordedAt)}`}</p>
        <p>{`Value: ${data.value}`}</p>
      </div>
    );
  }

  return null;
};

export interface ThresholdRecordsType {
  HumidityThresholdRecord: {
    recordedAt: string;
    value: number;
  }[];
  TemperatureThresholdRecord: {
    recordedAt: string;
    value: number;
  }[];
  SoilMoistureThresholdRecord: {
    recordedAt: string;
    value: number;
  }[];
}
const ThresholdRecordGraph = ({ data }: { data: ThresholdRecordsType }) => {
  const allRecordsEmpty =
    !data.TemperatureThresholdRecord ||
    !data.HumidityThresholdRecord ||
    !data.SoilMoistureThresholdRecord;
  return (
    <div className="graph-selector border-2 relative border-muted-foreground">
      {allRecordsEmpty && (
        <div className="absolute top-[50%] bottom-[50%] left-[39%] text-muted-foreground antialiased">
          <h5>No threshold data has been recorded as of now</h5>
        </div>
      )}
      <h3 className="text-center font-mono font-bold p-3">
        Threshold Records Readings
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <YAxis type="number" dataKey="value" />
          <XAxis tick={null} />
          <ZAxis dataKey={"value"} range={[60, 100]} name="z" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Label
            value={"Test"}
            x={6}
            y={6}
            content={<p className="text-red-500">No Data found</p>}
          />
          <Scatter
            name="temperature"
            data={data.TemperatureThresholdRecord}
            fill="#ff0000"
            line
            shape="cross"
          />
          <Scatter
            name="humidity"
            data={data.HumidityThresholdRecord}
            fill="blue"
            line
            shape="triangle"
          />
          <Scatter
            name="soilMoisture"
            data={data.SoilMoistureThresholdRecord}
            fill="yellow"
            line
            shape="diamond"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThresholdRecordGraph;
