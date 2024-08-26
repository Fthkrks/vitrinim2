"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../../config/index"; 

function Admin() {
  const { user } = useUser();
  const router = useRouter();



  useEffect(() => {
    if (user) {
      const checkUser = async () => {
         axios.get(`${APP_URL}/user`).then(result =>{
          const data = result.data.data                    
          if(data === null){            
            router.replace("/create")
          }          
          
        }).catch(err =>{
          console.log(err);
          
        });
        
      };

      checkUser();
    }
  }, [user, router]);

  return <div>Admin</div>;
}

export default Admin;
