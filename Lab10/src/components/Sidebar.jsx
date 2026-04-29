import { NavLink } from "react-router-dom";
import date from "../data/docs.json";

function Sidebar() {
  const sectiuni = [...new Set(date.map(p => p.sectiune))];

  return (
    <div>
      {sectiuni.map(s => (
        <div key={s}>
          <h3>{s}</h3>

          {date
            .filter(p => p.sectiune === s)
            .map(p => (
              <NavLink
                key={p.id}
                to={`/docs/${s}/${p.id}`}
                className={({ isActive }) =>
                  isActive ? "activ" : ""
                }
              >
                {p.titlu}
              </NavLink>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;