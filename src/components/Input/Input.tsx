import React, { Component } from "react";
import styled from "styled-components";
import { media, inputs } from "../../styles/utils";

const Wrapper = styled.input`
  ${inputs}
  ${media.phone`width:100%`}
`;

export default class Input extends Component<any, any> {
  handleChange = element => {
    const { value } = element.target;
    console.log("value", value);
  };
  render() {
    return <Wrapper onChange={this.handleChange} />;
  }
}
