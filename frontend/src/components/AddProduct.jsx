import React, { Component } from "react";
import { toast } from "react-toastify";
import { addProduct } from "../services/httpService";
import errorMessages from "../utills/errorMessages";
import AdminAttributeInput from "./admin/AdminAttributeInput";
import AdminInput from "./admin/AdminInput";

class AddProduct extends Component {
  state = {
    product: {
      name: "",
      price: "",
      discount: "",
      type: "",
      brand: "",
      attribute: [],
    },
    error: false,
    images: [],
  };

  handleDelete = (index) => {
    let state = { ...this.state };
    state.product.attribute.splice(index, 1);
    this.setState(state);
  };

  handleChange = (value, index, field) => {
    if (!this.state.product.attribute.length) return;

    let state = { ...this.state };
    state.product.attribute[index][field] = value;
    this.setState(state);
  };

  handleDefaultChange = (value, attributeName) => {
    let state = { ...this.state };
    state.product[attributeName] = value;
    this.setState(state);
  };

  addInput = () => {
    let state = { ...this.state };

    state.product.attribute.push({
      unice:
        state.product.attribute.length > 0
          ? state.product.attribute[state.product.attribute.length - 1].unice *
            2
          : 1,
      name: "",
      value: "",
      important: false,
    });

    this.setState(state);
  };
  checkIfNameIsDefault = (state) => {
    let isError = false;
    state.product.attribute.forEach((value, index, array) => {
      if (
        ["ime proizvoda", "cena", "popust", "tip proizvoda", "marka"].includes(
          value.name.toLowerCase()
        )
      ) {
        let errors = value.error ? [...value.error] : [];
        isError = true;
        errors[0] = errorMessages.defaultValue;
        array[index].error = errors;
      }
    });
    return isError;
  };

  checkImages = () => {
    if (this.state.images.length) {
      return true;
    } else {
      toast.error("Morate uplodovati minimum jednu sliku");
      return false;
    }
  };
  checkAttributes = () => {
    if (this.state.product.attribute.length) {
      return true;
    } else {
      toast.error("Morate dodati minimum jedan atribut");
      return false;
    }
  };

  checkIfEmpty = (state) => {
    let errors = [];
    state.product.attribute.forEach((attribute) => {
      if (attribute.name === "") {
        errors[0] = errorMessages.emptyField;
        attribute.error = errors;
      } else {
        delete attribute.error;
      }
      if (attribute.value === "") {
        errors[1] = errorMessages.emptyField;
        attribute.error = errors;
      } else {
        delete attribute.error;
      }
    });
    return errors.length;
  };
  checkIfDuplicate = (state) => {
    let faultyFields = state.product.attribute.filter(
      (value, index, array) =>
        array.filter(
          (val2) =>
            val2.name === value.name && val2.name !== "" && value.name !== ""
        ).length > 1
    );

    if (!faultyFields.length) return 0;
    state.product.attribute.forEach((value) =>
      faultyFields.forEach((val) => {
        if (val.unice === value.unice) {
          let errors = val.error ? [...val.error] : [];
          errors[0] = errorMessages.attributeExists;
          value.error = errors;
        }
      })
    );
    return faultyFields.length;
  };
  isDefaultFieldsEmpty = (state) => {
    if (
      this.state.product.name === "" ||
      this.state.product.price === "" ||
      this.state.product.discount === "" ||
      this.state.product.brand === "" ||
      this.state.product.type === ""
    ) {
      state.error = errorMessages.emptyField;
      toast.error("Vrednost obaveznih atributa ne sme biti prazna");
      return true;
    } else {
      return false;
    }
  };

  checkFields = () => {
    let state = { ...this.state };
    let emptyFields = this.checkIfEmpty(state);
    let isSameAsDefaultFields = this.checkIfNameIsDefault(state);
    let duplicateFields = this.checkIfDuplicate(state);
    let isImagesEmpty = this.checkImages();
    let isAttributesEmpty = this.checkAttributes();
    let isDefaultFieldsEmpty = this.isDefaultFieldsEmpty(state);
    if (
      !emptyFields &&
      !duplicateFields &&
      !isSameAsDefaultFields &&
      isImagesEmpty &&
      isAttributesEmpty &&
      !isDefaultFieldsEmpty
    ) {
      this.saveProduct();
    }
    this.setState(state);
  };

  saveProduct = async () => {
    try {
      const serverResponse = await addProduct(
        this.state.product,
        this.state.images
      );
      toast.success(serverResponse);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  showImages = () => {
    return this.state.images.map((image, index) => (
      <div
        key={`${image.name} + ${index}`}
        className="col-sm-12 col-md-4 col-lg-3">
        <img
          src={"data:image/png;base64," + image}
          className="card-img-top darken-on-hover"
          role="button"
          alt={image.name}
        />
        <button
          onClick={() => this.deleteImage(index)}
          className="btn btn-block btn-danger">
          Delete
        </button>
      </div>
    ));
  };

  getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  handleFileChange = async (e) => {
    let files = e.target.files;
    let test = [];
    Object.entries(files).forEach((value, index, array) => {
      this.getBase64(value[1], (result) => {
        test.push(result.split(",")[1]);
        if (index === array.length - 1) {
          this.setState({
            ...this.state,
            images: [...this.state.images, ...test],
            product: {
              ...this.state.product,
              imageCount: this.state.images.length + test.length,
            },
          });
        }
      });
    });
  };
  deleteImage = (index) => {
    let state = { ...this.state };
    state.images.splice(index, 1);
    state.product.imageCount--;
    this.setState(state);
  };
  render() {
    return (
      <div className="row m-0 mx-2">
        <div className="w-100 row mx-auto">
          {this.state.images.length > 0 && (
            <div className="row mb-2 m-0 w-100">{this.showImages()}</div>
          )}
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="fileaddon">
                Upload
              </span>
            </div>
            <div className="custom-file">
              <input
                multiple
                id="inputGroupFile011"
                type="file"
                aria-describedby="fileaddon"
                className="custom-file-input"
                name="image"
                onChange={this.handleFileChange}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile011">
                {this.state.images.length
                  ? `Uploaded files : ${this.state.images.length}`
                  : "Izaberi slike"}
              </label>
            </div>
          </div>

          <AdminInput
            name={"Ime proizvoda"}
            attributeName={"name"}
            value={this.state.product.name}
            handleChange={this.handleDefaultChange}
            error={this.state.error}
          />
          <AdminInput
            name={"Cena"}
            attributeName={"price"}
            value={this.state.product.price}
            handleChange={this.handleDefaultChange}
            type={"number"}
            min={0}
            error={this.state.error}
          />
          <AdminInput
            name={"Popust"}
            attributeName={"discount"}
            value={this.state.product.discount}
            handleChange={this.handleDefaultChange}
            type={"number"}
            min={0}
            error={this.state.error}
          />
          <AdminInput
            name={"Tip proizvoda"}
            attributeName={"type"}
            value={this.state.product.type}
            handleChange={this.handleDefaultChange}
            error={this.state.error}
          />
          <AdminInput
            name={"Marka"}
            attributeName={"brand"}
            value={this.state.product.brand}
            handleChange={this.handleDefaultChange}
            error={this.state.error}
          />
          <div className="row m-0 mt-2 w-100">
            <div className="row m-0 w-100 p-0">
              <div className="col-sm-12 col-md-5 p-0 border">
                <div className="text-left text-bold mx-auto my-auto p-3">
                  Ime atributa
                </div>
              </div>
              <div className="col-sm-12 col-md-5 p-0 border text-center">
                <div className="text-left text-bold mx-auto my-auto p-3">
                  Vrednost atributa
                </div>
              </div>
              <div className="col-sm-12 col-md-1 p-0 border text-center">
                <div className="text-center text-bold mx-auto my-auto p-3">
                  Bitno
                </div>
              </div>
            </div>
            {this.state.product.attribute.length > 0 &&
              this.state.product.attribute.map((attribute, index) => (
                <AdminAttributeInput
                  key={attribute.unice}
                  attribute={attribute}
                  index={index}
                  handleChange={this.handleChange}
                  handleDelete={this.handleDelete}
                />
              ))}
            <div className="row m-0 w-100 p-0">
              <div className="col-sm-12 col-md-12 p-0 border">
                <div className="h-100 p-2">
                  <button
                    onClick={this.addInput}
                    className="bg-info w-100 text-white text-center rounded p-2 border-0 d-block mx-auto">
                    Dodaj atribut
                  </button>
                </div>
              </div>
            </div>
            <div className="row m-0 w-100 p-0">
              <div className="col-sm-12 col-md-12 p-0 border">
                <div className="h-100 p-2">
                  <button
                    onClick={this.checkFields}
                    className="bg-success w-100 text-white text-center rounded p-2 border-0 d-block mx-auto">
                    Sačuvaj proizvod
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
