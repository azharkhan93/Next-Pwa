"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { MdTrendingUp } from "react-icons/md";

export type WeeklyReportChartProps = {
  totalSave?: number;
  electroSave?: number;
  gasSave?: number;
  effectivityRate?: number;
};

const throughputData = [
  { name: "Mon", value: 8 },
  { name: "Tue", value: 12 },
  { name: "Wed", value: 14 },
  { name: "Thu", value: 16 },
  { name: "Fri", value: 18 },
  { name: "Sat", value: 20 },
  { name: "Sun", value: 22 },
];

export const WeeklyReportChart: React.FC<WeeklyReportChartProps> = ({
  totalSave = 24,
  electroSave = 18,
  gasSave = 6,
  effectivityRate = 92,
}) => {
  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 shadow-2xl hover:border-slate-700/60 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Weekly Lab Metrics</h3>
        <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold flex items-center gap-1">
          <MdTrendingUp size={14} /> Active
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <div>
            <p className="text-xs text-slate-400">Total Samples Tested</p>
            <p className="text-lg font-bold text-white mt-0.5">{totalSave} samples</p>
          </div>
          <div className="w-24 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="miniArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#miniArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="text-slate-400">Reports Issued</span>
            <p className="text-base font-bold text-emerald-400 mt-1">{electroSave}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="text-slate-400">Under Ingestion</span>
            <p className="text-base font-bold text-amber-400 mt-1">{gasSave}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/60">
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="text-slate-400">Lab Efficiency SLA</span>
            <span className="font-bold text-blue-400">{effectivityRate}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${effectivityRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
