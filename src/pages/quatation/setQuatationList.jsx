import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VendorQuataionList = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/quotation/");
        if (response.ok) {
          const data = await response.json();
          setQuotations(data);
        } else {
          console.error("Failed to fetch quotations:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch quotations:", error.message);
      }
    };

    fetchQuotations();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 mt-8">
        <div className="relative">
          <p className="-mt-4 text-lg font-semibold text-gray-900">
            Vendor Quotations
          </p>
        </div>

        <div className="overflow-x-auto sm:-mx-4 sm:-my-2 sm:mx-6 sm:my-0">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
              {quotations.map((q) => {
                // Set default card classes
                let cardClass = "block text-center border rounded-lg shadow-secondary-1 p-6";

                // Check if request priority is "Stand" and set the background color
                if (q.quotations[0]?.requestpriority === "Stand") {
                  cardClass += " bg-yellow-200"; // Yellow background for "Stand"
                } else if (q.quotations[0]?.requestpriority === "Emergency") {
                  cardClass += " bg-red-300"; // Red background for "Emergency"
                } else if (q.quotations[0]?.requestpriority === "Minor") {
                  cardClass += " bg-green-200"; // Green background for "Minor"
                } else if (q.quotations[0]?.requestpriority === "Other") {
                  cardClass += " bg-blue-200"; // Blue background for "Other"
                }

                return (
                  <div key={q._id} className={cardClass}>
                    <div className="px-6 py-3 border-b-2 border-neutral-100 dark:border-white/10">
                      <p className="mb-2 text-sm text-gray-600">
                        Generic Name: {q.quotations[0]?.genericName}
                      </p>
                    </div>

                    <div className="px-6 py-3 border-b-2 border-neutral-100 dark:border-white/10">
                      <p className="mb-2 text-sm text-gray-600">
                        Request Priority: {q.quotations[0]?.requestpriority}
                      </p>
                    </div>

                    <div className="p-6">
                      <h5 className="mb-2 text-xl font-medium leading-tight">
                        {q._id}
                      </h5>
                      <Link to={`/vendor/quatation/setquatationList/QuatationGroup/${q._id}`}>
                        <button
                          type="button"
                          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        >
                          See Quotations
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorQuataionList;
