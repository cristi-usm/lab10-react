function Despre() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Despre aplicatie</h1>

      <p>
        DevCore Docs este o aplicatie de tip documentatie interactiva construita cu React Router.
      </p>

      <h3>Ce inveti din acest proiect:</h3>
      <ul>
        <li>Routing avansat (nested routes)</li>
        <li>useParams si useSearchParams</li>
        <li>Layout-uri reutilizabile</li>
        <li>Autentificare simulata</li>
        <li>Navigare programatica</li>
      </ul>

      <p>
        Scopul proiectului este sa simuleze o documentatie reala ca la framework-uri moderne.
      </p>
    </div>
  );
}

export default Despre;