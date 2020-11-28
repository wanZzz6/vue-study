import React, {Component} from "react";
import {Context, UserContext} from "../Context";

export default class ContextTypePage extends Component {
  // contextType 是源码中的API，固定变量名
  static contextType = Context;
  // 只能订阅一个
  static contextType = UserContext;

  render() {
    const {themeColor, name} = this.context;
    console.log("contextType", this.context); //sy-log

    return (
      <div>
        <h3 className={themeColor}>ContextTypePage</h3>
        <p>{name}</p>
      </div>
    );
  }
}
