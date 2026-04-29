import { useNavigate, useLocation } from 'react-router-dom'
import { usePrivat } from '../../Contexte/Contexte'

import './PaginaAutentificare.css'

function PaginaAutentificare() {
  const navigate = useNavigate()
  const locatie = useLocation()
  const { autentifica } = usePrivat()
  const caleOriginala = locatie.state?.de?.pathname || '/docs/privat'

  function login() {
    autentifica()
    navigate(caleOriginala)
  }

  return (
    <div className="aspectAutentificare">
      <div className="cardAutentificare">
        <h1 className="titluAutentificare">Autentificare</h1>
        <p className="textAutentificare">Aceasta zona necesita autentificare.</p>
        <div className="redirectareInfo">
          <strong>Dupa autentificare vei fi redirectionat la:</strong>
          <code>{caleOriginala}</code>
        </div>
        <button onClick={login} className="butonLogin">Autentifica-te</button>
      </div>
    </div>
  )
}

export { PaginaAutentificare }
