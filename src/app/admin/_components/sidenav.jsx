"use client";
import { UserButton } from "@clerk/nextjs";
import { BarChart, Brush, Layers3, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function SideNav() {
  const pathname = usePathname();

  const menList = [
    {
      id: 1,
      name: "Pages",
      icon: Layers3,
      path: "/admin"
    },
    {
      id: 2,
      name: "Style",
      icon: Brush,
      path: "/admin/style"
    },
    {
      id: 3,
      name: "Stats",
      icon: BarChart,
      path: "/admin/analytics"
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/admin/settings"
    },
  ];

  return (
    <div className="p-4 bg-[#00000052] h-screen">
      {menList.map((menu, index) => {
        const isActive = pathname === menu.path;
        
        return (
          <Link
            href={menu.path}
            key={index}
            className={`p-2 cursor-pointer ${isActive ? "bg-accent" : "bg-primary"} hover:bg-accent transition-all py-4 rounded-lg  flex items-center justify-center mb-5 tooltip tooltip-right tooltip-secondary`}
            data-tip={menu.name}
          >
            <menu.icon className="text-white text-center" />
          </Link>
        );
      })}
      <div className="fixed bottom-5 text-center px-4">
        <UserButton />
      </div>
    </div>
  );
}

export default SideNav;
