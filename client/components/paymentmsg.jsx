import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addItem, getAllItems, getAllItemsRaw } from "../restcall";
import "../css/login.css";
import "../css/creditcc.css";
import axios from "axios";
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class Paymentmsg extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      desc: "",
      uid: "",
      ccp:'none',
      mp:'none',
      data: [],
      msg:"",
      msgclr:"",
    };
  }
  
  async componentWillMount()
  {
    const otp = sessionStorage.getItem("otp");
    const paymentmsg = sessionStorage.getItem("paymentmsg");
    if(!otp||otp === "false"){
      sessionStorage.clear;
      window.location.href = "/";
      alert("OTP Error");
    }

    const logged = sessionStorage.getItem("logged");
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
    
    if(paymentmsg === 'false'){
      this.setState({msg:'Payment Unsuccessful :-('});
      this.setState({msgclr:'red'});
      await delay(5000);
      window.location.href = "/dashboard";
    }else{
      console.log(paymentmsg)
      this.setState({msg:'Payment Successful :-)'});
      this.setState({msgclr:'green'});
      await delay(5000);
     window.location.href = "/dashboard";
    }
      
  }

  handlemsg = async() => {
    
  }



  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/dashboard";
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

          <hr></hr>
          <br/>
          <br/>
          <br/>
          <h2 style={{color:this.state.msgclr}} id="msg">{this.state.msg}</h2>

        </div>
      </div>
    );
  }
}
