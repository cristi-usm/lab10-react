import { Link } from 'react-router-dom';
import { useHistory } from '../context/HistoryContext';

export default function HistoryPage() {
    const { history, clearHistory } = useHistory();

    return (
        <div className="history-page">
            <h1>📋 Istoric navigare</h1>
            <p className="history-subtitle">Ultimele {history.length}/10 pagini vizitate din /docs/*</p>

            {history.length === 0 ? (
                <div className="no-results">
                    <div className="icon">🗒️</div>
                    <p>Nu ai vizitat nicio pagină din documentație încă.</p>
                    <br />
                    <Link to="/docs" className="btn btn-secondary btn-sm">Mergi la Docs</Link>
                </div>
            ) : (
                <>
                    <div className="history-list">
                        {history.map((item, i) => (
                            <Link key={item.path} to={item.path} className="history-item">
                                <span className="history-num">#{i + 1}</span>
                                <div className="history-info">
                                    <div className="history-title">{item.titlu}</div>
                                    <div className="history-path">{item.path}</div>
                                </div>
                                <span style={{ color: 'var(--text-3)', fontSize: '0.8rem' }}>→</span>
                            </Link>
                        ))}
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={clearHistory}>
                        🗑️ Șterge istoricul
                    </button>
                </>
            )}
        </div>
    );
}
