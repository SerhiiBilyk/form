import { Constants } from "@actions";
import { IFormReducer, FormDataKeys, IFormData } from "@types";

const generateState = (values): Record<FormDataKeys, IFormData>  =>
  values.reduce(
    (acc, elem) => ({
      ...acc,
      [elem]: {
        valid: true,
        value: "",
        message: []
      }
    }),
    {}
  );


const initialState: IFormReducer = generateState([
  "title",
  "description",
  "category_id",
  "paid_event",
  "event_fee",
  "reward",
  "date",
  "duration",
  "coordinator_email",
  "coordinator_id"
]);
const { FORM_SET_VALUE } = Constants;

const validatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SET_VALUE: {
      const { name, data } = action.payload;

      return {
        ...state,
        [name]: {
          ...data
        }
      };
    }
    default:
      return state;
  }
};
export default validatorReducer;
