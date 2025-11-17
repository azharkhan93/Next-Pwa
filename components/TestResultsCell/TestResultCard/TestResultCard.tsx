import React from "react";
import type { TestResult } from "../types";
import { BasicParameters } from "../BasicParameters/BasicParametres";
import { Micronutrients } from "../Micronutrients/Micronutrients";
import { OtherParameters } from "../OtherParameters/OtherParameters";
import { PrimaryMacronutrients } from "../PrimaryMacronutrients/PrimaryMacronutrients";
import { Recommendations } from "../Recommendations/PrimaryMacronutrients";
import { SecondaryMacronutrients } from "../SecondaryMacronutrients/SecondaryMacronutrients";



type TestResultCardProps = {
  test: TestResult;
  index: number;
};

export const TestResultCard: React.FC<TestResultCardProps> = ({ test, index }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-900/50 hover:shadow-md transition-shadow">
      {/* Lab Test Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-md">
            Lab Test #{test.labTestNo || String(index + 1).padStart(2, "0")}
          </span>
        </h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Basic & Primary Nutrients */}
        <div className="space-y-4">
          <BasicParameters test={test} />
          <PrimaryMacronutrients test={test} />
        </div>

        {/* Right Column - Secondary & Micronutrients */}
        <div className="space-y-4">
          <SecondaryMacronutrients test={test} />
          <Micronutrients test={test} />
          <OtherParameters test={test} />
        </div>
      </div>

      {/* Recommendations Section */}
      <Recommendations test={test} />
    </div>
  );
};

