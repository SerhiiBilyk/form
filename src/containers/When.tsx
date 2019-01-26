import React, { Component } from "react";
import Paper from "@components/Paper";
import CoreContext from "../context";

import { Radio, Group,FormRow } from "@components";
import { FlexContainer, FlexItem } from "@components/styled/FlexBox";
import Input from "@components/Input";

export default class About extends Component<any, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public state = {};
  componentDidMount() {}

  render() {
    return (
      <Paper header="When">
            <FormRow title="title" required>
              <Input type="date" css={"flex-basis:45%; width:auto"} />
              <FlexItem alignSelf="center" flexBasis="10%">
                at
              </FlexItem>
              <Input type="time" css={"flex-basis:25%; width:auto"} />

              <Group name="time" onChange={() => {}} css={"flex-basis:5%;"}>
                <Radio value="PM" text="PM" />
                <Radio value="AM" text="AM" />
              </Group>
            </FormRow>
      </Paper>
    );
  }
}
