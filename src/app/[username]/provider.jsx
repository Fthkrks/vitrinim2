"use client";
import { useUser } from "@clerk/nextjs";
import React, { useContext } from "react";
import { UserDetailContext } from "../_context/UserStatesContext";

function Provider({ children }) {
  const { user } = useUser();
  let email = user?.emailAddresses[0].emailAddress;

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div
      data-theme={userDetail[0]?.theme}
      style={{
        height: "100vh",
        overflowY: "scroll",
        msOverflowStyle: "none" /* Internet Explorer 10+ */,
        scrollbarWidth: "none" /* Firefox */,
      }}
    >
      {children}
    </div>
  );
}

export default Provider;
