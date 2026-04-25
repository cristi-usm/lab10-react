import { Link } from "react-router";
import docs from "../../data/docs.json";

const sections = [...new Set(docs.map((d) => d.section))];

export const DocsIndex = () => {
  return (
    <div>
        <h2>Welcome to the Wiki</h2>
        <p>
        Pick a section from the sidebar or start with one of the topics below. Use the search to find anything quickly.
        </p>

        {sections.map((section) => {
        const pages = docs.filter((d) => d.section === section);
        return (
            <div key={section}>
            <h6>{section}</h6>
            <div>
                {pages.map((page) => (
                <Link key={page.id} to={`/docs/${page.section}/${page.id}`}>
                    <span>→</span>
                    {page.title}
                    <div>
                    {page.tags.slice(0, 2).map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                    </div>
                </Link>
                ))}
            </div>
            </div>
        );
        })}
    </div>
    )
}
