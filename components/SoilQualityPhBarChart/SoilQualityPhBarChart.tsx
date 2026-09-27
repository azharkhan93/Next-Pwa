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
import { MdWaterDrop } from "react-icons/md";

export type PhDistributionItem = {
  tier: string;
  range: string;
  count: number;
  color: string;
  recommendation: string;
};

export type SoilQualityPhBarChartProps = {
  data?: PhDistributionItem[];
  avgPh?: number;
};

const defaultPhData: PhDistributionItem[] = [
  {
    tier: "Strongly Acidic",
    range: "< 5.5",
    count: 0,
    color: "#f87171",
    recommendation: "Apply agricultural lime (CaCO3) to neutralize high soil acidity.",
  },
  {
    tier: "Slightly Acidic",
    range: "5.5 - 6.5",
    count: 3,
    color: "#fb923c",
    recommendation: "Ideal for Apples & Pears. Maintain organic mulch.",
  },
  {
    tier: "Optimal Neutral",
    range: "6.5 - 7.5",
    count: 4,
    color: "#34d399",
    recommendation: "Prime nutrient availability. Excellent for Saffron & Walnut.",
  },
  {
    tier: "Alkaline Soil",
    range: "> 7.5",
    count: 1,
    color: "#38bdf8",
    recommendation: "Apply gypsum or sulfur to facilitate micronutrient uptake.",
  },
];

export const SoilQualityPhBarChart: React.FC<SoilQualityPhBarChartProps> = ({
  data = defaultPhData,
  avgPh = 6.7,
}) => {
  const chartData = data && data.length > 0 ? data : defaultPhData;
  const totalSamples = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
              <MdWaterDrop size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Soil pH Reaction Spectrum
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Acidity & alkalinity tier breakdown
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-teal-900/40 rounded-lg px-2 py-0.5 text-right shrink-0">
            <span className="text-[9px] text-slate-400 block">Mean pH</span>
            <span className="text-xs font-extrabold text-teal-300">
              {typeof avgPh === "number" && !isNaN(avgPh) ? avgPh.toFixed(1) : "6.7"} pH
            </span>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="range"
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
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as PhDistributionItem;
                    const pct = totalSamples > 0 ? Math.round((item.count / totalSamples) * 100) : 0;
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-1 max-w-[200px]">
                        <div className="flex items-center justify-between font-bold text-white text-[11px] pb-0.5 border-b border-slate-800">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            {item.tier}
                          </span>
                          <span className="text-slate-400 text-[10px]">{item.range} pH</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Total:</span>
                          <span className="font-semibold text-white">{item.count} ({pct}%)</span>
                        </div>
                        <div className="text-[9px] text-teal-300 pt-0.5 border-t border-slate-800">
                          {item.recommendation}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={24}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer guide pills */}
      <div className="grid grid-cols-4 gap-1 mt-2 pt-2 border-t border-slate-800/60 text-center">
        {chartData.map((item, idx) => (
          <div key={idx} className="bg-slate-950/40 border border-slate-800/60 rounded p-1">
            <div className="text-[9px] font-bold" style={{ color: item.color }}>
              {item.range}
            </div>
            <div className="text-[8px] text-slate-400 truncate">{item.tier.split(" ")[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
