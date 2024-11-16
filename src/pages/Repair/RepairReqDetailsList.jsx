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
import { useNavigate } from "react-router-dom";

const RepairReqDetailsList = () => {
  const { user } = useAuthContext();
  const abilities = defineAbilities(user);
  const canCreateUser = abilities.can("create", "User");
  const canNotCreateUser = abilities.cannot("create", "User");

  const [repairInsReqs, setRepairInsReqs] = useState([]);
  const [filteredRepairInsReqs, setFilteredRepairInsReqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    "serialNumber",
    "model",
     "requestType",
    
    "brand",
    "genericName",
    "insdate",
    "status"
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items to display per page
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();
  // Calculate total number of pages
  const totalPages = Math.ceil(filteredRepairInsReqs.length / itemsPerPage);

  useEffect(() => {
    const fetchRepairInsReqsData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/insdate/");
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


  const handleComplete = async (id, serial) => {
   
    try {
      const response = await fetch(`http://localhost:4000/api/insdate/${id}`, {
        method: "PATCH", // Use PATCH to update instead of DELETE
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Technicient Advice complete" }), // Update status
      });
  
      if (response.ok) {
        // Update the local state to reflect the new status
        setRepairInsReqs((prevRepairInsReqs) =>
          prevRepairInsReqs.map((item) =>
            item._id === id ? { ...item, status: "Technicient Advice complete" } : item
          )
        );
        setFilteredRepairInsReqs((prevFilteredRepairInsReqs) =>
          prevFilteredRepairInsReqs.map((item) =>
            item._id === id ? { ...item, status: "Technicient Advice complete" } : item
          )
        );

//Update insident status
//console.log(serial)
//api/doctorRoutes/getbyserial/3345
 await fetch(`http://localhost:4000/api/doctorRoutes//updatebyserial/${serial}`, {
  method: "PATCH", // Use PATCH to update instead of DELETE
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: "Technicient Advice complete" }), // Update status
});     
        // Navigate to ReportHistory page if needed
        navigate("/Doctor/ReportHistory");
      } else {
        console.error("Failed to update repair request status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating repair request status:", error.message);
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
  {currentItems.map((wardItem) => (
    <tr
      key={wardItem._id}
      className={`${
        wardItem.requestType === "Emergency"
          ? "bg-red-200"
          : wardItem.requestType === "Stand"
          ? "bg-yellow-200"
          : wardItem.requestType === "Minor"
          ? "bg-green-200"
          : wardItem.requestType=== "Other"
          ? "bg-blue-200"
          : ""
      }`}
    >
      {visibleColumns.map((column) => (
        <td key={column} className="px-6 py-4 text-sm text-gray-500">
          {wardItem[column]}
        </td>
      ))}
      <td className="px-6 py-4 text-sm text-gray-500">
        <AlertDialog>
          <AlertDialogTrigger asChild>

          {wardItem.status != "Technicient Advide complete" && (

            
            <Button variant="destructive">Remove job</Button>
           )}

          
            
      
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Are you get the Technicient Adviced  correctly.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              
              
              <AlertDialogAction onClick={() => handleComplete(wardItem._id,wardItem.serialNumber)}>
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
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 text-sm ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairReqDetailsList;
