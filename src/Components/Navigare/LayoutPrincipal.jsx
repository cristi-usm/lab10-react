import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './LayoutPrincipal.css'

function LayoutPrincipal() {
  const navigate = useNavigate()
  const [cautareRapida, setCautareRapida] = useState('')

  function trimiteCautare(eveniment) {
    eveniment.preventDefault()
    if (cautareRapida.trim()) {
      navigate(`/docs/cauta?q=${encodeURIComponent(cautareRapida.trim())}`)
      setCautareRapida('')
    }
  }

  function gestioneazaTasta(eveniment) {
    if (eveniment.key === 'Enter') {
      trimiteCautare(eveniment)
    }
  }

  return (
    <div className="aspectLayoutPrincipal">
      <header className="antetLayout">
        <div className="antetStanga">
          <Link to="/" className="logoLayout">
            ConstructMob
          </Link>
          <nav className="navigareAntet">
            <Link to="/">Acasa</Link>
            <Link to="/despre">Despre</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/docs" className="legaturaDocs">Documentatie</Link>
          </nav>
        </div>

        <div className="cautareAntet">
          <input
            type="text"
            placeholder="Cauta... (Ctrl+K)"
            value={cautareRapida}
            onChange={e => setCautareRapida(e.target.value)}
            onKeyDown={gestioneazaTasta}
            className="campCautareAntet"
          />
          <button onClick={trimiteCautare} className="butonCautareAntet">
            Cauta
          </button>
        </div>
      </header>

      <main className="continutPrincipal">
        <Outlet />
      </main>

      <footer className="subsolLayout">
        <p>© {new Date().getFullYear()} ConstructMob — Documentatie Mobila</p>
        <div className="legaturiSubsol">
          <Link to="/">Acasa</Link>
          <Link to="/despre">Despre</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/docs">Documentatie</Link>
        </div>
      </footer>
    </div>
  )
}

export { LayoutPrincipal }