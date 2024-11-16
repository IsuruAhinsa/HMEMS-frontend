import React, { useState, useEffect, useRef } from "react";
//import { useNavigate } from "react-router-dom";
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

const QuotationHistoryGroupList = () => {
  const { user } = useAuthContext();
 // const navigate = useNavigate();
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
    "requestpriority",
    "status"
   // "comments",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [purchaseStatus, setPurchaseStatus] = useState(
    JSON.parse(localStorage.getItem("purchaseStatus")) || {}
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
            status:item.status,
           requestpriority:item.requestpriority,


            role: item.role,
            name: item.firstName,
           comments: item.comments,
            _id: item._id,
            prType: item.prType,
            email:item.email
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
  }, [id]);

  const getPriorityClass = (requestpriority) => {
    switch (requestpriority) {
      case 'Emergency':
        return 'text-red-700';
      case 'Stand':
        return 'text-amber-500';
      case 'Minor':
        return 'text-green-700';
      case 'Other':
        return 'text-sky-600';
      default:
        return '';
    }
  };

  const  handledelete = async (ward) => {
    // console.log(ward);
     try {
       await fetch(`http://localhost:4000/api/quotation/${ward._id}`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
       
         body: JSON.stringify(ward),
 
         
       });

      } catch (error) {
        console.error("Failed to delete quotation:", error.message);
      }
    };
  
  
  const  handleConfirm = async (ward) => {
   // console.log(ward);
    try {
      // const response = await fetch(`http://localhost:4000/api/quotation/${ward._id}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      
      //   body: JSON.stringify(ward),

        
      // });
      const response = await fetch(`http://localhost:4000/api/quotation/${ward._id}`, {
        method: "PATCH", // Use PATCH for partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Super Admin Approve" }), // Send updated status
      });

      
      if (response.ok) {
        // Remove the deleted quotation from the state
        const updatedWard = ward.filter((item) => item._id !== id);
        setQuotations(updatedWard);
        setFilteredQuotations(updatedWard);

        // Update the purchase status
        const updatedStatus = {
          ...purchaseStatus,
          [id]: true,
        };
        setPurchaseStatus(updatedStatus);
        localStorage.setItem("purchaseStatus", JSON.stringify(updatedStatus)); // Save to localStorage
        //navigate(`/vendor/quatation/setquatationList/QuatationGroup/${ward.orderNumber}`);
       


        
      } else {
        console.error("Failed to delete quotation:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete quotation:", error.message);
    }
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
            Vendor Quotations
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
  {currentItems.map((wardItem) => {
    const priorityClass = getPriorityClass(wardItem.requestpriority);
    console.log(`Row priority: ${wardItem.requestpriority}, Class: ${priorityClass}`);
    return (
      <tr
        key={wardItem._id}
        className={`${priorityClass} bg-white`} // Ensures the row color changes based on priority
      >
        {visibleColumns.map((column) => (
          <td
            key={column}
            className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
          >
            {wardItem[column]}
          </td>
        ))}
        
        {/* Button section */}
        <td className="flex justify-center px-6 py-4 text-sm font-medium whitespace-nowrap">
          {purchaseStatus[wardItem._id] ? (
            <button className="text-green-600">Purchased</button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>


                {wardItem.status != "Super Admin Approve" &&
                <button className="mr-4 text-indigo-600 hover:text-indigo-900">
                  Accept
                </button>

                  }
                
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
                  <AlertDialogAction
                    onClick={() => handleConfirm(wardItem)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </td>






        <td className="justify-center p-4 px-6 text-sm font-medium whitespace-nowrap">
          {purchaseStatus[wardItem._id] ? (
            <button className="text-green-600">Purchased</button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>

              {wardItem.status != "Super Admin Approve" &&
                <button className="mr-4 text-red-600 hover:text-indigo-900">
                 Reject
                </button>
               }
                
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your final decision is to Delete this Quatation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handledelete(wardItem)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </td>













        
      </tr>
    );
  })}
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
                      } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium`}
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

export default QuotationHistoryGroupList;
