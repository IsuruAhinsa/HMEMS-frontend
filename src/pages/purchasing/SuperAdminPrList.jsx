import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import defineAbilities from "@/lib/defineAbility";

const SuperAdminPrList = () => {
  const { user } = useAuthContext();
  const abilities = defineAbilities(user);
  const canNotCreateUser = abilities.can("create", "User");
  const canCreateUser = abilities.cannot("create", "User");

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
   // "_id",
   // "condition",
    //"serialNumber",
    //"vendor",
    "brand",
    "model",
   // "purchasingDate",
    //"warrantyPeriod",
    //"genericName",
    "equipmentType",
    "numberOfUnit",
    "ward",
    "wardLineMatrix",
    "roomNumber",
    "orderNumber",
   
    
    "comment",
    "requestpriority",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dropdownRef = useRef(null);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  console.log(user);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/purchasingReq");
        if (response.ok) {
          const data = await response.json();

          let roleName;

          if (user.role === "TechnicalVendor") {
            roleName = "technical";
          } else if (user.role === "NonTechnicalVendor") {
            roleName = "non-technical";
          }

          if (user.role === "Super Administrator") {
            setRequests(data);
          } else if (user.role === "wardAdmin") {
            setRequests(data);
          } else {
            const filteredReq = data.filter((req) => req.vendor === roleName);
            setRequests(filteredReq);
          }
        } else {
          console.error(
            "Failed to fetch purchasing requests:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Failed to fetch purchasing requests:", error.message);
      }
    };

    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:4000/api/purchasingReq/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const updatedRequests = requests.filter((request) => request._id !== id);
      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests);
    } else {
      console.error("Failed to delete request:", response.statusText);
    }
  };

  useEffect(() => {
    const filtered = requests.filter((request) =>
      Object.values(request).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [searchTerm, requests]);

  useEffect(() => {
    if (sortBy && sortOrder) {
      const sortedData = [...filteredRequests].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredRequests(sortedData);
    }
  }, [sortBy, sortOrder, filteredRequests]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const toggleColumnVisibility = (column) => {
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 mt-8">
        <div className="relative">
          <p className="-mt-4 font-semibold text-gray-900">
            {" "}
            Super Admin Purchasing Request
          </p>
        </div>
        <div className="justify-end mb-4 sm:flex sm:items-center">
          <div className="relative flex space-x-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-40 p-4 py-2 border rounded shadow-md"
            />
            {/* <Button
              onClick={() => setShowDropdown(!showDropdown)}
              className="right-0 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-r shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Toggle Columns
            </Button> */}
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {Object.keys(requests[0]).map(
                    (column) =>
                      column !== "password" &&
                      column !== "__v" && (
                        <div
                          key={column}
                          className="flex items-center px-4 py-2"
                        >
                          <input
                            type="checkbox"
                            checked={visibleColumns.includes(column)}
                            onChange={() => toggleColumnVisibility(column)}
                            className="w-4 h-4 mr-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm font-semibold">
                            {column.toUpperCase()}
                          </span>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto sm:-mx-4 sm:-my-2 sm:mx-6 sm:my-0">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow md:rounded-lg">
           
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {visibleColumns.map((column) => (
                      <th
                        key={column}
                        className="relative px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                        onClick={() => handleSort(column)}
                      >
                        {column}
                        {sortBy === column && (
                          <span className="absolute top-0 right-0 mt-2 mr-4">
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                    ))}
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
  {currentItems.map((request) => (
    <tr
      key={request._id}
      className={`${
        request.requestpriority=== "Emergency"
          ? "bg-red-200"
          : request.requestpriority === "Stand"
          ? "bg-yellow-200"
          : request.requestpriority === "Minor"
          ? "bg-green-200"
          :request.requestpriority === "Other"
          ? "bg-blue-200"
          : ""
      }`}
    >
      {visibleColumns.map((column) => (
        <td
          key={column}
          className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
        >
          {request[column]}
        </td>
      ))}

      <td className="px-6 py-4 space-x-5 text-sm font-medium text-right whitespace-nowrap">
        <AlertDialog className="min-[320px]:text-center max-[600px]:bg-sky-300">
          {canCreateUser && (
            <>
              <AlertDialogTrigger asChild>
                <button className="text-green-600 hover:text-indigo-900">
                  Accept
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the purchasing request.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Link to={`/vendor/quatation/setquatation/${request._id}`}>
                    <AlertDialogAction
                      onClick={() => handleContinue(request._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </>
          )}
        </AlertDialog>

        <AlertDialog className="min-[320px]:text-center max-[600px]:bg-sky-300">
          {canCreateUser && (
            <AlertDialogTrigger className="text-red-600">Reject</AlertDialogTrigger>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                purchasing request.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(request._id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {canNotCreateUser && (
          <>
            {/* <button className="text-indigo-600 hover:text-indigo-900">
              Edit
            </button> */}

            <AlertDialog className="min-[320px]:text-center max-[600px]:bg-sky-300">
              <AlertDialogTrigger className="text-red-600">
                Delete
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the purchasing request.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(request._id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
        </div>
        <nav className="flex justify-center mt-4">
          <ul className="flex">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                onClick={() => paginate(i + 1)}
                className="px-3 py-1 cursor-pointer"
              >
                {i + 1}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SuperAdminPrList;
