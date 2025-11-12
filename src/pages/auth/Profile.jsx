import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";
import { HiUserCircle } from "react-icons/hi";
import { FaRegListAlt, FaHandsHelping, FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, logOut, setUser } = useAuth();
  const handleLogout = () => {
    toast.success("Logged out successfully");
    logOut()
      .then(() => setUser(null))
      .catch((error) => {
        toast.error("Logout error: " + error.message);
      });
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <title>Profile - CityFix</title>{" "}
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 text-center">
        <h1 className="mb-4">Profile</h1>

        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-primary shadow-md mx-auto"
            referrerPolicy="no-referrer"
          />
        ) : (
          <HiUserCircle className="text-8xl text-primary/70 mx-auto" />
        )}

        <h5 className="mt-3 text-lg font-semibold text-base-content">
          {user?.displayName || "User"}
        </h5>
        <p className="text-sm ">{user?.email || "N/A"}</p>

        <button
          onClick={handleLogout}
          className="btn btn-error mt-5 text-white w-full flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 border border-base-300 hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="card-body items-center text-center">
            <FaRegListAlt className="text-primary text-4xl mb-3" />
            <h3 className="card-title text-lg text-primary">Your Issues</h3>
            <p className="text-sm  mb-3">
              Manage issues you’ve reported and check their status anytime.
            </p>
            <Link className="btn btn-primary btn-sm w-full" to="/my-issues">
              View Issues
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="card-body items-center text-center">
            <FaHandsHelping className="text-primary text-4xl mb-3" />
            <h3 className="card-title text-lg text-primary">
              Your Contributions
            </h3>
            <p className="text-sm  mb-3">
              See the contributions you’ve made and track your community impact.
            </p>
            <Link
              className="btn btn-primary btn-sm w-full"
              to="/my-contributions"
            >
              View Contributions
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="card-body items-center text-center">
            <FaPlusCircle className="text-primary text-4xl mb-3" />
            <h3 className="card-title text-lg text-primary">Report Issue</h3>
            <p className="text-sm  mb-3">
              Report a new issue to help make your city a cleaner, better place.
            </p>
            <Link className="btn btn-primary btn-sm w-full" to="/report-issue">
              Add Issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
