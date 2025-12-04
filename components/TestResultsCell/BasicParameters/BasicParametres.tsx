import React from "react";
import type { TestResult } from "../types";
import { getRatingColor } from "../utils";


type BasicParametersProps = {
  test: TestResult;
};

export const BasicParameters: React.FC<BasicParametersProps> = ({ test }) => {
  return (
    <div>
      <h5 className="text-sm font-semibold mb-2 text-gray-700 uppercase tracking-wide">
        Basic Parameters
      </h5>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">pH</div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {test.ph || "-"}
            </span>
            {test.phRating && (
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${getRatingColor(test.phRating)}`}>
                {test.phRating}
              </span>
            )}
          </div>
        </div>
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Organic Carbon (%)</div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {test.organicCarbon || "-"}
            </span>
            {test.organicCarbonRating && (
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${getRatingColor(test.organicCarbonRating)}`}>
                {test.organicCarbonRating}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

