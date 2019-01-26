import React, { Component } from "react";
import { Route, Switch } from "react-router";
import App from "./app";
import Sub from "./sub";

export default class Router extends Component<any,any> {
  public render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/hello" component={Sub} />
      </Switch>
    );
  }
}
