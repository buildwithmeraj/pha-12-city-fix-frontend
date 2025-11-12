import { CircleX, Info } from "lucide-react";
import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center">
      <div role="alert" className="alert alert-info alert-soft mt-2 w-fit">
        <Info size={18} />
        {message}
      </div>
    </div>
  );
};

export default Error;
