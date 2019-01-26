import React, { Component } from "react";
import styled from "styled-components";
import { media, inputs } from "../../styles/utils";

interface IProps {
  valid: boolean;
  css: string;
}
const Wrapper = styled.input`
  outline: ${(props: IProps) =>
      props.valid === true ? "none" : "1px solid red"}
    ${inputs} ${(props: IProps) => props.css} ${media.phone`width:100%`};
`;

export default class Input extends Component<any, any> {
  static defaultProps={
    valid:true
  }
  handleChange = e => {
    const { value } = e.target;
    const { name } = this.props;

    this.props.onChange(name, value);
  };
  render() {
    const { css, name, valid } = this.props;
    return (
      <Wrapper
        name={name}
        css={css}
        valid={valid}
        onChange={this.handleChange}
      />
    );
  }
}
