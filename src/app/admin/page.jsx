"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../../config/index";
import FormContent from "./_components/formcontent";
import MobilePreview from "./_components/mobilepreview";
function Admin() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const checkUser = async () => {
        axios
          .get(`${APP_URL}/user`)
          .then((result) => {
            const data = result.data.data;
            if (data === null) {
              router.replace("/create");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

      checkUser();
    }
  }, [user, router]);

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
