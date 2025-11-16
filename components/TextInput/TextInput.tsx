"use client";

import React from "react";

export type TextInputProps = {
  id?: string;
  name?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  disabled,
  error = null,
  className,
  inputClassName,
  labelClassName,
}) => {
  const inputId = id || name || undefined;

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={inputId}
          className={`block text-sm font-bold text-white  ${
            labelClassName ?? ""
          }`.trim()}
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          inputClassName ?? ""
        }`.trim()}
      />
      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};
