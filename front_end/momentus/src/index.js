import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import ReduxTest from './components/ReduxTest';
import Login from './pages/login';
import Register from './pages/register';
import Homepage from './pages/homepage';
import UserLanding from './components/UserLanding';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import axios from 'axios';
const baseURL = process.env.baseURL || "http://localhost:3000";
axios.defaults.baseURL = '';

const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
})

const store = createStore(persistedReducer);
export const history = createBrowserHistory();
const persistor = persistStore(store);

ReactDOM.render (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
    <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route path = "/redux">
            <ReduxTest />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <UserLanding />
            <Homepage />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
    </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById ('root')
);

reportWebVitals ();
