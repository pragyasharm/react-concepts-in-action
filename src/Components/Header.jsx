import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
        <Link to="/">Home</Link>
        <Link to="/add-post">Add post</Link>
        <Link to="/infinite-scroll">Infinite scroll</Link>
        <Link to="/counter-local">Counter local</Link>
        <Link to="/product-list">Product List - paginaion</Link>
        <Link to="/profile">Profile</Link>
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
