"use client";

import {
  StatCard,
  WeeklyReportChart,
  FinanceSummaryChart,
  TransactionsChart,
  ActivityChart,
} from "@/components";
import React from "react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Users", value: "1,248", delta: "+5.3%" },
    { label: "Active Sessions", value: "312", delta: "+1.2%" },
    { label: "Orders Today", value: "98", delta: "-0.4%" },
    { label: "Revenue", value: "$12,430", delta: "+3.1%" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            delta={s.delta}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyReportChart />
        <FinanceSummaryChart />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TransactionsChart />
        <ActivityChart />
      </div>
    </div>
  );
}


