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
    length: 0
  };
  handleChange = element => {
    const { value } = element.target;
    console.log("value", value);
    this.setState({
      length: value.length
    });
  };
  render() {
    const { length } = this.state;
    return (
      <>
        <Wrapper onChange={this.handleChange} rows={4} />
        <p>
          <TextBlock align="left">Max length: 140 chars</TextBlock>
          <TextBlock align="right">0/{140 - length}</TextBlock>
        </p>
      </>
    );
  }
}
