import React, { Component } from "react";
import { getListOfFilters, getDefaultFilters } from "../services/httpService";
import CheckboxInput from "./CheckboxInput";
import ProductCard from "./ProductCard";
import axios from "axios";
class ProductSearch extends Component {
  state = {
    recievedData: [],
    filter: {},
    selectedFilters: {},
    filterQuery: "",
    maxPrice: 0,
    selectedPrice: 0,
  };

  async componentDidMount() {
    if (this.state.filterQuery) {
      const recievedData = await axios({
        method: "post",
        url: "/api/filter",
        data: {
          filter: this.state.filterQuery,
        },
      }).data;
      this.getMaxPrice(recievedData);
      this.setState({
        ...this.state,
        recievedData,
        maxPrice: this.getMaxPrice(recievedData),
      });
    } else {
      const filter = {
        ...(await getDefaultFilters()),
        ...(await getListOfFilters()),
      };
      this.setState({
        recievedData: this.props.products,
        filter,
        maxPrice: this.getMaxPrice(this.props.products),
      });
    }
  }

  getMaxPrice = (product) => {
    if (product.length > 0) {
      let max = product.map((value) => parseInt(value.product.price));
      return max.reduce((a, b) => {
        return Math.max(a, b);
      });
    }
  };

  listProperties = () => {
    if (!this.state.recievedData.length) {
      return {};
    }

    const properties = new Set();
    const list = [];
    this.state.recievedData.forEach((data) => {
      Object.entries(data.product).forEach((item) => {
        if (
          !properties.has(item[0]) &&
          !["id", "imageCount", "name", "attribute", "price"].includes(item[0])
        ) {
          properties.add(item[0]);
        }
      });
    });
    properties.forEach((item) => list.push(item));
    const filter = {};
    list.forEach((item) => {
      filter[item] = {};
    });
    this.state.recievedData.forEach((data) => {
      Object.entries(data.product).forEach((item) => {
        if (item[0] in filter) {
          let test = filter[item[0]];
          test[data.product[item[0]]] = test[data.product[item[0]]]
            ? test[data.product[item[0]]] + 1
            : 1;
        }
      });
    });
    return this.state.filter;
  };

  handleCheckboxChange = async (inputKey, inputValue) => {
    const selectedFilters = { ...this.state.selectedFilters };

    if (selectedFilters[inputKey]) {
      if (selectedFilters[inputKey].has(inputValue)) {
        delete selectedFilters[inputKey].delete(inputValue);
        if (!selectedFilters[inputKey].size) {
          delete selectedFilters[inputKey];
        }
      } else {
        selectedFilters[inputKey].add(inputValue);
      }
    } else {
      selectedFilters[inputKey] = new Set().add(inputValue);
    }

    var filterQuery = "";
    var attributeNames = "";
    var attributeValues = "";
    Object.entries(selectedFilters).forEach((item, index, array) => {
      let criteria = JSON.stringify([...item[1].values()])
        .replace("[", "")
        .replace("]", "");
      if (item[0] === "brand") {
        filterQuery += "product." + item[0] + " in(" + criteria + ") ";
        filterQuery += index === array.length - 1 ? "" : "&& ";
      } else if (item[0] === "price") {
        filterQuery += "product." + item[0] + " >= " + criteria + " ";
        filterQuery += index === array.length - 1 ? "" : "&& ";
      } else {
        attributeNames && (attributeNames += ",");
        attributeNames += "'" + item[0] + "'";
        attributeValues && (attributeValues += ",");
        attributeValues += criteria;
      }
    });
    if (attributeNames && attributeValues)
      filterQuery +=
        "attribute.name in (" +
        attributeNames +
        ") && attribute.value in (" +
        attributeValues +
        ")";

    const formdata = new FormData();
    formdata.append("filter", filterQuery);

    const recievedData = (
      await axios({
        method: "post",
        url: "/api/filter",
        data: formdata,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    ).data;
    this.setState({ selectedFilters, filterQuery, recievedData });
  };

  filterList = (filter) => {
    if (!filter) {
      return null;
    }

    return Object.entries(filter)
      .filter(
        (item, index) =>
          !["opis (karakteristike)", "prava potrošača"].includes(
            item[0].toLowerCase()
          )
      )
      .map((item, index) => (
        <div key={index * 2} className="col-12">
          <div className="row">
            <div className="col-12">
              <p className="text-capitalize text-bold text-small mb-1">
                <strong>{item[0] === "brand" ? "Marka" : item[0]}</strong>
              </p>
              <hr />
            </div>
            <div className="col-12">{this.filterValues(item[0], item[1])}</div>
          </div>
        </div>
      ));
  };

  filterValues = (type, filter) => {
    return Object.entries(filter).map((item) => (
      <CheckboxInput
        key={item[0]}
        handleChange={this.handleCheckboxChange}
        type={type}
        inputName={item[1][0]}
        inputCount={item[1][1]}
      />
    ));
  };

  inputSliderChange = async (e) => {
    let selectedFilters = { ...this.state.selectedFilters };
    selectedFilters.price = new Set().add(e.target.value);

    var filterQuery = "";
    var attributeNames = "";
    var attributeValues = "";
    Object.entries(selectedFilters).forEach((item, index, array) => {
      let criteria = JSON.stringify([...item[1].values()])
        .replace("[", "")
        .replace("]", "");
      if (item[0] === "brand") {
        filterQuery += "product." + item[0] + " in(" + criteria + ") ";
        filterQuery += index === array.length - 1 ? "" : "&& ";
      } else if (item[0] === "price") {
        filterQuery += "product." + item[0] + " >= " + criteria + " ";
        filterQuery += index === array.length - 1 ? "" : "&& ";
      } else {
        attributeNames && (attributeNames += ",");
        attributeNames += "'" + item[0] + "'";
        attributeValues && (attributeValues += ",");
        attributeValues += criteria;
      }
    });
    if (attributeNames && attributeValues)
      filterQuery +=
        "attribute.name in (" +
        attributeNames +
        ") && attribute.value in (" +
        attributeValues +
        ")";

    const formdata = new FormData();
    formdata.append("filter", filterQuery);

    const recievedData = (
      await axios({
        method: "post",
        url: "/api/filter",
        data: formdata,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    ).data;
    this.setState({
      selectedFilters,
      filterQuery,
      recievedData,
      selectedPrice: selectedFilters.price,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row m-0">
          <button
            className="navbar-toggler w-100 my-2 border border-black d-md-none"
            type="button"
            data-toggle="collapse"
            data-target="#filterContext"
            aria-controls="filterContext"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <h4 className="p-2">Filters</h4>
          </button>

          <div
            className="col-sm-12 col-md-2  navbar navbar-expand-lg navbar-expand-md"
            id="filterContext">
            <div className="collapse navbar-collapse row" id="filterContext">
              <div className="row w-100">
                <div className="form-group w-100 m-0 p-2 text-center">
                  <label
                    className="font-weight-bold"
                    htmlFor="formControlRange">
                    Cena
                  </label>
                  <input
                    type="range"
                    className="form-control-range"
                    id="formControlRange"
                    min={0}
                    max={this.state.maxPrice}
                    onChange={this.inputSliderChange}
                  />
                  <h5 className="text-center">{this.state.selectedPrice}</h5>
                </div>
                <hr />
              </div>
              {this.filterList(this.listProperties())}
            </div>
          </div>
          <div className="col">
            <div className="row row-cols-1 row-cols-md-5 row-cols-lg-6">
              {this.state.recievedData.length > 0 &&
                this.state.recievedData.map((data, index) => (
                  <ProductCard key={index * 3} data={data} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSearch;
