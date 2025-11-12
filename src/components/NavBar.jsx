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
      .catch((error) => toast.error("Logout error: " + error.message));
  };

  const navLinks = (
    <>
      <li className="list-none">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="list-none">
        <NavLink to="/issues">Issues</NavLink>
      </li>
      <li className="list-none">
        <NavLink to="/report-issue">Report Issue</NavLink>
      </li>
    </>
  );

  return (
    <>
      <nav
        className="navbar fixed top-0 left-0 z-50 w-full h-20 px-[4%] xl:px-[7%]
        bg-base-200/70 backdrop-blur-lg border-b border-base-300 shadow-sm
        transition-all duration-300"
      >
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-md
              rounded-box mt-3 w-52 p-2 shadow border border-base-300"
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
          <div className="hidden md:flex gap-6 font-medium">{navLinks}</div>

          {user ? (
            <>
              <NavLink to="/my-issues" className="hidden md:block">
                My Issues
              </NavLink>
              <NavLink to="/my-contributions" className="hidden md:block">
                My Contributions
              </NavLink>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
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
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100/90 backdrop-blur-md
                  rounded-box w-48 p-3 shadow border border-base-300 mt-3"
                >
                  <li className="mb-2">
                    <Link
                      to="/profile"
                      className="btn btn-secondary text-white w-full flex items-center justify-center gap-2"
                    >
                      <UserRound size={20} />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-error text-white w-full flex items-center justify-center gap-2"
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
      </nav>

      <div className="h-20"></div>
    </>
  );
};

export default NavBar;
