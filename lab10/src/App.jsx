import { useMemo, useRef, useState } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
  Navigate
} from "react-router";

import docs from "./data/docs.json";

function getSections() {
  return [...new Set(docs.map((page) => page.sectiune))];
}

function getPagesBySection(section) {
  return docs.filter((page) => page.sectiune === section);
}

function findPage(section, id) {
  return docs.find((page) => page.sectiune === section && page.id === id);
}

function sectionTitle(section) {
  const names = {
    start: "Ghid de start",
    routing: "Routing",
    hooks: "Hooks",
    privat: "Privat"
  };

  return names[section] || section;
}

function AuthProvider({ children }) {
  const [isPrivateUnlocked, setIsPrivateUnlocked] = useState(false);

  return children({
    isPrivateUnlocked,
    setIsPrivateUnlocked
  });
}

export default function App() {
  const [history, setHistory] = useState([]);

  return (
    <AuthProvider>
      {({ isPrivateUnlocked, setIsPrivateUnlocked }) => (
        <Routes>
          <Route
            element={
              <Layout
                history={history}
                setHistory={setHistory}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="despre" element={<About />} />
            <Route path="contact" element={<Contact />} />

            <Route
              path="docs"
              element={
                <DocsLayout
                  history={history}
                  setHistory={setHistory}
                />
              }
            >
              <Route index element={<DocsWelcome />} />
              <Route
                path=":sectiune"
                element={
                  <SectionPage isPrivateUnlocked={isPrivateUnlocked} />
                }
              />
              <Route
                path=":sectiune/:paginaId"
                element={
                  <DocPage isPrivateUnlocked={isPrivateUnlocked} />
                }
              >
                <Route path="comentarii" element={<Comments />} />
              </Route>
              <Route
                path=":sectiune/:paginaId/editare"
                element={<EditPage />}
              />
              <Route path="*" element={<DocsNotFound />} />
            </Route>

            <Route path="cauta" element={<SearchPage />} />
            <Route
              path="istoric"
              element={
                <HistoryPage
                  history={history}
                  setHistory={setHistory}
                />
              }
            />
            <Route
              path="login"
              element={
                <LoginPage setIsPrivateUnlocked={setIsPrivateUnlocked} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </AuthProvider>
  );
}

function Layout() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  function handleQuickSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("quickSearch").trim();

    if (query) {
      navigate(`/cauta?q=${encodeURIComponent(query)}`);
    }
  }

  function handleKeyDown(event) {
    if (event.ctrlKey && event.key.toLowerCase() === "k") {
      event.preventDefault();
      navigate("/cauta");

      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="header">
        <div>
          <h1>MiniDocsJS</h1>
          <p>Aplicatie de documentatie cu React Router</p>
        </div>

        <nav className="top-nav">
          <NavLink to="/">Acasa</NavLink>
          <NavLink to="/docs">Docs</NavLink>
          <NavLink to="/cauta">Cauta</NavLink>
          <NavLink to="/istoric">Istoric</NavLink>
          <NavLink to="/despre">Despre</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <form onSubmit={handleQuickSearch} className="quick-search">
          <input
            ref={searchRef}
            name="quickSearch"
            placeholder="Cauta rapid... Ctrl+K"
          />
          <button>Cauta</button>
        </form>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        Link extern:{" "}
        <a href="https://reactrouter.com/" target="_blank">
          React Router
        </a>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <section className="page-card">
      <h2>Pagina principala</h2>
      <p>
        Aceasta aplicatie demonstreaza folosirea React Router pentru un site de
        documentatie.
      </p>
      <Link className="button-link" to="/docs">
        Intra in documentatie
      </Link>
    </section>
  );
}

function About() {
  return (
    <section className="page-card">
      <h2>Despre proiect</h2>
      <p>
        Proiect realizat cu Vite, React si React Router. Continutul este incarcat
        dintr-un fisier JSON local.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section className="page-card">
      <h2>Contact</h2>
      <p>Email demonstrativ: student@example.com</p>
    </section>
  );
}

function DocsLayout({ history, setHistory }) {
  const location = useLocation();

  return (
    <div className="docs-layout">
      <aside className="sidebar">
        <h3>Sectiuni</h3>

        {getSections().map((section) => (
          <div key={section} className="section-block">
            <NavLink
              to={`/docs/${section}`}
              end
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? "✓ " : ""}
                  {sectionTitle(section)}
                </>
              )}
            </NavLink>

            <div className="page-links">
              {getPagesBySection(section).map((page) => (
                <NavLink
                  key={page.id}
                  to={`/docs/${section}/${page.id}`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link small active" : "sidebar-link small"
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? "✓ " : ""}
                      {page.titlu}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <section className="docs-content">
        <Breadcrumb />

        <Outlet context={{ history, setHistory, pathname: location.pathname }} />
      </section>
    </div>
  );
}

function Breadcrumb() {
  const location = useLocation();

  const parts = location.pathname
    .split("/")
    .filter(Boolean);

  let path = "";

  return (
    <div className="breadcrumb">
      <Link to="/">Acasa</Link>

      {parts.map((part) => {
        path += `/${part}`;

        return (
          <span key={path}>
            {" / "}
            <Link to={path}>{formatBreadcrumb(part)}</Link>
          </span>
        );
      })}
    </div>
  );
}

function formatBreadcrumb(value) {
  const foundPage = docs.find((page) => page.id === value);
  if (foundPage) return foundPage.titlu;

  return sectionTitle(value);
}

function DocsWelcome() {
  return (
    <div className="page-card">
      <h2>Bine ai venit in documentatie</h2>
      <p>
        Alege o sectiune din meniul lateral pentru a vedea paginile disponibile.
      </p>
      <Navigate to="/docs/start" replace />
    </div>
  );
}

function SectionPage({ isPrivateUnlocked }) {
  const { sectiune } = useParams();
  const location = useLocation();

  if (sectiune === "privat" && !isPrivateUnlocked) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const pages = getPagesBySection(sectiune);

  if (pages.length === 0) {
    return <PaginaInexistenta />;
  }

  return (
    <div className="page-card">
      <h2>{sectionTitle(sectiune)}</h2>
      <p>Pagini disponibile in aceasta sectiune:</p>

      <div className="card-grid">
        {pages.map((page) => (
          <Link
            className="doc-card"
            key={page.id}
            to={`/docs/${page.sectiune}/${page.id}`}
          >
            <h3>{page.titlu}</h3>
            <p>{page.continut.slice(0, 90)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DocPage({ isPrivateUnlocked }) {
  const { sectiune, paginaId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  if (sectiune === "privat" && !isPrivateUnlocked) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const page = findPage(sectiune, paginaId);

  if (!page) {
    return <PaginaInexistenta />;
  }

  const sectionPages = getPagesBySection(sectiune);
  const currentIndex = sectionPages.findIndex((item) => item.id === paginaId);

  const previousPage = sectionPages[currentIndex - 1];
  const nextPage = sectionPages[currentIndex + 1];

  return (
    <article className="page-card">
      <h2>{page.titlu}</h2>

      <div className="tags">
        {page.taguri.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <p>{page.continut}</p>

      <div className="doc-actions">
        <button onClick={() => navigate("editare")}>Editeaza</button>
        <Link to="comentarii">Comentarii</Link>
      </div>

      <div className="prev-next">
        {previousPage ? (
          <Link to={`/docs/${sectiune}/${previousPage.id}`}>
            ← Pagina anterioara
          </Link>
        ) : (
          <span />
        )}

        {nextPage ? (
          <Link to={`/docs/${sectiune}/${nextPage.id}`}>
            Pagina urmatoare →
          </Link>
        ) : (
          <span />
        )}
      </div>

      <div className="nested-panel">
        <Outlet />
      </div>
    </article>
  );
}

function Comments() {
  return (
    <div className="comments">
      <h3>Comentarii</h3>
      <p>Ruta imbricata suplimentara pentru comentarii.</p>
    </div>
  );
}

function EditPage() {
  const { sectiune, paginaId } = useParams();
  const navigate = useNavigate();

  const page = findPage(sectiune, paginaId);

  if (!page) {
    return <PaginaInexistenta />;
  }

  function handleSave(event) {
    event.preventDefault();
    navigate(`/docs/${sectiune}/${paginaId}`, { replace: true });
  }

  return (
    <div className="page-card">
      <h2>Editare pagina</h2>

      <form className="edit-form" onSubmit={handleSave}>
        <label>
          Titlu
          <input defaultValue={page.titlu} />
        </label>

        <label>
          Continut
          <textarea defaultValue={page.continut} />
        </label>

        <div className="doc-actions">
          <button type="submit">Salveaza</button>
          <button type="button" onClick={() => navigate(-1)}>
            Anuleaza
          </button>
        </div>
      </form>
    </div>
  );
}

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const section = searchParams.get("sectiune") || "";
  const selectedTags = searchParams.getAll("tag");

  const allTags = [...new Set(docs.flatMap((page) => page.taguri))];

  const results = docs.filter((page) => {
    const matchText =
      page.titlu.toLowerCase().includes(q.toLowerCase()) ||
      page.continut.toLowerCase().includes(q.toLowerCase());

    const matchSection = section ? page.sectiune === section : true;

    const matchTags =
      selectedTags.length > 0
        ? selectedTags.every((tag) => page.taguri.includes(tag))
        : true;

    return matchText && matchSection && matchTags;
  });

  function updateParam(name, value) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    setSearchParams(params);
  }

  function addTag(tag) {
    const params = new URLSearchParams(searchParams);
    params.append("tag", tag);
    setSearchParams(params);
  }

  return (
    <section className="page-card">
      <h2>Cautare globala</h2>

      <div className="filters">
        <input
          value={q}
          placeholder="Text cautat..."
          onChange={(event) => updateParam("q", event.target.value)}
        />

        <select
          value={section}
          onChange={(event) => updateParam("sectiune", event.target.value)}
        >
          <option value="">Toate sectiunile</option>
          {getSections().map((item) => (
            <option key={item} value={item}>
              {sectionTitle(item)}
            </option>
          ))}
        </select>

        <button onClick={() => setSearchParams({})}>
          Reseteaza filtrele
        </button>
      </div>

      <div className="tag-list">
        {allTags.map((tag) => (
          <button key={tag} onClick={() => addTag(tag)}>
            Adauga #{tag}
          </button>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <p>
          Taguri active:{" "}
          {selectedTags.map((tag) => (
            <strong key={tag}>#{tag} </strong>
          ))}
        </p>
      )}

      <div className="results">
        {results.map((page) => (
          <Link
            key={`${page.sectiune}-${page.id}`}
            className="result-item"
            to={`/docs/${page.sectiune}/${page.id}`}
          >
            <strong>{page.titlu}</strong>
            <span>{sectionTitle(page.sectiune)}</span>
          </Link>
        ))}

        {results.length === 0 && <p>Nu exista rezultate.</p>}
      </div>
    </section>
  );
}

function HistoryPage({ history, setHistory }) {
  return (
    <section className="page-card">
      <h2>Istoric pagini vizitate</h2>

      <button onClick={() => setHistory([])}>Sterge istoric</button>

      {history.length === 0 && <p>Nu exista pagini vizitate.</p>}

      <div className="results">
        {history.map((item) => (
          <Link key={item} className="result-item" to={item}>
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
}

function LoginPage({ setIsPrivateUnlocked }) {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/docs/privat";

  function handleLogin() {
    setIsPrivateUnlocked(true);
    navigate(from, { replace: true });
  }

  return (
    <section className="page-card">
      <h2>Login</h2>
      <p>
        Sectiunea privata este blocata. Apasa butonul pentru a simula
        autentificarea.
      </p>
      <button onClick={handleLogin}>Autentificare</button>
    </section>
  );
}

function PaginaInexistenta() {
  return (
    <div className="page-card error">
      <h2>Pagina inexistenta</h2>
      <p>Sectiunea sau pagina ceruta nu exista in datele JSON.</p>
    </div>
  );
}

function DocsNotFound() {
  return (
    <div className="page-card error">
      <h2>404 in documentatie</h2>
      <p>URL-ul cerut nu exista in zona /docs.</p>
      <Link to="/docs">Inapoi la documentatie</Link>
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="page-card error">
      <h2>404</h2>
      <p>Pagina nu a fost gasita.</p>

      <div className="doc-actions">
        <button onClick={() => navigate(-1)}>Inapoi</button>
        <Link to="/">Acasa</Link>
      </div>
    </section>
  );
}