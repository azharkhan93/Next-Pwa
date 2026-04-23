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

export type PaymentReceivedChartProps = {
  data?: Array<{
    month: string;
    amount: number;
  }>;
};

const generateMonthlyData = () => {
  const months = [];
  const currentDate = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const monthName = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    months.push({
      month: monthName,
      amount: 0,
    });
  }

  return months;
};

export const PaymentReceivedChart: React.FC<PaymentReceivedChartProps> = ({
  data,
}) => {
  const chartData = data || generateMonthlyData();

  return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 shadow-xl overflow-hidden">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">
          Revenue Overview
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Monthly payment trends for the last 6 months
        </p>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "12px"
              }}
              itemStyle={{ color: "#f8fafc", fontSize: "12px" }}
              labelStyle={{ color: "#94a3b8", fontSize: "11px", marginBottom: "4px" }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
            />
            <Bar
              dataKey="amount"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              barSize={40}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
