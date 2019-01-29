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

const sortBydefault = (data, id) => {
  if (data.length) {
    const index = data.findIndex(elem => elem.id === id);
    const head = data.slice(0, index);
    const tail = data.slice(index + 1, data.length);
    return [data[index], ...head, ...tail];
  }
  return data;
};
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

  render() {
    const { responsible, form } = this.props;
    const { coordinator_email, coordinator_id } = form;
    const { user } = this.context;
    return (
      <Paper header="Coordinator">
        <FormRow title="responsible" required message={coordinator_id.message}>
          <FormControl
            name="coordinator_id"
            validators={[Validators.required]}
            render={handleInputControl => (
              <Menu
                {...coordinator_id}
                render={elem => (elem ? `${elem.name} ${elem.lastname}` : "")}
              >
                {sortBydefault(responsible, user.id).map(item => (
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
