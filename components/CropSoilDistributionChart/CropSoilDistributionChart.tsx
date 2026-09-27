"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MdPark, MdTerrain, MdPieChart } from "react-icons/md";

export type CategoryDistribution = {
  name: string;
  value: number;
  color: string;
  area?: number;
};

export type CropSoilDistributionChartProps = {
  cropData?: CategoryDistribution[];
  soilData?: CategoryDistribution[];
};

const defaultCropData: CategoryDistribution[] = [
  { name: "Apple", value: 4, color: "#ef4444", area: 17.5 },
  { name: "Saffron", value: 1, color: "#f59e0b", area: 5.5 },
  { name: "Walnut", value: 1, color: "#8b5cf6", area: 8.5 },
  { name: "Cherry", value: 1, color: "#ec4899", area: 3.8 },
  { name: "Almond", value: 1, color: "#10b981", area: 4.5 },
  { name: "Vegetables", value: 1, color: "#06b6d4", area: 2.2 },
];

const defaultSoilData: CategoryDistribution[] = [
  { name: "Clay Loam", value: 4, color: "#3b82f6", area: 19.5 },
  { name: "Sandy Loam", value: 1, color: "#f97316", area: 4.2 },
  { name: "Silt Loam", value: 1, color: "#10b981", area: 8.5 },
  { name: "Loamy Sand", value: 1, color: "#eab308", area: 3.8 },
  { name: "Silty Clay", value: 1, color: "#8b5cf6", area: 2.2 },
];

export const CropSoilDistributionChart: React.FC<CropSoilDistributionChartProps> = ({
  cropData = defaultCropData,
  soilData = defaultSoilData,
}) => {
  const [tab, setTab] = useState<"crop" | "soil">("crop");

  const currentData = tab === "crop" ? (cropData.length > 0 ? cropData : defaultCropData) : (soilData.length > 0 ? soilData : defaultSoilData);
  const totalCount = currentData.reduce((sum, item) => sum + item.value, 0);
  const totalArea = currentData.reduce((sum, item) => sum + (item.area || 0), 0);

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MdPieChart size={20} />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {tab === "crop" ? "Crop Variety Distribution" : "Soil Classification Share"}
            </h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {tab === "crop" ? "Distribution of tested horticultural crops & orchards" : "Texture and soil taxonomy classification breakdown"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 self-start sm:self-auto">
          <button
            onClick={() => setTab("crop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tab === "crop"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MdPark size={14} />
            Crops
          </button>
          <button
            onClick={() => setTab("soil")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tab === "soil"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MdTerrain size={14} />
            Soil Types
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut Chart with Center Label */}
        <div className="md:col-span-6 relative flex items-center justify-center min-h-[260px]">
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as CategoryDistribution;
                      const percent = Math.round((item.value / (totalCount || 1)) * 100);
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-2xl text-xs space-y-1 min-w-[150px]">
                          <div className="flex items-center gap-1.5 font-bold text-white text-sm pb-1 border-b border-slate-800">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            {item.name}
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Samples:</span>
                            <span className="font-semibold text-white">{item.value} ({percent}%)</span>
                          </div>
                          {item.area !== undefined && item.area > 0 && (
                            <div className="flex justify-between text-slate-400">
                              <span>Acreage:</span>
                              <span className="font-semibold text-emerald-400">{item.area} Acres</span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                  animationDuration={1200}
                >
                  {currentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="rgba(15, 23, 42, 0.8)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Central Summary Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-400 font-medium">Total</span>
            <span className="text-2xl font-black text-white">{totalCount}</span>
            <span className="text-[11px] text-slate-400">
              {totalArea > 0 ? `${totalArea.toFixed(1)} Acres` : "Entries"}
            </span>
          </div>
        </div>

        {/* Detailed Legend list */}
        <div className="md:col-span-6 space-y-2.5">
          {currentData.map((item, idx) => {
            const percent = totalCount > 0 ? Math.round((item.value / totalCount) * 100) : 0;
            return (
              <div
                key={idx}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 hover:bg-slate-950/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-md shadow-sm transition-transform group-hover:scale-125"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </span>
                    {item.area !== undefined && item.area > 0 && (
                      <span className="text-[11px] text-slate-500 ml-2">
                        ({item.area} ac)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    {item.value} {item.value === 1 ? "sample" : "samples"}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 min-w-[42px] text-center">
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
