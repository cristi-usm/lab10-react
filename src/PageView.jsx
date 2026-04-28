import { Link, Outlet, useParams } from "react-router";
import { useEffect } from "react";
import pages from "./data/pages.json";
import { getPageContent } from "./EditPage";

const history_key = "stg_history";

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(history_key) || "[]");
  } catch {
    return [];
  }
}

function pushHistory(entry) {
  const prev = readHistory().filter((e) => e.path !== entry.path);
  localStorage.setItem(
    history_key,
    JSON.stringify([entry, ...prev].slice(0, 10)),
  );
}

export default function PageView() {
  const { sectiune, paginaId } = useParams();

  const page = pages.find((p) => p.sectiune === sectiune && p.id === paginaId);
  const content = getPageContent(sectiune, paginaId);

  const secPages = pages.filter((p) => p.sectiune === sectiune);
  const idx = secPages.findIndex((p) => p.id === paginaId);
  const prev = idx > 0 ? secPages[idx - 1] : null;
  const next = idx < secPages.length - 1 ? secPages[idx + 1] : null;

  useEffect(() => {
    if (page && content) {
      pushHistory({
        path: "/docs/" + sectiune + "/" + paginaId,
        titlu: content.titlu,
        sectiune,
      });
    }
  }, [sectiune, paginaId]);

  if (!page) {
    return <PaginaInexistenta sectiune={sectiune} paginaId={paginaId} />;
  }

  if (!content) {
    return <PaginaInexistenta sectiune={sectiune} paginaId={paginaId} />;
  }

  return (
    <div className="page-view-wrap">
      <div className="page-view">
        <h1>{content.titlu}</h1>
        <div className="page-meta">
          <span>Sectiune: {page.sectiune}</span>
          <span className="tag-list">
            {page.taguri.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </span>
        </div>
        <p className="page-body">{content.continut}</p>
        <div className="page-nav">
          {prev ? (
            <Link
              to={"/docs/" + prev.sectiune + "/" + prev.id}
              className="page-nav-link"
            >
              &lt; {prev.titlu}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={"/docs/" + next.sectiune + "/" + next.id}
              className="page-nav-link"
            >
              {next.titlu} &gt;
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div className="page-actions">
          <Link to={"editare"} className="btn">
            Editeaza
          </Link>
        </div>
      </div>
      <div className="comments-panel">
        <Outlet />
      </div>
    </div>
  );
}

function PaginaInexistenta({ sectiune, paginaId }) {
  return (
    <div className="page-content">
      <h2>Pagina negasita</h2>
      <p>
        Nu exista pagina cu id-ul "{paginaId}" in sectiunea "{sectiune}".
      </p>
      <Link to={"/docs/" + sectiune}>Inapoi la {sectiune}</Link>
    </div>
  );
}
