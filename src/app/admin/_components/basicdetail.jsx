"use client";
import axios from "axios";
import { Camera, Link2, MapPin } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { APP_URL, FIREBASE_URL } from "../../../config";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";
import { TwicPicture } from "@twicpics/components/react";
import { UserDetailContext } from "../../_context/UserStatesContext";
import {PreviewUpdateContext} from "../../_context/PreviewUpdateContext";
function BasicDetail() {

  const timeoutIdRef = useRef(null);
  const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [profileImage, setProfileImage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  


  const { user } = useUser();
  let email = user?.emailAddresses[0].emailAddress;

  useEffect(() => {
    if (userDetail) {
      setProfileImage(userDetail[0]?.avatar);
    }
    

    const handleClickOut = (e) => {
      const optionElement = document.getElementById("extra-container");
      if (optionElement && !optionElement.contains(e.target)) {
        setSelectedOption("");
      }
    };
    window.addEventListener("click", handleClickOut);
    return () => {
      window.removeEventListener("click", handleClickOut);
    };
  }, [user ,userDetail]);

  const onInputChange = (e, name) => {
    clearTimeout(timeoutIdRef.current);

    let value = e.target.value || null;

    timeoutIdRef.current = setTimeout(() => {
      axios
        .put(`${APP_URL}/user`, { email, [name]: value })
        .then((res) => {
          toast.success("Kaydedildi!", { position: "top-right" });
          setUpdatePreview(updatePreview + 1);
          setUserDetail([{...userDetail[0], [name]: value}, ...userDetail.slice(1)])

        })
        .catch((error) => {
          toast.error("Hata!", { position: "top-right" });
        });
    }, 1000);
  };

  const handleFileUpload = (e) => {
    console.log(e);
    
    const file = e.target.files[0];
    const avatar = Date.now().toString() + "." + file.type.split("/")[1];
    const storageRef = ref(storage, avatar);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      axios
        .put(`${APP_URL}/user`, { email, avatar })
        .then((res) => {
          toast.success("Kaydedildi!", { position: "top-right" });
          setProfileImage(avatar + "?alt=media");
          setUpdatePreview(updatePreview + 1);

        })
        .catch((error) => {
          toast.error("Hata!", { position: "top-right" });
        });
    });
  };

  
  


  return (
    <div className="p-7 flex flex-col gap-y-3 rounded-lg bg-gray-800 my-7">
      <div className="flex gap-6 items-center w-full">
        {profileImage ? (
          <label htmlFor="file-input">
            {/* <Image
              className="rounded-full cursor-pointer"
              src={FIREBASE_URL + profileImage}
              width={50}
              height={50}
              alt="profileImage"
            /> */}
            <TwicPicture src={profileImage} className="w-12 h-12 rounded-full cursor-pointer"></TwicPicture>
          </label>
        ) : (
          <label htmlFor="file-input" className="cursor-pointer">
            <Camera className="p-3 h-12 w-12 bg-gray-500 rounded-full" />
          </label>
        )}
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          id="file-input"
          className="hidden"
        />
        <input
          type="text"
          defaultValue={userDetail[0]?.name}
          onChange={(e) => onInputChange(e, "name")}
          placeholder="Ad Soyad"
          className="input input-bordered w-full"
        />
      </div>
      <textarea
        defaultValue={userDetail[0]?.bio}
        onChange={(e) => onInputChange(e, "bio")}
        className="textarea textarea-bordered"
        placeholder="Hakkında birşeyler yaz"
      ></textarea>
      <div className="mt-6" id="extra-container">
        <div className="flex gap-2">
          <MapPin
            className={`w-11 h-11 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-all ${
              selectedOption === "location" && "bg-gray-600"
            }`}
            onClick={() => {
              setSelectedOption("location");
            }}
          />
          <Link2
            className={`w-11 h-11 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-all ${
              selectedOption === "revenue" && "bg-gray-600"
            }`}
            onClick={() => {
              setSelectedOption("revenue");
            }}
          />
        </div>
        <div className="mt-3">
          {selectedOption === "location" ? (
            <label
              className={`input input-bordered flex items-center gap-2 ${
                selectedOption !== "location" && "hidden"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <input
                type="text"
                key={1}
                defaultValue={userDetail[0]?.location}
                className="grow"
                placeholder="Lokasyon ?"
                onChange={(e) => onInputChange(e, "location")}
              />
            </label>
          ) : (
            <label
              className={`input input-bordered flex items-center gap-2 ${
                selectedOption !== "revenue" && "hidden"
              }`}
            >
              <Link2 className="w-5 h-5" />
              <input
                type="number"
                key={2}
                defaultValue={userDetail[0]?.revenue}
                className="grow"
                placeholder="Gelirin ?"
                onChange={(e) => onInputChange(e, "revenue")}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicDetail;
