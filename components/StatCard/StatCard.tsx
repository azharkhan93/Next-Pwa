"use client";

import React from "react";

export type StatCardProps = {
  label: string;
  value: string | number;
  delta?: string;
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, delta }) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {value}
        </div>
        {delta ? (
          <div className="text-xs text-green-600 dark:text-green-400">
            {delta}
          </div>
        ) : null}
      </div>
    </div>
  );
};
