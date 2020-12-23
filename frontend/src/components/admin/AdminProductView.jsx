import React, { Component } from "react";
import { getProduct } from "../../services/httpService";
class AdminProductView extends Component {
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
        <div className="row m-0 w-100 border-bottom">
          <div className="col-sm-4 col p-2 background-gray">
            {attribute.name}
          </div>
          <div className="col-sm-8 col p-2">{attribute.value}</div>
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
    console.log(localStorage.getItem("products"));
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

  test = () => {
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
      <div className="col-sm-12 col-md-12 p-5 mb-5 mt-3 mx-auto">
        <div className="row m-1 p-1 border-bottom">
          <h2 className="m-0">
            {this.state.product && this.state.product.name}
          </h2>
        </div>
        <div className="row m-0">
          <div className="col-sm-12 col-md-6">
            <img
              src={this.state.selectedPicture}
              className="mx-auto d-block w-50"
              alt={this.state.selectedPicture}
            />
            <div className="row m-0">{this.showImages()}</div>
          </div>
          <div className="col-sm-12 col-md-6 rounded">
            <div className="p-3 m-1 rounded border">{this.test()}</div>
            <div className="row m-1">
              {this.state.product.discount !== "0" ? (
                <div className="w-100 text-center border p-3 rounded">
                  {" "}
                  <h5 className="mx-auto">
                    Popust: {this.state.product.discount}%
                  </h5>
                  <h4 className="mx-auto w-100 text-center">
                    Cena: <strike>{this.state.product.price}</strike>{" "}
                    {this.state.product.price -
                      Math.floor(
                        this.state.product.price *
                          (this.state.product.discount / 100)
                      )}{" "}
                    RSD
                  </h4>
                </div>
              ) : (
                <h2 className="mx-auto w-100 text-center border p-3 rounded">
                  Cena: {this.state.product && this.state.product.price} RSD
                </h2>
              )}
            </div>
          </div>
        </div>
        <div className="row m-0">
          <div className="row m-0 border-bottom w-100">
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

export default AdminProductView;
