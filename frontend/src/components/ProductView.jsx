import React, { Component } from "react";
import { toast } from "react-toastify";
import { getProduct } from "../services/httpService";
class ProductView extends Component {
  state = { product: {}, images: [], selectedPicture: "" };

  async componentDidMount() {
    let state = { ...this.state };
    state = { ...(await getProduct(this.props.match.params.id)) };
    state.selectedPicture = "data:image/png;base64," + state.images[0];
    this.setState(state);
  }

  showAttributes = () => {
    return (
      this.state.product.attribute &&
      this.state.product.attribute.map((attribute) => (
        <div className="row w-100 border-bottom">
          <div className="col-sm-4 col p-1 background-gray">
            {attribute.name}
          </div>
          <div className="col-sm-8 col p-1">{attribute.value}</div>
        </div>
      ))
    );
  };

  addToCart = () => {
    let storage = JSON.parse(localStorage.getItem("products"));
    if (storage) {
      storage[this.state.product.id] = 1;
      localStorage.setItem("products", JSON.stringify(storage));
    } else {
      localStorage.setItem(
        "products",
        JSON.stringify({ [this.state.product.id]: 1 })
      );
    }
    toast.success("Proizvod uspesno dodat u korpu");
  };

  showImages = () => {
    return this.state.images.map((image, index) => (
      <div key={`${image.name} + ${index}`} className="col-sm-12 col-md-4 ">
        <img
          src={"data:image/png;base64," + image}
          className="card-img-top darken-on-hover"
          role="button"
          alt={image.name}
          onClick={(e) => {
            this.setState({
              selectedPicture: e.target.src,
            });
          }}
        />
      </div>
    ));
  };

  importantAttributes = () => {
    if (this.state.product.attribute)
      return this.state.product.attribute
        .filter((attribute) => attribute.important === true)
        .map((value) => (
          <p className="m-0">
            <strong>{value.name}: </strong>
            {value.value}
          </p>
        ));
  };

  render() {
    if (!this.state) {
      return;
    }
    return (
      <div className="col-sm-12 col-md-9 p-5 mb-5 mt-5 mx-auto rounded shadow">
        <div className="row">
          <h2>{this.state.product && this.state.product.name}</h2>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <img
              src={this.state.selectedPicture}
              className="w-100 mx-auto d-block"
              alt={this.state.selectedPicture}
            />
            <div className="row ">{this.showImages()}</div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="border p-2 rounded">
              {this.importantAttributes()}
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="row pt-40 pl-2 pr-2">
              {this.state.product.discount !== "0" ? (
                <React.Fragment>
                  {" "}
                  <h5 className="mx-auto">
                    Popust: {this.state.product.discount}%
                  </h5>
                  <h4 className="mx-auto">
                    Cena: <strike>{this.state.product.price}</strike>{" "}
                    {this.state.product.price -
                      Math.floor(
                        this.state.product.price *
                          (this.state.product.discount / 100)
                      )}{" "}
                    RSD
                  </h4>
                </React.Fragment>
              ) : (
                <h4 className="mx-auto">
                  Cena: {this.state.product.price} RSD
                </h4>
              )}
              {!this.state.product.deleted && (
                <button
                  onClick={this.addToCart}
                  className="addCart mx-auto w-100">
                  Dodaj u korpu
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row border-bottom w-100">
            <h2>Specifikacije</h2>
          </div>
          {this.showAttributes()}

          <div className="col-sm-12 col-md-4"></div>
          <div className="col-sm-12 col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default ProductView;
