"use client";
import React, { useContext } from "react";
import { BASE_URL } from "../../../config";
import { PreviewUpdateContext } from "../../_context/PreviewUpdateContext";
import { UserDetailContext } from "../../_context/UserStatesContext";

function MobilePreview() {
  const { updatePreview } = useContext(PreviewUpdateContext);
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="p-5 lg:fixed flex items-center justify-center">
      <div className="mockup-phone border-primary h-[640px]">
        <div className="camera"></div>
        <div className="display h-full">
        <iframe
              title="profile"
              key={updatePreview}
              src={`${BASE_URL}/preview`}
              width={"100%"}
              height={"100%"}
              className="rounded-3xl"
            />
        </div>
      </div>
    </div>
  );
}

export default MobilePreview;
