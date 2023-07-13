// import React, { useEffect } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';





// --------------------------test vvv--------------------------------
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
// --------------------------test ^^^--------------------------------




// const PrivateRoutes = ({ isLogged, user }) => {
//     useEffect(() => {
//         console.log("is this logged",user);}, [isLogged]);
//     return (
//         <>
//             {isLogged ? (
//                 <Outlet isLogged={isLogged} /> 
//             ) : (
//                 <Navigate to="/login" />
//             )}
//         </>
//     );
// };

// export default PrivateRoutes;


// --------------------------------------------------------2--------------------------------------------------------



import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export function PrivateRoutes({ element: Element, isLogged, ...rest }) {
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


