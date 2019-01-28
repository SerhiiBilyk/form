import React, { Component } from "react";
import {
  Paper,
  FormRow,
  Input,
  Menu,
  MenuItem,
  FormControl
} from "@components";
import CoreContext from "../context";
import { connect } from "react-redux";
import { getRequest } from "@actions";
import { IFormData } from "@types";
import { Validators } from "@utils";

interface IProps {
  responsible: any[];
  getRequest: (name: string) => void;
  form: Record<string, IFormData>;
}
class Coordinator extends Component<IProps, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public state = {};
  componentDidMount() {
    this.props.getRequest("responsible");
  }

  public handleSelect = item => {};
  render() {
    const { responsible, form } = this.props;
    const { coordinator_email } = form;
    const { user } = this.context;
    console.log("responsible", responsible);
    return (
      <Paper header="Coordinator">
        <FormRow title="responsible" required>
          <FormControl
            name="coordinator_id"
            render={handleInputControl => (
              <Menu
                data={responsible}
                default={user.id}
                render={elem => (elem ? `${elem.name} ${elem.lastname}` : "")}
              >
                {responsible.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onClick={selected => handleInputControl(selected.id)}
                  />
                ))}
              </Menu>
            )}
          />
        </FormRow>

        <FormRow title="email" message={coordinator_email.message}>
          <FormControl
            name="coordinator_email"
            validators={[Validators.isEmail]}
            render={handleInputControl => (
              <Input onChange={handleInputControl} {...coordinator_email} />
            )}
          />
        </FormRow>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  const {
    validatorReducer: { responsible },
    formReducer
  } = state;
  return {
    responsible: responsible.data,
    form: formReducer
  };
};
export default connect(
  mapStateToProps,
  {
    getRequest
  }
)(Coordinator);
