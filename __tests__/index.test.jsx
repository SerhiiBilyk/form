import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { enzymeFind } from "styled-components/test-utils";
import store from "../src/store";
import App from '../src/app';
import 'whatwg-fetch'


configure({
  adapter: new Adapter()
});

describe("GLobal", () => {
  let wrapper;
  beforeAll( () => {
    wrapper = mount(
      <Provider store={store({})}>
        <App />
      </Provider>
    );
  });
  it("test", () => {
    console.log('wrapper',wrapper)
    expect(true).toBe(true);
  });
});
