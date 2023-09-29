import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addItem, getAllItems, getAllItemsRaw } from "../restcall";
import "../css/login.css";
import "../css/creditcc.css";
import axios from "axios";

export default class Payment extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      desc: "",
      uid: "",
      ccp: "none",
      mp: "none",
      data: [],
    };
  }

  async componentWillMount() {
    const otp = sessionStorage.getItem("otp");
    if (!otp || otp === "false") {
      sessionStorage.clear;
      window.location.href = "/";
      alert("OTP Error");
    }

    const logged = sessionStorage.getItem("logged");
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
  }

  handlecardpayment = (event) => {
    this.setState({ ccp: "block" });
    this.setState({ mp: "none" });
  };

  handlemobilepayment = (event) => {
    this.setState({ ccp: "none" });
    this.setState({ mp: "block" });
  };

  handlecardproceed = async (event) => {
    const cardnumber = document.getElementById("card-number").value;
    const e_month = document.getElementById("Month").value;
    const e_year = document.getElementById("Year").value;
    const cvv = document.getElementById("cvv").value;
    const user = await sessionStorage.getItem("loggedUID");

    const cardinputs = {
      cardnumber,
      e_month,
      e_year,
      cvv,
    };
    // console.log("cardinputs", cardinputs);
    await axios
      .post("http://localhost:4000/sec/paymentcc", cardinputs)
      .then((response) => {
        console.log(response.data);
        if (response.data.card) {
          if (response.data.card.includes("Invalid")) {
            sessionStorage.setItem("paymentmsg", "false");
          } else {
            sessionStorage.setItem("paymentmsg", "true");
            axios
              .delete("http://localhost:4000/cart/delete/" + user)
              .then((cartresponse) => {
                console.log(cartresponse.data);
              });
          }
          window.location.href = "/paymentmsg";
        }
      });
  };

  handlemobileproceed = async (event) => {
    const mobilenumber = document.getElementById("mobile-number").value;
    const secnumber = document.getElementById("security-code").value;
    const user = await sessionStorage.getItem("loggedUID");

    const mobileinput = {
      mobilenumber,
      secnumber,
    };

    await axios
      .post("http://localhost:4000/sec/paymentmc", mobileinput)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          if (response.data.mobile.includes("Invalid")) {
            sessionStorage.setItem("paymentmsg", "false");
          } else {
            sessionStorage.setItem("paymentmsg", "true");
            axios
              .delete("http://localhost:4000/cart/delete/" + user)
              .then((cartresponse) => {
                console.log(cartresponse.data);
              });
          }
          window.location.href = "/paymentmsg";
        }
      });
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
          <br/>
          <h2>View Items</h2>
          <br/>
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
          <br/>
          <hr></hr>
          <br/>
          {
            <table class="table table-striped" id="paymenttable">
              
              <tbody>
                <label ><c>Payment Methods</c></label>
                <tr>
                  <td >
                  <br/>
                    <input
                      type="button"
                      className="paymentbutton"
                      class="btn btn-primary"
                      //id="buttonPurchase"
                      value="Card Payment"
                      onClick={this.handlecardpayment}
                    />
                  </td>
                  <td>
                    <br/>
                    <input
                      type="button"
                      className="paymentbutton"
                      class="btn btn-primary"
                      //id="buttonPurchase"
                      value="Mobile Payment"
                      onClick={this.handlemobilepayment}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          }


          
          {/* -------------------------------------------------- */}

          <div>
            
            <div id="ccp" style={{ display: this.state.ccp }}>
              <div className="form-header">
                <br/>
                <h4 className="title">Credit Card Details</h4>
              </div>
              <br/>
              <div className="form-body">
                <input
                  type="text"
                  class="form-control"
                  id="card-number"
                  className="card-number"
                  placeholder="Card Number"
                />

                <div className="date-field">
                  <div className="month">
                    <select name="Month" id="Month" class="form-control">
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="year">
                    <select name="Year" id="Year" class="form-control">
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2024">2025</option>
                      <option value="2024">2026</option>
                      <option value="2024">2027</option>
                      <option value="2024">2028</option>
                    </select>
                  </div>
                </div>

                <div className="card-verification">
                  <div className="cvv-input" >
                    <input type="text" id="cvv" placeholder="CVV" class="form-control" />
                  </div>
                  <div className="cvv-details">
                    <p>
                      3 or 4 digits usually found <br /> on the signature strip
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="proceed-btn"
                  onClick={this.handlecardproceed}
                >
                  Proceed
                </button>
              </div>
            </div>
            <div id="mp" style={{ display: this.state.mp }}>
              <br/>
              <h4 className="title">Mobile Payment Details.</h4>
              <br/>
              <div className="form-body">
                <input
                  type="text"
                  class="form-control"
                  id="mobile-number"
                  className="card-number"
                  placeholder="Mobile Number"
                />
                <div className="security-code">
                  <input
                    type="password"
                    class="form-control"
                    id="security-code"
                    className="card-number"
                    placeholder="Security Code"
                  />
                </div>
                <br/>
                <button
                  type="submit"
                  className="proceed-btn"
                  onClick={this.handlemobileproceed}
                >
                  Proceed
                </button>
              </div>
            </div>
            <h4 id="paymentmsg"></h4>
          </div>
        </div>
      </div>
    );
  }
}
