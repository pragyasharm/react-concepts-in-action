import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserProtectedRoutes = () => {
  const { loggedIn } = useContext(UserContext);
  const location = useLocation();

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={location} replace />
  );
};

export default UserProtectedRoutes;
