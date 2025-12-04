"use client";

import React from "react";

export type StatCardProps = {
  label: string;
  value: string | number;
  delta?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  icon,
  iconBgColor = "bg-blue-100",
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            {delta ? (
              <div className="text-xs font-medium text-green-600">{delta}</div>
            ) : null}
          </div>
        </div>
        {icon && (
          <div
            className={`${iconBgColor} rounded-lg p-3 flex items-center justify-center`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
