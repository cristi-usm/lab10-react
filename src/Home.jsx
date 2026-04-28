import { Link } from "react-router";
import pages from "./data/pages.json";

const sections = [...new Set(pages.map((p) => p.sectiune))];

export default function Home() {
  return (
    <div className="home">
      <h1>Ghid de Testare Software</h1>
      <p>
        Un ghid complet pentru concepte, tehnici si instrumente de testare
        software.
      </p>
      <div className="home-sections">
        {sections.map((sec) => {
          const secPages = pages.filter((p) => p.sectiune === sec);
          return (
            <div key={sec} className="home-section-card">
              <h2>
                <Link to={"/docs/" + sec}>{sec}</Link>
              </h2>
              <ul>
                {secPages.map((pg) => (
                  <li key={pg.id}>
                    <Link to={"/docs/" + pg.sectiune + "/" + pg.id}>
                      {pg.titlu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
