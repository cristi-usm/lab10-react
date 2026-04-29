import { useSearchParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import date from '../../data/pagini.json'
import './PaginaCautare.css'

function PaginaCautare() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const sectiuneFilter = params.get('sectiune') || ''
  const taguri = params.getAll('tag')

  useEffect(() => { document.getElementById('campCautare')?.focus() }, [])

  function seteaza(cheie, valoare) {
    const noi = new URLSearchParams(params)
    valoare ? noi.set(cheie, valoare) : noi.delete(cheie)
    setParams(noi)
  }

  function adaugaTag(tag) {
    if (!taguri.includes(tag)) {
      const noi = new URLSearchParams(params)
      noi.append('tag', tag)
      setParams(noi)
    }
  }

  function stergeTag(tag) {
    const noi = new URLSearchParams(params)
    noi.delete('tag')
    taguri.filter(t => t !== tag).forEach(t => noi.append('tag', t))
    setParams(noi)
  }

  const rezultate = date.pagini.filter(p =>
    (!q || p.titlu.toLowerCase().includes(q.toLowerCase()) || p.continut.toLowerCase().includes(q.toLowerCase())) &&
    (!sectiuneFilter || p.sectiune === sectiuneFilter) &&
    (taguri.length === 0 || taguri.every(t => p.taguri.includes(t)))
  )

  const toateTagurile = [...new Set(date.pagini.flatMap(p => p.taguri))].sort()

  return (
    <div className="aspectCautare">
      <h1 className="titluCautare">Cautare</h1>

      <input id="campCautare" type="text" placeholder="Cauta..." value={q} onChange={e => seteaza('q', e.target.value)} className="campCautareInput" />

      <div className="filtreRand">
        <select value={sectiuneFilter} onChange={e => seteaza('sectiune', e.target.value)} className="selectFiltru">
          <option value="">Toate sectiunile</option>
          {date.sectiuni.map(s => <option key={s.id} value={s.id}>{s.titlu}</option>)}
        </select>

        {taguri.map(tag => <button key={tag} onClick={() => stergeTag(tag)} className="tagActiv">#{tag} x</button>)}

        {(q || sectiuneFilter || taguri.length > 0) &&
          <button onClick={() => setParams({})} className="butonReset">Reseteaza</button>}
      </div>

      <div className="taguriDisp">
        <span>Tag-uri: </span>
        {toateTagurile.filter(t => !taguri.includes(t)).slice(0, 8).map(tag =>
          <button key={tag} onClick={() => adaugaTag(tag)} className="tagDisp">+{tag}</button>
        )}
      </div>

      <p className="numarRezultate">{rezultate.length} rezultate</p>

      {rezultate.map(pagina => (
        <Link key={pagina.id} to={`/docs/${pagina.sectiune}/${pagina.id}`} className="cardRezultat">
          <div className="antetRezultat">
            <strong>{pagina.titlu}</strong>
            <span className="badgeSectiune">{date.sectiuni.find(s => s.id === pagina.sectiune)?.titlu}</span>
          </div>
          <p className="previzualizare">{pagina.continut.slice(0, 120)}...</p>
        </Link>
      ))}
    </div>
  )
}

export { PaginaCautare }