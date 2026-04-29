import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { autentificat, logout } = useAuth();

  return (
    <div>
      <header>
        <h1>Docs App</h1>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/docs">Docs</Link>
          <Link to="/cauta">Cauta</Link>
          <Link to="/istoric">Istoric</Link>
          <Link to="/login">Login</Link>
        </nav>

        {autentificat && (
          <button onClick={logout}>
            Logout
          </button>
        )}
      </header>

      <Outlet />
    </div>
  );
}

export default Layout;