import React, { Component } from "react";
import CoreContext, { context } from "../../context";
import { connect } from "react-redux";
import { formSetValue } from "@actions";
interface IProps {
  value: any;
  name: string;
  controls: string[];
}

const messageConverter = data => {
  const result = data.reduce(
    (acc, elem) =>
      typeof elem.message === "string" ? [...acc, elem.message] : [...acc],
    []
  );
  return result;
};
class FormControl extends Component<any, any> {
  static defaultProps = {
    validators: []
  };
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public shouldComponentUpdate(nextProps) {
    const { name, form } = nextProps;
    const prevProps = this.props.form;
    return true;
    /*
    (
      prevProps[name].value !== form[name].value ||
      prevProps[name].valid !== form[name].valid
    );
    */
  }

  public componentDidMount() {
    const { validators, name } = this.props;

    validators.forEach(elem => {
      if (elem.name === "required") {
        console.log('name',name)
        const { message, valid } = this.handleValidation("");
        this.props.formSetValue(name, { message, valid, value: "" });
      }
    });
  }

  public handleValidation = value => {
    const { validators } = this.props;
    const validation = validators.reduce(
      (acc, validator) => [...acc, validator(value)],
      []
    );
    const message = messageConverter(validation);
    const valid = validation.every(elem => elem.valid);
    return {
      message,
      valid
    };
  };

  public handleState = value => {
    const { name } = this.props;
    const { message, valid } = this.handleValidation(value);

    this.props.formSetValue(name, { message, valid, value });
  };
  render() {
    return this.props.render(this.handleState);
  }
}

const mapStateToProps = state => {
  return {
    form: state.formReducer
  };
};
export default connect(
  mapStateToProps,
  {
    formSetValue
  }
)(FormControl);
