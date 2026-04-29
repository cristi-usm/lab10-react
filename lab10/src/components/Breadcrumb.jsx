import { Link, useLocation } from 'react-router-dom';
import data from '../data/docs.json';

const LABELS = {
    docs: 'Docs',
    cauta: 'Căutare',
    istoric: 'Istoric',
    despre: 'Despre',
    contact: 'Contact',
    login: 'Login',
    editare: 'Editare',
};

function getLabel(segment) {
    if (LABELS[segment]) return LABELS[segment];
    // check if it's a sectiune
    const sec = data.sectiuni.find(s => s.id === segment);
    if (sec) return sec.titlu;
    // check if it's a page
    const page = data.pagini.find(p => p.id === segment);
    if (page) return page.titlu;
    return segment;
}

export default function Breadcrumb() {
    const { pathname } = useLocation();
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return null;

    const crumbs = segments.map((seg, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/');
        const label = getLabel(seg);
        const isLast = i === segments.length - 1;
        return { seg, path, label, isLast };
    });

    return (
        <nav className="breadcrumb">
            <Link to="/">Acasă</Link>
            {crumbs.map((c) => (
                <span key={c.path} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="breadcrumb-sep">/</span>
                    {c.isLast
                        ? <span>{c.label}</span>
                        : <Link to={c.path}>{c.label}</Link>
                    }
                </span>
            ))}
        </nav>
    );
}
