import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="relative w-full min-h-[60vh] flex items-center justify-center bg-base-100/60 backdrop-blur-[2px] rounded-lg">
      <div className="absolute inset-0 bg-base-100/60 backdrop-blur-[2px]" />
      <SyncLoader color="#ff9100" size={16} />
    </div>
  );
};

export default Loading;
