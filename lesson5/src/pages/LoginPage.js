import React, {Component} from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {login} from "../action/user";

@connect(
  // mapStateToProps
  ({user}) => ({
    isLogin: user.isLogin
  }),
  // mapDispatchToProps function | object
  {
    login
  }
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }
  nameChange = e => {
    this.  ({username: e.target.value});
  };
  render() {
    const {isLogin, location, dispatch, login} = this.props;

    // 登录了， 就跳转走，去from或者你自己默认的页面
    if (isLogin) {
      const {from = "/"} = location.state || {};
      return <Redirect to={from} />;
    }

    // 没登录
    const {username} = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input value={username} onChange={this.nameChange} />

        <button onClick={() => login({name: username})}>login</button>
      </div>
    );
  }
}
export default LoginPage;
