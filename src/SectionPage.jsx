import { Link, Navigate, useParams } from "react-router";
import pages from "./data/pages.json";

export default function SectionPage() {
  const { sectiune } = useParams();
  const secPages = pages.filter((p) => p.sectiune === sectiune);

  if (secPages.length === 0) {
    return (
      <div className="page-content">
        <h2>Sectiunea negasita: {sectiune}</h2>
        <Link to="/docs">Inapoi la Documentatie</Link>
      </div>
    );
  }

  return <Navigate to={`/docs/${sectiune}/${secPages[0].id}`} replace />;
}
