"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MdReceiptLong } from "react-icons/md";

export type TransactionsChartProps = {
  errors?: number;
  completed?: number;
  refunded?: number;
  pending?: number;
  serviceNeeded?: number;
};

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export const TransactionsChart: React.FC<TransactionsChartProps> = ({
  completed = 4250,
  refunded = 0,
  pending = 650,
  serviceNeeded = 87,
}) => {
  const data = [
    { name: "Paid", value: completed, color: "#10b981" },
    { name: "Pending", value: pending, color: "#f59e0b" },
    { name: "Due", value: refunded || 100, color: "#ef4444" },
  ];

  const totalSum = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <MdReceiptLong size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Invoice Settlement Split
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Paid vs outstanding balances
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded-lg shrink-0">
            {serviceNeeded}% Settled
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
                        const item = payload[0].payload as (typeof data)[0];
                        const pct = totalSum > 0 ? Math.round((item.value / totalSum) * 100) : 0;
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[120px]">
                            <div className="flex items-center gap-1 font-bold text-white text-[11px] pb-0.5 border-b border-slate-800">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              {item.name}
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Amount:</span>
                              <span className="font-semibold text-white">₹{item.value.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-indigo-400">
                              <span>Share:</span>
                              <span className="font-semibold">{pct}%</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={55}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(15, 23, 42, 0.8)" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-black text-emerald-400">{serviceNeeded}%</span>
              <span className="text-[8px] text-slate-400">Paid</span>
            </div>
          </div>

          <div className="sm:col-span-7 space-y-1 text-[10px]">
            <div className="flex items-center justify-between p-1 px-2 rounded-md bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-300 font-medium truncate">Settled</span>
              </div>
              <span className="font-bold text-white shrink-0">₹{completed.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-1 px-2 rounded-md bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-300 font-medium truncate">Pending</span>
              </div>
              <span className="font-bold text-amber-300 shrink-0">₹{pending.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-1 px-2 rounded-md bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-300 font-medium truncate">Uncollected</span>
              </div>
              <span className="font-bold text-rose-300 shrink-0">₹{(refunded || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

