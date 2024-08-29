import { UserButton } from "@clerk/nextjs";
import { BarChart, Brush, Layers3, Settings } from "lucide-react";
import React from "react";

function SideNav() {
  const menList = [
    {
      id: 1,
      name: "Pages",
      icon: Layers3,
    },
    {
      id: 2,
      name: "Style",
      icon: Brush,
    },
    {
      id: 3,
      name: "Stats",
      icon: BarChart,
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <div className="p-4 bg-[#00000052] h-screen">
        {menList.map((menu, index) => (
          <div key={index}
            className="p-2 cursor-pointer  hover:bg-accent transition-all py-4 rounded-lg bg-primary flex items-center justify-center mb-5 tooltip tooltip-right tooltip-secondary"
            data-tip={menu.name}
          >
            <menu.icon className="text-white text-center" />
          </div>
        ))}
        <div className="fixed bottom-5 text-center px-4">
          <UserButton />
        </div>
      </div>
    </>
  );
}

export default SideNav;
