import { useSearchParams, Link } from "react-router";
import pages from "./data/pages.json";

const sections = [...new Set(pages.map((p) => p.sectiune))];
const allTags = [...new Set(pages.flatMap((p) => p.taguri))];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const sectiune = searchParams.get("sectiune") || "";
  const tags = searchParams.getAll("tag");

  function handleQChange(e) {
    setSearchParams((prev) => {
      if (e.target.value) {
        prev.set("q", e.target.value);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  }

  function handleSectionChange(e) {
    setSearchParams((prev) => {
      if (e.target.value) {
        prev.set("sectiune", e.target.value);
      } else {
        prev.delete("sectiune");
      }
      return prev;
    });
  }

  function handleAddTag(tag) {
    if (tags.includes(tag)) return;
    setSearchParams((prev) => {
      prev.append("tag", tag);
      return prev;
    });
  }

  function handleRemoveTag(tag) {
    setSearchParams((prev) => {
      const remaining = prev.getAll("tag").filter((t) => t !== tag);
      prev.delete("tag");
      remaining.forEach((t) => prev.append("tag", t));
      return prev;
    });
  }

  function handleReset() {
    setSearchParams({});
  }

  const results = pages.filter((pg) => {
    const matchQ =
      !q ||
      pg.titlu.toLowerCase().includes(q.toLowerCase()) ||
      pg.continut.toLowerCase().includes(q.toLowerCase());
    const matchSec = !sectiune || pg.sectiune === sectiune;
    const matchTags =
      tags.length === 0 || tags.every((t) => pg.taguri.includes(t));
    return matchQ && matchSec && matchTags;
  });

  return (
    <div className="page-content search-page">
      <h1>Cautare</h1>
      <div className="search-controls">
        <input
          id="search-input"
          value={q}
          onChange={handleQChange}
          placeholder="Cauta..."
          className="search-input"
          autoFocus
        />
        <select value={sectiune} onChange={handleSectionChange}>
          <option value="">Toate sectiunile</option>
          {sections.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reseteaza filtrele
        </button>
      </div>
      <div className="tag-filter">
        <span>Filtru dupa tag: </span>
        {allTags.map((t) => (
          <button
            key={t}
            className={"tag-btn" + (tags.includes(t) ? " active" : "")}
            onClick={() =>
              tags.includes(t) ? handleRemoveTag(t) : handleAddTag(t)
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="search-results">
        <p>{results.length} rezultat(e)</p>
        {results.map((pg) => (
          <div key={pg.id} className="search-result-item">
            <Link to={"/docs/" + pg.sectiune + "/" + pg.id}>{pg.titlu}</Link>
            <span className="result-section">{pg.sectiune}</span>
            <span className="tag-list">
              {pg.taguri.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </span>
            <p className="result-excerpt">{pg.continut.slice(0, 120)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
