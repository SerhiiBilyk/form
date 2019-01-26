import React, { Component } from "react";
import styled from "styled-components";

const Item = styled.li`
  padding: 5px 10px;
  cursor:pointer;
  &:hover{
    background-color:#84a8e5;
  }
`;

export default class MenuItem extends Component<any, any> {
  public handleClick = elem => () => this.props.handleChange(elem);
  render() {
    const { item, itemRender } = this.props;
    return <Item onClick={this.handleClick(item)}>{itemRender(item)}</Item>;
  }
}
