import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  margin: 40px auto;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  background-color: #fff;
  padding: 15px 20px;
`;

const Header = styled.p`
  padding: 10px 0;
  border-bottom: 1px solid blue;
`;

interface IProps {
  header: string;
}
export default class Paper extends Component<IProps, any> {
  public static Header = ({ header }) => <Header>{header}</Header>;

  render() {
    const { header, children } = this.props;
    return (
      <Wrapper>
        <Paper.Header header={header} />
      {children}
      </Wrapper>
    );
  }
}
