import { useParams, Link } from "react-router-dom";
import { useIstoric } from "../context/IstoricContext";
import { useEffect } from "react";
import date from "../data/docs.json";

function Pagina() {
  const { sectiune, paginaId } = useParams();
  const { adauga } = useIstoric();

  const pagina = date.find(
    p => p.sectiune === sectiune && p.id === paginaId
  );

  useEffect(() => {
    if (pagina) {
      adauga(`/docs/${sectiune}/${paginaId}`);
    }
  }, []);

  if (!pagina) return <h2>Pagina inexistenta</h2>;

  const pagini = date.filter(p => p.sectiune === sectiune);
  const index = pagini.findIndex(p => p.id === paginaId);

  return (
  <div>
    <h1>{pagina.titlu}</h1>

    <p style={{ lineHeight: "1.6" }}>
      {pagina.continut}
    </p>

    <hr />

    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {index > 0 && (
        <Link to={`/docs/${sectiune}/${pagini[index - 1].id}`}>
          ← {pagini[index - 1].titlu}
        </Link>
      )}

      {index < pagini.length - 1 && (
        <Link to={`/docs/${sectiune}/${pagini[index + 1].id}`}>
          {pagini[index + 1].titlu} →
        </Link>
      )}
    </div>
  </div>
);
}

export default Pagina;