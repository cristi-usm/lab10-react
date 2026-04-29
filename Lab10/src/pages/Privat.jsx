import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function Privat({ children }) {
  const { autentificat } = useAuth();
  const location = useLocation();

  if (!autentificat) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default Privat;