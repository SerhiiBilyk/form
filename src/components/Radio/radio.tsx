import React, { Component } from "react";
import styled from "styled-components";
import { FlexContainer } from "@components/styled/FlexBox";

const Label = styled.label`
position:relative;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  white-space:nowrap;


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
  vertical-align:middle;
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
  line-height: 25px;
  margin: 0 10px;
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
//        <FlexContainer direction="row">
