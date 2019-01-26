import React, { Component } from "react";
import {
  Paper,
  Form,
  Input,
  Textarea,
  Menu,
  MenuItem,
  Radio,
  Group
} from "@components";
import CoreContext, { context } from "../context";
import { getRequest } from "@actions";
import { connect } from "react-redux";

export default class About extends Component<any, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public state = {
    radio: "first"
  };
  componentDidMount() {
    this.props.fetchData("categories");
    this.props.fetchData("titles");
  }
  public handleRadioGroup = e => {
    this.setState({
      radio: e.target.value
    });
  };
  public handleSelect = item => {};
  render() {
    const { radio } = this.state;
    const { categories } = this.props;
    const inputCss = `width:50px; vertical-align:top`;
    return (
      <Paper header="About">
        <Form>
          <>
            <Form.Row title="title">
              <Input
                isValidated
                validator={value =>
                  !this.props.titles.some(elem => elem.title === value)
                }
              />
            </Form.Row>
            <Form.Row title="description">
              <Textarea maxLength={140} rows={4} />
            </Form.Row>
            <Form.Row title="category">
              <Menu itemRender={item => (item ? `${item.name}` : "")}>
                {categories.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onClick={this.handleSelect}
                  />
                ))}
              </Menu>
            </Form.Row>
            <Form.Row title="payment">
              <Group value={radio} onChange={this.handleRadioGroup}>
                <Radio value="free" text="Free event" />
                <Radio value="paid" text="Free event" />
                {radio === "paid" ? <Input css={inputCss} /> : null}
              </Group>
            </Form.Row>
            <Form.Row title="reward">
              <Input />
            </Form.Row>
          </>
        </Form>
      </Paper>
    );
  }
}
