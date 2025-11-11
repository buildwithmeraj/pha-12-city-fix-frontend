import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../hooks/axiosInstance";
import toast from "react-hot-toast";
import Loading from "../../components/utilities/Loading";
import { HandHeart, HeartHandshake, X } from "lucide-react";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  const fetchContributions = async () => {
    try {
      const res = await axiosInstance.get(`/contributions?id=${id}`);
      setContributions(res.data);
    } catch {
      toast.error("Failed to load contributions.");
    }
  };

  useEffect(() => {
    fetchIssue();
    fetchContributions();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newContribution = {
      issueId: id,
      issueTitle: issue.title,
      issueCategory: issue.category,
      contributorName: form.contributorName.value,
      contributorImage: user?.photoURL || "https://i.pravatar.cc/150?img=10",
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      amount: parseFloat(form.amount.value),
      additionalInfo: form.additionalInfo.value || "",
      date: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/contributions", newContribution);
      toast.success("Contribution submitted successfully!");
      form.reset();
      setShowModal(false);
      fetchContributions();
    } catch {
      toast.error("Failed to submit contribution.");
    }
  };

  if (loading) return <Loading />;

  if (!issue)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-base-content/70">Issue not found.</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );

  const totalCollected = contributions.reduce((a, b) => a + b.amount, 0);
  const progress = Math.min((totalCollected / issue.amount) * 100, 100);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="card bg-base-100 shadow-xl border border-base-200 mb-10">
        {issue.image && (
          <figure>
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-96 object-cover"
            />
          </figure>
        )}

        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">{issue.title}</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 rounded-md bg-base-200">
              <p className="text-sm opacity-70">Category</p>
              <p className="font-semibold">{issue.category}</p>
            </div>
            <div className="p-3 rounded-md bg-base-200">
              <p className="text-sm opacity-70">Location</p>
              <p className="font-semibold">{issue.location}</p>
            </div>
            <div className="p-3 rounded-md bg-base-200">
              <p className="text-sm opacity-70">Date Reported</p>
              <p className="font-semibold">
                {new Date(issue.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="opacity-80 whitespace-pre-line">
              {issue.description}
            </p>
          </div>

          <div className="divider"></div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Suggested Fix Budget</h3>
              <span className="font-bold text-primary">
                ${issue.amount.toLocaleString()}
              </span>
            </div>

            <div className="w-full bg-base-200 rounded-full h-5 mb-2">
              <div
                className="bg-primary h-5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-sm opacity-80">
              <span>${totalCollected.toLocaleString()} raised</span>
              <span>
                ${(issue.amount - totalCollected).toLocaleString()} remaining
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary w-full"
            >
              <HandHeart size={20} /> Pay Clean-Up Contribution
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">
            Contributors ({contributions.length})
          </h2>

          {contributions.length === 0 ? (
            <p className="text-center opacity-70 py-6">
              No contributions yet. Be the first!
            </p>
          ) : (
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>Contributor</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((c) => (
                    <tr key={c._id} className="hover:bg-base-200">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-10 h-10">
                              <img
                                src={c.contributorImage}
                                alt={c.contributorName}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold">{c.contributorName}</p>
                            <p className="text-xs opacity-70">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold text-primary">
                          ${c.amount.toLocaleString()}
                        </span>
                      </td>
                      <td>{new Date(c.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-2xl bg-base-100">
            <h3 className="font-bold text-2xl mb-4">Clean-Up Contribution</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Issue Title</span>
                  </label>
                  <input
                    type="text"
                    value={issue.title}
                    readOnly
                    className="input input-bordered w-full bg-base-200"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Amount ($)</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter contribution"
                    min="1"
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Contributor Name</span>
                  </label>
                  <input
                    type="text"
                    name="contributorName"
                    defaultValue={user?.displayName || ""}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-base-200"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Additional Info</span>
                </label>
                <textarea
                  name="additionalInfo"
                  placeholder="Any additional info..."
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div className="label">
                Date:
                {new Date().toLocaleDateString()}
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  <X />
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <HeartHandshake />
                  Submit Contribution
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default IssueDetails;
