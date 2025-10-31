"use client";

import React from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "error" | "outlined";

export type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm cursor-pointer",
  md: "px-4 py-2 text-base cursor-pointer",
  lg: "px-5 py-3 text-lg cursor-pointer",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 ",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-400",
  error: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  outlined:
    "bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  disabled = false,
  loading = false,
  className,
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors";
  const classes = [
    base,
    sizeClasses[size],
    variantClasses[variant],
    className ?? "",
  ]
    .join(" ")
    .trim();

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"></span>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
