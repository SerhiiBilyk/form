import React, { Component, ReactElement } from "react";
import styled from "styled-components";
import { media, inputs } from "../../styles/utils";

const Container = styled.div`
  position: relative;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid black;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  right: 4px;
`;
const Wrapper = styled.input`
  ${inputs}
  color:transparent;
  ${media.phone`width:100%`}
`;
const Menu = styled.ul`
  position: absolute;
  background-color: rgba(200, 203, 208, 0.6);
  width: 100%;
`;

export default class Select extends Component<any, any> {
  public input: any;
  public state = {
    items: [{ id: 1, name: "Frodo Baggins" }, { id: 2, name: "John Doe" }],
    show: false
  };
  componentDidMount() {
    document.addEventListener("mousedown", this.handleMenu);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleMenu);
  }
  handleMenu = e => {
    if (!this.input.contains(e.target)) {
      console.log("not containe");
      this.setState(prevState => {
        return {
          show: false
        };
      });
    }
  };
  handleChange = element => {
    const { value } = element.target;
  };
  handleRef = input => {
    this.input = input;
  };
  handleToggle = e => {
    this.setState(prevState => {
      return {
        show: !prevState.show
      };
    });
  };
  render() {
    const { items, show } = this.state;
    return (
      <Container onClick={this.handleToggle} ref={this.handleRef}>
        <Wrapper type="text" />
        <Arrow />
        {show ? (
          <Menu>
            {items.map((elem, index) => {
              return <li key={index}>{elem.name}</li>;
            })}
          </Menu>
        ) : null}
      </Container>
    );
  }
}
