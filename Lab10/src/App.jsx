import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import DocsLayout from "./layouts/DocsLayout";

import Home from "./pages/Home";
import Despre from "./pages/Despre";
import Contact from "./pages/Contact";

import Sectiune from "./pages/Sectiune";
import Pagina from "./pages/Pagina";
import Editare from "./pages/Editare";
import Comentarii from "./pages/Comentarii";

import Cauta from "./pages/Cauta";
import Istoric from "./pages/Istoric";
import Login from "./pages/Login";

import PaginaInexistenta from "./pages/PaginaInexistenta";

import Privat from "./pages/Privat";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route element={<Layout />}>

          
          <Route path="/" element={<Home />} />
          <Route path="/despre" element={<Despre />} />
          <Route path="/contact" element={<Contact />} />

          
          <Route path="/docs" element={<DocsLayout />}>

           
            <Route index element={<Navigate to="ghid" replace />} />

            
            <Route path=":sectiune" element={<Sectiune />} />

            
            <Route path=":sectiune/:paginaId" element={<Pagina />}>
              <Route path="comentarii" element={<Comentarii />} />
            </Route>

            <Route path=":sectiune/:paginaId/editare" element={<Editare />} />

           
            <Route
              path="privat/:paginaId"
              element={
                <Privat>
                  <Pagina />
                </Privat>
              }
            />

            
            <Route path="*" element={<PaginaInexistenta />} />

          </Route>

          
          <Route path="/cauta" element={<Cauta />} />
          <Route path="/istoric" element={<Istoric />} />

          
          <Route path="/login" element={<Login />} />

          
          <Route path="*" element={<PaginaInexistenta />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;