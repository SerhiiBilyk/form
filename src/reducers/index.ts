import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import validatorReducer from "./validatorReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    validatorReducer
  });
