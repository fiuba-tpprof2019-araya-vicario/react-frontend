import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

/* Css */
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import './react-select.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import history from './redux/history';
import store from './redux/store';
import './index.css';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
global.bootstrap = require('bootstrap');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
