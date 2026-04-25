import { useSearchParams, Link } from "react-router";
import docs from "../data/docs.json";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const section = searchParams.get("section") || "";

  const results = docs.filter((page) => {
    const matchQuery = page.title.toLowerCase().includes(query.toLowerCase());
    const matchSection = section === "" || page.section === section;
    return matchQuery && matchSection;
  });

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h5 className="fw-bold mb-3">Search Docs</h5>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setSearchParams({ q: e.target.value, section })}
        />
        <select
          className="form-select"
          style={{ width: "160px" }}
          value={section}
          onChange={(e) => setSearchParams({ q: query, section: e.target.value })}
        >
          <option value="">All sections</option>
          <option value="basics">Basics</option>
          <option value="classes">Classes</option>
          <option value="mechanics">Mechanics</option>
        </select>
      </div>

      {query !== "" && (
        <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>
          {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </p>
      )}

      {results.length === 0 && query !== "" && (
        <p className="text-muted">No results found.</p>
      )}

      {results.map((page) => (
        <Link
          key={page.id}
          to={`/docs/${page.section}/${page.id}`}
          className="d-block text-decoration-none border rounded p-3 mb-2 text-dark"
        >
          <div className="fw-semibold">{page.title}</div>
          <div className="text-muted" style={{ fontSize: "0.82rem" }}>
            {page.content.slice(0, 100)}...
          </div>
          <span className="badge bg-secondary mt-1">{page.section}</span>
        </Link>
      ))}
    </div>
  );
};