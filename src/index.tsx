// hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// Common
import Header from 'components/Common/Header';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
