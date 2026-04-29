import { Link } from 'react-router-dom';
import data from '../data/docs.json';

export default function Home() {
    return (
        <div className="home">
            <div className="home-badge">✦ v2.1.0 — Tocmai lansat</div>
            <h1>
                Gestionare de stare<br />
                <span className="highlight">reactivă și modernă</span>
            </h1>
            <p className="home-subtitle">
                NexusJS este o librărie JavaScript pentru aplicații reactive.
                Simplu, performant, fără boilerplate. Proxy-uri native, efecte automate,
                integrare perfectă cu orice framework.
            </p>
            <div className="home-cta">
                <Link to="/docs" className="btn btn-primary">🚀 Documentație</Link>
                <Link to="/cauta" className="btn btn-secondary">🔍 Caută</Link>
                <a href="https://github.com" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                    ↗ GitHub
                </a>
            </div>
            <div className="cards-grid">
                {data.sectiuni.filter(s => s.id !== 'privat').map(sec => {
                    const paginile = data.pagini.filter(p => p.sectiune === sec.id);
                    return (
                        <Link to={`/docs/${sec.id}`} className="card" key={sec.id}>
                            <div className="card-icon">{sec.icon}</div>
                            <h3>{sec.titlu}</h3>
                            <p>{paginile.length} pagini disponibile</p>
                        </Link>
                    );
                })}
                <div className="card" style={{ borderStyle: 'dashed' }}>
                    <div className="card-icon">⚡</div>
                    <h3>3KB gzipped</h3>
                    <p>Dimensiune minimă, impact maxim</p>
                </div>
            </div>
        </div>
    );
}
