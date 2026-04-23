"use client";

import React, { useRef, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TextInput } from "@/components/TextInput/TextInput";
import {
  isOtherOption,
  getDropdownDisplayValue,
  OTHER_OPTION_VALUE,
} from "@/utils/dropdownHelpers";

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type DropdownProps = {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  otherValue?: string;
  onOtherValueChange?: (value: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
  className = "space-y-1.5",
  otherValue = "",
  onOtherValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOtherSelected = isOtherOption(value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const displayValue = getDropdownDisplayValue(
    value,
    options,
    placeholder,
    otherValue
  );

  const handleOptionClick = (optionValue: string) => {
    onChange(isOtherOption(optionValue) ? OTHER_OPTION_VALUE : optionValue);
    setIsOpen(false);
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onOtherValueChange) {
      onOtherValueChange(e.target.value);
    }
  };

  // Close dropdown when "Other" is selected
  useEffect(() => {
    if (isOtherSelected && isOpen) {
      setIsOpen(false);
    }
  }, [isOtherSelected, isOpen]);

  if (isOtherSelected) {
    return (
      <div className={className ?? ""}>
        <TextInput
          id={id}
          name={name}
          label={label}
          value={otherValue}
          onChange={handleOtherInputChange}
          disabled={disabled}
          placeholder="Enter custom value..."
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-[13px] font-bold text-slate-300 tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <button
        id={id}
        name={name}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-3 text-sm flex items-center justify-between border border-white/10 rounded-xl bg-white/[0.03] backdrop-blur-md text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 hover:bg-white/[0.05] hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen ? "border-blue-500/50 ring-2 ring-blue-500/20 bg-white/[0.07]" : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {displayValue}
        </span>
        <MdKeyboardArrowDown
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400" : ""}`}
          size={22}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="p-1.5">
            {options.map((option) => {
              const isSelected = option.value === value;
              const isDisabled = option.disabled;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !isDisabled && handleOptionClick(option.value)}
                  disabled={isDisabled}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                    isSelected
                      ? "bg-blue-600/20 text-blue-400 font-semibold"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  } ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
