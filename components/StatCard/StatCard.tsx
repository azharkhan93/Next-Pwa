"use client";

import React from "react";

export type StatCardProps = {
  label: string;
  value: string | number;
  delta?: string;
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, delta }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-gray-900">
          {value}
        </div>
        {delta ? (
          <div className="text-xs text-green-600">
            {delta}
          </div>
        ) : null}
      </div>
    </div>
  );
};
