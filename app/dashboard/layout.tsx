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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const onButtonClick = () => {
    if (pathname?.startsWith("/dashboard/add")) {
      router.push("/dashboard/list");
    } else {
      router.push("/dashboard/add");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        items={[
          { label: "Home", href: "/dashboard", icon: "MdHome" },
          {
            label: "Add Data",
            href: "/dashboard/add",
            icon: "MdAdd",
          },
          {
            label: "View Data",
            href: "/dashboard/list",
            icon: "MdList",
          },
        ]}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950">
        <Topbar
          title="Admin Panel"
          onAddClick={onButtonClick}
          addText={pathname?.startsWith("/dashboard/add") ? "View data" : "Add new data"}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
