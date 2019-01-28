import React, { Component } from "react";
import styled from "styled-components";

const Item = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #84a8e5;
  }
`;

export default class MenuItem extends Component<any, any> {
  public handleClick = elem => () => {
    this.props.handleSelected(elem, this.props.onClick);
  };
  render() {
    const { item,render } = this.props;
    return (
      <Item onClick={this.handleClick(item)}>{render(item)}</Item>
    );
  }
}
