import React, { Component } from "react";
import Paper from "@components/Paper";
import CoreContext from "../context";
import Form from "@components/Form";

import { Radio, Group } from "@components";
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
        <Form>
          <>
            <Form.Row title="title">
              <Input type="date" css={"flex-basis:40%; width:auto"} />
              <FlexItem alignSelf="center">at</FlexItem>
              <div style={{display:'inline-block'}}>
                <Input type="time" css={"flex-basis:15%; width:auto"} />

                <Group value={"PM"} onChange={() => {}}>
                  <Radio value="PM" text="PM" />
                  <Radio value="AM" text="AM" />
                </Group>
              </div>
            </Form.Row>
          </>
        </Form>
      </Paper>
    );
  }
}
