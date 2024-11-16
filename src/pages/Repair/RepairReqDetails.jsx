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

const RepairDetails = () => {
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
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const resetFormFields = () => {
        setSerialNumber("");
        setBrand("");
        setModel("");
        setValidationValue("");
        setGenericName("");
        setComment("");
        setInsdate(""); // Reset insdate field
    };

    const fetchRepairDetails = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/api/repaireq/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await res.json();

            if (res.ok) {
                // Populate the form fields with fetched data
                setSerialNumber(data.serialNumber);
                setBrand(data.brand);
                setModel(data.model);
                setValidationValue(data.ValidationValue);
                setGenericName(data.genericName);
                setComment(data.comment);
                setInsdate(data.insdate); // Populate insdate field
            } else {
                setError(data.error);
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

        

        // Step 1: Post the new repair request data
        const CreateReq = {
            serialNumber,
            brand,
            model,
            ValidationValue,
            genericName,
            insdate,
            comment,
        };

        try {
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
                resetFormFields();
                dispatch({ type: "createAddUser", payload: json });
            } else {
                setError(json.error);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error posting repair request:", error);
            setError("An unexpected error occurred.");
        }


        // Step 2: Delete the existing repair request
        if (insdate!=null){
            const deleteRes = await fetch(`http://localhost:4000/api/repaireq/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!deleteRes.ok) {
                const deleteError = await deleteRes.json();
                setError(deleteError.error);
                return;
            }
        } else  {
            console.error("Error deleting repair request:", error);
            setError("Failed to delete repair request.");
            return;
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
                                <Label htmlFor="insdate">Inspection Date</Label>
                                <Input
                                    id="insdate" // Correct the ID here
                                    type="date"
                                    placeholder="Inspection Date"
                                    value={insdate} // Bind the value to insdate state
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
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RepairDetails;
