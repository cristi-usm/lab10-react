import { useParams, Link, Navigate } from 'react-router-dom';
import data from '../data/docs.json';
import Breadcrumb from '../components/Breadcrumb';

export default function SectionPage() {
    const { sectiune } = useParams();
    const sec = data.sectiuni.find(s => s.id === sectiune);

    if (!sec) return <Navigate to="/docs" replace />;

    const paginile = data.pagini.filter(p => p.sectiune === sectiune);

    return (
        <div className="section-welcome">
            <Breadcrumb />
            <h2>{sec.icon} {sec.titlu}</h2>
            <p>{paginile.length} articole în această secțiune.</p>
            <div className="section-pages-list">
                {paginile.map(page => (
                    <Link
                        key={page.id}
                        to={`/docs/${sectiune}/${page.id}`}
                        className="section-page-link"
                    >
                        <span style={{ flex: 1 }}>{page.titlu}</span>
                        <span className="arrow">→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
