"use client";

import React from "react";
import { MdOutlineAccountBalance, MdCheckCircle, MdTrendingUp } from "react-icons/md";

export type FinanceSummaryChartProps = {
  annualTaxes?: number;
  nextReviewDate?: string;
  avgProductPrice?: number;
  satisfactionRate?: number;
};

export const FinanceSummaryChart: React.FC<FinanceSummaryChartProps> = ({
  annualTaxes = 125000,
  nextReviewDate = "October 15, 2026",
  avgProductPrice = 550,
  satisfactionRate = 96,
}) => {
  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 shadow-2xl hover:border-slate-700/60 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <MdOutlineAccountBalance size={18} />
        </span>
        <h3 className="text-lg font-bold text-white tracking-tight">Financial Summary</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400">Total Billed Revenue</p>
            <p className="text-lg font-bold text-white mt-0.5">₹{annualTaxes.toLocaleString()}</p>
          </div>
          <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-semibold">
            <MdTrendingUp size={14} /> +18.4%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <p className="text-xs text-slate-400">Next Audit Date</p>
            <p className="text-sm font-semibold text-slate-200 mt-1">{nextReviewDate}</p>
          </div>
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <p className="text-xs text-slate-400">Avg Test Fee</p>
            <p className="text-sm font-semibold text-emerald-300 mt-1">₹{avgProductPrice.toFixed(0)}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MdCheckCircle size={14} className="text-emerald-400" /> Lab Quality Rating
            </span>
            <span className="text-xs font-bold text-emerald-400">{satisfactionRate}%</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${satisfactionRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
