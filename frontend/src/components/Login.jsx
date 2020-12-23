import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProducts, logIn } from "../services/httpService";
import errorMessages from "../utills/errorMessages";
import FormInput from "./FormInput";

class Login extends Component {
  state = {
    email: { value: "", error: false },
    password: { value: "", error: false },
    error: false,
    logInError: false,
  };

  handleChange = (value, attribute) => {
    let state = { ...this.state };
    state[attribute] = { value, error: "" };
    this.setState({ ...state });
  };
  checkForEmptyFields = () => {
    let values = Object.values(this.state);
    if (values.filter((value) => value === "").length > 0) {
      let state = { ...this.state };
      state.error = true;
      this.setState(state);
    }
  };

  logIn = async () => {
    if (!this.checkForEmptyFields() && this.checkEmail()) {
      let user = { ...this.state };
      let errorUser = { ...user };
      Object.entries(user).forEach(
        (value) => (user[value[0]] = value[1].value)
      );
      try {
        let response = await logIn(
          this.state.email.value,
          this.state.password.value
        );
        if (response.data.authority === 2) {
          this.props.setAdmin(response.data);
          this.props.history.push("/products");
        } else {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              email: response.data.email,
              firstName: response.data.ime,
              lastName: response.data.prezime,
            })
          );
          localStorage.setItem("token", response.headers.token);
          this.props.setAdmin({ authority: response.data.authority });

          errorUser.email.error = "";
          this.props.history.push("/users");
          this.setState(errorUser);
        }
      } catch (error) {
        errorUser.email.error = error.response.data;
        this.setState(errorUser);
        toast.error(error.response.data);
      }
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

  render() {
    return (
      <div className="col-sm-12 col-md-6 p-5 mb-5 mt-5 mx-auto rounded shadow">
        <h1>Prijava</h1>
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
        </div>
        <div className="row pb-3">
          <button onClick={this.logIn} className="login mx-auto w-100">
            Prijavi se
          </button>
        </div>
        <div className="row">
          <p>
            Nema te nalog? Registruj te se <Link to="/register">ovde</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
