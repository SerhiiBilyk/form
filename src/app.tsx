import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "./components/Paper";
import Header from "./components/Header";
import CoreContext, {context} from "./context";

export default class App extends Component<any, any> {
  render() {
    return (
      <div>
              <CoreContext.Provider value={context}>

        <Header />
        <Paper header="About" />
        </CoreContext.Provider>

      </div>
    );
  }
}
