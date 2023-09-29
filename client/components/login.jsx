import React from "react";
import { Component } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import { login } from "../restcall";
import logo from "../img/logo.png"; 
import backgroundImage from '../img/background1.jpg';
import 'bootstrap/dist/css/bootstrap.css';



      export default class Login extends Component {
        constructor(props) {
          super(props);

          this.state = {
            email: "",
            password: "",
          };
        }

        handleEmail = (event) => {
          this.setState({ email: event.target.value });
        };

        handlePassword = (event) => {
          this.setState({ password: event.target.value });
        };

        handleSubmit = (event) => {
          event.preventDefault();

          const result = login(this.state.email, this.state.password);

          //window.location.href = "/register";
        };

        
  render() {
    return (
      <div className="backgroundimage">
        <div className="loginForm" id="login-page">
        <br/>

          <img src={logo} alt="Girl in a jacket" width="100" height="100" />
          <hr></hr>
          <h2 className="maintitle">HERBAL HUB</h2>
          {/* <Link to="/register">
            <button type="button" class="btn btn-primary">Register</button>
          </Link> */}

          <hr></hr>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <div class="mb-3" >
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input required type="email" onChange={this.handleEmail} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" onChange={this.handlePassword} class="form-control" id="exampleInputPassword1"/>
            </div>

            {/* <div class ="mb-3">
              <label>Email</label>
              <input required type="email" onChange={this.handleEmail} />
            </div> */}

            {/* <div class ="mb-3">
              <label>Password</label>
              <input required type="password" onChange={this.handlePassword} />
            </div> */}

            <button class="btn btn-success" type="submit">
              Login
            </button> {"  "}
            <Link to="/register">
            <button type="button"  className="buttonMargin"  class="btn btn-primary">Register</button>
          </Link>
            
          </form>
        </div>
      </div>
    );
  }
      }