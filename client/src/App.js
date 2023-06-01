import React, { useState } from 'react';
// import axios from 'axios';
import {Routes, Route, Navigate} from 'react-router-dom';
import MedForm from './components/MedForm';
import ViewAllMeds from './components/ViewAllMeds'
import Navbar from "./Navbar"
import Dashboard from './components/Dashboard';
import MedUpdate from './components/MedUpdate';
import "./styles.css"
const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<Navigate to="/dashboard" />} path="/" />
        <Route element = {<Dashboard/>} path = "/dashboard" />
        <Route element = {<ViewAllMeds/>} path="/formulary" />
        <Route element = {<MedForm/>} path="/add" />
        <Route element = {<MedUpdate/>} path="/formulary/:id" />
      </Routes>
    </div>
  );
}
export default App;


// consider creating a view folder with Main component to pass props/lift state 