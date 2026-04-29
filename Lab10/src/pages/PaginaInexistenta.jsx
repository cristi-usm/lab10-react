import { Link } from "react-router-dom";

function PaginaInexistenta() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>404 - Pagina nu exista</h1>

      <p>
        Link-ul accesat nu este valid sau a fost mutat.
      </p>

      <Link to="/">
        ← Inapoi la Home
      </Link>
    </div>
  );
}

export default PaginaInexistenta;