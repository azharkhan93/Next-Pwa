"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MdTerrain } from "react-icons/md";
import type { CategoryDistribution } from "@/components/CropSoilDistributionChart";

export type SoilClassificationChartProps = {
  data?: CategoryDistribution[];
};

const defaultSoilData: CategoryDistribution[] = [
  { name: "Clay Loam", value: 4, color: "#3b82f6", area: 19.5 },
  { name: "Sandy Loam", value: 1, color: "#f97316", area: 4.2 },
  { name: "Silt Loam", value: 1, color: "#10b981", area: 8.5 },
  { name: "Loamy Sand", value: 1, color: "#eab308", area: 3.8 },
  { name: "Silty Clay", value: 1, color: "#8b5cf6", area: 2.2 },
];

export const SoilClassificationChart: React.FC<SoilClassificationChartProps> = ({
  data = defaultSoilData,
}) => {
  const chartData = data && data.length > 0 ? data : defaultSoilData;
  const totalCount = chartData.reduce((sum, item) => sum + item.value, 0);
  const totalArea = chartData.reduce((sum, item) => sum + (item.area || 0), 0);

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
              <MdTerrain size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Soil Texture Share
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Texture taxonomy breakdown
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-orange-300 bg-orange-950/60 border border-orange-900/50 px-2 py-0.5 rounded-lg shrink-0">
            {totalArea > 0 ? `${totalArea.toFixed(1)} ac` : `${chartData.length} types`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
          <div className="sm:col-span-5 relative flex items-center justify-center min-h-[170px]">
            <div className="w-full h-[170px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload as CategoryDistribution;
                        const percent = Math.round((item.value / (totalCount || 1)) * 100);
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[120px]">
                            <div className="flex items-center gap-1 font-bold text-white text-[11px] pb-0.5 border-b border-slate-800">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              {item.name}
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Samples:</span>
                              <span className="font-semibold text-white">{item.value} ({percent}%)</span>
                            </div>
                            {item.area !== undefined && item.area > 0 && (
                              <div className="flex justify-between text-orange-400">
                                <span>Area:</span>
                                <span className="font-semibold">{item.area} ac</span>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={55}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(15, 23, 42, 0.8)" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] text-slate-400">Area</span>
              <span className="text-sm font-black text-white">{totalArea.toFixed(1)}</span>
              <span className="text-[8px] text-slate-400">Acres</span>
            </div>
          </div>

          <div className="sm:col-span-7 space-y-1">
            {chartData.slice(0, 5).map((item, idx) => {
              const pct = totalCount > 0 ? Math.round((item.value / totalCount) * 100) : 0;
              return (
                <div key={idx} className="flex items-center justify-between p-1 px-2 rounded-md bg-slate-950/40 border border-slate-800/60 text-[10px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-slate-200 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-bold text-slate-300 bg-slate-900 px-1 py-0.2 rounded border border-slate-800 text-[9px]">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
