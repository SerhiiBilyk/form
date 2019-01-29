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
  FormControl
} from "@components";
import { Validators } from "@utils";
import { connect } from "react-redux";
import { getRequest } from "@actions";
import { IFormData } from "@types";
import { media } from "@styles/utils";

import styled from "styled-components";
/**
 * 
  title: string;
  description: string;
  category_id: number;
  paid_event: boolean;
  event_fee: number;
  reward: number;
  date: string; // YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
  duration: number; // in seconds
  coordinator: ICoordinator;
 */
/**
 *
 * mapStateTOProps
 */

const timeParser = (number, meridiem) => {
  const parsed = parseInt(number, 10);
  console.log("parsed", parsed, meridiem);
  const result = meridiem === "PM" ? parsed + 12 : parsed;
  return result;
};

const dateConvert = (date, time, meridiem) => {
  const days = new Date(date);
  const [hh, mm] = time.split(":");
  days.setHours(timeParser(hh, meridiem));
  days.setMinutes(parseInt(mm));
  const iso = days.toISOString();
  const [result] = iso.split(".");

  return result;

  // console.log('time',time.toISOString())
};

const converter = form => {
  const coordinator = {
    email: form.coordinator_email.value,
    id: form.coordinator_id.value
  };
  const date = dateConvert(
    form.date.value,
    form.time.value,
    form.time_meridiem
  );
  return {
    title: form.title.value,

    description: form.description.value,
    category_id: form.category_id.value,
    paid_event: form.paid_event.value === "paid" ? true : false, // possible bug
    event_fee: form.event_fee.value,
    reward: form.reward.value,
    date,
    duration: form.time_duration.value,
    coordinator
  };
};
const Container = styled.div`
  width: 100%;
  text-align: center;
`;
const Wrapper = styled.button`
  padding: 10px 10px;
  width: 200px;
  color: white;
  background-color: ${(props: { valid: boolean }) => {
    return props.valid ? "orange" : "gray";
  }};
  border: none;
  box-shadow: 1px 1px 1px black;
  border-radius: 5px;
  &:hover {
    background-color: green;
    cursor: pointer;
  }
  ${media.phone`width:80%`}
`;

interface IProps {
  categories: any[];
  titles: any[];
  getRequest: (name: string) => void;
  form: Record<string, IFormData>;
}
class Submit extends Component<IProps, any> {
  public state = {
    valid: false
  };
  public keys: string[] = [];
  /**
   * Maybe we do not need this heavy computation
   * It is depends on form submit algorithm
   */
  static getDerivedStateFromProps(props) {
    const { form } = props;
    const formKeys = Object.keys(form);
    const valid = formKeys.every(elem => form[elem].valid === true);

    return {
      valid
    };
  }
  public handleSubmit = () => {
    if (this.state.valid) {
      const result = converter(this.props.form);
      console.log("reuslt", result);
    }
  };

  render() {
    const { valid } = this.state;
    return (
      <Container>
        <Wrapper valid={valid} onClick={this.handleSubmit}>
          {"PUBLISH EVENT"}
        </Wrapper>
      </Container>
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
)(Submit);
