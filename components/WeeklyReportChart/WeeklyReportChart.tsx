"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export type WeeklyReportChartProps = {
  totalSave?: number;
  electroSave?: number;
  gasSave?: number;
  effectivityRate?: number;
};

const totalSaveData = [
  { name: "Mon", value: 180 },
  { name: "Tue", value: 200 },
  { name: "Wed", value: 220 },
  { name: "Thu", value: 240 },
  { name: "Fri", value: 230 },
  { name: "Sat", value: 245 },
  { name: "Sun", value: 249 },
];

const electroSaveData = [
  { name: "Mon", value: 60 },
  { name: "Tue", value: 70 },
  { name: "Wed", value: 75 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 82 },
  { name: "Sat", value: 83 },
  { name: "Sun", value: 84 },
];

const gasSaveData = [
  { name: "Mon", value: 35 },
  { name: "Tue", value: 38 },
  { name: "Wed", value: 40 },
  { name: "Thu", value: 42 },
  { name: "Fri", value: 44 },
  { name: "Sat", value: 45 },
  { name: "Sun", value: 45 },
];

export const WeeklyReportChart: React.FC<WeeklyReportChartProps> = ({
  totalSave = 249.42,
  electroSave = 84.24,
  gasSave = 45,
  effectivityRate = 63,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Weekly Report
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Save</p>
            <p className="text-xl font-semibold text-gray-900">
              ${totalSave.toFixed(2)}
            </p>
          </div>
          <div className="w-24 h-12 min-w-[96px] min-h-[48px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={totalSaveData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Electro Save</p>
            <p className="text-xl font-semibold text-gray-900">
              ${electroSave.toFixed(2)}
            </p>
          </div>
          <div className="w-24 h-12 min-w-[96px] min-h-[48px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={electroSaveData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Gas Save</p>
            <p className="text-xl font-semibold text-gray-900">
              ${gasSave.toFixed(2)}
            </p>
          </div>
          <div className="w-24 h-12 min-w-[96px] min-h-[48px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gasSaveData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Effectivity Rate
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {effectivityRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${effectivityRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
