"use client";

import React from "react";
import { Button } from "..";
import { MdAdd, MdMenu } from "react-icons/md";

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
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between border-b border-white/5 bg-slate-900/50 backdrop-blur-xl px-6 lg:px-12">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          aria-label="Toggle menu"
        >
          <MdMenu size={24} />
        </button>
        <h1 className="text-xl font-bold text-white tracking-tight">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {rightSlot}
        {onAddClick ? (
          <Button
            size="md"
            variant="primary"
            onClick={onAddClick}
            className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 px-5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MdAdd size={20} className="mr-1" />
            <span className="hidden sm:inline font-semibold">{addText}</span>
          </Button>
        ) : null}
      </div>
    </header>
  );
};
