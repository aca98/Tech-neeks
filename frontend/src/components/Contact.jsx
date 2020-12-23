import React, { Component } from "react";
import { toast } from "react-toastify";
import errorMessages from "../utills/errorMessages";

class Contact extends Component {
  state = {
    ime: { value: "", error: "" },
    prezime: { value: "", error: "" },
    email: { value: "", error: "" },
    poruka: { value: "", error: "" },
  };

  checkForEmptyFields = () => {
    let state = { ...this.state };
    let isError = false;
    Object.entries(state).forEach((attr) => {
      if (attr[1].value === "") {
        state[attr[0]].error = errorMessages.emptyField;
        isError = true;
      } else {
        state[attr[0]].error = "";
      }
    });
    this.setState(state);
    return isError;
  };

  sendMessage = () => {
    if (!this.checkForEmptyFields()) {
      toast.success("Poruka uspešno poslata");
    }
  };

  handleChange = (attr, value) => {
    let state = { ...this.state };
    state[attr] = { value, error: "" };
    this.setState(state);
  };

  render() {
    return (
      <div className="col-sm-12 col-md-6 p-5 mb-5 mt-5 mx-auto rounded shadow">
        <h1 className="text-center">Kontaktiraj nas</h1>
        <div className="container-fluid">
          <div className="row pb-2">
            <div className="col-sm-12 col-md-6">
              <label htmlFor="input1">Vaše ime</label>
              <br />
              <input
                className="w-100 border-contact"
                id="input1"
                type="text"
                onChange={(e) => this.handleChange("ime", e.target.value)}
              />
              {this.state.ime.error && (
                <small id="emailHelp" className="text-danger pl-3">
                  {this.state.ime.error}
                </small>
              )}
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="input2">Vaše prezime</label>
              <br />
              <input
                className="w-100 border-contact"
                id="input2"
                type="text"
                onChange={(e) => this.handleChange("prezime", e.target.value)}
              />
              {this.state.prezime.error && (
                <small id="emailHelp" className="text-danger pl-3">
                  {this.state.prezime.error}
                </small>
              )}
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-sm-12 col-md-12">
              <label htmlFor="input3">Vaša e-mail adresa</label>
              <br />
              <input
                className="w-100 border-contact"
                id="input3"
                type="text"
                onChange={(e) => this.handleChange("email", e.target.value)}
              />
              {this.state.email.error && (
                <small id="emailHelp" className="text-danger pl-3">
                  {this.state.email.error}
                </small>
              )}
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-sm-12 col-md-12">
              <label htmlFor="input4">Vaša poruka</label>
              <br />
              <textarea
                className="w-100 border-contact"
                id="input4"
                type="text"
                onChange={(e) => this.handleChange("poruka", e.target.value)}
              />
              {this.state.poruka.error && (
                <small id="emailHelp" className="text-danger pl-3">
                  {this.state.poruka.error}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <button onClick={this.sendMessage} className="login mx-auto w-100">
            Pošalji
          </button>
        </div>
      </div>
    );
  }
}

export default Contact;
