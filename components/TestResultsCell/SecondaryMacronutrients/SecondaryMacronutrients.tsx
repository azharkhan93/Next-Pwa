import React from "react";
import type { TestResult } from "../types";

type SecondaryMacronutrientsProps = {
  test: TestResult;
};

export const SecondaryMacronutrients: React.FC<SecondaryMacronutrientsProps> = ({ test }) => {
  if (!test.calcium && !test.magnesium && !test.sulfur) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
        Secondary Macronutrients
      </h5>
      <div className="grid grid-cols-3 gap-2">
        {test.calcium && (
          <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ca</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{test.calcium}</div>
          </div>
        )}
        {test.magnesium && (
          <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mg</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{test.magnesium}</div>
          </div>
        )}
        {test.sulfur && (
          <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">S</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{test.sulfur}</div>
          </div>
        )}
      </div>
    </div>
  );
};

