"use client";

import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Checkbox } from "../Checkbox";

export type DataTableProps = {
  title?: string;
  columns: string[];
  data: (string | number | React.ReactNode)[][];
  onEditRow?: (rowIndex: number) => void;
  onDeleteRow?: (rowIndex: number) => void;
  enableSelection?: boolean;
  selectedRows?: number[];
  onSelectionChange?: (selectedRows: number[]) => void;
  className?: string;
};

export const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  onEditRow,
  onDeleteRow,
  enableSelection = false,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  className,
}) => {
  const [internalSelectedRows, setInternalSelectedRows] = useState<number[]>(
    []
  );
  const selectedRows = controlledSelectedRows ?? internalSelectedRows;
  const setSelectedRows = onSelectionChange ?? setInternalSelectedRows;

  const showActions = Boolean(onEditRow || onDeleteRow);
  const allSelected = data.length > 0 && selectedRows.length === data.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((_, idx) => idx));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (rowIndex: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowIndex]);
    } else {
      setSelectedRows(selectedRows.filter((idx) => idx !== rowIndex));
    }
  };

  return (
    <div className={`w-full rounded-lg ${className ?? ""}`}>
      {title ? (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 text-sm font-medium">
          {title}
        </div>
      ) : null}
      <div className="max-w-[90%] lg:max-w-[90%] xl:max-w-[90%] 2xl:max-w-[100%] overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/40">
            <tr>
              {enableSelection && (
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap w-12">
                  <Checkbox
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="justify-center"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap"
                >
                  {c}
                </th>
              ))}
              {showActions ? (
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right whitespace-nowrap">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-100 dark:border-gray-800"
              >
                {enableSelection && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Checkbox
                      checked={selectedRows.includes(idx)}
                      onChange={(checked) => handleSelectRow(idx, checked)}
                      className="justify-center"
                      aria-label={`Select row ${idx + 1}`}
                    />
                  </td>
                )}
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className="px-4 py-3 text-gray-800 dark:text-gray-100 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
                {showActions ? (
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      {onEditRow ? (
                        <button
                          aria-label="Edit"
                          className="p-1 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400"
                          onClick={() => onEditRow(idx)}
                        >
                          <MdEdit size={18} />
                        </button>
                      ) : null}
                      {onDeleteRow ? (
                        <button
                          aria-label="Delete"
                          className="p-1 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                          onClick={() => onDeleteRow(idx)}
                        >
                          <MdDelete size={18} />
                        </button>
                      ) : null}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
