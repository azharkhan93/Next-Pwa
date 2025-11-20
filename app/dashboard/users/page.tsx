"use client";

import React from "react";
import { UserForm } from "@/components";

export default function AddUserPage() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <UserForm />
    </div>
  );
}
