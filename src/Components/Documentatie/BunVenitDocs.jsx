import { Link } from 'react-router-dom'
import date from '../../data/pagini.json'
import './BunVenitDocs.css'

function BunVenitDocs() {
  return (
    <div className="aspectBunVenit">
      <div className="erou">
        <h1 className="titluErou">Documentatie ConstructMob</h1>
        <p className="textErou">Ghidul complet pentru mobila ta.</p>
        <Link to="/docs/cauta" className="butonCauta">Cauta in documentatie</Link>
      </div>

      <h2 className="titluSectiuni">Sectiuni</h2>
      <div className="grilaSectiuni">
        {date.sectiuni.map(sec => (
          <Link key={sec.id} to={`/docs/${sec.id}`} className="cardSectiune">
            <h3>{sec.titlu}</h3>
            <p>{sec.descriere}</p>
            <span className="numarPagini">{date.pagini.filter(p => p.sectiune === sec.id).length} pagini</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export { BunVenitDocs }