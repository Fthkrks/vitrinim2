import React, { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "../../../_context/UserStatesContext";
import { APP_URL } from "../../../../config";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";



function UniqueVisitors() {

  const { user } = useUser();
  const userObject = useContext(UserDetailContext);
  const userDetail = userObject.userDetail;
  const userId = userDetail[0]?._id;
  const [totalClicks, setTotalClicks] = useState({});

  

  useEffect(() => {
    user && GetTotalVisitors();
  }, [user, userId]);

  const GetTotalVisitors = async () => {
    axios
      .get(`${APP_URL}/startupsclick`, { params: { userId } })
      .then((res) => {
        let data = res.data.data.startupClicks;
        const result = data.reduce((acc, obj) => {
            const month = obj.month.toLowerCase(); // Ayları küçük harf yaparak normalize ediyoruz
            if (acc[month]) {
                acc[month] += obj.totalClick;
            } else {
                acc[month] = obj.totalClick;
            }
            return acc;
        }, {});
        const formattedData = Object.keys(result).map(month => {
          return {
              month: month,
              totalClick: result[month]
          };
      });
        

        setTotalClicks(formattedData);
        
        
      });
  };

  
  


  return (
    <div className="border rounded-lg p-7 ">
      <h2 className="font-bold text-lg my-3">Toplam Ziyaretciler</h2>
    <ResponsiveContainer width={"100%"} height={250}>
      <AreaChart
        data={totalClicks}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>

        </defs>
        <XAxis dataKey="month" className="text-[10px]" />
        <YAxis className="text-[10px]" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="totalClick"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />

      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}

export default UniqueVisitors