import React, { useState, useEffect } from "react";
import { useUserContext } from "@/hooks/PurchasingEquipment.js";
import { useAuthContext } from "@/hooks/useAuthContext.js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useParams } from "react-router-dom";

const WardAdminAcceptDocReq = () => {
  const { dispatch } = useUserContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [serialNumber, setSerialNumber] = useState("");
  const [genericName, setGenericName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [ward, setWard] = useState("");
  const [wardLineMatrix, setWardLineMatrix] = useState("");
  const [numberOfUnit, setNumberOfUnit] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [prType, setPrType] = useState("");
  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const resetFormFields = () => {
    setSerialNumber("");
    setGenericName("");
    setBrand("");
    setModel("");
    setWard("");
    setWardLineMatrix("");
    setNumberOfUnit("");
    setRoomNumber("");
    setPrType("");
    setComment("");
    setPrType("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CreateReq = {
      serialNumber,
      brand,
      model,
      genericName,
      ward,
      wardLineMatrix,
      numberOfUnit,
      roomNumber,
      requestType: prType,  // Map prType to requestType
      comment,
    };

    try {
      // Make the POST request to create the ward admin forward technicient
      const response = await fetch(
        "http://localhost:4000/api/wardadminforwardtechnicient/createwardadminforwardtechnicient",
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
    
        // Now trigger the PATCH request to update the status
        const patchResponse = await fetch(`http://localhost:4000/api/doctorRoutes/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "Technicient Pending" }), // Update the status value here
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Include your authorization token
          },
        });
    
        const patchJson = await patchResponse.json();
    
        if (patchResponse.ok) {
          console.log("Status updated successfully:", patchJson);
        } else {
          console.error("Failed to update status:", patchJson.error);
          // Optionally handle this error (e.g., show a message to the user)
        }
      } else {
        setError(json.error);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
    
  };

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
          setGenericName(json.genericName);
          setSerialNumber(json.serialNumber);
          setBrand(json.brand);
          setModel(json.model);
          setWard(json.ward);
          setWardLineMatrix(json.wardLineMatrix);
          setNumberOfUnit(json.numberOfUnit);
          setRoomNumber(json.roomNumber);
          setPrType(json.prType);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
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
            Enter Purchasing Equipment Information - Doctor Request
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
                Purchasing request created successfully
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  type="text"
                  required
                  readOnly
                  value={serialNumber}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="genericName">Generic Name</Label>
                <Input
                  id="genericName"
                  type="text"
                  required
                  readOnly
                  value={genericName}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  type="text"
                  readOnly
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  type="text"
                  readOnly
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
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
                <Label htmlFor="wardLineMatrix">Ward Line Matrix</Label>
                <Input
                  id="wardLineMatrix"
                  type="text"
                  required
                  readOnly
                  value={wardLineMatrix}
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
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  type="text"
                  required
                  readOnly
                  value={roomNumber}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="comment">Comment</Label>
                <Input
                  id="comment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* <div className="grid gap-2">
                <Label htmlFor="numberOfUnit">Number of Units</Label>
                <Input
                  id="numberOfUnit"
                  type="number"
                  value={numberOfUnit}
                  onChange={(e) => setNumberOfUnit(e.target.value)}
                />
              </div> */}
            </div>

            <Button className="mt-6">Forward to technicient

              
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WardAdminAcceptDocReq;
