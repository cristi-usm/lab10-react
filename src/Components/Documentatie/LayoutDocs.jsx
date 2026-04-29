import { Outlet, NavLink, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useIstoric } from '../../Contexte/Contexte'
import date from '../../data/pagini.json'
import { FirCrimituri } from './FirCrimituri'
import './LayoutDocs.css'

function LayoutDocs() {
  const { sectiune, paginaId } = useParams()
  const locatie = useLocation()
  const navigate = useNavigate()
  const { adauga } = useIstoric()

  useEffect(() => {
    function shortcut(e) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        navigate('/docs/cauta')
        setTimeout(() => document.getElementById('campCautare')?.focus(), 100)
      }
    }
    window.addEventListener('keydown', shortcut)
    return () => window.removeEventListener('keydown', shortcut)
  }, [navigate])

  useEffect(() => {
    if (sectiune && paginaId) {
      const pagina = date.pagini.find(p => p.sectiune === sectiune && p.id === paginaId)
      if (pagina) adauga({ cale: locatie.pathname, titlu: pagina.titlu, sectiune })
    }
  }, [locatie.pathname])

  return (
    <div className="aspectDocs">
      <aside className="panou">
        <NavLink to="/docs" end className="titluPanou">Documentatie</NavLink>

        {date.sectiuni.map(sec => (
          <div key={sec.id}>
            <NavLink to={`/docs/${sec.id}`} end className={({ isActive }) => isActive ? 'sectiunePanou activ' : 'sectiunePanou'}>
              {sec.titlu}
            </NavLink>
            {date.pagini.filter(p => p.sectiune === sec.id).map(pagina => (
              <NavLink key={pagina.id} to={`/docs/${sec.id}/${pagina.id}`}
                className={({ isActive }) => isActive ? 'paginaPanou activ' : 'paginaPanou'}>
                {({ isActive }) => <>{isActive && <span className="bifa">✓ </span>}{pagina.titlu}</>}
              </NavLink>
            ))}
          </div>
        ))}

        <div className="separatorPanou" />
        {[['cauta', 'Cautare'], ['istoric', 'Istoric'], ['privat', 'Zona Privata']].map(([cale, text]) => (
          <NavLink key={cale} to={`/docs/${cale}`} className={({ isActive }) => isActive ? 'legaturaPanou activ' : 'legaturaPanou'}>
            {text}
          </NavLink>
        ))}
      </aside>

      <div className="continutDocs">
        <FirCrimituri />
        <Outlet />
      </div>
    </div>
  )
}

export { LayoutDocs }