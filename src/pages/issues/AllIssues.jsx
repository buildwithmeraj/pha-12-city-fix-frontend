import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import Loading from "../../components/utilities/Loading";
import IssueCard from "../../components/IssueCard";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const fetchIssues = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const response = await axiosInstance.get(`/issues?${params}`);
      setIssues(response.data);
    } catch (error) {
      toast.error("Failed to load issues", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues({
      category: selectedCategory,
      status: selectedStatus,
    });
  }, [selectedCategory, selectedStatus]);

  useEffect(() => {
    fetchCategories();
    fetchIssues();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.toLowerCase();
    if (!query) {
      fetchIssues({
        category: selectedCategory,
        status: selectedStatus,
      });
      return;
    }
    const filtered = issues.filter((i) =>
      i.title.toLowerCase().includes(query)
    );
    setIssues(filtered);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <form className="text-center mb-4" onSubmit={handleSearch}>
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
            placeholder="Search issues..."
            className="text-xl"
          />
        </label>
      </form>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          className="select select-bordered"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id || cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="ended">Ended</option>
        </select>
      </div>

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
