"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AddRecordForm } from "@/components";

export default function EditRecordPage() {
  const params = useParams();
  const recordId = params?.id as string;

  if (!recordId) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Invalid record ID</div>
      </div>
    );
  }

  return <AddRecordForm recordId={recordId} />;
}

