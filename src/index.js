import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18next from 'i18next';
import english from './translation/english.json';
import georgian from './translation/georgian.json';
import greek from './translation/greek.json';
import armenian from './translation/armenian.json';
import arabic from './translation/arabic.json';

import { I18nextProvider } from 'react-i18next';

i18next.init({
  lng: "ge",
  resources: {
    en: {
      global: english,
    },
    ge: {
      global: georgian,
    },
    gr: {
      global: greek,
    },
    am: {
      global: armenian,
    },
    ar: {
      global: arabic,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);