import React, { Component} from "react";
import styled from "styled-components";
import { media} from "../../styles/utils";
import Group from "../Group";
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
const SelectedItem = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
  min-height:30px;
  ${media.phone`width:100%`}
`;
const MenuWrapper = styled.ul`
  position: absolute;
  top:-20px;
  left:20px;
  z-index: 999;
  background-color: #e9ecf1;
  width: 100%;
`;



export default class Menu extends Component<any, any> {
  static getDerivedStateFromProps(props, state) {
    const { itemDefault } = props;
    const selected = state.selected === null ? itemDefault : state.selected;
    return {
      ...state,
      selected
    };
  }

  public input: HTMLDivElement;
  public state = {
    selected: null,
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
      this.setState({
        show: false
      });
    }
  };
  handleChange = selected => {
    this.setState({
      selected
    });
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
    const { show, selected } = this.state;
    const { itemRender } = this.props;
    return (
      <Container onClick={this.handleToggle} ref={this.handleRef}>
        <SelectedItem>{itemRender(selected)}</SelectedItem>
        <Arrow />
        {show ? (
          <MenuWrapper>
            <Group handleChange={this.handleChange} {...this.props}>
              {this.props.children}
            </Group>
          </MenuWrapper>
        ) : null}
      </Container>
    );
  }
}
