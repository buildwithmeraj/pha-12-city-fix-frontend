import React from "react";
import error404 from "../../assets/404.png";

const ErrorImage = () => {
  return (
    <div>
      <img src={error404} alt="not found" className="h-[30vh]" />
    </div>
  );
};

export default ErrorImage;
