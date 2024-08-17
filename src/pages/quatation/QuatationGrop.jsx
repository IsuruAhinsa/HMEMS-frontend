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
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";

const QuotationGroupList = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [ward, setQuotations] = useState([]);
  const [filteredWard, setFilteredQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    "orderNumber",
    "currentBrand",
    "quotationPrice",
    "arrivalTimePeriod",
    "warrantyPeriod",
    "numberOfUnits",
    "role",
    "name",
    "comments",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [purchaseStatus, setPurchaseStatus] = useState(
    JSON.parse(localStorage.getItem("purchaseStatus")) || {} // Load from localStorage
  );
  const dropdownRef = useRef(null);

  const totalPages = Math.ceil(filteredWard.length / itemsPerPage);

  useEffect(() => {
    const fetchWardData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/quotation/getOrNum/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.map((item) => ({
            orderNumber: item.orderNumber,
            currentBrand: item.currentBrand,
            quotationPrice: item.quotationPrice,
            arrivalTimePeriod: item.arrivalTimePeriod,
            warrantyPeriod: item.warrantyPeriod,
            numberOfUnits: item.numberOfUnits,
            role: item.role,
            name: item.firstName,
            comments: item.comments,
            _id: item._id,
            prType: item.prType,
          }));
          setQuotations(filteredData);
          setFilteredQuotations(filteredData);
        } else {
          console.error("Failed to fetch ward data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch ward data:", error.message);
      }
    };

    fetchWardData();
  }, []);

  const handleConfirm = (id) => {
    const updatedStatus = {
      ...purchaseStatus,
      [id]: true,
    };
    setPurchaseStatus(updatedStatus);
    localStorage.setItem("purchaseStatus", JSON.stringify(updatedStatus)); // Save to localStorage
  };

  useEffect(() => {
    const filtered = ward.filter((wardItem) =>
      Object.values(wardItem).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredQuotations(filtered);
    setCurrentPage(1);
  }, [searchTerm, ward]);

  useEffect(() => {
    if (sortBy && sortOrder) {
      const sortedData = [...filteredWard].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredQuotations(sortedData);
    }
  }, [sortBy, sortOrder]);

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
  const currentItems = filteredWard.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetSorting = () => {
    setSortBy(null);
    setSortOrder(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 mt-8">
        <div className="relative">
          <p className="-mt-4 text-lg font-semibold text-gray-900">
            Vendor Quatations
          </p>
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



                      <td className="flex justify-center px-6 py-4 text-sm font-medium whitespace-nowrap">
                        {purchaseStatus[wardItem._id] ? (
                          <button className="text-green-600">Purchased</button>
                        ) : (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="mr-4 text-indigo-600 hover:text-indigo-900">
                                Accept
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. Your final decision is to buy this item.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>

                                <Link to={"/SuperAdmin/GroupQuatation/ConformtionMail"}>
                                <AlertDialogAction
                                  onClick={() => handleConfirm(wardItem._id)}
                                >
                                  Confirm
                                </AlertDialogAction>
                                </Link>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                <nav className="inline-flex -space-x-px rounded-md shadow-sm">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`${
                        currentPage === index + 1
                          ? "bg-indigo-500 text-white"
                          : "bg-white text-indigo-600"
                      } relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-indigo-500 hover:text-white`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationGroupList;
