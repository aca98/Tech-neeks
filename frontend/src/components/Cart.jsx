import {} from "@fortawesome/fontawesome-svg-core";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { getProductsCart } from "../services/httpService";
import ProductCard from "./ProductCard";

class Cart extends Component {
  state = { products: {}, totalPrice: 0 };

  async componentDidMount() {
    let storage = JSON.parse(localStorage.getItem("products"));
    if (storage) {
      let ids = Object.keys(storage).reduce((a, b) => {
        return a + "," + b;
      });
      let productObj = {};
      let products = await getProductsCart(ids);
      products.forEach(
        (value) =>
          (productObj[value.product.id] = {
            ...value,
            amount: storage[value.product.id],
          })
      );
      this.setState({
        products: productObj,
        totalPrice: this.totalPrice(productObj),
      });
    }
  }

  increaseAmount = (id) => {
    if (localStorage.getItem("products")) {
      let storage = JSON.parse(localStorage.getItem("products"));
      storage[id] = parseInt(storage[id]) + 1;
      localStorage.setItem("products", JSON.stringify(storage));
      let state = { ...this.state };
      state.products[id].amount = storage[id];
      state.totalPrice = this.totalPrice(state.products);
      this.setState(state);
    }
  };
  decreaseAmount = (id) => {
    if (localStorage.getItem("products")) {
      let storage = JSON.parse(localStorage.getItem("products"));
      if (JSON.parse(storage[id]) > 1) {
        storage[id] = parseInt(storage[id]) - 1;
        localStorage.setItem("products", JSON.stringify(storage));
        let state = { ...this.state };
        state.products[id].amount = storage[id];
        state.totalPrice = this.totalPrice(state.products);
        this.setState(state);
      }
    }
  };
  removeFromCart = (id) => {
    let storage = JSON.parse(localStorage.getItem("products"));
    delete storage[id];
    localStorage.setItem("products", JSON.stringify(storage));

    let products = { ...this.state.products };
    delete products[id];
    this.setState({ totalPrice: this.totalPrice(products), products });
  };
  totalPrice = (products) => {
    if (!products) {
      return 0;
    }
    let total = 0;
    Object.entries(products).forEach((att) => {
      let inTotal = att[1].product.price * parseInt(att[1].amount);
      let calDiscount = parseInt(att[1].product.discount) / 100;
      let discount = 0;
      if (att[1].product.discount !== "0") {
        discount = Math.floor(parseInt(inTotal * calDiscount));
      }
      total += inTotal - discount;
    });
    return total;
  };
  buyCart = () => {
    if (localStorage.getItem("products")) {
      this.props.history.push("/delivery");
    } else {
      toast.error("Korpa ne sme biti prazna");
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-sm-12 col-md-6 p-5 mb-5 mt-5 mx-auto rounded shadow">
          <h1>Korpa</h1>
        </div>
        <div className="col-sm-12 col-md-9 p-5 mb-5 mt-5 mx-auto rounded shadow">
          <div className="row">
            {this.state.products &&
              Object.entries(this.state.products).map((value) => (
                <ProductCard
                  data={value[1]}
                  choice={"cart"}
                  decrement={this.decreaseAmount}
                  increment={this.increaseAmount}
                  removeFromCart={this.removeFromCart}
                />
              ))}
          </div>
          <div className="row">
            <h2 className="text-center mx-auto">
              Ukupna cena:{this.state.totalPrice} RSD
            </h2>
          </div>
          <div className="row pb-3">
            <button onClick={this.buyCart} className="login mx-auto w-100">
              Kupi
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
