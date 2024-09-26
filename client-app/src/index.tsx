import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import App from './app/layout/App';
import { store, StoreContext } from './app/stores/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // when we use strict mode in react then our component is render twice in development mode not in production mode.
  // <React.StrictMode>
    <StoreContext.Provider value={store}>
    <App />
    </StoreContext.Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
