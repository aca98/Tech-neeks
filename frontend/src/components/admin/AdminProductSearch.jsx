import React, { Component } from "react";
import {
  deleteProduct,
  getAllProducts,
  adminSearchProducts,
  restoreProduct,
} from "../../services/httpService";
import ProductCard from "../ProductCard";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

class AdminProductSearch extends Component {
  state = {
    recievedData: [],
    search: "",
    filter: {},
    selectedFilters: {},
    filterQuery: "",
    show: false,
    selectedProduct: null,
    loader: false,
  };

  async componentDidMount() {
    this.setState({ ...this.state, recievedData: await getAllProducts() });
  }

  deleteProduct = async () => {
    let products = [...this.state.recievedData];
    products.forEach(
      (value, index, array) =>
        value.product.id === this.state.selectedProduct &&
        (array[index].product.deleted = true)
    );
    toast.success(await deleteProduct(this.state.selectedProduct));
    this.setState({ recievedData: products, show: false });
  };

  handleModal = (id) => {
    this.setState({ ...this.state, show: true, selectedProduct: id });
  };

  handleClose = () => this.setState({ ...this.state, show: false });

  handleShow = () => this.setState({ ...this.state, show: true });

  productRestore = async (id) => {
    let products = [...this.state.recievedData];
    products.forEach((value, index, array) => {
      value.product.id === id && (array[index].product.deleted = false);
    });
    this.setState({ recievedData: products });
    await restoreProduct(id);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row m-0 input-group pt-2 pb-2 mb-1 border-bottom ">
          {this.state.loader && (
            <div className="col-sm-12 col-md-1 text-right ">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
          <div className="col-sm-12 col-md-10">
            <input
              type="text"
              className="form-control w-100 border-black"
              placeholder="Pretraga"
              aria-label="Pretraga"
              aria-describedby="basic-addon1"
              value={this.state.search}
              onChange={(e) =>
                this.setState({ ...this.state, search: e.target.value })
              }
            />
          </div>
          <div className="col-sm-12 col-md-1 p-0">
            <button
              className="w-100 btn-search-admin p-2 pb-1 text-white text-center"
              onClick={async () => {
                this.setState({ loader: true });
                this.setState({
                  recievedData: await adminSearchProducts(this.state.search),
                  loader: false,
                });
              }}>
              Pretraži
            </button>
          </div>
        </div>
        <Modal size={"xl"} show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={this.handleClose}>
            <Modal.Title>Potvrdi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Da li ste sigurni da želite da obrišete ovaj proizvod</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Ne
            </Button>
            <Button variant="primary" onClick={this.deleteProduct}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="row row-cols-1 row-cols-md-5 row-cols-lg-6">
          {this.state.recievedData.map((data) => (
            <ProductCard
              data={data}
              choice={"admin"}
              productRestore={this.productRestore}
              handleModal={this.handleModal}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AdminProductSearch;
