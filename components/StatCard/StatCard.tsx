"use client";

import React, { cloneElement } from "react";

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
  iconBgColor = "bg-blue-500/10",
}) => {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-3.5 sm:p-4 transition-all duration-300 hover:bg-slate-900/80 hover:border-slate-700/80 hover:shadow-xl hover:shadow-black/40">
      {/* Decorative gradient blur */}
      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/5 blur-2xl rounded-full group-hover:bg-blue-500/10 transition-colors" />

      <div className="flex items-start justify-between relative z-10 gap-2">
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="text-xs font-semibold text-slate-400 group-hover:text-slate-300 transition-colors tracking-wide truncate">
            {label}
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none truncate">
            {value}
          </div>
          {delta && (
            <div className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 truncate max-w-full">
              {delta}
            </div>
          )}
        </div>

        {icon && (
          <div
            className={`relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg shrink-0 transition-all duration-300 ${iconBgColor} group-hover:scale-105`}
          >
            <div className="relative z-10">
              {cloneElement(icon as React.ReactElement<any>, {
                size: 18,
                className: "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]",
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

