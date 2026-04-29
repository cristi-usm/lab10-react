
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FurnizorIstoric, FurnizorPrivat } from './Contexte/Contexte'

import {NavBar} from './Components/NavBar'
import {Header} from './Components/Header'
import {Produse} from './Components/Produse'
import {Promotii} from './Components/Promotii'
import {DespreNoi} from './Components/DespreNoi'
import {Footer} from './Components/Footer'
import {PromotiiPage} from './Components/PromotiiPage' 
import {ProdusePage} from './Components/ProdusePage'
import {DespreNoiPage} from './Components/DespreNoiPage'
import {ContactePage} from './Components/ContactePage'
import {AfiseazaProduse} from './Components/AfiseazaProduse'
import {DetaliiProdus} from './Components/DetaliiProdus'

import { LayoutDocs } from './Components/Documentatie/LayoutDocs'
import { BunVenitDocs } from './Components/Documentatie/BunVenitDocs'
import { PaginaSectiune } from './Components/Documentatie/PaginaSectiune'
import { PaginaDoc } from './Components/Documentatie/PaginaDoc'
import { Comentarii } from './Components/Documentatie/Comentarii'
import { FormularEditare } from './Components/Documentatie/FormularEditare'
import { PaginaCautare } from './Components/Documentatie/PaginaCautare'
import { PaginaIstoric } from './Components/Documentatie/PaginaIstoric'
import { ZonaPrivata } from './Components/Documentatie/ZonaPrivata'
import { PaginaAutentificare } from './Components/Documentatie/PaginaAutentificare'
import { NuAFostGasita } from './Components/Documentatie/NuAFostGasite'

function App() {
  return (
    <FurnizorPrivat>
      <FurnizorIstoric>
        <BrowserRouter>
          <NavBar />
          <Routes>

            <Route path="/" element={
              <>
                <Header />
                <Produse />
                <Promotii />
                <DespreNoi />
              </>
            } />
            <Route path="/promotii" element={<PromotiiPage />} />
            <Route path="/produse" element={<ProdusePage />} />
            <Route path="/despreNoi" element={<DespreNoiPage />} />
            <Route path="/contacte" element={<ContactePage />} />
            <Route path="/afiseazaProduse/:categorie" element={<AfiseazaProduse />} />
            <Route path="/detaliiProdus" element={<DetaliiProdus />} />

            <Route path="/docs" element={<LayoutDocs />}>
              <Route index element={<BunVenitDocs />} />
              <Route path="cauta" element={<PaginaCautare />} />
              <Route path="istoric" element={<PaginaIstoric />} />
              <Route path="privat/*" element={<ZonaPrivata />} />
              <Route path="autentificare" element={<PaginaAutentificare />} />
              <Route path=":sectiune" element={<PaginaSectiune />} />
              <Route path=":sectiune/:paginaId" element={<PaginaDoc />}>
                <Route path="comentarii" element={<Comentarii />} />
              </Route>
              <Route path=":sectiune/:paginaId/editare" element={<FormularEditare />} />
              <Route path="*" element={<NuAFostGasita />} />
            </Route>

            <Route path="*" element={<NuAFostGasita />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </FurnizorIstoric>
    </FurnizorPrivat>
  )
}

export default App