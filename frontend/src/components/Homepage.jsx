import React, { Component } from "react";
import {
  getDiscountProducts,
  getPopularProducts,
} from "../services/httpService";
import ProductCard from "./ProductCard";

class Homepage extends Component {
  state = { popularProducts: [], discountProduct: [] };

  async componentDidMount() {
    let popularProducts = await getPopularProducts();
    let discountProduct = await getDiscountProducts();

    this.setState({ popularProducts, discountProduct });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row w-100 m-0 rounded border-bottom">
            <h4 className="p-2">Popularni Proizvodi</h4>
          </div>
          <div className="row m-0 row-cols-1 row-cols-md-4">
            {this.state.popularProducts.map((data) => (
              <ProductCard data={data} />
            ))}
          </div>
          <div className="row m-0 rounded border-bottom">
            <h4 className="p-2">Proizvodi na Akciji</h4>
          </div>
          <div className="row m-0 row-cols-1 row-cols-md-4">
            {this.state.discountProduct.map((data) => (
              <ProductCard data={data} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
