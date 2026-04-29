import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated } = useAuth();

    function handleLogin() {
        setIsAuthenticated(true);
        const from = location.state?.from?.pathname || '/docs/privat/acces-restrictionat';
        navigate(from);
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-icon">🔒</div>
                <h2>Acces restricționat</h2>
                <p>
                    Secțiunea pe care ai încercat să o accesezi necesită autentificare.
                    Apasă butonul de mai jos pentru a simula autentificarea.
                </p>
                <button className="btn btn-primary" onClick={handleLogin} style={{ width: '100%' }}>
                    🔓 Autentifică-te (simulat)
                </button>
            </div>
        </div>
    );
}
