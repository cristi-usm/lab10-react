import { Navigate, useParams } from "react-router";
import pages from "./data/pages.json";
import DocsNotFound from "./DocsNotFound";

export default function SectionPage() {
  const { sectiune } = useParams();
  const secPages = pages.filter((p) => p.sectiune === sectiune);

  if (secPages.length === 0) {
    return <DocsNotFound />;
  }

  return <Navigate to={`/docs/${sectiune}/${secPages[0].id}`} replace />;
}
