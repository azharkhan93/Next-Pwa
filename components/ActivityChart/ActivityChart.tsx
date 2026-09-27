"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { MdBarChart } from "react-icons/md";

export type ActivityChartProps = {
  data?: Array<{ date: string; value1: number; value2: number }>;
};

const defaultData = [
  { date: "Mon", value1: 4, value2: 2 },
  { date: "Tue", value1: 6, value2: 3 },
  { date: "Wed", value1: 8, value2: 4 },
  { date: "Thu", value1: 5, value2: 3 },
  { date: "Fri", value1: 9, value2: 5 },
  { date: "Sat", value1: 7, value2: 4 },
  { date: "Sun", value1: 3, value2: 2 },
];

export const ActivityChart: React.FC<ActivityChartProps> = ({
  data = defaultData,
}) => {
  const chartData = data && data.length > 0 ? data : defaultData;
  const totalSoil = chartData.reduce((acc, curr) => acc + curr.value1, 0);
  const totalPlant = chartData.reduce((acc, curr) => acc + curr.value2, 0);
  const totalActivity = totalSoil + totalPlant;

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <MdBarChart size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Daily Intake Activity
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Weekly soil vs plant sample intake
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-blue-300 bg-blue-950/60 border border-blue-900/50 px-2 py-0.5 rounded-lg shrink-0">
            {totalActivity} Tests
          </span>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 9 }} dy={4} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 9 }} allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[120px]">
                        <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">Day: {label}</div>
                        <div className="flex justify-between text-blue-400">
                          <span>Soil:</span>
                          <span className="font-semibold text-white">{payload[0]?.value}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span>Plant:</span>
                          <span className="font-semibold text-white">{payload[1]?.value}</span>
                        </div>
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
              <Bar dataKey="value1" name="Soil" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={9} />
              <Bar dataKey="value2" name="Plant" fill="#10b981" radius={[3, 3, 0, 0]} barSize={9} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

