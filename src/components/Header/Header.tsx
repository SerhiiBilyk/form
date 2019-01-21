import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  border-top: 5px solid rgb(29, 49, 80);
  width: 100%;
  background-color: rgb(53, 89, 144);
  text-align:left;
  color:white;
  padding:20px 0 20px 100px;
  font-size:16px;
`;

export default class Header extends Component<any, any> {
  render() {
    return <Wrapper>Header</Wrapper>;
  }
}
