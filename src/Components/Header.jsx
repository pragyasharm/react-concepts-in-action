import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./user-protected-route/UserContext";

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("login");
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-post">Add post</NavLink>
        <NavLink to="/infinite-scroll">Infinite scroll</NavLink>
        <NavLink to="/counter-local">Counter local</NavLink>
        <NavLink to="/product-list">Product List - paginaion</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/posts">Posts-custom hook</NavLink>
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
    </>
  );
};

export default Header;
