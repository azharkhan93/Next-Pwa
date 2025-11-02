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
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
                  <MdDashboard className="text-white" size={20} />
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Dashboard
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Close menu"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>
          <div className="px-4 pb-4">
            <ul className="space-y-1.5">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (onClose) onClose();
                      }}
                      className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1"
                      }`}
                    >
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                      )}
                      <span
                        className={`transition-transform duration-200 ${
                          active
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                        }`}
                      >
                        {item.icon ? iconMap[item.icon] : null}
                      </span>
                      <span
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-white font-semibold"
                            : "font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="p-4 pt-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <Button
            variant="error"
            size="md"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <MdLogout size={18} />
            <span className="font-semibold">Logout</span>
          </Button>
        </div>
      </nav>
    </>
  );
};
