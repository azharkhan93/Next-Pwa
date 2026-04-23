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
    <div className="relative group overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Decorative gradient blur */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-3">
          <div className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors tracking-wide">{label}</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-white tracking-tight leading-none">{value}</div>
            {delta && (
              <div className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-0.5">
                {delta}
              </div>
            )}
          </div>
        </div>
        
        {icon && (
          <div className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${iconBgColor} group-hover:scale-110 group-hover:rotate-3`}>
            {/* Subtle glow behind icon */}
            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              {cloneElement(icon as React.ReactElement<any>, { 
                size: 24,
                className: "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
