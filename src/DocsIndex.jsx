import { Link } from "react-router";
import pages from "./data/pages.json";

const sections = [...new Set(pages.map((p) => p.sectiune))];

export default function DocsIndex() {
  return (
    <div className="page-content">
      <h1>Documentatie</h1>
      <p>Aceasta este paginia de start a documentatiei.</p>
      {sections.map((sec) => (
        <div key={sec} className="docs-index-section">
          <h2>
            <Link to={"/docs/" + sec}>{sec}</Link>
          </h2>
          <ul>
            {pages
              .filter((p) => p.sectiune === sec)
              .map((pg) => (
                <li key={pg.id}>
                  <Link to={"/docs/" + pg.sectiune + "/" + pg.id}>
                    {pg.titlu}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
