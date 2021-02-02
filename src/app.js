// install  => import => use
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import moment from "moment";

import AppRouter, { history } from "./routers/appRouter";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
import LoadingPage from "./components/LoadingPage";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

// import "./firebase/firebase";
import { firebase } from "./firebase/firebase";
// import "./playground/promises";

const store = configureStore();
// console.log("testing source map");

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
const rootElement = document.getElementById("app");

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, rootElement);
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage></LoadingPage>, rootElement);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard");
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
