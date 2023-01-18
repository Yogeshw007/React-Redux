import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { applyMiddleware, createStore } from "redux";
import appReducer from "./reducer";

// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       console.log("ACTION TYPE = ", action.type);
//       next(action);
//     };
//   };
// };

const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log("ACTION TYPE = ", action.type);
  next(action);
};

// const stopSubtract = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       if (action.type !== "SUBSTRACT_COUNT") {
//         next(action);
//       }
//     };
//   };
// };

const stopSubtract = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== "SUBSTRACT_COUNT") {
    next(action);
  }
};

const store = createStore(appReducer, applyMiddleware(logger, stopSubtract));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
  rootElement
);
