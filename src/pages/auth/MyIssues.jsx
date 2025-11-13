import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import Loading from "../../components/utilities/Loading";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { TriangleAlert, Plus } from "lucide-react";

const MyIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [editIssue, setEditIssue] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchIssues = async () => {
    try {
      const response = await axiosInstance.get(`/issues?email=${user?.email}`);
      setIssues(response.data);
    } catch (error) {
      toast.error("Failed to load issues: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to load categories: " + error.message);
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchCategories();
  }, []);

  const handleDelete = (issue) => {
    setSelectedIssue(issue);
  };

  const confirmDelete = async () => {
    if (!selectedIssue) return;
    setDeleting(true);
    try {
      await axiosInstance.delete(`/issue/${selectedIssue._id}`);
      toast.success(`Deleted "${selectedIssue.title}" successfully.`);
      setIssues((prev) => prev.filter((i) => i._id !== selectedIssue._id));
      setSelectedIssue(null);
    } catch (error) {
      toast.error("Failed to delete issue: " + error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (issue) => {
    setEditIssue(issue);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const formData = {
      title: form.title.value.trim(),
      category: form.category.value.trim(),
      location: form.location.value.trim(),
      description: form.description.value.trim(),
      image: form.image.value.trim(),
      amount: form.amount.value.trim(),
      status: form.status.value.trim(),
      email: user?.email || "",
    };

    if (!formData.title || !formData.category || !formData.location) {
      toast.error("Please fill in all required fields.");
      setUpdating(false);
      return;
    }

    try {
      await axiosInstance.put(`/issue/${editIssue._id}`, formData);
      toast.success("Issue updated successfully!");
      setEditIssue(null);
      fetchIssues();
    } catch (error) {
      toast.error("Failed to update issue: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-2 md:px-4 lg:px-8">
      <title>My Issues - CityFix</title>
      <h2>
        My Reported Issues{issues.length === 0 ? "" : ` (${issues.length})`}
      </h2>

      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="flex flex-col items-center justify-center w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 text-center">
            <TriangleAlert size={70} className="text-gray-500 text-center" />
            <p className="text-2xl text-base-content/70">
              You don't have any issues reported.
            </p>
            <div className="mt-4">
              <Link className="btn btn-primary" to="/report-issue">
                <Plus />
                Report an Issue
              </Link>
            </div>
          </p>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-base-100 border border-base-300">
          <table className="w-full text-sm text-left text-base-content">
            <thead className="text-xs uppercase bg-base-200 text-base-content/80">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr
                  key={issue._id}
                  className="bg-base-100 border-b border-base-200 hover:bg-base-200/60 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">
                    <Link
                      to={`/issue/${issue._id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {issue.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{issue.category}</td>
                  <td className="px-6 py-4">{issue.location}</td>
                  <td className="px-6 py-4 text-success font-semibold">
                    ${issue.amount}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      issue.status === "ended" ? "text-error" : "text-warning"
                    }`}
                  >
                    {issue.status}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button
                      className="font-medium text-info cursor-pointer hover:underline"
                      onClick={() => handleEdit(issue)}
                    >
                      Update
                    </button>
                    <button
                      className="font-medium text-error cursor-pointer hover:underline"
                      onClick={() => handleDelete(issue)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedIssue && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 border border-base-300 max-w-md">
            <h3 className="font-bold text-lg text-error mb-3">
              Confirm Delete
            </h3>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedIssue.title}</span>?
            </p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedIssue(null)}
                className="btn btn-ghost"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={`btn btn-error ${deleting ? "loading" : ""}`}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/50"
            onClick={() => setSelectedIssue(null)}
          />
        </div>
      )}

      {editIssue && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 border border-base-300 max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-4 text-primary text-center">
              Update Issue
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label font-medium">Issue Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editIssue.title}
                  placeholder="Enter issue title"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Status</label>
                <select
                  name="status"
                  defaultValue={editIssue.status}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="ended">Ended</option>
                </select>
              </div>

              <div>
                <label className="label font-medium">Category</label>
                <select
                  name="category"
                  defaultValue={editIssue.category}
                  className="select select-bordered w-full"
                  required
                >
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
                  defaultValue={editIssue.location}
                  placeholder="Enter or update location details"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={editIssue.description}
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  placeholder="Describe any updates or changes"
                  required
                ></textarea>
              </div>

              <div>
                <label className="label font-medium">Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editIssue.image}
                  placeholder="https://imgbb.com/image.jpg"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label font-medium">
                  Suggested Fix Budget
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={editIssue.amount}
                  placeholder="Enter estimated fix budget"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setEditIssue(null)}
                  className="btn btn-ghost"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${updating ? "loading" : ""}`}
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          <div
            className="modal-backdrop bg-black/50"
            onClick={() => setEditIssue(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MyIssues;
