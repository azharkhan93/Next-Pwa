"use client";

import React from "react";
import { Modal, Button } from "..";

export type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  overlayVariant?: "light" | "dark";
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  overlayVariant = "dark",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      overlayVariant={overlayVariant}
      widthClassName="max-w-md"
    >
      {description ? (
        <div className="mb-4 text-sm text-gray-700">
          {description}
        </div>
      ) : null}
      <div className="flex items-center justify-end gap-3">
        <Button variant="secondary" size="sm" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="error" size="sm" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
