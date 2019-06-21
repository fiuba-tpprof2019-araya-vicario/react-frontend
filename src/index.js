import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import history from './redux/history';
import store from './redux/store';
import 'jquery';

/* Css */
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
