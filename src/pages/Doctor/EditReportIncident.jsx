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
import { Textarea } from "@/components/ui/textarea";
const EditCreateReq = () => {
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
    const [requestType, setrequestType] = useState(""); 
    const [type, setType] = useState("");
    const [reason, setReason] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
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
      setPrType("");
      setrequestType("");
      setReason("");
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
            setrequestType(json.requestType);
            setReason(json.reason);
          } else {
            console.error('Failed to fetch data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      fetchDoctorReq();
    }, [id, user.token]);
  
    // Update request function
    const updateReq = async (id, reqdata) => {
      try {
        const response = await fetch(`http://localhost:4000/api/doctorRoutes/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(reqdata),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update');
        }
        setSuccessMessage("Update Successful!");  // This should trigger re-render
      } catch (error) {
        console.error('Failed to update:', error.message);
      }
    };
  
    // Form submit handler
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const reqData = {
        serialNumber,
        genericName,
        brand,
        model,
        ward,
        wardLineMatrix,
        numberOfUnit,
        roomNumber,
        prType,
        requestType,
        reason,
        comment,
        type,
      };
  
      updateReq(id, reqData); // Pass the data to the update function
    };

  
  return (
    <div>
        {successMessage && <div style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</div>}

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
                  placeholder="Enter Serial Number"
                  required
                  onChange={(e) => setSerialNumber(e.target.value)}
                  value={serialNumber}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="prType">Request Type</Label>
                <Select onValueChange={setrequestType} value={requestType}>
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
                <Label htmlFor="ward">Select Ward/Unit Name</Label>
                <Select onValueChange={setWard} value={ward}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward/Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Ward</SelectLabel>
                      <SelectItem value="SurgicalWard">Surgical Ward</SelectItem>
                      <SelectItem value="MedicalWard">Medical Ward</SelectItem>
                      <SelectItem value="Children_Ward">Children's Ward</SelectItem>
                      <SelectItem value="Gynecology_Ward">Gynecology Ward</SelectItem>
                      <SelectItem value="Meternity_Ward">Meternity Ward</SelectItem>
                      <SelectItem value="Postnatal_Ward">Postnatal Ward</SelectItem>
                      <SelectItem value="Maternal_Sex_Ward">Maternal Sex Ward</SelectItem>
                      <SelectItem value="Emergency_Ward">Emergency Ward</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Special Units</SelectLabel>
                      <SelectItem value="Scan_Room">Scan Room</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="XRay_Room">X-Ray Room</SelectItem>
                      <SelectItem value="Radiology_Room">Radiology Room</SelectItem>
                      <SelectItem value="Lab">Lab</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

              <div className="grid gap-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  type=""
                 
                  required
                 
                  onChange={(e) => setRoomNumber(e.target.value)}
                  value={roomNumber}
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
                <Label htmlFor="wardLineMatrix"> Line matrix</Label>
                <Input
                  id="wardLineMatrix"
                  type="text"
                  placeholder="L2-4"
                  required
                  onChange={(e) => setWardLineMatrix(e.target.value)}
                  value={wardLineMatrix}
                />
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
                <Label htmlFor="type">Type-Tecnical OR Non Non Technical</Label>
                <Select onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Type</SelectLabel>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="non-technical">Non-Technical</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reason">Select Reason</Label>
                <Select onValueChange={setReason} value={reason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="maintenance">Not work</SelectItem>
                      <SelectItem value="repair">Technological Upgrades</SelectItem>
                      <SelectItem value="procurement">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Additional Comments"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="numberOfUnit">Damage Unit Count</Label>
                <Input
                  id="numberOfUnit"
                  type="number"
                  min="1"
                  placeholder="Enter the number of units"
                  required
                  onChange={(e) => setNumberOfUnit(e.target.value)}
                  value={numberOfUnit}
                />
              </div>
            </div>

            <div className="mt-4">
              <Button type="submit" className="mr-2">
               Update
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={resetFormFields}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCreateReq;
