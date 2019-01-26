import React, { Component } from "react";
import CoreContext, { context } from "./context";
import { getRequest } from "@actions";
import { connect } from "react-redux";
import { About, Coordinator, When } from "./containers";
import { IEvent } from "@types";

const pick = (src, ...props) =>
  props.reduce(
    (acc, elem) => ({
      ...acc,
      [elem]: src[elem]
    }),
    {}
  );
interface IState {
  form: IEvent;
}

class App extends Component<any, IState> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;
  public state: IState = {
    form: {
      title: null,
      description: null,
      category_id: null,
      paid_event: null,
      event_fee: null,
      reward: null,
      date: null,
      duration: null,
      coordinator: null
    }
  };

  public handleEventData = (name, value) => {
    this.setState(prevState => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          [name]: value
        }
      };
    },()=>{
     // console.log('STATE',this.state)
    });
  };

  public fetchData = data => {
    this.props.getRequest(data);
  };

  public render() {
    const { categories, responsible, titles } = this.props;

    return (
      <CoreContext.Provider value={context}>
        <About
          categories={categories}
          titles={titles}
          fetchData={this.fetchData}
          handleEventData={this.handleEventData}
        />
        <Coordinator
          responsible={responsible}
          fetchData={this.fetchData}
          handleEventData={this.handleEventData}
        />
        <When handleEventData={this.handleEventData} />
      </CoreContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  const {
    validatorReducer: { categories, responsible, titles }
  } = state;
  return {
    categories: categories.data,
    responsible: responsible.data,
    titles: titles.data
  };
};
export default connect(
  mapStateToProps,
  {
    getRequest
  }
)(App);
