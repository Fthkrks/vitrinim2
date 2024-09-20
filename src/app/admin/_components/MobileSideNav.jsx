"use client";
import { UserButton } from "@clerk/nextjs";
import { BarChart, Brush, Layers3, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MobileSideNav() {
  const pathname = usePathname();

  const menList = [
    {
      id: 1,
      name: "Pages",
      icon: Layers3,
      path: "/admin",
    },
    {
      id: 2,
      name: "Style",
      icon: Brush,
      path: "/admin/style",
    },
    {
      id: 3,
      name: "Stats",
      icon: BarChart,
      path: "/admin/analytics",
    },
  ];

  return (
    <div className="fixed z-50 ">
      <div className="drawer z-50 ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary text-white drawer-button">
            <Menu />
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-[#00000052]  text-base-content min-h-full w-24 p-4 z-50 ">
            {menList.map((menu, index) => {
              const isActive = pathname === menu.path;
              return (
                <Link
                  href={menu.path}
                  key={index}
                  className={`p-2 cursor-pointer ${
                    isActive ? "bg-accent" : "bg-primary"
                  } hover:bg-accent transition-all py-4 rounded-lg flex items-center justify-center mb-5 tooltip tooltip-right tooltip-secondary`}
                  data-tip={menu.name}
                >
                  <menu.icon className="text-white text-center" />
                </Link>
              );
            })}

            <div className="fixed bottom-5 text-center px-4">
              <UserButton />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileSideNav;
