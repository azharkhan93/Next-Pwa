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
  ReferenceLine,
} from "recharts";
import { MdFlashOn } from "react-icons/md";

export type EcSampleItem = {
  sample: string;
  ec: number;
  crop: string;
  status: string;
};

export type EcSalinityChartProps = {
  data?: EcSampleItem[];
};

const defaultEcData: EcSampleItem[] = [
  { sample: "S-1", ec: 0.32, crop: "Saffron", status: "Optimal" },
  { sample: "S-2", ec: 0.45, crop: "Apple", status: "Optimal" },
  { sample: "S-3", ec: 0.22, crop: "Apple", status: "Optimal" },
  { sample: "S-4", ec: 0.38, crop: "Walnut", status: "Optimal" },
  { sample: "S-5", ec: 0.28, crop: "Cherry", status: "Optimal" },
  { sample: "S-6", ec: 0.35, crop: "Almond", status: "Optimal" },
  { sample: "S-7", ec: 0.52, crop: "Greens", status: "Moderate" },
  { sample: "S-8", ec: 0.34, crop: "Apple", status: "Optimal" },
];

export const EcSalinityChart: React.FC<EcSalinityChartProps> = ({
  data = defaultEcData,
}) => {
  const chartData = (data && data.length > 0 ? data : defaultEcData).map((d, i) => ({
    ...d,
    sample: d.sample.includes(" ") ? `S-${i + 1}` : d.sample,
  }));

  const avgEc = (
    chartData.reduce((acc, curr) => acc + curr.ec, 0) / (chartData.length || 1)
  ).toFixed(2);

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <MdFlashOn size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Salinity Index (EC)
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Soluble salt levels (dS/m)
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-cyan-900/40 rounded-lg px-2 py-0.5 text-right shrink-0">
            <span className="text-[9px] text-slate-400 block">Avg EC</span>
            <span className="text-xs font-extrabold text-cyan-300">{avgEc} dS/m</span>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="ecAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="sample"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                dy={4}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                domain={[0, 1.0]}
                tickFormatter={(val) => `${val}`}
              />
              <ReferenceLine
                y={0.8}
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{ value: "Saline (0.8)", fill: "#ef4444", fontSize: 8, position: "top" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as EcSampleItem;
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[130px]">
                        <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">
                          {item.sample}
                        </div>
                        <div className="flex justify-between text-cyan-300">
                          <span>EC:</span>
                          <span className="font-semibold">{item.ec} dS/m</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Crop:</span>
                          <span className="font-semibold text-white">{item.crop}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span>Rating:</span>
                          <span className="font-semibold">{item.status}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="ec"
                name="EC (dS/m)"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#ecAreaGrad)"
                dot={{ fill: "#06b6d4", r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
