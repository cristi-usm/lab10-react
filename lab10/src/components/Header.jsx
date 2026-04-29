import { useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        function handleKeydown(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                navigate('/cauta');
                setTimeout(() => {
                    document.getElementById('search-main-input')?.focus();
                }, 100);
            }
        }
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [navigate]);

    function handleSearchSubmit(e) {
        e.preventDefault();
        const q = inputRef.current?.value.trim();
        if (q) navigate(`/cauta?q=${encodeURIComponent(q)}`);
        else navigate('/cauta');
    }

    return (
        <header className="header">
            <Link to="/" className="header-logo">
                Nexus<span>JS</span>
            </Link>
            <nav className="header-nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Acasă</NavLink>
                <NavLink to="/docs" className={({ isActive }) => isActive ? 'active' : ''}>Docs</NavLink>
                <NavLink to="/cauta" className={({ isActive }) => isActive ? 'active' : ''}>Caută</NavLink>
                <NavLink to="/istoric" className={({ isActive }) => isActive ? 'active' : ''}>Istoric</NavLink>
                <NavLink to="/despre" className={({ isActive }) => isActive ? 'active' : ''}>Despre</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
            </nav>
            <form className="header-search" onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 6 }}>🔍</span>
                <div className="header-search-form">
                    <input ref={inputRef} placeholder="Caută..." />
                </div>
                <kbd>Ctrl+K</kbd>
            </form>
        </header>
    );
}
