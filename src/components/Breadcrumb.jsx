import { Link, useLocation } from "react-router";

const labels = {
  docs: "Docs",
  basics: "Basics",
  classes: "Classes",
  mechanics: "Mechanics",
  private: "Dev Notes",
  search: "Search",
  history: "History",
  edit: "Edit",
};

export const Breadcrumb = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    const label = labels[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return { label, path };
  });

  return (
    <nav>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path}>
              {isLast ? (
                <span>{crumb.label}</span>
              ) : (
                <Link to={crumb.path}>{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};