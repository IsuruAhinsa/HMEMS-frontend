import React from "react";
import purchasing from "../assets/imges/shopping.gif";
import rapair from "../assets/imges/rapair.gif";
import assets from "../assets/imges/assets.gif";
import emergancy from "../assets/imges/emergancy.gif";
import reject from "../assets/imges/rejected.gif";
import onging from "../assets/imges/ongoing.gif";
import userpro from "../assets/imges/add.gif";
import defineAbilities from "@/lib/defineAbility";
import { useAuthContext } from "@/hooks/useAuthContext";
import UserList from "./users/UserList";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Bell,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";



const Dashboard = () => {
    const { user } = useAuthContext();
    const abilities = defineAbilities(user);
    const canNotCreateUser = abilities.can("create", "User");
    const canCreateUser=abilities.cannot("create","User")
   
  return (
    <>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {canNotCreateUser && 

<Card
className="border border-green-500"
x-chunk="dashboard-01-chunk-0 "
>
<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
  <CardTitle className="text-sm font-medium">
    Purchasing request
  </CardTitle>
  <Bell className="w-4 h-4 text-muted-foreground" />
</CardHeader>

<img src={purchasing} className="w-20 ml-4" />
<CardContent>
  <Link to="/create/purchasing-req">
    <Button className="h-8 bg-blue-500">Purchase</Button>
  </Link>
</CardContent>
</Card>
      
      
      
      }
        

        
        {canCreateUser && 
            <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0 "
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
               Ward Equipments Purchasing request
              </CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={purchasing} className="w-20 ml-4" />
            <CardContent>
              <Link to="/wardadmin/purchasingreq">
                <Button className="h-8 bg-blue-500">Purchase</Button>
              </Link>
            </CardContent>
          </Card>
  
        
        
        }
    





        
        
       { canNotCreateUser && 
            <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Assets</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={assets} className="w-20 ml-4" />
            <CardContent>
              <Button className="h-8 bg-blue-500">Show Assets</Button>
            </CardContent>
          </Card>

       
           
          
        }
        
          {canCreateUser &&
            <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium"> Add Assets</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={assets} className="w-20 ml-4" />
            <CardContent>
              <Button className="h-8 bg-blue-500">Add</Button>
            </CardContent>
          </Card>
        
          
          
          }
      
        
       {/* {canCreateAssets(
             <Card
             className="border border-green-500"
             x-chunk="dashboard-01-chunk-0"
           >
             <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
               <CardTitle className="text-sm font-medium"> Add Assets</CardTitle>
               <Bell className="w-4 h-4 text-muted-foreground" />
             </CardHeader>
   
             <img src={assets} className="w-20 ml-4" />
             <CardContent>
               <Button className="h-8 bg-blue-500">Show Assets</Button>
             </CardContent>
           </Card>
       )} */}
      
    

        <Card
          className="border border-green-500"
          x-chunk="dashboard-01-chunk-0"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Emergency request
            </CardTitle>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>

          <img src={emergancy} className="w-16 mb-4 ml-4" />
          <CardContent>
            <Button className="h-8 bg-blue-500">Show Requests</Button>
          </CardContent>
        </Card>

        <Card
          className="border border-green-500"
          x-chunk="dashboard-01-chunk-0"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Repair request
            </CardTitle>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>

          <img src={rapair} className="w-20 ml-4" />
          <CardContent>
            <Button className="h-8 bg-blue-500">Show Requests</Button>
          </CardContent>
        </Card>

        <Card
          className="border border-green-500"
          x-chunk="dashboard-01-chunk-0"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Ongoing request
            </CardTitle>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>

          <img src={onging} className="w-20 ml-4" />
          <CardContent>
            <Button className="h-8 bg-blue-500">Show Requests</Button>
          </CardContent>
        </Card>

        <Card
          className="border border-green-500"
          x-chunk="dashboard-01-chunk-0"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Disposal request
            </CardTitle>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>

          <img src={reject} className="w-20 ml-4" />
          <CardContent>
            <Button className="h-8 bg-blue-500">Show Requests</Button>
          </CardContent>
        </Card>

{canNotCreateUser && (
      <Card
      className="border border-green-500"
      x-chunk="dashboard-01-chunk-0"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Users</CardTitle>
        <Bell className="w-4 h-4 text-muted-foreground" />
      </CardHeader>

      <img src={userpro} className="w-20 ml-4" />
      <CardContent>
        <Link to={"/userlist"}>
          <Button className="h-8 bg-blue-500">Show Users</Button>
        </Link>
      </CardContent>
    </Card>

    
)}
      
{canNotCreateUser &&
     <Card
     className="border border-green-500"
     x-chunk="dashboard-01-chunk-0"
   >
     <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
       <CardTitle className="text-sm font-medium">Quotations</CardTitle>
       <Bell className="w-4 h-4 text-muted-foreground" />
     </CardHeader>

     <img src={userpro} className="w-20 ml-4" />
     <CardContent>
       <Button className="h-8 bg-blue-500">Show Requests</Button>
     </CardContent>
   </Card>


}
   
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row ">
          </CardHeader>
          <CardContent>
            
           <UserList/>
           
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p className="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p className="text-sm text-muted-foreground">
                  isabella.nguyen@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$299.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">William Kim</p>
                <p className="text-sm text-muted-foreground">will@email.com</p>
              </div>
              <div className="ml-auto font-medium">+$99.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">
                  sofia.davis@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
