"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  // Professional dark overlay to hide background contents
  const overlayClass = "bg-slate-950/80 backdrop-blur-md";

  const modalContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-10 ${overlayClass}`}
      onClick={closeOnOverlay ? onClose : undefined}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative w-full ${widthClassName} rounded-[2rem] border border-white/10 bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight truncate">
            {title}
          </h3>
          <button
            aria-label="Close"
            className="p-2 rounded-xl bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all"
            onClick={onClose}
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className={`p-6 sm:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar bg-white ${className ?? ""}`}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
