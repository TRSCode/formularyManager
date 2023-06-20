import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({isLogged, ...props}) => {
    if(isLogged) {
        return <Route {...props} />;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedRoute;
