import React from "react";
import { Component } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { register } from "../restcall";
import logo from "../img/logo.png";
import 'bootstrap/dist/css/bootstrap.css';

const CryptoJS = require("crypto-js");
var key = "ASECRET";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      role: "customer",
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePassword2Change = (event) => {
    this.setState({ password2: event.target.value });
  };

  handleRoleChange = (event) => {
    this.setState({ role: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      name: this.state.name,
      password: CryptoJS.AES.encrypt(this.state.password, key).toString(),
      password2: this.state.password2,
      role: this.state.role,
    };

    if (this.state.password != this.state.password2) {
      alert("Passwords do not match!");
      return;
    } else {
      register(user);
    }
  };

  render() {
    return (
      <div className="registerForm">
        <hr></hr>
        <img src={logo} alt="Girl in a jacket" width="100" height="100" />
        <hr></hr>
        <h2>Register</h2>

        <Link to="/">
          <button className="buttonMargin">Login</button>
        </Link>

        <hr></hr>

        <form onSubmit={this.handleSubmit}>
          <div class="mb-3" >
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input
              required
              type="text"
              class="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>

          <div>
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input
              required
              type="email"
              class="form-control"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>

          <div>
            <label for="exampleInputEmail1" class="form-label">Password</label>
            <input
              required
              type="password"
              class="form-control"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>

          <div>
            <label for="exampleInputEmail1" class="form-label">Re-enter Password</label>
            <input
              required
              type="password"
              class="form-control"
              value={this.state.password2}
              onChange={this.handlePassword2Change}
            />
          </div>

          <div>
            <label for="exampleInputEmail1" class="form-label">Role</label>
            <select value={this.state.role} class="form-control" onChange={this.handleRoleChange}>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {this.state.submit}
          <br/>

          <button id="Submit" className="buttonMargin" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}
