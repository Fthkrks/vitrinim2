import React from "react";
import SideNav from "./_components/sidenav";
import Provider from "./provider";
function AdminLayout({ children }) {
  return (
    <div>
      <div className="w-24 fixed">
        <SideNav />
      </div>
      <div className="ml-24">
        <Provider>{children}</Provider>
      </div>
    </div>
  );
}

export default AdminLayout;
