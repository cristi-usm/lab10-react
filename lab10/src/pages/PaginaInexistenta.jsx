import { Link } from 'react-router-dom';

export default function PaginaInexistenta() {
    return (
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📄</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 8 }}>
                Pagina nu există
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', marginBottom: 24 }}>
                Această pagină nu a fost găsită în documentație.
            </p>
            <Link to="/docs" className="btn btn-secondary">← Înapoi la Docs</Link>
        </div>
    );
}
