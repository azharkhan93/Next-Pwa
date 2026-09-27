"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MdEco } from "react-icons/md";

export type NutrientRatingItem = {
  nutrient: string;
  low: number;
  medium: number;
  optimal: number;
  high: number;
};

export type NutrientRatingBarChartProps = {
  data?: NutrientRatingItem[];
};

const defaultRatingData: NutrientRatingItem[] = [
  { nutrient: "N", low: 1, medium: 3, optimal: 3, high: 1 },
  { nutrient: "P", low: 1, medium: 1, optimal: 4, high: 2 },
  { nutrient: "K", low: 0, medium: 2, optimal: 3, high: 3 },
  { nutrient: "OC", low: 2, medium: 2, optimal: 2, high: 2 },
];

export const NutrientRatingBarChart: React.FC<NutrientRatingBarChartProps> = ({
  data = defaultRatingData,
}) => {
  const chartData = (data && data.length > 0 ? data : defaultRatingData).map((item) => {
    let name = item.nutrient;
    if (name.includes("Nitrogen")) name = "N";
    else if (name.includes("Phosphorus")) name = "P";
    else if (name.includes("Potassium")) name = "K";
    else if (name.includes("Organic")) name = "OC";
    return { ...item, nutrient: name };
  });

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <MdEco size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Macro-Nutrient Fertility Tiers
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Deficient vs Optimal NPK distribution
              </p>
            </div>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="nutrient"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                dy={4}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[120px]">
                        <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">
                          Nutrient: {label}
                        </div>
                        {payload.map((entry, idx) => (
                          <div key={idx} className="flex justify-between items-center" style={{ color: entry.color }}>
                            <span>{entry.name}:</span>
                            <span className="font-semibold">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 6 }}
                iconType="circle"
                iconSize={6}
                formatter={(val) => <span className="text-[9px] text-slate-300 capitalize">{val}</span>}
              />
              <Bar dataKey="low" name="Low" fill="#ef4444" radius={[2, 2, 0, 0]} barSize={8} />
              <Bar dataKey="medium" name="Med" fill="#f59e0b" radius={[2, 2, 0, 0]} barSize={8} />
              <Bar dataKey="optimal" name="Opt" fill="#10b981" radius={[2, 2, 0, 0]} barSize={8} />
              <Bar dataKey="high" name="High" fill="#8b5cf6" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
