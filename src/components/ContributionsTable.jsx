import React from "react";

const ContributionsTable = ({ contributions }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Contributors ({contributions.length})
        </h2>

        {contributions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💚</div>
            <p className="text-lg md:text-xl text-base-content/70">
              Be the first to contribute!
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
                    Amount
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
                          {contrib.contributorEmail || "Anonymous"}
                        </div>
                      </div>
                    </th>

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
    </div>
  );
};

export default ContributionsTable;
