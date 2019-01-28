import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import validatorReducer from "./validatorReducer";
import formReducer from './formReducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    formReducer,
    validatorReducer
  });
