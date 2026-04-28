import { Routes, Route } from "react-router";
import Layout from "./Layout";
import DocsLayout from "./DocsLayout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import DocsIndex from "./DocsIndex";
import SectionPage from "./SectionPage";
import PageView from "./PageView";
import EditPage from "./EditPage";
import SearchPage from "./SearchPage";
import HistoryPage from "./HistoryPage";
import NotFound from "./NotFound";
import DocsNotFound from "./DocsNotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/despre" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cauta" element={<SearchPage />} />
        <Route path="/istoric" element={<HistoryPage />} />
      </Route>

      <Route path="/docs" element={<Layout />}>
        <Route element={<DocsLayout />}>
          <Route index element={<DocsIndex />} />
          <Route path=":sectiune" element={<SectionPage />} />
          <Route path=":sectiune/:paginaId" element={<PageView />} />
          <Route path=":sectiune/:paginaId/editare" element={<EditPage />} />
          <Route path="*" element={<DocsNotFound />} />
        </Route>
      </Route>

      <Route path="*" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
