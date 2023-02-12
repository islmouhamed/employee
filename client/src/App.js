import React from "react";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";

import "./styles.css"
// importing componenets 
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateEmployee from "./components/CreateEmployee";
import Table from "./components/Table";
import EditEmployee from "./components/EditEmployee ";
import Navbar from "./components/Navbar";
import WithPrivateRoute from "./components/WithPrivateRoute";
function App() {
  return (
    <div className="App">
   
     <AuthProvider>
      <BrowserRouter>
      <Navbar/>
         
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/employees" element={<WithPrivateRoute><Table/></WithPrivateRoute>} />
            <Route path="/employees/:id" element={<WithPrivateRoute><Profile/></WithPrivateRoute>} />
            <Route path="/employees/createEmployee" element={<WithPrivateRoute><CreateEmployee/></WithPrivateRoute>} /> 
            <Route path="/employees/:id/edit"  element={<WithPrivateRoute><EditEmployee/></WithPrivateRoute>}/>
          </Routes>    
      </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
