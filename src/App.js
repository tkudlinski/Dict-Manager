// @flow

import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

import Providux from "./utils/Providux";
import DictList from "./containers/DictList";

import "./App.css";

type PropType = {};
type StateType = {};

class App extends Component<PropType, StateType> {
  render() {
    return (
      <Providux>
        <div className="App">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Dict Manager</NavbarBrand>
          </Navbar>
          <DictList />
        </div>
      </Providux>
    );
  }
}

export default App;
