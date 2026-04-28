import { Link, useLocation } from "react-router";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    return { label: seg, path };
  });

  return (
    <nav className="breadcrumb">
      <Link to="/">Acasa</Link>
      {crumbs.map((c, i) => (
        <span key={c.path}>
          <span className="breadcrumb-sep"> / </span>
          {i === crumbs.length - 1 ? (
            <span>{c.label}</span>
          ) : (
            <Link to={c.path}>{c.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
