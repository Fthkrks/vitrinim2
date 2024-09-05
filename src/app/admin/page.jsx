"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {  useContext, useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../../config/index";
import FormContent from "./_components/formcontent";
import MobilePreview from "./_components/mobilepreview";
import { UserDetailContext } from "../_context/UserStatesContext";
function Admin() {
  const router = useRouter();
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);


  let email = user?.emailAddresses[0].emailAddress;

  useEffect(() => {
    user&&checkUser();
  }, [user]);


  const checkUser = async () => {
    axios
      .get(`${APP_URL}/user`, {params: {email}})
      .then((res) => {
        const data = res.data.data.user;
        if (data === null) {
          router.replace("/create");
        }
        GetUserDetails()

      })
      .catch((err) => {
        console.log(err);
      });
  };


  const GetUserDetails = async () => {
    axios.get(`${APP_URL}/userstartups`, { params: { email } }).then((res) => {
      setUserDetail(res.data.data.userStartups);
    });
  };
  

  return (
    <div className=" py-12 px-6 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2">
          <FormContent />
        </div>
        <div>
          <MobilePreview />
        </div>
      </div>
    </div>
  );
}

export default Admin;
