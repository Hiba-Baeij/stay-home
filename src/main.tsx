import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
// import 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
