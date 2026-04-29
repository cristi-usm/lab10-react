import { useParams, Link } from 'react-router-dom'
import date from '../../data/pagini.json'
import { NuAFostGasita } from './NuAFostGasite'
import './PaginaSectiune.css'

function PaginaSectiune() {
  const { sectiune } = useParams()
  const sectiuneGasita = date.sectiuni.find(s => s.id === sectiune)
  if (!sectiuneGasita) return <NuAFostGasita inDocs />

  const pagini = date.pagini.filter(p => p.sectiune === sectiune)

  return (
    <div className="aspectSectiune">
      <h1 className="titluSectiunePagina">{sectiuneGasita.titlu}</h1>
      <p className="descriereSectiunePagina">{sectiuneGasita.descriere}</p>

      <div className="listaSectiune">
        {pagini.map((pagina, i) => (
          <Link key={pagina.id} to={`/docs/${sectiune}/${pagina.id}`} className="randSectiune">
            <span className="numarRand">{i + 1}</span>
            <div className="infoRand">
              <strong>{pagina.titlu}</strong>
              <span>{pagina.continut.slice(0, 90)}...</span>
            </div>
            <span className="sageataRand">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export { PaginaSectiune }