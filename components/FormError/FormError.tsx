"use client";

import React from "react";

export type FormErrorProps = {
  message?: string | null;
  id?: string;
  className?: string;
};

export const FormError: React.FC<FormErrorProps> = ({ message = null, id, className }) => {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className={`text-sm text-red-600 dark:text-red-400 ${className ?? ""}`.trim()}
    >
      {message}
    </p>
  );
};


