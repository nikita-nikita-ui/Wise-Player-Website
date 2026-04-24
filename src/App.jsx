import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PaymentRedirectHandler from "./pages/PaymentRedirectHandler";

function App() {
  return (
    <Router>
      <PaymentRedirectHandler />
      <AppRoutes />
    </Router>
  );
}

export default App;