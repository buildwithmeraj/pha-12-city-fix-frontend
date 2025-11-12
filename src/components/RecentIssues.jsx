import toast from "react-hot-toast";
import axiosInstance from "../hooks/axiosInstance";
import Loading from "./utilities/Loading";
import IssueCard from "./IssueCard";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

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
      <h2>Recent Issues</h2>
      {loading ? (
        <Loading />
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-500">No issues found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <Fade>
              <IssueCard key={issue._id || issue.id} issue={issue} />
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentIssues;
