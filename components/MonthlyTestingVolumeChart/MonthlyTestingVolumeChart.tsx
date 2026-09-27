"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MdShowChart } from "react-icons/md";

export type VolumeMonthItem = {
  month: string;
  soil: number;
  plant: number;
  total: number;
};

export type MonthlyTestingVolumeChartProps = {
  data?: VolumeMonthItem[];
};

const defaultVolumeData: VolumeMonthItem[] = [
  { month: "Apr", soil: 8, plant: 4, total: 12 },
  { month: "May", soil: 11, plant: 4, total: 15 },
  { month: "Jun", soil: 16, plant: 6, total: 22 },
  { month: "Jul", soil: 13, plant: 5, total: 18 },
  { month: "Aug", soil: 18, plant: 7, total: 25 },
  { month: "Sep", soil: 22, plant: 8, total: 30 },
];

export const MonthlyTestingVolumeChart: React.FC<MonthlyTestingVolumeChartProps> = ({
  data = defaultVolumeData,
}) => {
  const chartData = data && data.length > 0 ? data : defaultVolumeData;
  const totalVolume = chartData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <MdShowChart size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Testing Volume Trajectory
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Monthly sample ingestion volume
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-900/50 px-2 py-0.5 rounded-lg shrink-0">
            {totalVolume} Samples
          </span>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="soilAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="plantAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
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
                    const item = payload[0].payload as VolumeMonthItem;
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[120px]">
                        <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">{label}</div>
                        <div className="flex justify-between text-blue-400">
                          <span>Soil:</span>
                          <span className="font-semibold">{item.soil}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span>Plant:</span>
                          <span className="font-semibold">{item.plant}</span>
                        </div>
                        <div className="flex justify-between text-indigo-300 pt-0.5 border-t border-slate-800">
                          <span>Total:</span>
                          <span className="font-semibold">{item.total}</span>
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
              <Area
                type="monotone"
                dataKey="soil"
                name="Soil"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#soilAreaGrad)"
              />
              <Area
                type="monotone"
                dataKey="plant"
                name="Plant"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#plantAreaGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
