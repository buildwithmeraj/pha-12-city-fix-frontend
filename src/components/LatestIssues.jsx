import toast from "react-hot-toast";
import axiosInstance from "../hooks/axiosInstance";
import Loading from "../components/utilities/Loading";
import IssueCard from "../components/IssueCard";
import { useEffect, useState } from "react";

const LatestIssues = () => {
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
    <div className="mt-8">
      {loading ? (
        <Loading />
      ) : issues.length === 0 ? (
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

export default LatestIssues;
