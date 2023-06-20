import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';


// const ProtectedRoutes = ({isLogged}) => {
//     // let isLogged = null;
//     return(
//         isLogged ? <Outlet /> : <Navigate to="/login" />
//     )
//     // if(isLogged) {
//     //     return <Route {...props} />;
//     // } else {
//     //     return <Navigate to="/login" replace />;
//     // }
// }

const PrivateRoutes = ({ isLogged, user }) => {
    useEffect(() => {
        console.log("is this logged",user);}, [isLogged]);
    return (
        <>
            {isLogged ? (
                <Outlet isLogged={isLogged} /> 
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default PrivateRoutes;
