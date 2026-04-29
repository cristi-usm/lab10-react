import { useNavigate, Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>

      <button onClick={() => navigate(-1)}>
        Inapoi
      </button>

      <Link to="/">Acasa</Link>
    </div>
  );
}

export default NotFound;