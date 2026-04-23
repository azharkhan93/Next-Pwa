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
  className = "space-y-1.5",
  inputClassName,
  labelClassName,
}) => {
  const inputId = id || name || undefined;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-[13px] font-bold text-slate-300 tracking-wide uppercase ${
            labelClassName ?? ""
          }`.trim()}
        >
          {label}
        </label>
      )}
      <div className="relative group">
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
          className={`block w-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/[0.07] hover:bg-white/[0.05] hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed ${
            inputClassName ?? ""
          }`.trim()}
        />
        {/* Subtle inner glow on focus */}
        <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity opacity-0 group-focus-within:opacity-100 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]" />
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-400 pl-1 animate-in fade-in slide-in-from-top-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};
