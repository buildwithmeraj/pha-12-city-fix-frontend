import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { HiUserCircle } from "react-icons/hi2";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import ThemeSwitcher from "../components/utilities/ThemeSwitcher";

const NavBar = () => {
  const { user, logOut, setUser } = useAuth();
  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      logOut()
        .then(() => setUser(null))
        .catch((error) => {
          toast.error("Logout error: " + error.message);
        });
    }, 2000);
  };

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
        <Link to="/issues">Issues</Link>
        {user ? (
          <>
            <div
              className="relative tooltip tooltip-bottom hidden md:flex"
              data-tip={user?.displayName || "User"}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile picture"
                  className="w-10 h-10 rounded-full border-2 border-amber-600 cursor-help"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <HiUserCircle className="text-5xl" />
              )}
            </div>
            <Link to="/profile" className="btn btn-info text-white">
              <HiUserCircle className="text-xl" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-error text-white hidden lg:flex"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </>
        ) : (
          <>
            <HiUserCircle className="text-5xl mr-2 hidden lg:flex" />
            <Link to="/login" className="btn btn-info text-white">
              <FaSignInAlt />
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-success text-white hidden md:flex"
            >
              <FaUserPlus />
              Register
            </Link>
          </>
        )}
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
