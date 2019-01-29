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
import CoreContext from "../context";
import { Validators } from "@utils";
import { connect } from "react-redux";
import { getRequest } from "@actions";
import { IFormData } from "@types";

interface IProps {
  categories: any[];
  titles: any[];
  getRequest: (name: string) => void;
  form: Record<string, IFormData>;
}
class About extends Component<IProps, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  public state = {
    radio: "first"
  };
  componentDidMount() {
    this.props.getRequest("categories");
    this.props.getRequest("titles");
  }
  public handleRadioGroup = value => {
    this.setState({
      radio: value
    });
  };
  public handleSelect = item => {};

  render() {
    const { categories, form } = this.props;
    const { title, description, category_id, reward, event_fee } = form;
    const inputCss = `width:50px;`;

    const feeInput = form.paid_event.value === "paid";
    return (
      <Paper header="About">
        <>
          <FormRow title="title" required message={title.message}>
            <FormControl
              name="title"
              validators={[
                Validators.dublicates(this.props.titles),
                Validators.required,
              ]}
              render={handleInputControl => (
                <Input onChange={handleInputControl} {...title} />
              )}
            />
          </FormRow>
          <FormRow title="description" required message={description.message}>
            <FormControl
              name="description"
              validators={[Validators.required]}
              render={handleInputControl => (
                <Textarea
                  onChange={handleInputControl}
                  rows={4}
                  maxLength={140}
                  {...description}
                />
              )}
            />
          </FormRow>

          <FormRow title="category">
            <FormControl
              name="category_id"
              render={handleInputControl => (
                <Menu render={elem => (elem ? `${elem.name}` : "")}>
                  {categories.map(item => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      onClick={selected => handleInputControl(selected)}
                    />
                  ))}
                </Menu>
              )}
            />
          </FormRow>
          <FormRow title="payment">
            <FormControl
              name="paid_event"
              render={handleInputControl => (
                <Group onChange={handleInputControl} name="payment">
                  <Radio value="free" text="Free event" />
                  <Radio value="paid" text="Paid event" />
                </Group>
              )}
            />
            <FormControl
              name="event_fee"
              render={handleInputControl =>
                feeInput ? (
                  <Input
                    onChange={handleInputControl}
                    css={`
                      ${inputCss} border:none;
                      outline: 1px solid black;
                    `}
                    {...event_fee}
                  />
                ) : null
              }
            />
          </FormRow>

          <FormRow title="reward" message={reward.message}>
            <FormControl
              name="reward"
              validators={[Validators.isNumber]}
              render={handleInputControl => (
                <Input onChange={handleInputControl} {...reward} />
              )}
            />
          </FormRow>
        </>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  const {
    validatorReducer: { categories, titles },
    formReducer
  } = state;
  return {
    categories: categories.data,
    titles: titles.data,
    form: formReducer
  };
};
export default connect(
  mapStateToProps,
  {
    getRequest
  }
)(About);
