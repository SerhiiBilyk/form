import React, { Component } from "react";
import styled from "styled-components";
import { media, inputs } from "../../styles/utils";


export default class RadioGroup extends Component<any, any> {
  render() {
    const { value } = this.props;
    return React.Children.map(this.props.children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return React.cloneElement(child as React.ReactElement<any>, {
        onChange: this.props.onChange,
        rootValue:value
      });
    });
  }
}
