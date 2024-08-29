
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { APP_URL } from '../../config';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'

function CreateUsername() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const {user} = useUser();

  let fullname = `${user?.firstName} ${user?.lastName}`
  let email = user?.emailAddresses[0].emailAddress

  useEffect(() => {
    if (user) {
      const checkUser = async () => {
         axios.get(`${APP_URL}/user`).then(result =>{
          const data = result.data.data                    
          if(data !== null){            
            router.replace("/admin")
          }          
          
        }).catch(err =>{
          console.log(err);
          
        });
        
      };

      checkUser();
    }
  }, [user, router]);




  const onCreateBtnClick = () =>{
    
    if(username.length >10){
      toast.error("Adınız 10 karakterden fazla olmamalı", {position: "top-right"})
      return
    };
    axios.post(`${APP_URL}/user`, {username, fullname, email}).then(res =>{
      return res.data;
    }).catch(err =>{
      console.log(err);
      
    })
    router.replace("/admin")


  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-10 border rounded-lg flex flex-col'>
        <h2 className='font-bold text-2xl py-3 text-center'>Kullanıcı Adını Ekle</h2>
        <label className='py-2'>Vitrin sayfan için etkileyici bir kullanıcı adı eklemelisin</label>
        <input type="text" onChange={(e) =>setUsername(e.target.value)} placeholder="Type here" className="input input-bordered w-full  py-2" />
        <button disabled={!username} onClick={() =>onCreateBtnClick()} className='btn btn-primary mt-3'>Ekle</button>
      </div>
    </div>
  )
}

export default CreateUsername