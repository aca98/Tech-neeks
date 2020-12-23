import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBanner } from "../services/httpService";
import Banner from "./Banner";
import { Spinner } from "react-bootstrap";

class NavBar extends Component {
  state = { banners: [], search: "", loader: false };

  async componentDidMount() {
    this.setState({ banners: await getBanner(), search: "" });
  }

  handleLogOut = () => {};

  render() {
    return (
      <React.Fragment>
        <Banner banner={this.state.banners[0]} />

        <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light bg-nav-color">
          <Link className="navbar-brand d-sm-none d-md-block d-lg-block" to="/">
            <img
              src={"data:image/webp;base64," + this.state.banners[1]}
              width="60"
              height="70"
              alt="Banner"
              loading="lazy"
            />
          </Link>
          <button
            className="navbar-toggler w-100 my-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="row w-100 ">
            <div className="col-12">
              <div className="row">
                {this.state.loader && (
                  <div className="col-1 input-group mb-3 text-right p-1">
                    <div className="d-block ml-auto">
                      <Spinner
                        animation="border"
                        role="status"
                        variant="danger">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  </div>
                )}
                <div className="col input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    value={this.state.search}
                    onChange={(e) => {
                      this.setState({ ...this.state, search: e.target.value });
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => {
                        this.setState({ ...this.state, loader: true });
                        this.props.history.push("/filter");
                        this.props.search(this.state.search);
                      }}
                      className="input-group-text"
                      id="basic-addon1">
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="row p-0 navbar navbar-expand-lg navbar-expand-md navbar-light"
                id="navbarSupportedContent">
                <div
                  className="col-sm-12 col-md-7 collapse navbar-collapse"
                  id="navbarSupportedContent">
                  <div className="row m-0 w-100 navbar-nav mr-auto">
                    <li className="col-md-2 p-0 col-sm-12 nav-item text-center">
                      <Link className="nav-link text-white" to="/filter">
                        Proizvodi
                      </Link>
                    </li>
                    <li className="col-md-2 p-0  col-sm-12 nav-item text-center">
                      <Link className="nav-link text-white" to="/contact">
                        Kontakt
                      </Link>
                    </li>
                    <li className="col-md-2 p-0  col-sm-12 nav-item text-center">
                      <Link className="nav-link text-white" to="/aboutus">
                        O nama
                      </Link>
                    </li>
                    <li className="col-md-2 p-0  col-sm-12 nav-item text-center">
                      <Link className="nav-link text-white" to="/cart">
                        Korpa
                      </Link>
                    </li>
                  </div>
                </div>
                <div className="col-sm-12 col-md-5 p-0 navbar navbar-expand-lg navbar-expand-md">
                  <div
                    className="row collapse navbar-collapse m-0 w-100 ml-md-auto"
                    id="navbarSupportedContent">
                    <div className="col-sm-12 col-md-6 nav-item text-center">
                      {JSON.parse(localStorage.getItem("userInfo")) ? (
                        <div className="dropdown">
                          <span className="nav-link text-white">
                            {JSON.parse(localStorage.getItem("userInfo"))
                              .firstName +
                              " " +
                              JSON.parse(localStorage.getItem("userInfo"))
                                .lastName}
                          </span>
                          <div className="dropdown-content text-black">
                            <Link className="text-black" to="/users">
                              Profil
                            </Link>
                            <hr />
                            <Link className="text-black" to="/userhistory">
                              Istorija kupovine
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <Link className="nav-link text-white" to="/register">
                          Registruj se
                        </Link>
                      )}
                    </div>
                    <div className="col-sm-12 col-md-6 nav-item text-center">
                      {localStorage.getItem("userInfo") ? (
                        <Link
                          className="nav-link text-white"
                          onClick={() => {
                            localStorage.clear();
                            this.props.setAdmin({
                              admin: { authority: 0 },
                            });

                            this.props.history.push("/");
                          }}>
                          Odjavi se
                        </Link>
                      ) : (
                        <Link className="nav-link text-white" to="/login">
                          Prijavi se
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
