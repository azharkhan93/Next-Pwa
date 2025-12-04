import React from "react";
import type { TestResult as OtherTestResult, TestResult } from "../types";

type OtherParametersProps = {
  test: TestResult;
};

export const OtherParameters: React.FC<OtherParametersProps> = ({ test }) => {
  if (!test.sodium && !test.electricalConductivity) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm font-semibold mb-2 text-gray-700 uppercase tracking-wide">
        Other Parameters
      </h5>
      <div className="grid grid-cols-2 gap-2">
        {test.sodium && (
          <div className="bg-white p-2 rounded border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Sodium (Na)</div>
            <div className="font-semibold text-gray-900">{test.sodium}</div>
          </div>
        )}
        {test.electricalConductivity && (
          <div className="bg-white p-2 rounded border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">EC</div>
            <div className="font-semibold text-gray-900">{test.electricalConductivity}</div>
          </div>
        )}
      </div>
    </div>
  );
};

