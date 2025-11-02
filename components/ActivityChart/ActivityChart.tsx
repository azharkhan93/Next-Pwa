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
} from "recharts";

export type ActivityChartProps = {
  data?: Array<{ date: string; value1: number; value2: number }>;
};

const defaultData = [
  { date: "1 JUL", value1: 120, value2: 80 },
  { date: "2 JUL", value1: 150, value2: 100 },
  { date: "3 JUL", value1: 180, value2: 120 },
  { date: "4 JUL", value1: 140, value2: 90 },
  { date: "5 JUL", value1: 160, value2: 110 },
  { date: "6 JUL", value1: 200, value2: 140 },
  { date: "7 JUL", value1: 170, value2: 130 },
];

export const ActivityChart: React.FC<ActivityChartProps> = ({
  data = defaultData,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Activity
      </h3>
      <div className="w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            className="text-xs"
            tick={{ fill: "#9ca3af" }}
          />
          <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="value1" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="value2" fill="#eab308" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

