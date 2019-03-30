import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import App from "./App";
import rootReducer from "./rootReducer";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

export const history = createBrowserHistory();
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) =>
  createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
