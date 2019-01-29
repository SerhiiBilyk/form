import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { media } from "../../styles/utils";
import Group from "../Group";
const Container = styled.div`
  position: relative;
  outline: ${(props: IProps) =>
    props.valid === true ? "none" : "1px solid red"}
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
const SelectedItem = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
  min-height: 30px;
  ${media.phone`width:100%`}
`;
const MenuWrapper = styled.ul`
  position: absolute;
  top: -20px;
  left: 20px;
  z-index: 999;
  background-color: #e9ecf1;
  width: 100%;
`;
interface IProps {
  data?: any[];
  default?: number;
  render?: (value: any) => string;
  valid?:boolean
}
export default class Menu extends Component<IProps, any> {
  static defaultProps = {
    handleInputControl: () => {},
    data: [],
    valid:true
  };
  static getDerivedStateFromProps(props, state) {
  
    return null;
  }

  public input: HTMLDivElement;
  public state = {
    selected: "",
    show: false
  };
  componentDidMount() {
    console.log('selected',this.state)
    document.addEventListener("mousedown", this.handleMenu);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleMenu);
  }

  handleMenu = e => {
    if (!this.input.contains(e.target)) {
      this.setState({
        show: false
      });
    }
  };
  handleSelected = (selected, callback = null) => {
    this.setState(
      {
        selected
      },
      () => {
        callback(this.state.selected);
      }
    );
  };
  handleRef = input => {
    this.input = input;
  };
  handleToggle = () => {
    console.log('toggle',this.state)
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };
  render() {
    const { show, selected } = this.state;
    const { render, children, valid } = this.props;
    return (
      <Container onClick={this.handleToggle} ref={this.handleRef} valid={valid}>
        <SelectedItem>{render(selected)}</SelectedItem>
        <Arrow />
        {show ? (
          <MenuWrapper>
            <Group handleSelected={this.handleSelected} render={render}>
              {children}
            </Group>
          </MenuWrapper>
        ) : null}
      </Container>
    );
  }
}
