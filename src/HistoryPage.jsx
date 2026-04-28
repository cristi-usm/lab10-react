import { Link } from "react-router";
import { useState } from "react";

const history_key = "stg_history";

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(history_key) || "[]");
  } catch {
    return [];
  }
}

export default function HistoryPage() {
  const [history, setHistory] = useState(readHistory);

  function clearHistory() {
    localStorage.removeItem(history_key);
    setHistory([]);
  }

  return (
    <div className="page-content">
      <h1>Istoric navigare</h1>
      <p>Ultimele 10 pagini vizitate.</p>
      {history.length === 0 ? (
        <p>Niciun istoric.</p>
      ) : (
        <ul className="history-list">
          {history.map((entry) => (
            <li key={entry.path}>
              <Link to={entry.path}>{entry.titlu}</Link>
              <span className="result-section">{entry.sectiune}</span>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button className="btn btn-secondary" onClick={clearHistory}>
          Sterge istoricul
        </button>
      )}
    </div>
  );
}
