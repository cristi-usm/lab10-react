import { NavLink, Outlet } from "react-router";
import docs from "../data/docs.json";
import { Breadcrumb } from "./Breadcrumb";
import { FaBookSkull } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";

const sections = [...new Set(docs.map((d) => d.section))];


export const DocsLayout = () => {
  return (
    <div className="d-flex">
      <div className="bg-light border-end p-3" style={{ width: "230px", minWidth: "230px", minHeight: "100vh" }}>
        {sections.map((section) => (
          <div key={section} className="mb-3">
            {section === "basics" && (
              <p className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: "0.91rem" }}>
              <FaBookSkull className="me-2" />{section}
            </p>
            )}
            {section === "mechanics" && (
              <p className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: "0.91rem" }}>
              <FaGear className="me-2" />{section}
            </p>
            )}
            {section === "classes" && (
              <p className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: "0.91rem" }}>
              <LuSwords className="me-2" />{section}
            </p>
            )}
            {docs
              .filter((d) => d.section === section)
              .map((page) => (
                <NavLink
                  key={page.id}
                  to={`/docs/${page.section}/${page.id}`}
                  className="d-block text-decoration-none px-2 py-1 rounded mb-1"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#7c3aed" : "transparent",
                    color: isActive ? "#fff" : "#333",
                    fontWeight: isActive ? "600" : "400",
                    fontSize: "0.88rem",
                  })}
                >
                  {({ isActive }) => <>{isActive ? "✓ " : ""}{page.title}</>}
                </NavLink>
              ))}
          </div>
        ))}
      </div>

      <div className="flex-grow-1 p-4">
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  )
}