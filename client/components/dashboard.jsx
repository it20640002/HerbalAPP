import React from "react";
import { Component } from "react";
import { login } from "../restcall";
import "../css/login.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"; 

export default class Dashboard extends Component {
  constructor() {
    super();
  }

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };

  GetNav = () => {
    const role = sessionStorage.getItem("loggedRole");

    if (role == "seller") {
      return (
        <div>
          <Link to="/addItems">
            <button className="buttonMargin">Add Items</button>
          </Link>

          <Link to="/editItems">
            <button className="buttonMargin">Edit Items</button>
          </Link>

          <button className="buttonMargin" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      );
    } else if (role == "customer") {
      return (
        <div>
          <Link to="/viewItems">
            <button className="buttonMargin">View Items</button>
          </Link>

          <Link to="/viewCart">
            <button className="buttonMargin">View Cart</button>
          </Link>

          <button className="buttonMargin" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      );
    }
  };

  componentWillMount() {
    const logged = sessionStorage.getItem("logged");

    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
  }

  render() {
    return (
      <div  className="loginForm" >
        <br/>
        <img src={logo} alt="Girl in a jacket" width="100" height="100"/>
        <br/>
        {/* <hr></hr> */}
        
        {/* <h2>{sessionStorage.getItem("loggedName")}'s Dashboard</h2> */}
        <br/>
        <this.GetNav />

        <hr></hr>
        <br/>
        <h2>Welcome {sessionStorage.getItem("loggedName")}</h2>
        <br/>
        <table class="table table-striped" id="customertable">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{sessionStorage.getItem("loggedName")}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{sessionStorage.getItem("loggedEmail")}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{sessionStorage.getItem("loggedRole")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
