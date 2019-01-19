import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "./routes";

import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store";

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root") as HTMLElement
);
