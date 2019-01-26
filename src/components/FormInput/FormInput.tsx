import React, { Component } from "react";


interface IProps {
  value: any;
  name: string;
  controls: string[];
}
const convertToState = data =>
  Object.keys(data).reduce(
    (acc, elem) => ({
      ...acc,
      [elem]: {
        name: elem,
        value: null,
        valid: true,
        message: null
      }
    }),
    {}
  );
const messageConverter = data => {
  const result = data.reduce(
    (acc, elem) =>
      typeof elem.message === "string" ? acc + elem.message : acc,
    ""
  );
  return result ? result : null;
};
export default class FormInput extends Component<any, any> {
  public state = convertToState(this.props.controls);

  public handleState = (name, value) => {
    const validation = this.props.controls[name].reduce(
      (acc, validator) => [...acc, validator(value)],
      []
    );
    const message = messageConverter(validation);
    const valid = validation.every(elem => elem.valid);

    this.setState(
      prevState => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          message,
          valid,
          value
        }
      }));
  };
  render() {
    return this.props.render(this.state, this.handleState);
  }
}
