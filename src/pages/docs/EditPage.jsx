import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import docs from "../../data/docs.json";

export const EditPage = () => {
  const { section, pageId } = useParams()
  const navigate = useNavigate()

  const page = docs.find((d) => d.section === section && d.id === pageId)

  const [title, setTitle] = useState(page?.title || "")
  const [content, setContent] = useState(page?.content || "")

  if (!page) {
    return (
      <div>
        <p>Page not found.</p>
      </div>
    );
  }

  function handleSave() {
    navigate(`/docs/${section}/${pageId}`, { replace: true })
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <h5 className="fw-bold mb-4">Editing: {page.title}</h5>
      <div className="mb-3">
        <label className="form-label text-muted" style={{ fontSize: "0.82rem" }}>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted" style={{ fontSize: "0.82rem" }}>Content</label>
        <textarea
          className="form-control"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2">
        <button onClick={handleSave} className="btn btn-primary btn-sm px-4">Save</button>
        <button onClick={handleCancel} className="btn btn-outline-secondary btn-sm px-4">Cancel</button>
      </div>
    </div>
  )
}
