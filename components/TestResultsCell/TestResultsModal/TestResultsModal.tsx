import React from "react";
import { MdClose, MdScience } from "react-icons/md";
import type { TestResult } from "../types";
import { TestResultCard } from "../TestResultCard/TestResultCard";



type TestResultsModalProps = {
  testResults: TestResult[];
  onClose: () => void;
};

export const TestResultsModal: React.FC<TestResultsModalProps> = ({
  testResults,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
        onClick={onClose}
      />
      
      {/* Content Panel */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl w-[90vw] max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <MdScience size={24} className="text-blue-600 dark:text-blue-400" />
              Test Results Report
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Total: {testResults.length} test{testResults.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-6">
            {testResults.map((test, index) => (
              <TestResultCard key={test.id || index} test={test} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

