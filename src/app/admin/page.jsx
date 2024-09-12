"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../../config/index";
import FormContent from "./_components/formcontent";
import MobilePreview from "./_components/mobilepreview";
import { UserDetailContext } from "../_context/UserStatesContext";
import Link from "next/link";
import { Sparkles } from "lucide-react";
function Admin() {
  const router = useRouter();
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  let email = user?.emailAddresses[0].emailAddress;

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    axios
      .get(`${APP_URL}/user`, { params: { email } })
      .then((res) => {
        const data = res.data.data.user;
        if (data === null) {
          router.replace("/create");
        }
        GetUserDetails();
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
        {!userDetail[0]?.payment && (
          <Link
            href="/upgrade"
            className="fixed top-2 right-4 p-3 text-white btn btn-secondary"
          >
            <Sparkles /> Yayınla
          </Link>
        )}
      </div>
    </div>
  );
}

export default Admin;
