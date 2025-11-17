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
  className,
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
          className="block text-sm font-bold text-white mb-1"
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
        className="w-full px-3 py-1.5 text-sm flex items-center justify-between border border-gray-300 dark:border-gray-700 cursor-pointer rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? "" : "text-gray-500  cursor-pointer"}>
          {displayValue}
        </span>
        <MdKeyboardArrowDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>

      {isOpen ? (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = option.value === value;
            const isDisabled = option.disabled;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => !isDisabled && handleOptionClick(option.value)}
                disabled={isDisabled}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium"
                    : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
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
      ) : null}
    </div>
  );
};
