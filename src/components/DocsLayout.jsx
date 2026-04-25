import { NavLink, Outlet } from "react-router";
import docs from "../data/docs.json";
import { Breadcrumb } from "./Breadcrumb";

const sections = [...new Set(docs.map((d) => d.section))];

const sectionLabels = {
  basics: "Basics",
  classes: "Classes",
  mechanics: "Mechanics",
  private: "Dev Notes",
};

export const DocsLayout = () => {
  return (
    <div>
      <aside>
        <div>
          <p>Documentation</p>
          {sections.map((section) => (
            <div key={section}>
              <NavLink to={`/docs/${section}`}>
                {sectionLabels[section] || section}
              </NavLink>
              <div>
                {docs
                  .filter((d) => d.section === section)
                  .map((page) => (
                    <NavLink 
                      key={page.id} 
                      to={`/docs/${page.section}/${page.id}`}
                    >
                      {page.title}
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main>
        <header>
          <Breadcrumb />
        </header>
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};