import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MedForm from './components/MedForm';
import ViewAllMeds from './components/ViewAllMeds';
import Navbar from './Navbar';
import Dashboard from './components/Dashboard';
import MedUpdate from './components/MedUpdate';
import InventoryMeds from './components/InventoryMeds';
import PrintableView from './components/PrintableView';
import Login from './components/user/Login';
import Register from './components/user/Register';
import './styles.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
            .then((res) => {
                setIsLogged(true);
                setUser(res.data);
            })
            .catch(() => {
                setIsLogged(false);
                setUser(null);
                navigate('/login');
            });
    }, []);

    return (
        <div>
            <Navbar user={user} setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged} />
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} setIsLogged={setIsLogged} />} />
                <Route path="/register" element={<Register setUser={setUser} setIsLogged={setIsLogged} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/formulary" element={<ViewAllMeds />} />
                <Route path="/formulary/inventory" element={<InventoryMeds isLogged={isLogged} user={user} />} />
                <Route path="/formulary/inventory/printable" element={<PrintableView user={user} />} />
                <Route path="/add" element={<MedForm isLogged={isLogged} />} />
                <Route path="/formulary/:id" element={<MedUpdate />} />
            </Routes>
        </div>
    );
};

export default App;


