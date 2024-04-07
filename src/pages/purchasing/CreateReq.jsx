import React, { useState } from "react";
import { useUserContext } from "../../hooks/PurchasingEquipment";
import { useAuthContext } from "../../hooks/useAuthContext";

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
import { Textarea } from "@/components/ui/textarea"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"


const CreateReq = () => {
  const { dispatch } = useUserContext();
  const { user } = useAuthContext();

  const [serialNumber, setSerialNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [purchasingDate, setPurchasingDate] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [genericName, setGenericName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Track success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CreateReq = {
      serialNumber,
      vendor,
      brand,
      model,
      purchasingDate,
      warrantyPeriod,
      genericName,
      equipmentType,
      comment,
    };
    
   
    try {
      const response = await fetch("http://localhost:4000/api/purchasingReq/create", {
        method: "POST",
        body: JSON.stringify(CreateReq),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        // Handle error response
      } else {
        // Handle success response
        setSuccessMessage("Purchasing request create successfully"); // Set success message
        // Reset form fields
        setSerialNumber("");
        setVendor("");
        setBrand("");
        setModel("");
        setPurchasingDate("");
        setWarrantyPeriod("");
        setGenericName("");
        setEquipmentType("");
        setComment("");
        //setSuccessMessage("");
        // Dispatch action if needed
        dispatch({ type: "createAddUser", payload: json });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle fetch error
    }
  };
  
  return (
    <div>
        <Card className="max-w-2xl mx-auto w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Enter Equipment Information</CardTitle>
        <CardDescription>Please fill out the following fields:</CardDescription>
        {/* Error handling component */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
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
              <Label htmlFor="serialNumber">Vendor</Label>
              <Input
                id="vendor"
                type="text"
                placeholder="Enter Serial Number"
                required
                onChange={(e) => setVendor(e.target.value)}
                value={vendor}
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
    <label htmlFor="equipmentType">Type</label>
    <select id="equipmentType" value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} required>
        <option value="">Select Type</option>
        <option value="technical">Technical</option>
        <option value="non-technical">Non-Technical</option>
    </select>
</div>

            <div className="grid gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment"
                type="text"
                placeholder="Enter Comment"
                required
                onChange={(e) => setComment(e.target.value)}
                value={comment} />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
      
    </Card>
    {successMessage && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            margin: "20px auto",
            maxWidth: "400px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "green", marginRight: "10px" }}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          <span style={{ verticalAlign: "middle" }}>{successMessage}</span>
        </div>
      )}

    </div>
  );
};

export default CreateReq;
