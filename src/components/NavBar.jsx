import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import { HiUserCircle } from "react-icons/hi2";
import ThemeSwitcher from "../components/utilities/ThemeSwitcher";
import toast from "react-hot-toast";
import { LogOut, UserRound } from "lucide-react";

const NavBar = () => {
  const { user, logOut, setUser } = useAuth();
  const handleLogout = () => {
    toast.success("Logged out successfully");
    logOut()
      .then(() => setUser(null))
      .catch((error) => {
        toast.error("Logout error: " + error.message);
      });
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
    <div className="navbar bg-base-200 shadow-sm px-[3%] xl:px-[7%]">
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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/issues">Issues</NavLink>
        {user ? (
          <>
            <NavLink to="/report-issue">Report Issue</NavLink>
            <NavLink to="/my-issues">My Issues</NavLink>
            <NavLink to="/my-contributions">My Contributions</NavLink>
            <div className="dropdown dropdown-center">
              <Link to="javascript:void(0)" tabIndex={0}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile picture"
                    className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <HiUserCircle className="text-5xl" />
                )}
              </Link>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-auto p-4 shadow-sm m-2"
              >
                <li className="mb-2">
                  <Link
                    to="/profile"
                    className="btn btn-secondary text-white flex items-center justify-center gap-2"
                  >
                    <UserRound size={20} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error text-white flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hidden md:block">
              Login
            </NavLink>
            <NavLink to="/register" className="hidden md:block">
              Register
            </NavLink>
          </>
        )}
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default NavBar;
