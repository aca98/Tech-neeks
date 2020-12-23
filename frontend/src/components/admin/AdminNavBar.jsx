import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBanner } from "../../services/httpService";

class AdminNavBar extends Component {
  state = { banners: [] };

  async componentDidMount() {
    this.setState({ banners: await getBanner() });
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light bg-nav-color-black">
          <Link className="navbar-brand" to="/">
            <img
              // src={"data:image/webp;base64," + this.state.banners[1]}
              src={"/api/small-banner.webp"}
              width="60"
              height="70"
              alt="Banner"
              loading="lazy"
            />
          </Link>
          <button
            className="navbar-toggler"
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
                <div className="col-sm-12 col-md-4 ml-auto">
                  <ul className="row m-0 w-100 navbar-nav ml-auto">
                    <li className="col-sm-12 col-md-6 nav-item text-center">
                      <span className="nav-link text-white">
                        {this.props.admin &&
                          this.props.admin.ime + " " + this.props.admin.prezime}
                      </span>
                    </li>
                    <li className="col-sm-12 col-md-6 nav-item text-center">
                      {this.props.admin ? (
                        <Link
                          className="nav-link text-white"
                          onClick={() => {
                            localStorage.clear();
                            // eslint-disable-next-line no-restricted-globals
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
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default AdminNavBar;
