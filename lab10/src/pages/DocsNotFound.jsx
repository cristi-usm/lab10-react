import { useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

export default function DocsNotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <Breadcrumb />
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: 16, color: 'var(--border-2)' }}>404</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 8 }}>
                    URL invalid în documentație
                </h2>
                <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', marginBottom: 28, maxWidth: 360, margin: '0 auto 28px' }}>
                    Această adresă nu corespunde niciunei pagini din documentație.
                </p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Înapoi</button>
                    <Link to="/docs" className="btn btn-secondary">Docs principale</Link>
                </div>
            </div>
        </div>
    );
}
