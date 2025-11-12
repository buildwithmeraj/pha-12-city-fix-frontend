import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SyncLoader color="#ff9100" size={20} />
      </div>
    </div>
  );
};

export default Loading;
