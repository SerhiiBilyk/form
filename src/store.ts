import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createBrowserHistory();

export default preloadedState =>
  createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(compose(applyMiddleware(routerMiddleware(history), thunk)))
  );
