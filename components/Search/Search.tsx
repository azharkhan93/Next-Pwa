"use client";

import React from "react";
import { MdSearch } from "react-icons/md";
import { TextInput } from "../TextInput";

export type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
}) => {
  return (
    <div className={`relative ${className ?? ""}`}>
      <TextInput
        id="search"
        name="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="relative"
       
      />
      <div className="absolute inset-y-0 right-0 flex items-center  pointer-events-none z-10 top-[8px]">
        <MdSearch className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
};
