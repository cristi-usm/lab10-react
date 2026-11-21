import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import './styles.css';
import docs from './data/docs.json';

const AuthContext = createContext(null);
const HistoryContext = createContext(null);

const sectionNames = { fundamente: 'Fundamente', api: 'API', ghiduri: 'Ghiduri', privat: 'Privat' };
const allPages = docs.flatMap((section) => section.pages.map((page) => ({ ...page, section: section.slug })));

function AppProviders() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('lumen-history') || '[]'));
  useEffect(() => localStorage.setItem('lumen-history', JSON.stringify(history)), [history]);
  const addHistory = useCallback((entry) => setHistory((current) => [entry, ...current.filter((item) => item.path !== entry.path)].slice(0, 10)), []);
  return <AuthContext.Provider value={{ isPrivate, setIsPrivate }}><HistoryContext.Provider value={{ history, addHistory, clearHistory: () => setHistory([]) }}><Outlet /></HistoryContext.Provider></AuthContext.Provider>;
}

function Header() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [quickSearch, setQuickSearch] = useState('');
  useEffect(() => {
    const onKeyDown = (event) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); navigate('/cauta'); setTimeout(() => inputRef.current?.focus(), 0); } };
    window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);
  const submit = (event) => { event.preventDefault(); navigate(`/cauta?q=${encodeURIComponent(quickSearch)}`); };
  return <header className="site-header"><Link className="brand" to="/"><span className="brand-mark">✦</span><span>Lumen<span className="accent">JS</span></span></Link><nav><NavLink end to="/">Acasă</NavLink><NavLink to="/docs">Documentație</NavLink><NavLink to="/istoric">Istoric</NavLink><NavLink to="/despre">Despre</NavLink></nav><form className="quick-search" onSubmit={submit}><input ref={inputRef} value={quickSearch} onChange={(event) => setQuickSearch(event.target.value)} placeholder="Caută..." aria-label="Căutare rapidă" /><kbd>Ctrl K</kbd></form></header>;
}

function Footer() { return <footer><span>© 2025 LumenJS</span><span>Construit pentru laboratorul React Router</span><a href="https://reactrouter.com/" target="_blank" rel="noreferrer">React Router ↗</a></footer>; }
function Layout() { return <><Header /><main className="page-shell"><Outlet /></main><Footer /></>; }
function Home() { return <section className="hero"><div className="eyebrow">DOCUMENTAȚIE · v1.0</div><h1>Construiește clar.<br /><em>Strălucește</em> în cod.</h1><p className="hero-copy">LumenJS este o librărie JavaScript fictivă pentru interfețe rapide, accesibile și ușor de compus.</p><div className="hero-actions"><Link className="button primary" to="/docs">Explorează documentația <span>→</span></Link><Link className="button secondary" to="/despre">Află mai multe</Link></div><div className="hero-code"><span className="code-dot red" /><span className="code-dot yellow" /><span className="code-dot green" /><code><span className="muted">import</span> {'{'} createApp {'}'} <span className="muted">from</span> <span className="string">'lumenjs'</span>;<br /><br /><span className="keyword">const</span> app = createApp({'{'} theme: <span className="string">'aurora'</span> {'}'});<br />app.mount(<span className="string">'#root'</span>);</code></div></section>; }
function About() { return <article className="simple-page"><div className="eyebrow">DESPRE LUMENJS</div><h1>O lumină mică pentru proiecte mari.</h1><p>LumenJS este o librărie imaginară creată pentru acest laborator. API-ul ei pune accent pe compoziție, performanță și o experiență plăcută pentru dezvoltatori.</p><div className="feature-grid"><div><strong>01</strong><h3>Componente clare</h3><p>Construiește UI din piese mici și reutilizabile.</p></div><div><strong>02</strong><h3>Rapid implicit</h3><p>Un nucleu minimal, fără configurație inutilă.</p></div><div><strong>03</strong><h3>Accesibilitate</h3><p>Interacțiuni care funcționează pentru toată lumea.</p></div></div></article>; }
function Contact() { return <article className="simple-page narrow"><div className="eyebrow">CONTACT</div><h1>Hai să vorbim.</h1><p>Ai o întrebare despre LumenJS? Scrie-ne și echipa noastră îți va răspunde cu drag.</p><a className="button primary" href="mailto:hello@lumenjs.dev">hello@lumenjs.dev ↗</a></article>; }

function Breadcrumbs() { const { pathname } = useLocation(); const segments = pathname.split('/').filter(Boolean); return <div className="breadcrumbs"><Link to="/">Acasă</Link>{segments.map((segment, index) => { const path = `/${segments.slice(0, index + 1).join('/')}`; const label = sectionNames[segment] || (index === 1 ? allPages.find((page) => page.id === segment)?.title : null) || segment.replace(/-/g, ' '); return <React.Fragment key={path}><span>/</span><Link to={path}>{label}</Link></React.Fragment>; })}</div>; }
function DocsSidebar() { return <aside className="sidebar"><div className="sidebar-title">Pe scurt</div><NavLink className="overview-link" end to="/docs">✦ <span>Prezentare generală</span></NavLink>{docs.map((section) => <div className="section-group" key={section.slug}><NavLink end className={({ isActive }) => `section-link ${isActive ? 'active' : ''}`} to={`/docs/${section.slug}`}>{({ isActive }) => <><span>{isActive ? '✓' : '○'}</span>{section.title}</>}</NavLink><div className="page-links">{section.pages.map((page) => <NavLink key={page.id} to={`/docs/${section.slug}/${page.id}`} className={({ isActive }) => `page-link ${isActive ? 'active' : ''}`}>{({ isActive }) => <><span>{isActive ? '●' : '·'}</span>{page.title}</>}</NavLink>)}</div></div>)}</aside>; }
function DocsLayout() { return <><Header /><div className="docs-frame"><DocsSidebar /><div className="docs-content"><Breadcrumbs /><Outlet /></div></div><Footer /></>; }
function DocsWelcome() { return <article className="docs-welcome"><div className="eyebrow">BUN VENIT</div><h1>Documentația<br /><em>LumenJS</em></h1><p>Alege o secțiune din meniul lateral pentru a începe. De la primele componente până la API-uri avansate, aici găsești tot ce ai nevoie.</p><div className="section-cards">{docs.filter((section) => section.slug !== 'privat').map((section) => <Link to={`/docs/${section.slug}`} className="section-card" key={section.slug}><span className="card-icon">{section.icon}</span><strong>{section.title}</strong><small>{section.pages.length} pagini · {section.description}</small><span className="arrow">→</span></Link>)}</div></article>; }
function SectionPage() { const { sectiune } = useParams(); const section = docs.find((item) => item.slug === sectiune); if (!section) return <DocsNotFound />; return <article><div className="eyebrow">SECȚIUNE</div><h1>{section.title}</h1><p className="lead">{section.description}</p><div className="article-list">{section.pages.map((page, index) => <Link className="article-row" to={`/docs/${section.slug}/${page.id}`} key={page.id}><span className="row-number">0{index + 1}</span><span><strong>{page.title}</strong><small>{page.tags.join(' · ')}</small></span><span>→</span></Link>)}</div></article>; }
function PrivateGate({ children }) { const auth = useContext(AuthContext); const location = useLocation(); if (!auth.isPrivate) return <Navigate to="/login" replace state={{ from: location }} />; return children; }
function PageView() { const { sectiune, paginaId } = useParams(); const section = docs.find((item) => item.slug === sectiune); const page = section?.pages.find((item) => item.id === paginaId); const { addHistory } = useContext(HistoryContext); useEffect(() => { if (section && page) addHistory({ path: `/docs/${sectiune}/${paginaId}`, title: page.title, section: section.title }); }, [sectiune, paginaId, page, section, addHistory]); if (!section || !page) return <DocsNotFound />; const index = section.pages.findIndex((item) => item.id === paginaId); const previous = section.pages[index - 1]; const next = section.pages[index + 1]; return <article className="doc-page"><div className="eyebrow">{section.title.toUpperCase()}</div><h1>{page.title}</h1><div className="tags">{page.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="content-body">{page.content.split('\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="doc-actions"><Link className="button secondary" to={`/docs/${sectiune}/${paginaId}/editare`}>✎ Editează pagina</Link></div><Outlet /><div className="prev-next">{previous ? <Link to={`/docs/${sectiune}/${previous.id}`}><small>← Anterior</small><strong>{previous.title}</strong></Link> : <span />} {next ? <Link className="next" to={`/docs/${sectiune}/${next.id}`}><small>Următor →</small><strong>{next.title}</strong></Link> : <span />}</div></article>; }
function Comments() { return <aside className="comments"><strong>Comentarii</strong><p>Ți-a fost utilă această pagină?</p><button onClick={() => alert('Mulțumim pentru feedback!')}>♡ Lasă feedback</button></aside>; }
function EditPage() { const { sectiune, paginaId } = useParams(); const navigate = useNavigate(); const page = allPages.find((item) => item.section === sectiune && item.id === paginaId); const [title, setTitle] = useState(page?.title || ''); if (!page) return <DocsNotFound />; const save = (event) => { event.preventDefault(); navigate(`/docs/${sectiune}/${paginaId}`, { replace: true }); }; return <article className="edit-page"><div className="eyebrow">EDITARE</div><h1>Editează pagina</h1><form onSubmit={save}><label>Titlu<input value={title} onChange={(event) => setTitle(event.target.value)} /></label><label>Conținut<textarea defaultValue={page.content} rows="8" /></label><div><button className="button primary" type="submit">Salvează</button><button className="button secondary" type="button" onClick={() => navigate(-1)}>Anulează</button></div></form></article>; }
function DocsNotFound() { return <div className="not-found contextual"><div className="eyebrow">DOCS 404</div><h1>Pagina nu există în documentație.</h1><p>Verifică secțiunea și identificatorul paginii din URL.</p><Link className="button primary" to="/docs">Înapoi la documentație</Link></div>; }

function SearchPage() { const [params, setParams] = useSearchParams(); const q = params.get('q') || ''; const section = params.get('sectiune') || ''; const tags = params.getAll('tag'); const results = allPages.filter((page) => (!q || `${page.title} ${page.content} ${page.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())) && (!section || page.section === section) && (!tags.length || tags.every((tag) => page.tags.includes(tag)))); const update = (key, value) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next); }; const addTag = () => { const next = new URLSearchParams(params); next.append('tag', tags.includes('hooks') ? 'routing' : 'hooks'); setParams(next); }; return <article className="search-page"><div className="eyebrow">CĂUTARE</div><h1>Găsește răspunsul.</h1><div className="search-controls"><input autoFocus value={q} onChange={(event) => update('q', event.target.value)} placeholder="Caută în documentație..." /><select value={section} onChange={(event) => update('sectiune', event.target.value)}><option value="">Toate secțiunile</option>{docs.filter((item) => item.slug !== 'privat').map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select><button className="button secondary" onClick={addTag}>Adaugă tag</button><button className="text-button" onClick={() => setParams({})}>Resetează filtrele</button></div>{tags.length > 0 && <div className="tags">{tags.map((tag) => <button onClick={() => setParams(new URLSearchParams([...params].filter(([key, value]) => !(key === 'tag' && value === tag))))} key={tag}>{tag} ×</button>)}</div>}<p className="result-count">{results.length} rezultate pentru <strong>{q || 'toate paginile'}</strong></p><div className="article-list">{results.map((page) => <Link className="article-row" to={`/docs/${page.section}/${page.id}`} key={`${page.section}-${page.id}`}><span className="row-number">↗</span><span><strong>{page.title}</strong><small>{sectionNames[page.section]} · {page.tags.join(' · ')}</small></span><span>→</span></Link>)}</div></article>; }
function HistoryPage() { const { history, clearHistory } = useContext(HistoryContext); return <article className="simple-page history-page"><div className="eyebrow">ACTIVITATE</div><div className="title-line"><h1>Istoricul tău</h1><button className="text-button" onClick={clearHistory}>Șterge istoricul</button></div>{history.length ? <div className="article-list">{history.map((item) => <Link className="article-row" to={item.path} key={item.path}><span className="row-number">↗</span><span><strong>{item.title}</strong><small>{item.section}</small></span><span>→</span></Link>)}</div> : <p>Nu ai vizitat încă nicio pagină din documentație.</p>}</article>; }
function Login() { const auth = useContext(AuthContext); const navigate = useNavigate(); const location = useLocation(); const from = location.state?.from?.pathname || '/docs/privat'; return <article className="login-card"><div className="eyebrow">ZONĂ PRIVATĂ</div><h1>Autentificare simulată</h1><p>Această secțiune este protejată pentru demonstrarea rutelor private.</p><button className="button primary" onClick={() => { auth.setIsPrivate(true); navigate(from, { replace: true }); }}>Intră în zona privată →</button></article>; }
function NotFound() { const navigate = useNavigate(); return <div className="not-found"><div className="error-code">404</div><h1>Se pare că ai ajuns într-un loc gol.</h1><p>Pagina pe care o cauți nu există sau a fost mutată.</p><div><button className="button secondary" onClick={() => navigate(-1)}>← Înapoi</button><Link className="button primary" to="/">Acasă</Link></div></div>; }

function AppRoutes() { return <AppProviders />; }
function Root() { return <BrowserRouter><AppRoutes /></BrowserRouter>; }

// Rutele sunt declarate cu createRoutesFromElements în fișierul de mai jos pentru lizibilitate.
import { useRoutes } from 'react-router';
function RouterTree() {
  return useRoutes([
    {
      element: <AppProviders />,
      children: [
        { element: <Layout />, children: [{ index: true, element: <Home /> }, { path: 'despre', element: <About /> }, { path: 'contact', element: <Contact /> }] },
        {
          path: 'docs', element: <DocsLayout />, children: [
            { index: true, element: <DocsWelcome /> },
            { path: 'privat', element: <PrivateGate><SectionPage /></PrivateGate> },
            { path: 'privat/:paginaId', element: <PrivateGate><PageView /></PrivateGate> },
            { path: ':sectiune', element: <SectionPage /> },
            { path: ':sectiune/:paginaId', element: <PageView />, children: [{ path: 'comentarii', element: <Comments /> }] },
            { path: ':sectiune/:paginaId/editare', element: <EditPage /> },
            { path: '*', element: <DocsNotFound /> },
          ],
        },
        { path: 'cauta', element: <SearchPage /> },
        { path: 'istoric', element: <HistoryPage /> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);
}
function FinalApp() { return <BrowserRouter><RouterTree /></BrowserRouter>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><FinalApp /></React.StrictMode>);
