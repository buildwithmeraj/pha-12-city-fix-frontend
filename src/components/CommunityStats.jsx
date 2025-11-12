import React from "react";

const CommunityStats = () => {
  return (
    <section className="py-8 rounded-lg">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2>Community Stats</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card bg-green-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-4xl font-bold text-green-700">800+</h3>
            <p className="text-gray-700 font-medium mt-2">Registered Users</p>
          </div>

          <div className="card bg-blue-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-4xl font-bold text-blue-700">250+</h3>
            <p className="text-gray-700 font-medium mt-2">Issues Resolved</p>
          </div>

          <div className="card bg-amber-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-4xl font-bold text-amber-700">150+</h3>
            <p className="text-gray-700 font-medium mt-2">Pending Issues</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;
