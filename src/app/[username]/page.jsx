"use client";
import React, { useContext } from "react";
import ProjectList from "./_components/ProjectList";
import UserDetailInfo from "./_components/UserDetailInfo";
import { UserDetailContext } from "../_context/UserStatesContext";

function UserPage() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  

  return (
    <div className="p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5 ">
      <div>
        <UserDetailInfo userDetail={userDetail} />
      </div>
      <div className="md:col-span-2">
        <ProjectList startupList={userDetail[0]?.Startups} />
      </div>
    </div>
  );
}

export default UserPage;
