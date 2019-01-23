import React from "react";

export interface IContext {
  id: number;
  name: string;
  lastname: string;
  email: string;
}


export const context: IContext = {
  id: 3,
  name: "Walter",
  lastname: "Nelson",
  email: "walter.nelson@hussa.rs"
};

export default React.createContext(context);
