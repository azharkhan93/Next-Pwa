"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MdSpeed } from "react-icons/md";

export type PipelineMonthData = {
  period: string;
  received: number;
  inProcess: number;
  completed: number;
  turnaroundScore: number;
};

export type SamplePipelineVelocityChartProps = {
  data?: PipelineMonthData[];
};

const defaultPipelineData: PipelineMonthData[] = [
  { period: "Apr", received: 12, inProcess: 2, completed: 10, turnaroundScore: 83 },
  { period: "May", received: 15, inProcess: 3, completed: 12, turnaroundScore: 80 },
  { period: "Jun", received: 22, inProcess: 4, completed: 18, turnaroundScore: 82 },
  { period: "Jul", received: 18, inProcess: 2, completed: 16, turnaroundScore: 89 },
  { period: "Aug", received: 25, inProcess: 3, completed: 22, turnaroundScore: 88 },
  { period: "Sep", received: 30, inProcess: 4, completed: 26, turnaroundScore: 87 },
];

export const SamplePipelineVelocityChart: React.FC<SamplePipelineVelocityChartProps> = ({
  data = defaultPipelineData,
}) => {
  const chartData = data && data.length > 0 ? data : defaultPipelineData;
  const totalReceived = chartData.reduce((acc, curr) => acc + curr.received, 0);
  const totalCompleted = chartData.reduce((acc, curr) => acc + curr.completed, 0);
  const overallEfficiency = totalReceived > 0 ? Math.round((totalCompleted / totalReceived) * 100) : 100;

  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-4 shadow-xl shadow-black/40 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <MdSpeed size={15} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight truncate">
                Pipeline & Throughput
              </h3>
              <p className="text-[10px] text-slate-400 truncate">
                Monthly intake vs certified reports
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded-lg shrink-0">
            {overallEfficiency}% Ready
          </span>
        </div>

        {/* Chart Canvas */}
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="intakeBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="completeBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                dy={4}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                allowDecimals={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fill: "#c084fc" }}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as PipelineMonthData;
                    return (
                      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-2xl text-[11px] space-y-0.5 min-w-[130px]">
                        <div className="font-bold text-white text-[11px] border-b border-slate-800 pb-0.5">{label}</div>
                        <div className="flex justify-between text-sky-400">
                          <span>Intake:</span>
                          <span className="font-semibold text-white">{d.received}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span>Certified:</span>
                          <span className="font-semibold text-white">{d.completed}</span>
                        </div>
                        <div className="flex justify-between text-purple-300 pt-0.5 border-t border-slate-800">
                          <span>Rate:</span>
                          <span className="font-semibold">{d.turnaroundScore}%</span>
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
              <Bar
                yAxisId="left"
                dataKey="received"
                name="Intake"
                fill="url(#intakeBarGrad)"
                radius={[3, 3, 0, 0]}
                barSize={9}
              />
              <Bar
                yAxisId="left"
                dataKey="completed"
                name="Certified"
                fill="url(#completeBarGrad)"
                radius={[3, 3, 0, 0]}
                barSize={9}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="turnaroundScore"
                name="Rate %"
                stroke="#c084fc"
                strokeWidth={1.8}
                dot={{ fill: "#c084fc", r: 2.5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
