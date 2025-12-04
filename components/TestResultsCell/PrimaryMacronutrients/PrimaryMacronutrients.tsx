import React from "react";
import type { TestResult } from "../types";
import { getRatingColor } from "../utils";

type PrimaryMacronutrientsProps = {
  test: TestResult;
};

export const PrimaryMacronutrients: React.FC<PrimaryMacronutrientsProps> = ({ test }) => {
  return (
    <div>
      <h5 className="text-sm font-semibold mb-2 text-gray-700 uppercase tracking-wide">
        Primary Macronutrients
      </h5>
      <div className="space-y-2">
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 mb-1">Nitrogen (N)</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {test.nitrogen || "-"} kg/ha
                </span>
                {test.nitrogenRating && (
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${getRatingColor(test.nitrogenRating)}`}>
                    {test.nitrogenRating}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 mb-1">Phosphorus (P)</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {test.phosphorus || "-"} kg/ha
                </span>
                {test.phosphorusRating && (
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${getRatingColor(test.phosphorusRating)}`}>
                    {test.phosphorusRating}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 mb-1">Potassium (K)</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {test.potassium || "-"} kg/ha
                </span>
                {test.potassiumRating && (
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${getRatingColor(test.potassiumRating)}`}>
                    {test.potassiumRating}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

