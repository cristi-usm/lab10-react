import { useSearchParams, Link } from "react-router-dom";
import date from "../data/docs.json";

function Cauta() {
  const [params, setParams] = useSearchParams();

  const q = params.get("q") || "";
  const tags = params.getAll("tag");

  const rezultate = date.filter(p => {
    const matchText =
      p.titlu.toLowerCase().includes(q.toLowerCase()) ||
      p.continut.toLowerCase().includes(q.toLowerCase());

    const matchTag =
      tags.length === 0 ||
      tags.some(tag => p.taguri.includes(tag));

    return matchText && matchTag;
  });

  const adaugaTag = (tag) => {
    const noi = [...tags, tag];
    setParams({ q, tag: noi });
  };

  return (
    <div className="card">
      <h1>Cautare</h1>

      <input
        value={q}
        onChange={(e) => setParams({ q: e.target.value, tag: tags })}
      />

      <button onClick={() => setParams({})}>
        Reset
      </button>

      <div>
        <button onClick={() => adaugaTag("router")}>#router</button>
        <button onClick={() => adaugaTag("hooks")}>#hooks</button>
      </div>

      {rezultate.map(p => (
        <div key={p.id}>
          <Link to={`/docs/${p.sectiune}/${p.id}`}>
            {p.titlu}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Cauta;