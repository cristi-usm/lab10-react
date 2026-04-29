import { useLocation, Link } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link> /

      {parts.map((p, i) => {
        const url = "/" + parts.slice(0, i + 1).join("/");
        return (
          <span key={i}>
            <Link to={url}> {p}</Link> /
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;