import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addItem, getAllItems, getAllItemsRaw } from "../restcall";
import "../css/login.css";
import axios from "axios";
var productarr = [];

export default class ViewCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grandtotal: 0,
      data: [],
    };
  }

  componentWillMount = async () => {
    const logged = sessionStorage.getItem("logged");
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
    await this.loadingrun();
  };

  loadingrun = async () => {
    const uid = await sessionStorage.getItem("loggedUID");
    await axios
      .get("http://localhost:4000/cart/get/" + uid)
      .then((response) => {
        const data = response.data.product;
        if (data) {
          productarr = [];
          data.forEach(async (x, i) => {
            await axios
              .get("http://localhost:4000/products/get/" + x.pid)
              .then((rew) => {
                const dataw = rew.data.product;
                let pdatafull = {
                  name: dataw.name,
                  price: dataw.price,
                  desc: dataw.desc,
                  id: dataw._id,
                  uid: dataw.uid,
                  qnty: x.qnty,
                  tprice: parseInt(x.qnty) * parseInt(dataw.price),
                };
                productarr.push(pdatafull);
                try {
                  this.setState({
                    grandtotal: this.state.grandtotal + pdatafull.tprice,
                  });
                  this.setState({ data: productarr });
                } catch (e) {
                  console.log(e);
                }
              });
          });
        }
      });
  };

  handlebuy = (event) => {
    if (!this.state.grandtotal) {
      alert("Please try again!..");
    } else {
      sessionStorage.setItem("cart", this.state.data);
      sessionStorage.setItem("gtotal_cart", this.state.grandtotal);
      window.location.href = "/otp";
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
      <div className="background-size">
      <div>
        {console.log(this.state.data)}
        <div className="loginForm">
        <br/>
          
          <h2>View Cart</h2>
          <br/>
          
          <Link to="/dashboard">
            <button className="buttonMargin">Dashboard</button>
          </Link>

          <Link to="/viewItems">
            <button className="buttonMargin">View Items</button>
          </Link>

          <Link to="/">
            <button className="buttonMargin" onClick={this.handleLogout}>
              Logout
            </button>
          </Link>
          
          <hr></hr>
          <br/>
          {
            <table class="table table-striped" id="customertable">
              <tbody>
                <tr>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                </tr>
                {this.state.data.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.qnty}</td>
                      <td>{item.tprice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }

          
<br/>
<br/>
          <div>
            <h4><b>Grand Total : {this.state.grandtotal}</b></h4>
          </div>

          <br/>
          <button className="buttonPurchase" onClick={this.handlebuy}>
            Purchase
          </button>
        </div>
      </div>
      </div>
    );
    
  }
}
