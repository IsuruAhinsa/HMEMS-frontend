import React, { useState, useEffect } from "react";
import { useUserContext } from "@/hooks/useUserContext.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import { Button } from "@/components/ui/button.jsx";
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const [email, setEmail] = useState("");
   // const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("");
    const { addUser, error, isLoading, isSuccess } = useUserContext();
    const { userId } = useParams();

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/user/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                setEmail(userData.email);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setAddressLine1(userData.addressLine1);
                setAddressLine2(userData.addressLine2 || ""); // Handle optional address line 2
                setContact(userData.contact);
                setRole(userData.role);
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error.message);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const updateUser = async (id, userData) => {
        try {
          const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          if (!response.ok) {
            throw new Error('Failed to update user');
          }
          // Optionally, handle success (e.g., show a success message)
          console.log('User updated successfully');
        } catch (error) {
          // Handle errors (e.g., show an error message)
          console.error('Failed to update user:', error.message);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userData = { email,firstName,lastName,addressLine1,addressLine2,contact,role };
          await updateUser(userId, userData); // Call the updateUser function

          setEmail('');
          setFirstName('');
          setLastName('');
          setAddressLine1('');
          setAddressLine2('');
          setContact('');
          setRole('');
        }
      
        
        catch (error) {
          console.error('Failed to update user:', error.message);
        }
      };
    

    return (
        <div>
            <Card className="max-w-2xl mx-auto w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Edit User</CardTitle>
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
                            {/* <div className="grid gap-2">
                                <Label htmlFor="brand">Password</Label>
                                <Input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div> */}
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
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                )}
                                {isLoading ? "Adding User..." : "Edit User"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditUser;
