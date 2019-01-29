import React, { Component } from "react";
import styled from "styled-components";
import { media, inputs } from "../../styles/utils";

const Wrapper = styled.textarea`
  outline: ${(props: { valid: boolean }) =>props.valid === true ? "none" : "1px solid red"}
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
interface IProps {
  valid: boolean;
  onChange: (value: any) => void;
  rows: number;
  maxLength: number;
  value: any;
}
export default class TextArea extends Component<IProps, any> {


  shouldComponentUpdate(nextProps) {
    return (
      this.props.value !== nextProps.value ||
      this.props.valid !== nextProps.valid
    );
  }

  handleChange = e => {
    const { value } = e.target;
    this.props.onChange(value)
  };
  render() {
    const { valid, value, rows } = this.props;

    return (
      <>
        <Wrapper
          onChange={this.handleChange}
          value={value}
          valid={valid}
          rows={rows}
        />
        <p>
          <TextBlock align="left">Max length: 140 chars</TextBlock>
          <TextBlock align="right">0/{140 - value.length}</TextBlock>
        </p>
      </>
    );
  }
}
