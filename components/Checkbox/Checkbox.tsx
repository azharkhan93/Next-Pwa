"use client";

import React, { useId } from "react";
import { MdCheck } from "react-icons/md";

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
    <div className={`flex items-start ${className ?? ""}`}>
      <div className="relative flex items-center pt-0.5">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="peer w-5 h-5 appearance-none rounded-lg border-2 border-white/10 bg-white/[0.03] backdrop-blur-md cursor-pointer transition-all duration-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/20"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
          <MdCheck size={14} />
        </div>
      </div>
      {label && (
        <label
          htmlFor={inputId}
          className={`ml-3 text-sm font-medium transition-colors ${
            checked ? "text-white" : "text-slate-400"
          } ${labelClassName ?? ""} ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-slate-200"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
