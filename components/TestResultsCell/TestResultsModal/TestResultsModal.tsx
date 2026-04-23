import React from "react";
import { MdScience } from "react-icons/md";
import type { TestResult } from "../types";
import { TestResultCard } from "../TestResultCard/TestResultCard";
import { Modal } from "@/components";

type TestResultsModalProps = {
  testResults: TestResult[];
  onClose: () => void;
};

export const TestResultsModal: React.FC<TestResultsModalProps> = ({
  testResults,
  onClose,
}) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Test Results Report"
      widthClassName="max-w-6xl"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100/50">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <MdScience size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Detailed Soil Analysis</h4>
            <p className="text-sm text-slate-500">
              Generated report containing {testResults.length} test sample{testResults.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="space-y-10 py-4">
          {testResults.map((test, index) => (
            <TestResultCard key={test.id || index} test={test} index={index} />
          ))}
        </div>
      </div>
    </Modal>
  );
};
