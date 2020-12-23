import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="row m-0 navbar-light bg-nav-color p-2">
        <div className="col-4 mx-auto">
          <div className="row m-0">
            <div className="col-md-3 p-0 col-sm-12 nav-item text-center">
              <Link className="nav-link text-white" to="/filter">
                Proizvodi
              </Link>
            </div>
            <div className="col-md-3 p-0  col-sm-12 nav-item text-center">
              <Link className="nav-link text-white" to="/contact">
                Kontakt
              </Link>
            </div>
            <div className="col-md-3 p-0  col-sm-12 nav-item text-center">
              <Link className="nav-link text-white" to="/aboutus">
                O nama
              </Link>
            </div>
            <div className="col-md-3 p-0  col-sm-12 nav-item text-center">
              <Link className="nav-link text-white" to="/cart">
                Korpa
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 text-center text-white">
          <hr className="border-white" />
          <p>
            {" "}
            <strong className="text-danger">Broj telefona</strong>: +381 69 345
            234 <br /> Radno vreme:
            <br /> <strong className="text-danger">Ponedeljak - Petak</strong>:
            <br />
            od 08:00 do 20:00
            <br />
            Subota: od 08:00 do 17:00
          </p>
          <hr className="border-white" />
          <p className="copyright">
            <i className="far fa-copyright"></i>2020 Tech Neeks. Sva prava
            zadržana | Aleksandar Ignjatović
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
