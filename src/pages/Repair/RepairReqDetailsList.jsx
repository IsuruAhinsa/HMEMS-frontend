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
import { useAuthContext } from "@/hooks/useAuthContext";
import defineAbilities from "@/lib/defineAbility";

const RepairReqDetailsList = () => {
  const { user } = useAuthContext();
  const abilities = defineAbilities(user);
  const canNotCreateUser = abilities.can("create", "User");
  const canCreateUser = abilities.cannot("create", "User");

  const [repairInsReqs, setRepairInsReqs] = useState([]);
  const [filteredRepairInsReqs, setFilteredRepairInsReqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    "serialNumber",
    "model",
    "comment",
    "brand",
    "ValidationValue",
    "genericName",
    "insdate",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items to display per page
  const dropdownRef = useRef(null);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredRepairInsReqs.length / itemsPerPage);

  useEffect(() => {
    const fetchRepairInsReqsData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/insdate/"
        );
        if (response.ok) {
          const data = await response.json();
          setRepairInsReqs(data);
          setFilteredRepairInsReqs(data);
        } else {
          console.error("Failed to fetch repair inspection requests:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch repair inspection requests:", error.message);
      }
    };

    fetchRepairInsReqsData();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:4000/api/insdate/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const updatedRepairInsReqs = repairInsReqs.filter((req) => req._id !== id);
      setRepairInsReqs(updatedRepairInsReqs);
      setFilteredRepairInsReqs(updatedRepairInsReqs);
    } else {
      console.error("Failed to delete repair inspection request:", response.statusText);
    }
  };

  useEffect(() => {
    const filtered = repairInsReqs.filter((req) =>
      Object.values(req).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRepairInsReqs(filtered);
    setCurrentPage(1); // Reset current page when search term changes
  }, [searchTerm, repairInsReqs]);

  useEffect(() => {
    if (sortBy && sortOrder) {
      const sortedData = [...filteredRepairInsReqs].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredRepairInsReqs(sortedData);
    }
  }, [sortBy, sortOrder, filteredRepairInsReqs]);

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
  const currentItems = filteredRepairInsReqs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetSorting = () => {
    setSortBy(null);
    setSortOrder(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 mt-8">
        <div className="relative">
          <p className="-mt-4 font-semibold text-gray-900">
            Repair Inspection Requests
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

            <Button
              onClick={() => setShowDropdown(!showDropdown)}
              className="right-0 px-2 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-r shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Toggle Columns
            </Button>

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
                  {Object.keys(repairInsReqs[0]).map(
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
                  {currentItems.map((req) => (
                    <tr
                      key={req._id}
                      className={`${
                        req.ValidationValue === "Critical" ? "bg-red-200" : 
                        req.ValidationValue === "Warning" ? "bg-yellow-200" : 
                        req.ValidationValue === "Safe" ? "bg-green-200" : 
                        ""
                      }`}
                    >
                      {visibleColumns.map((column) => (
                        <td
                          key={column}
                          className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                          {req[column]}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Close Job
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this request?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                              Your Repair is Now Complete OR get the Tecnicient Advice
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Not Yet</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(req._id)}
                              >
                                Yes
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Next
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairReqDetailsList ;
