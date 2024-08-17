import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
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

const CreateReq = () => {
  const { id } = useParams();

  const [prOneData, setPrOneData] = useState(null);
  // console.log(id);
  const { dispatch } = useUserContext();
  const { user } = useAuthContext();
  const [condition, setCondition] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [purchasingDate, setPurchasingDate] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [genericName, setGenericName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [numberOfUnit, setNumberOfUnit] = useState("");

  const [ward, setWard] = useState("");
  //const [orderNumber, setorderNumber] = useState("");
  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const resetFormFields = () => {
    setCondition("");
    setSerialNumber("");
    setVendor("");
    setBrand("");
    setModel("");
    setPurchasingDate("");
    setWarrantyPeriod("");
    setGenericName("");
    setEquipmentType("");
    setNumberOfUnit("");
    setWard("");
    //setorderNumber("");
    setComment("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CreateReq = {
      condition,
      serialNumber,
      vendor,
      brand,
      model,
      purchasingDate,
      warrantyPeriod,
      genericName,
      equipmentType,
      numberOfUnit,
      ward,
      //orderNumber,
      comment,
    };

    try {
      fetch("http://localhost:4000/api/purchasingReq/create", {
        method: "POST",
        body: JSON.stringify(CreateReq),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }).then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          setIsSuccess(true);
          resetFormFields();
          dispatch({ type: "createAddUser", payload: json });
        }

        if (!res.ok) {
          setError(json.error);
          setIsSuccess(false);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };


useEffect(() => {
  fetch(`http://localhost:4000/api/wardPurchasingReq/${id}`, {
        method: "GET",
        body: JSON.stringify(CreateReq),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }).then(async (res) => {
        
        if (res.ok) {
          
          const json = await res.json();
             
             setPrOneData(json);
            //  setModel(json.model);
            //  setGenericName(json.genericName);

            setCondition(json.condition);
            setSerialNumber(json.serialNumber);
            setVendor(json.vendor);
            setBrand(json.brand);
            setModel(json.model);
            setPurchasingDate(json.purchasingDate);
            setWarrantyPeriod(json.warrantyPeriod);
            setGenericName(json.genericName);
            setEquipmentType(json.equipmentType);
            setNumberOfUnit(json.numberOfUnit);
            setWard(json.ward);
            //setorderNumber(json.orderNumber);
            setComment(json.comment);





             
        }
  
        if (!res.ok) {
          setError(json.error);
          setIsSuccess(false);
        }
      });
}, [id]);

//console.log(prOneData);
  

  
 




  
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
          <CardTitle className="text-2xl">Enter Equipment Information</CardTitle>
          <CardDescription>Please fill out the following fields:</CardDescription>
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
              <AlertDescription>Purchasing request create successfully</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="equipmentType">Order Equipment Condition</Label>
                <Select onValueChange={setCondition} value={condition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Condition</SelectLabel>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="brand_new">Brand new</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {condition === "used" && (
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
              )}

              {/* <div className="grid gap-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  type="number"
                  min="1"
                  placeholder="Enter Order Number"
                  required
                  onChange={(e) => setorderNumber(e.target.value)}
                  value={orderNumber}
                />
              </div> */}

              <div className="grid gap-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Select onValueChange={setVendor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Vendor" />
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
                    <Label htmlFor="equipmentType">Type</Label>
                    <Select onValueChange={setEquipmentType}>
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
                    <Label htmlFor="numberOfUnit">Number of Units</Label>
                    <Input
                      id="numberOfUnit"
                      type="number"
                      min="1"
                      placeholder="Enter units amount"
                      required
                      onChange={(e) => setNumberOfUnit(e.target.value)}
                      value={numberOfUnit}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ward">Need Ward/Unit Name</Label>
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
                  <div className="grid gap-x-2">
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea
                      id="comment"
                      type="text"
                      placeholder="Enter Comment"
                      required
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
      );
    };
    
    export default CreateReq;
    