import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { AlertCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb.jsx";
import { useAuthContext } from "@/hooks/useAuthContext.js";

const SetQuotation = () => {
    //const { dispatch } = useUserContext();
    const { user } = useAuthContext();
  const { id } = useParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [genericName, setGenericName] = useState("");
  const [currentBrand, setCurrentBrand] = useState("");
  const [quotationPrice, setQuotationPrice] = useState("");
  const [arrivalTimePeriod, setArrivalTimePeriod] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState("");
  const [comments, setComments] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const vendorQuotation = {
      orderNumber,
      currentBrand,
      quotationPrice: parseFloat(quotationPrice),  // Ensure it's a number
      arrivalTimePeriod,
      warrantyPeriod,
      numberOfUnits: parseInt(numberOfUnits, 10),  // Ensure it's an integer
      comments,
      role:user.role,
      name:user.firstName,
      genericName
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/quotation", {
        method: "POST",
        body: JSON.stringify(vendorQuotation),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      const json = await response.json();
  
      if (response.ok) {
        setIsSuccess(true);
        //resetFormFields();
      } else {
        setError(json.error || "An error occurred");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit quotation");
      setIsSuccess(false);
    }
  };
  

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/purchasingReq/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setGenericName(json.genericName);
          
          setOrderNumber(json.orderNumber);
          setWarrantyPeriod(json.warrantyPeriod);
          
         
        } else {
          console.error('Failed to fetch quotation data:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch quotation data:', error.message);
      }
    };

    fetchQuotation();
  }, [id, user.token]);

  return (
    <div>
      {/* Breadcrumb */}
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

      {/* Card */}
      <Card className="max-w-5xl mx-auto w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Enter Equipment Information</CardTitle>
          <CardDescription>Please fill out the following fields:</CardDescription>

          {/* Error and Success Alerts */}
          {error && (
            <Alert variant="destructive" className="bg-red-100">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isSuccess && (
            <Alert variant="default" className="bg-green-100">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Quotation submitted successfully!</AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  disabled 
                  className="disabled:text-gray-900 disabled:opacity-90"
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="currentBrand">Current Brand</Label>
                <Input
                  type="text"
                  id="currentBrand"
                  value={currentBrand}
                  onChange={(e) => setCurrentBrand(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="quotationPrice">Quotation Price</Label>
                <Input
                  type="number"
                  id="quotationPrice"
                  value={quotationPrice}
                  onChange={(e) => setQuotationPrice(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="arrivalTimePeriod">Arrival Time Period</Label>
                <Input
                  type="date"
                  id="arrivalTimePeriod"
                  value={arrivalTimePeriod}
                  onChange={(e) => setArrivalTimePeriod(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="warrantyPeriod">Warranty Period</Label>
                <Input
                  type="text"
                  id="warrantyPeriod"
                  value={warrantyPeriod}
                  onChange={(e) => setWarrantyPeriod(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numberOfUnits">Number of Units</Label>
                <Input
                  type="number"
                  id="numberOfUnits"
                  value={numberOfUnits}
                  onChange={(e) => setNumberOfUnits(e.target.value)}
                />
              </div>
            </div>

            <div className="my-4">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <Button type="submit">Submit Quotation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetQuotation;
