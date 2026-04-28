import { Link, useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-content not-found">
      <h1>404 - Pagina negasita</h1>
      <p>Pagina cautata nu exista.</p>
      <div className="not-found-actions">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Inapoi
        </button>
        <Link to="/" className="btn">
          Acasa
        </Link>
      </div>
    </div>
  );
}
