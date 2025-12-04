"use client";

import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  overlayVariant?: "light" | "dark";
  widthClassName?: string;
  className?: string;
  closeOnOverlay?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  overlayVariant = "dark",
  widthClassName = "max-w-lg",
  className,
  closeOnOverlay = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayClass =
    overlayVariant === "light"
      ? "bg-white/60 backdrop-blur-sm"
      : "bg-black/50 backdrop-blur-sm";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClass}`}
      onClick={closeOnOverlay ? onClose : undefined}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative w-full ${widthClassName} rounded-lg border border-gray-200 bg-white shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {title}
          </h3>
          <button
            aria-label="Close"
            className="p-1 rounded hover:bg-gray-100 text-gray-600"
            onClick={onClose}
          >
            <MdClose size={20} />
          </button>
        </div>
        <div className={`p-4 ${className ?? ""}`}>{children}</div>
      </div>
    </div>
  );
};
