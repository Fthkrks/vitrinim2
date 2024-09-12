import { TwicPicture } from "@twicpics/components/react";
import { MapPin, Share } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { BASE_URL } from "../../../config";
import toast from "react-hot-toast";


function UserDetailInfo({ userDetail }) {

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${BASE_URL}/${userDetail[0].username}`)
      .then(() => {
        toast.success('Link kopyalandı!');
      })
      .catch(err => {
        toast.error('Link kopyalanırken hata oluştu:', err);
      });
  };



  return (
    <div className="flex flex-col justify-center md:h-screen">
      <div className="w-full flex items-center justify-between">
        <div className="flex md:flex-col items-center md:items-start gap-4">
          <TwicPicture
            src={userDetail[0]?.avatar}
            className={`w-[90px] md:w-[130px] h-[90px] md:h-[130px] rounded-full ${
              !userDetail[0].avatar && "hidden"
            }`}
          />
          <div className="flex flex-col gap-4 mt-3">
            <h2
              className={`font-bold text-lg md:text-2xl ${
                !userDetail[0].name && "hidden"
              }`}
            >
              {userDetail[0]?.name}
            </h2>
            <h2
              className={`flex gap-2 items-center text-gray-500 ${
                !userDetail[0].location && "hidden"
              }`}
            >
              <MapPin /> {userDetail[0]?.location}
            </h2>
            <div>
              <button onClick={handleCopyClick} className="md:hidden btn btn-secondary btn-sm" >
                <Share className="w-3 h-3" /> Paylaş
              </button>
              <div className="mt-10 flex items-center justify-between text-xl">
                {userDetail[0]?.twitter && (
                  <Link
                    href={userDetail[0].twitter}
                    target="_blank"
                    className="w-15 h-15"
                  >
                    <FaXTwitter className="" />
                  </Link>
                )}
                {userDetail[0]?.instagram && (
                  <Link
                    href={userDetail[0].instagram}
                    target="_blank"
                    className="w-15 h-15"
                  >
                    <FaInstagram className="" />
                  </Link>
                )}
                {userDetail[0]?.youtube && (
                  <Link
                    href={userDetail[0].youtube}
                    target="_blank"
                    className="w-15 h-15"
                  >
                    <FaYoutube className="" />
                  </Link>
                )}
                {userDetail[0]?.linkedin && (
                  <Link
                    href={userDetail[0].linkedin}
                    target="_blank"
                    className="w-15 h-15"
                  >
                    <FaLinkedinIn className="" />
                  </Link>
                )}
                {userDetail[0]?.github && (
                  <Link
                    href={userDetail[0].github}
                    target="_blank"
                    className="w-15 h-15"
                  >
                    <FaGithub className="" />
                  </Link>
                )}
                {userDetail[0]?.tiktok && (
                  <Link
                    href={userDetail[0].tiktok}
                    target="_blank"
                    className="w-15 h-15"
                  >
                    <FaTiktok className="" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="my-7 ">{userDetail[0]?.bio}</h2>
    </div>
  );
}

export default UserDetailInfo;
