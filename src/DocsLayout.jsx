import { NavLink, Outlet, useParams } from "react-router";
import pages from "./data/pages.json";
import Breadcrumb from "./Breadcrumb";

const sections = [...new Set(pages.map((p) => p.sectiune))];

export default function DocsLayout() {
  const params = useParams();

  return (
    <div className="docs-wrap">
      <aside className="sidebar">
        <div className="sidebar-title">Sectiuni</div>
        {sections.map((sec) => {
          const secPages = pages.filter((p) => p.sectiune === sec);
          return (
            <div key={sec} className="sidebar-section">
              <NavLink
                to={"/docs/" + sec}
                end
                className={({ isActive }) =>
                  "sidebar-section-link" + (isActive ? " active" : "")
                }
              >
                {sec}
              </NavLink>
              <ul className="sidebar-pages">
                {secPages.map((pg) => (
                  <li key={pg.id}>
                    <NavLink
                      to={"/docs/" + pg.sectiune + "/" + pg.id}
                      className={({ isActive }) =>
                        "sidebar-page-link" + (isActive ? " active" : "")
                      }
                    >
                      {pg.titlu}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </aside>
      <div className="docs-main">
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  );
}
