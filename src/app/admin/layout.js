import React from "react";
import SideNav from "./_components/sidenav";
import Provider from "./provider";
import MobileSideNav from "./_components/MobileSideNav";
function AdminLayout({ children }) {
  return (
    <div>
      <div className="md:w-24  fixed ">
        <SideNav />
        <MobileSideNav/>
      </div>
      <div className="md:ml-24 ">
        <Provider>{children}</Provider>
      </div>
    </div>
  );
}

export default AdminLayout;
