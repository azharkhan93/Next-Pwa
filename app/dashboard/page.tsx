"use client";

import { StatCard } from "@/components/StatCard";
import React from "react";


export default function DashboardPage() {
  const stats = [
    { label: "Total Users", value: "1,248", delta: "+5.3%" },
    { label: "Active Sessions", value: "312", delta: "+1.2%" },
    { label: "Orders Today", value: "98", delta: "-0.4%" },
    { label: "Revenue", value: "$12,430", delta: "+3.1%" },
  ];

  const rows = [
    { id: "U-1021", name: "Jane Cooper", role: "Admin", status: "Active" },
    { id: "U-1022", name: "Wade Warren", role: "Editor", status: "Active" },
    { id: "U-1023", name: "Bessie Cooper", role: "Viewer", status: "Suspended" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />
        ))}
      </div>

      {/* <DataTable
        title="Latest Users"
        columns={["ID", "Name", "Role", "Status"]}
        data={rows.map((r) => [r.id, r.name, r.role, r.status])}
      /> */}
    </div>
  );
}


