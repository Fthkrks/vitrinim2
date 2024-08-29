import { Link2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { APP_URL } from "../../../config";
import axios from "axios";
import toast from "react-hot-toast";


function AddProject({refreshData}) {

    const userObject = useContext(UserDetailContext);

    const userDetail = userObject.userDetail
    const email = userDetail.email
    const id = userDetail._id
    
  const [isOpen, setIsOpen] = useState(false);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = e.target[0].value;
    axios.post(`${APP_URL}/startups`, {url, email, id }).then(res=>{
        console.log(res);
        toast.success("Kaydedildi!", {position: "top-right"})
        refreshData();
        setIsOpen(false)
    }).catch(err =>{
        toast.error("Hata!", {position: "top-right"})
        console.log(err);
        setIsOpen(false)

        
    })
    
};

  return (
    <div>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="btn btn-secondary w-full">+ Startup Ekle</button>
      ) : (
        <form onSubmit={handleSubmit} className="p-3 rounded-lg bg-gray-800">
          <label className="input input-bordered flex items-center gap-2">
            <Link2/>
            <input type="url" className="grow" placeholder="https://"  />
          </label>
          <button  type="submit" className="btn btn-secondary w-full mt-5">
            + Startup Ekle
          </button>
        </form>
      )}
    </div>
  );
}

export default AddProject;
