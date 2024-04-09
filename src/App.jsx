import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard.jsx";
import Login from "@/pages/auth/Login.jsx";
import { useAuthContext } from "@/hooks/useAuthContext.js";
import Header from "@/components/Header.jsx";
import CreateReq from "./pages/purchasing/CreateReq";
import CreateUser from "@/pages/users/CreateUser.jsx";
import UserList from "./pages/users/UserList";
import UpdateUser from "./pages/users/EditUser";
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

                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
