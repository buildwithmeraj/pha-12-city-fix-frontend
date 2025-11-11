import React from "react";
import logo from "../assets/logo.png";

const Banner = () => {
  return (
    <div className="grid banner rounded-2xl place-items-center text-4xl text-white font-bold">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-10" />
        <span>
          City<span className="text-[#FC785E]">Fix</span>
        </span>
      </div>
    </div>
  );
};

export default Banner;
