"use client";
import React, { useContext, useEffect, useState } from "react";
import ProjectList from "./_components/ProjectList";
import UserDetailInfo from "./_components/UserDetailInfo";
import { UserDetailContext } from "../_context/UserStatesContext";
import axios from "axios";
import { APP_URL } from "../../config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { CircleX } from "lucide-react";

function UserPage() {
  const { user } = useUser();
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  let email = user?.emailAddresses[0]?.emailAddress;
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    user && GetUserDetail();
  }, [user]);

  useEffect(() => {
    if (window.self !== window.top) {
      setIsIframe(true);
    }
  }, []);

  const GetUserDetail = async () => {
    axios.get(`${APP_URL}/userstartups`, { params: { email } }).then((res) => {
      let data = res.data.data.userStartups;

      setUserDetail(data);
    });
  };

  if (!userDetail[0]) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-center"></span>
      </div>
    );
  }

  return (
    <div className="p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <UserDetailInfo userDetail={userDetail} />
      </div>
      <div className="md:col-span-2">
        <ProjectList startupList={userDetail[0]?.Startups} />
      </div>
      {!isIframe && (
        <div className="md:hidden flex justify-center " id="admin-page-button">
          <Link
            href="/admin"
            className="md:hidden fixed bottom-4   btn btn-primary text-white"
          >
            <CircleX />
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserPage;
