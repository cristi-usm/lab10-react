import { useSearchParams, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import data from '../data/docs.json';

const ALL_TAGS = [...new Set(data.pagini.flatMap(p => p.taguri))].sort();

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const sectiuneFiltru = searchParams.get('sectiune') || '';
    const taguri = searchParams.getAll('tag');
    const inputRef = useRef(null);

    useEffect(() => {
        const el = document.getElementById('search-main-input');
        if (el) el.focus();
    }, []);

    function updateQ(val) {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (val) next.set('q', val);
            else next.delete('q');
            return next;
        });
    }

    function updateSectiune(val) {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (val) next.set('sectiune', val);
            else next.delete('sectiune');
            return next;
        });
    }

    function toggleTag(tag) {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            const existing = next.getAll('tag');
            next.delete('tag');
            if (existing.includes(tag)) {
                existing.filter(t => t !== tag).forEach(t => next.append('tag', t));
            } else {
                [...existing, tag].forEach(t => next.append('tag', t));
            }
            return next;
        });
    }

    function resetFilters() {
        setSearchParams({});
    }

    // Filter results
    const results = data.pagini.filter(page => {
        if (q && !page.titlu.toLowerCase().includes(q.toLowerCase()) &&
            !page.continut.toLowerCase().includes(q.toLowerCase())) return false;
        if (sectiuneFiltru && page.sectiune !== sectiuneFiltru) return false;
        if (taguri.length > 0 && !taguri.every(t => page.taguri.includes(t))) return false;
        return true;
    });

    return (
        <div className="search-page">
            <h1>🔍 Căutare</h1>
            <div className="search-controls">
                <div className="search-input-wrap">
                    <span>🔍</span>
                    <input
                        id="search-main-input"
                        ref={inputRef}
                        placeholder="Caută în documentație..."
                        value={q}
                        onChange={e => updateQ(e.target.value)}
                    />
                </div>
                <div className="search-filters">
                    <label>Secțiune:</label>
                    <select value={sectiuneFiltru} onChange={e => updateSectiune(e.target.value)}>
                        <option value="">Toate</option>
                        {data.sectiuni.map(s => (
                            <option key={s.id} value={s.id}>{s.titlu}</option>
                        ))}
                    </select>
                    <button className="btn btn-ghost btn-sm" onClick={resetFilters}>
                        ✕ Resetează filtrele
                    </button>
                </div>
                <div className="tags-filter">
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                        Tag-uri:
                    </span>
                    {ALL_TAGS.slice(0, 10).map(tag => (
                        <button
                            key={tag}
                            className={`tag-btn${taguri.includes(tag) ? ' active' : ''}`}
                            onClick={() => toggleTag(tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: 16, fontSize: '0.82rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                {results.length} rezultate{q ? ` pentru "${q}"` : ''}
            </div>

            <div className="search-results">
                {results.length === 0 ? (
                    <div className="no-results">
                        <div className="icon">🔎</div>
                        <p>Nicio pagină nu corespunde criteriilor de căutare.</p>
                    </div>
                ) : results.map(page => {
                    const sec = data.sectiuni.find(s => s.id === page.sectiune);
                    return (
                        <Link
                            key={page.id}
                            to={`/docs/${page.sectiune}/${page.id}`}
                            className="search-result"
                        >
                            <div className="search-result-title">{page.titlu}</div>
                            <div className="search-result-meta">
                                {sec?.icon} {sec?.titlu} · #{page.taguri.join(' #')}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
