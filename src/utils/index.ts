import { IApiData } from "../types";
type Result = Record<string, IApiData>;
export const initialStateGenerator = (data: string[]) =>
  data.reduce<Result>(
    (acc, elem) => ({
      ...acc,
      [elem]: {
        data: [],
        loaded: false,
        selected: "",
        error: false
      }
    }),
    {}
  );

type IValidator = (value: any) => any;
export const Validators: Record<string, IValidator> = {
  dublicates: data => value => {
    const valid = !data.some(elem => elem.title === value);
    return {
      valid,
      message: valid ? null : "Your title already exists"
    };
  },
  required: value => {
    const valid = Boolean(value);
    return {
      valid,
      message: valid ? null : "Value is required"
    };
  }
};
