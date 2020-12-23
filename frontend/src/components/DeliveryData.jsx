import React, { Component } from "react";
import { getUser } from "../services/httpService";
import errorMessages from "../utills/errorMessages";
import FormInput from "./FormInput";
import UseProfile from "./UseProfile";
import PopUpBox from "./PopUpBox";

class DeliveryData extends Component {
  state = {
    show: false,
    useProfile: false,
    ime: { value: "", error: false },
    prezime: { value: "", error: false },
    email: { value: "", error: false },
    pol: { value: "", error: false },
    broj_telefona: { value: "", error: false },
    adresa: { value: "", error: false },
  };

  handleChange = (value, attribute) => {
    let state = { ...this.state };
    state[attribute] = { value: value, error: false };
    this.setState({ ...state });
  };

  handleClose = () => this.setState({ ...this.state, show: false });

  handleShow = () => this.setState({ ...this.state, show: true });

  checkForEmptyFields = () => {
    let state = { ...this.state };
    let filter = Object.entries(state).filter(
      (attribute) =>
        !["useProfile", "error", "show"].includes(attribute[0]) &&
        attribute[1].value === ""
    );
    filter.forEach(
      (attribute) =>
        (state[attribute[0]] = {
          value: attribute[1].value,
          error: errorMessages.emptyField,
        })
    );
    this.setState(state);
    return filter.length;
  };

  confirm = () => {
    !this.checkForEmptyFields() &&
      this.checkEmail() &&
      this.setState({ ...this.state, show: true });
  };
  checkEmail = () => {
    let regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.state.email.value.match(regexMail)) {
      this.setState({
        ...this.state,
        email: {
          value: this.state.email.value,
          error: errorMessages.invalidEmailFormat,
        },
      });
      return false;
    }
    return true;
  };

  makeUser = (state) => {
    let user = {};
    Object.entries(state)
      .filter(
        (attribute) => !["useProfile", "error", "show"].includes(attribute[0])
      )
      .forEach((attribute) => (user[attribute[0]] = attribute[1].value));

    return user;
  };

  handleUseProfile = async (value, attribute) => {
    let state = { ...this.state };
    state.useProfile = !this.state.useProfile;

    state.useProfile
      ? Object.entries(
          await getUser(JSON.parse(localStorage.getItem("userInfo")).email)
        )
          .filter((attribute) => attribute[0] in this.state)
          .forEach(
            (attribute) =>
              (state[attribute[0]] = { value: attribute[1], error: false })
          )
      : Object.entries(state)
          .filter(
            (attribute) =>
              !["useProfile", "error", "show"].includes(attribute[0])
          )
          .forEach((attribute) => (state[attribute[0]].value = ""));

    this.setState(state);
  };
  render() {
    return (
      <div className="col-sm-12 col-md-6 p-5 mb-5 mt-5 mx-auto rounded shadow">
        <h2 className="text-center pb-1">Podaci za dostavu</h2>
        <div className="row pb-3">
          {localStorage.getItem("token") && (
            <UseProfile
              error={false}
              name={"Koristi Profil:"}
              value={this.state.useProfile}
              handleChange={this.handleUseProfile}
              attribute={"useProfile"}
              type={"checkbox"}
            />
          )}
          <FormInput
            disable={this.state.useProfile}
            error={this.state.ime.error}
            name={"Ime:"}
            value={this.state.ime.value}
            handleChange={this.handleChange}
            attribute={"ime"}
          />
          <FormInput
            disable={this.state.useProfile}
            error={this.state.prezime.error}
            name={"Prezime:"}
            value={this.state.prezime.value}
            handleChange={this.handleChange}
            attribute={"prezime"}
          />
          <FormInput
            disable={this.state.useProfile}
            error={this.state.pol.error}
            name={"Pol:"}
            value={this.state.pol.value}
            handleChange={this.handleChange}
            attribute={"pol"}
            multipleChoice={true}
          />
          <FormInput
            disable={this.state.useProfile}
            error={this.state.email.error}
            name={"E-mail:"}
            value={this.state.email.value}
            handleChange={this.handleChange}
            attribute={"email"}
          />
          <FormInput
            disable={this.state.useProfile}
            error={this.state.broj_telefona.error}
            name={"Broj telefona:"}
            value={this.state.broj_telefona.value}
            handleChange={this.handleChange}
            attribute={"broj_telefona"}
            type={"number"}
          />
          <FormInput
            disable={this.state.useProfile}
            error={this.state.adresa.error}
            name={"Adresa:"}
            value={this.state.adresa.value}
            handleChange={this.handleChange}
            attribute={"adresa"}
          />

          <PopUpBox
            history={this.props.history}
            user={this.state}
            test={this.makeUser}
            handleClose={this.handleClose}
            show={this.state.show}
          />
          <div className="row m-0 p-1 w-100 pb-3">
            <button onClick={this.confirm} className="login mx-auto w-100">
              Potvrdi
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeliveryData;
