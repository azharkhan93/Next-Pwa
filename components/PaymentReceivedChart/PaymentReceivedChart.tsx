"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MdTrendingUp, MdAccountBalanceWallet, MdHourglassBottom, MdCheckCircle } from "react-icons/md";

export type MonthlyFinancialData = {
  month: string;
  billed: number;
  paid: number;
  pending: number;
  sampleCount?: number;
};

export type PaymentReceivedChartProps = {
  data?: MonthlyFinancialData[];
  totalRevenue?: number;
  totalPaid?: number;
  totalPending?: number;
};

const defaultData: MonthlyFinancialData[] = [
  { month: "Apr", billed: 2200, paid: 2200, pending: 0, sampleCount: 4 },
  { month: "May", billed: 1800, paid: 1800, pending: 0, sampleCount: 3 },
  { month: "Jun", billed: 3200, paid: 3200, pending: 0, sampleCount: 5 },
  { month: "Jul", billed: 2900, paid: 2900, pending: 0, sampleCount: 4 },
  { month: "Aug", billed: 4100, paid: 4100, pending: 0, sampleCount: 6 },
  { month: "Sep", billed: 5400, paid: 4750, pending: 650, sampleCount: 8 },
];

const safeNum = (val: unknown, fallback = 0): number => {
  if (typeof val === "number" && !isNaN(val) && isFinite(val)) return val;
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && isFinite(parsed)) return parsed;
  }
  return fallback;
};

export const PaymentReceivedChart: React.FC<PaymentReceivedChartProps> = ({
  data,
  totalRevenue,
  totalPaid,
  totalPending,
}) => {
  const [chartMode, setChartMode] = useState<"composed" | "area">("composed");

  const rawData = data && data.length > 0 ? data : defaultData;
  const chartData = rawData.map((d) => ({
    month: d.month ? d.month.split(" ")[0] : "Mon",
    billed: safeNum(d.billed),
    paid: safeNum(d.paid),
    pending: safeNum(d.pending),
    sampleCount: safeNum(d.sampleCount),
  }));

  const dataBilledSum = chartData.reduce((acc, curr) => acc + curr.billed, 0);
  const dataPaidSum = chartData.reduce((acc, curr) => acc + curr.paid, 0);
  const dataPendingSum = chartData.reduce((acc, curr) => acc + curr.pending, 0);

  const computedTotalBilled =
    typeof totalRevenue === "number" && !isNaN(totalRevenue) && totalRevenue > 0
      ? totalRevenue
      : dataBilledSum;

  const computedTotalPaid =
    typeof totalPaid === "number" && !isNaN(totalPaid) && totalPaid >= 0
      ? totalPaid
      : dataPaidSum;

  const computedTotalPending =
    typeof totalPending === "number" && !isNaN(totalPending) && totalPending >= 0
      ? totalPending
      : dataPendingSum;

  const collectionRate =
    computedTotalBilled > 0
      ? Math.min(Math.round((computedTotalPaid / computedTotalBilled) * 100), 100)
      : 100;

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Header with Title & Controls */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <MdAccountBalanceWallet size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Revenue & Invoicing
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Billed & realized collections
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800/80 shrink-0">
            <button
              onClick={() => setChartMode("composed")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                chartMode === "composed"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Bars
            </button>
            <button
              onClick={() => setChartMode("area")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                chartMode === "area"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Area
            </button>
          </div>
        </div>

        {/* 4 Mini KPI Summary Badges (2x2 Grid for 3-in-a-row safety) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
          <div className="bg-slate-950/50 border border-slate-800/60 rounded-lg p-1.5">
            <div className="text-[9px] text-slate-400 font-medium">Billed</div>
            <div className="text-xs font-bold text-white mt-0.5 truncate">
              ₹{computedTotalBilled.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-950/50 border border-emerald-900/30 rounded-lg p-1.5">
            <div className="text-[9px] text-emerald-400 font-medium flex items-center gap-0.5">
              <MdCheckCircle size={10} /> Paid
            </div>
            <div className="text-xs font-bold text-emerald-300 mt-0.5 truncate">
              ₹{computedTotalPaid.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-950/50 border border-amber-900/30 rounded-lg p-1.5">
            <div className="text-[9px] text-amber-400 font-medium flex items-center gap-0.5">
              <MdHourglassBottom size={10} /> Due
            </div>
            <div className="text-xs font-bold text-amber-300 mt-0.5 truncate">
              ₹{computedTotalPending.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-950/50 border border-blue-900/30 rounded-lg p-1.5">
            <div className="text-[9px] text-blue-400 font-medium flex items-center gap-0.5">
              <MdTrendingUp size={10} /> Rate
            </div>
            <div className="text-xs font-bold text-blue-300 mt-0.5 truncate">{collectionRate}%</div>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-[190px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === "composed" ? (
              <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="paidBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="pendingBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="billedLineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.0} />
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
                  tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload as MonthlyFinancialData;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-1 min-w-[140px]">
                          <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">{label}</div>
                          <div className="flex justify-between text-slate-300">
                            <span>Billed:</span>
                            <span className="font-semibold text-white">₹{d.billed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-emerald-400">
                            <span>Paid:</span>
                            <span className="font-semibold">₹{d.paid.toLocaleString()}</span>
                          </div>
                          {d.pending > 0 && (
                            <div className="flex justify-between text-amber-400">
                              <span>Due:</span>
                              <span className="font-semibold">₹{d.pending.toLocaleString()}</span>
                            </div>
                          )}
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
                  dataKey="billed"
                  name="Billed"
                  fill="url(#billedLineGradient)"
                  stroke="#3b82f6"
                  strokeWidth={1.8}
                />
                <Bar
                  dataKey="paid"
                  name="Paid"
                  fill="url(#paidBarGradient)"
                  radius={[3, 3, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="pending"
                  name="Due"
                  fill="url(#pendingBarGradient)"
                  radius={[3, 3, 0, 0]}
                  barSize={12}
                />
              </ComposedChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaBilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="areaPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
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
                  tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload as MonthlyFinancialData;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[130px]">
                          <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">{label}</div>
                          <div className="flex justify-between text-blue-400">
                            <span>Billed:</span>
                            <span className="font-semibold text-white">₹{d.billed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-emerald-400">
                            <span>Paid:</span>
                            <span className="font-semibold">₹{d.paid.toLocaleString()}</span>
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
                  dataKey="billed"
                  name="Billed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#areaBilled)"
                />
                <Area
                  type="monotone"
                  dataKey="paid"
                  name="Paid"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#areaPaid)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
