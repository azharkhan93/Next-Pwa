"use client";

import React from "react";
import { MdFilterList, MdClear } from "react-icons/md";
import { Dropdown } from "../Dropdown/Dropdown";


export type FilterOption = {
  label: string;
  value: string;
};

export type FilterBarProps = {
  filters: {
    label: string;
    key: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  onClearAll?: () => void;
  className?: string;
  searchComponent?: React.ReactNode;
};

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onClearAll,
  className,
  searchComponent,
}) => {
  const hasActiveFilters = filters.some((f) => f.value !== "");

  return (
    <div
      className={` w-full md:max-w-[90%] flex flex-wrap  items-center gap-6 md:gap-11 p-4 rounded-lg   ${className ?? ""}`}
    >
      {searchComponent}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 ">
        <MdFilterList size={20} />
        <span>Filters:</span>
      </div>

      {filters.map((filter) => {
        const dropdownOptions = [
          { label: "All", value: "" },
          ...filter.options,
        ];

        return (
          <div key={filter.key} className="flex items-center gap-2">
            <Dropdown
              id={filter.key}
              name={filter.key}
              label={filter.label}
              value={filter.value}
              onChange={filter.onChange}
              options={dropdownOptions}
              placeholder="All"
              className="min-w-[120px]"
            />
          </div>
        );
      })}

      {hasActiveFilters && onClearAll && (
        <button
          onClick={onClearAll}
          className="ml-auto flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600  hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 rounded-md transition-colors"
        >
          <MdClear size={16} />
          <span>Clear all</span>
        </button>
      )}
    </div>
  );
};
