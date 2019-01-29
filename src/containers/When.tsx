import React, { Component } from "react";
import CoreContext from "../context";
import { connect } from "react-redux";

import {
  Radio,
  Group,
  FormRow,
  Paper,
  FlexItem,
  Input,
  FormControl
} from "@components";
import { Validators } from "@utils";

class When extends Component<any, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public state = {};
  componentDidMount() {}

  render() {
    const { form } = this.props;
    const { date, time, time_meridiem, time_duration } = form;
    const dateMessages = [
      ...new Set([...date.message, ...time.message, ...time_meridiem.message])
    ];
    return (
      <Paper header="When">
        <FormRow title="starts on" required message={dateMessages}>
          <FormControl
            name="date"
            validators={[Validators.required]}
            render={handleInputControl => (
              <Input
                onChange={handleInputControl}
                type="date"
                {...date}
                css={"width:40%; min-width:165px;"}
              />
            )}
          />
          <FlexItem alignSelf="center" flexBasis="10%">
            at
          </FlexItem>
          <FormControl
            name="time"
            validators={[Validators.required]}
            render={handleInputControl => (
              <Input
                type="time"
                css={"width:25%;min-width:125px;"}
                onChange={handleInputControl}
                {...time}
              />
            )}
          />

          <FormControl
            name="time_meridiem"
            validators={[Validators.required]}
            render={handleInputControl => (
              <Group onChange={handleInputControl} name="time">
                <Radio value="PM" text="PM" css={`padding-left:5px;`} />
                <Radio value="AM" text="AM" css={`padding-left:5px;`} />
              </Group>
            )}
          />
        </FormRow>
        <FormRow title="duration" message={time_duration.message}>
          <FormControl
            name="time_duration"
            validators={[Validators.isNumber]}
            render={handleInputControl => (
              <Input
                type="input"
                css={"width:40%;"}
                onChange={handleInputControl}
                {...time_duration}
              />
            )}
          />
        </FormRow>
      </Paper>
    );
  }
}
const mapStateToProps = state => {
  return {
    form: state.formReducer
  };
};
export default connect(
  mapStateToProps,
  null
)(When);
