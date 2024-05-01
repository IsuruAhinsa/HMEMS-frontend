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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import defineAbilities from "@/lib/defineAbility";

const WardPrList = () => {
    
    const { user } = useAuthContext();
    const abilities = defineAbilities(user);
    const canNotCreateUser = abilities.can("create", "User");
    const canCreateUser=abilities.cannot("create","User")
  
  const [ward, setWard] = useState([]);
  const [filteredWard, setFilteredWard] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    "_id",
    "serialNumber",
    "reason",
    "ward",
    "brand",
    "model",
    "purchasingDate",
    "warrantyPeriod",
    "genericName",
    "numberOfUnit",
    "comment",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const dropdownRef = useRef(null);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredWard.length / itemsPerPage);

  useEffect(() => {
    const fetchWardData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/wardPurchasingReq/getall");
        if (response.ok) {
          const data = await response.json();
          setWard(data);
          setFilteredWard(data);
        } else {
          console.error("Failed to fetch ward data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch ward data:", error.message);
      }
    };

    fetchWardData();
  }, []);


  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/wardPurchasingReq/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedwards = ward.filter((ward) => ward._id !== id);
      setWard(updatedwards);
      setFilteredWard(updatedwards);
    } else {
      console.error("Failed to delete user:", response.statusText);
    }
  };


  useEffect(() => {
    const filtered = ward.filter((wardItem) =>
      Object.values(wardItem).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredWard(filtered);
    setCurrentPage(1); // Reset current page when search term changes
  }, [searchTerm, ward]);

  useEffect(() => {
    if (sortBy && sortOrder) {
      const sortedData = [...filteredWard].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredWard(sortedData);
    }
  }, [sortBy, sortOrder, filteredWard]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {

        
      
      document.removeEventListener('mousedown', handleClickOutside);
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
  const currentItems = filteredWard.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetSorting = () => {
    setSortBy(null);
    setSortOrder(null);
  };



   
  return (

    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 mt-8">
      <div class="relative ...">
  <p className="-mt-4 font-semibold text-gray-900">Ward Purchasing Request</p>
  </div>
        <div className="justify-end mb-4 sm:flex sm:items-center">
        <div className="sm:flex sm:items-center">
      </div>
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
              className="right-0 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-r shadow-sm nset-y-0 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Toggle Columns 
            </Button>

            {showDropdown && (
              <div ref={dropdownRef} className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {Object.keys(ward[0]).map(
                    (column) =>
                      column !== "password" &&
                      column !== "__v" && (
                        <div key={column} className="flex items-center px-4 py-2">
                          <input
                            type="checkbox"
                            checked={visibleColumns.includes(column)}
                            onChange={() => toggleColumnVisibility(column)}
                            className="w-4 h-4 mr-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm font-semibold">{column.toUpperCase()}</span>
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
                    <tr key={wardItem._id}>
                      {visibleColumns.map((column) => (
                        <td
                          key={column}
                          className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                          {wardItem[column]}
                        </td>
                      ))}

                      {canCreateUser &&
                      
                      <td className="px-6 py-4 space-x-5 text-sm font-medium text-right whitespace-nowrap">
                      <Link to={`/wardadmin/wardpredit`}>
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      </Link>
                      <AlertDialog className="min-[320px]:text-center max-[600px]:bg-sky-300">
                        <AlertDialogTrigger className="text-red-600">Delete</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(wardItem._id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                      
                      }
                 
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


export default WardPrList;
