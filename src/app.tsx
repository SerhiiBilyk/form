import React, { Component } from "react";
import CoreContext, { context } from "./context";
import { getRequest } from "@actions";
import { connect } from "react-redux";
import { About, Coordinator, When } from "./containers";

class App extends Component<any, any> {
  static contextType = CoreContext;
  public context!: React.ContextType<typeof CoreContext>;

  fetchData = data => {
    this.props.getRequest(data);
  };

  render() {
    const { categories, responsible, titles } = this.props;
    return (
      <CoreContext.Provider value={context}>
        <About
          categories={categories}
          titles={titles}
          fetchData={this.fetchData}
        />
        <Coordinator responsible={responsible} fetchData={this.fetchData} />
        <When />
      </CoreContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.validatorReducer.categories.data,
    responsible: state.validatorReducer.responsible.data,
    titles: state.validatorReducer.titles.data
  };
};
export default connect(
  mapStateToProps,
  {
    getRequest
  }
)(App);
