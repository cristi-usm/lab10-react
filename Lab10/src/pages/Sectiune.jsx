import { useParams, Link } from "react-router-dom";
import date from "../data/docs.json";

function Sectiune() {
  const { sectiune } = useParams();

  const pagini = date.filter(p => p.sectiune === sectiune);

  if (pagini.length === 0) return <h2>Sectiune inexistenta</h2>;

  return (
    <div>
      <h1>{sectiune}</h1>

      {pagini.map(p => (
        <div key={p.id}>
          <Link to={`/docs/${sectiune}/${p.id}`}>
            {p.titlu}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sectiune;