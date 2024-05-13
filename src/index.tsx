// hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';
// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Recoil
import { RecoilRoot } from 'recoil';
// style
import 'index.css';
// Common
import App from 'App';
import Header from 'components/Common/Header';

const queryClient = new QueryClient(); // 생성
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <BrowserRouter>
                    <Header />
                    <App />
                </BrowserRouter>
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    </React.StrictMode>
);

reportWebVitals();
