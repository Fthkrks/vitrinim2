import { TwicPicture } from "@twicpics/components/react";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { APP_URL } from "../../../config";
import moment from "moment";
import toast from "react-hot-toast";
import AnalytiCharts from "./AnalytiCharts";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../../_context/UserStatesContext";
import { PreviewUpdateContext } from "../../_context/PreviewUpdateContext";

function ProjectList({ startupList }) {
  const { user } = useUser();
  const [sortedStartupList, setSortedStartupList] = useState([]);
  const [startupClicklData, setStartupClickData] = useState([]);
  const userObject = useContext(UserDetailContext);
  const userDetail = userObject.userDetail;

  const userId = userDetail[0]?._id;

  useEffect(() => {
    // startupList sıralanıyor
    if (startupList?.length > 0) {
      const sortedList = [...startupList].sort((a, b) => a.order - b.order);
      setSortedStartupList(sortedList);
    }
  }, [startupList]);

  useEffect(() => {
    user && StartupAnalyticData();
  }, [user, userId]);

  const onStartupsClick = async (startup) => {
    let id = startup._id;
    let name = startup.name;
    let month = moment().format("MMM");

    axios
      .post(`${APP_URL}/startupsclick`, { id, userId, name, month })
      .then((res) => {
        if (res.data.data.startupClicks) {
          setStartupClickData([res.data.data.startupClicks]);
        }
        StartupAnalyticData();

        window.open(startup.url, "_blank");
      })
      .catch((err) => {
        toast.error("Hata!");
      });
  };

  const StartupAnalyticData = async () => {
    axios
      .get(`${APP_URL}/startupsclick`, { params: { userId } })
      .then((res) => {
        setStartupClickData(res.data.data.startupClicks);
      });
  };

  const StartupWiseAnalyticData = (startupId) => {
    if (!Array.isArray(startupClicklData)) {
      return;
    }

    let resp = startupClicklData.filter(
      (startup) => startup?.startupRef == startupId
    );

    let result = [];

    const finalResult = [...result, ...resp];

    result.push(resp[0]);

    return finalResult;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10 my-8">
      {sortedStartupList?.map((startup, index) => (
        <div
          onClick={() => onStartupsClick(startup)}
          className="border border-base-300 shadow-sm relative rounded-lg p-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
          key={index}
        >
          <div className={`w-3 h-3 tooltip flex justify-end absolute top-3 right-5  rounded-full ${startup?.active ? "bg-green-500" : "bg-red-500"}`} data-tip={startup?.active ? "Yayında" : "Yayında Değil" }></div>
          <div className="flex gap-2 items-center">
            <div>
            <TwicPicture
              src={startup?.logo}
              className="w-[30px] h-[30px] rounded-full"
            />
            </div>

            <h2 className="font-bold flex w-full justify-between items-center">
              {startup?.name}
            </h2>
            <div className={`${!startup.category && "hidden"} w-1/2`}>
              <span className="hidden lg:flex items-center text-md font-normal text-base-100 badge badge-primary w-full rounded-full">
                {startup?.category}
              </span>
            </div>
          </div>
          <h2 className="text-base-content/80 text-xs lg:text-sm my-2">
            {startup?.desc}
          </h2>
          {startup?.chart && (
            <AnalytiCharts data={StartupWiseAnalyticData(startup._id)} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
