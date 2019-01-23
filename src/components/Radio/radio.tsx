import React, { Component } from "react";
import styled from "styled-components";
import { media, inputs, clearfix } from "../../styles/utils";

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
  display: inline-block;
  cursor: pointer;
  font-size: 18px;
  user-select: none;

  &:hover input ~ span {
    background-color: #ccc;
  }
  & input:checked ~ span {
    background-color: white;
    border: 1px solid #02467d;
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
  display: inline-block;
  position: relative;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 4px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #02467d;
  }
`;
const Text = styled.p`
  display: inline-block;
  vertical-align: top;
  line-height: 25px;
  margin: 0 10px;
`;
const ClearFix = styled.div`
  ${clearfix}
`;
interface IProps {
  onChange?: () => void;
  value: string;
  text: string;
}
export default class Radio extends Component<IProps, any> {
  render() {
    const { onChange, value, text } = this.props;
    return (
      <Label>
        <Input type="radio" name="radio" value={value} onChange={onChange} />

        <Checkmark />
        <Text>{text}</Text>
      </Label>
    );
  }
}
