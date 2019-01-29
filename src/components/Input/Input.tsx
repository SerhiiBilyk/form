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
  static defaultProps = {
    valid: true
  };
  shouldComponentUpdate({ value, valid }) {
    return this.props.value !== value || this.props.valid !== valid;
  }
  handleChange = e => {
    const { value } = e.target;
    this.props.onChange(value);
  };
  render() {
    const { css, valid, value, type } = this.props;
    return (
      <Wrapper
        type={type}
        value={value}
        css={css}
        valid={valid}
        onChange={this.handleChange}
      />
    );
  }
}
