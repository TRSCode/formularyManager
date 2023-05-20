import React, { useState } from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MedForm from './components/MedForm';
import ViewAllMeds from './components/ViewAllMeds'
const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route element = {<ViewAllMeds/>} path="/" />
        <Route element = {<MedForm/>} path="/add" />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;


// consider creating a view folder with Main component to pass props/lift state 