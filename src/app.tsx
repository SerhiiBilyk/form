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

class App extends Component<any, {}> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;


  public handleEventData = (name, value) => {

  };

  public fetchData = data => {
    this.props.getRequest(data);
  };

  public render() {
    const { categories, responsible, titles } = this.props;
    

    return (
      <CoreContext.Provider value={context}>
        <About  />
        <Coordinator
          responsible={responsible}
        />
        <When />
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
