import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import {AuthProvider} from "./context/AuthProvider.jsx"
import { HistoryProvider } from './context/HistoryProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HistoryProvider>
              <App />
        </HistoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
