import toast from "react-hot-toast";
import axiosInstance from "../hooks/axiosInstance";
import Loading from "./utilities/Loading";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { ChevronRight, MapPinned, Tag, CircleEllipsis } from "lucide-react";
import { Link } from "react-router";

const RecentIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axiosInstance.get("/issues?limit=6");
        setIssues(response.data);
      } catch (error) {
        toast.error("Failed to load issues: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="mt-10">
      <h2>Recent Issues </h2>
      {loading ? (
        <Loading />
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-500">No issues found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <Fade key={issue._id} cascade>
                <div className="flex flex-col rounded-xl border border-base-300 bg-base-100 hover:bg-base-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden h-full">
                  {issue.image && (
                    <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-between flex-grow p-5 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-base-content line-clamp-2 mb-2">
                        {issue.title}
                      </h3>
                      <p className="truncate my-4">{issue.description}</p>{" "}
                      <div className="text-sm text-base-content/70 space-y-1">
                        <p className="flex items-center gap-2">
                          <Tag size={16} />
                          {issue.category}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPinned size={16} />
                          {issue.location}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3">
                      <Link
                        to={`/issue/${issue._id}`}
                        className="btn btn-primary flex items-center gap-2 w-full"
                      >
                        View Details
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <div className="text-center py-6">
            <Link className="btn btn-primary items-center gap-2" to="issues">
              All Isssues
              <CircleEllipsis className="inline" size={20} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentIssues;
