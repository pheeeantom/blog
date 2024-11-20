import React from 'react';
import App from './app';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store';

export const store = setupStore();

const root = createRoot(document.getElementById('root')!);

// Первый рендер приложения
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>  
    </BrowserRouter>
);