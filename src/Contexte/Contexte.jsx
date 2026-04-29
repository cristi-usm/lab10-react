/* eslint-disable */
import { createContext, useContext, useState } from 'react'

const ContextIstoric = createContext()
const ContextPrivat = createContext()

function FurnizorIstoric({ children }) {
  const [istoric, setIstoric] = useState([])

  function adauga(pagina) {
    setIstoric(vechi => [pagina, ...vechi.filter(p => p.cale !== pagina.cale)].slice(0, 10))
  }

  function sterge() { setIstoric([]) }

  return (
    <ContextIstoric.Provider value={{ istoric, adauga, sterge }}>
      {children}
    </ContextIstoric.Provider>
  )
}

function FurnizorPrivat({ children }) {
  const [autentificat, setAutentificat] = useState(false)
  return (
    <ContextPrivat.Provider value={{ autentificat, autentifica: () => setAutentificat(true) }}>
      {children}
    </ContextPrivat.Provider>
  )
}

function useIstoric() { return useContext(ContextIstoric) }
function usePrivat() { return useContext(ContextPrivat) }

export { FurnizorIstoric, FurnizorPrivat, useIstoric, usePrivat }
