import { Link, useNavigate } from "react-router";

export default function DocsNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-content not-found">
      <h2>404 - Pagina negasita in Documentatie</h2>

      <div className="not-found-actions">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Inapoi
        </button>
        <Link to="/docs" className="btn">
          Documentatie
        </Link>
      </div>
    </div>
  );
}
