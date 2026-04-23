"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdHome,
  MdPeople,
  MdReceiptLong,
  MdSettings,
  MdClose,
  MdLogout,
  MdAdd,
  MdList,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../Button";

type IconName =
  | "MdDashboard"
  | "MdHome"
  | "MdPeople"
  | "MdReceiptLong"
  | "MdSettings"
  | "MdAdd"
  | "MdList";

const iconMap: Record<IconName, React.ReactNode> = {
  MdDashboard: <MdDashboard />,
  MdHome: <MdHome />,
  MdPeople: <MdPeople />,
  MdReceiptLong: <MdReceiptLong />,
  MdSettings: <MdSettings />,
  MdAdd: <MdAdd />,
  MdList: <MdList />,
};

export type SidebarItem = {
  label: string;
  href: string;
  icon?: IconName;
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

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        className={`fixed inset-y-0 left-0 z-[110] lg:z-30 w-64 bg-slate-950/40 backdrop-blur-2xl border-r border-white/5 transform transition-all duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 shrink-0">
                <Image 
                  src="/soil2.png" 
                  alt="Soil Portal Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-white tracking-wider leading-none uppercase">
                  Static Soil
                </span>
                <span className="text-[11px] font-bold text-blue-500 tracking-[0.2em] leading-none uppercase mt-1">
                  Lab
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <MdClose size={22} />
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onClose && onClose()}
                  className={`group flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-medium transition-all duration-300 border ${
                    active
                      ? "bg-blue-600/10 text-blue-400 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.03] border-transparent"
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                    active ? "bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-110" : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <span className={`transition-all duration-300 ${active ? "text-blue-400 scale-110" : "text-slate-400 group-hover:text-slate-200"}`}>
                      {item.icon ? React.cloneElement(iconMap[item.icon] as React.ReactElement<any>, { size: 18 }) : null}
                    </span>
                  </div>
                  <span className="tracking-wide">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-white/[0.01]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl text-[13px] font-bold text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group uppercase tracking-[0.1em]"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/10 transition-all">
               <MdLogout size={16} className="transition-transform group-hover:-translate-x-1" />
            </div>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};
