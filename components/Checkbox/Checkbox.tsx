"use client";

import React from "react";

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
  const inputId = id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <input
        id={inputId}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {label && (
        <label
          htmlFor={inputId}
          className={`ml-2 text-sm text-gray-900 dark:text-gray-100 ${labelClassName ?? ""} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
