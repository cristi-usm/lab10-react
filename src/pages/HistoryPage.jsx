import { Link } from "react-router";
import { useHistory } from "../hooks/useHistory";

export const  HistoryPage = () => {
  const { visited, clearHistory } = useHistory();

    return (
    <div>
        <div>
        <h4>Recently Visited</h4>
        {visited.length > 0 && (
            <button onClick={clearHistory}>
            Clear History
            </button>
        )}
        </div>

        {visited.length === 0 ? (
        <div>
            <div>📋</div>
            <p>No pages visited yet.</p>
            <Link to="/docs">Browse the docs →</Link>
        </div>
        ) : (
        <div>
            {visited.map((item, i) => (
            <Link key={item.id + i} to={item.path}>
                <span>#{i + 1}</span>
                <div>
                <div>{item.title}</div>
                <div>{item.section}</div>
                </div>
                <span>→</span>
            </Link>
            ))}
        </div>
        )}
    </div>
    );
}
