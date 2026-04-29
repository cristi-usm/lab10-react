import { Link } from 'react-router-dom'
import { useIstoric } from '../../Contexte/Contexte'
import date from '../../data/pagini.json'
import './PaginaIstoric.css'

function PaginaIstoric() {
  const { istoric, sterge } = useIstoric()

  return (
    <div className="aspectIstoric">
      <div className="antetIstoric">
        <h1 className="titluIstoric">Istoric</h1>
        {istoric.length > 0 && <button onClick={sterge} className="butonSterge">Sterge</button>}
      </div>

      {istoric.length === 0
        ? <p className="istoricGol">Nu ai vizitat nicio pagina inca. <Link to="/docs">Incepe aici</Link></p>
        : <div className="listaIstoric">
            {istoric.map((intrare, i) => (
              <Link key={`${intrare.cale}-${i}`} to={intrare.cale} className="randIstoric">
                <span className="numarIstoric">{i + 1}</span>
                <div className="infoIstoric">
                  <strong>{intrare.titlu}</strong>
                  <span>{date.sectiuni.find(s => s.id === intrare.sectiune)?.titlu}</span>
                </div>
                <span className="sageataIstoric">→</span>
              </Link>
            ))}
          </div>
      }
    </div>
  )
}

export { PaginaIstoric }