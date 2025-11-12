import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";

const AddIssue = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const category = e.target.category.value.trim();
    const location = e.target.location.value.trim();
    const description = e.target.description.value.trim();
    const image = e.target.image.value.trim();
    const amount = e.target.amount.value.trim();
    const status = "ongoing";
    const date = new Date().toISOString();
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
      date,
    };

    try {
      await axiosInstance.post("/issues", formData);
      toast.success("Issue report submitted successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast.error("Failed to submit issue. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <title>Report Issue - CityFix</title>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Report an Issue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label font-medium">Issue Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter issue title"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
            disabled={loading}
          >
            <option value="" disabled>
              {loading ? "Loading categories..." : "Select a category"}
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
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

export default AddIssue;
