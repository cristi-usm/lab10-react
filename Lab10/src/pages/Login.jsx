import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [parola, setParola] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (user && parola) {
      login();
      navigate(from, { replace: true });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br />

        <input
          placeholder="Parola"
          type="password"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
        />
        <br />

        <button type="submit">Autentificare</button>
      </form>
    </div>
  );
}

export default Login;