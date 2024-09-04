"use client";
import React, { useContext, useEffect, useState } from "react";
import Themes from "../../../_data/Themes";
import axios from "axios";
import { APP_URL } from "../../../../config";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { UserDetailContext } from "../../../_context/UserStatesContext";
import { PreviewUpdateContext } from "../../../_context/PreviewUpdateContext";

function ThemeOptions() {
  const { user } = useUser();
  const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);

  let email = user?.emailAddresses[0].emailAddress;
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedTheme, setSelectedTheme] = useState("");

  useEffect(() =>{
    setSelectedTheme(userDetail[0]?.theme)
  }, [userDetail])

  const onThemeSelect = async (theme) => {
    axios
      .put(`${APP_URL}/user`, { theme, email })
      .then((res) => {
        console.log(res);
        setSelectedTheme(theme);
        toast.success("Kaydedildi!");
        setUpdatePreview(updatePreview +1)
      })
      .catch((err) => {
        toast.error("Hata!");
      });
  };
  return (
    <div>
      <h2 className="font-bold text-3xl py-10">Vitrinin Temasını seç</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
        {Themes.map((theme, index) => (
          <div
            className={`flex p-3 bg-gray-800 ${
              (
                selectedTheme == theme.theme) &&
              "border rounded-lg"
            } rounded-lg cursor-pointer hover:scale-105 transition-all`}
            onClick={() => onThemeSelect(theme?.theme)}
          >
            <div
              className={`w-full  h-[40px] rounded-l-lg`}
              style={{ backgroundColor: theme.primary }}
            ></div>
            <div
              className={`w-full  h-[40px]`}
              style={{ backgroundColor: theme.secondary }}
            ></div>
            <div
              className={`w-full  h-[40px]`}
              style={{ backgroundColor: theme.accent }}
            ></div>
            <div
              className={`w-full  h-[40px]`}
              style={{ backgroundColor: theme.neutral }}
            ></div>
            <div
              className={`w-full  h-[40px] rounded-r-lg`}
              style={{ backgroundColor: theme["base-100"] }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeOptions;
