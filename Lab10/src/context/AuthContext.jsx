import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [autentificat, setAutentificat] = useState(false);

  const login = () => setAutentificat(true);
  const logout = () => setAutentificat(false);

  return (
    <AuthContext.Provider value={{ autentificat, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}