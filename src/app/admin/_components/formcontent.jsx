import React, { useEffect, useState } from 'react'
import BasicDetail from "./basicdetail";
import AddProject from "./addproject";
import ProjectEdit from "./projectedit"
import axios from 'axios';
import { APP_URL } from '../../../config';
import { useUser } from '@clerk/nextjs';
import SocialMedia from "./SocialMedia";


function FormContent() {
  const [startupDetails, setStartupDetails] = useState([]);
  const {user} = useUser();
  let email = user?.emailAddresses[0].emailAddress

  

  useEffect(() =>{
    user&&GetProjectList();
  },[user]);

  const GetProjectList = async()=>{
    axios.get(`${APP_URL}/startups` ,{params: {email}}).then(res =>{
      
      setStartupDetails(res.data.data.startup)
      
    }).catch(err =>{
      console.log(err);
      
    })
  }

  


  return (
    <div>
      <h2 className='text-3xl font-bold'>Vitrine Bir şeyler Ekle</h2>
      <span className='textarea-md'>Kurduğun başarılı startuplarını ekleyerek vitrinde sergileyebilirsin</span>
      <BasicDetail/>
      <hr className='my-5  opacity-40'></hr>
      <AddProject refreshData={GetProjectList}/>
      <ProjectEdit startupDetails ={startupDetails} setStartupDetails={setStartupDetails} refreshData={GetProjectList} />
      <hr className='my-5  opacity-40'></hr>
      <SocialMedia />
    </div>
  )
}

export default FormContent