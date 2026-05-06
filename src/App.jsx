import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PaymentRedirectHandler from "./pages/PaymentRedirectHandler";
import { Toaster } from "react-hot-toast";

function App() {
  const isMobile = window.innerWidth < 768;
  return (
    <Router>
      <Toaster
  position="top-center"
  containerStyle={{
     top: isMobile ? "25%" : "15%",
  }}
  toastOptions={{
    style: {
      marginTop: "10px",
    },
  }}
/>
      <PaymentRedirectHandler />
      <AppRoutes />
    </Router>
  );
}

export default App;