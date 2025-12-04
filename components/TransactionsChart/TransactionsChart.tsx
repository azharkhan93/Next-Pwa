"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export type TransactionsChartProps = {
  errors?: number;
  completed?: number;
  refunded?: number;
  pending?: number;
  serviceNeeded?: number;
};

const COLORS = ["#eab308", "#3b82f6", "#f97316"];

export const TransactionsChart: React.FC<TransactionsChartProps> = ({
  errors = 46,
  completed = 1247.49,
  refunded = 447.49,
  pending = 247.49,
  serviceNeeded = 25.3,
}) => {
  const data = [
    { name: "Completed", value: completed },
    { name: "Refunded", value: refunded },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Transactions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div>
              <p className="text-sm text-gray-500">Errors</p>
              <p className="text-lg font-semibold text-gray-900">
                {errors}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-lg font-semibold text-gray-900">
                ${completed.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <div>
              <p className="text-sm text-gray-500">Refunded</p>
              <p className="text-lg font-semibold text-gray-900">
                ${refunded.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-lg font-semibold text-gray-900">
                ${pending.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center min-w-[150px] min-h-[150px]">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-semibold fill-gray-900"
              >
                {serviceNeeded}%
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-gray-500"
              >
                Service needed
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

