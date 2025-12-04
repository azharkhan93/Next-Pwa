"use client";

import React from "react";
import { Checkbox } from "@/components";
import {
  calculateParameterPrice,
  formatPrice,
  getSelectedParameterCount,
} from "@/utils/parameterPricing";

type ParameterSelectionProps = {
  paramPh: boolean;
  paramDl: boolean;
  paramCl: boolean;
  onParamPhChange: (checked: boolean) => void;
  onParamDlChange: (checked: boolean) => void;
  onParamClChange: (checked: boolean) => void;
};

export function ParameterSelection({
  paramPh,
  paramDl,
  paramCl,
  onParamPhChange,
  onParamDlChange,
  onParamClChange,
}: ParameterSelectionProps) {
  // Calculate parameter pricing
  const selectedCount = React.useMemo(
    () => getSelectedParameterCount(paramPh, paramDl, paramCl),
    [paramPh, paramDl, paramCl]
  );

  const totalPrice = React.useMemo(
    () => calculateParameterPrice(paramPh, paramDl, paramCl),
    [paramPh, paramDl, paramCl]
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Choose Parameters
        </h3>
        <p className="text-sm text-gray-600">
          Select the parameters you want to test. Price: ₹50 per parameter
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-blue-400 transition-colors">
          <Checkbox
            name="paramPh"
            label="pH"
            checked={paramPh}
            onChange={onParamPhChange}
            className="items-start"
          />
          <div className="mt-2 text-xs text-gray-500">Price: ₹50</div>
        </div>
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-blue-400 transition-colors">
          <Checkbox
            name="paramDl"
            label="DL"
            checked={paramDl}
            onChange={onParamDlChange}
            className="items-start"
          />
          <div className="mt-2 text-xs text-gray-500">Price: ₹50</div>
        </div>
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-blue-400 transition-colors">
          <Checkbox
            name="paramCl"
            label="CL"
            checked={paramCl}
            onChange={onParamClChange}
            className="items-start"
          />
          <div className="mt-2 text-xs text-gray-500">Price: ₹50</div>
        </div>
      </div>
      {selectedCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Selected Parameters: {selectedCount}
            </span>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">
                {selectedCount} parameter{selectedCount > 1 ? "s" : ""} × ₹50
              </div>
              <div className="text-lg font-bold text-gray-900">
                Grand Total: {formatPrice(totalPrice)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

