"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { APP_URL } from "../config";
import {
  UserDetailContext,
  UserStartupsContext,
} from "./_context/UserStatesContext";

function Provider({ children }) {
  const [userDetail, setUserDetail] = useState({});
  const { user } = useUser();
  let email = user?.emailAddresses[0]?.emailAddress;


  useEffect(() =>{
    user&&GetUserDetails()
  },[user])

  const GetUserDetails = async () => {
    axios.get(`${APP_URL}/userstartups`, { params: { email } }).then((res) => {
      setUserDetail(res.data.data.userStartups);
    });
  };



  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
