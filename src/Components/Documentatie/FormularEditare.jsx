import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import date from '../../data/pagini.json'
import './FormularEditare.css'

function FormularEditare() {
  const { sectiune, paginaId } = useParams()
  const navigate = useNavigate()
  const pagina = date.pagini.find(p => p.sectiune === sectiune && p.id === paginaId)

  const [titlu, setTitlu] = useState(pagina?.titlu || '')
  const [continut, setContinut] = useState(pagina?.continut || '')

  if (!pagina) return <p>Pagina nu a fost gasita.</p>

  function salveaza(e) {
    e.preventDefault()
    navigate(`/docs/${sectiune}/${paginaId}`, { replace: true })
  }

  return (
    <div className="aspectFormular">
      <h2 className="titluFormular">Editeaza: {pagina.titlu}</h2>
      <form className="formular" onSubmit={salveaza}>
        <div className="camp">
          <label>Titlu</label>
          <input type="text" value={titlu} onChange={e => setTitlu(e.target.value)} className="inputFormular" required />
        </div>
        <div className="camp">
          <label>Continut</label>
          <textarea value={continut} onChange={e => setContinut(e.target.value)} className="areaFormular" rows={8} required />
        </div>
        <div className="butoanele">
          <button type="submit" className="butonSalveaza">Salveaza</button>
          <button type="button" className="butonAnuleaza" onClick={() => navigate(-1)}>Anuleaza</button>
        </div>
      </form>
    </div>
  )
}

export { FormularEditare }