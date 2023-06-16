// Navbar created in part using tutorial found on https://www.youtube.com/watch?v=SLfhMt5OUPI
import { useState, useEffect } from 'react';
import axios from 'axios';
import logoMM from './logoMM.png';

export default function Navbar() {
    const [user, setUser] = useState({});
    // Fetch the current user from your API.
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log("current user error: " + err)
                setUser({})
        });
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then(res => {
                setUser(null);
                window.location.href = '/login'
            })
            .catch(err => console.log("logout error: " + err));
    };
    
    return <nav className="nav">
        <a href="/dashboard" className="site-title"><img src={logoMM} className="logoSize me-2" alt="Med Manager" />Med Manager</a>
        {(user && user.firstName) && <span className="site-title">Welcome {user.firstName}!</span>}
        <ul>
            
            <CustomLink href="/formulary">Formulary</CustomLink>
            <CustomLink href="/formulary/inventory">Inventory</CustomLink>
            <CustomLink href="/add">Add Med</CustomLink>
            <CustomLink href="/dashboard">Home</CustomLink>
            {(user && user.firstName) ? 
                <li><a href="" onClick={handleLogout}>Logout</a></li>
                : 
                <CustomLink href="/login">Login</CustomLink>
            }
        </ul>
    </nav>
}

function CustomLink({ href, children, ...props }){
    const path = window.location.pathname;
    return (
        <li className={path === href ? "active": ""}>
            <a href= { href } {...props}> { children }</a>
        </li>
    );
}
