import { Navigate, useLocation } from 'react-router-dom'
import { usePrivat } from '../../Contexte/Contexte'
import './ZonaPrivata.css'

function ZonaPrivata() {
  const { autentificat } = usePrivat()
  const locatie = useLocation()

  if (!autentificat) return <Navigate to="/docs/autentificare" replace state={{ de: locatie }} />

  return (
    <div className="aspectPrivat">
      <h1 className="titluPrivat">Zona Privata</h1>
      <p className="textPrivat">Esti autentificat! Aceasta zona contine informatii confidentiale.</p>
      <ul className="listaPrivata">
        <li>Specificatii tehnice avansate</li>
        <li>Preturi en-gros si discount-uri</li>
        <li>Planuri de productie 2025</li>
      </ul>
    </div>
  )
}

export { ZonaPrivata }