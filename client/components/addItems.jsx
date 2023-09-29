import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addItem } from "../restcall";
import "../css/login.css";

export default class AddItem extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      desc: "",
      uid: "",
      qnty:''
    };
  }

  componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
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

  handleSubmit = (event) => {
    event.preventDefault();

    const uid = sessionStorage.getItem("loggedUID");

    const item = {
      name: this.state.name,
      price: this.state.price,
      desc: this.state.desc,
      uid: uid,
      qnty:this.state.qnty,
    };

    addItem(item);
  };

  componentWillMount() {
    const logged = sessionStorage.getItem("logged");

    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
  }

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
          <h2>Add Items</h2>
          <Link to="/dashboard">
            <button className="buttonMargin">Dashboard</button>
          </Link>

          <Link to="/editItems">
            <button className="buttonMargin">Edit Items</button>
          </Link>

          <Link to="/">
            <button className="buttonMargin" onClick={this.handleLogout}>
              Logout
            </button>
          </Link>

          <hr></hr>
          <br/>
          <br/>
          <form  onSubmit={this.handleSubmit}>
            <div>
              <label for="exampleInputEmail1" class="form-label">Item Name</label>
              <input type="text" class="form-control" onChange={this.handleItemName}></input>
            </div>
            <div>
              <label for="exampleInputEmail1" class="form-label">Item Price</label>
              <input type="number" class="form-control" onChange={this.handleItemPrice}></input>
            </div>
            <div>
              <label for="exampleInputEmail1" class="form-label">Description</label>
              <input type="text" class="form-control" onChange={this.handleDesc}></input>
            </div>
            <div>
              <label for="exampleInputEmail1" class="form-label">Qty</label>
              <input type="number" class="form-control" onChange={this.handleItemQnty} min="1" Value={this.state.qnty}/>
            </div>
            <br/>
            <button className="buttonMargin" type="submit">
              +Add Item
            </button>
          </form>
        </div>
      </div>
    );
  }
}
