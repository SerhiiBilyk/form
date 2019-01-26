import React, { Component } from "react";
import styled from "styled-components";
import { media } from "@styles/utils";

const Row = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items:center;
  ${media.phone`  flex-direction:column; align-items:stretch`}
`;
const RowTitle = styled.div`
  flex-basis: 30%;
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
  ${media.phone`flex-basis:100%`}
`;
const InputWidth = styled.div`
  width: 100%;


`;

export default class Form extends Component<any, any> {

  public static Row = ({ title, children }) => {
    return (
      <Row>
        <RowTitle>{title.toUpperCase()}</RowTitle>
        <RowInput>
          <InputWidth>{children}</InputWidth>
        </RowInput>
        <RowMessage>
          <VerticalAlign>Error</VerticalAlign>
        </RowMessage>
      </Row>
    );
  };

  render() {
    return this.props.children;
  }
}
