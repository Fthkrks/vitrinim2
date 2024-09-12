"use client";
import React, { useContext } from "react";
import { BASE_URL } from "../../../config";
import { PreviewUpdateContext } from "../../_context/PreviewUpdateContext";
import { UserDetailContext } from "../../_context/UserStatesContext";
import { Eye } from "lucide-react";
import Link from "next/link";

function MobilePreview() {
  const { updatePreview } = useContext(PreviewUpdateContext);
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="p-5 lg:fixed flex items-center justify-center">
      <div className="mockup-phone border-primary h-[640px] md:block hidden">
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
      <Link href="/preview" className="md:hidden  flex fixed bottom-4 btn btn-primary text-white">
        <Eye />
        Ön izleme
      </Link>
    </div>
  );
}

export default MobilePreview;
