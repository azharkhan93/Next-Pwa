import React from "react";
import type { TestResult } from "../types";


type MicronutrientsProps = {
  test: TestResult;
};

const micronutrientFields = [
  { key: "iron", label: "Fe" },
  { key: "manganese", label: "Mn" },
  { key: "zinc", label: "Zn" },
  { key: "copper", label: "Cu" },
  { key: "boron", label: "B" },
  { key: "molybdenum", label: "Mo" },
  { key: "chlorine", label: "Cl" },
  { key: "nickel", label: "Ni" },
] as const;

export const Micronutrients: React.FC<MicronutrientsProps> = ({ test }) => {
  const hasMicronutrients = micronutrientFields.some(
    (field) => test[field.key as keyof TestResult]
  );

  if (!hasMicronutrients) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm font-semibold mb-2 text-gray-700 uppercase tracking-wide">
        Micronutrients
      </h5>
      <div className="grid grid-cols-4 gap-2">
        {micronutrientFields.map((field) => {
          const value = test[field.key as keyof TestResult] as string | undefined;
          if (!value) return null;

          return (
            <div
              key={field.key}
              className="bg-white p-2 rounded border border-gray-200 text-center"
            >
              <div className="text-xs text-gray-500 mb-1">{field.label}</div>
              <div className="font-semibold text-gray-900 text-sm">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

