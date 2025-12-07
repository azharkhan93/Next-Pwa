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
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Payment Received (Monthly)
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Total payments received over the last 6 months
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            formatter={(value: number) => [
              `₹${value.toLocaleString()}`,
              "Amount",
            ]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <Bar
            dataKey="amount"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            name="Payment Received"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
