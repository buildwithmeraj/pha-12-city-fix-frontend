import { DollarSign, MapPinned, Tag } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  return (
    <div
      key={issue._id || issue.id}
      className="flex flex-col rounded-xl border border-base-300 bg-base-100 hover:bg-base-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden h-full"
    >
      {issue.image && (
        <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
          <span
            className={`absolute top-3 right-3 badge badge-md font-semibold capitalize ${
              issue.status === "ongoing"
                ? "badge-warning"
                : issue.status === "resolved"
                ? "badge-success"
                : "badge-info"
            }`}
          >
            {issue.status}
          </span>
        </div>
      )}

      <div className="flex flex-col justify-between flex-grow p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-base-content line-clamp-2 mb-2">
            {issue.title}
          </h3>

          <div className="text-sm text-base-content/70 space-y-1">
            <p className="flex items-center gap-2">
              <Tag size={16} />
              {issue.category}
            </p>

            <p className="flex items-center gap-2">
              <MapPinned size={16} />
              {issue.location}
            </p>

            <p className="flex items-center gap-2 font-semibold text-success">
              <DollarSign size={16} />${issue.amount?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="pt-3">
          <Link to={`/issue/${issue._id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
