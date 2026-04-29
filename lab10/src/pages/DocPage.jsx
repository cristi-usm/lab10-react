import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import data from '../data/docs.json';
import Breadcrumb from '../components/Breadcrumb';
import PaginaInexistenta from './PaginaInexistenta';
import { useHistory } from '../context/HistoryContext';

export default function DocPage() {
    const { sectiune, paginaId } = useParams();
    const { addToHistory } = useHistory();
    const location = useLocation();

    const page = data.pagini.find(p => p.id === paginaId && p.sectiune === sectiune);
    const sectionPages = data.pagini.filter(p => p.sectiune === sectiune);
    const idx = sectionPages.findIndex(p => p.id === paginaId);
    const prev = idx > 0 ? sectionPages[idx - 1] : null;
    const next = idx < sectionPages.length - 1 ? sectionPages[idx + 1] : null;

    useEffect(() => {
        if (page) {
            addToHistory({
                path: `/docs/${sectiune}/${paginaId}`,
                titlu: page.titlu,
                sectiune,
            });
        }
    }, [paginaId, sectiune]);

    if (!data.sectiuni.find(s => s.id === sectiune) || !page) {
        return <PaginaInexistenta />;
    }

    const isEditing = location.pathname.endsWith('/editare');

    const formatContent = (text) => {
        const parts = text.split(/`([^`]+)`/);
        return parts.map((part, i) =>
            i % 2 === 1 ? <code key={i}>{part}</code> : part
        );
    };

    return (
        <div>
            <Breadcrumb />
            <div className="page-header">
                <h1>{page.titlu}</h1>
                <div className="page-tags">
                    {page.taguri.map(tag => (
                        <Link key={tag} to={`/cauta?tag=${tag}`} className="tag">#{tag}</Link>
                    ))}
                </div>
            </div>
            <div className="page-body">
                <p>{formatContent(page.continut)}</p>
            </div>

            {!isEditing && (
                <div style={{ marginBottom: 20 }}>
                    <Link
                        to={`/docs/${sectiune}/${paginaId}/editare`}
                        className="btn btn-ghost btn-sm"
                    >
                        ✏️ Editează această pagină
                    </Link>
                </div>
            )}

            <Outlet />

            <div className="page-nav">
                {prev ? (
                    <Link to={`/docs/${sectiune}/${prev.id}`}>
                        <span className="page-nav-label">← Anterior</span>
                        <span className="page-nav-title">{prev.titlu}</span>
                    </Link>
                ) : <div />}
                {next && (
                    <Link to={`/docs/${sectiune}/${next.id}`} className="next">
                        <span className="page-nav-label">Următor →</span>
                        <span className="page-nav-title">{next.titlu}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
