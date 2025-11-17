"use client";

import React from "react";
import { MdHourglassEmpty } from "react-icons/md";

export type LoadingProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  fullScreen = false,
  className = "",
}) => {
  const iconClasses = `${sizeClasses[size]} animate-spin text-gray-600 dark:text-gray-400`;
  const textClasses = `${textSizeClasses[size]} text-gray-600 dark:text-gray-400 ml-2`;

  const content = (
    <div className={`flex items-center justify-center ${className}`}>
      <MdHourglassEmpty className={iconClasses} />
      {/* {text && <span className={textClasses}>{text}</span>} */}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

