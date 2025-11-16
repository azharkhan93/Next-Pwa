"use client";

import React from "react";
import {
  getNitrogenRecommendation,
  getPhosphorusRecommendation,
  getPotassiumRecommendation,
} from "@/utils/soilRating";
import type { FormData } from "../FarmerDetailsForm";

type SoilRecommendationsProps = {
  formData: FormData;
};

export function SoilRecommendations({ formData }: SoilRecommendationsProps) {
  const recommendations = React.useMemo(() => {
    const results: Array<{
      name: string;
      fertilizer: string;
      value: number;
      recommendation: {
        level: string;
        increasePercent: number | null;
        suggestion: string;
      };
    }> = [];

    // Nitrogen recommendation
    if (formData.nitrogen && !isNaN(Number(formData.nitrogen))) {
      const nitrogenValue = Number(formData.nitrogen);
      const nitrogenRec = getNitrogenRecommendation(nitrogenValue);
      results.push({
        name: "Nitrogen",
        fertilizer: "Urea",
        value: nitrogenValue,
        recommendation: nitrogenRec,
      });
    }

    // Phosphorus recommendation
    if (formData.phosphorus && !isNaN(Number(formData.phosphorus))) {
      const phosphorusValue = Number(formData.phosphorus);
      const phosphorusRec = getPhosphorusRecommendation(phosphorusValue);
      results.push({
        name: "Phosphorus",
        fertilizer: "DAP",
        value: phosphorusValue,
        recommendation: phosphorusRec,
      });
    }

    // Potassium recommendation
    if (formData.potassium && !isNaN(Number(formData.potassium))) {
      const potassiumValue = Number(formData.potassium);
      const potassiumRec = getPotassiumRecommendation(potassiumValue);
      results.push({
        name: "Potassium",
        fertilizer: "MOP",
        value: potassiumValue,
        recommendation: potassiumRec,
      });
    }

    return results;
  }, [formData.nitrogen, formData.phosphorus, formData.potassium]);

  if (recommendations.length === 0) {
    return null;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "High":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Very High":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Fertilizer Recommendations
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={rec.name}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-start gap-4">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">
                      {rec.name} ({rec.fertilizer})
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Soil Test Result: <span className="font-medium">{rec.value} Kg ha⁻¹</span>
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getLevelColor(
                      rec.recommendation.level
                    )}`}
                  >
                    {rec.recommendation.level}
                  </span>
                </div>

                {/* Recommendation Details */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-md p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                      →
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                        Recommendation:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {rec.recommendation.increasePercent !== null
                          ? `Apply ${rec.recommendation.increasePercent}% more than the Recommended Dose (RD)`
                          : "Do not increase beyond the Recommended Dose (RD)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                      →
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                        Suggestion:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {rec.recommendation.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

