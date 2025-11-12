import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router";
import { Download, HeartHandshake } from "lucide-react";
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
      <div className="p-2 md:p-4 lg:p-8">
        <h2 className="">My Contributions ({contributions.length})</h2>

        {contributions.length === 0 ? (
          <div className="text-center py-12 ">
            <div className="text-lg md:text-xl text-base-content/70 flex items-center gap-2 justify-center">
              <HeartHandshake />
              There are no contribution from you.
            </div>
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
                    Issue
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
                        className="w-10 h-10 rounded-full border border-base-300"
                        src={contrib.contributorImage}
                        alt={contrib.contributorName}
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {contrib.contributorName}
                        </div>
                        <div className="text-sm opacity-70">
                          {contrib.email || "Anonymous"}
                        </div>
                      </div>
                    </th>

                    <td className="px-6 py-4">
                      <Link
                        to={`/issue/${contrib.issueId}`}
                        className="hover:underline truncate"
                      >
                        {contrib.issueTitle}
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      {contrib.issueCategory || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="badge badge-lg bg-success text-success-content border-success font-bold">
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
      <div className="mt-2 text-center">
        <button
          onClick={downloadReport}
          className="btn btn-success"
          disabled={contributions.length === 0}
        >
          <Download size={16} />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default MyContributions;
