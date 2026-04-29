import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import data from '../data/docs.json';
import Breadcrumb from '../components/Breadcrumb';

export default function EditPage() {
    const { sectiune, paginaId } = useParams();
    const navigate = useNavigate();
    const page = data.pagini.find(pg => pg.id === paginaId && pg.sectiune === sectiune);

    const [titlu, setTitlu] = useState(page?.titlu || '');
    const [continut, setContinut] = useState(page?.continut || '');

    if (!page) return <div style={{ padding: 40 }}>Pagina nu există.</div>;

    function handleSave(e) {
        e.preventDefault();
        navigate(`/docs/${sectiune}/${paginaId}`, { replace: true });
    }

    return (
        <div>
            <Breadcrumb />
            <div className="edit-form">
                <h2>✏️ Editare: {page.titlu}</h2>
                <div className="form-group">
                    <label>Titlu</label>
                    <input
                        value={titlu}
                        onChange={e => setTitlu(e.target.value)}
                        placeholder="Titlul paginii..."
                    />
                </div>
                <div className="form-group">
                    <label>Conținut</label>
                    <textarea
                        value={continut}
                        onChange={e => setContinut(e.target.value)}
                        placeholder="Conținutul paginii..."
                        style={{ minHeight: 200 }}
                    />
                </div>
                <div className="form-group">
                    <label>Tag-uri (separate prin virgulă)</label>
                    <input defaultValue={page.taguri.join(', ')} placeholder="tag1, tag2..." />
                </div>
                <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSave}>
                        💾 Salvează
                    </button>
                    <button className="btn btn-ghost" onClick={() => navigate(-1)}>
                        Anulează
                    </button>
                </div>
            </div>
        </div>
    );
}
