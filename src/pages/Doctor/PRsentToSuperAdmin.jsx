import React, { useState, useEffect } from "react";
import { useUserContext } from "@/hooks/PurchasingEquipment.js";
import { useAuthContext } from "@/hooks/useAuthContext.js";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { AlertCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx";

const WardSentDrPRToSuper = () => {
  const { dispatch } = useUserContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const [condition, setCondition] = useState("Brand new");
  const [serialNumber, setSerialNumber] = useState("");
  const [reason, setReason] = useState("");
  const [ward, setWard] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [purchasingDate, setPurchasingDate] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [numberOfUnit, setNumberOfUnit] = useState("");
  const [genericName, setGenericName] = useState("");
  const [prType, setPrType] = useState("");
  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [wardLineMatrix, setWardLineMatrix] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
   // You need this ID to fetch specific data

  // Reset form fields function
  const resetFormFields = () => {
    setCondition("Brand new");
    setSerialNumber("");
    setReason("");
    setWard("");
    setBrand("");
    setModel("");
    setPurchasingDate("");
    setWarrantyPeriod("");
    setNumberOfUnit("");
    setGenericName("");
    setPrType("");
    setComment("");
    setWardLineMatrix("");
    setRoomNumber("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const CreateReq = {
      condition,
      serialNumber,
      reason,
      ward,
      brand,
      model,
      purchasingDate,
      warrantyPeriod,
      numberOfUnit,
      genericName,
      prType,
      comment,
      wardLineMatrix,
      roomNumber,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/wardPurchasingReq/wardprcreate",
        {
          method: "POST",
          body: JSON.stringify(CreateReq),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        resetFormFields();
        dispatch({ type: "createAddUser", payload: json });
      } else {
        setError(json.error);
        setIsSuccess(false);
      }

//api/doctorRoutes/getbyserial/3345
await fetch(`http://localhost:4000/api/doctorRoutes//updatebyserial/${serialNumber}`, {
  method: "PATCH", // Use PATCH to update instead of DELETE
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: "Super Admin Pending" }), // Update status
});     
        // Navigate to ReportHistory page if needed
 
  
  






      
    } catch (error) {
      console.error("Error:", error);
    }
  };






  
  // Fetch data for the form
  useEffect(() => {
    const fetchDoctorReq = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/doctorRoutes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setWard(json.ward);
          setWardLineMatrix(json.wardLineMatrix);
          setRoomNumber(json.roomNumber);
          setGenericName(json.genericName);
          setBrand(json.brand);
          setModel(json.model);
          setSerialNumber(json.serialNumber)
        setNumberOfUnit(json.numberOfUnit)
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchDoctorReq();
  }, [id, user.token]);

  return (
    <div>
      <div className="flex justify-end my-4">
        <Breadcrumb className="-mt-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Purchasing Requisitions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="max-w-5xl mx-auto w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Enter Purchasing Equipment Information
          </CardTitle>
          <CardDescription>
            Please fill out the following fields:
          </CardDescription>
          {error && (
            <Alert variant="destructive" className="bg-red-100">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isSuccess && (
            <Alert className="bg-green-200">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Purchasing request forward  successfully to SuperAdmin
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="condition">Order Equipment Condition</Label>
                <Input
                  type="text"
                  value="Brand new" // Set the value to "Brand new"
                  readOnly // Make the input non-editable
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reason">Purchasing Reason</Label>
                <Select onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Reason</SelectLabel>
                    
                     
                      <SelectItem value="Safety_Compliance">
                        Safety Compliance
                      </SelectItem>
                      <SelectItem value="Technological_Upgrades">
                        Technological Upgrades
                      </SelectItem>
                      <SelectItem value="Efficiency_Improvement">
                        Efficiency Improvement
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="genericName">Generic Name</Label>
                <Input
                  id="genericName"
                  type="text"
                  placeholder="Enter Generic Name"
                  required
                  onChange={(e) => setGenericName(e.target.value)}
                  value={genericName}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ward">Ward/Unit Name</Label>
                <Input
                  id="ward"
                  type="text"
                  required
                  readOnly
                  value={ward}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  type="text"
                  placeholder="Enter Brand"
                  required
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  readOnly
                  type="text"
                  placeholder="Ex-LD26"
                  required
                  onChange={(e) => setRoomNumber(e.target.value)}
                  value={roomNumber}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  type="text"
                  placeholder="Enter Model"
                  required
                  onChange={(e) => setModel(e.target.value)}
                  value={model}
                />
              </div>

              {condition === "used" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="purchasingDate">Purchasing Date</Label>
                    <Input
                      id="purchasingDate"
                      type="date"
                      required
                      onChange={(e) => setPurchasingDate(e.target.value)}
                      value={purchasingDate}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="warrantyPeriod">Warranty Period</Label>
                    <Input
                      id="warrantyPeriod"
                      type="text"
                      placeholder="Enter Warranty Period"
                      required
                      onChange={(e) => setWarrantyPeriod(e.target.value)}
                      value={warrantyPeriod}
                    />
                  </div>
                </>
              )}
<div className="grid gap-2">
                <Label htmlFor="wardLineMatrix">Ward/Line Matrix</Label>
                <Input
                  id="wardLineMatrix"
                  type="text"
                  readOnly
                  placeholder="Enter Ward/Line Matrix"
                  required
                  onChange={(e) => setWardLineMatrix(e.target.value)}
                  value={wardLineMatrix}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="numberOfUnit">Number of Unit</Label>
                <Input
                  id="numberOfUnit"
                  type="Number"
                  placeholder="Enter Number of Unit"
                  required
                  onChange={(e) => setNumberOfUnit(e.target.value)}
                  value={numberOfUnit}
                />
              </div>
                
              <div className="grid gap-2">
                <Label htmlFor="prType">Request Type</Label>
                <Select onValueChange={setPrType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Type</SelectLabel>
                      <SelectItem value="Emergency">
                        <div className="text-red-700">Emergency (1-3 days)</div>
                      </SelectItem>
                      <SelectItem value="Stand">
                        <div className="text-amber-500">
                          Stand (within a week)
                        </div>
                      </SelectItem>
                      <SelectItem value="Minor">
                        <div className="text-green-700">
                          Minor (within a month)
                        </div>
                      </SelectItem>
                      <SelectItem value="Other">
                        <div className="text-sky-600">Other</div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>


              <div className="grid gap-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Enter Comment"
                  required
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit">Forward to super Admin</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WardSentDrPRToSuper;
