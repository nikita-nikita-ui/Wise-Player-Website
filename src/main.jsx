import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import { DashboardProvider } from '../src/context/dashboardContext.jsx'

// *** NEW IMPORTS FOR I18N ***
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// *** TRANSLATION FILES IMPORT (Only EN and FR kept) ***
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';


// Configure i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: { translation: translationEN },
      FR: { translation: translationFR }, // *** French Kept ***
    },
    lng: "FR",// Default language when the app loads
    fallbackLng: "EN", // Fallback language
    interpolation: {
      escapeValue: false // React handles escaping by default
    }
  });


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </React.StrictMode>,
)

