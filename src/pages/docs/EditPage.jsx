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
    <div>
        <h4>Editing: {page.title}</h4>

        <div>
        <label>Title</label>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        </div>

        <div>
        <label>Content</label>
        <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        </div>

        <div>
        <button onClick={handleSave}>
            Save
        </button>
        <button onClick={handleCancel}>
            Cancel
        </button>
        </div>

        <p>
        Note: Changes are not persisted (data is static JSON in this demo).
        </p>
    </div>
    )
}
