import React, { useState } from "react";
import { useUserContext } from "@/hooks/PurchasingEquipment";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@radix-ui/react-select";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


const RepairRequest = () => {
  const { dispatch } = useUserContext();
  const { user } = useAuthContext();

  const [serialNumber, setSerialNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [ValidationValue, setValidationValue] = useState("");
  const [genericName, setGenericName] = useState("");
  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
 const [status, setStatus] = useState("");
  const resetFormFields = () => {
    setSerialNumber("");
    setBrand("");
    setModel("");
    setValidationValue("");
    setGenericName("");
    setComment("");
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CreateReq = {
      serialNumber,
      brand,
      model,
      ValidationValue,
      genericName,
      comment,
      status
    };

    try {
      const res = await fetch("http://localhost:4000/api/repaireq/", {
        method: "POST",
        body: JSON.stringify(CreateReq),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        resetFormFields();
        dispatch({ type: "createAddUser", payload: json });
      } else {
        setError(json.error);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              <BreadcrumbPage>Equipment Repair Information</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="max-w-5xl mx-auto w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Equipment Repair Information
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
                Repair request created successfully
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
                  placeholder="Serial Number"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ValidationValue">Validation Value</Label>
                <Input
                  id="ValidationValue"
                  placeholder="Validation Value"
                  type="Number"
                  value={ValidationValue}
                  onChange={(e) => setValidationValue(e.target.value)}
                />
              </div>

             

              <div className="grid gap-2">
                <Label htmlFor="genericName">Generic Name</Label>
                <Input
                  id="genericName"
                  placeholder="Generic Name"
                  value={genericName}
                  onChange={(e) => setGenericName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>




              <div className="grid gap-2">


                
      <Label htmlFor="comment">Set status</Label>

    
      


      <select
  id="status"
  className="p-2 text-gray-700 border border-gray-300 rounded-md"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="" disabled>Select Comment</option>
  <option value="Emergency (1-3 days)" className="text-red-700">
    Emergency (1-3 days)
  </option>
  <option value="stand (within a week)" className="text-yellow-500">
    Stand (within a week)
  </option>
  <option value="Minor (within a month)" className="text-blue-700">
    Minor (within a month)
  </option>
</select>

     
      <div className="mt-2">
      
      </div>
    </div>




    
            </div>
           
           






            
            <div className="flex justify-end mt-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepairRequest;
