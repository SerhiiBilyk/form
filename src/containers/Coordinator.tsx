import React, { Component } from "react";
import { Paper, Form, Input, Menu, MenuItem } from "@components";
import CoreContext from "../context";

export default class Coordinator extends Component<any, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public state = {};
  componentDidMount() {
    this.props.fetchData("responsible");
  }

  public handleSelect = item => {};
  render() {
    const { responsible } = this.props;
    const { user } = this.context;
    return (
      <Paper header="Coordinator">
        <Form>
          <>
            <Form.Row title="responsible">
              <Menu
                itemDefault={user}
                itemRender={item => `${item.name} ${item.lastname}`}
              >
                {responsible.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onClick={this.handleSelect}
                  />
                ))}
              </Menu>
            </Form.Row>
            <Form.Row title="email">
              <Input
                type="email"
                isValidated
                validator={value => {
                  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return re.test(value.toString().toLowerCase());
                }}
              />
            </Form.Row>
          </>
        </Form>
      </Paper>
    );
  }
}
