import React, { Component } from "react";
import { Paper, FormRow, Input, Menu, MenuItem } from "@components";
import CoreContext from "../context";

/**
 *     responsible={responsible}
          fetchData={this.fetchData}
          handleEventData={this.handleEventData}
 */
interface IProps {
  responsible: any[];
  fetchData: (name: string) => void;
  handleEventData: (name: string, value: any) => void;
}
export default class Coordinator extends Component<IProps, any> {
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
        <FormRow title="responsible" required>
          <Menu
            itemDefault={user}
            itemRender={item => `${item.name} ${item.lastname}`}
          >
            {responsible.map(item => (
              <MenuItem key={item.id} item={item} onClick={this.handleSelect} />
            ))}
          </Menu>
        </FormRow>
        <FormRow title="email">
          <Input
            type="email"
            isValidated
            validator={value => {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(value.toString().toLowerCase());
            }}
          />
        </FormRow>
      </Paper>
    );
  }
}
