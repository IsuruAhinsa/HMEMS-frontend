import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard.jsx";
import Login from "@/pages/auth/Login.jsx";
import { useAuthContext } from "@/hooks/useAuthContext.js";
import Header from "@/components/Header.jsx";
import CreateReq from "./pages/purchasing/CreateReq";
import CreateUser from "@/pages/users/CreateUser.jsx";
import UserList from "./pages/users/UserList";
import UpdateUser from "./pages/users/EditUser";
import WardPR from "./pages/purchasing/WardAdminCreateReq";
import WardPrList from "./pages/purchasing/WardAdminPrReqList";
import AddEquipment from "./pages/equipment/addEquipment";
import WardPREdit from "./pages/purchasing/EditWardAdminPrReq";
import EquipmentList from "./pages/equipment/equipmentList";
import ShowAssets from "./pages/equipment/showAssets";
import SetQuatation from "./pages/quatation/setQuatation";
import EditEquipment from "./pages/equipment/editEqipment";
import SuperAdminPrList from "./pages/purchasing/SuperAdminPrList";
import SetQuotationList from "./pages/quatation/setQuatationList";
import QuotationGroupList from "./pages/quatation/QuatationGrop";
import SentEmail from "./pages/Email/sentEmail";
import RepairRequestList from "./pages/Repair/RepairRequst"
import RepairRequestLists from "./pages/Repair/RepairReqList";
import RepairReqDetails from "./pages/Repair/RepairReqDetails";
import RepairReqDetailsList from "./pages/Repair/RepairReqDetailsList";
import Report_Incident from "./pages/Doctor/Report_Incident";
import Report_history from "./pages/Doctor/Report_history";
import WardAdminAcceptDocReq from "./pages/Doctor/wardAdminAcceptDocReq";
import DrrepairReqOrPR from "./pages/Repair/DrrepairReqOrPR";
import WardSentDrPRToSuper from "./pages/Doctor/PRsentToSuperAdmin";
import CreateReqWard from "./pages/purchasing/CreateReqWard";
import EditCreateReq from "./pages/Doctor/EditReportIncident";
import QuotationHistoryGroupList from "./pages/quatation/QuatationHistory";
function App() {
    
    const { user } = useAuthContext();
    return (
        <BrowserRouter>
            <div className="flex flex-col w-full min-h-screen">
                {user && <Header />}

                <main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
                    <Routes>
                        <Route path="/" element={user ? <Dashboard /> : <Login />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />

                        <Route path="/create/purchasing-req" element={user ? <CreateReq /> : <Navigate to="/" replace />} />
                        <Route path="/create/users" element={user ? <CreateUser /> : <Navigate to="/create/users" replace />} />
                        <Route path="/userlist" element={user ? <UserList/> : <Navigate to="/" replace />} />
                        <Route path="/users/:userId" element={user ? <UpdateUser /> : null} />
                        <Route path="/wardadmin/purchasingreq" element={user ? <WardPR /> : null} />
                        <Route path="/wardadmin/wardpurchasingreqlist" element={user ? <WardPrList /> : null} />
                        <Route path="/wardadmin/addequipment" element={user ? <AddEquipment /> : null} />
                        <Route path="/wardadmin/wardpredit" element={user ? <WardPREdit /> : null} />
                        <Route path="/wardadmin/equipmentlist" element={user ? <EquipmentList /> : null} />
                        
                        <Route path="/admin/show/equipmentlist" element={user ? <ShowAssets /> : null} />

                        <Route path="/vendor/quatation/setquatation" element={user ? <SetQuatation /> : null} />

                        <Route path="/vendor/quatation/setquatation/hisroty" element={user ? <QuotationHistoryGroupList /> : null} />

                        <Route path="/ward/createreq/superadmin" element={user ? <CreateReqWard/> : null} />

                        <Route path="/ward/editcreatereq/doctor/:id" element={user ? <EditCreateReq/> : null} />
 

                        
                        <Route path="/vendor/quatation/setquatation/:id" element={user ? <SetQuatation /> : null} />

                        <Route path="/wardadmin/equipment/edit/:equipmentItemid" element={user ? <EditEquipment /> : null} />

                        <Route path="/superadmin/purshasinglist" element={user ? <SuperAdminPrList /> : null} />

                        <Route path="/Accept/purchasing-req/:id" element={user ? <CreateReq /> : <Navigate to="/" replace />} />
                        
                        
                        <Route path="/vendor/quatation/setquatationList" element={user ? <SetQuotationList /> : null} />
                        


                        
                        <Route path="/vendor/quatation/setquatationList/QuatationGroup/:id" element={user ? <QuotationGroupList /> : null} />

                        <Route path="/wardAdmin/request/repairRequest" element={user ? <RepairRequestList /> : null} />

                        <Route path="/elecrician/view/repairRequest" element={user ? <RepairRequestLists/> : null} />

                        <Route path="/SuperAdmin/GroupQuatation/ConformtionMail" element={user ? <SentEmail /> : null} /> 

                        <Route path="/vendor/repairrequests/details/:id"  element={user ? <RepairReqDetails /> : null} /> 

                        <Route path="/vendor/repairreqdetailsList/accept/list"  element={user ? <RepairReqDetailsList/> : null} /> 
                         
                    
                     

                        <Route path="/vendor/repairrequests/doctor/details/:id"  element={user ? <DrrepairReqOrPR/> : null} /> 

                       
                       
                       
                        <Route path="/wardadmin/sent/doctor/Pr/superadmin/:id"  element={user ? < WardSentDrPRToSuper /> : null} /> 


                        <Route path="/Doctor/ReportIncident" element={user ? <Report_Incident /> : null} />
                        <Route path="/Doctor/ReportHistory" element={user ? <Report_history /> : null} />


                        <Route path="/Doctor/wardAdminAcceptDocReq/:id" element={user ? < WardAdminAcceptDocReq /> : null} />
        
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
