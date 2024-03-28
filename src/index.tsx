// hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// Recoil
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
// Common
import Header from 'components/Common/Header';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <Header />
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);

reportWebVitals();
