import React from "react";
import RoutesApp from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/toast";
import { AuthProvider } from "./utils/auth-context";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <RoutesApp />
          <ToastProvider />
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;