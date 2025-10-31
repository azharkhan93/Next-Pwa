"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, Topbar } from "@/components";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const onButtonClick = () => {
    if (pathname?.startsWith("/dashboard/add")) {
      router.push("/dashboard/list");
    } else {
      router.push("/dashboard/add");
    }
  };
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[260px_1fr] bg-gray-50 dark:bg-gray-900">
      <aside className="hidden lg:block border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <Sidebar
          items={[
            { label: "Overview", href: "/dashboard", icon: "MdDashboard" },
            {
              label: "Add Data",
              href: "/dashboard/add",
              icon: "MdReceiptLong",
            },
            {
              label: "View Data",
              href: "/dashboard/list",
              icon: "MdReceiptLong",
            },
          ]}
        />
      </aside>
      <div className="flex flex-col min-h-screen">
        <Topbar
          title="Admin Panel"
          onAddClick={onButtonClick}
          addText={pathname?.startsWith("/dashboard/add") ? "View data" : "Add new data"}
        />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
