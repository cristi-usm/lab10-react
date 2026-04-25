import { useParams, Link } from "react-router";
import docs from "../../data/docs.json";


export const SectionPage = () => {
  const { section } = useParams();
  const pages = docs.filter((d) => d.section === section);

  if (pages.length === 0) {
  return (
        <div>
        <h3>Section not found</h3>
        <p>The section "{section}" does not exist.</p>
        <Link to="/docs">← Back to Docs</Link>
        </div>
    )
    }

    return (
    <div>
        <h4 className="fw-bold mb-1">{section}</h4>
        <p className="text-muted mb-3" style={{ fontSize: "0.88rem" }}>{pages.length} articles</p>
        {pages.map((page) => (
        <Link
            key={page.id}
            to={`/docs/${page.section}/${page.id}`}
            className="d-block text-decoration-none border rounded p-3 mb-2 text-dark"
        >
            <div className="fw-semibold mb-1">{page.title}</div>
            <div className="text-muted" style={{ fontSize: "0.82rem" }}>{page.content.slice(4, 100)}...</div>
        </Link>
        ))}
    </div>
    )
}
