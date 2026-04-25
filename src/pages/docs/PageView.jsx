import { useParams, Link, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import docs from "../../data/docs.json";
import { useHistory } from "../../hooks/useHistory";

export const PageView = () => {
  const { section, pageId } = useParams()
  const { addVisit } = useHistory()
  const navigate = useNavigate()

  const sectionPages = docs.filter((d) => d.section === section)
  const pageIndex = sectionPages.findIndex((d) => d.id === pageId)
  const page = sectionPages[pageIndex]

  const prevPage = pageIndex > 0 ? sectionPages[pageIndex - 1] : null
  const nextPage = pageIndex < sectionPages.length - 1 ? sectionPages[pageIndex + 1] : null

  useEffect(() => {
    if (page) {
      addVisit({ id: page.id, title: page.title, section: page.section, path: `/docs/${page.section}/${page.id}` })
    }
  }, [page?.id])

  if (!page) {
    return (
        <div>
        <h3>Page not found</h3>
        <p>
            The page "{pageId}" does not exist in section "{section}".
        </p>
        <div>
            <button onClick={() => navigate(-1)}>
            ← Go Back
            </button>
            <Link to="/docs">
            Back to Docs
            </Link>
        </div>
        </div>
    )
    }

  return (
    <div>
        <article>
        <div>
            <h2>{page.title}</h2>
            <Link to={`/docs/${page.section}/${page.id}/edit`}>
             Edit
            </Link>
        </div>

        <div>
            {page.tags.map((tag) => (
            <Link key={tag} to={`/search?tag=${tag}`}>
                #{tag}
            </Link>
            ))}
        </div>

        <p>{page.content}</p>

        <hr />

        <div>
            {prevPage ? (
            <Link to={`/docs/${prevPage.section}/${prevPage.id}`}>
                ← {prevPage.title}
            </Link>
            ) : <span />}
            {nextPage ? (
            <Link to={`/docs/${nextPage.section}/${nextPage.id}`}>
                {nextPage.title} →
            </Link>
            ) : <span />}
        </div>
        </article>

        <aside>
        <Outlet />
        </aside>
    </div>
    )
}
