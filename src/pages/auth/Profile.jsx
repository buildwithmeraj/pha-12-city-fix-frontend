import React from "react";
import { Link } from "react-router";

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Your Issues</h3>
            <p>
              View and manage the issues you have reported. Keep track of their
              status and updates.
            </p>
            <div className="card-actions justify-center">
              <Link className="btn btn-primary" to="/my-issues">
                View Issues
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Your Contributions</h3>
            <p>
              See the contributions you have made to the community. Check your
              impact and involvement.
            </p>
            <div className="card-actions justify-center">
              <Link className="btn btn-primary" to="/my-contributions">
                View Contributions
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Report Issue</h3>
            <p>
              Report a new issue in your community. Help us improve the city by
              bringing attention to problems.
            </p>
            <div className="card-actions justify-center">
              <Link className="btn btn-primary" to="/report-issue">
                Add Issue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
