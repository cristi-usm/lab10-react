import { createContext, useContext, useState } from "react";

const IstoricContext = createContext();

export function IstoricProvider({ children }) {
  const [istoric, setIstoric] = useState([]);

  const adauga = (pagina) => {
    setIstoric(prev => [pagina, ...prev.slice(0, 9)]);
  };

  const sterge = () => setIstoric([]);

  return (
    <IstoricContext.Provider value={{ istoric, adauga, sterge }}>
      {children}
    </IstoricContext.Provider>
  );
}

export function useIstoric() {
  return useContext(IstoricContext);
}