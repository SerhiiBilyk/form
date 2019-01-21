import React, { Component } from "react";
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
const Label = styled.label`
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  &:hover input ~ span {
    background-color: #ccc;
  }
  & input:checked ~ span {
    background-color: white;
    border:1px solid #02467d;
  }
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  display: none;
  &:checked ~ span:after {
    display: block;
  }

`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  &:after {
    content: "";
    position: absolute;
    display: none;
    top:50%;
    left:50%;
    transform:translateY(-50%) translateX(-50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background:#02467d;
  }
`;

interface IProps{
  values:string[]
}
export default class Radio extends Component<any, any> {
  public state={
    value:''
  }
  public handleCheck=(e)=>{
    this.setState({
      value:e.target.value
    })
  }
  render() {
    return (
      <div>
        <Label>
          <Input type="radio" name="radio" value="first" onChange={this.handleCheck} />
          <Checkmark />
        </Label>
        <Label>
          <Input type="radio" name="radio" value="second" onChange={this.handleCheck}/>
          <Checkmark />
        </Label>
      </div>
    );
  }
}
