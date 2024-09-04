"use client"
import React, { useContext } from "react";
import { BASE_URL } from "../../../config";
import { PreviewUpdateContext } from "../../_context/PreviewUpdateContext";

function MobilePreview() {

  const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);



  return (
    <div className="p-5 lg:fixed flex items-center justify-center">
      <div className="border-[13px] min-w-[340px] w-full max-w-[400px] border-black  h-[640px] rounded-[40px] m-2 shadow-md shadow-primary">
        <iframe
          title="profile"
          key={updatePreview}
          src={`${BASE_URL}/fatihK`}
          width={"100%"}
          height={"100%"}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
}

export default MobilePreview;
