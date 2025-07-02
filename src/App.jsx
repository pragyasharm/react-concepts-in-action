import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Components/user-protected-route/UserContext";
import Header from "./Components/Header";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="card-block">
        <ErrorBoundary
          fallback={<div>Something went wrong</div>}
          key={location.pathname}
        >
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
