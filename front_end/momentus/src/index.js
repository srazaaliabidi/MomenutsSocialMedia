import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import {Provider, useDispatch} from 'react-redux';
import {useSelector, connect} from 'react-redux';

const store = createStore (rootReducer);

ReactDOM.render (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById ('root')
);

reportWebVitals ();
