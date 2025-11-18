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
};

export const ExportMenu: React.FC<ExportMenuProps> = ({
  selectedRows,
  totalRows,
  onExport,
  disabled = false,
  className,
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
        disabled={disabled || !hasSelection}
        className="inline-flex items-center gap-2"
      >
        <MdFileDownload size={18} />
        <span>Export Data</span>
        {hasSelection && (
          <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
            {selectedCount}
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
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {hasSelection ? (
              <p>
                Export{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
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
              <button
                onClick={() => handleExport("pdf")}
                className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group cursor-pointer"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <MdPictureAsPdf
                    className="text-red-600 dark:text-red-400"
                    size={24}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Export as PDF
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Download selected data in PDF format
                  </p>
                </div>
              </button>
            </div>
          ): null}

          {!hasSelection ? (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 cursor-pointer">
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
