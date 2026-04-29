import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

function DocsLayout() {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content">
        <Link to="/" style={{ display: "block", marginBottom: "10px" }}>
          ← Inapoi la Home
        </Link>

        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  );
}

export default DocsLayout;