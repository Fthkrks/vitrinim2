import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { UserDetailContext } from "../../_context/UserStatesContext";
import { useUser } from "@clerk/nextjs";
import { APP_URL } from "../../../config";
import axios from "axios";
import toast from "react-hot-toast";
import { PreviewUpdateContext } from "../../_context/PreviewUpdateContext";

function SocialMedia() {
  const { user } = useUser();
  let email = user?.emailAddresses[0]?.emailAddress;
  const [selectedOption, setSelectedOption] = useState("");
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    const handleClickOut = (e) => {
      const optionElement = document.getElementById("extra-container3");
      if (optionElement && !optionElement.contains(e.target)) {
        setSelectedOption("");
      }
    };
    window.addEventListener("click", handleClickOut);
    return () => {
      window.removeEventListener("click", handleClickOut);
    };
  }, []);

  const onInputChange = (e, name) => {
    clearTimeout(timeoutIdRef.current);

    const value = e.target.value || null;

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

  return (
    <div className="flex flex-col w-full" id="extra-container3">
      <div className="flex justify-evenly ">
        <FaXTwitter
          className={`hover:bg-gray-600 w-12 h-12 p-3 rounded-md transition-all cursor-pointer ${
            selectedOption === "twitter" && "bg-gray-600"
          } ${userDetail[0]?.twitter && "text-pink-500"}`}
          onClick={() => {
            setSelectedOption("twitter");
          }}
        />
        <FaInstagram
          className={`hover:bg-gray-600 w-12 h-12 p-3 rounded-md transition-all cursor-pointer ${
            selectedOption === "instagram" && "bg-gray-600"
          } ${userDetail[0]?.instagram && "text-pink-500"}`}
          onClick={() => {
            setSelectedOption("instagram");
          }}
        />
        <FaYoutube
          className={`hover:bg-gray-600 w-12 h-12 p-3 rounded-md transition-all cursor-pointer ${
            selectedOption === "youtube" && "bg-gray-600"
          } ${userDetail[0]?.youtube && "text-pink-500"}`}
          onClick={() => {
            setSelectedOption("youtube");
          }}
        />
        <FaLinkedinIn
          className={`hover:bg-gray-600 w-12 h-12 p-3 rounded-md transition-all cursor-pointer ${
            selectedOption === "linkedin" && "bg-gray-600"
          } ${userDetail[0]?.linkedin && "text-pink-500"}`}
          onClick={() => {
            setSelectedOption("linkedin");
          }}
        />
        <FaGithub
          className={`hover:bg-gray-600 w-12 h-12 p-3 rounded-md transition-all cursor-pointer ${
            selectedOption === "github" && "bg-gray-600"
          } ${userDetail[0]?.github && "text-pink-500"}`}
          onClick={() => {
            setSelectedOption("github");
          }}
        />
        <FaTiktok
          className={`hover:bg-gray-600 w-12 h-12 p-3 rounded-md transition-all cursor-pointer ${
            selectedOption === "tiktok" && "bg-gray-600"
          } ${userDetail[0]?.tiktok && "text-pink-500"}`}
          onClick={() => {
            setSelectedOption("tiktok");
          }}
        />
      </div>
      <div className="mt-3 w-full">
        {selectedOption === "twitter" && (
          <label>
            <h2>Twitter</h2>
            <input
              type="url"
              key={1}
              defaultValue={userDetail[0]?.twitter}
              className="input input-bordered w-full "
              placeholder="https://"
              onChange={(e) => onInputChange(e, "twitter")}
            />
          </label>
        )}
        {selectedOption === "instagram" && (
          <label>
            <h2>Instagram</h2>
            <input
              type="url"
              key={1}
              defaultValue={userDetail[0]?.instagram}
              className="input input-bordered w-full "
              placeholder="https://"
              onChange={(e) => onInputChange(e, "instagram")}
            />
          </label>
        )}
        {selectedOption === "youtube" && (
          <label>
            <h2>Youtube</h2>
            <input
              type="text"
              key={1}
              defaultValue={userDetail[0]?.youtube}
              className="input input-bordered w-full "
              placeholder="https://"
              onChange={(e) => onInputChange(e, "youtube")}
            />
          </label>
        )}
        {selectedOption === "linkedin" && (
          <label>
            <h2>Linkedin</h2>
            <input
              type="text"
              key={1}
              defaultValue={userDetail[0]?.linkedin}
              className="input input-bordered w-full "
              placeholder="https://"
              onChange={(e) => onInputChange(e, "linkedin")}
            />
          </label>
        )}
        {selectedOption === "github" && (
          <label>
            <h2>Github</h2>
            <input
              type="text"
              key={1}
              defaultValue={userDetail[0]?.github}
              className="input input-bordered w-full "
              placeholder="https://"
              onChange={(e) => onInputChange(e, "github")}
            />
          </label>
        )}
        {selectedOption === "tiktok" && (
          <label>
            <h2>Tıktok</h2>
            <input
              type="text"
              key={1}
              defaultValue={userDetail[0]?.tiktok}
              className="input input-bordered w-full "
              placeholder="https://"
              onChange={(e) => onInputChange(e, "tiktok")}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default SocialMedia;
