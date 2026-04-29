import { useNavigate } from "react-router-dom";

export default function Editare() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Anuleaza</button>
      <button onClick={() => navigate("/docs/ghid/instalare", { replace: true })}>
        Salveaza
      </button>
    </div>
  );
}