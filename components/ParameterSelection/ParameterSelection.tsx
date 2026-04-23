"use client";

import React from "react";
import { Checkbox } from "@/components";
import { formatPrice } from "@/utils/parameterPricing";

const PARAMETER_LIST = [
  { key: "soilPh", label: "Soil pH" },
  { key: "bufferPh", label: "Buffer pH" },
  { key: "oc", label: "Organic Carbon (OC)" },
  { key: "nitrogen", label: "Av. Nitrogen (N)" },
  { key: "phosphorus", label: "Av. Phosphorus (P)" },
  { key: "potassium", label: "Av. Potassium (K)" },
  { key: "calcium", label: "Calcium (Ca)" },
  { key: "magnesium", label: "Magnesium (Mg)" },
  { key: "iron", label: "Iron (Fe)" },
  { key: "manganese", label: "Manganese (Mn)" },
  { key: "zinc", label: "Zinc (Zn)" },
  { key: "boron", label: "Boron (B)" },
];

type ParameterState = {
  [key: string]: boolean;
};

export function ParameterSelection() {
  const [params, setParams] = React.useState<ParameterState>(() => {
    const defaultState: ParameterState = {};
    PARAMETER_LIST.forEach((p) => (defaultState[p.key] = false));
    return defaultState;
  });

  const toggleParam = (key: string) => {
    setParams((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedCount = Object.values(params).filter(Boolean).length;
  const totalPrice = selectedCount * 50;

  return (
    <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5 space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Test Parameters
        </h3>
        <p className="text-sm text-slate-400">
          Select the parameters for testing. Price is ₹50 per parameter.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PARAMETER_LIST.map((param) => (
          <div
            key={param.key}
            className={`group rounded-xl p-4 border transition-all duration-300 ${
              params[param.key]
                ? "bg-blue-600/10 border-blue-500/30 ring-1 ring-blue-500/20"
                : "bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.05]"
            }`}
            onClick={() => toggleParam(param.key)}
          >
            <div className="flex items-center justify-between gap-3 cursor-pointer">
              <Checkbox
                name={param.key}
                label={param.label}
                checked={params[param.key]}
                onChange={() => {}} // Toggle handled by parent div
                className="pointer-events-none"
              />
              <div className={`text-xs font-bold transition-colors ${params[param.key] ? "text-blue-400" : "text-slate-500"}`}>
                ₹50
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCount > 0 && (
        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-sm font-semibold text-blue-400">
                Selected: {selectedCount} Parameters
              </span>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                {selectedCount} × ₹50
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">
                Total: <span className="text-blue-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
