import React, { Component } from "react";
import {
  Paper,
  FormRow,
  Input,
  Textarea,
  Menu,
  MenuItem,
  Radio,
  Group,
  FormInput
} from "@components";
import CoreContext, { context } from "../context";
import { getRequest } from "@actions";
import { connect } from "react-redux";
import { Validators } from "@utils";

//
interface IProps {
  categories: any[];
  titles: any[];
  fetchData: (name: string) => void;
  handleEventData: (name: string, value: any) => void;
}
export default class About extends Component<IProps, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public state = {
    radio: "first"
  };
  componentDidMount() {
    this.props.fetchData("categories");
    this.props.fetchData("titles");
  }
  public handleRadioGroup = value => {
    this.setState({
      radio: value
    });
  };
  public handleSelect = item => {};

  render() {
    const { radio } = this.state;
    const { categories } = this.props;
    const inputCss = `width:50px;`;
    return (
      <Paper header="About">
        <>
          <FormInput
            controls={{
              title: [
                Validators.dublicates(this.props.titles),
                Validators.required
              ]
            }}
            render={(inputState, handleInputControl) => {
              console.log("inputState", inputState);
              const { message, valid } = inputState["title"];
              console.log('valid',valid)
              return (
                <FormRow title="title" required message={message}>
                  <Input
                    name="title"
                    onChange={handleInputControl}
                    valid={valid}
                  />
                </FormRow>
              );
            }}
          />

          <FormRow title="description" required>
            <Textarea maxLength={140} rows={4} />
          </FormRow>
          <FormRow title="category">
            <Menu itemRender={item => (item ? `${item.name}` : "")}>
              {categories.map(item => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onClick={this.handleSelect}
                />
              ))}
            </Menu>
          </FormRow>
          <FormRow title="payment">
            <Group onChange={this.handleRadioGroup} name="payment">
              <Radio value="free" text="Free event" />
              <Radio value="paid" text="Paid event" />
            </Group>
            <Input
              css={`
                ${inputCss} ${radio === "paid"
                  ? "visibility:visible"
                  : "visibility:hidden"}
              `}
            />
          </FormRow>
          <FormRow title="reward">
            <Input />
          </FormRow>
        </>
      </Paper>
    );
  }
}
