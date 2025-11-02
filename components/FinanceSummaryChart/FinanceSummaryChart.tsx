"use client";

import React from "react";

export type FinanceSummaryChartProps = {
  annualTaxes?: number;
  nextReviewDate?: string;
  avgProductPrice?: number;
  satisfactionRate?: number;
};

export const FinanceSummaryChart: React.FC<FinanceSummaryChartProps> = ({
  annualTaxes = 500000,
  nextReviewDate = "July 24, 2024",
  avgProductPrice = 60.7,
  satisfactionRate = 63,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Finance Summary
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Annual Companies Taxes
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ${annualTaxes.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Next Tax Review Date
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nextReviewDate}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average Product Price
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ${avgProductPrice.toFixed(2)}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Satisfaction Rate
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {satisfactionRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${satisfactionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

