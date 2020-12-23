import React, { Component } from "react";
import { getUser, getUserHistory } from "../../services/httpService";
import ProductCard from "../ProductCard";

class AdminUserProfile extends Component {
  state = { user: {}, carts: [] };

  authority = { 0: "Gost", 1: "Korisnik", 2: "Admin" };

  async componentDidMount() {
    let carts = await getUserHistory(this.props.match.params.email);
    this.setState({
      user: carts[0]
        ? carts[0].cart.user
        : await getUser(this.props.match.params.email),
      carts,
    });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-9 p-0 mb-5 mt-5 mx-auto ">
        <div className="row m-0">
          <div className="col-sm-12 col-md-9">
            <h2 className="text-capitalize">
              {this.state.user &&
                this.state.user.ime + " " + this.state.user.prezime}
            </h2>
          </div>
        </div>
        <div className="row m-0 p-2 border-bottom">
          <div className="text-capitalize">
            Autoritet: {this.authority[this.state.user.authority]}
          </div>
        </div>
        {this.state.user &&
          Object.entries(this.state.user)
            .filter(
              (attribute) =>
                !["password", "authority", "ime", "prezime"].includes(
                  attribute[0]
                )
            )
            .map((attribute) => (
              <div className="row m-0 p-2 border-bottom">
                <div className="text-capitalize">
                  {attribute[0] === "last_activity"
                    ? "Poslednja Aktivnost"
                    : attribute[0].replace("_", " ")}
                </div>{" "}
                {["datum_registracije", "last_activity"].includes(attribute[0])
                  ? ": " +
                    attribute[1].replaceAll("T", " ").replaceAll("-", "/")
                  : ": " + attribute[1]}
              </div>
            ))}
        <div className="row m-0 p-2">
          <div className="text-capitalize">Kupljeni proizvodi:</div>
        </div>
        <div className="col-sm-12 col-md-12 mb-5 mt-2 mx-auto ">
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
      </div>
    );
  }
}

export default AdminUserProfile;
