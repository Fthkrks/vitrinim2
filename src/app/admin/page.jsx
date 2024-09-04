"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {  useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../../config/index";
import FormContent from "./_components/formcontent";
import MobilePreview from "./_components/mobilepreview";
function Admin() {
  const router = useRouter();
  const { user } = useUser();

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

      })
      .catch((err) => {
        console.log(err);
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
