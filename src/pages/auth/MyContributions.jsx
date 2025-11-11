import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import { useAuth } from "../../contexts/AuthContext";

const MyContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchContributions = async () => {
    try {
      const response = await axiosInstance.get(
        `/contributions?email=${user?.email}`
      );
      setContributions(response.data);
    } catch (error) {
      toast.error("Failed to load contributions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="card bg-base-100 shadow-2xl border border-green-100">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Contributors ({contributions.length})
          </h2>

          {contributions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💚</div>
              <p className="text-xl text-gray-600">
                Be the first to contribute!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-green-100">
                    <th className="text-base">Contributor</th>
                    <th className="text-base">Amount</th>
                    <th className="text-base">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((contrib) => (
                    <tr key={contrib._id} className="hover:bg-green-50">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={contrib.contributorImage}
                                alt={contrib.contributorName}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {contrib.contributorName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-lg bg-green-600 text-white border-green-700 font-bold">
                          ${contrib.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="text-gray-600">
                        {new Date(contrib.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContributions;
