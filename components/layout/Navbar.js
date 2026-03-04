"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  // Dynamic title based on route
  const getTitle = () => {

    if (pathname.includes("dashboard")) return "Dashboard";
    if (pathname.includes("bookings")) return "Bookings";
    if (pathname.includes("payment")) return "Payment";
    if (pathname.includes("admin")) return "Admin";

    return "Dashboard";
  };

  return (
    <header
      className="
        h-16
        bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800
        border-b border-white/5
        flex items-center justify-between
        px-8
        sticky top-0 z-40
        shadow-lg
      "
    >

      {/* Page Title */}
      <h1
        className="
          text-white
          font-semibold
          text-lg
          tracking-wide
          bg-indigo-600
          px-4 py-1
          rounded-md
          shadow
        "
      >
        {getTitle()}
      </h1>


    

    </header>
  );
}