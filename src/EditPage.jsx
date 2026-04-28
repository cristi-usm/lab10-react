import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import pages from "./data/pages.json";

const edited_pages_key = "stg_edited";

function getEditedPages() {
  try {
    return JSON.parse(localStorage.getItem(edited_pages_key) || "{}");
  } catch {
    return {};
  }
}

function saveEditedPage(sectiune, paginaId, titlu, continut) {
  const edited = getEditedPages();
  edited[`${sectiune}/${paginaId}`] = { titlu, continut };
  localStorage.setItem(edited_pages_key, JSON.stringify(edited));
}

export function getPageContent(sectiune, paginaId) {
  const edited = getEditedPages();
  const key = `${sectiune}/${paginaId}`;
  if (edited[key]) {
    return edited[key];
  }
  const page = pages.find((p) => p.sectiune === sectiune && p.id === paginaId);
  return page ? { titlu: page.titlu, continut: page.continut } : null;
}

export default function EditPage() {
  const { sectiune, paginaId } = useParams();
  const navigate = useNavigate();
  const page = pages.find((p) => p.sectiune === sectiune && p.id === paginaId);

  const content = getPageContent(sectiune, paginaId);
  const [titlu, setTitlu] = useState(content ? content.titlu : "");
  const [continut, setContinut] = useState(content ? content.continut : "");

  if (!page) {
    return (
      <div className="page-content">
        <p>Pagina negasita.</p>
      </div>
    );
  }

  function handleSave(e) {
    e.preventDefault();
    saveEditedPage(sectiune, paginaId, titlu, continut);
    navigate("/docs/" + sectiune + "/" + paginaId, { replace: true });
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="page-content">
      <h1>Editare: {page.titlu}</h1>
      <form className="edit-form" onSubmit={handleSave}>
        <label>
          Titlu
          <input value={titlu} onChange={(e) => setTitlu(e.target.value)} />
        </label>
        <label>
          Continut
          <textarea
            rows={6}
            value={continut}
            onChange={(e) => setContinut(e.target.value)}
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn">
            Salveaza
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Anuleaza
          </button>
        </div>
      </form>
    </div>
  );
}
