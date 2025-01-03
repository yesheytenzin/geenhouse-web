"use client"

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns";

const CustomToolTip = ({ active, payload, label }: {
  active?: any;
  payload?: any;
  label?: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip border border-muted-foreground bg-muted p-2">
        <div className="label flex flex-col">
          <span className="p-1 font-bold ">
            {`Recorded at ${format(new Date(payload[0].payload.recordedAt), "EEEE do hh:mm aa",)}`}
          </span>
          <span className="text-[#69b3a2]">
            {`soilMoisture : ${payload[0].value}`}
          </span>
          <span className="text-[#a367e7]">
            {`Humidity : ${payload[1].value}`}
          </span>
          <span className="text-[#ff7f0e]">
            {`Temperature : ${payload[2].value}`}
          </span>
        </div>
      </div>
    )
  }
}

const ThresholdChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={data} margin={{ top: 40, right: 30, bottom: 10, left: 30 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis />
      <Tooltip content={<CustomToolTip />} />
      <Legend />
      <Area type="monotone" dataKey="soilMoisture" stackId="1" stroke="#69b3a2" fill="#69b3a2" />
      <Area type="monotone" dataKey="humidity" stackId="1" stroke="#a367e7" fill="#a367e7" />
      <Area type="monotone" dataKey="temperature" stackId="1" stroke="#ff7f0e" fill="#ff7f0e" />
    </AreaChart>
  </ResponsiveContainer>
);

const LineGraph = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 40, right: 30, bottom: 10, left: 30 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis />
      <Tooltip content={<CustomToolTip />} />
      <Legend />
      <Line type="monotone" dataKey="soilMoisture" stroke="#69b3a2" />
      <Line type="monotone" dataKey="humidity" stroke="#a367e7" />
      <Line type="monotone" dataKey="temperature" stroke="#ff7f0e" />
    </LineChart>
  </ResponsiveContainer>
);

const BarChartGraph = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data} margin={{ top: 40, right: 30, bottom: 10, left: 30 }} barCategoryGap="10%" barSize={20}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis />
      <Tooltip content={<CustomToolTip />} />
      <Legend />
      <Bar dataKey="soilMoisture" name="Soil Moisture" fill="#69b3a2" />
      <Bar dataKey="humidity" name="Humidity" fill="#a367e7" />
      <Bar dataKey="temperature" name="Temperature" fill="#ff7f0e" />
    </BarChart>
  </ResponsiveContainer>
);

export interface ReadingsParameterType {
  recordedAt: string,
  soilMoisture: number,
  humidity: number,
  temperature: number
}


export default function ReadingsGraph({ data }: { data: ReadingsParameterType[] }) {
  const [selectedGraph, setSelectedGraph] = useState('line');
  const [graphData, setGraphData] = useState<ReadingsParameterType[]>([]);
  useEffect(() => {
    setGraphData(data);
  }, [data])
  const handleGraphChange = (chart) => {
    setSelectedGraph(chart);
  };

  return (
    <>
      <div className="graph-selector border-2 relative border-muted-foreground">
        {
          data && (
            graphData.length < 1 && (
              <div className="absolute top-[50%] bottom-[50%] left-[39%] text-muted-foreground antialiased">
                <h5>No data has been recorded as of now</h5>
              </div>
            )
          )
        }
        <h3 className='text-center font-mono font-bold p-3'>Environment Parameter Records Readings</h3>
        <p className="prose px-2">Visualization Graph</p>
        <form>
          <RadioGroup defaultChecked={true} defaultValue={selectedGraph} className='flex p-2' onValueChange={handleGraphChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="area" id="area" />
              <label htmlFor="area">Area Chart</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bar" id="bar" />
              <label htmlFor="bar">Bar Chart</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="line" id="line" />
              <label htmlFor="line">Line Chart</label>
            </div>
          </RadioGroup>
        </form>
        {selectedGraph === 'area' && <ThresholdChart data={data} />}
        {selectedGraph === 'line' && <LineGraph data={data} />}
        {selectedGraph === 'bar' && <BarChartGraph data={data} />}
      </div>
    </>
  );
}

