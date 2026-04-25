import { useParams, Link } from "react-router";
import docs from "../../data/docs.json";

const sectionLabels = {
  basics: "Basics",
  classes: "Classes",
  mechanics: "Mechanics",
};

export const SectionPage = () => {
  const { section } = useParams();
  const pages = docs.filter((d) => d.section === section);

  if (pages.length === 0) {
  return (
        <div>
        <h3>Section not found</h3>
        <p>The section "{section}" does not exist.</p>
        <Link to="/docs">← Back to Docs</Link>
        </div>
    )
    }

    return (
    <div>
        <h2>
        {sectionLabels[section] || section}
        </h2>
        <p>
        {pages.length} articles in this section
        </p>

        <div>
        {pages.map((page) => (
            <Link key={page.id} to={`/docs/${page.section}/${page.id}`}>
            <div>
                <div>
                <div>{page.title}</div>
                <div>
                    {page.content.slice(0, 100)}...
                </div>
                </div>
                <span>→</span>
            </div>
            <div>
                {page.tags.map((tag) => (
                <span key={tag}>
                    {tag}
                </span>
                ))}
            </div>
            </Link>
        ))}
        </div>
    </div>
    )
}
