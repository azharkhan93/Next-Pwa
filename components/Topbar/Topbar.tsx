"use client";

import React from "react";
import { Button } from "..";
import { MdAdd } from "react-icons/md";

export type TopbarProps = {
  title?: string;
  rightSlot?: React.ReactNode;
  onAddClick?: () => void;
  addText?: string;
};

export const Topbar: React.FC<TopbarProps> = ({ title = "", rightSlot, onAddClick, addText = "Add new data" }) => {
  return (
    <header className="sticky top-0 z-10 h-14 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur px-4 lg:px-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        {rightSlot}
        <Button size="sm" variant="primary" onClick={onAddClick} className="inline-flex items-center gap-2">
          <MdAdd size={18} />
          <span>{addText}</span>
        </Button>
      </div>
    </header>
  );
};
