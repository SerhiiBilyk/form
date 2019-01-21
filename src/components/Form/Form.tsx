import React, { Component } from "react";
import styled from "styled-components";
import { media, clearfix } from "../../styles/utils";
import Input from "../Input";
import Textarea from "../Textarea";
import { initial, getTitleDublicates } from "../../actions";
import { connect } from "react-redux";
import Select from "../Select";
import { Radio, RadioGroup } from "../Radio";

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
  ${media.phone`flex-basis:100%`}
`;
const InputWidth = styled.div`
  width: 90%;
`;

class Form extends Component<any, any> {
  public state = {
    radio: "first"
  };
  public handleRadioGroup = e => {
    console.log("TARET value", e.target.value);
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
    this.props.getTitleDublicates().then(dublicate => {
      console.log("res", dublicate);
    });
  }

  render() {
    console.log("Form", this.props);
    const { radio } = this.state;
    return (
      <div>
        <Form.Row title="title">
          <Input />
        </Form.Row>
        <Form.Row title="description">
          <Textarea />
        </Form.Row>
        <Form.Row title="category">
          <Select />
        </Form.Row>
        <Form.Row title="payment">
          <RadioGroup value={radio} onChange={this.handleRadioGroup}>
            <Radio value="free" />
            <Radio value="paid">
              <Input css={"width:50px;"} />
            </Radio>
          </RadioGroup>
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
