
"use client"
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { APP_URL } from '../../config';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '../_context/UserStatesContext';

function CreateUsername() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const {user} = useUser();

  let fullname = `${user?.firstName} ${user?.lastName}`
  let email = user?.emailAddresses[0].emailAddress

  useEffect(() => {
    user&&checkUser();
  }, [user]);


  const checkUser = async () => {
    try {
      axios.get(`${APP_URL}/user`).then(result =>{
        const data = result.data.data.user
        
        if(data !== null){
          router.replace("/admin")
        } 
         
      }).catch(err =>{
        console.log(err);

        
      });
    } catch (error) {
      console.log("this error create checkuser function", error);
      
      
    }

   
 };


 const onCreateBtnClick = () => {

  // Kullanıcı adında boşluk var mı kontrolü
  const formattedUsername = username.replace(/\s+/g, ''); // Boşlukları kaldır

  if (formattedUsername.length > 10) {
    toast.error("Adınız 10 karakterden fazla olmamalı", { position: "top-right" });
    return;
  };

  axios.post(`${APP_URL}/user`, { username: formattedUsername, fullname, email }).then(res => {

    let data = res.data;

    if (data.code === 409) {
      toast.error("Bu kullanıcı adı kullanılmış, başka bir ad deneyiniz!");
      return;
    }

    router.replace("/admin");

  }).catch(err => {
    console.log(err);
  });
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