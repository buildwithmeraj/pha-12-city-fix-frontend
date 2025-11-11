import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../hooks/axiosInstance";
import toast from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const fetchContributions = async () => {
    try {
      const response = await axiosInstance.get(`/contributions/${user?.email}`);
      setContributions(response.data);
    } catch (error) {
      toast.error("Failed to load contributions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axiosInstance.get(`/issue/${id}`);
        setIssue(response.data);
      } catch (error) {
        toast.error("Failed to load issue details:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  useEffect(() => {
    fetchContributions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueId = id;
    const contributorName = e.target.contributorName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const amount = e.target.amount.value;
    const additionalInfo = e.target.additionalInfo.value;

    // Validate form
    if (!contributorName || !email || !phone || !amount || !address) {
      alert("Please fill in all required fields");
      return;
    }

    // Create contribution object
    const newContribution = {
      _id: Date.now().toString(),
      issueId,
      contributorName,
      contributorImage: user?.photoURL || "https://i.pravatar.cc/150?img=10",
      amount: parseFloat(amount),
      email,
      phone,
      address,
      additionalInfo,
      date: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/contributions", newContribution);
      toast.success("Issue report submitted successfully!");
      e.target.reset();
      setShowModal(false);
      fetchContributions();
    } catch (error) {
      toast.error("Failed to submit issue. Please try again.", error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Issue Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The issue you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn bg-gradient-to-r from-green-600 to-emerald-600 text-white border-none"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const totalCollected = contributions.reduce(
    (sum, contrib) => sum + contrib.amount,
    0
  );
  const progressPercentage = Math.min(
    (totalCollected / issue.amount) * 100,
    100
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-300";
      case "ongoing":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 gap-2 hover:bg-green-100"
        >
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
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="card bg-base-100 shadow-2xl overflow-hidden border border-green-100 mb-8">
          <figure className="relative h-96 bg-gradient-to-br from-green-200 to-emerald-300">
            {issue.image ? (
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-32 w-32 text-green-600 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <div className="absolute top-6 right-6">
              <span
                className={`badge badge-lg font-semibold border-2 ${getStatusColor(
                  issue.status
                )}`}
              >
                {issue.status?.toUpperCase() || "OPEN"}
              </span>
            </div>
          </figure>

          <div className="card-body p-8 lg:p-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {issue.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Category
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {issue.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {issue.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Date Reported
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(issue.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {issue.description}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Suggested Fix Budget
                </h3>
                <div className="text-3xl font-bold text-green-600">
                  ${issue.amount.toLocaleString()}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    Progress: ${totalCollected.toLocaleString()} raised
                  </span>
                  <span className="font-semibold text-green-600">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    {progressPercentage > 10 && (
                      <span className="text-white text-xs font-bold">
                        {progressPercentage.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mb-6">
                <span>{contributions.length} contributors</span>
                <span>
                  ${(issue.amount - totalCollected).toLocaleString()} remaining
                </span>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none w-full text-lg h-14"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Pay Clean-Up Contribution
              </button>
            </div>
          </div>
        </div>

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

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-gradient-to-br from-white to-green-50">
            <h3 className="font-bold text-3xl mb-6 text-green-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Clean-Up Contribution
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Issue Title</span>
                </label>
                <input
                  type="text"
                  defaultValue={issue.title}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  name="contributorName"
                  defaultValue={user?.displayName || ""}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Phone Number *
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Address</span>
                </label>
                <textarea
                  name="address"
                  placeholder="Enter your address"
                  className="textarea textarea-bordered w-full focus:border-green-500"
                  rows={2}
                  required
                ></textarea>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Contribution Amount ($) *
                  </span>
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  min="1"
                  className="input input-bordered w-full focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Date</span>
                </label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Additional Information
                  </span>
                </label>
                <textarea
                  name="additionalInfo"
                  placeholder="Any additional information (optional)"
                  className="textarea textarea-bordered w-full focus:border-green-500"
                  rows={3}
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none"
                >
                  Submit Contribution
                </button>
              </div>
            </form>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
