import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import MedForm from './components/MedForm';
import ViewAllMeds from './components/ViewAllMeds'
import Navbar from "./Navbar"
import Dashboard from './components/Dashboard';
import MedUpdate from './components/MedUpdate';
import InventoryMeds from './components/InventoryMeds';
import PrintableView from './components/PrintableView';
import Login from './components/user/Login';
import Register from './components/user/Register';
// import {PrivateRoutes} from './components/PrivateRoutes';
import "./styles.css"
const App = () => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);

  return (
    <div>
      <Navbar user={user} setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Routes>
        <Route element = {<Login setUser={setUser} setIsLogged={setIsLogged}/>} path = "/login" />
        <Route element = {<Register setUser={setUser} setIsLogged={setIsLogged} />} path = "/" />
        <Route element = {<Dashboard/>} path = "/dashboard" />
        {/* <Route element = {<PrivateRoutes component={ViewAllMeds} isLogged={isLogged} />} path="/formulary" /> */}
        <Route element = {<ViewAllMeds isLogged={isLogged}/>} path="/formulary" />
        <Route element = {<InventoryMeds isLogged={isLogged} setIsLogged={setIsLogged} user={user} setUser={setUser}/>} path="/formulary/inventory" />
        <Route element = {<PrintableView/>} path="/formulary/inventory/printable" />
        <Route element = {<MedForm/>} path="/add" />
        <Route element = {<MedUpdate/>} path="/formulary/:id" />
      </Routes>
    </div>
  );
}
export default App;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import MedForm from './components/MedForm';
// import ViewAllMeds from './components/ViewAllMeds';
// import Navbar from './Navbar';
// import Dashboard from './components/Dashboard';
// import MedUpdate from './components/MedUpdate';
// import InventoryMeds from './components/InventoryMeds';
// import PrintableView from './components/PrintableView';
// import Login from './components/user/Login';
// import Register from './components/user/Register';
// import { PrivateRoutes } from './components/PrivateRoutes';
// import './styles.css';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [isLogged, setIsLogged] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
//       .then((res) => {
//         console.log(res.data);
//         setIsLogged(true);
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.log("current user error: " + err);
//         // setUser({})
//         // setIsLogged(false)
//       });
//   }, [navigate]);

//   return (
//     <div>
//       <Navbar
//         user={user}
//         setUser={setUser}
//         isLogged={isLogged}
//         setIsLogged={setIsLogged}
//       />
//       <Routes>
//         <Route element={<Login setUser={setUser} setIsLogged={setIsLogged} />} path="/login" />
//         <Route element={<Register setUser={setUser} setIsLogged={setIsLogged} />} path="/" />
//         <Route element={<Dashboard />} path="/dashboard" />
//         <PrivateRoutes element={ViewAllMeds} path="/formulary" isLogged={isLogged} />
//         <Route element={<InventoryMeds isLogged={isLogged} setIsLogged={setIsLogged} user={user} setUser={setUser} />} path="/formulary/inventory" />
//         <Route element={<PrintableView />} path="/formulary/inventory/printable" />
//         <Route element={<MedForm />} path="/add" />
//         <Route element={<MedUpdate />} path="/formulary/:id" />
//       </Routes>
//     </div>
//   );
// };

// export default App;

