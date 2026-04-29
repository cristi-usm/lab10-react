import './Comentarii.css'

function Comentarii() {
  return (
    <div className="aspectComentarii">
      <h3 className="titluComentarii">Comentarii</h3>
      {[{ initiale: 'AM', autor: 'Alexandru M.', text: 'Informatii foarte utile!' }, { initiale: 'IP', autor: 'Ioana P.', text: 'Multumesc pentru documentatie!' }].map(c => (
        <div key={c.autor} className="randComentariu">
          <div className="avatarComentariu">{c.initiale}</div>
          <div><strong className="autorComentariu">{c.autor}</strong><p className="textComentariu">{c.text}</p></div>
        </div>
      ))}
      <textarea placeholder="Adauga un comentariu..." className="campComentariu" rows={2} />
      <button className="butonTrimite">Trimite</button>
    </div>
  )
}

export { Comentarii }