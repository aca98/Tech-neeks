import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  getUser,
  userChangePassword,
  updateUser,
} from "../services/httpService";
import errorMessages from "../utills/errorMessages";
import FormInput from "./FormInput";

class UpdateProfile extends Component {
  state = {
    password: { value: "", error: "" },
    passwordconfirm: { value: "", error: "" },
    pol: { value: "", error: "" },
    prezime: { value: "", error: "" },
    email: { value: "", error: "" },
    ime: { value: "", error: "" },
    adresa: { value: "", error: "" },
    broj_telefona: { value: "", error: "" },
  };
  currentPassword = "";

  async componentDidMount() {
    let user = {
      ...(await getUser(JSON.parse(localStorage.getItem("userInfo")).email)),
    };
    this.currentPassword = user.password;
    var temp = {
      password: { value: "", error: "" },
      passwordconfirm: { value: "", error: "" },
    };
    Object.entries(user)
      .filter(
        (value) =>
          ![
            "authority",
            "datum_registracije",
            "last_activity",
            "password",
          ].includes(value[0])
      )
      .forEach(
        (attribute) => (temp[attribute[0]] = { value: attribute[1], error: "" })
      );
    this.setState(temp);
  }

  checkForEmptyFields = () => {
    let user = { ...this.state };
    let isError = false;
    Object.entries(user).forEach((value) => {
      if (
        value[1].value === "" &&
        !["password", "passwordconfirm"].includes(value[0])
      ) {
        isError = true;
        user[value[0]] = { ...value[1], error: errorMessages.emptyField };
      } else {
        user[value[0]] = { ...value[1], error: false };
      }
    });
    this.setState(user);
    return isError;
  };

  checkIfPasswordsAreEmpty = () => {
    let state = { ...this.state };
    state.password.error = this.state.password.value
      ? false
      : errorMessages.emptyField;
    state.passwordconfirm.error = this.state.passwordconfirm.value
      ? false
      : errorMessages.emptyField;
    this.setState(state);

    return state.password.value && state.passwordconfirm.value;
  };

  handlePasswordChange = async () => {
    if (this.confirmPassword()) {
      toast(
        await userChangePassword(
          this.state.email.value,
          this.state.password.value
        )
      );
      this.currentPassword = this.state.password.value;
    }
  };

  confirmPassword = () => {
    if (!this.checkIfPasswordsAreEmpty()) return false;
    let state = { ...this.state };

    if (
      this.state.password.value === this.state.passwordconfirm.value &&
      !this.state.password.error &&
      !this.state.passwordconfirm.error
    ) {
      return true;
    } else {
      state.password.error = errorMessages.confirmPassword;
      state.passwordconfirm.error = errorMessages.confirmPassword;
      return false;
    }
  };

  handleChange = (value, attribute) => {
    let state = { ...this.state };
    state[attribute].value = value;
    this.setState(state);
  };

  updateProfile = async () => {
    if (!this.checkForEmptyFields()) {
      let user = { ...this.state };
      Object.entries(user).forEach(
        (value) => (user[value[0]] = value[1].value)
      );
      user.password = this.currentPassword;
      await updateUser(user);
    }
  };

  render() {
    return (
      <div className="col-sm-12 col-md-6 p-5 mb-5 mt-5 mx-auto rounded shadow">
        <h1>Ažuriranje profila</h1>
        <div className="row">
          <FormInput
            error={this.state.password.error}
            name={"Lozinka:"}
            value={this.state.password.value}
            handleChange={this.handleChange}
            type={"password"}
            attribute={"password"}
          />
          <FormInput
            error={this.state.passwordconfirm.error}
            name={"Potvrda Lozinke:"}
            value={this.state.passwordconfirm.value}
            handleChange={this.handleChange}
            type={"password"}
            attribute={"passwordconfirm"}
          />
          <div className="col-sm-12 col-md-12 p-0">
            <button onClick={this.handlePasswordChange} className="pass-change">
              Promeni lozinku
            </button>
          </div>
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
            error={this.state.email.error}
            name={"Email:"}
            value={this.state.email.value}
            handleChange={this.handleChange}
            attribute={"email"}
            disable={true}
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
          <div className="col-sm-12 col-md-12 p-0">
            <button onClick={this.updateProfile} className="pass-change">
              Sačuvaj promene
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
