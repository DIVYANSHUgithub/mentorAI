import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  //if user already logged in 
  const isLoggedIn = localStorage.getItem('token');
  // const checkLoggedIn=localStorage.getItem('isLoggedIn')
  // what I want is when the user is already logged in then replace them with /home page strictly and if the user is not logged in then replace them with /login page strictly
   return isLoggedIn ? children : <Navigate to="/login" replace />;
}
// function RedirectRoute() {
//   const checkLoggedIn = localStorage.getItem("isLoggedIn");

//   return (
//     <Navigate
//       to={checkLoggedIn ? "/home" : "/login"}
//       replace
//     />
//   );
// }

export default ProtectedRoute;