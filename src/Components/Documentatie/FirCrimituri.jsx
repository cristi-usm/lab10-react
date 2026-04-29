import { Link, useLocation } from 'react-router-dom'
import date from '../../data/pagini.json'
import './FirCrimituri.css'

function FirCrimituri() {
  const { pathname } = useLocation()
  const segmente = pathname.split('/').filter(Boolean)
  if (segmente.length === 0) return null

  const traduceri = {
    docs: 'Documentatie',
    cauta: 'Cautare',
    istoric: 'Istoric',
    editare: 'Editare',
    comentarii: 'Comentarii',
    privat: 'Zona Privata',
    autentificare: 'Autentificare'
  }

  function traduceSegment(seg) {
    return date.sectiuni.find(s => s.id === seg)?.titlu
      || date.pagini.find(p => p.id === seg)?.titlu
      || traduceri[seg] || seg
  }

  const niveluri = [{ text: 'Acasa', cale: '/' }]
  let cale = ''
  segmente.forEach(seg => {
    cale += `/${seg}`
    niveluri.push({ text: traduceSegment(seg), cale })
  })

  return (
    <nav className="firCrimituri">
      {niveluri.map((nivel, i) => (
        <span key={nivel.cale}>
          {i < niveluri.length - 1
            ? <><Link to={nivel.cale} className="legaturaNivel">{nivel.text}</Link><span className="separator"> / </span></>
            : <span className="nivelCurent">{nivel.text}</span>
          }
        </span>
      ))}
    </nav>
  )
}

export { FirCrimituri }