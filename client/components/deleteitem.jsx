import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { getAllItems, getAllItemsRaw } from "../restcall";
import "../css/login.css";
import axios from "axios";

export default class Deleteitem extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      desc: "",
      _id: "",
      uid: "",
      qnty: "",
      selected: "",
      data: [],
    };
  }

  handleItemName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleDesc = (event) => {
    this.setState({
      desc: event.target.value,
    });
  };

  handleItemPrice = (event) => {
    this.setState({
      price: event.target.value,
    });
  };

  handleItemQnty = (event) => {
    this.setState({
      qnty: event.target.value,
    });
  };

  handleSelect = async (event) => {
    await axios
      .get("http://localhost:4000/products/get/" + event.target.value)
      .then((response) => {
        const data = response.data;
        console.log(data.product);
        this.setState({ name: data.product.name });
        this.setState({ desc: data.product.desc });
        this.setState({ price: data.product.price });
        this.setState({ _id: data.product._id });
        this.setState({ uid: data.product.uid });
        this.setState({ qnty: data.product.qnty });
      });
  };

  async componentWillMount() {
    const logged = sessionStorage.getItem("logged");

    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }

    const uid = await sessionStorage.getItem("loggedUID");
    axios
      .get("http://localhost:4000/products/getbyuser/" + uid)
      .then((response) => {
        const data = response.data.products;
        var items = [];
        console.log(data);

        for (var x in data) {
          items.push({
            name: data[x].name,
            price: data[x].price,
            desc: data[x].desc,
            _id: data[x]._id,
            uid: data[x].uid,
            qnty: data[x].qnty,
          });
        }

        this.setState({ data: items });
        console.log(items);
      });

    setTimeout(() => {
      console.log(this.state.data);
    }, 500);
  }

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };

  handledelete = async (event) => {
    event.preventDefault();
    await axios
      .delete("http://localhost:4000/products/delete/" + this.state._id)
      .then((response) => {
        const data = response.data;
        if (data.product.includes("delted")) {
          alert("Product deleted!!.");
          window.location.href = "/deleteitm";
        }
      });
  };

  render() {
    return (
      <div>
        <div className="loginForm">
          <br />
          <h2>Delete Items</h2>
          <Link to="/dashboard">
            <button className="buttonMargin">Dashboard</button>
          </Link>

          <Link to="/addItems">
            <button className="buttonMargin">Add Items</button>
          </Link>

          <Link to="/">
            <button className="buttonMargin" onClick={this.handleLogout}>
              Logout
            </button>
          </Link>

          <hr></hr>
          <br />
          <br />
          <div>
            <form onSubmit={this.handledelete}>
              <label for="exampleInputEmail1" class="form-label">
                Select Item
              </label>
              <select
                id="products"
                class="form-control"
                onChange={this.handleSelect}
              >
                <option value="">Select</option>
                {this.state.data.map((item) => {
                  return (
                    <option value={item._id}>
                      {item.name} : {item.price}
                    </option>
                  );
                })}
              </select>
              <div>
                <label for="exampleInputEmail1" class="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  onChange={this.handleItemName}
                  value={this.state.name}
                  disabled
                />
              </div>
              <div>
                <label for="exampleInputEmail1" class="form-label">
                  Item Price
                </label>
                <input
                  type="number"
                  class="form-control"
                  onChange={this.handleItemPrice}
                  value={this.state.price}
                  disabled
                />
              </div>
              <div>
                <label for="exampleInputEmail1" class="form-label">
                  Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  onChange={this.handleDesc}
                  value={this.state.desc}
                  disabled
                />
              </div>
              <div>
                <label for="exampleInputEmail1" class="form-label">
                  Qty
                </label>
                <input
                  type="number"
                  class="form-control"
                  onChange={this.handleItemQnty}
                  min="1"
                  Value={this.state.qnty}
                  disabled
                />
              </div>
              <br />
              <button className="btn btn-danger">Delete Item</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
