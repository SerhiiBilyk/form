import React, { Component } from "react";
import styled from "styled-components";
import { media } from "@styles/utils";

const Row = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  ${media.phone`flex-direction:column; align-items:stretch`}
`;
const RowTitle = styled.div`
  flex-basis: 30%;
  &::after {
    content:'${(props: { required: boolean }) => (props.required ? "*" : "")}';
    color:red;
  }
  ${media.phone`flex-basis:100%`}
`;

const VerticalAlign = styled.p`
  position: relative;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  ${media.phone`position:static; transform:none;`}
`;
const RowInput = styled.div`
  flex-basis: 50%;
  ${media.phone`flex-basis:100%`}
`;
const RowMessage = styled.div`
  flex-basis: 20%;
  color: white;
  position: relative ${media.phone`flex-basis:100%`};
`;
const InputWidth = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.span`
  display:${(props: { display: boolean }) => (props.display ? "block" : "none")}
  background-color: #e58e8e;
  position: absolute;
  padding: 4px;
  left: 10px;

  &::after {
    content: ".";
    position: absolute;
    left: -5px;
    top: 5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 5px solid #e58e8e;
    border-bottom: 5px solid transparent;
  }
`;
export default class FormRow extends Component<any, any> {
  static defaultProps = {
    message: []
  };
  render() {
    const { title, children, required, message } = this.props;

    return (
      <Row>
        <RowTitle required={required}>{title.toUpperCase()}</RowTitle>
        <RowInput>
          <InputWidth>{children}</InputWidth>
        </RowInput>
        <RowMessage>
          <ErrorMessage display={message.length}>
            {message.map((elem, index) => (
              <span key={index}>{elem}</span>
            ))}
          </ErrorMessage>
        </RowMessage>
      </Row>
    );
  }
}
