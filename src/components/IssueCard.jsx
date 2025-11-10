import React from "react";

const IssueCard = ({ issue }) => {
  return (
    <div
      key={issue._id || issue.id}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100 hover:border-green-300 overflow-hidden group"
    >
      {/* Image Container with Overlay */}
      <figure className="relative overflow-hidden h-56">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`badge badge-lg font-semibold ${
              issue.status === "ongoing"
                ? "bg-amber-500 text-white border-amber-600"
                : issue.status === "resolved"
                ? "bg-green-600 text-white border-green-700"
                : "bg-blue-500 text-white border-blue-600"
            }`}
          >
            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
          </span>
        </div>
      </figure>

      <div className="card-body p-5">
        {/* Title */}
        <h3 className="card-title text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {issue.title}
        </h3>

        {/* Info Grid */}
        <div className="space-y-2 mb-4">
          {/* Category */}
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span className="text-gray-700 font-medium">{issue.category}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-700">{issue.location}</span>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-800 font-semibold">
              ${issue.amount?.toLocaleString() || 0}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions justify-end mt-2">
          <button className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none w-full shadow-md hover:shadow-lg transition-all duration-300">
            <span>See Details</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
