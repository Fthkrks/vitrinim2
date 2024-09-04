import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { APP_URL } from "../../../../config";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../../../_context/UserStatesContext";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function ProjectVisitors() {
  const { user } = useUser();
  const userObject = useContext(UserDetailContext);
  const userDetail = userObject.userDetail;
  const userId = userDetail[0]?._id;
  const [totalStartupClick, setTotalStartupClick] = useState([]);

  useEffect(() => {
    user && StartupsClick();
  }, [user]);

  const StartupsClick = () => {
    axios
      .get(`${APP_URL}/startupsclick`, { params: { userId } })
      .then((res) => {
        let data = res.data.data.startupClicks;
        const result = data.reduce((acc, obj) => {
          const name = obj.name.toLowerCase();

          if (acc[name]) {
            acc[name] += obj.totalClick;
          } else {
            acc[name] = obj.totalClick;
          }
          return acc;
        }, {});
        const formattedData = Object.keys(result).map((name) => {
          return {
            name: name,
            totalClick: result[name],
          };
        });
        setTotalStartupClick(formattedData);
      });
  };

  return (
    <div className="p-7 border rounded-lg">
      <h2 className="font-bold text-lg my-3">Toplam Startup Tıklama sayısı</h2>
      <ResponsiveContainer width={"100%"} height={250}>
      <BarChart  data={totalStartupClick}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalClick" label="toplam tıklama" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ProjectVisitors;
