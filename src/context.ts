import React from "react";

interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
}
export interface IContext {
  user: IUser;
}

export const context: IContext = {
  user: {
    id: 3,
    name: "Walter",
    lastname: "Nelson",
    email: "walter.nelson@hussa.rs"
  }
};

export default React.createContext(context);
