import { Hourglass, UsersRound, CircleCheckBig } from "lucide-react";
import React from "react";
import { Fade } from "react-awesome-reveal";

const CommunityStats = () => {
  return (
    <>
      <div className="mx-auto text-center px-6">
        <h2>Community Stats</h2>

        <div className="stats shadow backdrop-blur-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <UsersRound />
            </div>
            <div className="stat-title">Registered Users</div>
            <div className="stat-value text-primary">800+</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <CircleCheckBig />
            </div>
            <div className="stat-title">Issues Resolved</div>
            <div className="stat-value text-secondary">250+</div>
            <div className="stat-desc">32% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <Hourglass absoluteStrokeWidth size={26} />
            </div>
            <div className="stat-value">150+</div>
            <div className="stat-title">Ongoing Issues</div>
            <div className="stat-desc text-secondary">30 new this month</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityStats;
