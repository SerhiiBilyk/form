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
const result = (valid, message) => ({ valid, message: valid ? null : message });

type IValidator = (value: any) => any;
export const Validators: Record<string, IValidator> = {
  dublicates: data => value => {
    const valid = !data.some(elem => elem.title === value);
    return result(valid, "Your title already exists");
  },
  required: value => {
    const valid = Boolean(value);
    return result(valid, "Value is required");
  },
  isNumber: value => {
    const regexp = /^\d+$/;
    const valid = value ? regexp.test(value) : true;
    return result(valid, "Only number please");
  },
  isEmail: value => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = value ? regexp.test(value.toString().toLowerCase()) : true;
    return result(valid, "Please, enter valid email");
  },
  test: value => {
    const valid = value.includes("123");
    return result(valid, "Test message");
  }
};
