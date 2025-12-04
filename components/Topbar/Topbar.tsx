"use client";

import React from "react";
import { Button } from "..";
import { MdAdd, MdViewList } from "react-icons/md";

export type TopbarProps = {
  title?: string;
  rightSlot?: React.ReactNode;
  onAddClick?: () => void;
  addText?: string;
  onMenuClick?: () => void;
};

export const Topbar: React.FC<TopbarProps> = ({
  title = "",
  rightSlot,
  onAddClick,
  addText = "Add new data",
  onMenuClick,
}) => {
  return (
    <header className="sticky top-0 z-20 h-14 flex items-center justify-between border-b border-black bg-white  px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          <MdViewList size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {rightSlot}
        {onAddClick ? (
          <Button
            size="sm"
            variant="primary"
            onClick={onAddClick}
            className="inline-flex items-center gap-2"
          >
            <MdAdd size={18} />
            <span className="hidden sm:inline">{addText}</span>
          </Button>
        ) : null}
      </div>
    </header>
  );
};
