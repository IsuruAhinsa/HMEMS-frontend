import React, { useState, useEffect } from "react";
import { useUserContext } from "@/hooks/PurchasingEquipment";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom"; // Import to get the route parameters

const DrrepairReqOrPR = () => {

    const [minDate, setMinDate] = useState('');
    const { dispatch } = useUserContext();
    const { user } = useAuthContext();
    const { id } = useParams(); // Get the ID from the URL
   
    const [serialNumber, setSerialNumber] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [ValidationValue, setValidationValue] = useState("");
    const [genericName, setGenericName] = useState("");
    const [comment, setComment] = useState("");
    const [insdate, setInsdate] = useState(""); // Initialize insdate state
    const [ward, setWard] = useState("");
    const [wardLineMatrix, setWardLineMatrix] = useState("");
    const [requestType, setrequestType] = useState("");


    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [buttonVisible, setButtonVisible] = useState(true); // Add button visibility state


    
    const resetFormFields = () => {
        setSerialNumber("");
        setBrand("");
        setModel("");
        setValidationValue("");
        setGenericName("");
        setComment("");
        setrequestType("");
        setInsdate(""); // Reset insdate field
    };

    const fetchRepairDetails = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/api/wardadminforwardtechnicient/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await res.json();

            if (res.ok) {
                setSerialNumber(data.serialNumber);
                setBrand(data.brand);
                setModel(data.model);
                setValidationValue(data.ValidationValue);
                setGenericName(data.genericName);
                setComment(data.comment);
                setInsdate(data.insdate); // Populate insdate field
                setWard(data.ward);
                setWardLineMatrix(data.wardLineMatrix);
                setrequestType(data.requestType); 

                
            } else {
                setError(data.error || "Failed to load repair details.");
            }
        } catch (error) {
            console.error("Error fetching repair details:", error);
            setError("Failed to load repair details.");
        }
    };

    useEffect(() => {
        if (id) {
            fetchRepairDetails(id);
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors before submitting

        const CreateReq = {
            serialNumber,
            brand,
            model,
            ValidationValue,
            genericName,
            insdate,
            requestType,
            comment,
        };

        try {
            // First, send the POST request to create a new entry
            const res = await fetch("http://localhost:4000/api/insdate/", {
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
              setButtonVisible(false); // Hide the button permanently
              resetFormFields();
              dispatch({ type: "createAddUser", payload: json });
          
              // After the POST request is successful, send the DELETE request
              const deleteResponse = await fetch(`http://localhost:4000/api/insdate/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              });
          
              if (deleteResponse.ok) {
                console.log("Item deleted successfully.");
              } else {
                const deleteJson = await deleteResponse.json();
                console.error("Failed to delete item:", deleteJson.error);
              }
            } else {
              setError(json.error || "Submission failed.");
              setIsSuccess(false);
            }
          } catch (error) {
            console.error("Error posting repair request:", error);
            setError("An unexpected error occurred.");
          }
          
    }






    useEffect(() => {
        const today = new Date();
        setMinDate(today.toISOString().split('T')[0]);
    }, []);

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
                    <CardTitle className="text-2xl">Equipment Repair Information</CardTitle>
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
                            <AlertDescription>
                                Repair request forwarded successfully to Ward Admin.
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
                                    readOnly
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
                                <Label htmlFor="model">Request Type</Label>
                                <Input
                                    id="model"
                                    readOnly
                                    value={requestType}
                                                                   />
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="ward">Ward</Label>
                                <Input
                                    id="ward"
                                    placeholder="Ward"
                                    readOnly
                                    value={ward}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="wardLineMatrix">Ward Line Matrix</Label>
                                <Input
                                    id="wardLineMatrix"
                                    placeholder="Ward Line Matrix"
                                    readOnly
                                    value={wardLineMatrix}
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
                                <Label htmlFor="insdate">Inspection Date</Label>
                                <Input
                                    id="insdate"
                                    type="date"
                                    placeholder="Inspection Date"
                                    value={insdate}
                                    min={minDate}
                                    onChange={(e) => setInsdate(e.target.value)}
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
                        </div>
                        <div className="flex justify-end mt-4">
                            {buttonVisible && !isSuccess && <Button type="submit">Forward to Ward Admin</Button>}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default DrrepairReqOrPR;
