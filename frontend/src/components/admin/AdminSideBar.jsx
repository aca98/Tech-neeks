import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AdminSideBar extends Component {
  state = {};
  render() {
    return (
      <div className="row m-0">
        <div
          id="navbarSupportedContent"
          className="navbar navbar-expand-lg navbar-expand-md navbar-light bg-nav-color-black col-sm-12 col-md-2">
          <div
            className="collapse navbar-collapse row mb-auto"
            id="navbarSupportedContent">
            <NavLink
              activeClassName={"adminActive"}
              className=" w-100 "
              to="/addProduct">
              <div className="col-12 w-100 mx-auto p-2 bg-nav-color-black text-white text-center">
                Dodaj Proizvod
              </div>
            </NavLink>
            <NavLink
              activeClassName={"adminActive"}
              className=" w-100 "
              to="/products">
              <div className="col-12 w-100 mx-auto p-2 bg-nav-color-black text-white text-center">
                Pregled Proizvoda
              </div>
            </NavLink>
            <NavLink
              activeClassName={"adminActive"}
              className=" w-100 "
              to="/users">
              <div className="col-12 w-100 mx-auto p-2 bg-nav-color-black text-white text-center">
                Pregled Korisnika
              </div>
            </NavLink>
            <NavLink
              activeClassName={"adminActive"}
              className=" w-100 "
              to="/analytics">
              <div className="col-12 w-100 mx-auto p-2 bg-nav-color-black text-white text-center">
                Prodajna Analitika
              </div>
            </NavLink>
            <NavLink
              activeClassName={"adminActive"}
              className=" w-100 "
              to="/adminregister">
              <div className="col-12 w-100 mx-auto p-2 bg-nav-color-black text-white text-center">
                Registrovanje Administratora
              </div>
            </NavLink>
          </div>
        </div>
        <div className="col-sm-12 col-md-10">{this.props.children}</div>
      </div>
    );
  }
}

export default AdminSideBar;
