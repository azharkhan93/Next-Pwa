"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { MdScience } from "react-icons/md";

export type NutrientScore = {
  parameter: string;
  current: number;
  benchmark: number;
  unit: string;
  actualAvg: string;
};

export type SoilHealthRadarChartProps = {
  data?: NutrientScore[];
};

const defaultNutrientData: NutrientScore[] = [
  { parameter: "N", current: 85, benchmark: 100, unit: "kg/ha", actualAvg: "265 kg/ha" },
  { parameter: "P", current: 92, benchmark: 100, unit: "kg/ha", actualAvg: "21.4 kg/ha" },
  { parameter: "K", current: 98, benchmark: 100, unit: "kg/ha", actualAvg: "245 kg/ha" },
  { parameter: "OC", current: 88, benchmark: 100, unit: "%", actualAvg: "0.92%" },
  { parameter: "Ca", current: 105, benchmark: 100, unit: "ppm", actualAvg: "1,620 ppm" },
  { parameter: "Mg", current: 94, benchmark: 100, unit: "ppm", actualAvg: "365 ppm" },
  { parameter: "S", current: 80, benchmark: 100, unit: "ppm", actualAvg: "15.2 ppm" },
  { parameter: "Zn", current: 78, benchmark: 100, unit: "ppm", actualAvg: "1.3 ppm" },
];

export const SoilHealthRadarChart: React.FC<SoilHealthRadarChartProps> = ({
  data = defaultNutrientData,
}) => {
  const chartData = (data && data.length > 0 ? data : defaultNutrientData).map((item) => {
    // Abbreviate parameter names if long so they don't overlap in 3-in-a-row
    let shortName = item.parameter;
    if (shortName.includes("Nitrogen")) shortName = "Nitrogen (N)";
    else if (shortName.includes("Phosphorus")) shortName = "Phosphorus (P)";
    else if (shortName.includes("Potassium")) shortName = "Potassium (K)";
    else if (shortName.includes("Organic Carbon")) shortName = "Org Carbon (OC)";
    else if (shortName.includes("Calcium")) shortName = "Calcium (Ca)";
    else if (shortName.includes("Magnesium")) shortName = "Magnesium (Mg)";
    else if (shortName.includes("Sulfur")) shortName = "Sulfur (S)";
    else if (shortName.includes("Zinc")) shortName = "Zinc (Zn)";
    return { ...item, parameter: shortName };
  });

  const avgHealthIndex = Math.round(
    chartData.reduce((sum, item) => sum + Math.min(item.current, 100), 0) / chartData.length
  );

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
              <MdScience size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Nutrient Balance Radar
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Macro & micronutrient health profile
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-purple-900/40 rounded-lg px-2 py-0.5 text-right shrink-0">
            <span className="text-[9px] text-slate-400 block">Health Index</span>
            <span className="text-xs font-extrabold text-purple-400">{avgHealthIndex}%</span>
          </div>
        </div>

        {/* Radar chart */}
        <div className="h-[210px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 10, right: 15, bottom: 10, left: 15 }}>
              <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
              <PolarAngleAxis
                dataKey="parameter"
                tick={{ fill: "#94a3b8", fontSize: 8.5, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 120]}
                tick={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as NutrientScore;
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[130px]">
                        <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">
                          {item.parameter}
                        </div>
                        <div className="flex justify-between text-purple-300">
                          <span>Score:</span>
                          <span className="font-semibold">{item.current}%</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Average:</span>
                          <span className="font-semibold text-white">{item.actualAvg}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Radar
                name="Target"
                dataKey="benchmark"
                stroke="#64748b"
                fill="#64748b"
                fillOpacity={0.1}
                strokeDasharray="3 3"
              />
              <Radar
                name="Actual"
                dataKey="current"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.4}
                strokeWidth={1.8}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" /> High: OC & Potassium
        </span>
        <span className="text-slate-500">Target = 100%</span>
      </div>
    </div>
  );
};
