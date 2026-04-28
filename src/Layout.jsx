import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  createSearchParams,
} from "react-router";
import { useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (q.trim()) {
      navigate("/cauta?" + createSearchParams({ q: q.trim() }));
      setQ("");
    } else {
      navigate("/cauta");
    }
  }

  return (
    <div className="app-wrap">
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            Software Testing Guide
          </Link>
        </div>
        <nav className="header-nav">
          <NavLink to="/" end>
            Acasa
          </NavLink>
          <NavLink to="/docs">Documentatie</NavLink>
          <NavLink to="/cauta">Cautare</NavLink>
          <NavLink to="/istoric">Istoric</NavLink>
          <NavLink to="/despre">Despre</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <form className="header-search" onSubmit={handleSearch}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cauta..."
          />
          <button type="submit">Cauta</button>
        </form>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">Ghid de Testare Software - Lab 10</footer>
    </div>
  );
}
