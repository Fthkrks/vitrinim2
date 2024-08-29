"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { APP_URL } from "../../config";
import { useUser } from "@clerk/nextjs";
import {UserDetailContext} from "../_context/UserDetailContext";


function Provider({ children }) {
  const [userDetail, setUserDetail] = useState([]);
  const { user } = useUser();
  let email = user?.emailAddresses[0]?.emailAddress;
  const GetUserDetails = () => {
    axios
      .get(`${APP_URL}/user2`, {
        params: { email },
      })
      .then((res) => {
        setUserDetail(res.data.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  useEffect(() => {
    if (user) {
      GetUserDetails();
    }
  }, [user]);


  return (
    <div>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <div>{children}</div>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
