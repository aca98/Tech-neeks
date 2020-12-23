import React, { Component } from "react";
import { getUserHistory } from "../services/httpService";
import ProductCard from "./ProductCard";

class UserPurchaseHistory extends Component {
  state = { carts: [] };

  async componentDidMount() {
    let email = JSON.parse(localStorage.getItem("userInfo")).email;
    let state = await getUserHistory(email);
    this.setState({ carts: state });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-sm-12 col-md-9 p-5 mb-5 mt-5 mx-auto rounded shadow">
          <h2>Istorija Kupovine</h2>
          <br />
          {this.state.carts.length > 0 && (
            <h2>
              Korisnik:
              {this.state.carts[0].cart.user.ime +
                " " +
                this.state.carts[0].cart.user.prezime}
            </h2>
          )}

          <div className="row">
            {this.state.carts.length > 0 &&
              this.state.carts.map((value) => (
                <ProductCard
                  data={{ product: value.cart.product, images: value.images }}
                  choice={"history"}
                  sellDate={value.cart.purchaseDate}
                  amount={value.cart.amount}
                />
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserPurchaseHistory;
