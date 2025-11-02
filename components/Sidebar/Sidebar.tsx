"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdHome,
  MdPeople,
  MdReceiptLong,
  MdSettings,
  MdClose,
  MdLogout,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { Button } from "../Button";

type IconName =
  | "MdDashboard"
  | "MdHome"
  | "MdPeople"
  | "MdReceiptLong"
  | "MdSettings";

export type SidebarItem = {
  label: string;
  href: string;
  icon?: IconName;
};

const iconMap: Record<IconName, React.ReactNode> = {
  MdDashboard: <MdDashboard size={20} />,
  MdHome: <MdHome size={20} />,
  MdPeople: <MdPeople size={20} />,
  MdReceiptLong: <MdReceiptLong size={20} />,
  MdSettings: <MdSettings size={20} />,
};

export type SidebarProps = {
  items: SidebarItem[];
  isOpen?: boolean;
  onClose?: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between px-2 py-3 border-b-1  border-amber-900">
            <div className="text-xl font-semibold ">Dashboard</div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors -mr-2"
              aria-label="Close menu"
            >
              <MdClose size={24} />
            </button>
          </div>
          <ul className="space-y-1">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
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
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="error"
            size="md"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2"
          >
            <MdLogout size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </nav>
    </>
  );
};
