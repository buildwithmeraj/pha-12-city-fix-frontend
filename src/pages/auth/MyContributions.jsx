import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router";
import { Download, HeartHandshake, Undo2, Plus, Search } from "lucide-react";
import Loading from "../../components/utilities/Loading";

const MyContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchContributions = async () => {
    try {
      const response = await axiosInstance.get(
        `/contributions?email=${user?.email}`
      );
      setContributions(response.data);
    } catch (error) {
      toast.error("Failed to load contributions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    console.log(user?.email);
    doc.text("Community Cleanliness Portal", 14, 15);
    doc.text(`Contribution Report for ${user?.displayName}`, 14, 25);
    doc.text(`Email: ${user?.email}`, 14, 35);

    const tableColumn = ["Issue Title", "Amount", "Date"];
    const tableRows = [];

    contributions.forEach((contrib) => {
      const row = [
        contrib.issueTitle,
        `$${contrib.amount}`,
        new Date(contrib.date).toLocaleDateString(),
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
    });

    doc.save("My_Contribution_Report.pdf");
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <title>My Contributions - CityFix</title>
      <div className="px-2 md:px-4 lg:px-8">
        <h2>
          My Contributions
          {contributions.length === 0 ? "" : ` (${contributions.length})`}
        </h2>

        {contributions.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="flex flex-col items-center justify-center w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 text-center">
              <HeartHandshake size={70} className="text-gray-500 text-center" />
              <p className="text-2xl text-base-content/70">
                No contributions yet, browse issues to contribute.
              </p>
              <div className="mt-4">
                <Link className="btn btn-primary" to="/issues">
                  <Search />
                  Browse Issue
                </Link>
              </div>
            </p>
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-base-300">
            <table className="w-full text-sm text-left text-base-content">
              <thead className="text-xs uppercase bg-base-200 text-base-content/70">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Contributor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Issue Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount Paid
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((contrib) => (
                  <tr
                    key={contrib._id}
                    className="bg-base-100 border-b border-base-300 hover:bg-base-200/60 transition-colors"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <img
                        className="rounded-full border-2 border-primary w-10 h-10"
                        src={contrib.contributorImage}
                        alt={contrib.contributorName}
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">You</div>
                        <div className="text-sm opacity-70"></div>
                      </div>
                    </th>

                    <td className="px-6 py-4">
                      <Link
                        to={`/issue/${contrib.issueId}`}
                        className="hover:underline truncate text-primary"
                      >
                        {contrib.issueTitle}
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      {contrib.issueCategory || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-primary font-bold">
                        ${contrib.amount.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-base-content/80">
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
      <div className="mt-8 text-center">
        <button
          onClick={downloadReport}
          className="btn btn-success"
          disabled={contributions.length === 0}
        >
          <Download size={16} absoluteStrokeWidth />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default MyContributions;
