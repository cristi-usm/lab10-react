import { Link } from "react-router";
import docs from "../../data/docs.json";

const sections = [...new Set(docs.map((d) => d.section))];

export const DocsIndex = () => {
  return (
    <div>
        <h4 className="fw-bold mb-1">Welcome to the Wiki</h4>
        <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>Pick a section from the sidebar or start below.</p>
        {sections.map((section) => (
        <div key={section} className="mb-4">
            <p className="text-uppercase text-muted fw-bold mb-2" style={{ fontSize: "0.72rem" }}>{section}</p>
            {docs
            .filter((d) => d.section === section)
            .map((page) => (
                <Link
                key={page.id}
                to={`/docs/${page.section}/${page.id}`}
                className="d-flex align-items-center justify-content-between text-decoration-none border rounded px-3 py-2 mb-2 text-dark"
                >
                <span>{page.title}</span>
                <span className="text-muted">→</span>
                </Link>
            ))}
        </div>
        ))}
    </div>
    )
}
