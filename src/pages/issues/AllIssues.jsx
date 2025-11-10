import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import Loading from "../../components/utilities/Loading";
import IssueCard from "../../components/IssueCard";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchIssues();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
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
