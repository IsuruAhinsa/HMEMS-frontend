import React, { useState } from "react";
import { useUserContext } from "@/hooks/useUserContext.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Button } from "@/components/ui/button.jsx";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";

const CreateUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("");
    const [ward, setWard] = useState("");
    const { addUser, error, isLoading, isSuccess } = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addUser(
                email,
                password,
                firstName,
                lastName,
                addressLine1,
                addressLine2,
                contact,
                role,
                ward // Include ward in addUser function
            );
            // Clear input fields on success
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setAddressLine1("");
            setAddressLine2("");
            setContact("");
            setRole("");
            setWard(""); // Clear selected ward
            
        } catch (error) {
            console.error('addUser failed:', error.message);
        }
    };

    return (
        <div>
            <Card className="max-w-2xl mx-auto w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Create User</CardTitle>
                    <CardDescription>Please fill out the following fields using correct details:</CardDescription>
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
                                User added successfully!
                            </AlertDescription>
                        </Alert>
                    )}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="serialNumber">Email address</Label>
                                <Input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                         
                            <div className="grid gap-2">
                                <Label htmlFor="model">First Name</Label>
                                <Input
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="purchasingDate">Last Name</Label>
                                <Input
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="warrantyPeriod">Address Line 1</Label>
                                <Input
                                    type="text"
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                    value={addressLine1}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="genericName">Address Line 2</Label>
                                <Input
                                    type="text"
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                    value={addressLine2}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="genericName">Contact</Label>
                                <Input
                                    type="text"
                                    onChange={(e) => setContact(e.target.value)}
                                    value={contact}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={setRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select Role</SelectLabel>
                                            <SelectItem value="wardAdmin">Ward Admin</SelectItem>
                                            <SelectItem value="Electrician">Electrician</SelectItem>
                                            <SelectItem value="TechnicalVendor">Technical Vendor</SelectItem>
                                            <SelectItem value="NonTechnicalVendor">Non Technical vendor</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Display ward selection if role is "Ward Admin" */}
                            {role === "wardAdmin" && (
                                <div className="grid gap-2">
                                    <Label htmlFor="ward">Ward</Label>
                                    <Select onValueChange={setWard}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Ward" />
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
                                            
                                                <SelectLabel>Special Units  </SelectLabel>
                                                <SelectGroup>
                                                <SelectItem value="Scan_Room">Scan Room</SelectItem>
                                                <SelectItem value="ICU">ICU</SelectItem>
                                                <SelectItem value="XRay_Room">X-Ray Room</SelectItem>
                                                <SelectItem value="Radiology_Room">Radiology Room</SelectItem>
                                                <SelectItem value="Lab">Lab</SelectItem>
                                                </SelectGroup>
                                              
                                                
                                           
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                )}
                                {isLoading ? "Adding User..." : "Add User"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateUser;
