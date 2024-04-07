import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthContextProvider} from "@/context/AuthContext.jsx";
import { UserContextProvider} from './context/addUserContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
        <UserContextProvider>
            <App/>
        </UserContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
)
