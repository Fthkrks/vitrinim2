"use client";
import React, { useContext, useEffect } from "react";
import ProjectList from "./_components/ProjectList";
import UserDetailInfo from "./_components/UserDetailInfo";
import { UserDetailContext } from "../_context/UserStatesContext";
import axios from "axios";
import { APP_URL } from "../../config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

function UserPage() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  let username = userDetail[0]?.username;
  const pathname = usePathname();
  const currentUsername = pathname.split("/").pop();

  useEffect(() => {
    currentUsername && GetUserDetail();
  }, [currentUsername, username]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault(); // ESC tuşuna basıldığında varsayılan davranışı engelle
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const GetUserDetail = async () => {
    axios
      .get(`${APP_URL}/userstartups`, { params: { currentUsername } })
      .then((res) => {
        let data = res.data.data?.userStartups;
        if (data?.length == 0) {
          router.replace("/404");
        }
        if (!data[0]?.payment) {
          const modal = document.getElementById("my_modal_1");
          if (modal && typeof modal.showModal === "function") {
            modal.showModal();
          } else {
            console.warn(
              "showModal method is not supported or the modal element is not found."
            );
          }
        }

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
    <div
      className={`p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5 ${
        !userDetail[0]?.payment && "blur-xl"
      }`}
    >
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box py-20 ">
          <h3 className="font-bold text-2xl">Vitrininizi yayınlamak için hesabınızı yükseltin!</h3>
          <p className="py-8">
            Startuplarını tek panelde toplayıp çeşitli platformlara paylaşarak bilinirliğini artırabilirsin!
          </p>
          <Link href="/upgrade" className="btn btn-primary border-none text-center z-40 text-white w-full">
          Vitrinimi yayınla
          </Link>
        </div>
      </dialog>
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
