import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import GlobalStyle from "./schema/GlobalStyle";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from "redux-saga";

import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

import { ThemeProvider } from "emotion-theming";
import * as colors from "schema/colors";

const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
); // 미들웨어 적용

const theme = {
  color: {
    ...colors,
  },
};

sagaMiddleware.run(rootSaga); // 루트 사가 실행

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
