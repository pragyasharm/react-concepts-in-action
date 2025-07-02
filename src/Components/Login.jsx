import React, { useContext, useRef } from "react";
import { use } from "react";
import { UserContext } from "./user-protected-route/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userNameRef.current.value === "admin" &&
      passwordRef.current.value === "admin"
    ) {
      setLoggedIn(true);
      const redirectPath = location.state?.pathname || "/";
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 0);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn, navigate]);
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          ref={userNameRef}
        />
        <br></br>
        <input
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
