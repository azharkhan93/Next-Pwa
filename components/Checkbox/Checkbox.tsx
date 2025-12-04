"use client";

import React, { useId } from "react";

export type CheckboxProps = {
  id?: string;
  name?: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  className,
  labelClassName,
}) => {
  const generatedId = useId();
  const inputId = id || name || generatedId;

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <div className="relative flex items-center">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all checked:bg-blue-600 checked:border-blue-600"
        />
        {checked && (
          <svg
            className="absolute left-0.5 top-0.5 w-4 h-4 text-white pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {label && (
        <label
          htmlFor={inputId}
          className={`ml-3 text-sm font-medium text-gray-900 ${
            labelClassName ?? ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
