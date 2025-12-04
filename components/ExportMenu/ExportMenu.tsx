"use client";

import React, { useState } from "react";
import { MdFileDownload, MdPictureAsPdf } from "react-icons/md";
import { Button } from "../Button";
import { Modal } from "../Modal";

export type ExportFormat = "pdf" | "word";

export type ExportMenuProps = {
  selectedRows: number[];
  totalRows?: number;
  onExport: (format: ExportFormat) => void;
  disabled?: boolean;
  className?: string;
  isExporting?: boolean;
  exportProgress?: {
    current: number;
    total: number;
    currentRecord?: string;
  } | null;
};

export const ExportMenu: React.FC<ExportMenuProps> = ({
  selectedRows,
  totalRows,
  onExport,
  disabled = false,
  className,
  isExporting = false,
  exportProgress = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCount = selectedRows.length;
  const hasSelection = selectedCount > 0;

  const handleExport = (format: ExportFormat) => {
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <Button
        variant="primary"
        size="md"
        onClick={() => setIsOpen(true)}
        disabled={disabled || !hasSelection || isExporting}
        loading={isExporting}
        className="inline-flex items-center gap-2"
      >
        <MdFileDownload size={18} />
        <span>{isExporting ? "Exporting..." : "Export Data"}</span>
        {hasSelection && !isExporting && (
          <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
            {selectedCount}
          </span>
        )}
        {isExporting && exportProgress && (
          <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
            {exportProgress.current}/{exportProgress.total}
          </span>
        )}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Export Data"
        overlayVariant="dark"
        widthClassName="max-w-md"
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            {hasSelection ? (
              <p>
                Export{" "}
                <span className="font-semibold text-gray-900">
                  {selectedCount}
                </span>{" "}
                selected
                {selectedCount === 1 ? " row" : " rows"} of {totalRows || 0} total.
              </p>
            ) : (
              <p>No rows selected. Please select rows to export.</p>
            )}
          </div>

          {hasSelection ? (
            <div className="grid grid-cols-1 gap-3">
              {isExporting && exportProgress ? (
                <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        Exporting PDFs...
                      </p>
                      <p className="text-sm text-gray-600">
                        {exportProgress.currentRecord && (
                          <>Processing: {exportProgress.currentRecord}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(exportProgress.current / exportProgress.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    {exportProgress.current} of {exportProgress.total} PDFs generated
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleExport("pdf")}
                  disabled={isExporting}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <MdPictureAsPdf
                      className="text-red-600"
                      size={24}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">
                      Export as PDF
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedCount === 1
                        ? "Download selected data in PDF format"
                        : `Download ${selectedCount} selected records as PDF files`}
                    </p>
                  </div>
                </button>
              )}
            </div>
          ): null}

          {!hasSelection ? (
            <div className="pt-4 border-t border-gray-200 cursor-pointer">
              <Button
                variant="outlined"
                size="md"
                onClick={() => setIsOpen(false)}
                className="w-full cursor-pointer"
              >
                Close
              </Button>
            </div>
          ): null}
        </div>
      </Modal>
    </div>
  );
};
