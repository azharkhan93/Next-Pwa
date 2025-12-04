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
  exportMenu?: React.ReactNode;
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
  exportMenu,
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
      {(title || exportMenu) && (
        <div className="px-4 py-3 flex items-center justify-between">
          {title ? (
            <div className="text-sm font-medium">{title}</div>
          ) : exportMenu ? (
            <div className="w-full flex justify-start">{exportMenu}</div>
          ) : null}
        </div>
      )}
      <div className="max-w-[90%]  overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="">
            <tr>
              {enableSelection && (
                <th className="px-4 py-3 font-medium text-white whitespace-nowrap w-12">
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
                  className="px-4 py-3 font-bold text-white whitespace-nowrap"
                >
                  {c}
                </th>
              ))}
              {showActions ? (
                <th className="px-4 py-3 font-bold text-white text-right whitespace-nowrap">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-100"
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
                    className="px-4 py-3 text-white font-bold whitespace-nowrap"
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
                          className="p-1 cursor-pointer rounded hover:bg-gray-100 text-blue-600"
                          onClick={() => onEditRow(idx)}
                        >
                          <MdEdit size={18} />
                        </button>
                      ) : null}
                      {onDeleteRow ? (
                        <button
                          aria-label="Delete"
                          className="p-1 cursor-pointer rounded hover:bg-gray-100 text-red-600"
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
