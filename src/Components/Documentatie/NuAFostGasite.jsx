import { Link, useNavigate } from 'react-router-dom'

function NuAFostGasita() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>404 - Pagina nu a fost gasita</h2>
      <p>Ne pare rau, pagina cautata nu exista.</p>
      <button onClick={() => navigate(-1)}>Inapoi</button>
      <Link to="/" style={{ marginLeft: '1rem' }}>Acasa</Link>
      <Link to="/docs" style={{ marginLeft: '1rem' }}>Documentatie</Link>
    </div>
  )
}

export { NuAFostGasita }