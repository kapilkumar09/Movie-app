import React, { Component } from "react";
import Input from "../common/Input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };

  handleInput = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = e => {
    console.log("Submitted");
  };

  render() {
    const { account } = this.state;
    return (
      <form>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={this.handleInput}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={this.handleInput}
        />
        <button className="btn btn-primary m-2" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;
