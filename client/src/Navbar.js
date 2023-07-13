// // Navbar created in part using tutorial found on https://www.youtube.com/watch?v=SLfhMt5OUPI
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import logoMM from './logoMM.png';

// export default function Navbar({ user, setUser, isLogged, setIsLogged}) {
//     // const [user, setUser] = useState({});
//     // const [isLogged, setIsLogged] = useState(false);
//     // Fetch the current user from your API.
//     useEffect(() => {
//         axios
//             .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
//             .then(res => {
//                 console.log(res.data)
//                 setIsLogged(true)
//                 setUser(res.data);
//             })
//             .catch(err => {
//                 console.log("current user error: " + err)
//                 // setUser({})
//                 // setIsLogged(false)
//         });
//     }, [isLogged]);

//     const handleLogout = (e) => {
//         e.preventDefault();
//         axios
//             .post('http://localhost:8000/api/logout', {}, { withCredentials: true })
//             .then(res => {
//                 setUser(null);
//                 setIsLogged(false);
//                 window.location.href = '/login'
//             })
//             .catch(err => console.log("logout error: " + err));
//     };

//     return <nav className="nav">
//         <a href="/dashboard" className="site-title"><img src={logoMM} className="logoSize me-2" alt="Med Manager" />Med Manager</a>
//         {(isLogged) && <span className="site-title">Welcome {user?.firstName}!</span>}
//         <ul>
//         {user && user.firstName && (
//             <>
//                 <CustomLink href="/formulary">Formulary</CustomLink>
//                 <CustomLink href="/formulary/inventory">Inventory</CustomLink>
//                 <CustomLink href="/add">Add Med</CustomLink>
//                 <CustomLink href="/dashboard">Home</CustomLink>
//                 <li><a href="" onClick={handleLogout}>Logout</a></li>
//             </>
//         )}
//         {(!user || !user.firstName) && <CustomLink href="/login">Login</CustomLink>}
//         </ul>
//     </nav>
// }

// function CustomLink({ href, children, ...props }){
//     const path = window.location.pathname;
//     return (
//         <li className={path === href ? "active": ""}>
//             <a href= { href } {...props}> { children }</a>
//         </li>
//     );
// }

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
