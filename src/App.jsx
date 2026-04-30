import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PaymentRedirectHandler from "./pages/PaymentRedirectHandler";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <PaymentRedirectHandler />
      <AppRoutes />
    </Router>
  );
}

export default App;