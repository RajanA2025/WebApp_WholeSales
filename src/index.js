import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from 'react-router-dom';


// axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);