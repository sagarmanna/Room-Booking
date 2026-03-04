"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Menu
} from "lucide-react";

import UserProfile from "@/components/UserProfile";

export default function Sidebar({ collapsed, setCollapsed }) {

  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Bookings", icon: Calendar, path: "/bookings" },
    { name: "Payment", icon: CreditCard, path: "/payment" }
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 85 : 240 }}
      transition={{ duration: 0.35 }}
      className="h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white border-r border-white/5 shadow-2xl"
    >

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-5 text-slate-400 hover:text-white transition"
      >
        <Menu />
      </button>

      {/* Menu */}
      <div className="flex flex-col gap-3 px-3">

        {menu.map((item, index) => {

          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link key={index} href={item.path}>

              <motion.div
                whileHover={{ scale: 1.04 }}
                className={`
                  flex items-center gap-3 p-3 rounded-xl
                  transition-all duration-300
                  ${
                    active
                      ? "bg-indigo-600 shadow-lg shadow-indigo-500/30"
                      : "hover:bg-white/10 text-slate-300"
                  }
                `}
              >
                <Icon size={20} />

                {!collapsed && (
                  <span className="font-medium">
                    {item.name}
                  </span>
                )}

              </motion.div>

            </Link>
          );
        })}

      </div>

      {/* Push profile to bottom */}
      <div className="flex-grow"></div>

      {/* User Profile */}
      {!collapsed && <UserProfile />}

    </motion.aside>
  );
}