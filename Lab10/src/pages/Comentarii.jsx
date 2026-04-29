import { useState } from "react";

function Comentarii() {
  const [comentarii, setComentarii] = useState([]);
  const [text, setText] = useState("");

  const adauga = () => {
    if (text.trim() === "") return;
    setComentarii([...comentarii, text]);
    setText("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Comentarii</h3>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={adauga}>Adauga</button>

      {comentarii.map((c, i) => (
        <p key={i}>- {c}</p>
      ))}
    </div>
  );
}

export default Comentarii;