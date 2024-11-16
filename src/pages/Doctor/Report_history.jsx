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
import { Link, useNavigate } from "react-router-dom";
import defineAbilities from "@/lib/defineAbility";
import { useAuthContext } from "@/hooks/useAuthContext";
import defineTechnicientAbilities from "@/lib/Technicient";

const IncidentEquipmentList = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const { user } = useAuthContext();
  const abilities = defineAbilities(user);
  const canCreateUser = abilities.can("create", "User");
  const vendorAbility = defineTechnicientAbilities(user);
  const canCreateQuotation = vendorAbility.can("create", "Quotation");
  const technicientAbility = defineTechnicientAbilities(user);
  const canViewCard = technicientAbility.can("view", "ElectricianCard");

  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const [sortOrder, setSortOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([
    "serialNumber",
    "model",
    "brand",
    "genericName",
    "reason",

    "ward",
    "roomNumber",
    "wardLineMatrix",
    "type",
    "requestType",
    "status",
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [ins, setins] = useState([]);

  // const [inst, setinst] = useState([]);
  // useEffect(() => {
  //   // Check each item in the 'ins' array and update the status if necessary
  //   const updatedItems = inst.map((equipmentItem) => {
  //     if (item.status === "Technicient Advide complete") {
  //       // Update the item status to "Technicient Advide complete" (if not already)
  //       return { ...item, status: "Technicient Advide complete" }; // You can modify the status if needed
  //     }
  //     return item;
  //   });

  //   // Set the updated items array (this could be set to your state or backend)
  //   setinst(updatedItems); // Assuming `setIns` is a state setter function for `ins`

  // }, [inst]); // Dependency array: Runs whenever `ins` array changes

  useEffect(() => {
    const fetchinsdata = async () => {
      // handleUpdateStatust(item._id, item.serialNumber);
      try {
        const response = await fetch("http://localhost:4000/api/insdate/");

        if (response.ok) {
          const data = await response.json();
          setins(data);
        } else {
          console.error("Failed to fetch equipment data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch equipment data:", error.message);
      }
    };

    fetchinsdata();
  }, []);

  const resolvePurchase = (seNum) => {
    // Check if the item with the specified serial number has the correct status
    const item = ins.find((ins) => ins.serialNumber === seNum);
    return item?.status === "Technicient Advice complete";
  };


  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/doctorRoutes/getalldoctorprreqs"
        );
        if (response.ok) {
          const data = await response.json();
          setEquipment(data);
          setFilteredEquipment(data);
        } else {
          console.error("Failed to fetch equipment data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch equipment data:", error.message);
      }
    };

    fetchEquipmentData();
  }, []);






  
  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/doctorRoutes/${id}`,
        {
          method: "PATCH", // or "PUT" if you prefer
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Ward Admin Reject" }),
        }
      );

      if (response.ok) {
        // Update the local equipment state to reflect the new status
        setEquipment((prevEquipment) =>
          prevEquipment.map((item) =>
            item._id === id ? { ...item, status: "Ward Admin Reject" } : item
          )
        );
        setFilteredEquipment((prevFilteredEquipment) =>
          prevFilteredEquipment.map((item) =>
            item._id === id ? { ...item, status: "Ward Admin Reject" } : item
          )
        );
      } else {
        console.error(
          "Failed to update equipment status:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleAccept = (id) => {
    navigate(`/Doctor/wardAdminAcceptDocReq/${id}`);
    // setAcceptedItems([...acceptedItems, id]);
    console.log("Accepted item with id:", id);
    setIsAccepted(true); // Hide the Accept button when accepted
  };

  useEffect(() => {
    const filtered = equipment.filter((equipmentItem) =>
      Object.values(equipmentItem).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEquipment(filtered);
    setCurrentPage(1);
  }, [searchTerm, equipment]);

  useEffect(() => {
    if (sortBy && sortOrder) {
      const sortedData = [...filteredEquipment].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredEquipment(sortedData);
    }
  }, [sortBy, sortOrder, filteredEquipment]);

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
  const currentItems = filteredEquipment.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetSorting = () => {
    setSortBy(null);
    setSortOrder(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/doctorRoutes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Assuming you want to update your UI after deletion
        const result = await response.json();
        console.log('Item deleted successfully:', result);
        // You could also update state here to remove the deleted item from the displayed list
      } else {
        console.log('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  





  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 mt-8">
        <p className="ml-6 -mt-1 font-semibold text-gray-900">
          Incident Request
        </p>
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
                  {Object.keys(equipment[0]).map(
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
                        className="relative py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer px-14"
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
                    <th className="px-16 py-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {currentItems.map((equipmentItem) => (
                    <tr
                      key={equipmentItem._id}
                      className={`${
                        equipmentItem.requestType === "Emergency"
                          ? "bg-red-200"
                          : equipmentItem.requestType === "Stand"
                          ? "bg-yellow-200"
                          : equipmentItem.requestType === "Minor"
                          ? "bg-green-200"
                          : equipmentItem.requestType === "Other"
                          ? "bg-blue-200"
                          : ""
                      }`}
                    >
                      {visibleColumns.map((column) => (
                        <td
                          key={`${equipmentItem._id}-${column}`}
                          className="px-16 py-4 text-sm font-medium text-righ whitespace-nowrap"
                        >
                          {equipmentItem[column]}
                        </td>
                      ))}

                      <td className="px-6 py-4 space-x-5 text-sm font-medium text-right whitespace-nowrap">
                        {user.role === "Doctor" ? (
                          equipmentItem.status == "Ward Admin Pending" &&   (
                            <Link to={`/ward/editcreatereq/doctor/${equipmentItem._id}`}>
                            <button
                              onClick={() => handleEdit(equipmentItem._id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          </Link>
                          
                            
                          )
                        ) : (
                          <>
                            {equipmentItem.status !== "Ward Admin Reject" &&
                              !resolvePurchase(equipmentItem.serialNumber) && (
                                <button
                                  onClick={() =>
                                    handleAccept(equipmentItem._id)
                                  } // Ensure handleAccept is defined
                                  className="text-green-500 hover:text-green-700"
                                >
                                  Accept
                                </button>
                              )}

                            {equipmentItem.status !== "Ward Admin Reject" && (
                              <button
                                onClick={() => handleReject(equipmentItem._id)} // handleReject function should be defined
                                className="text-red-600 hover:text-red-700"
                              >
                                Reject
                              </button>
                            )}

                            {equipmentItem.status === "Technicient Advice complete" && 
                              resolvePurchase(equipmentItem.serialNumber) && (
                                <button className="text-blue-700 hover:text-red-700">
                                  <Link
                                    to={`/wardadmin/sent/doctor/Pr/superadmin/${equipmentItem._id}`}
                                  >
                                    Purchase
                                  </Link>
                                </button>
                              )}



{/* <button
  onClick={() => handleDelete(equipmentItem._id)} // Pass the item ID to the delete handler
  className="text-red-900 hover:text-red-700"
>
  Delete
</button>
 */}








                          </>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            {user.role === "Doctor" && (
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            )}
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirm Deletion
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the equipment.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(equipmentItem._id)}
                              >
                                Continue
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
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm text-gray-700">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredEquipment.length)} of{" "}
              {filteredEquipment.length} results
            </p>
          </div>
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-2 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={resetSorting}>Reset Sorting</Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentEquipmentList;
