import React, { Component } from "react";
import FormInput from "../FormInput";
import errorMessages from "../../utills/errorMessages";
import { toast } from "react-toastify";
import { adminRegister } from "../../services/httpService";

class AdminRegister extends Component {
  state = {
    email: { value: "", error: false },
    password: { value: "", error: false },
    passwordconfirm: { value: "", error: false },
    ime: { value: "", error: false },
    prezime: { value: "", error: false },
    pol: { value: "", error: false },
    broj_telefona: { value: "", error: false },
    adresa: { value: "", error: false },
  };

  handleChange = (value, attribute) => {
    let state = { ...this.state };
    state[attribute] = { value, error: false };
    this.setState({ ...state });
  };

  checkPassword = () => {
    if (this.state.password.value !== this.state.passwordconfirm.value) {
      this.setState({
        ...this.state,
        password: {
          ...this.state.password,
          error: errorMessages.confirmPassword,
        },
        passwordconfirm: {
          ...this.state.passwordconfirm,
          error: errorMessages.confirmPassword,
        },
      });
      return false;
    } else {
      this.setState({
        ...this.state,
        password: { value: this.state.password.value, error: "" },
        passwordconfirm: { value: this.state.passwordconfirm.value, error: "" },
      });
      return true;
    }
  };

  checkForEmptyFields = () => {
    let user = { ...this.state };
    let isError = false;
    Object.entries(user).forEach((value) => {
      if (value[1].value === "") {
        isError = true;
        user[value[0]] = { ...value[1], error: errorMessages.emptyField };
      } else {
        user[value[0]] = { ...value[1], error: false };
      }
    });
    this.setState(user);
    return isError;
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

  registerUser = async () => {
    if (
      !this.checkForEmptyFields() &&
      this.checkPassword() &&
      this.checkEmail()
    ) {
      let user = { ...this.state };
      let errorUser = { ...user };
      Object.entries(user).forEach(
        (value) => (user[value[0]] = value[1].value)
      );
      try {
        toast.success(await adminRegister(user));
      } catch (error) {
        errorUser.email.error = errorMessages.emailExists;
        this.setState(errorUser);
        toast.error(error.response.data);
      }
    }
  };

  render() {
    return (
      <div className="col-sm-12 col-md-9 p-5 mb-5 mt-5 mx-auto">
        <h1 className="p-3">Registracija</h1>
        <div className="row pb-3">
          <FormInput
            error={this.state.email.error}
            name={"E-mail:"}
            value={this.state.email.value}
            handleChange={this.handleChange}
            attribute={"email"}
            type={"email"}
          />
          <FormInput
            error={this.state.password.error}
            name={"Lozinka:"}
            value={this.state.password.value}
            handleChange={this.handleChange}
            attribute={"password"}
            type={"password"}
          />
          <FormInput
            error={this.state.passwordconfirm.error}
            name={"Potvrda Lozinke:"}
            value={this.state.passwordconfirm.value}
            handleChange={this.handleChange}
            attribute={"passwordconfirm"}
            type={"password"}
          />
          <FormInput
            error={this.state.ime.error}
            name={"Ime:"}
            value={this.state.ime.value}
            handleChange={this.handleChange}
            attribute={"ime"}
          />
          <FormInput
            error={this.state.prezime.error}
            name={"Prezime:"}
            value={this.state.prezime.value}
            handleChange={this.handleChange}
            attribute={"prezime"}
          />
          <FormInput
            error={this.state.pol.error}
            name={"Pol:"}
            value={this.state.pol.value}
            handleChange={this.handleChange}
            attribute={"pol"}
            multipleChoice={true}
          />

          <FormInput
            error={this.state.broj_telefona.error}
            name={"Broj telefona:"}
            value={this.state.broj_telefona.value}
            handleChange={this.handleChange}
            attribute={"broj_telefona"}
            type={"number"}
          />
          <FormInput
            error={this.state.adresa.error}
            name={"Adresa:"}
            value={this.state.adresa.value}
            handleChange={this.handleChange}
            attribute={"adresa"}
          />
        </div>
        <div className="row pb-3">
          <button onClick={this.registerUser} className="login mx-auto w-100">
            Registruj
          </button>
        </div>
      </div>
    );
  }
}

export default AdminRegister;
