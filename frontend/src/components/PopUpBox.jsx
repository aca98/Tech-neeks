import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { getProduct, purchaseCart } from "../services/httpService";
import ProductCard from "./ProductCard";

class PopUpBox extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    if (localStorage.getItem("products")) {
      let storage = JSON.parse(localStorage.getItem("products"));
      let products = [];
      let keys = Object.entries(storage);
      keys.forEach(async (element) => {
        products.push({
          ...(await getProduct(element[0])),
          amount: element[1],
        });
      });
      this.setState({ products });
    }
  }

  makeUser = (state) => {
    let user = {};
    Object.entries(state)
      .filter(
        (attribute) => !["useProfile", "error", "show"].includes(attribute[0])
      )
      .forEach((attribute) => (user[attribute[0]] = attribute[1].value));
    return user;
  };

  potvrda = async () => {
    this.props.handleClose();
    try {
      let message = await purchaseCart(
        this.makeUser(this.props.user),
        JSON.parse(localStorage.getItem("products"))
      );
      toast.success(message);
      localStorage.removeItem("products");
      this.props.history.push("/");
    } catch (error) {
      toast.error(error.response);
    }
  };

  totalPrice = () => {
    let total = 0;
    for (let index = 0; index < this.state.products.length; index++) {
      let inTotal =
        this.state.products[index].product.price *
        parseInt(this.state.products[index].amount);
      let calDiscount =
        parseInt(this.state.products[index].product.discount) / 100;
      let discount = 0;
      if (this.state.products[index].product.discount !== "0") {
        discount = Math.floor(parseInt(inTotal * calDiscount));
      }
      total += inTotal - discount;
    }

    return total;
  };

  render() {
    return (
      <Modal size={"xl"} show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Potvrdi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-sm-12 col-md-12 p-5 mx-auto rounded">
            <div className="row m-0">
              <div className="col-sm-12 col-md-9 p-2">
                <h2>Plaćanje se vrši pri preuzimanju</h2>
                <h2 className="text-capitalize">
                  {this.state.user &&
                    this.state.user.ime + " " + this.state.user.prezime}
                </h2>
              </div>
            </div>
            <div className="row pb-3 border-bottom">
              <div className="text-capitalize">
                {"Ime: " + this.props.user.ime.value}
              </div>
            </div>
            <div className="row pb-3 border-bottom">
              <div className="text-capitalize">
                {"Prezime:  " + this.props.user.prezime.value}
              </div>
            </div>
            <div className="row pb-3 border-bottom">
              <div className="text-capitalize">
                {"Pol:  " + this.props.user.pol.value}
              </div>
            </div>
            <div className="row pb-3 border-bottom">
              <div>{"Email: " + this.props.user.email.value}</div>
            </div>
            <div className="row pb-3 border-bottom">
              <div>
                {"Broj telefona: " + this.props.user.broj_telefona.value}
              </div>
            </div>
            <div className="row pb-3 border-bottom">
              <div>{"Adresa: " + this.props.user.adresa.value}</div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 p-5 mb-5 mt-5 mx-auto rounded shadow">
            <div className="row">
              {this.state.products &&
                this.state.products.map((value) => (
                  <ProductCard choice={"delivery"} data={value} />
                ))}
            </div>
            <div className="row">
              <h2 className="text-center mx-auto">
                Ukupna cena:{this.totalPrice()} RSD
              </h2>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Zatvori
          </Button>
          <Button variant="primary" onClick={this.potvrda}>
            Potvrdi
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PopUpBox;
