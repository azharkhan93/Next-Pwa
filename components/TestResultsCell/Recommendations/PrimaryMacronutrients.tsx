import React from "react";
import type { TestResult } from "../types";

type RecommendationsProps = {
  test: TestResult;
};

export const Recommendations: React.FC<RecommendationsProps> = ({ test }) => {
  if (!test.nitrogenRecommendation && !test.phosphorusRecommendation && !test.potassiumRecommendation) {
    return null;
  }

  return (
    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h5 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
        Recommendations
      </h5>
      <div className="space-y-2">
        {test.nitrogenRecommendation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-r">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-blue-700 dark:text-blue-300 min-w-[80px]">
                Nitrogen:
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {test.nitrogenRecommendation.suggestion}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                {test.nitrogenRecommendation.level} ({test.nitrogenRecommendation.increasePercent}% increase)
              </span>
            </div>
          </div>
        )}
        {test.phosphorusRecommendation && (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3 rounded-r">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-green-700 dark:text-green-300 min-w-[80px]">
                Phosphorus:
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {test.phosphorusRecommendation.suggestion}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
                {test.phosphorusRecommendation.level} ({test.phosphorusRecommendation.increasePercent}% increase)
              </span>
            </div>
          </div>
        )}
        {test.potassiumRecommendation && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded-r">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-yellow-700 dark:text-yellow-300 min-w-[80px]">
                Potassium:
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {test.potassiumRecommendation.suggestion}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-medium">
                {test.potassiumRecommendation.level} ({test.potassiumRecommendation.increasePercent}% increase)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

