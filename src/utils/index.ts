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

export default initialStateGenerator;
