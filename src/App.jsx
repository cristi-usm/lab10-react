import { Routes, Route } from "react-router"
import {Layout} from "./components/Layout";
import {DocsLayout} from "./components/DocsLayout";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {DocsIndex} from "./pages/docs/DocsIndex"
import {SectionPage} from './pages/docs/SectionPage'
import { PageView } from './pages/docs/PageView'
import { EditPage } from './pages/docs/EditPage'
import { PrivatePage } from './pages/docs/PrivatePage'
// import { DocsNotFound } from './pages/docs/DocsNotFound'
import { HistoryPage } from './pages/HistoryPage'
import { LoginPage } from './pages/LoginPage'
import { NotFound } from './pages/NotFound'





function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsIndex />} />
          <Route path=":section" element={<SectionPage />} />
          <Route path=":section/:pageId" element={<PageView />}>
            <Route path="edit" element={<EditPage />} />
          </Route>
          <Route path="private/secret-builds" element={<PrivatePage />} />
          {/* <Route path="*" element={<DocsNotFound />} /> */}
        </Route>

        {/* <Route path="search" element={<SearchPage />} /> */}
        <Route path="history" element={<HistoryPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
