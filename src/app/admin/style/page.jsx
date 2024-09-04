import React from "react";
import ThemeOptions from "./_components/ThemeOptions";
import MobilePreview from "../_components/mobilepreview";
function Style() {
  return (
    <div className="">
      <div className=" py-12 px-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2">
            <ThemeOptions />
          </div>
          <div>
            <MobilePreview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Style;
