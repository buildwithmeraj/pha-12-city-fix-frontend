import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const NavBar = () => {
  const navLinks = (
    <>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>item 2</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link className="text-3xl flex items-center gap-2 font-bold" to="/">
          <img src={logo} alt="logo" className="w-10" />
          <span>
            City<span className="text-[#FC785E]">Fix</span>
          </span>
        </Link>
      </div>
      <div className="navbar-end gap-4">
        <a className="">Home</a>
        <a className="">Issues</a>
        <a className="btn">Login</a>
        <a className="btn">Register</a>
      </div>
    </div>
  );
};

export default NavBar;
