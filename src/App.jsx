import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import docsData from './data/docsData.json'
import './App.css'

const DocsContext = createContext(null)
const AuthContext = createContext(null)
const HistoryContext = createContext(null)

const storageKeys = {
  auth: 'react10-dragos-private-access',
  history: 'react10-dragos-doc-history',
}

function titleizeSlug(slug = '') {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

function splitParagraphs(text = '') {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function safeParseJson(value, fallback) {
  if (value === null || value === undefined) {
    return fallback
  }
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function useDocs() {
  const context = useContext(DocsContext)

  if (!context) {
    throw new Error('useDocs must be used inside DocsProvider')
  }

  return context
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}

function useHistoryEntries() {
  const context = useContext(HistoryContext)

  if (!context) {
    throw new Error('useHistoryEntries must be used inside HistoryProvider')
  }

  return context
}

function DocsProvider({ children }) {
  const [sections, setSections] = useState(() => docsData.sections)
  const privatePages = useMemo(() => docsData.privatePages ?? [], [])

  const getSection = useCallback(
    (sectionSlug) => sections.find((section) => section.slug === sectionSlug),
    [sections],
  )

  const getPage = useCallback(
    (sectionSlug, pageId) => getSection(sectionSlug)?.pages.find((page) => page.id === pageId),
    [getSection],
  )

  const getPrivatePage = useCallback(
    (pageId) => privatePages.find((page) => page.id === pageId),
    [privatePages],
  )

  const getFirstSectionPath = useCallback(
    () => (sections[0] ? `/docs/${sections[0].slug}` : '/docs'),
    [sections],
  )

  const updatePage = useCallback((sectionSlug, pageId, nextPage) => {
    setSections((currentSections) =>
      currentSections.map((section) => {
        if (section.slug !== sectionSlug) {
          return section
        }

        return {
          ...section,
          pages: section.pages.map((page) =>
            page.id === pageId ? { ...page, ...nextPage } : page,
          ),
        }
      }),
    )
  }, [])

  const value = useMemo(
    () => ({
      sections,
      privatePages,
      getSection,
      getPage,
      getPrivatePage,
      getFirstSectionPath,
      updatePage,
    }),
    [getFirstSectionPath, getPage, getPrivatePage, getSection, privatePages, sections, updatePage],
  )

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>
}

function AuthProvider({ children }) {
  const [isPrivateUnlocked, setIsPrivateUnlocked] = useState(() => {
    return window.localStorage.getItem(storageKeys.auth) === 'true'
  })

  useEffect(() => {
    window.localStorage.setItem(storageKeys.auth, String(isPrivateUnlocked))
  }, [isPrivateUnlocked])

  const value = useMemo(
    () => ({
      isPrivateUnlocked,
      unlockPrivate: () => setIsPrivateUnlocked(true),
    }),
    [isPrivateUnlocked],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function HistoryProvider({ children }) {
  const [historyEntries, setHistoryEntries] = useState(() => {
    return safeParseJson(window.localStorage.getItem(storageKeys.history), [])
  })

  useEffect(() => {
    window.localStorage.setItem(storageKeys.history, JSON.stringify(historyEntries))
  }, [historyEntries])

  const addHistoryEntry = (entry) => {
    setHistoryEntries((currentEntries) => {
      if (!currentEntries || !Array.isArray(currentEntries)) {
        currentEntries = []
      }

      const nextEntry = {
        ...entry,
        timestamp: Date.now(),
      }

      const filteredEntries = currentEntries.filter((item) => item.path !== nextEntry.path)

      return [nextEntry, ...filteredEntries].slice(0, 10)
    })
  }

  const clearHistory = () => setHistoryEntries([])

  const value = useMemo(
    () => ({
      historyEntries,
      addHistoryEntry,
      clearHistory,
    }),
    [historyEntries],
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}

function App() {
  const location = useLocation()

  return (
    <DocsProvider>
      <AuthProvider>
        <HistoryProvider>
          {location.pathname !== '/login' ? (
            <GlobalHeader />
          ) : null}

          <Routes>
            <Route element={<MarketingLayout />}>
              <Route index element={<HomePage />} />
              <Route path="despre" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            <Route path="istoric" element={<HistoryPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route path="docs" element={<DocsLayout />}>
              <Route index element={<DocsIndexRedirect />} />
              <Route path=":sectiune" element={<SectionPage />} />
              <Route path=":sectiune/:paginaId/editare" element={<EditPageRoute />} />
              <Route path=":sectiune/:paginaId" element={<DocPageLayout />}>
                <Route path="comentarii" element={<CommentsPanel />} />
              </Route>
              <Route path="privat" element={<PrivateDocsGate />}>
                <Route index element={<PrivateLanding />} />
                <Route path=":paginaId" element={<PrivatePage />} />
              </Route>
              <Route path="*" element={<DocsNotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </HistoryProvider>
      </AuthProvider>
    </DocsProvider>
  )
}

function GlobalHeader() {
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Link to="/" className="brand-link">
          <span className="brand-link__eyebrow">Hypixel SkyBlock</span>
          <span className="brand-link__title">Garden Archive</span>
        </Link>
        <p className="site-header__location">{location.pathname}</p>
      </div>

      <nav className="site-header__nav" aria-label="Primary navigation">
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/docs" end className={navLinkClass}>
          Docs
        </NavLink>
        <NavLink to="/despre" end className={navLinkClass}>
          Despre
        </NavLink>
        <NavLink to="/contact" end className={navLinkClass}>
          Contact
        </NavLink>
        <NavLink to="/istoric" end className={navLinkClass}>
          History
        </NavLink>
      </nav>
    </header>
  )
}

function MarketingLayout() {
  return (
    <main className="page-shell marketing-shell">
      <Outlet />
    </main>
  )
}

function HomePage() {
  const { sections } = useDocs()

  return (
    <section className="hero-section">
      <div className="hero-section__copy">
        <h1>Hypixel SkyBlock Farming, from level 1 to 70.</h1>
        <p className="hero-section__lead">Choose a section and start reading.</p>

        <div className="hero-actions">
          <Link className="button button--primary" to="/docs">
            Open the docs
          </Link>
        </div>
      </div>

      <div className="section-intro">
        {sections.map((section) => (
          <article className="section-preview card" key={section.slug}>
            <p className="section-preview__eyebrow">/{section.slug}</p>
            <h2>{section.title}</h2>
            <p>{section.summary}</p>
            <Link to={`/docs/${section.slug}`}>Open section</Link>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="content-panel">
      <p className="eyebrow">About</p>
      <h1>How to use this guide</h1>
      <p>
        Use the sidebar in Docs to jump between sections and pages.
      </p>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="content-panel">
      <p>+3736742069</p>
    </section>
  )
}

function DocsLayout() {
  const { sections, privatePages } = useDocs()
  const { isPrivateUnlocked } = useAuth()

  return (
    <section className="page-shell docs-shell">
      <aside className="docs-sidebar card">
        <div className="docs-sidebar__header">
          <p className="eyebrow">Docs navigator</p>
          <h2>SkyBlock farming guide</h2>
          <p>Dynamic sidebar generated from the JSON data.</p>
        </div>

        <div className="docs-sidebar__groups">
          {sections.map((section) => (
            <div className="docs-sidebar__group" key={section.slug}>
              <NavLink to={`/docs/${section.slug}`} end className={navLinkClass}>
                {({ isActive }) => (
                  <span className="sidebar-link__label">
                    <span>{section.title}</span>
                    {isActive ? <span className="sidebar-link__marker">✓</span> : null}
                  </span>
                )}
              </NavLink>

              <div className="docs-sidebar__pages">
                {section.pages.map((page) => (
                  <NavLink
                    key={page.id}
                    to={`/docs/${section.slug}/${page.id}`}
                    className={navLinkClass}
                  >
                    {({ isActive }) => (
                      <span className="sidebar-link__label sidebar-link__label--page">
                        <span>{page.title}</span>
                        {isActive ? <span className="sidebar-link__marker">✓</span> : null}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="docs-sidebar__footer">
          <p>
            {isPrivateUnlocked
              ? 'Private area unlocked. The protected route is now available.'
              : 'Private routes stay locked until you visit /login.'}
          </p>
          <p>{privatePages.length} private page example(s) included.</p>
        </div>
      </aside>

      <div className="docs-content">
        <DocsHistoryTracker />
        <DocsBreadcrumb />
        <Outlet />
      </div>
    </section>
  )
}

function DocsHistoryTracker() {
  const location = useLocation()
  const { getSection, getPage, getPrivatePage } = useDocs()
  const { addHistoryEntry } = useHistoryEntries()

  useEffect(() => {
    if (!location.pathname.startsWith('/docs/')) {
      return
    }

    let normalizedPath = location.pathname

    if (normalizedPath.endsWith('/editare')) {
      normalizedPath = normalizedPath.replace('/editare', '')
    }

    if (normalizedPath.endsWith('/comentarii')) {
      normalizedPath = normalizedPath.replace('/comentarii', '')
    }

    const parts = normalizedPath.split('/').filter(Boolean)

    if (parts.length < 2) {
      return
    }

    if (parts[1] === 'privat') {
      const privatePage = getPrivatePage(parts[2])
      if (privatePage) {
        addHistoryEntry({
          path: normalizedPath,
          title: privatePage.title,
          kind: 'private',
        })
      }
      return
    }

    if (parts.length === 2) {
      const section = getSection(parts[1])
      if (section) {
        addHistoryEntry({
          path: normalizedPath,
          title: section.title,
          kind: 'section',
        })
      }
      return
    }

    const page = getPage(parts[1], parts[2])
    if (page) {
      addHistoryEntry({
        path: normalizedPath,
        title: page.title,
        kind: 'page',
      })
    }
  }, [addHistoryEntry, getPage, getPrivatePage, getSection, location.pathname])

  return null
}

function DocsBreadcrumb() {
  const location = useLocation()
  const { sections, getPage } = useDocs()

  if (!location.pathname.startsWith('/docs')) {
    return null
  }

  const segments = location.pathname.split('/').filter(Boolean)
  const trail = [{ label: 'Docs', to: '/docs' }]

  let currentSection = null
  let currentPage = null
  let currentPath = '/docs'

  segments.slice(1).forEach((segment) => {
    currentPath += `/${segment}`

    let label = titleizeSlug(segment)

    if (segment === 'editare') {
      label = 'Edit'
    } else if (segment === 'comentarii') {
      label = 'Comments'
    } else if (segment === 'privat') {
      label = 'Private'
    }

    const foundSection = sections.find((section) => section.slug === segment)
    if (foundSection) {
      currentSection = foundSection
      currentPage = null
      label = foundSection.title
    } else if (currentSection) {
      const foundPage = getPage(currentSection.slug, segment)
      if (foundPage) {
        currentPage = foundPage
        label = foundPage.title
      } else if (segment === currentPage?.id) {
        label = currentPage.title
      }
    }

    trail.push({ label, to: currentPath })
  })

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {trail.map((item, index) => (
        <span className="breadcrumb__item" key={`${item.to}-${index}`}>
          <Link to={item.to}>{item.label}</Link>
          {index < trail.length - 1 ? <span className="breadcrumb__separator">/</span> : null}
        </span>
      ))}
    </nav>
  )
}

function DocsIndexRedirect() {
  const { getFirstSectionPath } = useDocs()

  return <Navigate to={getFirstSectionPath()} replace />
}

function SectionPage() {
  const { sectiune } = useParams()
  const { getSection } = useDocs()
  const section = getSection(sectiune)

  if (!section) {
    return (
      <PaginaInexistenta
        title="Section not found"
        message="The section in the URL does not exist in the JSON data."
        actionLabel="Back to docs"
        actionTo="/docs"
      />
    )
  }

  return (
    <article className="card docs-section">
      <p className="eyebrow">Section</p>
      <h1>{section.title}</h1>
      <p>{section.summary}</p>

      <div className="card-grid">
        {section.pages.map((page) => (
          <article className="mini-card mini-card--wide" key={page.id}>
            <span className="mini-card__label">{page.tags.join(' · ')}</span>
            <strong>{page.title}</strong>
            <p>{page.summary}</p>
            <Link to={`/docs/${section.slug}/${page.id}`}>Open page</Link>
          </article>
        ))}
      </div>
    </article>
  )
}

function DocPageLayout() {
  const { sectiune, paginaId } = useParams()
  const { getSection, getPage } = useDocs()
  const section = getSection(sectiune)
  const page = getPage(sectiune, paginaId)

  if (!section || !page) {
    return (
      <PaginaInexistenta
        title="Page not found"
        message="Either the section or the page id is missing from the data set."
        actionLabel="Back to section"
        actionTo={section ? `/docs/${section.slug}` : '/docs'}
      />
    )
  }

  const pageIndex = section.pages.findIndex((item) => item.id === page.id)
  const previousPage = section.pages[pageIndex - 1]
  const nextPage = section.pages[pageIndex + 1]

  return (
    <div className="doc-frame">
      <article className="card doc-page">
        <p className="eyebrow">/{section.slug}</p>
        <h1>{page.title}</h1>
        <p className="doc-page__summary">{page.summary}</p>

        <div className="tag-row">
          {page.tags.map((tag) => (
            <span className="tag-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="doc-page__body">
          {page.content.map((paragraph, index) => (
            <p key={`${page.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>

        <div className="doc-page__highlights">
          <h2>Key points</h2>
          <ul>
            {page.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="hero-actions">
          <Link className="button button--secondary" to="editare">
            Edit this page
          </Link>
        </div>

        <div className="pager-row">
          {previousPage ? (
            <Link className="pager-link" to={`/docs/${section.slug}/${previousPage.id}`}>
              Previous page
            </Link>
          ) : (
            <span className="pager-link pager-link--disabled">Previous page</span>
          )}

          {nextPage ? (
            <Link className="pager-link" to={`/docs/${section.slug}/${nextPage.id}`}>
              Next page
            </Link>
          ) : (
            <span className="pager-link pager-link--disabled">Next page</span>
          )}
        </div>
      </article>
    </div>
  )
}

function CommentsPanel() {
  const { section, page } = useOutletContext()

  const comments = [
    {
      author: 'Garden Coach',
      body: `This route is strong because ${page.title.toLowerCase()} stays focused on one part of the progression.`,
    },
    {
      author: 'Contest Runner',
      body: `Keep the ${section.title.toLowerCase()} notes short and actionable so the sidebar remains useful.`,
    },
    {
      author: 'Farming Review',
      body: 'The nested outlet is doing the important job here: the main page stays visible while the side notes change.',
    },
  ]

  return (
    <div className="panel-stack">
      <div>
        <p className="eyebrow">Comments</p>
        <h2>{page.title}</h2>
      </div>

      {comments.map((comment) => (
        <article className="comment-card" key={comment.author}>
          <strong>{comment.author}</strong>
          <p>{comment.body}</p>
        </article>
      ))}
    </div>
  )
}

function EditPage() {
  const { sectiune, paginaId } = useParams()
  const navigate = useNavigate()
  const { getSection, getPage, updatePage } = useDocs()
  const section = getSection(sectiune)
  const page = getPage(sectiune, paginaId)
  const pagePath = `/docs/${sectiune}/${paginaId}`

  const [formState, setFormState] = useState(() => ({
    title: page?.title ?? '',
    summary: page?.summary ?? '',
    tags: page?.tags?.join(', ') ?? '',
    content: page?.content?.join('\n\n') ?? '',
    highlights: page?.highlights?.join('\n') ?? '',
  }))

  if (!section || !page) {
    return (
      <PaginaInexistenta
        title="Page not found"
        message="The edit form can only open for existing pages."
        actionLabel="Back to docs"
        actionTo="/docs"
      />
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updatePage(section.slug, page.id, {
      title: formState.title.trim() || page.title,
      summary: formState.summary.trim() || page.summary,
      tags: formState.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      content: splitParagraphs(formState.content),
      highlights: formState.highlights
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    })

    navigate(pagePath, { replace: true })
  }

  const handleCancel = () => navigate(-1)

  return (
    <article className="card form-card">
      <p className="eyebrow">Edit page</p>
      <h1>{page.title}</h1>
      <p>Edit and save. After save, you return to the page view.</p>

      <form className="edit-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={formState.title} onChange={handleChange} />
        </label>

        <label>
          Summary
          <textarea name="summary" value={formState.summary} onChange={handleChange} rows="3" />
        </label>

        <label>
          Tags
          <input
            name="tags"
            value={formState.tags}
            onChange={handleChange}
            placeholder="farming, garden, contests"
          />
        </label>

        <label>
          Content paragraphs
          <textarea
            name="content"
            value={formState.content}
            onChange={handleChange}
            rows="8"
          />
        </label>

        <label>
          Highlights, one per line
          <textarea
            name="highlights"
            value={formState.highlights}
            onChange={handleChange}
            rows="5"
          />
        </label>

        <div className="hero-actions">
          <button className="button button--primary" type="submit">
            Save
          </button>
          <button className="button button--secondary" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </article>
  )
}

function EditPageRoute() {
  const { sectiune, paginaId } = useParams()
  const pagePath = `/docs/${sectiune}/${paginaId}`

  return <EditPage key={pagePath} />
}

function PrivateDocsGate() {
  const location = useLocation()
  const { isPrivateUnlocked } = useAuth()

  if (!isPrivateUnlocked) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

function PrivateLanding() {
  const { privatePages } = useDocs()

  return (
    <article className="card docs-section">
      <p className="eyebrow">Private area</p>
      <h1>Protected farming notes</h1>
      <p>
        This route simulates a simple private section. Once you unlock it from the
        login page, the sidebar stays visible and you can open the protected notes like
        any other docs page.
      </p>

      <div className="card-grid">
        {privatePages.map((page) => (
          <article className="mini-card mini-card--wide" key={page.id}>
            <span className="mini-card__label">private</span>
            <strong>{page.title}</strong>
            <p>{page.summary}</p>
            <Link to={`/docs/privat/${page.id}`}>Open private page</Link>
          </article>
        ))}
      </div>
    </article>
  )
}

function PrivatePage() {
  const { paginaId } = useParams()
  const { getPrivatePage } = useDocs()
  const page = getPrivatePage(paginaId)

  if (!page) {
    return (
      <PaginaInexistenta
        title="Private page not found"
        message="The mock protected area only exposes the pages present in the JSON file."
        actionLabel="Back to docs"
        actionTo="/docs"
      />
    )
  }

  return (
    <article className="card docs-section">
      <p className="eyebrow">Private</p>
      <h1>{page.title}</h1>
      <p>{page.summary}</p>

      <div className="doc-page__body">
        {page.content.map((paragraph, index) => (
          <p key={`${page.id}-private-${index}`}>{paragraph}</p>
        ))}
      </div>

      <div className="doc-page__highlights">
        <h2>Notes</h2>
        <ul>
          {page.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function HistoryPage() {
  const { historyEntries, clearHistory } = useHistoryEntries()

  return (
    <main className="page-shell history-shell">
      <section className="card history-panel">
        <p className="eyebrow">History</p>
        <h1>Last visited docs pages</h1>
        <p>Latest 10 entries from /docs/*.</p>

        <div className="hero-actions">
          <button className="button button--secondary" type="button" onClick={clearHistory}>
            Clear history
          </button>
        </div>

        <div className="history-list">
          {historyEntries.length ? (
            historyEntries.map((entry) => (
              <article className="history-item" key={entry.path}>
                <div>
                  <p className="mini-card__label">{entry.kind}</p>
                  <Link to={entry.path}>{entry.title}</Link>
                  <p className="history-item__meta">{entry.path}</p>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-copy">Visit a few docs pages and they will appear here.</p>
          )}
        </div>
      </section>
    </main>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { unlockPrivate } = useAuth()

  const fromPath = location.state?.from?.pathname ?? '/docs'

  const handleLogin = () => {
    unlockPrivate()
    navigate(fromPath, { replace: true })
  }

  return (
    <main className="page-shell auth-shell">
      <section className="card auth-panel">
        <p className="eyebrow">Login</p>
        <h1>Unlock the private docs route</h1>
        <p>Press the button and you return to the page you asked for.</p>

        <div className="hero-actions">
          <button className="button button--primary" type="button" onClick={handleLogin}>
            Unlock private access
          </button>
          <Link className="button button--secondary" to="/docs">
            Back to docs
          </Link>
        </div>
      </section>
    </main>
  )
}

function DocsNotFound() {
  const navigate = useNavigate()

  return (
    <article className="card docs-section not-found-inline">
      <p className="eyebrow">Docs 404</p>
      <h1>This docs URL does not exist</h1>
      <p>
        The sidebar stays visible, but the current docs path does not match a known
        section, page, or nested route.
      </p>
      <div className="hero-actions">
        <button className="button button--secondary" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <Link className="button button--primary" to="/docs">
          Docs home
        </Link>
      </div>
    </article>
  )
}

function PaginaInexistenta({ title, message, actionLabel, actionTo }) {
  const navigate = useNavigate()

  return (
    <article className="card not-found-inline">
      <p className="eyebrow">Missing content</p>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="hero-actions">
        <button className="button button--secondary" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <Link className="button button--primary" to={actionTo}>
          {actionLabel}
        </Link>
      </div>
    </article>
  )
}

function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="page-shell not-found-shell">
      <section className="card not-found-inline">
        <p className="eyebrow">404</p>
        <h1>That page does not exist</h1>
        <p>
          The catch-all route is handling an unknown URL. Use the button below to go
          back one step, or return home.
        </p>
        <div className="hero-actions">
          <button className="button button--secondary" type="button" onClick={() => navigate(-1)}>
            Back
          </button>
          <Link className="button button--primary" to="/">
            Home
          </Link>
        </div>
      </section>
    </main>
  )
}

function navLinkClass({ isActive }) {
  return isActive ? 'nav-link nav-link--active' : 'nav-link'
}

export default App
