import React, { Component } from "react";
import styled from "styled-components";
import { media, clearfix, inputs } from "../../styles/utils";

const Wrapper = styled.textarea`
  ${inputs}
  resize:none;
  ${media.phone`width:100%`}
`;

const TextBlock = styled.span`
display:inline-block;
width:50%;
text-align:${(props: { align: string }) => props.align}
color:rgb(169,169,169);
font-size:13px;
`;

export default class TextArea extends Component<any, any> {
  public state = {
    length: 0,
    value: ""
  };
  handleChange = element => {
    const { value } = element.target;

    this.setState({
      length: value.length,
      value
    });
  };
  render() {
    const { length, value } = this.state;
    console.log("props", this.props);
    return (
      <>
        <Wrapper onChange={this.handleChange} value={value} {...this.props} />
        <p>
          <TextBlock align="left">Max length: 140 chars</TextBlock>
          <TextBlock align="right">0/{140 - length}</TextBlock>
        </p>
      </>
    );
  }
}
