import { useNavigate, Link } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="not-found">
            <div className="not-found-code">404</div>
            <h2>Pagină negăsită</h2>
            <p>URL-ul pe care l-ai accesat nu există în această aplicație.</p>
            <div className="not-found-actions">
                <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Înapoi</button>
                <Link to="/" className="btn btn-primary">🏠 Acasă</Link>
            </div>
        </div>
    );
}
