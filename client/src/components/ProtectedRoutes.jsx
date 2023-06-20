import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({isLogged, ...props}) => {
    if(isLogged) {
        return <Route {...props} />;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedRoutes;
