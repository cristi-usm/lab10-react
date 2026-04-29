import { Link } from 'react-router-dom';
import data from '../data/docs.json';
import Breadcrumb from '../components/Breadcrumb';

export default function DocsIndex() {
    return (
        <div className="docs-welcome">
            <Breadcrumb />
            <h2>👋 Bun venit în documentația NexusJS</h2>
            <p>
                Alege o secțiune din sidebar sau explorează mai jos.
                Documentația acoperă instalare, API complet, ghiduri practice și exemple reale.
            </p>
            <div className="cards-grid">
                {data.sectiuni.filter(s => s.id !== 'privat').map(sec => (
                    <Link to={`/docs/${sec.id}`} className="card" key={sec.id}>
                        <div className="card-icon">{sec.icon}</div>
                        <h3>{sec.titlu}</h3>
                        <p>{data.pagini.filter(p => p.sectiune === sec.id).length} articole</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
