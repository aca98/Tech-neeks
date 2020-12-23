import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/httpService";

class UserProfile extends Component {
  state = {};

  async componentDidMount() {
    let email = JSON.parse(localStorage.getItem("userInfo")).email;
    let user = { Autoritet: "Korisnik", ...(await getUser(email)) };
    this.setState(user);
  }

  render() {
    return (
      <div className="col-sm-12 col-md-6 p-5 mb-5 mt-5 mx-auto rounded shadow">
        <div className="row">
          <div className="col-sm-12 col-md-8 p-0">
            <h2 className="text-capitalize">
              {this.state && this.state.ime + " " + this.state.prezime}
            </h2>
          </div>
          <div className="col-sm-12 col-md-4 p-0">
            <Link to="/updateProfile">
              <div className="float-right">
                <div className="row m-0">
                  <div className="col-11 p-0">Ažuriraj profil</div>
                  <div className="col-1 p-0">
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {this.state &&
          Object.entries(this.state)
            .filter(
              (attribute) =>
                ![
                  "password",
                  "authority",
                  "last_activity",
                  "ime",
                  "prezime",
                ].includes(attribute[0])
            )
            .map((attribute) => (
              <div className="row pb-3 border-bottom">
                <div className="text-capitalize">
                  {attribute[0].replace("_", " ")}
                </div>{" "}
                {["datum_registracije", "last_activity"].includes(attribute[0])
                  ? ": " +
                    attribute[1].replaceAll("T", " ").replaceAll("-", "/")
                  : ": " + attribute[1]}
              </div>
            ))}
      </div>
    );
  }
}

export default UserProfile;
