import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { AlertCircle } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";


const AddEquipment = () => {
    const { dispatch } = useUserContext();
    const { user } = useAuthContext();

    const [serialNumber, setSerialNumber] = useState("");
    const [vendorID, setVendorID] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [ward, setWard] = useState("");
    const [status, setStatus] = useState("");
    const [purchasingDate, setPurchasingDate] = useState("");
    const [warrantyPeriod, setWarrantyPeriod] = useState("");
    const [cost, setCost] = useState("");
    const [genericName, setGenericName] = useState("");
    const [comment, setComment] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const resetFormFields = () => {
        setSerialNumber("");
        setVendorID("");
        setBrand("");
        setModel("");
        setWard("");
        setStatus("");
        setPurchasingDate("");
        setWarrantyPeriod("");
        setCost("");
        setGenericName("");
        setComment("");
        setEquipmentType("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const CreateReq = {
            serialNumber,
            vendorID,
            brand,
            model,
            ward,
            status,
            purchasingDate,
            warrantyPeriod,
            cost,
            genericName,
            comment,
            equipmentType,
        };

        try {
            fetch("http://localhost:4000/api/equipment/createequipment", {
                method: "POST",
                body: JSON.stringify(CreateReq),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }).then(async res => {
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
                            <AlertDescription>
                                {error}
                            </AlertDescription>
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
                                <Label htmlFor="vendorID">Vendor ID</Label>
                                <Input
                                    id="vendorID"
                                    type="text"
                                    placeholder="Enter Vendor ID"
                                    required
                                    onChange={(e) => setVendorID(e.target.value)}
                                    value={vendorID}
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
                                <Label htmlFor="equipmentType">Equipment Type</Label>
                                <Select onValueChange={setEquipmentType} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Equipment Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Technical">Technical</SelectItem>
                                            <SelectItem value="Non-Technical">Non-Technical</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="ward">Ward / Unit Name</Label>
                                <Select onValueChange={setWard}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Ward" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Surgical Wards</SelectLabel>
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
                                <Label htmlFor="status">Status</Label>
                                <Select onValueChange={setStatus} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Not Active">Not Active</SelectItem>
                                            <SelectItem value="Repair">Repair</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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
                                <Label htmlFor="cost">Cost</Label>
                                <Input
                                    id="cost"
                                    type= "number"  min="1"
                                    placeholder="Enter Cost"
                                    required
                                    onChange={(e) => setCost(e.target.value)}
                                    value={cost}
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

export default AddEquipment;
