import React from "react";
import purchasing from "../assets/imges/shopping.gif";
import rapair from "../assets/imges/rapair.gif";
import add from "../assets/imges/addequip.gif";
import assets from "../assets/imges/assets.gif";
import emergancy from "../assets/imges/emergancy.gif";
import wardprimg from "../assets/imges/wardpr.gif";
import reject from "../assets/imges/rejected.gif";
import onging from "../assets/imges/ongoing.gif";
import userpro from "../assets/imges/add.gif";
import defineAbilities from "@/lib/defineAbility";
import { useAuthContext } from "@/hooks/useAuthContext";
import  WardPrList from "./purchasing/WardAdminPrReqList"
import UserList from "./users/UserList";
import EquipmentList from "./equipment/equipmentList";
import defineVendorAbilities from "../lib/venderability";
import  RepairRequestList from "./Repair/RepairReqList";

import defineTechnicientAbilities from "@/lib/Technicient";
import adminPr from "../assets/imges/adminPr.gif";
import quatation from "../assets/imges/quatation.gif";
import medicalhistory from "../assets/imges/medical-history.gif";
import SuperAdminPrList from "./purchasing/SuperAdminPrList";
//mport { defineAbility } from "@casl/ability";

//import { AbilityContext } from "../lib/Technicient";

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
    
    const vendorAbility =defineVendorAbilities(user);
    const canNotCreateQuotation=vendorAbility.can("create","Quotation")
   const canCreateQuotation =vendorAbility.cannot ("create","Quotation")
    const canDisplay =vendorAbility.can ("display", "Dashboard")
    const canNotDisplay =vendorAbility.cannot ("display", "Dashboard")
   
   //electrision
  const technicientAbility=defineTechnicientAbilities(user);
  
    // Check if the user has the ability to view the Electrician card
    const canViewCard = technicientAbility.can('view', 'ElectricianCard');
    const cannotViewCard = technicientAbility.cannot('view', 'ElectricianCard');
    const canDisplaytoelectic =technicientAbility.can ("display", "Dashboard");
    const canNotDisplaytoelectic =technicientAbility.cannot ("display", "Dashboard")
  //  const ability = React.useContext(AbilityContext);
   
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
<CardContent className="p-4">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        <Link to="/create/purchasing-req" className="flex-1">
          <Button className="w-full h-8 bg-blue-500">Purchase</Button>
        </Link>

        <Link to="/superadmin/purshasinglist" className="flex-1">
          <Button className="w-full h-8 bg-blue-500">Purchase History</Button>
        </Link>
      </div>
    </CardContent>
</Card>
      
      
      
}
        

{canCreateUser && canCreateQuotation && cannotViewCard &&
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

    <img src={wardprimg} className="w-20 ml-4" />
    <CardContent>
      <Link to="/wardadmin/purchasingreq">
        <Button className="h-8 bg-blue-500">Purchase</Button>
      </Link>
    </CardContent>
  </Card>
}







        

{canNotCreateQuotation && 
            <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0 "
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
               Set Quatation
              </CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={ quatation} className="w-20 ml-4" />
            <CardContent>
              <Link to="/vendor/quatation/setquatation">
                <Button className="h-8 bg-blue-500">Purchase</Button>
              </Link>
             
             
            </CardContent>
          </Card>
  
        
        
        }

    
{canNotCreateQuotation &&   canDisplay &&  
            <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0 "
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
              Super Admin Purchasing Request
              </CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={ adminPr} className="w-20 ml-4" />
            <CardContent>
              <Link to="/superadmin/purshasinglist">
                <Button className="h-8 bg-blue-500">Show Request</Button>
              </Link>
             
             
            </CardContent>
          </Card>
  
        
        
        }









        
    {canNotCreateQuotation && 
            <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0 "
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
              Quatation History
              </CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={medicalhistory} className="w-20 ml-4" />
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
              <CardTitle className="text-sm font-medium">Equipments</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={assets} className="w-20 ml-4" />
         
              <CardContent>
                
              <Link to={'/admin/show/equipmentlist'}>

               <Button className="h-8 bg-blue-500 ">Show Equipments</Button>
              </Link>
       

          
          
            </CardContent>
            
          
          </Card>

       
           
          
        }
        
          {canCreateUser &&  canCreateQuotation && cannotViewCard && 
            <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium"> Add Equipment</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={add} className="w-20 ml-4" />
            <CardContent>
            <Link to="/wardadmin/addequipment"> 
              <Button className="h-8 bg-blue-500 ">Add</Button>
              </Link>

              
            </CardContent>
          </Card>
        
          
          
          }
          {canCreateUser &&  canCreateQuotation && cannotViewCard &&
          <Card
            className="border border-green-500"
            x-chunk="dashboard-01-chunk-0"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Equipments</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
  
            <img src={assets} className="w-20 ml-4" />
         
              <CardContent>
                
              <Link to={'/wardadmin/equipmentlist'}>

               <Button className="h-8 bg-blue-500 ">Show Equipments</Button>
              </Link>
       

          
          
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
      
    
{/* {
   canCreateQuotation && cannotViewCard &&
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
} */}
  
{canCreateQuotation && cannotViewCard && canCreateUser &&
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

 <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6">

 <Link to={"/wardAdmin/request/repairRequest"}>
 
   <Button className="h-8 bg-blue-500">request</Button>

 </Link>

 <Link to={"/vendor/repairreqdetailsList/accept/list"}>
 
   <Button className="h-8 bg-blue-500">Accept request</Button>

 </Link>
 </div>
 </CardContent>
</Card>


















}
{canCreateQuotation && cannotViewCard &&

<Card
className="border border-green-500"
x-chunk="dashboard-01-chunk-0"
>
<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
  <CardTitle className="text-sm font-medium">
     Ward purchasing Request
  </CardTitle>
  <Bell className="w-4 h-4 text-muted-foreground" />
</CardHeader>

<img src={onging} className="w-20 ml-4" />
<CardContent>
  <Link to={"/wardadmin/wardpurchasingreqlist"}><Button className="h-8 bg-blue-500">Show Requests</Button></Link>
</CardContent>
</Card>



}
      
{/* {canCreateQuotation && cannotViewCard && 

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

} */}

{canNotCreateUser && (
      <Card
      className="border border-green-500"
      x-chunk="dashboard-01-chunk-0"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Users</CardTitle>
       
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
      <Link to={"/vendor/quatation/setquatationList"}>
       <Button className="h-8 bg-blue-500">Show Requests</Button>
       </Link>
     </CardContent>
   </Card>


}
   
      </div>
  <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-2 ">
    
  {canNotCreateUser &&
  <div >
    <Card >
      <CardContent className="mt-4 -ml-16 ">
        <UserList />
      </CardContent>
    </Card>
  </div>
  }
  

{canCreateUser &&  canCreateQuotation && cannotViewCard &&
    
<div >
    <Card >
      <CardContent className="mt-4 -ml-16 ">
        <EquipmentList />
      </CardContent>
    </Card>
  </div>
}
  <div>
  
    
    {canCreateQuotation && cannotViewCard && 
    
    <Card >
    <CardContent className="-ml-12 "><WardPrList /></CardContent>
  </Card>
    
    }
    
   
  </div>
  
  
</div>

<div>
{ cannotViewCard &&
  
  <Card >
    
    <CardContent className="-ml-12 "><SuperAdminPrList /></CardContent>
  </Card>  }
</div>


{/* Electrician Form */}




{canViewCard  && (
       <div><RepairRequestList></RepairRequestList> </div>
)}




    </>
    
  );
};

export default Dashboard;
