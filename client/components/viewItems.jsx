import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addItem, getAllItems, getAllItemsRaw } from "../restcall";
import "../css/login.css";
import axios from "axios";

export default class ViewItem extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      desc: "",
      uid: "",
      qnty: "",
      data: [],
    };
  }

  async componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }

    await axios.get("http://localhost:4000/products/").then((response) => {
      const data = response.data;

      var items = [];

      const keys = Object.keys(data);
      console.log(data);
      for (var x in data) {
        items.push({
          name: data[x].name,
          price: data[x].price,
          desc: data[x].desc,
          id: data[x]._id,
          uid: data[x].uid,
          qnty: data[x].qnty,
        });
      }

      this.setState({ data: items });
    });

    setTimeout(() => {
      console.log(this.state.data);
    }, 500);
  }

  handleAddToCart = async (event) => {
    const pid = event.target.dataset.key;
    const uid = sessionStorage.getItem("loggedUID");
    const qnty = document.getElementById(pid).value;
    const mxqnty = this.state.data.find((x) => x.id === pid).qnty;
    const newqnty = parseInt(mxqnty) - parseInt(qnty);
    console.log(mxqnty);
    if (qnty > mxqnty) {
      alert("please input correct item amount");
    } else {
      const cartitem = {
        uid,
        pid,
        qnty,
      };
      await axios
        .put("http://localhost:4000/products/updateqnty/" + pid, {
          qnty: newqnty,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
        });
      await axios
        .post("http://localhost:4000/cart/create", cartitem)
        .then((response) => {
          console.log(response.data);
          alert(response.data);
          window.location.href = "/viewItems";
        });
    }
  };

  handleSearch = async (event) => {
    const searchquary = document.getElementById("search").value;
    this.setState({ data: [] });
    await axios
      .get("http://localhost:4000/products/getProducts/" + searchquary)
      .then((response) => {
        const data = response.data.products;

        var items = [];
        if (data) {
          const keys = Object.keys(data);
          console.log(data);
          for (var x in data) {
            items.push({
              name: data[x].name,
              price: data[x].price,
              desc: data[x].desc,
              id: data[x]._id,
              uid: data[x].uid,
              qnty: data[x].qnty,
            });
          }
        } else {
          alert("No Products for that term!.");
          window.location.href = "/viewItems";
        }

        this.setState({ data: items });
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
          <br />

          <div className="searchbar" style={{ float: "right" }}>
            <input
              type="text"
              class="form-control"
              name="search"
              placeholder="Item Name"
              id="search"
              style={{ width: "200px" }}
            />
            <input
              type="button"
              class="btn btn-primary"
              value="Search"
              onClick={this.handleSearch}
              id="button-addon2"
              style={{ marginLeft: "8px", backgroundColor: "blue" }}
            />
          </div>

          <br />
          <br />
          <br />
          {
            <table class="table table-striped" id="itemtable">
              <tbody>
                <tr>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Max Qty</th>
                  <th>Action</th>
                </tr>
                {this.state.data.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.desc}</td>
                      <td>
                        <input
                          class="form-control"
                          type="number"
                          id={item.id}
                          name="quantity"
                          min="1"
                          max={item.qnty}
                          defaultValue="1"
                          onKeyDown="return false"
                        />
                      </td>
                      <td>{item.qnty}</td>
                      <td>
                        <input
                          type="submit"
                          class="btn btn-primary"
                          data-key={item.id}
                          onClick={this.handleAddToCart}
                          value="++Cart"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
}
