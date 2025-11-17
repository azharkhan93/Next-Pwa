"use client";

import React, { Suspense as ReactSuspense } from "react";
import { Loading } from "../Loading";

export type SuspenseProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingText?: string;
  fullScreen?: boolean;
};

export const Suspense: React.FC<SuspenseProps> = ({
  children,
  fallback,
  loadingText,
  fullScreen = false,
}) => {
  const defaultFallback = (
    <Loading text={loadingText} fullScreen={fullScreen} />
  );

  return (
    <ReactSuspense fallback={fallback || defaultFallback}>
      {children}
    </ReactSuspense>
  );
};

