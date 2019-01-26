import { Constants } from "../actions";
import { IApiData } from "../types";
import { initialStateGenerator } from "@utils";

const initialState = initialStateGenerator([
  "categories",
  "titles",
  "responsible"
]);
const { GET_REQUEST_SUCCESS } = Constants;

const validatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_SUCCESS: {
      const { name, data, status } = action.payload;

      return {
        ...state,
        [name]: {
          ...state[name],
          data,
          loaded: status
        }
      };
    }
    default:
      return state;
  }
};
export default validatorReducer;
