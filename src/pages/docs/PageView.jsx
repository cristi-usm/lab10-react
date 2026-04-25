import { useParams, Link, Outlet } from "react-router";
import { useEffect } from "react";
import docs from "../../data/docs.json";
import { useHistory } from "../../hooks/useHistory";
import Markdown from "react-markdown";
import { FaPencilAlt } from "react-icons/fa";
import { DocsNotFound } from "./DocsNotFound";

export const PageView = () => {
  const { section, pageId } = useParams()
  const { addVisit } = useHistory()

  const sectionPages = docs.filter((d) => d.section === section)
  const pageIndex = sectionPages.findIndex((d) => d.id === pageId)
  const page = sectionPages[pageIndex]

  const prevPage = pageIndex > 0 ? sectionPages[pageIndex - 1] : null
  const nextPage = pageIndex < sectionPages.length - 1 ? sectionPages[pageIndex + 1] : null

  useEffect(() => {
    if (page) {
      addVisit({ id: page.id, title: page.title, section: page.section, path: `/docs/${page.section}/${page.id}` })
    }
  }, [pageId])

  if(!page){
    return <DocsNotFound />
  }

  return (
    <div className="d-flex gap-4">
        <div style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="fw-bold mb-0">{page.title}</h4>
            <Link to={`/docs/${page.section}/${page.id}/edit`} className="btn btn-sm btn-outline-secondary"><FaPencilAlt className="me-2" /> Edit</Link>
        </div>
        <div className="mb-3">
            {page.tags.map((tag) => (
            <span key={tag} className="badge bg-secondary me-1">#{tag}</span>
            ))}
        </div>
        <article className="prose-custom">
          <Markdown>{page.content}</Markdown>
        </article>
        <hr />
        <div className="d-flex justify-content-between">
            {prevPage
            ? <Link to={`/docs/${prevPage.section}/${prevPage.id}`} className="text-muted text-decoration-none">← {prevPage.title}</Link>
            : <span />}
            {nextPage
            ? <Link to={`/docs/${nextPage.section}/${nextPage.id}`} className="text-muted text-decoration-none">{nextPage.title} →</Link>
            : <span />}
        </div>
        </div>
        <div style={{ width: "200px" }}>
        <Outlet />
        </div>
    </div>
    )
}
