import React, { Component } from "react";
import styled from "styled-components";
import { media, clearfix } from "../../styles/utils";
import Input from "../Input";
import Textarea from "../Textarea";
import { initial, getTitleDublicates } from "../../actions";
import { connect } from "react-redux";
import Select from "../Select";
import { Radio, RadioGroup } from "../Radio";
import CoreContext, { context } from "../../context";
const Wrapper = styled.input`
  width: 80%;
  font-size: 18px;
`;
const Row = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  ${media.phone`  flex-direction:column;`}
`;
const RowTitle = styled.div`
  flex-basis: 30%;
  padding-top: 5px;
  ${media.phone`flex-basis:100%`}
`;

const VerticalAlign = styled.p`
  position: relative;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  ${media.phone`position:static; transform:none;`}
`;
const RowInput = styled.div`
  flex-basis: 50%;
  ${media.phone`flex-basis:100%`}
`;
const RowMessage = styled.div`
  flex-basis: 20%;
  padding-left:20px;
  ${media.phone`flex-basis:100%`}
`;
const InputWidth = styled.div`
  width: 100%;
`;

class Form extends Component<any, any> {
  public static contextType = CoreContext;

  public state = {
    radio: "first"
  };
  public handleRadioGroup = e => {
    this.setState({
      radio: e.target.value
    });
  };
  public static Row = ({ title, children }) => {
    return (
      <Row>
        <RowTitle>{title.toUpperCase()}</RowTitle>
        <RowInput>
          <InputWidth>{children}</InputWidth>
        </RowInput>
        <RowMessage>
          <VerticalAlign>Error</VerticalAlign>
        </RowMessage>
      </Row>
    );
  };
  componentDidMount() {
    this.props.getTitleDublicates().then(dublicate => {});
  }

  render() {
    const { radio } = this.state;
    const inputCss = `width:50px; vertical-align:top`;
    console.log(this.context)
    return (
      <div>
        <Form.Row title="title">
          <Input />
        </Form.Row>
        <Form.Row title="description">
          <Textarea maxLength={140} rows={4} />
        </Form.Row>
        <Form.Row title="category">
          <Select />
        </Form.Row>
        <Form.Row title="payment">
          <RadioGroup value={radio} onChange={this.handleRadioGroup}>
            <Radio value="free" text="Free event" />
            <Radio value="paid" text="Free event" />
            {radio === "paid" ? <Input css={inputCss} /> : null}
          </RadioGroup>
        </Form.Row>
        <Form.Row title="reward">
          <Input />
        </Form.Row>
      </div>
    );
  }
}

export default connect(
  null,
  {
    initial,
    getTitleDublicates
  }
)(Form);
