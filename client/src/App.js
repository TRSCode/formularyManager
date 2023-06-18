import React, { useState } from 'react';
// import axios from 'axios';
import {Routes, Route, Navigate} from 'react-router-dom';
import MedForm from './components/MedForm';
import ViewAllMeds from './components/ViewAllMeds'
import Navbar from "./Navbar"
import Dashboard from './components/Dashboard';
import MedUpdate from './components/MedUpdate';
import InventoryMeds from './components/InventoryMeds';
import PrintableView from './components/PrintableView';
import Login from './components/user/Login';
import Register from './components/user/Register';
import "./styles.css"
const App = () => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);

  return (
    <div>
      <Navbar user={user} setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Routes>
        {/* <Route element={<Navigate to="/dashboard" />} path="/" /> */}
        <Route element = {<Login setUser={setUser} setIsLogged={setIsLogged}/>} path = "/login" />
        <Route element = {<Register setUser={setUser} setIsLogged={setIsLogged} />} path = "/" />
        <Route element = {<Dashboard/>} path = "/dashboard" />
        <Route element = {<ViewAllMeds isLogged={isLogged}/>} path="/formulary" />
        <Route element = {<InventoryMeds isLogged={isLogged}/>} path="/formulary/inventory" />
        <Route element = {<PrintableView/>} path="/formulary/inventory/printable" />
        <Route element = {<MedForm/>} path="/add" />
        <Route element = {<MedUpdate/>} path="/formulary/:id" />
      </Routes>
    </div>
  );
}
export default App;


// consider creating a view folder with Main component to pass props/lift state 