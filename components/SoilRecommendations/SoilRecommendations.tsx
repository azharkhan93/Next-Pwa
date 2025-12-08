"use client";

import React from "react";
import {
  getNitrogenRecommendation,
  getPhosphorusRecommendation,
  getPotassiumRecommendation,
} from "@/utils/soilRating";
import {
  calculateFinalDose,
  getBaseRecommendedDose,
} from "@/utils/baseRecommendedDose";
import { BaseRecommendedDoseDisplay } from "@/components/BaseRecommendedDoseDisplay";
import type { FormData } from "../FarmerDetailsForm";

type SoilRecommendationsProps = {
  formData: FormData;
};

export function SoilRecommendations({ formData }: SoilRecommendationsProps) {
  // Get base recommended dose based on plantation type and age
  const baseRD = React.useMemo(() => {
    return getBaseRecommendedDose(formData.plantationType, formData.age);
  }, [formData.plantationType, formData.age]);

  const recommendations = React.useMemo(() => {
    const results: Array<{
      name: string;
      fertilizer: string;
      value: number;
      baseRD: number | null;
      finalDose: number | null;
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
      const baseUrea = baseRD?.urea ?? null;
      const finalUrea =
        baseUrea !== null
          ? calculateFinalDose(baseUrea, nitrogenRec.increasePercent)
          : null;

      results.push({
        name: "Nitrogen",
        fertilizer: "Urea",
        value: nitrogenValue,
        baseRD: baseUrea,
        finalDose: finalUrea,
        recommendation: nitrogenRec,
      });
    }

    // Phosphorus recommendation
    if (formData.phosphorus && !isNaN(Number(formData.phosphorus))) {
      const phosphorusValue = Number(formData.phosphorus);
      const phosphorusRec = getPhosphorusRecommendation(phosphorusValue);
      const baseDAP = baseRD?.dap ?? null;
      const finalDAP =
        baseDAP !== null
          ? calculateFinalDose(baseDAP, phosphorusRec.increasePercent)
          : null;

      results.push({
        name: "Phosphorus",
        fertilizer: "DAP",
        value: phosphorusValue,
        baseRD: baseDAP,
        finalDose: finalDAP,
        recommendation: phosphorusRec,
      });
    }

    // Potassium recommendation
    if (formData.potassium && !isNaN(Number(formData.potassium))) {
      const potassiumValue = Number(formData.potassium);
      const potassiumRec = getPotassiumRecommendation(potassiumValue);
      const baseMOP = baseRD?.mop ?? null;
      const finalMOP =
        baseMOP !== null
          ? calculateFinalDose(baseMOP, potassiumRec.increasePercent)
          : null;

      results.push({
        name: "Potassium",
        fertilizer: "MOP",
        value: potassiumValue,
        baseRD: baseMOP,
        finalDose: finalMOP,
        recommendation: potassiumRec,
      });
    }

    return results;
  }, [formData.nitrogen, formData.phosphorus, formData.potassium, baseRD]);

  if (recommendations.length === 0) {
    return null;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-green-100 text-green-800";
      case "Very High":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Fertilizer Recommendations
        </h3>
      </div>

      {/* Base Recommended Dose Display */}
      <div className="mb-4">
        <BaseRecommendedDoseDisplay
          plantationType={formData.plantationType}
          age={formData.age}
          crop={formData.crop}
          cropOther={formData.cropOther}
          showOnlyForApple={false}
        />
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={rec.name}
            className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
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
                    <h4 className="font-semibold text-gray-900 text-base">
                      {rec.name} ({rec.fertilizer})
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Soil Test Result:{" "}
                      <span className="font-medium">{rec.value} Kg ha⁻¹</span>
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

                {/* Base RD and Final Dose */}
                {rec.baseRD !== null && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-green-700 mb-1">Base RD:</p>
                        <p className="text-sm font-semibold text-green-900">
                          {rec.baseRD} g/tree
                        </p>
                      </div>
                      {rec.finalDose !== null && (
                        <div>
                          <p className="text-xs text-green-700 mb-1">
                            Final Recommended Dose:
                          </p>
                          <p className="text-sm font-semibold text-green-900">
                            {rec.finalDose} g/tree
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recommendation Details */}
                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-semibold mt-0.5">
                      →
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Adjustment:
                      </p>
                      <p className="text-sm text-gray-700">
                        {rec.recommendation.increasePercent !== null
                          ? `Apply ${rec.recommendation.increasePercent}% more than the Base Recommended Dose (RD)`
                          : "Do not increase beyond the Base Recommended Dose (RD)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                    <span className="text-blue-600 font-semibold mt-0.5">
                      →
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Suggestion:
                      </p>
                      <p className="text-sm text-gray-700">
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
