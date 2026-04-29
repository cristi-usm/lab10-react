import { useIstoric } from "../context/IstoricContext";
import { Link } from "react-router-dom";

function Istoric() {
  const { istoric, sterge } = useIstoric();

  return (
    <div>
      <h1>Istoric</h1>

      <button onClick={sterge}>Sterge</button>

      {istoric.map((p, i) => (
        <div key={i}>
          <Link to={p}>{p}</Link>
        </div>
      ))}
    </div>
  );
}

export default Istoric;