import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export function PrivateRoute({ element: Element, isLogged, ...rest }) {
    return (
        <Route
            {...rest}
            element={isLogged ? (
                <Element />
            ) : (
                <Navigate to="/login" replace />
            )}
        />
    );
}
