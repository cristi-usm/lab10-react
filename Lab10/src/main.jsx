import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { IstoricProvider } from "./context/IstoricContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <IstoricProvider>
      <App />
    </IstoricProvider>
  </AuthProvider>
);