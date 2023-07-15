import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logoMM from './logoMM.png';

export default function Navbar({ user, setUser, isLogged, setIsLogged }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
            .then(res => {
                setIsLogged(true);
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => {
                setIsLogged(false);
                setUser(null);
                setLoading(false);
            });
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                setIsLogged(false);
                window.location.href = '/login';
            })
            .catch(err => console.log("logout error: " + err));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="nav">
            <a href="/dashboard" className="site-title">
                <img src={logoMM} className="logoSize me-2" alt="Med Manager" />
                Med Manager
            </a>
            {isLogged && <span className="site-title">Welcome {user?.firstName}!</span>}
            <ul>
                {isLogged ? (
                    <>
                        <li><Link to="/formulary">Formulary</Link></li>
                        <li><Link to="/formulary/inventory">Inventory</Link></li>
                        <li><Link to="/add">Add Med</Link></li>
                        <li><Link to="/dashboard">Home</Link></li>
                        <li><a href="" onClick={handleLogout}>Logout</a></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}
