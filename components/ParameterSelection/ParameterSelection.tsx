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
    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">

      <h3 className="text-base font-semibold text-gray-900 mb-1">
        Choose Parameters
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Select the parameters you want to test. Price: ₹50 per parameter
      </p>

      {/* GRID — No horizontal scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {PARAMETER_LIST.map((param) => (
          <div
            key={param.key}
            className="bg-white rounded-lg p-3 border border-gray-200 
                       hover:border-blue-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <Checkbox
                name={param.key}
                label={param.label}
                checked={params[param.key]}
                onChange={() => toggleParam(param.key)}
              />

              <div className="text-xs font-medium text-gray-600">
                ₹50
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCount > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Selected Parameters: {selectedCount}
            </span>

            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">
                {selectedCount} × ₹50
              </div>
              <div className="text-lg font-bold text-gray-900">
                Grand Total: {formatPrice(totalPrice)}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
