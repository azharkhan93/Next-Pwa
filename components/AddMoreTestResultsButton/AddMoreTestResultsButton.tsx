"use client";

import React from "react";
import { Button } from "@/components";
import { MdAdd } from "react-icons/md";

type AddMoreTestResultsButtonProps = {
  onClick: () => void;
  className?: string;
};

export function AddMoreTestResultsButton({
  onClick,
  className,
}: AddMoreTestResultsButtonProps) {
  return (
    <div className={className}>
      <Button
        type="button"
        variant="outlined"
        onClick={onClick}
        className="flex items-center gap-2"
      >
        <MdAdd size={20} />
        Add More Test Results
      </Button>
    </div>
  );
}

