import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RepairRequestList = () => {
  const [repairRequests, setRepairRequests] = useState([]);

  useEffect(() => {
    const fetchRepairRequests = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/repaireq/");
        if (response.ok) {
          const data = await response.json();
          setRepairRequests(data);
        } else {
          console.error("Failed to fetch repair requests:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch repair requests:", error.message);
      }
    };

    fetchRepairRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Emergency (1-3 days)":
        return "bg-red-300";
      case "stand (within a week)":
        return "bg-yellow-200";
      default :
        return "bg-green-200";
     
    }
  };

  const getTextColor = (status) => {
    switch (status) {
      case "General Comment":
        return "text-red-700";
      case "Needs Further Inspection":
        return "text-yellow-700";
      case "Urgent Issue":
        return "text-blue-700";
      
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 mt-8">
        <div className="relative">
          <p className="-mt-24 text-5xl font-semibold text-center text-gray-900">
            Repair Requests List
          </p>
        </div>

        <div className="overflow-x-auto sm:-mx-4 sm:-my-2 sm:mx-6 sm:my-0">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {repairRequests.map((req) => (
                <div
                  key={req._id}
                  className={`block text-center border rounded-lg ${getStatusColor(req.status)} text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white`}
                >
                  <div className="py-3 border-b-2 px-13 border-neutral-100 dark:border-white/110">
                    <p className={`mb-2 text-sm ${getTextColor(req.status)}`}>
                      Serial NO: {req.serialNumber}
                    </p>
                    <p className={`mb-2 text-sm ${getTextColor(req.status)}`}>
                      Model: {req.model}
                    </p>
                  </div>
                  <div className="p-6">
                    <h5 className={`mb-2 text-sm ${getTextColor(req.status)}`}>
                      Generic Name: {req.genericName}
                    </h5>
                    <Link to={`/vendor/repairrequests/details/${req._id}`}>
                      <button
                        type="button"
                        className="bg-pink-600 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 shadow-blue-500/50 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairRequestList;
