import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HistoryProvider } from './context/HistoryContext';

import Layout from './components/Layout';
import DocsLayout from './components/DocsLayout';
import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';
import Despre from './pages/Despre';
import Contact from './pages/Contact';
import DocsIndex from './pages/DocsIndex';
import SectionPage from './pages/SectionPage';
import DocPage from './pages/DocPage';
import EditPage from './pages/EditPage';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import NotFound from './pages/NotFound';
import DocsNotFound from './pages/DocsNotFound';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HistoryProvider>
          <Routes>
            {/* Layout shared for home/despre/contact */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/despre" element={<Despre />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cauta" element={<SearchPage />} />
              <Route path="/istoric" element={<HistoryPage />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Docs with sidebar always visible */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<DocsIndex />} />
              <Route path=":sectiune" element={<SectionPage />} />
              <Route path=":sectiune/:paginaId" element={<DocPage />} />
              <Route path=":sectiune/:paginaId/editare" element={<EditPage />} />
              {/* Private section */}
              <Route
                path="privat/:paginaId"
                element={
                  <RequireAuth>
                    <DocPage />
                  </RequireAuth>
                }
              />
              {/* Docs-specific 404 - sidebar stays visible */}
              <Route path="*" element={<DocsNotFound />} />
            </Route>

            {/* Global 404 */}
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HistoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
