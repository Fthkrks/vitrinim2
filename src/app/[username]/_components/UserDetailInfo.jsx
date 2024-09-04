import { TwicPicture } from "@twicpics/components/react";
import { MapPin, Share } from "lucide-react";
import React from "react";

function UserDetailInfo({ userDetail }) {

  


  return (
    <div className="flex flex-col justify-center md:h-screen">
      <div className="w-full flex items-center justify-between">
        <div className="flex md:flex-col items-center md:items-start gap-4">
          <TwicPicture
            src={userDetail[0]?.avatar}
            className="w-[90px] md:w-[130px] h-[90px] md:h-[130px] rounded-full"
          />
          <div className="flex flex-col gap-4 mt-3">
            <h2 className="font-bold text-lg md:text-2xl">
              {userDetail[0]?.name}
            </h2>
            <h2 className="flex gap-2 items-center text-gray-500">
              <MapPin /> {userDetail[0]?.location}
            </h2>
            <div>
            <button className="md:hidden btn btn-secondary btn-sm">
              <Share className="w-3 h-3" /> Paylaş
            </button>
          </div> 
          </div>

        </div>
      </div>
      <h2 className="my-7 ">{userDetail[0]?.bio}</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="E- postanı buraya yaz! "
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Abone Ol! </button>
      </div>
    </div>
  );
}

export default UserDetailInfo;
