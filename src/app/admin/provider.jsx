"use client";
import React, { useEffect, useState } from "react";
import { PreviewUpdateContext } from "../_context/PreviewUpdateContext";


function Provider({ children }) {
  const [updatePreview, setUpdatePreview] = useState(0);
  return (
    <div>
      <PreviewUpdateContext.Provider value={{updatePreview, setUpdatePreview}}>
      <div>{children}</div>
      </PreviewUpdateContext.Provider>
    </div>
  );
}

export default Provider;
