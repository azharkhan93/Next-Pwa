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
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
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
          {
            label: "Users",
            href: "/dashboard/users/list",
            icon: "MdPeople",
          },
        ]}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="lg:ml-60 min-h-screen relative z-10 lg:z-40 flex flex-col transition-all duration-300">
        {/* Abstract background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        </div>

        <Topbar
          title="Overview"
          onAddClick={onButtonClick}
          addText={
            pathname?.startsWith("/dashboard/add")
              ? "View Dashboard"
              : "New Entry"
          }
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-4 lg:p-6 relative z-10 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
