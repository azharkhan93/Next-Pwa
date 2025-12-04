"use client";

import React, { useState } from "react";
import { MdExpandMore, MdClose, MdScience } from "react-icons/md";
import type { TestResult } from "./types";
import { TestResultsModal } from "./TestResultsModal/TestResultsModal";
;

type TestResultsCellProps = {
  testResults: TestResult[] | null | undefined;
};

export const TestResultsCell: React.FC<TestResultsCellProps> = ({
  testResults,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!testResults || !Array.isArray(testResults) || testResults.length === 0) {
    return (
      <span className="text-gray-500 text-sm">No tests</span>
    );
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative">
      {/* Summary View - Clickable Button */}
      <button
        type="button"
        onClick={toggleExpanded}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors text-sm font-medium cursor-pointer"
      >
        <MdScience size={16} className="cursor-pointer" />
        <span>  
          {testResults.length} Test{testResults.length > 1 ? "s" : ""}
        </span>
        {expanded ? (
          <MdClose size={18} className="cursor-pointer" style={{cursor: "pointer"}} />
        ) : (
          <MdExpandMore size={18} className="cursor-pointer" />
        )}
      </button>

      {/* Expanded View - Modal */}
      {expanded && (
        <TestResultsModal testResults={testResults} onClose={toggleExpanded} />
      )}
    </div>
  );
};
