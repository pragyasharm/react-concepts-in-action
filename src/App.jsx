import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/add-post">Add post</Link>
      <Link to="/infinite-scroll">Infinite scroll</Link>
      <Link to="/product-list">Product List - paginaion</Link>

      <ErrorBoundary
        fallback={<div>Something went wrong</div>}
        key={location.pathname}
      >
        <Outlet />
      </ErrorBoundary>
    </>
  );
}

export default App;
