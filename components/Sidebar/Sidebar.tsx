"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdPeople,
  MdReceiptLong,
  MdSettings,
} from "react-icons/md";

type IconName = "MdDashboard" | "MdPeople" | "MdReceiptLong" | "MdSettings";

export type SidebarItem = {
  label: string;
  href: string;
  icon?: IconName;
};

const iconMap: Record<IconName, React.ReactNode> = {
  MdDashboard: <MdDashboard size={20} />,
  MdPeople: <MdPeople size={20} />,
  MdReceiptLong: <MdReceiptLong size={20} />,
  MdSettings: <MdSettings size={20} />,
};

export type SidebarProps = {
  items: SidebarItem[];
};

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <nav className="p-4 space-y-2">
      <div className="px-2 py-3 text-xl font-semibold">Dashboard</div>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon ? iconMap[item.icon] : null}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
