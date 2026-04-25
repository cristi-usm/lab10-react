import { Link, useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

     return (
    <div>
        <div></div>
        <h2>404 — Page Not Found</h2>
        <p>
        You wandered into uncharted territory. This page does not exist in the known world of Aethermoor.
        </p>
        <div>
        <button onClick={() => navigate(-1)}>
            ← Go Back
        </button>
        <Link to="/">
            Home
        </Link>
        </div>
    </div>
    )
}