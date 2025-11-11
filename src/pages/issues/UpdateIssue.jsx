import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import { useParams } from "react-router";

const UpdateIssue = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState(null);

  const fetchIssue = async () => {
    try {
      const res = await axiosInstance.get(`/issue/${id}`);
      setIssue(res.data);
    } catch (error) {
      toast.error("Failed to load issue details.", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to load categories: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchIssue();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const category = e.target.category.value.trim();
    const location = e.target.location.value.trim();
    const description = e.target.description.value.trim();
    const image = e.target.image.value.trim();
    const amount = e.target.amount.value.trim();
    const status = e.target.status.value.trim();
    const email = user?.email || "";

    if (!title || !category || !location || !description || !image || !amount) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = {
      title,
      category,
      location,
      description,
      image,
      amount,
      email,
      status,
    };

    try {
      await axiosInstance.post(`/issue/${id}`, formData);
      toast.success("Issue report updated successfully!");
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast.error("Failed to submit issue. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Update an Issue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label font-medium">Issue Title</label>
          <input
            type="text"
            name="title"
            defaultValue={issue?.title}
            placeholder="Enter issue title"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Status</label>
          <select
            name="status"
            className="select select-bordered w-full"
            required
          >
            <option value="ongoing" selected={issue?.status === "ongoing"}>
              Ongoing
            </option>
            <option value="ended" selected={issue?.status === "ended"}>
              Ended
            </option>
          </select>
        </div>

        <div>
          <label className="label font-medium">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
            disabled={loading}
          >
            <option value="">
              {loading ? "Loading categories..." : "Select a category"}
            </option>
            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat.name}
                selected={cat.name === issue?.category}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label font-medium">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={issue?.location}
            placeholder="Enter location details"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Describe the issue"
            defaultValue={issue?.description}
            className="textarea textarea-bordered w-full"
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          <label className="label font-medium">Image URL</label>
          <input
            type="url"
            name="image"
            defaultValue={issue?.image}
            placeholder="https://imgbb.com/...."
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">
            Suggested Fix Budget (optional)
          </label>
          <input
            type="number"
            name="amount"
            defaultValue={issue?.amount}
            placeholder="Enter estimated cost"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default UpdateIssue;
