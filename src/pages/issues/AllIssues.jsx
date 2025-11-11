import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import Loading from "../../components/utilities/Loading";
import IssueCard from "../../components/IssueCard";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      const response = await axiosInstance.get("/issues");
      setIssues(response.data);
    } catch (error) {
      toast.error("Failed to load issues: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => (e) => {
    e.preventDefault();
    const query = e.target.search.value.toLowerCase();
    if (query.length === 0) {
      fetchIssues();
    }
    const filteredIssues = issues.filter((issue) =>
      issue.title.toLowerCase().includes(query)
    );
    setIssues(filteredIssues);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <form className="text-center mb-4" onSubmit={handleSearch()}>
        <label className="input rounded-full w-full max-w-md border border-2 border-gray-300 focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 h-12">
          <svg
            className="h-[1.3em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="text-xl"
          />
        </label>
      </form>
      {issues.length === 0 ? (
        <p className="text-center text-gray-500">No issues found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <IssueCard key={issue._id || issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIssues;
