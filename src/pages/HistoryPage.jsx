import { Link } from "react-router";
import { useHistory } from "../hooks/useHistory";

export const  HistoryPage = () => {
  const { visited, clearHistory } = useHistory()

    return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Recently Visited</h5>
        {visited.length > 0 && (
            <button onClick={clearHistory} className="btn btn-sm btn-outline-danger">Clear</button>
        )}
        </div>
        {visited.length === 0 ? (
        <p className="text-muted">No pages visited yet. <Link to="/docs">Browse the docs →</Link></p>
        ) : (
        visited.map((item, i) => (
            <Link
            key={item.id + i}
            to={item.path}
            className="d-flex align-items-center gap-3 text-decoration-none border rounded p-3 mb-2 text-dark"
            >
            <span className="text-muted" style={{ fontSize: "0.78rem" }}>#{i + 1}</span>
            <div>
                <div className="fw-semibold" style={{ fontSize: "0.88rem" }}>{item.title}</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>{item.section}</div>
            </div>
            <span className="ms-auto text-muted">→</span>
            </Link>
        ))
        )}
    </div>
    )
}
