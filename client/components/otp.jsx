import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addItem, getAllItems, getAllItemsRaw } from "../restcall";
import "../css/login.css";
import axios from "axios";

export default class Otp extends Component {
  constructor() {
    super();

    this.state = {
      otp: "",
      msg: "wait!.",
      data: [],
    };
  }

  async componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
    const email = sessionStorage.getItem("loggedEmail");
    const atsplit = email.split("@");

    await axios
      .get(
        "http://localhost:4000/sec/generate/" + atsplit[0] + "/" + atsplit[1]
      )
      .then((response) => {
        if (response.data.otp) {
          this.setState({ otp: response.data.otp });
          this.setState({
            msg: "We sent OTP to your email ( " + email + "), Please check :)",
          });
        } else {
          this.setState({ msg: response.data.error });
        }
      });
  }

  handleresend = async (event) => {
    try {
      event.preventDefault();
      const email = sessionStorage.getItem("loggedEmail");
      await axios
        .get("http://localhost:4000/sec/generate/" + email)
        .then((response) => {
          if (response.data.otp) {
            this.setState({ otp: response.data.otp });
            this.setState({
              msg:
                "We re-sent OTP to your email ( " +
                email +
                "), Please check :)",
            });
          } else {
            this.setState({ msg: response.data.error });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  handleconfirm = (event) => {
    event.preventDefault();
    const otpcode = document.getElementById("otp").value;
    if (otpcode === this.state.otp) {
      sessionStorage.setItem("otp", "true");
      window.location.href = "/payment";
    } else {
      sessionStorage.setItem("otp", "false");
      alert("Wrong otp!.");
    }
  };

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <div className="loginForm">
          <br />
          <h2>View Items</h2>
          <br />
          <Link to="/dashboard">
            <button className="buttonMargin">Dashboard</button>
          </Link>

          <Link to="/viewCart">
            <button className="buttonMargin">View Cart</button>
          </Link>

          <Link to="/">
            <button className="buttonMargin" onClick={this.handleLogout}>
              Logout
            </button>
          </Link>

          <hr></hr>
          <h5>{this.state.msg}</h5>
          <br />
          {
            <table className="otptable" class="table table-striped">
              <tbody>
                <tr>
                  <td>
                    <label>OTP Code: </label>
                    {"     "}
                    <input type="text" id="otp" />
                  </td>
                </tr>

                <td>
                  <br />
                  <input
                    type="button"
                    class="btn btn-primary"
                    value="resend email"
                    style={{ marginLeft: "8px", backgroundColor: "blue" }}
                    onClick={this.handleresend}
                  />{" "}
                  <input
                    type="submit"
                    class="btn btn-primary"
                    value="confirm"
                    style={{ marginLeft: "8px", backgroundColor: "blue" }}
                    onClick={this.handleconfirm}
                  />
                </td>
              </tbody>
              <br />
            </table>
          }
        </div>
      </div>
    );
  }
}
