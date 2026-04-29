import { useParams, Link, Outlet, useNavigate } from 'react-router-dom'
import date from '../../data/pagini.json'

import { NuAFostGasita } from './NuAFostGasite'

import './PaginaDoc.css'

function PaginaDoc() {
  const { sectiune, paginaId } = useParams()
  const navigate = useNavigate()

  const sectiuneGasita = date.sectiuni.find(s => s.id === sectiune)
  const paginaGasita = date.pagini.find(p => p.sectiune === sectiune && p.id === paginaId)
  if (!sectiuneGasita || !paginaGasita) return <NuAFostGasita inDocs />

  const paginiSectiune = date.pagini.filter(p => p.sectiune === sectiune)
  const index = paginiSectiune.findIndex(p => p.id === paginaId)
  const anterioara = paginiSectiune[index - 1]
  const urmatoare = paginiSectiune[index + 1]

  return (
    <div className="aspectPaginaDoc">
      <button onClick={() => navigate(-1)} className="butonInapoi">← Inapoi</button>

      <h1 className="titluDoc">{paginaGasita.titlu}</h1>

      <div className="taguri">
        {paginaGasita.taguri.map(tag => (
          <Link key={tag} to={`/docs/cauta?tag=${tag}`} className="eticheta">#{tag}</Link>
        ))}
      </div>

      <div className="corpDoc">{paginaGasita.continut}</div>

      <div className="actiuniDoc">
        <Link to={`/docs/${sectiune}/${paginaId}/editare`} className="butonEditare">Editeaza</Link>
        <Link to={`/docs/${sectiune}/${paginaId}/comentarii`} className="butonComentarii">Comentarii</Link>
      </div>

      <div className="panouComentarii"><Outlet /></div>

      <nav className="navigarePrevNext">
        <div>{anterioara && <Link to={`/docs/${sectiune}/${anterioara.id}`} className="legPrevNext">← {anterioara.titlu}</Link>}</div>
        <div>{urmatoare && <Link to={`/docs/${sectiune}/${urmatoare.id}`} className="legPrevNext">{urmatoare.titlu} →</Link>}</div>
      </nav>
    </div>
  )
}

export { PaginaDoc }