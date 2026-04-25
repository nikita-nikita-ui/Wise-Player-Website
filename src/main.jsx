import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import { DashboardProvider } from '../src/context/dashboardContext.jsx'

// i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';

import { AuthProvider } from '../src/context/AuthContext.jsx'
import {RefreshProvider} from '../src/context/RefreshContext.jsx'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: { translation: translationEN },
      FR: { translation: translationFR },
    },
    lng: localStorage.getItem("lang") || "EN",
    fallbackLng: "EN",
    interpolation: { escapeValue: false }
  });

// ✅ GLOBAL SYNC
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
  document.documentElement.lang = lng;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>            {/* ✅ MUST be first */}
      <RefreshProvider>
      <DashboardProvider>     {/* ✅ depends on Auth */}
        <App />
      </DashboardProvider>
      </RefreshProvider>
    </AuthProvider>
  </React.StrictMode>
)

