import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import ProtectedComponent from './ProtectedComponent';
import { AuthProvider } from './contexts/Auth.jsx'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Paragraph } from 'dracula-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Paragraph>Exemplo de login</Paragraph>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedComponent />} />
        <Route path='*' exact={true} element={<ProtectedComponent />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
