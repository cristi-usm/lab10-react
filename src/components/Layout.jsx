import { Link, NavLink, Outlet} from "react-router"
import { GiDervishSwords } from "react-icons/gi";
import { FaHome, FaSearch, FaHistory, FaGithub, FaBook, FaMapPin  } from "react-icons/fa";
import { GrContact } from "react-icons/gr";

export const Layout = () =>{

    return (
    <div>
        <nav className="navbar navbar-dark bg-dark px-3 fixed-top">
        <Link to="/" className="navbar-brand"><GiDervishSwords /> Aethermoor</Link>
        <div className="d-flex gap-3">
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link text-white fw-bold" : "nav-link text-secondary"}><FaHome  className="me-2"/>Home</NavLink>
            <NavLink to="/docs" className={({ isActive }) => isActive ? "nav-link text-white fw-bold" : "nav-link text-secondary"}><FaBook className="me-2" />Docs</NavLink>
            <NavLink to="/search" className={({ isActive }) => isActive ? "nav-link text-white fw-bold" : "nav-link text-secondary"}><FaSearch className="me-2" />Search</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "nav-link text-white fw-bold" : "nav-link text-secondary"}><FaHistory  className="me-2"/>History</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link text-white fw-bold" : "nav-link text-secondary"}><FaMapPin className="me-2" />About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link text-white fw-bold" : "nav-link text-secondary"}><GrContact className="me-2" />Contact</NavLink>
        </div>
        </nav>
        <main className="mt-5">
        <Outlet />
        </main>
        <footer className="bg-dark text-secondary text-center py-2 mt-4 fixed-bottom" style={{ fontSize: "0.8rem" }}>
        © 2026 Aethermoor Chronicles — Lab 10 React PAvlovshcii Radu :)
        <a href="https://github.com/Annanas1k" target="_blank" rel="noopener noreferrer" className="text-secondary ms-2"><FaGithub className="me-2" />  GitHub</a>
        </footer>
    </div>
    )


}