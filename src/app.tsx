import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "./components/Paper";
import Header from "./components/Header";

export default class App extends Component<any, any> {
  render() {
    return (
      <div>
        <Header />
        <Paper header="About" />
      </div>
    );
  }
}
