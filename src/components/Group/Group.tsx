import React, { Component } from "react";

export default class Group extends Component<any, any> {
  render() {
    return React.Children.map(this.props.children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return React.cloneElement(child as React.ReactElement<any>, {
        ...this.props
      });
    });
  }
}
