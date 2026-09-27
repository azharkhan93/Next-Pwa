"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MdLocationOn } from "react-icons/md";

export type DistrictData = {
  district: string;
  samples: number;
  trees: number;
  area: number;
};

export type RegionalDistributionChartProps = {
  data?: DistrictData[];
};

const defaultDistrictData: DistrictData[] = [
  { district: "Shopian", samples: 1, trees: 650, area: 4.2 },
  { district: "Kulgam", samples: 1, trees: 520, area: 3.5 },
  { district: "Baramulla", samples: 1, trees: 420, area: 6.0 },
  { district: "Anantnag", samples: 1, trees: 340, area: 3.8 },
  { district: "Budgam", samples: 1, trees: 260, area: 4.5 },
  { district: "Bandipora", samples: 1, trees: 180, area: 8.5 },
];

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

export const RegionalDistributionChart: React.FC<RegionalDistributionChartProps> = ({
  data = defaultDistrictData,
}) => {
  const chartData = (data && data.length > 0 ? data : defaultDistrictData).slice(0, 6);
  const totalTrees = chartData.reduce((acc, curr) => acc + curr.trees, 0);

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <MdLocationOn size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Regional Tree Density
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Trees cataloged by district
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded-lg shrink-0">
            {totalTrees.toLocaleString()} Trees
          </span>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 15, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
              />
              <YAxis
                type="category"
                dataKey="district"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9.5, fill: "#e2e8f0", fontWeight: 500 }}
                width={62}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as DistrictData;
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[120px]">
                        <div className="font-bold text-white text-[11px] pb-0.5 border-b border-slate-800">
                          📍 {d.district}
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span>Trees:</span>
                          <span className="font-semibold">{d.trees.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-blue-300">
                          <span>Samples:</span>
                          <span className="font-semibold">{d.samples}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Area:</span>
                          <span className="font-semibold text-white">{d.area} ac</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="trees" radius={[0, 3, 3, 0]} barSize={10}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
