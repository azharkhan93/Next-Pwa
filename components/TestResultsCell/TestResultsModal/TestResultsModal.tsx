import React from "react";
import { MdScience } from "react-icons/md";
import type { TestResult } from "../types";
import { TestResultCard } from "../TestResultCard/TestResultCard";
import { Modal } from "@/components";
import { RecordData } from "@/hooks/useRecords";

type TestResultsModalProps = {
  testResults: TestResult[];
  record: RecordData;
  onClose: () => void;
};

export const TestResultsModal: React.FC<TestResultsModalProps> = ({
  testResults,
  record,
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
        {/* Unified Inline Header: Summary + Farmer Details */}
        <div className="flex flex-col gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
          {/* Top Line: Analysis Title */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <MdScience size={20} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 tracking-tight">Soil Analysis Details</h4>
              <p className="text-xs text-slate-500 font-medium">
                Showing {testResults.length} test sample{testResults.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Inline Farmer Info Grid */}
          <div className="flex flex-row flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Name:</span>
              <span className="text-sm font-bold text-slate-700">{record.name}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">District:</span>
              <span className="text-sm font-bold text-slate-700">{record.district || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Crop:</span>
              <span className="text-sm font-bold text-slate-700">{record.crop || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Age:</span>
              <span className="text-sm font-bold text-slate-700">{record.age ? `${record.age} Years` : "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Report No:</span>
              <span className="text-sm font-bold text-slate-700">{record.consumerId || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">ID:</span>
              <span className="text-sm font-bold text-slate-700">{record.id?.slice(-5).toUpperCase() || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Received:</span>
              <span className="text-sm font-bold text-slate-700">
                {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
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
