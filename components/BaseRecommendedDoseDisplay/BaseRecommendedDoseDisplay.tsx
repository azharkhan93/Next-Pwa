"use client";

import React from "react";
import {
  getBaseRecommendedDose,
  getPlantationTypeDisplayName,
} from "@/utils/baseRecommendedDose";

type BaseRecommendedDoseDisplayProps = {
  plantationType?: string | null;
  age?: number | "" | null;
  crop?: string | null;
  cropOther?: string | null;
  showOnlyForApple?: boolean;
};

export function BaseRecommendedDoseDisplay({
  plantationType,
  age,
  crop,
  cropOther,
  showOnlyForApple = true,
}: BaseRecommendedDoseDisplayProps) {
  const baseRD = React.useMemo(() => {
    return getBaseRecommendedDose(plantationType, age);
  }, [plantationType, age]);

  const plantationTypeDisplay = React.useMemo(() => {
    return getPlantationTypeDisplayName(plantationType);
  }, [plantationType]);

  // Check if we should show (only for Apple if showOnlyForApple is true)
  const shouldShow = React.useMemo(() => {
    if (!baseRD || !plantationTypeDisplay) {
      return false;
    }

    if (showOnlyForApple) {
      const isApple =
        crop === "apple" || cropOther?.toLowerCase().includes("apple");
      return isApple;
    }

    return true;
  }, [baseRD, plantationTypeDisplay, crop, cropOther, showOnlyForApple]);

  if (!shouldShow || !baseRD) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-blue-900">
          Base Recommended Dose (RD) per Tree
        </h4>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
            {plantationTypeDisplay}
          </span>
          {age && (
            <span className="text-xs text-blue-700">
              Age: {age} years
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-md p-3 border border-blue-200">
          <p className="text-xs text-blue-700 mb-1 font-medium">
            Urea
          </p>
          <p className="text-lg font-bold text-blue-900">
            {baseRD.urea} g/tree
          </p>
        </div>
        <div className="bg-white rounded-md p-3 border border-blue-200">
          <p className="text-xs text-blue-700 mb-1 font-medium">
            DAP
          </p>
          <p className="text-lg font-bold text-blue-900">
            {baseRD.dap} g/tree
          </p>
        </div>
        <div className="bg-white rounded-md p-3 border border-blue-200">
          <p className="text-xs text-blue-700 mb-1 font-medium">
            MOP
          </p>
          <p className="text-lg font-bold text-blue-900">
            {baseRD.mop} g/tree
          </p>
        </div>
      </div>
      <p className="text-xs text-blue-600 mt-3 italic">
        * These are base recommended doses. Final recommendations will be
        adjusted based on soil test results.
      </p>
    </div>
  );
}
