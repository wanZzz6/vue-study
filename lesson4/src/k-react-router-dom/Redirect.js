import React, { Component } from "react";
import { RouterContext } from "./RouterContext";
import LifeCycle from "./LifeCycle";

export default class Redirect extends Component {
  render() {
    <RouterContext.Consumer>
      {(context) => {
        const { history, push = false } = context;
        const { to } = this.props;
        return (
          <LifeCycle
            onMount={() => {
              push ? history.push(to) : history.replace(to);
            }}
          />
        );
      }}
    </RouterContext.Consumer>;
    return <div></div>;
  }
}
