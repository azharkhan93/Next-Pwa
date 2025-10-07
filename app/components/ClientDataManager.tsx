'use client';

import dynamic from "next/dynamic";

const DataManager = dynamic(() => import("./DataManager"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  ),
});

export default function ClientDataManager() {
  return <DataManager />;
}
