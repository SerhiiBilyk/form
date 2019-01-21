import { Constants } from "../actions";
import { IValidatorStore } from "../types";
const { INITIAL_ACTION } = Constants;
const initialState = {
  filters: []
};

const validatorReducer = (state = initialState, action): IValidatorStore => {
  switch (action.type) {
    case INITIAL_ACTION: {
      return state;
    }
    default:
      return state;
  }
};
export default validatorReducer;
